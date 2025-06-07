'use client';
import { Box, styled } from '@mui/material';

import SectionDivider from '@/app/dashboard/settings/components/SectionDivider';
import SettingsSection from '@/app/dashboard/settings/SettingsSection';

const Root = styled(Box)({
  display: 'flex',
  backgroundColor: '#e6f6d9',
  minHeight: '100vh',
  flexDirection: 'column',

  // Responsive styles
  '@media (min-width:900px)': {
    flexDirection: 'row',
  },
});

const Sidebar = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2, 3),
  backgroundColor: '#e6f6d9',
  minHeight: 'auto',
  borderRight: 'none',
  '@media (min-width:900px)': {
    width: 220,
    minHeight: '100vh',
    borderRight: '1px solid #e6f6d9',
  },
}));

const Content = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: '#fff',
  flex: 1,
  minHeight: 'auto',
  display: 'flex',
  flexDirection: 'column',
  '@media (min-width:900px)': {
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
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
  },
  [theme.breakpoints.up('lg')]: {
    paddingLeft: theme.spacing(20),
    paddingRight: theme.spacing(20),
  },
  [theme.breakpoints.up('xl')]: {
    paddingLeft: theme.spacing(60),
    paddingRight: theme.spacing(60),
  },
}));

export default function SettingsPage() {
  return (
    <Root>
      <Sidebar>
        <h2>Sidebar</h2>
      </Sidebar>
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
