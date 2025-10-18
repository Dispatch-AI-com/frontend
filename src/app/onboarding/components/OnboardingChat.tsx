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

      if (!step.field) {
        return [{ role: 'ai', content: step.question, options: step.options }];
      }

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

  const addAIMessage = (content: string, options?: string[], force = false) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => {
        const last = [...prev].reverse().find(m => m.role === 'ai');
        if (!force && last?.content === content) return prev; // ➋
        return [...prev, { role: 'ai', content, options }];
      });
      setIsTyping(false);
    }, 600);
  };

  const handleError = (err: unknown) => {
    let errorMessage = 'Server error, please try again later.';

    if (typeof err === 'object' && err !== null) {
      const e = err as {
        status?: number;
        data?: unknown;
        message?: string;
      };

      if (typeof e.data === 'object' && e.data !== null) {
        const dataObj = e.data as { message?: string | string[] };

        if (dataObj.message) {
          const msg = dataObj.message;
          if (Array.isArray(msg)) {
            errorMessage = msg[0];
          } else if (typeof msg === 'string') {
            errorMessage = msg;
          }
        }
      }

      if (errorMessage === 'Server error, please try again later.') {
        if (typeof e.data === 'string') {
          errorMessage = e.data;
        }
      }

      if (
        errorMessage === 'Server error, please try again later.' &&
        e.message
      ) {
        errorMessage = e.message;
      }
    }

    if (currentStepIndex === steps.length - 1) {
      errorMessage = 'Onboarding failed, please contact us.';
    }

    addAIMessage(errorMessage, undefined, true);
  };

  /* validate, store and response to user input */
  const handleSubmit = async (input: string) => {
    setMessages(prev => [...prev, { role: 'user', content: input }]);

    if (!currentStep.validate(input)) {
      addAIMessage(currentStep.retryMessage, undefined, true);
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

      // Skip custom greeting message step if user chose default greeting
      let nextStepIndex = resp.currentStep - 1;
      if (
        currentStep.field === 'user.greeting.type' &&
        input === 'Use Default Greeting'
      ) {
        // Skip the custom message step (step 5) and go directly to demo step (step 6)
        const demoStepIndex = steps.findIndex(step => step.field === '');
        nextStepIndex = demoStepIndex >= 0 ? demoStepIndex : nextStepIndex;
      }

      if (nextStepIndex < steps.length) {
        setCurrentStepIndex(nextStepIndex);
      } else {
        await completeFlow(userId!).unwrap();
        setIsCompleted(true);
        addAIMessage('Onboarding Complete! ');
        setTimeout(() => {
          router.push('/admin/overview');
        }, 2000);
      }
    } catch (err) {
      handleError(err);
    } finally {
      setUserInput('');
    }
  };

  const handleButtonClick = async (option: string) => {
    // Handle regular step options
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
          inputType={currentStep.inputType}
          onAddressSelect={(address, placeId, components) => {
            setUserInput(address ?? '');
            // Log the structured address components for debugging
            // eslint-disable-next-line no-console
            console.log('Selected address:', address);
            // eslint-disable-next-line no-console
            console.log('Place ID:', placeId);
            if (components) {
              // eslint-disable-next-line no-console
              console.log('Address components:', components);
            }
          }}
        />
      </Wrapper>
    </>
  );
}
