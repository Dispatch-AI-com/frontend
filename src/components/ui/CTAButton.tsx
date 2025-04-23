'use client';

import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type CTAButtonVariant = 'black' | 'green';

interface CTAButtonProps extends Omit<ButtonProps, 'variant'> {
  children: React.ReactNode;
  variant?: CTAButtonVariant;
  href?: string;
  endIcon?: React.ReactNode;
}

export default function CTAButton({
  children,
  onClick,
  href,
  endIcon,
  variant = 'black',
  ...rest
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
        padding: '8px 16px',
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.button.fontSize,
        textTransform: 'none',
        fontWeight: theme.typography.button.fontWeight,
        ...stylesByVariant[variant],
        ...rest.sx 
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
