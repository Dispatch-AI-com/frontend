'use client';
import { Box, Typography } from '@mui/material';
import React from 'react';

import EditableSection from '@/app/admin/settings/components/EditableSection';
import PhoneInput from '@/app/admin/settings/components/PhoneInput';
import {
  validateContact,
  validateRole,
  validateUserName,
} from '@/utils/validationSettings';

export default function UserProfileSection() {
  return (
    <EditableSection
      title="User Profile"
      fields={[
        {
          label: 'Name',
          key: 'name',
          placeholder: 'Name',
          validate: validateUserName,
        },
        {
          label: 'Role',
          key: 'role',
          placeholder: 'Role',
          validate: validateRole,
        },
        {
          label: 'Contact',
          key: 'contact',
          placeholder: 'Contact',
          validate: validateContact,
          component: props => (
            <Box>
              <Typography variant="body1" mb={0.5}>
                Mobile Number
              </Typography>
              <PhoneInput {...props} />
            </Box>
          ),
        },
      ]}
      initialValues={{
        name: 'John Doe',
        role: 'Development',
        contact: '+61 481256866',
      }}
    />
  );
}
