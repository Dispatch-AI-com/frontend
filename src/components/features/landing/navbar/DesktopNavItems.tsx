'use client';

import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

import { NavItem, NavItemProps } from './NavItem';

interface DesktopNavItemsProps {
  navItems: NavItemProps[];
}

const DesktopNavContainer = styled(Stack)(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: theme.spacing(3.5), 
}));

export function DesktopNavItems({ navItems }: DesktopNavItemsProps) {
  return (
    <DesktopNavContainer direction="row" spacing={0}>
      {navItems.map((item) => (
        <NavItem
          key={
            typeof item.href === 'string'
              ? item.href
              : item.href.toString()
          }
          {...item}
        />
      ))}
    </DesktopNavContainer>
  );
}
