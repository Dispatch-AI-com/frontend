import React from 'react';
import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  height?: string | number;
  fullWidth?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
  children: React.ReactNode;
  sx?: { mt?: number }; 
}

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['height', 'fullWidth', 'variant', 'sx'].includes(prop),
})<ButtonProps>`
  height: ${({ height }) => typeof height === 'number' ? `${height}px` : height || '52px'};
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  border-radius: 16px;
  background-color: #060606;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 0 24px;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${({ sx }) => sx?.mt ? `${sx.mt * 8}px` : '0'};
  
  &:hover:not(:disabled) {
    background-color: #2c2c2c;
    transform: translateY(-1px);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: #d5d5d5;
    color: #999999;
    cursor: not-allowed;
  }
`;

export default function Button({
  height = "52px",
  fullWidth = false,
  variant = 'contained',
  children,
  sx,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      height={height}
      fullWidth={fullWidth}
      variant={variant}
      sx={sx}
      {...props}
    >
      {children}
    </StyledButton>
  );
}
