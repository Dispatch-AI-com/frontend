import { Box, Drawer, styled } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import { useAppSelector } from '@/redux/hooks';

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
  dropdownOptions,
  anchorEl,
  openMenu,
  arrowUp,
  handleMenuOpen,
  handleMenuClose,
  ICON_SIZE,
}: MobileSidebarDrawerProps) {
  const user = useAppSelector(state => state.auth.user);

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
          <Link href="/admin/overview">
            <Image src="/logo.svg" alt="DispatchAI" width={126} height={28} />
          </Link>
        </LogoBox>
        {/* Navigation items */}
        <Box flex={1}>
          <DesktopSidebarNav navItems={navItems} />
        </Box>
        {/* Profile at the bottom */}
        <UserProfileMenu
          name={user?.firstName ?? user?.email?.split('@')[0] ?? 'User'}
          plan="Free Plan"
          avatarLetter={
            (user?.firstName ?? user?.email)?.charAt(0)?.toUpperCase() ?? 'U'
          }
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
