'use client';

import { Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import { useAppSelector } from '@/redux/hooks';

import type { NavItemProps as OriginalNavItemProps } from './NavItem';
import { NavItem } from './NavItem';
import { UserProfileDropdown } from './UserProfileDropdown';

interface NavItemProps extends Omit<OriginalNavItemProps, 'href'> {
  href: string;
}

interface MobileDrawerProps {
  handleDrawerToggle: () => void;
  navItems: NavItemProps[];
  themeVariant?: 'light' | 'dark' | 'green';
}

const ActionArea = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  alignItems: 'center',
  marginTop: 'auto',
  marginBottom: 48,
});

const MobileDrawerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: theme.spacing(0, 0, 0, 1),
  alignItems: 'flex-start',
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
  const [isHydrated, setIsHydrated] = useState(false);
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    setIsHydrated(true);
  }, []);
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

      <ActionArea>
        {isHydrated && user && (
          <UserProfileDropdown user={user} themeVariant={themeVariant} />
        )}
      </ActionArea>
    </MobileDrawerContainer>
  );
}
