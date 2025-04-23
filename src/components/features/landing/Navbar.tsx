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

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        height: 80,
        backgroundColor: '#fff',
        mb: '100px',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          width: '100%',
          maxWidth: 1920,
          px: { xs: '20px', md: '240px' },
          py: '20px',
          mx: 'auto'
        }}
      >
        {/* Logo */}
        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            margin: '2px 0',
          }}
        >
          <Link href="/" aria-label="Dispatch AI Home">
            <Image
              src="/logo.svg"
              alt="Dispatch AI logo"
              width={152}
              height={36}
              priority
              style={{
                cursor: 'pointer',
                display: 'block',
              }}
            />
          </Link>
        </Box>

        {/* Desktop Nav */}
        {!isMobile && <DesktopNavItems navItems={navItems} />}

        {/* Desktop Buttons */}
        {!isMobile && (
          <Stack 
            direction="row" 
            spacing={0} 
            sx={{ 
              alignItems: 'center',
              marginLeft: 'auto'
            }}
          >
            <AuthButton variant="login" />
            <AuthButton variant="signup" />
          </Stack>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
          color="inherit"
          aria-label="toggle drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            ml: 'auto',
            transition: 'transform 0.3s ease',
            transform: mobileOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            backgroundColor: '#f5f5f5',
            borderRadius: '12px',
            width: 40,
            height: 40,
            '&:hover': {
              backgroundColor: '#F5F5F5',
            },
          }}
        >
          {mobileOpen ? <CloseIcon fontSize="medium" /> : <MenuIcon fontSize="medium" />}
          </IconButton>
        )}
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, 
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240,
            padding: '20px',
            transition: 'transform 0.3s ease-in-out',
          },
        }}
      >
        <MobileDrawer handleDrawerToggle={handleDrawerToggle} navItems={navItems} />
      </Drawer>
    </AppBar>
  );
}