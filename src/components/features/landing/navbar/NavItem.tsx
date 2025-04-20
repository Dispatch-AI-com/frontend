import Link from 'next/link';
import { Box, Typography } from '@mui/material';

export interface NavItemProps {
  href: string;
  text: string;
  width: number;     
  textWidth: number;  
}

export const NavItem = ({ href, text, width, textWidth }: NavItemProps) => (
  <Link href={href}>
    <Box
      sx={{
        width: width,
        height: 36,
        padding: '8px 16px',
        borderRadius: '12px',
        marginRight: '8px',
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          backgroundColor: '#F5F5F5',
        },
      }}
    >
      <Typography
        sx={{
          width: textWidth,
          height: 20,
          fontFamily: 'Roboto',
          fontSize: 16,
          fontWeight: 'normal',
          fontStretch: 'normal',
          fontStyle: 'normal',
          lineHeight: 1.25,
          letterSpacing: 'normal',
          color: '#060606',
        }}
      >
        {text}
      </Typography>
    </Box>
  </Link>
);
