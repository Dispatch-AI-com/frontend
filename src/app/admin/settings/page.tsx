'use client';
import { Box, styled } from '@mui/material';

import SectionDivider from '@/app/admin/settings/components/SectionDivider';
import SettingsSection from '@/app/admin/settings/SettingsSection';

const Root = styled(Box)({
  backgroundColor: '#effbf5',
});

const Content = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 0, // default for mobile
  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(30), // 240px for desktop
    minHeight: 'calc(100vh - 48px)',
  },
}));

const SettingsHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(4, 8, 0, 8),
  minHeight: theme.spacing(10),
}));

const ContentInner = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(15),
    paddingRight: theme.spacing(15),
  },
  [theme.breakpoints.up('lg')]: {
    paddingLeft: theme.spacing(30),
    paddingRight: theme.spacing(30),
  },
  [theme.breakpoints.up('xl')]: {
    paddingLeft: theme.spacing(60),
    paddingRight: theme.spacing(60),
  },
}));

export default function SettingsPage() {
  return (
    <Root>
      <Content>
        <SettingsHeader>
          <Box component="h2" sx={{ margin: 0, flex: 1 }}>
            Settings
          </Box>
        </SettingsHeader>
        <SectionDivider my={1} />
        <ContentInner>
          <SettingsSection />
        </ContentInner>
      </Content>
    </Root>
  );
}
