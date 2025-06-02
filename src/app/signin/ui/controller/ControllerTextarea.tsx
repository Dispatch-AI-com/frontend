import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface ControllerTextareaProps<T extends FieldValues>
  extends Omit<TextFieldProps, "name"> {
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
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
            ...props.sx,
          }}
        />
      )}
    />
  );
}
