import { SelectProps, FormControl, Select, MenuItem } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface Option {
  value: string | number;
  label: string;
}

interface ControllerSelectProps<T extends FieldValues> extends Omit<SelectProps, "name"> {
  name: Path<T>;
  control: Control<T>;
  options: Option[];
  placeholder?: string;
}

export default function ControllerSelect<T extends FieldValues>({
  name,
  control,
  options,
  placeholder,
  ...props
}: ControllerSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <Select
            {...field}
            {...props}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return <span style={{ color: 'rgba(0, 0, 0, 0.38)' }}>{placeholder}</span>;
              }
              return options.find(option => option.value === selected)?.label;
            }}
            sx={{
              borderRadius: "12px",
              backgroundColor: "white",
              ...props.sx
            }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}
