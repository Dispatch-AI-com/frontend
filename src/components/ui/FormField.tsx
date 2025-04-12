import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  children: ReactNode;
  required?: boolean;
}

export default function FormField({ label, children, required }: FormFieldProps) {
  return (
    <Box width="100%">
      <Typography sx={{ fontSize: "16px", fontWeight: 600 }} ml={0.5} mb={0.8}>
        {label}
        {required && <span style={{ color: "red" }}> *</span>}
      </Typography>
      {children}
    </Box>
  );
} 