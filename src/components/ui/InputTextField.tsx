import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

const InputTextField = React.forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  return (
    <TextField
      inputRef={ref}
      fullWidth
      variant="outlined"
      {...props}
    />
  );
});

export default InputTextField;
