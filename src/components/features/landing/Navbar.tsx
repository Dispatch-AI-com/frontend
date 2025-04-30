'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Stack,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { NavItemProps } from './navbar/NavItem';
import { MobileDrawer } from './navbar/MobileDrawer';
import { DesktopNavItems } from './navbar/DesktopNavItems';
import { AuthButton } from './navbar/AuthButton';

const navItems: NavItemProps[] = [
  { href: '/home', text: 'Home', width: 75, textWidth: 43 },
  { href: '/products', text: 'Products', width: 98, textWidth: 66 },
  { href: '/pricing', text: 'Pricing', width: 83, textWidth: 51 },
  { href: '/blogs', text: 'Blogs', width: 73, textWidth: 41 },
  { href: '/features', text: 'Features', width: 95, textWidth: 63 },
  { href: '/about', text: 'About Us', width: 98, textWidth: 66 },
];

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'themeMode',
})<{ themeMode?: 'light' | 'dark' }>(({ theme, themeMode = 'light' }) => ({
  position: 'fixed',
  height: 80,
  backgroundColor: themeMode === 'dark' ? '#060606' : theme.palette.background.default,
  marginBottom: '100px',
  zIndex: theme.zIndex.drawer + 1,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  width: '100%',
  maxWidth: 1920,
  padding: '20px 20px',
  margin: '0 auto',
  [theme.breakpoints.up('md')]: {
    paddingLeft: 240,
    paddingRight: 240,
  },
}));

const LogoBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  margin: '2px 0',
});

const DesktopButtonGroup = styled(Stack)({
  alignItems: 'center',
  marginLeft: 'auto',
});

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  marginLeft: 'auto',
  transition: 'transform 0.3s ease',
  backgroundColor: theme.palette.background.paper,
  borderRadius: 12,
  width: 40,
  height: 40,
  '&:hover': { backgroundColor: theme.palette.background.paper },
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  display: 'block',
  [theme.breakpoints.up('md')]: { display: 'none' },
  '& .MuiDrawer-paper': {
    backgroundColor: theme.palette.background.default,
    boxSizing: 'border-box',
    width: 240,
    padding: 20,
    transition: 'transform 0.3s ease-in-out',
  },
}));

interface NavbarProps {
  themeMode?: 'light' | 'dark';
}

export default function Navbar({ themeMode = 'light' }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <StyledAppBar color="transparent" elevation={0} themeMode={themeMode}>
      <StyledToolbar disableGutters>
        {/* Logo */}
        <LogoBox>
          <Link href="/" aria-label="Dispatch AI Home">
            <Image
              src={themeMode === 'dark' ? "/logo_white.svg" : "/logo.svg"}
              alt="Dispatch AI logo"
              width={152}
              height={36}
              priority
              style={{ cursor: 'pointer', display: 'block' }}
            />
          </Link>
        </LogoBox>

        {/* Desktop */}
        {!isMobile && (
          <>
            <DesktopNavItems navItems={navItems} themeMode={themeMode} />
            <DesktopButtonGroup direction="row" spacing={0}>
              <AuthButton variant="login" themeMode={themeMode} />
              <AuthButton variant="signup" themeMode={themeMode} />
            </DesktopButtonGroup>
          </>
        )}

        {/* Mobile */}
        {isMobile && (
          <MobileMenuButton
            color="inherit"
            aria-label="toggle drawer"
            edge="start"
            onClick={handleDrawerToggle}
            style={{
              transform: mobileOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            }}
          >
            {mobileOpen ? (
              <CloseIcon fontSize="medium" />
            ) : (
              <MenuIcon fontSize="medium" />
            )}
          </MobileMenuButton>
        )}
      </StyledToolbar>

      {/* Mobile Drawer */}
      <StyledDrawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        <MobileDrawer
          handleDrawerToggle={handleDrawerToggle}
          navItems={navItems}
        />
      </StyledDrawer>
    </StyledAppBar>
  );
}