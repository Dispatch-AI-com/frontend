'use client';

import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { Box, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import React from 'react';

const HeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  paddingTop: 0,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const RightGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const StepText = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
}));

const Avatar = styled('div')(() => ({
  width: 36,
  height: 36,
  borderRadius: '50%',
  overflow: 'hidden',
}));

interface HeaderProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function HeaderProgress({
  currentStep,
  totalSteps,
}: HeaderProgressProps) {
  return (
    <HeaderWrapper>
      <Image src="/logo.svg" alt="DispatchAI Logo" width={100} height={30} />

      <RightGroup sx={{ ml: 'auto' }}>
        <StepText>
          Step&nbsp;
          <Box
            component="span"
            sx={{ fontWeight: 700, color: 'text.primary', fontSize: 18 }}
          >
            {currentStep}
          </Box>
          &nbsp;of&nbsp;{totalSteps}
        </StepText>

        <IconButton size="small">
          <HelpOutlineRoundedIcon fontSize="inherit" />
        </IconButton>

        <Avatar>
          <Image
            src="/avatars/user-avatar.jpg"
            alt="User Avatar"
            width={36}
            height={36}
          />
        </Avatar>
      </RightGroup>
    </HeaderWrapper>
  );
}
