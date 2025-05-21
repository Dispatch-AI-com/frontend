"use client";

import {
    Avatar,
    Box,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled,
    Typography,
} from '@mui/material';
import Image from 'next/image'; // Add this import
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
    { label: 'Overview', icon: <NavIcon src="/dashboard/overview.svg" alt="Overview" width={ICON_SIZE} height={ICON_SIZE} /> },
    { label: 'Inbox', icon: <NavIcon src="/dashboard/inbox.svg" alt="Inbox" width={ICON_SIZE} height={ICON_SIZE} />, active: true },
    { label: 'Tasks', icon: <NavIcon src="/dashboard/task.svg" alt="Tasks" width={ICON_SIZE} height={ICON_SIZE} /> },
    { label: 'Calendar', icon: <NavIcon src="/dashboard/calendar.svg" alt="Calendar" width={ICON_SIZE} height={ICON_SIZE} /> },
    { label: 'Plan', icon: <NavIcon src="/dashboard/plan.svg" alt="Plan" width={ICON_SIZE} height={ICON_SIZE} /> },
    { label: 'Payments', icon: <NavIcon src="/dashboard/payment.svg" alt="Payments" width={ICON_SIZE} height={ICON_SIZE} /> },
    { label: 'Dispatch AI Setup', icon: <NavIcon src="/dashboard/AI-setup.svg" alt="Dispatch AI Setup" width={ICON_SIZE} height={ICON_SIZE} /> },
    { label: 'Settings', icon: <NavIcon src="/dashboard/settings.svg" alt="Settings" width={ICON_SIZE} height={ICON_SIZE} /> },
];

export default function Sidebar() {
    const [activeIndex, setActiveIndex] = React.useState(() => {
        const initialIdx = navItems.findIndex(item => item.active);
        return initialIdx !== -1 ? initialIdx : 0;
    });
    
    return (
        <SidebarContainer>
        <Box>
            {/* Logo */}
            <LogoBox>
                <Image src="/logo.svg" alt="DispatchAI" width={126} height={28} />
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
                    {item.icon}
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
                <Avatar sx={{ width: 40, height: 40, bgcolor: '#e5fcd5', color: '#222', fontWeight: 600 }}>J</Avatar>
                <Box flex="1">
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    Jeon
                    </Typography>
                    <Typography variant="body2">
                    Free Plan
                    </Typography>
                </Box>
                <IconButton size="small" sx={{ ml: 1 }}>
                    <Image src="/dashboard/detail-arrow.svg" width={12} height={12} alt="Profile Details" />
                </IconButton>
            </Box>
        </Box>
        </SidebarContainer>
    );
}