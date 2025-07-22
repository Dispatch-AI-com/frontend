import { Box, TextField, Typography } from '@mui/material';

interface LabeledTextFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function LabeledTextField({
  label,
  value,
  onChange,
  placeholder,
}: LabeledTextFieldProps) {
  return (
    <Box>
      <Typography variant="body1" mb={0.5}>
        {label}
      </Typography>
      <TextField
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        fullWidth
        size="small"
      />
    </Box>
  );
}
