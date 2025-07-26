import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

import type { ServiceManagement } from '@/features/service-management/serviceManagementApi';
import { useGetServicesQuery } from '@/features/service-management/serviceManagementApi';
import { useAppSelector } from '@/redux/hooks';

import DeleteConfirmModal from './DeleteConfirmModal';
import EditServiceModal from './EditServiceModal';
import ServiceCardGrid from './ServiceCardGrid';
import ServiceHeader from './ServiceHeader';
import ServicePagination from './ServicePagination';

const ContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: theme.spacing(3),

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },

  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(1.5),
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

  // Get current user
  const user = useAppSelector(state => state.auth.user);
  const userId = user?._id;
  const { data: services = [] } = useGetServicesQuery(
    { userId: userId ?? '' },
    { skip: !userId },
  );

  // Calculate items per page, must be consistent with ServiceCardGrid
  const isSmallScreen =
    typeof window !== 'undefined' && window.innerWidth <= 600;
  const isMediumScreen =
    typeof window !== 'undefined' &&
    window.innerWidth > 600 &&
    window.innerWidth <= 900;
  const isLargeScreen =
    typeof window !== 'undefined' &&
    window.innerWidth > 900 &&
    window.innerWidth <= 1200;
  let itemsPerPage = 12;
  if (isSmallScreen) itemsPerPage = 6;
  else if (isMediumScreen) itemsPerPage = 6;
  else if (isLargeScreen) itemsPerPage = 9;

  const totalPages = Math.max(1, Math.ceil(services.length / itemsPerPage));

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

      <ServicePagination
        page={page}
        onPageChange={setPage}
        totalPages={totalPages}
      />

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
