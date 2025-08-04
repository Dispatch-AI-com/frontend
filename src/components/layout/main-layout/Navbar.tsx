'use client';

import {
  AppBar,
  Box,
  Container,
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
import { useEffect, useState } from 'react';

import { useAppSelector } from '@/redux/hooks';

import { AuthButton } from './navbar/AuthButton';
import { DesktopNavItems } from './navbar/DesktopNavItems';
import { MobileDrawer } from './navbar/MobileDrawer';
import type { NavItemProps } from './navbar/NavItem';
import { UserProfileDropdown } from './navbar/UserProfileDropdown';

const navItems: NavItemProps[] = [
  { href: '/', text: 'Home', width: 70, textWidth: 38 },
  { href: '/products', text: 'Products', width: 90, textWidth: 58 },
  { href: '/pricing', text: 'Pricing', width: 77, textWidth: 45 },
  { href: '/blogs', text: 'Blogs', width: 68, textWidth: 36 },
  { href: '/features', text: 'Features', width: 87, textWidth: 55 },
  { href: '/about', text: 'About Us', width: 90, textWidth: 58 },
];

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  marginBottom: '0',
  zIndex: theme.zIndex.drawer + 1,
  [theme.breakpoints.down('md')]: {
    borderBottom: '0.5px solid rgba(0, 0, 0, 0.12)',
  },
}));

const StyledToolbar = styled(Toolbar)({
  width: '100%',
  maxWidth: '1920px',
  display: 'flex',
  justifyContent: 'space-between',
  transition: 'padding 0.3s ease',
});

const LogoBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  margin: '2px 0',
});

const DesktopButtonGroup = styled(Stack)({
  alignItems: 'center',
  marginLeft: 'auto',
});

const MobileMenuButton = styled(IconButton)(() => ({
  transition: 'transform 0.3s ease',
  width: 20,
  height: 20,
  padding: 0,
  minWidth: 'auto',
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  display: 'block',
  [theme.breakpoints.up('md')]: { display: 'none' },
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: '100vw',
    height: '100vh',
    padding: 0,
    margin: 0,
    transition: 'transform 0.3s ease-in-out',
  },
}));

interface NavbarProps {
  variant?: 'light' | 'dark' | 'green';
}

export default function Navbar({ variant = 'light' }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <StyledAppBar
      color="transparent"
      elevation={0}
      sx={{
        backgroundColor:
          variant === 'light'
            ? theme.palette.background.default
            : variant === 'dark'
              ? '#060606'
              : '#f8fff3',
        color: variant === 'dark' ? '#ffffff' : 'inherit',
      }}
    >
      <Container maxWidth="xl">
        <StyledToolbar disableGutters sx={{ minHeight: { xs: 48, md: 72 } }}>
          {/* Logo */}
          <LogoBox>
            <Link href="/" aria-label="Dispatch AI Home">
              <Image
                src={variant === 'dark' ? '/logo-dark.svg' : '/logo.svg'}
                alt="Dispatch AI logo"
                width={isMobile ? 105 : 126}
                height={isMobile ? 25 : 30}
                priority
                style={{ cursor: 'pointer', display: 'block' }}
              />
            </Link>
          </LogoBox>

          {/* Desktop */}
          {!isMobile && (
            <>
              <DesktopNavItems navItems={navItems} themeVariant={variant} />
              <DesktopButtonGroup direction="row" spacing={1.5}>
                {isHydrated && user ? (
                  <UserProfileDropdown user={user} themeVariant={variant} />
                ) : (
                  <>
                    <AuthButton variant="login" themeVariant={variant} />
                    <AuthButton variant="signup" themeVariant={variant} />
                  </>
                )}
              </DesktopButtonGroup>
            </>
          )}

          {/* Mobile */}
          {isMobile && (
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ marginLeft: 'auto', alignItems: 'center' }}
            >
              {/* Auth Buttons for Mobile */}
              <Stack direction="row" spacing={1} sx={{ marginRight: 2.5 }}>
                {isHydrated && user ? (
                  <UserProfileDropdown user={user} themeVariant={variant} />
                ) : (
                  <>
                    <AuthButton variant="login" themeVariant={variant} />
                    <AuthButton variant="signup" themeVariant={variant} />
                  </>
                )}
              </Stack>

              <MobileMenuButton
                color="inherit"
                aria-label="toggle drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  backgroundColor:
                    variant === 'light'
                      ? theme.palette.background.paper
                      : variant === 'dark'
                        ? '#060606'
                        : '#f8fff3',
                  color: variant === 'dark' ? '#ffffff' : 'inherit',
                  '&:hover': {
                    backgroundColor:
                      variant === 'light'
                        ? theme.palette.background.paper
                        : variant === 'dark'
                          ? '#060606'
                          : '#f8fff3',
                    color: variant === 'dark' ? '#ffffff' : 'inherit',
                  },
                  transform: mobileOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                }}
              >
                {mobileOpen ? (
                  <Image
                    src="/navbar_close.svg"
                    alt="Close"
                    width={20}
                    height={20}
                    style={{
                      filter: variant === 'dark' ? 'invert(1)' : 'none',
                    }}
                  />
                ) : (
                  <Image
                    src="/navbar_menu.svg"
                    alt="Menu"
                    width={20}
                    height={20}
                    style={{
                      filter: variant === 'dark' ? 'invert(1)' : 'none',
                    }}
                  />
                )}
              </MobileMenuButton>
            </Stack>
          )}
        </StyledToolbar>
      </Container>

      {/* Mobile Drawer */}
      <StyledDrawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor:
              variant === 'light'
                ? theme.palette.background.default
                : variant === 'dark'
                  ? '#060606'
                  : '#f8fff3',
            color: variant === 'dark' ? '#ffffff' : 'inherit',
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
