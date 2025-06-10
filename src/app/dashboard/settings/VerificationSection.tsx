'use client';

import { Box, Typography } from '@mui/material';

import EditableSection from '@/app/dashboard/settings/components/EditableSection';
import LabeledTextField from '@/app/dashboard/settings/components/LabeledTextField';
import PhoneInput from '@/app/dashboard/settings/components/PhoneInput';
import SelectField from '@/app/dashboard/settings/components/SelectField';

const VERIFICATION_OPTIONS = [
  { label: 'Email', value: 'Email' },
  { label: 'SMS', value: 'SMS' },
];

export default function VerificationSection() {
  return (
    <EditableSection
      title="Verification"
      fields={values => [
        {
          label: 'Verification type:',
          key: 'type',
          placeholder: 'Select type',
          component: ({ value, onChange }) => (
            <Box>
              <Typography variant="body1" mb={0.5}>
                Verification type
              </Typography>
              <SelectField
                value={value}
                onChange={onChange}
                options={VERIFICATION_OPTIONS}
                placeholder="Select type"
              />
            </Box>
          ),
        },
        values.type === 'SMS'
          ? {
              label: 'Mobile Number:',
              key: 'mobile',
              placeholder: '',
              component: props => (
                <Box>
                  <Typography variant="body1" mb={0.5}>
                    Mobile Number
                  </Typography>
                  <PhoneInput {...props} />
                </Box>
              ),
            }
          : {
              label: 'Email Address:',
              key: 'email',
              placeholder: 'Email Address',
              component: ({ value, onChange }) => (
                <LabeledTextField
                  label="Email Address"
                  value={value}
                  onChange={e => {
                    onChange(e.target.value);
                  }}
                  placeholder="Email Address"
                />
              ),
            },
      ]}
      initialValues={{
        type: 'SMS',
        mobile: '',
        email: '',
      }}
    />
  );
}
