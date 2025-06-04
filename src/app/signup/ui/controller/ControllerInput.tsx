import React from 'react';
import type { Control, FieldValues, Path, PathValue } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';

interface ControllerInputProps<T extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  name: Path<T>;
  control: Control<T>;
}

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input<{ $hasError: boolean }>`
  width: 100%;
  padding: 16px;
  border: 2px solid ${({ $hasError }) => ($hasError ? '#f44336' : '#d5d5d5')};
  border-radius: 12px;
  font-size: 16px;
  font-family: inherit;
  background-color: #fff;
  transition: border-color 0.2s ease-in-out;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) => ($hasError ? '#f44336' : '#060606')};
  }

  &:disabled {
    background-color: #f5f5f5;
    color: #999999;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #999999;
  }
`;

const ErrorText = styled.span`
  color: #f44336;
  font-size: 14px;
  margin-top: 4px;
  display: block;
  line-height: 16px;
`;

export default function ControllerInput<T extends FieldValues>({
  name,
  control,
  ...props
}: ControllerInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={'' as PathValue<T, Path<T>>}
      render={({
        field: { value, onChange, ...field },
        fieldState: { error },
      }) => (
        <InputContainer>
          <StyledInput
            {...field}
            {...props}
            value={value || ''}
            onChange={onChange}
            $hasError={!!error}
          />
          {error && <ErrorText>{error.message}</ErrorText>}
        </InputContainer>
      )}
    />
  );
}
