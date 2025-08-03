'use client';
import SectionDivider from '@/app/admin/settings/components/SectionDivider';
import SettingsSection from '@/app/admin/settings/SettingsSection';
import { AdminPageLayout } from '@/components/layout/admin-layout';

export default function SettingsPage() {
  return (
    <AdminPageLayout title="Settings" padding="normal" background="solid">
      <SectionDivider my={1} />
      <SettingsSection />
    </AdminPageLayout>
  );
}
