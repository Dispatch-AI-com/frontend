import type { TextFieldProps } from '@mui/material';
import { TextField } from '@mui/material';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface ControllerTextareaProps<T extends FieldValues>
  extends Omit<TextFieldProps, 'name'> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
}

export default function ControllerTextarea<T extends FieldValues>({
  name,
  control,
  label,
  ...props
}: ControllerTextareaProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          label={label}
          fullWidth
          multiline
          minRows={3}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
}
