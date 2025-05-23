"use client";

import { Typography } from "@mui/material";
import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
  mb?: number | string;
  color?: string;
  sx?: object;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  mb = 8,
  color = "#060606",
  sx = {},
  ...rest
}) => {
  return (
    <Typography
      variant="h2"
      align="center"
      gutterBottom
      sx={{
        lineHeight: "56px",
        color: color,
        mb: mb,
        mx: "auto",
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Typography>
  );
};

export default SectionTitle;
