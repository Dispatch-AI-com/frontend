'use client';
import React from 'react';

import EditableSection from '@/app/dashboard/settings/components/EditableSection';

export default function BankAccountSection() {
  return (
    <EditableSection
      title="Bank Account"
      fields={[
        {
          label: 'Account Name:',
          key: 'accname',
          placeholder: 'e.g. Jone Smith',
        },
        { label: 'BSB:', key: 'bsb', placeholder: 'e.g. 123456' },
        {
          label: 'Account Number:',
          key: 'accnum',
          placeholder: 'e.g. 1234 1234 1234 1234',
        },
      ]}
      initialValues={{
        accname: 'Jone Smith',
        bsb: '123456',
        accnum: '1234 1234 1234 1234',
      }}
    />
  );
}
