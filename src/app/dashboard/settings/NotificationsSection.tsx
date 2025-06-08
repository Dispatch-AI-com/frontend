'use client';
import React from 'react';

import EditableSection from '@/app/dashboard/settings/components/EditableSection';

export default function NotificationsSection() {
  return (
    <EditableSection
      title="Notifications"
      fields={[
        { label: 'Email address:', key: 'email', placeholder: 'Email Address' },
      ]}
      initialValues={{ email: 'email51@company.com' }}
    />
  );
}
