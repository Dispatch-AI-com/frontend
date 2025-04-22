import { Box, List, ListItem} from '@mui/material';
import { NavItem, NavItemProps } from './NavItem';
import { AuthButton } from './AuthButton';

interface MobileDrawerProps {
  handleDrawerToggle: () => void;
  navItems: NavItemProps[];
}

export function MobileDrawer({ handleDrawerToggle, navItems }: MobileDrawerProps) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 6,
        paddingBottom: 6,
      }}
    >
      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.href} sx={{ justifyContent: 'center', mb: 1.5 }}>
            <NavItem {...item} handleDrawerToggle={handleDrawerToggle} />
          </ListItem>
        ))}
      </List>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', mb: 6 }}>
        <AuthButton variant="login" isMobile onClick={handleDrawerToggle} />
        <AuthButton variant="signup" isMobile onClick={handleDrawerToggle} />
      </Box>
    </Box>
  );
}