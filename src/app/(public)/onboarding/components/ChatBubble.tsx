'use client';

import { Avatar, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import React from 'react';

interface ChatBubbleProps {
  role: 'ai' | 'user';
  content: string;
  isTyping?: boolean;
}

const BubbleContainer = styled(Box, {
  shouldForwardProp: prop => prop !== 'isUser',
})<{ isUser: boolean }>(({ theme, isUser }) => ({
  display: 'flex',
  justifyContent: isUser ? 'flex-end' : 'flex-start',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1.5),
}));

const Bubble = styled(Box, {
  shouldForwardProp: prop => prop !== 'isUser',
})<{ isUser: boolean }>(({ theme, isUser }) => ({
  maxWidth: '100%',
  padding: theme.spacing(1.5, 2),
  borderRadius: '18px',
  backgroundColor: isUser ? '#d2f8d2' : '#ffffff',
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[1],
  borderTopLeftRadius: isUser ? '18px' : 0,
  borderTopRightRadius: isUser ? 0 : '18px',
}));

const ChatAvatar = styled(Avatar)({
  width: 32,
  height: 32,
});

export default function ChatBubble({
  role,
  content,
  isTyping = false,
}: ChatBubbleProps) {
  const isUser = role === 'user';

  return (
    <BubbleContainer isUser={isUser}>
      {!isUser && (
        <ChatAvatar>
          <Image src="/avatars/AI-avatar.svg" alt="AI" width={32} height={32} />
        </ChatAvatar>
      )}
      <Bubble isUser={isUser}>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
          {isTyping ? <em>{content}</em> : content}
        </Typography>
      </Bubble>
      {isUser && (
        <ChatAvatar>
          <Image
            src="/avatars/user-avatar.jpg"
            alt="User"
            width={32}
            height={32}
          />
        </ChatAvatar>
      )}
    </BubbleContainer>
  );
}
