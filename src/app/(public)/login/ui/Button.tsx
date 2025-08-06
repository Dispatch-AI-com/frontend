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
        height: { xs: '40px', sm: height },
        borderRadius: { xs: '12px', sm: '16px' },
        bgcolor: '#060606',
        fontSize: '14px',
        fontWeight: 'bold',
        marginTop: '16px',
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
