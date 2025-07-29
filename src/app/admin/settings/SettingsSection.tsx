'use client';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import BillingAddressSection from '@/app/admin/settings/BillingAddressSection';
import IntegrationsSection from '@/app/admin/settings/CalendarIntegrations';
import CompanyInfoSection from '@/app/admin/settings/CompanyInfo';
import GreetingSection from '@/app/admin/settings/GreetingSection';
import UserProfileSection from '@/app/admin/settings/UserProfileSection';
import VerificationSection from '@/app/admin/settings/VerificationSection';
import theme from '@/theme';

const SettingsContainer = styled(Box)({
  padding: theme.spacing(3, 4),
  maxWidth: '580px',
  margin: '0 auto',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(2.5, 3.5),
    maxWidth: '580px',
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2, 3),
    maxWidth: '580px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5, 2.5),
    maxWidth: '580px',
  },
  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(1, 2),
    maxWidth: '580px',
  },
});

export default function SettingsSection() {
  return (
    <SettingsContainer>
      <GreetingSection />
      <UserProfileSection />
      <VerificationSection />
      <IntegrationsSection />
      <CompanyInfoSection />
      <BillingAddressSection />
    </SettingsContainer>
  );
}
