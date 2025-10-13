'use client';

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { useSubscription } from '@/features/subscription/useSubscription';
import { getPlanTier, isProPlan } from '@/utils/planUtils';

const ICON_SIZE = 16;
interface NavItem {
  label: string;
  iconSrc: string;
  iconAlt: string;
  href: string;
}

interface DesktopSidebarNavProps {
  navItems: NavItem[];
  isCollapsed?: boolean;
}

function NavIcon({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{ display: 'block' }}
    />
  );
}

export default function DesktopSidebarNav({
  navItems,
  isCollapsed = false,
}: DesktopSidebarNavProps) {
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const { subscription } = useSubscription();
  const planTier = getPlanTier(subscription);
  const isPro = isProPlan(planTier);

  // Find the active index based on current route
  const activeIndex = navItems.findIndex(item => item.href === pathname);

  return (
    <>
      <List>
        {navItems.map((item, idx) => (
          <ListItemButton
            key={item.label}
            selected={activeIndex === idx}
            onClick={() => {
              const restricted = ['Booking', 'Service Management', 'Calendar'];
              if (!isPro && restricted.includes(item.label)) {
                router.push(
                  '/admin/overview?featurePrompt=' +
                    encodeURIComponent(item.label),
                );
                return;
              }
              router.push(item.href);
            }}
            sx={{
              mx: 2,
              mb: 0.5,
              borderRadius: 1,
              backgroundColor: activeIndex === idx ? '#e5fcd5' : 'transparent',
              position: 'relative',
              '&.Mui-selected': {
                backgroundColor: '#e5fcd5',
                '&:hover': { backgroundColor: '#e5fcd5' },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: theme.spacing(4) }}>
              <NavIcon
                src={item.iconSrc}
                alt={item.iconAlt}
                width={ICON_SIZE}
                height={ICON_SIZE}
              />
            </ListItemIcon>
            {!isCollapsed && (
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      maxWidth:
                        item.label === 'Service Management' ? '140px' : 'auto',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.label}
                  </Typography>
                }
              />
            )}
            {!isCollapsed &&
              !isPro &&
              ['Booking', 'Service Management', 'Calendar'].includes(
                item.label,
              ) && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '14px',
                    right: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    backgroundColor: '#fff2d0',
                    padding: '2px 6px',
                    borderRadius: '8px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    color: '#333',
                    border: '1px solid #ffd700',
                    zIndex: 1,
                  }}
                >
                  <Image src="/plan/pro.svg" alt="Pro" width={12} height={12} />
                  <Typography
                    variant="caption"
                    sx={{ fontSize: '10px', fontWeight: 'bold' }}
                  >
                    PRO
                  </Typography>
                </Box>
              )}
          </ListItemButton>
        ))}
      </List>
    </>
  );
}
