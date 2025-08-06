import React from 'react';
import styled from 'styled-components';

interface FormFieldProps {
  label?: string;
  children: React.ReactNode;
  size?: 'small' | 'normal' | 'large';
  mb?: number;
}

const sizeMap = {
  small: '30px',
  normal: '110px',
  large: '150px',
};

const Container = styled.div<{ $minHeight: string; $marginBottom: number }>`
  width: 100%;
  min-height: ${({ $minHeight }) => $minHeight};
  margin-bottom: ${({ $marginBottom }) => $marginBottom}px;

  @media (max-width: 600px) {
    min-height: ${({ $minHeight }) =>
      $minHeight === '110px' ? '90px' : $minHeight};
  }
`;

const Label = styled.div`
  display: block;
  font-size: 16px;
  margin-left: 4px;
  margin-bottom: 6px;
  color: #060606;
  font-weight: 500;

  @media (max-width: 600px) {
    font-size: 14px;
    font-weight: bold;
  }
`;

export default function FormField({
  label,
  children,
  size = 'normal',
  mb = 0,
}: FormFieldProps) {
  return (
    <Container $minHeight={sizeMap[size]} $marginBottom={mb}>
      {label && <Label>{label}</Label>}
      {children}
    </Container>
  );
}
