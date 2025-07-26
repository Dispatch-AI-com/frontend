'use client';

import { Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import { useAppSelector } from '@/redux/hooks';

import { AuthButton } from './AuthButton';
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
  padding: theme.spacing(2),
  alignItems: 'center',
}));

const MobileNavContainer = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(10),
  width: '100%',
  alignItems: 'center',
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
      <MobileNavContainer spacing={2}>
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
        {isHydrated && user ? (
          <UserProfileDropdown user={user} themeVariant={themeVariant} />
        ) : (
          <>
            <AuthButton
              variant="login"
              isMobile
              onClick={handleDrawerToggle}
              themeVariant={themeVariant}
            />
            <AuthButton
              variant="signup"
              isMobile
              onClick={handleDrawerToggle}
              themeVariant={themeVariant}
            />
          </>
        )}
      </ActionArea>
    </MobileDrawerContainer>
  );
}
