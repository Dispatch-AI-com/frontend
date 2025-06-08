import { Box } from '@mui/material';
import type { Control, FieldValues, Path, PathValue } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';

interface ControllerInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  fullWidth?: boolean;
}

const StyledBox = styled(Box)<{ $fullWidth?: boolean }>`
  width: ${props => (props.$fullWidth ? '100%' : 'auto')};
`;

const StyledInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 12px;
  border: 1px solid ${props => (props.$hasError ? '#d32f2f' : '#e0e0e0')};
  border-radius: 12px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${props => (props.$hasError ? '#d32f2f' : '#1976d2')};
  }
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  font-size: 12px;
  margin-top: 4px;
  margin-left: 4px;
`;

export default function ControllerInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = 'text',
  fullWidth = true,
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
        <StyledBox $fullWidth={fullWidth}>
          {label && <label>{label}</label>}
          <StyledInput
            {...field}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            $hasError={!!error}
          />
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
        </StyledBox>
      )}
    />
  );
}
