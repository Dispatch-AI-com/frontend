'use client';

import { Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { NavItemProps as OriginalNavItemProps } from './NavItem';
import { NavItem } from './NavItem';

interface NavItemProps extends Omit<OriginalNavItemProps, 'href'> {
  href: string;
}

interface MobileDrawerProps {
  handleDrawerToggle: () => void;
  navItems: NavItemProps[];
  themeVariant?: 'light' | 'dark' | 'green';
}

const MobileDrawerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: theme.spacing(0, 0, 0, 1),
  alignItems: 'flex-start',
  [theme.breakpoints.between('sm', 'md')]: {
    paddingLeft: theme.spacing(2),
  },
}));

const MobileNavContainer = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(8),
  width: '100%',
  alignItems: 'flex-start',
}));

export function MobileDrawer({
  handleDrawerToggle,
  navItems,
  themeVariant = 'light',
}: MobileDrawerProps) {
  return (
    <MobileDrawerContainer>
      <MobileNavContainer spacing={0}>
        {navItems.map(item => (
          <NavItem
            key={item.href}
            {...item}
            handleDrawerToggle={handleDrawerToggle}
            themeVariant={themeVariant}
            isMobile={true}
          />
        ))}
      </MobileNavContainer>
    </MobileDrawerContainer>
  );
}
