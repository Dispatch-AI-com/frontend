import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

import type { ServiceManagement } from '@/features/service-management/serviceManagementApi';
import { useGetServicesQuery } from '@/features/service-management/serviceManagementApi';
import { useAppSelector } from '@/redux/hooks';

import DeleteConfirmModal from './DeleteConfirmModal';
import EditServiceModal from './EditServiceModal';
import ServiceCardGrid from './ServiceCardGrid';
import ServicePagination from './ServicePagination';

const ContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: '24px',
  '@media (min-width: 1920px)': {
    padding: '28px 32px',
  },
  '@media (min-width: 1600px) and (max-width: 1919px)': {
    padding: '26px 28px',
  },
  '@media (min-width: 1200px) and (max-width: 1599px)': {
    padding: '24px',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    padding: '20px',
  },
  [theme.breakpoints.down('md')]: {
    padding: '18px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '18px',
  },
}));

const GridContainer = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
});

interface ServiceManagementContentProps {
  isCreateModalOpen?: boolean;
  onCloseCreateModal?: () => void;
}

export default function ServiceManagementContent({
  isCreateModalOpen = false,
  onCloseCreateModal,
}: ServiceManagementContentProps) {
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
    // Delay clearing selectedService to avoid title flicker during modal close animation
    setTimeout(() => {
      setSelectedService(null);
    }, 300);
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
    setSelectedService(null);
  };

  const handleCloseCreate = () => {
    if (onCloseCreateModal) {
      onCloseCreateModal();
    }
  };

  return (
    <ContentContainer>
      <GridContainer>
        <ServiceCardGrid
          page={page}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </GridContainer>

      {totalPages > 1 && (
        <ServicePagination
          page={page}
          onPageChange={setPage}
          totalPages={totalPages}
        />
      )}

      <EditServiceModal
        open={editOpen}
        service={selectedService}
        onClose={handleCloseEdit}
      />

      <EditServiceModal
        open={isCreateModalOpen}
        service={null}
        onClose={handleCloseCreate}
      />

      <DeleteConfirmModal
        open={deleteOpen}
        service={selectedService}
        onClose={handleCloseDelete}
      />
    </ContentContainer>
  );
}
