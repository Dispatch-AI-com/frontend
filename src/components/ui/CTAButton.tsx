// src/components/ui/CTAButton.tsx
'use client';

import React from 'react';
import styled from 'styled-components';
import { Button, ButtonProps, Theme } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type CTAButtonVariant = 'black' | 'green';

interface CTAButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: CTAButtonVariant;
  href?: string;
}

const StyledButton = styled(Button)<{ $variant: CTAButtonVariant; theme: Theme }>`
  border-radius: 12px;
  padding: 12px 20px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.button.fontSize};
  font-weight: ${({ theme }) => theme.typography.button.fontWeight};
  text-transform: none;

  background-color: ${({ $variant }) =>
    $variant === 'green' ? '#a8f574' : '#060606'};
  color: ${({ $variant }) =>
    $variant === 'green' ? '#060606' : '#ffffff'};

  &:hover {
    background-color: ${({ $variant }) =>
      $variant === 'green' ? '#a8f574' : '#060606'};
    opacity: 0.9;
  }
`;

export default function CTAButton({
  children,
  onClick,
  href,
  endIcon,
  variant = 'black',
  ...rest
}: CTAButtonProps) {
  const theme = useTheme();

  return (
    <StyledButton
      $variant={variant}
      onClick={onClick}
      href={href}
      endIcon={endIcon}
      theme={theme}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}
