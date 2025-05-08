'use client';
import { Box, Typography } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import NextLink, { LinkProps } from 'next/link';


interface ExtraNavProps {
  width: number;
  textWidth: number;
  themeVariant?: 'light' | 'dark';
  isMobile?: boolean;
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
    !['width', 'textWidth', 'themeVariant', 'isMobile'].includes(prop as string),
})<NavItemContainerProps>(({ theme, width, themeVariant = 'light', isMobile }) => ({
  width: isMobile ? 'auto' : width,
  height: 36,
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`, 
  borderRadius: 12,
  marginRight: theme.spacing(1),
  backgroundColor: themeVariant === 'light' ? theme.palette.background.default : '#060606',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  '&:hover': { 
    backgroundColor: themeVariant === 'light' ? theme.palette.background.paper : '#060606',
  },
  '&:active': { transform: 'scale(0.97)' },
  [theme.breakpoints.down('lg')]: {
    width: 'auto',
    padding: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
    marginRight: theme.spacing(0.5),
  },
}));

const NavItemText = styled(Typography, {
  shouldForwardProp: (prop) => !['textWidth', 'themeVariant', 'isMobile'].includes(prop as string),
})<{ textWidth: number; themeVariant?: 'light' | 'dark'; isMobile?: boolean }>(
  ({ theme, textWidth, themeVariant = 'light', isMobile }) => ({
    width: isMobile ? 'auto' : textWidth,
    height: isMobile ? 24 : 20,
    '&&': { 
      fontSize: isMobile ? 20 : 16,
      fontWeight: isMobile ? 500 : 400,
      whiteSpace: 'nowrap',
    },
    lineHeight: 1.25,
    color: themeVariant === 'light' ? theme.palette.text.primary : '#ffffff',
    [theme.breakpoints.down('lg')]: {
      fontSize: 14,
      width: 'auto',
    },
  })
);

export function NavItem({
  href,
  text,
  width,
  textWidth,
  handleDrawerToggle,
  themeVariant = 'light',
  isMobile,
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
      <NavItemText 
        textWidth={textWidth} 
        themeVariant={themeVariant} 
        variant="body2"
        isMobile={isMobile}
      >
        {text}
      </NavItemText>
    </NavItemContainer>
  );
}
