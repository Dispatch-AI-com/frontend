'use client';

import BillingAddressSection from '@/app/admin/settings/BillingAddressSection';
import IntegrationsSection from '@/app/admin/settings/CalendarIntegrations';
import CompanyInfoSection from '@/app/admin/settings/CompanyInfo';
import GreetingSection from '@/app/admin/settings/GreetingSection';
import UserProfileSection from '@/app/admin/settings/UserProfileSection';
import VerificationSection from '@/app/admin/settings/VerificationSection';

export default function SettingsSection() {
  return (
    <>
      <GreetingSection />
      <UserProfileSection />
      <VerificationSection />
      <IntegrationsSection />
      <CompanyInfoSection />
      <BillingAddressSection />
    </>
  );
}
