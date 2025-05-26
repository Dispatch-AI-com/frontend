'use client';

import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { NavItemProps as OriginalNavItemProps } from './NavItem';
import { NavItem } from './NavItem';

interface DesktopNavItemsProps {
  navItems: NavItemProps[];
  themeVariant?: 'light' | 'dark';
}

interface NavItemProps extends Omit<OriginalNavItemProps, 'href'> {
  href: string;
}

const DesktopNavContainer = styled(Stack)(() => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}));

export function DesktopNavItems({
  navItems,
  themeVariant = 'light',
}: DesktopNavItemsProps) {
  return (
    <DesktopNavContainer direction="row" spacing={0}>
      {navItems.map(item => (
        <NavItem key={item.href} {...item} themeVariant={themeVariant} />
      ))}
    </DesktopNavContainer>
  );
}
