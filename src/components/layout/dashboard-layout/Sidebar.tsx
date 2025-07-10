'use client';

import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Box, IconButton, Link, styled, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import { useAppSelector } from '@/redux/hooks';
import theme from '@/theme';

import DesktopSidebarNav from './DesktopSidebarNav';
import MobileSidebarDrawer from './MobileSidebarDrawer';
import UserProfileMenu from './UserProfileMenu';

const SidebarContainer = styled(Box, {
  shouldForwardProp: prop => prop !== 'isCollapsed',
})<{ isCollapsed?: boolean }>(({ theme, isCollapsed }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: isCollapsed ? 80 : 240,
  transition: 'width 0.2s',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  background: 'linear-gradient(to bottom, #effbf5, #fff 100%)',
  padding: theme.spacing(2, 0),
}));

const LogoBox = styled(Box, {
  shouldForwardProp: prop => prop !== 'isCollapsed',
})<{ isCollapsed?: boolean }>(({ isCollapsed }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: isCollapsed ? 'center' : 'flex-start',
  marginLeft: isCollapsed ? 0 : 20,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

const ICON_SIZE = 16;

const navItems = [
  {
    label: 'Overview',
    iconSrc: '/dashboard/sidebar/overview.svg',
    iconAlt: 'Overview',
    href: '/admin/overview',
  },
  {
    label: 'Inbox',
    iconSrc: '/dashboard/sidebar/inbox.svg',
    iconAlt: 'Inbox',
    href: '/admin/inbox',
  },
  {
    label: 'Service',
    iconSrc: '/dashboard/sidebar/service.svg',
    iconAlt: 'Service',
    href: '/admin/service',
  },
  {
    label: 'Service Management',
    iconSrc: '/dashboard/sidebar/service-management.svg',
    iconAlt: 'Service Management',
    href: '/admin/service-management',
  },
  {
    label: 'Calendar',
    iconSrc: '/dashboard/sidebar/calendar.svg',
    iconAlt: 'Calendar',
    href: '/admin/calendar',
  },
  {
    label: 'Billing',
    iconSrc: '/dashboard/sidebar/billing.svg',
    iconAlt: 'Billing',
    href: '/admin/billing',
  },
  {
    label: 'Dispatch AI Setup',
    iconSrc: '/dashboard/sidebar/AI-setup.svg',
    iconAlt: 'Dispatch AI Setup',
    href: '/admin/ai-setup',
  },
  {
    label: 'Settings',
    iconSrc: '/dashboard/sidebar/settings.svg',
    iconAlt: 'Settings',
    href: '/admin/settings',
  },
];

const dropdownOptions = [
  {
    label: 'Switch Account',
    iconSrc: '/dashboard/sidebar/account-switch.svg',
    iconAlt: 'Switch Account',
    action: 'logout',
  },
  {
    label: 'Sign out',
    iconSrc: '/dashboard/sidebar/sign-out.svg',
    iconAlt: 'Sign out',
    action: 'logout',
  },
];

export default function Sidebar() {
  const user = useAppSelector(state => state.auth.user);
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
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [arrowUp, setArrowUp] = React.useState(false);

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
        <SidebarContainer isCollapsed={isMediumScreen}>
          <LogoBox isCollapsed={isMediumScreen}>
            <Link href="/admin/overview">
              {!isMediumScreen && (
                <Image
                  src="/logo.svg"
                  alt="DispatchAI"
                  width={126}
                  height={30}
                />
              )}
            </Link>
          </LogoBox>
          <DesktopSidebarNav navItems={navItems} isCollapsed={isMediumScreen} />
          <UserProfileMenu
            name={user?.firstName ?? 'User'}
            plan="Free Plan"
            avatarLetter={user?.firstName?.charAt(0)?.toUpperCase() ?? 'U'}
            dropdownOptions={dropdownOptions}
            anchorEl={anchorEl}
            open={open}
            arrowUp={arrowUp}
            handleMenuOpen={handleMenuOpen}
            handleMenuClose={handleMenuClose}
            ICON_SIZE={ICON_SIZE}
            isCollapsed={isMediumScreen}
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
