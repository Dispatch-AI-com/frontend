'use client';

import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';
import { useState } from 'react';

import { AdminPageLayout } from '@/components/layout/admin-layout';

import ServiceManagementContent from './components/ServiceManagementContent';

export default function ServiceManagementPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const headerActions = (
    <Box
      component="button"
      sx={{
        height: '40px',
        padding: '10px 16px',
        borderRadius: '8px',
        backgroundColor: '#000',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'background 0.2s',
        '&:hover': { backgroundColor: '#333' },
        fontFamily: 'Roboto, sans-serif',
        fontSize: '14px',
        fontWeight: 'bold',
      }}
      onClick={handleCreate}
    >
      <AddIcon sx={{ width: 16, height: 16, color: '#fff' }} />
      Create New Service
    </Box>
  );

  return (
    <AdminPageLayout
      title="Service Management"
      headerActions={headerActions}
      padding="normal"
      background="solid"
    >
      <ServiceManagementContent
        isCreateModalOpen={isCreateModalOpen}
        onCloseCreateModal={handleCloseCreateModal}
      />
    </AdminPageLayout>
  );
}
