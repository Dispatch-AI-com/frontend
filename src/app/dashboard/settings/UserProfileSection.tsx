'use client';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

import EditModal from '@/app/dashboard/settings/components/EditModal';
import LabeledTextField from '@/app/dashboard/settings/components/LabeledTextField';
import LabelValue from '@/app/dashboard/settings/components/LabelValue';
import SectionDivider from '@/app/dashboard/settings/components/SectionDivider';
import SectionHeader from '@/app/dashboard/settings/components/SectionHeader';
import theme from '@/theme';

const InfoRow = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(4),
  marginTop: theme.spacing(2),
});

const InfoCol = styled(Box)({
  flex: 1,
});

export default function UserProfileSection() {
  // modal state
  const [open, setOpen] = React.useState(false);
  // Store the saved profile
  const [profile, setProfile] = React.useState({
    name: 'Jeon Chen',
    company: 'Google',
    role: 'Development',
    contact: '+61 481256866',
  });
  // form state
  const [name, setName] = React.useState(profile.name);
  const [company, setCompany] = React.useState(profile.company);
  const [role, setRole] = React.useState(profile.role);
  const [contact, setContact] = React.useState(profile.contact);
  // When opening the modal, sync form state with profile
  const handleEdit = () => {
    setName(profile.name);
    setCompany(profile.company);
    setRole(profile.role);
    setContact(profile.contact);
    setOpen(true);
  };
  const handleSaveProfile = () => {
    setProfile({
      name,
      company,
      role,
      contact,
    });
    setOpen(false);
  };

  return (
    <>
      <SectionDivider />
      <SectionHeader title="User Profile" onEdit={handleEdit} />
      <InfoRow>
        <InfoCol>
          <LabelValue label="Name:" value={profile.name} />
          <LabelValue label="Role:" value={profile.role} />
        </InfoCol>
        <InfoCol>
          <LabelValue label="Company:" value={profile.company} />
          <LabelValue label="Contact:" value={profile.contact} />
        </InfoCol>
      </InfoRow>
      <EditModal
        open={open}
        title="User Profile"
        onClose={() => {
          setOpen(false);
        }}
        onSave={handleSaveProfile}
      >
        <Box display="flex" flexDirection="column" gap={2} p={2}>
          <LabeledTextField
            label="Name"
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
            placeholder="Name"
          />
          <LabeledTextField
            label="Company"
            value={company}
            onChange={e => {
              setCompany(e.target.value);
            }}
            placeholder="Company"
          />
          <LabeledTextField
            label="Role"
            value={role}
            onChange={e => {
              setRole(e.target.value);
            }}
            placeholder="Role"
          />
          <LabeledTextField
            label="Contact"
            value={contact}
            onChange={e => {
              setContact(e.target.value);
            }}
            placeholder="Contact"
          />
        </Box>
      </EditModal>
    </>
  );
}
