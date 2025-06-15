import { Box, MenuItem, TextField, Typography } from '@mui/material';
import React from 'react';

interface Option {
  label: string;
  value: string;
  key?: string;
}

interface SelectFieldProps {
  value?: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  name?: string;
  label?: string;
  disabled?: boolean;
}

export default function SelectField({
  value,
  onChange,
  options,
  placeholder = 'Select',
  name,
  label,
  disabled = false,
}: SelectFieldProps) {
  return (
    <Box>
      {label && (
        <Typography variant="body1" mb={0.5}>
          {label}
        </Typography>
      )}
      <TextField
        select
        value={value ?? ''}
        onChange={e => {
          onChange(e.target.value);
        }}
        placeholder={placeholder}
        fullWidth
        size="small"
        name={name}
        disabled={disabled}
      >
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>
        {options.map(opt => (
          <MenuItem key={opt.key ?? opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
