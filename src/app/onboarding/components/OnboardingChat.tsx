'use client';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { skipToken } from '@reduxjs/toolkit/query';
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
  const user = useAppSelector(state => state.auth.user);
  const userId = user?._id;
  console.log(userId);

  /* progress = currentStep + answers + status, refetch when saveAnswer | complete */
  const {
    data: progress,
    isFetching,
    refetch,
  } = useGetProgressQuery(userId ?? skipToken);

  const [saveAnswer] = useSaveAnswerMutation();
  const [completeFlow] = useCompleteMutation();

  const [messages, setMessages] = useState<
    { role: 'ai' | 'user'; content: string; options?: string[] }[]
  >([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');

  /* refresh local state from progress */
  useEffect(() => {
    if (!progress || isFetching) return;

    if (progress.status === 'completed') {
      setMessages([{ role: 'ai', content: 'Onboarding complete! 🎉' }]);
      return;
    }

    setCurrentStepIndex(progress.currentStep - 1);

    //construct conversation from answers
    const answeredMsgs: {
      role: 'user' | 'ai';
      content: string;
      options?: string[];
    }[] = Object.entries(progress.answers).flatMap(([stepId, answer]) => {
      const step = steps.find(s => s.id === Number(stepId));
      if (!step) return [];

      const aiMessage: { role: 'ai'; content: string; options?: string[] } = {
        role: 'ai',
        content: step.question,
      };

      if (step.options) {
        aiMessage.options = step.options;
      }

      return [aiMessage, { role: 'user', content: answer }];
    });
    setMessages(answeredMsgs);
  }, [progress, isFetching]);

  const currentStep = steps[currentStepIndex];

  /* if currentStep change, add new ai question */
  useEffect(() => {
    addAIMessage(currentStep.question, currentStep.options);
  }, [currentStep]);

  const addAIMessage = (content: string, options?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content, options }]);
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
      }).unwrap();
      addAIMessage(currentStep.onValidResponse(input));

      if (resp.currentStep <= steps.length) {
        setCurrentStepIndex(resp.currentStep - 1);
      } else {
        await completeFlow(userId!);
      }
    } catch (err) {
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
          disabled={isTyping || !!currentStep.options?.length}
        />
      </Wrapper>
    </>
  );
}
