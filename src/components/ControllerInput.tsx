import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface ControllerInputProps<T extends FieldValues> extends Omit<TextFieldProps, "name"> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
}

export default function ControllerInput<T extends FieldValues>({
  name,
  control,
  label,
  ...props
}: ControllerInputProps<T>) {
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
          error={!!error}
          helperText={error?.message}
          slotProps={{ input: { sx: { borderRadius: "12px" } } }}
        />
      )}
    />
  );
} 