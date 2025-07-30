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
  const { data: progress, isFetching } = useGetProgressQuery(
    userId ?? skipToken,
  );

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
    if (!progress || isFetching) return;
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
  }, [progress, isFetching]);

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
        await completeFlow(userId!);
        setIsCompleted(true);
        addAIMessage('Onboarding Complete! ');
        setTimeout(() => {
          router.push('/admin/overview');
        }, 2000);
      }
    } catch {
      addAIMessage('Server error, please try again later.');
    } finally {
      setUserInput('');
    }
  };

  const handleButtonClick = async (option: string) => {
    await handleSubmit(option);
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
