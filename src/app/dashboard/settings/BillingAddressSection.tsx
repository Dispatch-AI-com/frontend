'use client';
import React from 'react';

import EditableSection from '@/app/dashboard/settings/components/EditableSection';
import SelectField from '@/app/dashboard/settings/components/SelectField';

const STATE_OPTIONS = [
  { label: 'New South Wales', value: 'New South Wales' },
  { label: 'Victoria', value: 'Victoria' },
  { label: 'Queensland', value: 'Queensland' },
  { label: 'Western Australia', value: 'Western Australia' },
  { label: 'South Australia', value: 'South Australia' },
  { label: 'Tasmania', value: 'Tasmania' },
  {
    label: 'Australian Capital Territory',
    value: 'Australian Capital Territory',
  },
  { label: 'Northern Territory', value: 'Northern Territory' },
];

export default function BillingAddressSection() {
  return (
    <EditableSection
      title="Billing Address"
      fields={[
        {
          label: 'Unit/Apt/PO BoX:',
          key: 'unit',
          placeholder: 'Enter unit, apartment, or PO Box',
        },
        {
          label: 'Street address:',
          key: 'street',
          placeholder: 'Street address',
        },
        {
          label: 'Suburb:',
          key: 'suburb',
          placeholder: 'Suburb',
        },
        {
          label: 'State:',
          key: 'state',
          component: props => (
            <SelectField
              {...props}
              options={STATE_OPTIONS}
              placeholder="Select"
            />
          ),
        },
        {
          label: 'Postcode:',
          key: 'postcode',
          placeholder: 'e.g. 1234',
        },
      ]}
      initialValues={{
        unit: 'Enter unit, apartment, or PO Box',
        street: '3-5 Underwood Road',
        suburb: 'Parramatta',
        state: 'New South Wales',
        postcode: '2140',
      }}
    />
  );
}
