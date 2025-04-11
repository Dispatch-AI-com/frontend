import React from "react";
import { TextField } from "@mui/material";

interface InputTextFieldProps {
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputTextField: React.FC<InputTextFieldProps> = ({ label, type = "text", value, onChange }) => {
    return (
        <TextField
            label={label}
            type={type}
            variant="outlined"
            value={value}
            onChange={onChange}
            fullWidth
        />
    );
};

export default InputTextField;