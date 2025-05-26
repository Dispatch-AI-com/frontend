"use client";

import {
    Avatar,
    Box,
    IconButton,
    Link,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled,
    Typography,
} from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import React from 'react';

import theme from '@/theme';

const SidebarContainer = styled(Box)(({ theme }) => ({
    width: 240,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: 'linear-gradient(to bottom, #effbf5, #fff 100%)',
    padding: theme.spacing(2, 0, 2, 0),
}));

const LogoBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
    minHeight: theme.spacing(6),
});

const NavIcon = styled(Image)({
    display: 'block',
});

const ICON_SIZE = 16;

const navItems = [
    { label: 'Overview', iconSrc: '/dashboard/sidebar/overview.svg', iconAlt: 'Overview' },
    { label: 'Inbox', iconSrc: '/dashboard/sidebar/inbox.svg', iconAlt: 'Inbox', active: true },
    { label: 'Tasks', iconSrc: '/dashboard/sidebar/task.svg', iconAlt: 'Tasks' },
    { label: 'Calendar', iconSrc: '/dashboard/sidebar/calendar.svg', iconAlt: 'Calendar' },
    { label: 'Plan', iconSrc: '/dashboard/sidebar/plan.svg', iconAlt: 'Plan' },
    { label: 'Payments', iconSrc: '/dashboard/sidebar/payment.svg', iconAlt: 'Payments' },
    { label: 'Dispatch AI Setup', iconSrc: '/dashboard/sidebar/AI-setup.svg', iconAlt: 'Dispatch AI Setup' },
    { label: 'Settings', iconSrc: '/dashboard/sidebar/settings.svg', iconAlt: 'Settings' },
];

const dropdownOptions = [
    { label: 'View Profile', href: '/profile' },
    { label: 'Logout', href: '/logout' },
]

export default function Sidebar() {
    
    {/* State to manage the active index of the navigation items */}
    const [activeIndex, setActiveIndex] = React.useState(() => {
        const initialIdx = navItems.findIndex(item => item.active);
        return initialIdx !== -1 ? initialIdx : 0;
    });

    {/* State to manage the open/close state of the profile dropdown menu */}
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
    }
    
    return (
        <SidebarContainer>
        <Box>
            {/* Logo */}
            <LogoBox>
                <Link href="/dashboard">
                    <Image src="/logo.svg" alt="DispatchAI" width={126} height={28} />
                </Link>
            </LogoBox>
            {/* Navigation */}
            <List>
            {navItems.map((item, idx) => (
                <ListItemButton
                    key={item.label}
                    selected={activeIndex === idx}
                    onClick={() => setActiveIndex(idx)}
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
                <ListItemIcon sx={{minWidth: theme.spacing(4)}}>
                    <NavIcon
                        src={item.iconSrc}
                        alt={item.iconAlt}
                        width={ICON_SIZE}
                        height={ICON_SIZE}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={
                    <Typography variant='body1' >
                        {item.label}
                    </Typography>
                    }
                />
                </ListItemButton>
            ))}
            </List>
        </Box>
        {/* User Profile */}
        <Box px={3} py={2} mt="auto">
            <Box display="flex" alignItems="center" gap={1.5}>
                <Avatar sx={{ width: 40, height: 40, bgcolor: '#e5fcd5', color: '#222', fontWeight: 600, cursor: 'pointer' }}  onClick={handleMenuOpen}>J</Avatar>
                <Box flex="1">
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    Jeon
                    </Typography>
                    <Typography variant="body2">
                    Free Plan
                    </Typography>
                </Box>
                <IconButton size="small" sx={{ ml: 1 }}>
                    <Image src="/dashboard/sidebar/detail-arrow.svg" width={12} height={12} alt="Profile Details" />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    {dropdownOptions.map((option) => (
                        <MenuItem key={option.label} onClick={handleMenuClose}>{option.label}</MenuItem>
                    ))}
                </Menu>
            </Box>
        </Box>
        </SidebarContainer>
    );
}