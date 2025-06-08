'use client';
import React from 'react';

import EditableSection from '@/app/dashboard/settings/components/EditableSection';

export default function UserProfileSection() {
  return (
    <EditableSection
      title="User Profile"
      fields={[
        { label: 'Name', key: 'name', placeholder: 'Name' },
        { label: 'Company', key: 'company', placeholder: 'Company' },
        { label: 'Role', key: 'role', placeholder: 'Role' },
        { label: 'Contact', key: 'contact', placeholder: 'Contact' },
      ]}
      initialValues={{
        name: 'John Doe',
        company: 'Google',
        role: '-',
        contact: '+61 481256866',
      }}
    />
  );
}
