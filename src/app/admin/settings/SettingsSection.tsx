'use client';

import BankAccountSection from '@/app/(protected)/settings/BankAccountSection';
import BillingAddressSection from '@/app/(protected)/settings/BillingAddressSection';
import GreetingSection from '@/app/(protected)/settings/GreetingSection';
import NotificationsSection from '@/app/(protected)/settings/NotificationsSection';
import UserProfileSection from '@/app/(protected)/settings/UserProfileSection';
import VerificationSection from '@/app/(protected)/settings/VerificationSection';

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
