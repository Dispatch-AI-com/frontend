'use client';

import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Box, IconButton, Link, styled, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import theme from '@/theme';

import DesktopSidebarNav from './DesktopSidebarNav';
import MobileSidebarDrawer from './MobileSidebarDrawer';
import UserProfileMenu from './UserProfileMenu';

const SidebarContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: 240,
  transition: 'width 0.2s',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  background: 'linear-gradient(to bottom, #effbf5, #fff 100%)',
  padding: theme.spacing(2, 0),
}));

const LogoBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  minHeight: theme.spacing(6),
});

const ICON_SIZE = 16;

const navItems = [
  {
    label: 'Overview',
    iconSrc: '/dashboard/sidebar/overview.svg',
    iconAlt: 'Overview',
    href: '/dashboard',
  },
  {
    label: 'Inbox',
    iconSrc: '/dashboard/sidebar/inbox.svg',
    iconAlt: 'Inbox',
    href: '/inbox',
  },
  {
    label: 'Service',
    iconSrc: '/dashboard/sidebar/service.svg',
    iconAlt: 'Service',
    href: '/service',
  },
  {
    label: 'Calendar',
    iconSrc: '/dashboard/sidebar/calendar.svg',
    iconAlt: 'Calendar',
    href: '/calendar',
  },
  {
    label: 'Billing',
    iconSrc: '/dashboard/sidebar/billing.svg',
    iconAlt: 'Billing',
    href: '/billing',
  },
  {
    label: 'Dispatch AI Setup',
    iconSrc: '/dashboard/sidebar/AI-setup.svg',
    iconAlt: 'Dispatch AI Setup',
    href: '/ai-setup',
  },
  {
    label: 'Settings',
    iconSrc: '/dashboard/sidebar/settings.svg',
    iconAlt: 'Settings',
    href: '/settings',
  },
];

const dropdownOptions = [
  {
    label: 'Switch Account',
    iconSrc: '/dashboard/sidebar/account-switch.svg',
    iconAlt: 'Switch Account',
  },
  {
    label: 'Sign out',
    iconSrc: '/dashboard/sidebar/sign-out.svg',
    iconAlt: 'Sign out',
    href: '/logout',
  },
];

export default function Sidebar() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setArrowUp(true);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setArrowUp(false);
  };

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [arrowUp, setArrowUp] = React.useState(false);
  const router = useRouter();

  return (
    <>
      {/* Hamburger icon for small screens */}
      {isSmallScreen && !mobileOpen && (
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            top: 12,
            left: 12,
            zIndex: 1201,
            backgroundColor: '#fff',
            boxShadow: 1,
          }}
        >
          <MenuOpenIcon />
        </IconButton>
      )}
      {/* Sidebar for desktop */}
      {!isSmallScreen && (
        <SidebarContainer>
          <LogoBox>
            <Link href="/dashboard">
              <Image src="/logo.svg" alt="DispatchAI" width={126} height={28} />
            </Link>
          </LogoBox>
          <DesktopSidebarNav
            navItems={navItems}
            activeIndex={activeIndex}
            onNavItemClick={index => {
              if (index >= 0 && index < navItems.length) {
                setActiveIndex(index);
                router.push(navItems[index].href);
              }
            }}
          />
          <UserProfileMenu
            name="Jeon"
            plan="Free Plan"
            avatarLetter="J"
            dropdownOptions={dropdownOptions}
            anchorEl={anchorEl}
            open={open}
            arrowUp={arrowUp}
            handleMenuOpen={handleMenuOpen}
            handleMenuClose={handleMenuClose}
            ICON_SIZE={ICON_SIZE}
          />
        </SidebarContainer>
      )}

      {/* Sidebar for mobile */}
      <MobileSidebarDrawer
        open={mobileOpen}
        onClose={handleDrawerToggle}
        navItems={navItems}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        dropdownOptions={dropdownOptions}
        anchorEl={anchorEl}
        openMenu={open}
        arrowUp={arrowUp}
        handleMenuOpen={handleMenuOpen}
        handleMenuClose={handleMenuClose}
        ICON_SIZE={ICON_SIZE}
      />
    </>
  );
}
