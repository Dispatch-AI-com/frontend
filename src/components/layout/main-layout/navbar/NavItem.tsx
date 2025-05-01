'use client';
import { Box, Typography } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import NextLink, { LinkProps } from 'next/link';


interface ExtraNavProps {
  width: number;
  textWidth: number;
}

type NavItemContainerProps = ExtraNavProps &
  BoxProps & { href: LinkProps['href'] } & { themeMode?: 'light' | 'dark' };

export interface NavItemProps extends ExtraNavProps {
  href: LinkProps['href'];
  text: string;
  handleDrawerToggle?: () => void;
  themeMode?: 'light' | 'dark';
}

const NavItemContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    !['width', 'textWidth', 'themeMode'].includes(prop as string),
})<NavItemContainerProps>(({ theme, width, themeMode = 'light' }) => ({
  width,
  height: 36,
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`, 
  borderRadius: 12,
  marginRight: theme.spacing(1),
  backgroundColor: themeMode === 'dark' ? theme.palette.background.dark : theme.palette.background.default,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  transition: 'background-color 0.3s ease, transform 0.1s ease',
  '&:hover': { 
    backgroundColor: themeMode === 'dark' ? '#060606' : theme.palette.background.paper 
  },
  '&:active': { transform: 'scale(0.97)' },
}));

const NavItemText = styled(Typography, {
  shouldForwardProp: (prop) => !['textWidth', 'themeMode'].includes(prop as string),
})<{ textWidth: number; themeMode?: 'light' | 'dark' }>(({ theme, textWidth, themeMode = 'light' }) => ({
  width: textWidth,
  height: 20,
  '&&': { fontSize: 16 }, 
  lineHeight: 1.25,
  color: themeMode === 'dark' ? theme.palette.text.white : theme.palette.text.primary,
}));

export function NavItem({
  href,
  text,
  width,
  textWidth,
  handleDrawerToggle,
  themeMode = 'light',
}: NavItemProps) {
  return (
    <NavItemContainer
      component={NextLink}
      href={href}
      width={width}
      textWidth={textWidth}
      themeMode={themeMode}
      onClick={() => handleDrawerToggle?.()}
    >
      <NavItemText textWidth={textWidth} themeMode={themeMode} variant="body2">
        {text}
      </NavItemText>
    </NavItemContainer>
  );
}
