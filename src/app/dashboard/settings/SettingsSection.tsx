'use client';

import BankAccountSection from '@/app/dashboard/settings/BankAccountSection';
import BillingAddressSection from '@/app/dashboard/settings/BillingAddressSection';
import GreetingSection from '@/app/dashboard/settings/GreetingSection';
import NotificationsSection from '@/app/dashboard/settings/NotificationsSection';
import UserProfileSection from '@/app/dashboard/settings/UserProfileSection';
import VerificationSection from '@/app/dashboard/settings/VerificationSection';

export default function SettingsSection() {
  return (
    <>
      <GreetingSection />
      <UserProfileSection />
      <VerificationSection />
      <BankAccountSection />
      <BillingAddressSection />
      <NotificationsSection />
    </>
  );
}
