'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Box,
  Stack,
  Typography,
} from '@mui/material';
import { NavItem, NavItemProps } from './navbar/NavItem';

const navItems: NavItemProps[] = [
  { href: '/home', text: 'Home', width: 75, textWidth: 43 },
  { href: '/products', text: 'Products', width: 98, textWidth: 66 },
  { href: '/pricing', text: 'Pricing', width: 83, textWidth: 51 },
  { href: '/blogs', text: 'Blogs', width: 73, textWidth: 41 },
  { href: '/features', text: 'Features', width: 95, textWidth: 63 },
  { href: '/about', text: 'About Us', width: 98, textWidth: 66 },
];

export default function Navbar() {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        height: 80,
        backgroundColor: '#fff',
        mb: '100px',
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          width: '100%',
          maxWidth: 1920,
          px: '240px',
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
              style={{
                cursor: 'pointer',
                display: 'block',
              }}
            />
          </Link>
        </Box>

        {/* navigation */}
        <Stack 
          direction="row" 
          spacing={0}
          sx={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {navItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </Stack>

        {/* Button */}
        <Stack 
          direction="row" 
          spacing={0} 
          sx={{ 
            alignItems: 'center',
            marginLeft: 'auto'
          }}
        >
          {/* Login */}
          <Link href="/login">
            <Box
              sx={{
                width: 73,
                height: 40,
                padding: '10px 16px',
                borderRadius: '12px',
                backgroundColor: '#fff',
                marginRight: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  backgroundColor: '#F5F5F5',
                },
              }}
            >
              <Typography
                sx={{
                  width: 41,
                  height: 20,
                  fontFamily: 'Roboto',
                  fontSize: 16,
                  fontWeight: 'bold',
                  fontStretch: 'normal',
                  fontStyle: 'normal',
                  lineHeight: 1.25,
                  letterSpacing: 'normal',
                  color: '#060606',
                }}
              >
                Login
              </Typography>
            </Box>
          </Link>

          {/* Sign Up */}
          <Link href="/signup">
            <Box
              sx={{
                width: 89,
                height: 40,
                padding: '10px 16px',
                borderRadius: '12px',
                backgroundColor: '#060606',
                marginLeft: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  backgroundColor: '#333',
                },
              }}
            >
              <Typography
                sx={{
                  maxWidth: 57,
                  fontFamily: 'Roboto',
                  fontSize: 16,
                  fontWeight: 'bold',
                  fontStretch: 'normal',
                  fontStyle: 'normal',
                  lineHeight: 1.25,
                  letterSpacing: 'normal',
                  color: '#fff',
                }}
              >
                Sign Up
              </Typography>
            </Box>
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}