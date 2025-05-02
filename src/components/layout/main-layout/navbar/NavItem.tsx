'use client';
import { Box, Typography } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import NextLink, { LinkProps } from 'next/link';


interface ExtraNavProps {
  width: number;
  textWidth: number;
  themeVariant?: 'light' | 'dark';
}

type NavItemContainerProps = ExtraNavProps &
  BoxProps & { href: LinkProps['href'] };

export interface NavItemProps extends ExtraNavProps {
  href: LinkProps['href'];
  text: string;
  handleDrawerToggle?: () => void;
}

const NavItemContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    !['width', 'textWidth', 'themeVariant'].includes(prop as string),
})<NavItemContainerProps>(({ theme, width, themeVariant = 'light' }) => ({
  width,
  height: 36,
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`, 
  borderRadius: 12,
  marginRight: theme.spacing(1),
  backgroundColor: themeVariant === 'light' ? theme.palette.background.default : '#060606',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  transition: 'background-color 0.3s ease, transform 0.1s ease',
  '&:hover': { 
    backgroundColor: themeVariant === 'light' ? theme.palette.background.paper : '#060606',
  },
  '&:active': { transform: 'scale(0.97)' },
}));

const NavItemText = styled(Typography, {
  shouldForwardProp: (prop) => !['textWidth', 'themeVariant'].includes(prop as string),
})<{ textWidth: number; themeVariant?: 'light' | 'dark' }>(({ theme, textWidth, themeVariant = 'light' }) => ({
  width: textWidth,
  height: 20,
  '&&': { fontSize: 16 }, 
  lineHeight: 1.25,
  color: themeVariant === 'light' ? theme.palette.text.primary : '#ffffff',
}));

export function NavItem({
  href,
  text,
  width,
  textWidth,
  handleDrawerToggle,
  themeVariant = 'light',
}: NavItemProps) {
  return (
    <NavItemContainer
      component={NextLink}
      href={href}
      width={width}
      textWidth={textWidth}
      themeVariant={themeVariant}
      onClick={() => handleDrawerToggle?.()}
    >
      <NavItemText textWidth={textWidth} themeVariant={themeVariant} variant="body2">
        {text}
      </NavItemText>
    </NavItemContainer>
  );
}
