'use client';

import NextLink, { LinkProps } from 'next/link';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { BoxProps } from '@mui/material/Box';

interface ExtraNavProps {
  width: number;
  textWidth: number;
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
    !['width', 'textWidth'].includes(prop as string),
})<NavItemContainerProps>(({ theme, width }) => ({
  width,
  height: 36,
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`, 
  borderRadius: 12,
  marginRight: theme.spacing(1),
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  transition: 'background-color 0.3s ease, transform 0.1s ease',
  '&:hover': { backgroundColor: theme.palette.background.paper },
  '&:active': { transform: 'scale(0.97)' },
}));

const NavItemText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'textWidth',
})<{ textWidth: number }>(({ theme, textWidth }) => ({
  width: textWidth,
  height: 20,
  '&&': { fontSize: 16 }, 
  lineHeight: 1.25,
  color: theme.palette.text.primary,
}));

export function NavItem({
  href,
  text,
  width,
  textWidth,
  handleDrawerToggle,
}: NavItemProps) {
  return (
    <NavItemContainer
      component={NextLink}
      href={href}
      width={width}
      textWidth={textWidth}
      onClick={() => handleDrawerToggle?.()}
    >
      <NavItemText textWidth={textWidth} variant="body2">
        {text}
      </NavItemText>
    </NavItemContainer>
  );
}
