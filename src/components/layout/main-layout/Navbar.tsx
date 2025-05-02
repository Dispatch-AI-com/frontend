'use client';

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { AuthButton } from './navbar/AuthButton';
import { DesktopNavItems } from './navbar/DesktopNavItems';
import { MobileDrawer } from './navbar/MobileDrawer';
import { NavItemProps } from './navbar/NavItem';

const navItems: NavItemProps[] = [
  { href: '/', text: 'Home', width: 75, textWidth: 43 },
  { href: '/products', text: 'Products', width: 98, textWidth: 66 },
  { href: '/pricing', text: 'Pricing', width: 83, textWidth: 51 },
  { href: '/blogs', text: 'Blogs', width: 73, textWidth: 41 },
  { href: '/features', text: 'Features', width: 95, textWidth: 63 },
  { href: '/about', text: 'About Us', width: 98, textWidth: 66 },
];

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'sticky',
  height: 80,
  marginBottom: '0',
  zIndex: theme.zIndex.drawer + 1,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  width: '100%',
  maxWidth: 1920,
  padding: '30px 30px',
  margin: '0 auto',
  [theme.breakpoints.up('md')]: {
    paddingLeft: 50,
    paddingRight: 50,
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

const MobileMenuButton = styled(IconButton)(({ }) => ({
  marginLeft: 'auto',
  transition: 'transform 0.3s ease',
  borderRadius: 12,
  width: 40,
  height: 40,
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  display: 'block',
  [theme.breakpoints.up('md')]: { display: 'none' },
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: 240,
    padding: 20,
    transition: 'transform 0.3s ease-in-out',
  },
}));

interface NavbarProps {
  variant?: 'light' | 'dark';
}

export default function Navbar({ variant = 'light' }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <StyledAppBar 
      color="transparent" 
      elevation={0}
      sx={{
        backgroundColor: variant === 'light' ? theme.palette.background.default : '#060606',
        color: variant === 'light' ? 'inherit' : '#ffffff',
      }}
    >
      <StyledToolbar disableGutters>
        {/* Logo */}
        <LogoBox>
          <Link href="/" aria-label="Dispatch AI Home">
            <Image
              src={variant === 'light' ? "/logo.svg" : "/logo-dark.svg"}
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
            <DesktopNavItems navItems={navItems} themeVariant={variant} />
            <DesktopButtonGroup direction="row" spacing={0}>
              <AuthButton variant="login" themeVariant={variant} />
              <AuthButton variant="signup" themeVariant={variant} />
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
            sx={{
              backgroundColor: variant === 'light' ? theme.palette.background.paper : '#060606',
              color: variant === 'light' ? 'inherit' : '#ffffff',
              '&:hover': {
                backgroundColor: variant === 'light' ? theme.palette.background.paper : '#060606',
                color: variant === 'light' ? 'inherit' : '#ffffff',
              },
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
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: variant === 'light' ? theme.palette.background.default : '#060606',
            color: variant === 'light' ? 'inherit' : '#ffffff',
          },
        }}
      >
        <MobileDrawer
          handleDrawerToggle={handleDrawerToggle}
          navItems={navItems}
          themeVariant={variant}
        />
      </StyledDrawer>
    </StyledAppBar>
  );
}