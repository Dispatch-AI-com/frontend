import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface FormFieldProps {
  label?: string;
  children: ReactNode;
  size?: "small" | "normal" | "large";
  mb?: number;
}

const sizeMap = {
  small: "10px",
  normal: "110px",
  large: "150px",
};

export default function FormField({ label, children, size = "normal", mb = 0 }: FormFieldProps) {
  return (
    <Box width="100%" minHeight={sizeMap[size]} mb={mb}>
      {label && (
        <Typography sx={{ fontSize: "16px", fontWeight: 600 }} ml={0.5} mb={0.8}>
          {label}
        </Typography>
      )}
      {children}
    </Box>
  );
} 