'use client';
import { Box, Typography } from '@mui/material';
import React from 'react';

import EditableSection from '@/app/admin/settings/components/EditableSection';
import PhoneInput from '@/app/admin/settings/components/PhoneInput';
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from '@/features/settings/settingsApi';
import { useAppSelector } from '@/redux/hooks';
import {
  validateRole,
  validateSMSMobile,
  validateUserName,
} from '@/utils/validationSettings';

export default function UserProfileSection() {
  const user = useAppSelector(state => state.auth.user);

  const {
    data: profileData,
    isLoading,
    error,
  } = useGetUserProfileQuery(user?._id ?? '', {
    skip: !user?._id,
  });

  const [updateProfile] = useUpdateUserProfileMutation();
  const handleSave = async (values: Record<string, string>) => {
    if (!user?._id) {
      throw new Error('User not logged in');
    }

    await updateProfile({
      userId: user._id,
      name: values.name,
      role: values.role,
      contact: values.contact,
    }).unwrap();
  };

  const convertedData = profileData
    ? {
        name: profileData.name,
        role: profileData.role,
        contact: profileData.contact,
      }
    : undefined;

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
          validate: validateSMSMobile,
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
      data={convertedData}
      isLoading={isLoading}
      onSave={handleSave}
      initialValues={{
        name: '',
        role: '',
        contact: '',
      }}
    />
  );
}
