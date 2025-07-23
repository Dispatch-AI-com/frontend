'use client';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { skipToken } from '@reduxjs/toolkit/query';
import { get } from 'lodash';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import {
  useCompleteMutation,
  useGetProgressQuery,
  useSaveAnswerMutation,
} from '@/features/onboarding/onboardingApi';
import { useAppSelector } from '@/redux/hooks';

import ChatWindow from './ChatWindow';
import HeaderProgress from './HeaderProgress';
import { steps } from './steps';
import UserInputArea from './UserInputArea';

const Wrapper = styled(Box)(() => ({
  margin: '0 auto',
  padding: 16,
  borderRadius: 16,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const FullWidth = styled(Box)({ width: '100%' });

export default function OnboardingChat() {
  const router = useRouter();
  const user = useAppSelector(state => state.auth.user);
  const userId = user?._id;

  /* progress = currentStep + answers + status, refetch when saveAnswer | complete */
  const {
    data: progress,
    isFetching,
    error,
  } = useGetProgressQuery(userId ?? skipToken);

  const [saveAnswer] = useSaveAnswerMutation();
  const [completeFlow] = useCompleteMutation();

  const [messages, setMessages] = useState<
    { role: 'ai' | 'user'; content: string; options?: string[] }[]
  >([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  /* refresh local state from progress */
  useEffect(() => {
    if (isFetching) return;

    // If there's an error or no progress, axiosBaseQuery will handle auth issues
    // Just start fresh onboarding
    if (error || !progress) {
      setMessages([]);
      setCurrentStepIndex(0);
      addAIMessage(steps[0].question, steps[0].options);
      return;
    }
    interface ChatMsg {
      role: 'user' | 'ai';
      content: string;
      options?: string[];
    }

    const answeredMsgs = steps.flatMap<ChatMsg>(step => {
      if (step.id >= progress.currentStep) return [];

      const raw = step.field ? get(progress.answers, step.field, '') : '';

      if (typeof raw !== 'string' || !raw.trim()) return [];

      return [
        { role: 'ai', content: step.question, options: step.options },
        { role: 'user', content: raw },
        { role: 'ai', content: step.onValidResponse(raw) },
      ];
    });

    setMessages(answeredMsgs);

    const nextStep = steps.find(s => s.id === progress.currentStep);
    if (nextStep) {
      setCurrentStepIndex(nextStep.id - 1);
      addAIMessage(nextStep.question, nextStep.options);
    } else {
      setCurrentStepIndex(steps.length - 1);
    }
  }, [progress, isFetching, error, router]);

  const currentStep = steps[currentStepIndex];

  const addAIMessage = (content: string, options?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => {
        const last = [...prev].reverse().find(m => m.role === 'ai');
        if (last?.content === content) return prev;
        return [...prev, { role: 'ai', content, options }];
      });
      setIsTyping(false);
    }, 1000);
  };

  /* validate, store and response to user input */
  const handleSubmit = async (input: string) => {
    setMessages(prev => [...prev, { role: 'user', content: input }]);

    if (!currentStep.validate(input)) {
      addAIMessage(currentStep.retryMessage);
      setUserInput('');
      return;
    }
    //save answer to backend & add ai reply
    try {
      const resp = await saveAnswer({
        userId: userId!,
        stepId: currentStep.id,
        answer: input,
        field: currentStep.field,
      }).unwrap();
      addAIMessage(currentStep.onValidResponse(input));

      if (resp.currentStep <= steps.length) {
        setCurrentStepIndex(resp.currentStep - 1);
      } else {
        try {
          const completeResult = await completeFlow(userId!).unwrap();
          if (completeResult.success) {
            setIsCompleted(true);
            addAIMessage('Onboarding Complete! Redirecting to dashboard...');
            setTimeout(() => {
              router.push('/admin/overview');
            }, 2000);
          }
        } catch (completionError: unknown) {
          // 处理完成失败的情况，给用户明确指引
          const err = completionError as {
            data?: { message?: string };
            message?: string;
          };
          const errorMsg =
            err?.data?.message ?? err?.message ?? 'Unknown error occurred';

          addAIMessage(
            `There was an issue completing your onboarding: ${errorMsg}\n\n` +
              `Would you like to try again?`,
            ['Retry Setup'],
          );

          // 显示重试按钮
          setIsCompleted(false);
          throw completionError; // 让外层catch处理
        }
      }
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error('Onboarding completion error:', error);
      interface ErrorResponse {
        data?: { message?: string };
        message?: string;
      }
      const err = error as ErrorResponse;
      const errorMsg =
        err?.data?.message ??
        err?.message ??
        'Server error, please try again later.';
      addAIMessage(`Error: ${errorMsg}`);
    } finally {
      setUserInput('');
    }
  };

  const handleButtonClick = async (option: string) => {
    if (option === 'Retry Setup') {
      await handleRetryCompletion();
    } else if (option === 'Refresh Page') {
      window.location.reload();
    } else {
      await handleSubmit(option);
    }
  };

  const handleRetryCompletion = async () => {
    if (!userId) return;

    try {
      addAIMessage('Retrying onboarding completion...');

      const completeResult = await completeFlow(userId).unwrap();
      if (completeResult.success) {
        setIsCompleted(true);
        addAIMessage('Onboarding Complete! Redirecting to dashboard...');
        setTimeout(() => {
          router.push('/admin/overview');
        }, 2000);
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string }; message?: string };
      const errorMsg =
        err?.data?.message ?? err?.message ?? 'Unknown error occurred';

      addAIMessage(
        `Still having issues: ${errorMsg}\n\n` +
          `You can try again or refresh the page. If the problem persists, please contact support.`,
        ['Retry Setup', 'Refresh Page'],
      );
    }
  };
  return (
    <>
      <Wrapper>
        <FullWidth>
          <HeaderProgress
            currentStep={currentStepIndex + 1}
            totalSteps={steps.length}
          />
        </FullWidth>

        <ChatWindow
          messages={messages}
          isTyping={isTyping}
          onOptionClick={option => void handleButtonClick(option)}
        />
        <UserInputArea
          userInput={userInput}
          setUserInput={setUserInput}
          onTextSubmit={input => void handleSubmit(input)}
          disabled={isTyping || !!currentStep.options?.length || isCompleted}
        />
      </Wrapper>
    </>
  );
}
