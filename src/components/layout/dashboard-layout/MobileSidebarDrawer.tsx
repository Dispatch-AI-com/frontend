import { Box, Drawer, styled } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import DesktopSidebarNav from './DesktopSidebarNav';
import UserProfileMenu from './UserProfileMenu';

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 240,
  transition: 'width 0.2s',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  background: 'linear-gradient(to bottom, #effbf5, #fff 100%)',
  padding: theme.spacing(2, 0),
}));

const LogoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  minHeight: theme.spacing(6),
}));

interface MobileSidebarDrawerProps {
  open: boolean;
  onClose: () => void;
  navItems: { label: string; iconSrc: string; iconAlt: string; href: string }[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  dropdownOptions: {
    label: string;
    iconSrc: string;
    iconAlt: string;
    href?: string;
  }[];
  anchorEl: null | HTMLElement;
  openMenu: boolean;
  arrowUp: boolean;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
  ICON_SIZE: number;
}

export default function MobileSidebarDrawer({
  open,
  onClose,
  navItems,
  activeIndex,
  setActiveIndex,
  dropdownOptions,
  anchorEl,
  openMenu,
  arrowUp,
  handleMenuOpen,
  handleMenuClose,
  ICON_SIZE,
}: MobileSidebarDrawerProps) {
  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': {
          width: 240,
        },
      }}
    >
      <SidebarContainer>
        {/* Logo at the top */}
        <LogoBox>
          <Link href="/dashboard">
            <Image src="/logo.svg" alt="DispatchAI" width={126} height={28} />
          </Link>
        </LogoBox>
        {/* Navigation items */}
        <Box flex={1}>
          <DesktopSidebarNav
            navItems={navItems}
            activeIndex={activeIndex}
            onNavItemClick={index => {
              if (index >= 0 && index < navItems.length) {
                setActiveIndex(index);
                onClose();
              }
            }}
          />
        </Box>
        {/* Profile at the bottom */}
        <UserProfileMenu
          name="Jeon"
          plan="Free Plan"
          avatarLetter="J"
          dropdownOptions={dropdownOptions}
          anchorEl={anchorEl}
          open={openMenu}
          arrowUp={arrowUp}
          handleMenuOpen={handleMenuOpen}
          handleMenuClose={handleMenuClose}
          ICON_SIZE={ICON_SIZE}
        />
      </SidebarContainer>
    </Drawer>
  );
}
