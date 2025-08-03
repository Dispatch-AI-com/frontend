'use client';
import { Box, Typography } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import type { LinkProps } from 'next/link';
import NextLink from 'next/link';

interface ExtraNavProps {
  width: number;
  textWidth: number;
  themeVariant?: 'light' | 'dark' | 'green';
  isMobile?: boolean;
}

type NavItemContainerProps = ExtraNavProps &
  BoxProps & { href: LinkProps['href'] };

export interface NavItemProps extends ExtraNavProps {
  href: string;
  text: string;
  handleDrawerToggle?: () => void;
}

const NavItemContainer = styled(Box, {
  shouldForwardProp: prop =>
    !['width', 'textWidth', 'themeVariant', 'isMobile'].includes(
      prop as string,
    ),
})<NavItemContainerProps>(
  ({ theme, width, themeVariant = 'light', isMobile }) => ({
    width: isMobile ? 'auto' : width,
    height: isMobile ? 64 : 36,
    padding: isMobile
      ? `0 ${theme.spacing(2)}`
      : `${theme.spacing(1)} ${theme.spacing(2)}`,
    borderRadius: 12,
    marginRight: theme.spacing(1),
    backgroundColor:
      themeVariant === 'light'
        ? theme.palette.background.default
        : themeVariant === 'dark'
          ? '#060606'
          : '#f8fff3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor:
        themeVariant === 'light'
          ? theme.palette.background.paper
          : themeVariant === 'dark'
            ? '#060606'
            : '#f8fff3',
    },
    '&:active': { transform: 'scale(0.97)' },
    [theme.breakpoints.down('lg')]: {
      width: 'auto',
      padding: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
      marginRight: theme.spacing(0.5),
    },
  }),
);

const NavItemText = styled(Typography, {
  shouldForwardProp: prop =>
    !['textWidth', 'themeVariant', 'isMobile'].includes(prop as string),
})<{
  textWidth: number;
  themeVariant?: 'light' | 'dark' | 'green';
  isMobile?: boolean;
}>(({ theme, textWidth, themeVariant = 'light', isMobile }) => ({
  width: isMobile ? 'auto' : textWidth,
  height: isMobile ? 24 : undefined,
  lineHeight: 1.25,
  whiteSpace: 'nowrap',
  color: themeVariant === 'dark' ? '#ffffff' : theme.palette.text.primary,
  ...(isMobile && {
    fontSize: 16,
    fontWeight: 500,
  }),
}));

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
      href={href === '/features' ? '/features#features-banner' : href}
      width={width}
      textWidth={textWidth}
      themeVariant={themeVariant}
      isMobile={isMobile}
      onClick={() => handleDrawerToggle?.()}
    >
      <NavItemText
        textWidth={textWidth}
        themeVariant={themeVariant}
        isMobile={isMobile}
        variant="body1"
      >
        {text}
      </NavItemText>
    </NavItemContainer>
  );
}
