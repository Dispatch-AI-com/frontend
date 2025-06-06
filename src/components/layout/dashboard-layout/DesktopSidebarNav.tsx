'use client';

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';

const ICON_SIZE = 16;

interface DesktopSidebarNavProps {
  navItems: {
    label: string;
    iconSrc: string;
    iconAlt: string;
    active?: boolean;
  }[];
  activeIndex: number;
  onNavItemClick: (index: number) => void;
}

// Simple NavIcon component for rendering icons
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
  activeIndex,
  onNavItemClick,
}: DesktopSidebarNavProps) {
  const theme = useTheme();

  return (
    <>
      <List>
        {navItems.map((item, idx) => (
          <ListItemButton
            key={item.label}
            selected={activeIndex === idx}
            onClick={() => {
              onNavItemClick(idx);
            }}
            sx={{
              mx: 2,
              mb: 0.5,
              borderRadius: 1,
              backgroundColor: activeIndex === idx ? '#e5fcd5' : 'transparent',
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
            <ListItemText
              primary={<Typography variant="body1">{item.label}</Typography>}
            />
          </ListItemButton>
        ))}
      </List>
    </>
  );
}
