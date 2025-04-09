import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  children: ReactNode;
}

export default function FormField({ label, children }: FormFieldProps) {
  return (
    <Box width="100%">
      <Typography sx={{ fontSize: "16px", fontWeight: 600 }} ml={0.5} mb={0.8}>
        {label}
      </Typography>
      {children}
    </Box>
  );
} 