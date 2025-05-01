'use client';

import { Box, List, ListItem, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

import { AuthButton } from './AuthButton';
import { NavItem, NavItemProps } from './NavItem';

interface MobileDrawerProps {
  handleDrawerToggle: () => void;
  navItems: NavItemProps[];
  themeVariant?: 'light' | 'dark';
}

const DrawerContainer = styled(Box)({
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  paddingTop: 48,
  paddingBottom: 48,
});

const ActionArea = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  alignItems: 'center',
  marginTop: 32,
});

const MobileDrawerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: theme.spacing(2),
}));

const MobileNavContainer = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

export function MobileDrawer({
  handleDrawerToggle,
  navItems,
  themeVariant = 'light',
}: MobileDrawerProps) {
  return (
    <MobileDrawerContainer>
      <MobileNavContainer spacing={2}>
        {navItems.map((item) => (
          <NavItem
            key={item.href.toString()}
            {...item}
            handleDrawerToggle={handleDrawerToggle}
            themeVariant={themeVariant}
          />
        ))}
      </MobileNavContainer>

      <ActionArea>
        <AuthButton variant="login" isMobile onClick={handleDrawerToggle} themeVariant={themeVariant} />
        <AuthButton variant="signup" isMobile onClick={handleDrawerToggle} themeVariant={themeVariant} />
      </ActionArea>
    </MobileDrawerContainer>
  );
}
