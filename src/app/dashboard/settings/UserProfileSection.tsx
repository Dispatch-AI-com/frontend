'use client';
import { Box, TextField, Typography } from '@mui/material';
import React from 'react';

import EditModal from '@/app/dashboard/settings/components/EditModal';
import LabelValue from '@/app/dashboard/settings/components/LabelValue';
import SectionDivider from '@/app/dashboard/settings/components/SectionDivider';
import SectionHeader from '@/app/dashboard/settings/components/SectionHeader';

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
      <Box display="flex" flexWrap="wrap" gap={4} mt={2}>
        <Box flex={1}>
          <LabelValue label="Name:" value={profile.name} />
          <LabelValue label="Role:" value={profile.role} />
        </Box>
        <Box flex={1}>
          <LabelValue label="Company:" value={profile.company} />
          <LabelValue label="Contact:" value={profile.contact} />
        </Box>
      </Box>
      <EditModal
        open={open}
        title="User Profile"
        onClose={() => {
          setOpen(false);
        }}
        onSave={handleSaveProfile}
      >
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <Box>
            <Typography variant="body1" mb={0.5}>
              Name
            </Typography>
            <TextField
              value={name}
              onChange={e => {
                setName(e.target.value);
              }}
              placeholder="Name"
              fullWidth
              size="small"
            />
          </Box>
          <Box>
            <Typography variant="body1" mb={0.5}>
              Company
            </Typography>
            <TextField
              value={company}
              onChange={e => {
                setCompany(e.target.value);
              }}
              placeholder="Company"
              fullWidth
              size="small"
            />
          </Box>
          <Box>
            <Typography variant="body1" mb={0.5}>
              Role
            </Typography>
            <TextField
              value={role}
              onChange={e => {
                setRole(e.target.value);
              }}
              placeholder="Role"
              fullWidth
              size="small"
            />
          </Box>
          <Box>
            <Typography variant="body1" mb={0.5}>
              Contact
            </Typography>
            <TextField
              value={contact}
              onChange={e => {
                setContact(e.target.value);
              }}
              placeholder="Contact"
              fullWidth
              size="small"
            />
          </Box>
        </Box>
      </EditModal>
    </>
  );
}
