'use client';
import React from 'react';

import EditableSection from '@/app/admin/settings/components/EditableSection';
import {
  combineValidations,
  validateEmail,
  validateRequired,
} from '@/utils/validationSettings';

export default function NotificationsSection() {
  const handleValidation = (values: Record<string, string>) => {
    return combineValidations(
      validateRequired(values.email, 'Email address'),
      validateEmail(values.email),
    );
  };

  return (
    <EditableSection
      title="Notifications"
      validation={handleValidation}
      fields={[
        { label: 'Email address:', key: 'email', placeholder: 'Email Address' },
      ]}
      initialValues={{ email: 'email51@company.com' }}
    />
  );
}
