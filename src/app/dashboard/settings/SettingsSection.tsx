import BillingSection from '@/app/dashboard/settings/BillingSection';
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
      <BillingSection />
      <NotificationsSection />
    </>
  );
}
