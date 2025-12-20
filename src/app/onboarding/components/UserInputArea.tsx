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

import AddressAutocomplete from '@/components/ui/AddressAutocomplete';

interface AddressComponents {
  streetNumber?: string;
  route?: string;
  locality?: string;
  administrativeAreaLevel1?: string;
  postalCode?: string;
  country?: string;
}

interface UserInputAreaProps {
  userInput: string | undefined;
  setUserInput: (value: string) => void;
  onTextSubmit: (input: string) => void;
  disabled?: boolean;
  inputType?: 'text' | 'button' | 'address';
  onAddressSelect?: (
    address: string,
    placeId: string,
    components?: AddressComponents,
  ) => void;
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
  inputType = 'text',
  onAddressSelect,
}: UserInputAreaProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && userInput?.trim()) {
      e.preventDefault();
      onTextSubmit(userInput);
    }
  };

  const handleAddressSelect = (
    address: string,
    placeId: string,
    components?: AddressComponents,
  ) => {
    setUserInput(address);
    if (onAddressSelect) {
      onAddressSelect(address, placeId, components);
    }
  };

  const handleAddressKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && userInput?.trim()) {
      e.preventDefault();
      onTextSubmit(userInput);
    }
  };

  const renderInput = () => {
    if (inputType === 'address') {
      return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
          <Box sx={{ flex: 1 }}>
            <AddressAutocomplete
              value={userInput ?? ''}
              onChange={setUserInput}
              onAddressSelect={handleAddressSelect}
              displayFullAddress={true}
              placeholder="Start typing your address..."
              disabled={disabled}
              onKeyDown={handleAddressKeyDown}
            />
          </Box>
          <SendIconBtn
            onClick={() => onTextSubmit(userInput ?? '')}
            disabled={disabled || !userInput || userInput.trim() === ''}
            sx={{ mb: 0.5 }}
          >
            <ArrowUpwardRoundedIcon fontSize="small" />
          </SendIconBtn>
        </Box>
      );
    }

    return (
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Enter your message..."
        value={userInput ?? ''}
        onChange={e => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SendIconBtn
                onClick={() => onTextSubmit(userInput ?? '')}
                disabled={disabled || !userInput || userInput.trim() === ''}
              >
                <ArrowUpwardRoundedIcon fontSize="small" />
              </SendIconBtn>
            </InputAdornment>
          ),
        }}
      />
    );
  };

  return (
    <InputWrapper>
      <Stack spacing={2}>{renderInput()}</Stack>
    </InputWrapper>
  );
}
