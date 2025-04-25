import { Stack } from '@mui/material';
import { NavItem, NavItemProps } from './NavItem';

interface DesktopNavItemsProps {
  navItems: NavItemProps[];
}

export function DesktopNavItems({ navItems }: DesktopNavItemsProps) {
  return (
    <Stack 
      direction="row" 
      spacing={0}
      sx={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '28px'
      }}
    >
      {navItems.map((item) => (
        <NavItem key={item.href} {...item} />
      ))}
    </Stack>
  );
}
