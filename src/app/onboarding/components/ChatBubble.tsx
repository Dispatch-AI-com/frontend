'use client';

import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import React from 'react';

interface ChatBubbleProps {
  role: 'ai' | 'user';
  content: string;
  isTyping?: boolean;
  options?: string[];
  onOptionClick?: (value: string) => void;
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

const OptionButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'isSkip',
})<{ isSkip: boolean }>(({ isSkip }) => ({
  textTransform: 'none',
  borderRadius: '28px',
  fontWeight: 400,
  paddingInline: 20,
  paddingBlock: 6,
  backgroundColor: isSkip ? '#f5f5f5' : '#e5fcd5',
  border: 'none',
  color: 'inherit',
  '&:hover': {
    backgroundColor: isSkip ? '#e0e0e0' : '#d8f6c2',
    border: 'none',
  },
}));

export default function ChatBubble({
  role,
  content,
  isTyping = false,
  options,
  onOptionClick,
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
        {!isUser && options && options.length > 0 && (
          <Box mt={1} display="flex" gap={1} flexWrap="wrap">
            {options.map(option => {
              const isSkip = option.toLowerCase().includes('skip');
              return (
                <OptionButton
                  key={option}
                  isSkip={isSkip}
                  variant="text"
                  onClick={() => onOptionClick?.(option)}
                  startIcon={
                    isSkip ? (
                      <BlockRoundedIcon fontSize="small" />
                    ) : (
                      <CheckCircleOutlineRoundedIcon fontSize="small" />
                    )
                  }
                >
                  {option}
                </OptionButton>
              );
            })}
          </Box>
        )}
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
