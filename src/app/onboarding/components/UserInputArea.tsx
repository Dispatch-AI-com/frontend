'use client';

import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

interface UserInputAreaProps {
  userInput: string;
  setUserInput: (value: string) => void;
  onTextSubmit: (input: string) => void;
  disabled?: boolean;
}

const InputWrapper = styled(Box)(({ theme }) => ({
  minWidth: '50%',
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: '#fff',
  [theme.breakpoints.down('md')]: {
    minWidth: '85%',
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: '95%',
  },
}));

const SendIconBtn = styled(IconButton)(({ theme }) => ({
  width: 36,
  height: 36,
  borderRadius: '50%',
  backgroundColor: theme.palette.text.primary,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.text.primary,
    opacity: 0.85,
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.text.primary,
    color: '#fff',
  },
}));

export default function UserInputArea({
  userInput,
  setUserInput,
  onTextSubmit,
  disabled = false,
}: UserInputAreaProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && userInput.trim()) {
      e.preventDefault();
      onTextSubmit(userInput);
    }
  };

  return (
    <InputWrapper>
      <Stack spacing={2}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter your message..."
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SendIconBtn
                  onClick={() => onTextSubmit(userInput)}
                  disabled={disabled || userInput.trim() === ''}
                >
                  <ArrowUpwardRoundedIcon fontSize="small" />
                </SendIconBtn>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </InputWrapper>
  );
}
