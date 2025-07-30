import AddIcon from '@mui/icons-material/Add';
import { Box, Typography } from '@mui/material';
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

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '56px',
  marginBottom: '15px',
  paddingTop: '0px',
  paddingBottom: '0px',
  '@media (min-width: 1920px)': {
    height: '60px',
    marginBottom: '16px',
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  '@media (min-width: 1600px) and (max-width: 1919px)': {
    height: '58px',
    marginBottom: '15px',
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  '@media (min-width: 1200px) and (max-width: 1599px)': {
    height: '56px',
    marginBottom: '15px',
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    height: '56px',
    marginBottom: '15px',
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  [theme.breakpoints.down('md')]: {
    height: '56px',
    marginBottom: '15px',
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '56px',
    marginBottom: '15px',
    paddingTop: '0px',
    paddingBottom: '0px',
  },
}));

const Divider = styled(Box)(({ theme }) => ({
  width: 'calc(100% + 48px)',
  height: '1px',
  backgroundColor: '#eaeaea',
  flexShrink: 0,
  margin: '15px -24px 24px -24px',
  '@media (min-width: 1920px)': {
    width: 'calc(100% + 64px)',
    margin: '16px -32px 24px -32px',
  },
  '@media (min-width: 1600px) and (max-width: 1919px)': {
    width: 'calc(100% + 56px)',
    margin: '15px -28px 24px -28px',
  },
  '@media (min-width: 1200px) and (max-width: 1599px)': {
    width: 'calc(100% + 48px)',
    margin: '15px -24px 24px -24px',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    width: 'calc(100% + 40px)',
    margin: '15px -20px 24px -20px',
  },
  [theme.breakpoints.down('md')]: {
    width: 'calc(100% + 36px)',
    margin: '15px -18px 24px -18px',
  },
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100% + 24px)',
    margin: '15px -12px 24px -12px',
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
      <HeaderContainer>
        <Typography
          sx={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#060606',
            lineHeight: 1.22,
          }}
        >
          Service Management
        </Typography>
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
      </HeaderContainer>

      <Divider />

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
