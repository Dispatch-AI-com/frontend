'use client';
import SettingsSection from '@/app/admin/settings/SettingsSection';
import { AdminPageLayout } from '@/components/layout/admin-layout';

export default function SettingsPage() {
  return (
    <AdminPageLayout title="Settings" padding="normal" background="solid">
      <SettingsSection />
    </AdminPageLayout>
  );
}
