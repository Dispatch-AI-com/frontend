'use client';

import BankAccountSection from '@/app/admin/settings/BankAccountSection';
import BillingAddressSection from '@/app/admin/settings/BillingAddressSection';
import GreetingSection from '@/app/admin/settings/GreetingSection';
import NotificationsSection from '@/app/admin/settings/NotificationsSection';
import UserProfileSection from '@/app/admin/settings/UserProfileSection';
import VerificationSection from '@/app/admin/settings/VerificationSection';

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
