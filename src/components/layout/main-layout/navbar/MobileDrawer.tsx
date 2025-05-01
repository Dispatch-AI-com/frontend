'use client';

import { Box, List, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';

import { AuthButton } from './AuthButton';
import { NavItem, NavItemProps } from './NavItem';

interface MobileDrawerProps {
  handleDrawerToggle: () => void;
  navItems: NavItemProps[];
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

export function MobileDrawer({
  handleDrawerToggle,
  navItems,
}: MobileDrawerProps) {
  return (
    <DrawerContainer>
      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItem
            key={
              typeof item.href === 'string'
                ? item.href
                : item.href.toString()
            }
            sx={{ justifyContent: 'center', mb: 1.5 }}
          >
            <NavItem {...item} handleDrawerToggle={handleDrawerToggle} />
          </ListItem>
        ))}
      </List>

      <ActionArea>
        <AuthButton variant="login" isMobile onClick={handleDrawerToggle} />
        <AuthButton variant="signup" isMobile onClick={handleDrawerToggle} />
      </ActionArea>
    </DrawerContainer>
  );
}
