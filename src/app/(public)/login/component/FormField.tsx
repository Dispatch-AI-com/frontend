import type { ReactNode } from 'react';
import styled from 'styled-components';

interface FormFieldProps {
  label?: string;
  children: ReactNode;
  size?: 'small' | 'normal' | 'large';
  mb?: number;
}

const sizeMap = {
  small: '10px',
  normal: '110px',
  large: '150px',
};

const FieldContainer = styled.div<{
  $size: 'small' | 'normal' | 'large';
  $mb: number;
}>`
  width: 100%;
  min-height: ${props => sizeMap[props.$size]};
  margin-bottom: ${props => props.$mb * 8}px;
`;

const Label = styled.div`
  font-size: 16px;
  margin-left: 4px;
  margin-bottom: 6.4px;
`;

export default function FormField({
  label,
  children,
  size = 'normal',
  mb = 0,
}: FormFieldProps) {
  return (
    <FieldContainer $size={size} $mb={mb}>
      {label && <Label>{label}</Label>}
      {children}
    </FieldContainer>
  );
}
