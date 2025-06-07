'use client';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

import EditModal from '@/app/dashboard/settings/components/EditModal';
import LabeledTextField from '@/app/dashboard/settings/components/LabeledTextField';
import LabelValue from '@/app/dashboard/settings/components/LabelValue';
import SectionDivider from '@/app/dashboard/settings/components/SectionDivider';
import SectionHeader from '@/app/dashboard/settings/components/SectionHeader';

const InfoRow = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 32,
  marginTop: 16,
});

const InfoCol = styled(Box)({
  flex: 1,
});

export default function NotificationsSection() {
  // modal state
  const [open, setOpen] = React.useState(false);
  // Store the saved notifications settings
  const [notifications, setNotifications] = React.useState({
    email: 'email51@company.com',
  });
  // form state
  const [email, setEmail] = React.useState(notifications.email);
  // When opening the modal, sync form state with notifications
  const handleEdit = () => {
    setEmail(notifications.email);
    setOpen(true);
  };
  // Save the notifications settings
  const handleSaveNotifications = () => {
    setNotifications({
      email,
    });
    setOpen(false);
  };

  return (
    <>
      <SectionDivider />
      <SectionHeader title="Notifications" onEdit={handleEdit} />
      <InfoRow>
        <InfoCol>
          <LabelValue label="Email address:" value={notifications.email} />
        </InfoCol>
      </InfoRow>
      <EditModal
        open={open}
        title="Notifications"
        onClose={() => {
          setOpen(false);
        }}
        onSave={handleSaveNotifications}
      >
        <LabeledTextField
          label="Email Address"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
          placeholder="Email Address"
        />
      </EditModal>
    </>
  );
}
