// ChatWindow.tsx
'use client';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import ChatBubble from './ChatBubble';

interface Message {
  role: 'ai' | 'user';
  content: string;
  options?: string[];
}

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
  onOptionClick?: (value: string) => void;
}

const ChatArea = styled(Box)(({ theme }) => ({
  minWidth: '50%',
  flex: 1,
  overflowY: 'auto',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

export default function ChatWindow({
  messages,
  isTyping,
  onOptionClick,
}: ChatWindowProps) {
  return (
    <ChatArea>
      {messages.map((msg, index) => (
        <ChatBubble
          key={index}
          role={msg.role}
          content={msg.content}
          options={msg.options}
          onOptionClick={onOptionClick}
        />
      ))}
      {isTyping && <ChatBubble role="ai" content="typing..." isTyping />}
    </ChatArea>
  );
}
