import type { ButtonProps as MuiButtonProps } from '@mui/material';
import { Button as MuiButton } from '@mui/material';

interface ButtonProps extends MuiButtonProps {
  height?: string | number;
}

export default function Button({
  height = '52px',
  children,
  ...props
}: ButtonProps) {
  return (
    <MuiButton
      variant="contained"
      {...props}
      sx={{
        height,
        borderRadius: '16px',
        bgcolor: '#060606',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#fff',
        '&:hover': {
          bgcolor: '#060606',
        },
      }}
    >
      {children}
    </MuiButton>
  );
}
