import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

import type { ServiceManagement } from '../serviceManagementApi';
import DeleteConfirmModal from './DeleteConfirmModal';
import EditServiceModal from './EditServiceModal';
import ServiceCardGrid from './ServiceCardGrid';
import ServiceHeader from './ServiceHeader';
import ServicePagination from './ServicePagination';

const ContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: 'calc(100vh - 48px)', // 减去页面padding

  [theme.breakpoints.down('sm')]: {
    minHeight: 'calc(100vh - 32px)',
  },

  [theme.breakpoints.down('xs')]: {
    minHeight: 'calc(100vh - 24px)',
  },
}));

const GridContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  marginBottom: theme.spacing(4),

  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(3),
  },

  [theme.breakpoints.down('xs')]: {
    marginBottom: theme.spacing(2),
  },
}));

export default function ServiceManagementContent() {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedService, setSelectedService] =
    useState<ServiceManagement | null>(null);
  const [page, setPage] = useState(1);

  const handleCreate = () => {
    setSelectedService(null);
    setEditOpen(true);
  };

  const handleEdit = (service: ServiceManagement) => {
    setSelectedService(service);
    setEditOpen(true);
  };

  const handleDelete = (service: ServiceManagement) => {
    setSelectedService(service);
    setDeleteOpen(true);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedService(null);
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
    setSelectedService(null);
  };

  return (
    <ContentContainer>
      <ServiceHeader onCreate={handleCreate} />

      <GridContainer>
        <ServiceCardGrid
          page={page}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </GridContainer>

      <ServicePagination page={page} onPageChange={setPage} />

      <EditServiceModal
        open={editOpen}
        service={selectedService}
        onClose={handleCloseEdit}
      />

      <DeleteConfirmModal
        open={deleteOpen}
        service={selectedService}
        onClose={handleCloseDelete}
      />
    </ContentContainer>
  );
}
