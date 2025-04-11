import { Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material";

interface ButtonProps extends MuiButtonProps {
  height?: string | number;
}

export default function Button({ height = "52px", sx, children, ...props }: ButtonProps) {
  return (
    <MuiButton
      variant="contained"
      {...props}
      sx={{
        height,
        borderRadius: "16px",
        bgcolor: "#060606",
        fontSize: "18px",
        fontWeight: "bold",
        color: "#fff",
        "&:hover": {
          bgcolor: "#060606"
        },
        ...sx
      }}
    >
      {children}
    </MuiButton>
  );
}