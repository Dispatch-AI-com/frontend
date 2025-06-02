import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface ControllerCheckboxProps<T extends FieldValues>
  extends Omit<CheckboxProps, "name"> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
}

const UncheckedIcon = () => (
  <div
    style={{
      width: 24,
      height: 24,
      borderRadius: 6,
      border: "1px solid #d5d5d5",
      backgroundColor: "#fff",
    }}
  />
);

const CheckedIcon = () => (
  <div
    style={{
      width: 24,
      height: 24,
      borderRadius: 6,
      border: "1px solid #060606",
      backgroundColor: "#a8f574",
      position: "relative",
    }}
  >
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "45%",
        width: 5,
        height: 10,
        border: "solid #060606",
        borderWidth: "0 2px 2px 0",
        transform: "translate(-50%, -50%) rotate(45deg)",
      }}
    />
  </div>
);

export default function ControllerCheckbox<T extends FieldValues>({
  name,
  control,
  label,
  ...props
}: ControllerCheckboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <FormControlLabel
            sx={{
              "& .MuiFormControlLabel-label": {
                lineHeight: "20px",
              },
            }}
            control={
              <Checkbox
                {...field}
                {...props}
                checked={field.value}
                icon={<UncheckedIcon />}
                checkedIcon={<CheckedIcon />}
                disableRipple
              />
            }
            label={label}
          />
          {error && <FormHelperText error>{error.message}</FormHelperText>}
        </>
      )}
    />
  );
}
