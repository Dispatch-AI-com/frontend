import React from 'react';
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import styled from 'styled-components';

interface ControllerCheckboxProps<T extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
}

const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const CustomCheckbox = styled.div<{ $checked: boolean; $disabled?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid ${({ $checked }) => $checked ? '#060606' : '#d5d5d5'};
  background-color: ${({ $checked }) => $checked ? '#a8f574' : '#fff'};
  position: relative;
  flex-shrink: 0;
  transition: all 0.2s ease-in-out;
  opacity: ${({ $disabled }) => $disabled ? 0.5 : 1};
  
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 45%;
    width: 4px;
    height: 8px;
    border: solid #060606;
    border-width: 0 2px 2px 0;
    transform: translate(-50%, -50%) rotate(45deg);
    opacity: ${({ $checked }) => $checked ? 1 : 0};
    transition: opacity 0.2s ease-in-out;
  }
`;

const Label = styled.label<{ $disabled?: boolean }>`
  font-size: 14px;
  line-height: 20px;
  color: ${({ $disabled }) => $disabled ? '#999999' : '#060606'};
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  user-select: none;
  margin: 0;
  padding: 0;
`;

const ErrorText = styled.span`
  color: #f44336;
  font-size: 14px;
  margin-top: 4px;
  display: block;
  line-height: 16px;
`;

const CheckboxWrapper = styled.div`
  width: 100%;
`;

export default function ControllerCheckbox<T extends FieldValues>({
  name,
  control,
  label,
  disabled,
  ...props
}: ControllerCheckboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const handleClick = () => {
          if (!disabled) {
            field.onChange(!field.value);
          }
        };

        return (
          <CheckboxWrapper>
            <CheckboxContainer onClick={handleClick}>
              <HiddenCheckbox
                {...field}
                {...props}
                checked={field.value || false}
                disabled={disabled}
                readOnly
              />
              <CustomCheckbox $checked={field.value || false} $disabled={disabled} />
              {label && (
                <Label $disabled={disabled}>
                  {label}
                </Label>
              )}
            </CheckboxContainer>
            {error && <ErrorText>{error.message}</ErrorText>}
          </CheckboxWrapper>
        );
      }}
    />
  );
}
