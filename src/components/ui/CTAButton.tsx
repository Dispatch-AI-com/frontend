// src/components/ui/CTAButton.tsx
'use client';

import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

type CTAButtonVariant = 'black' | 'green';

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  endIcon?: React.ReactNode;
  variant?: CTAButtonVariant;
  sx?: object;
}

export default function CTAButton({
  children,
  onClick,
  href,
  endIcon,
  variant = 'black',
  sx
}: CTAButtonProps) {
  const theme = useTheme();
  
  const stylesByVariant = {
    black: {
      bgcolor: '#060606',
      color: '#ffffff',
      '&:hover': {
        bgcolor: '#060606',
        opacity: 0.9,
      },
    },
    green: {
      bgcolor: '#a8f574',
      color: '#060606',
      '&:hover': {
        bgcolor: '#a8f574',
        opacity: 0.9,
      },
    },
  };

  return (
    <Button
      variant="contained"
      onClick={onClick}
      href={href}
      endIcon={endIcon}
      sx={{
        borderRadius: '12px',
        padding: '12px 20px;',
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.button.fontSize,
        textTransform: 'none',
        fontWeight: theme.typography.button.fontWeight,
        ...stylesByVariant[variant],
        ...sx
      }}
    >
      {children}
    </Button>
  );
}
