import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import type { ServiceManagement } from '@/features/service-management/serviceManagementApi';
import { useGetServicesQuery } from '@/features/service-management/serviceManagementApi';
import { useAppSelector } from '@/redux/hooks';
import theme from '@/theme';

import ServiceCard from './ServiceCard';

const GridContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(2),
  },

  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1.5),
  },

  [theme.breakpoints.down('xs')]: {
    gap: theme.spacing(1),
  },
}));

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '40px',
});

const ErrorContainer = styled(Box)({
  padding: '20px',
});

export default function ServiceCardGrid({
  page,
  onEdit,
  onDelete,
}: {
  page: number;
  onEdit: (service: ServiceManagement) => void;
  onDelete: (service: ServiceManagement) => void;
}) {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down('lg'));

  // Get current user
  const user = useAppSelector(state => state.auth.user);
  // Only get current user's services
  const userId = user?._id;
  const {
    data: services,
    isLoading,
    error,
  } = useGetServicesQuery({ userId: userId ?? '' }, { skip: !userId });

  // Adjust items per page based on screen size
  const getItemsPerPage = () => {
    if (isSmallScreen) return 6; // Mobile: 2 columns x 3 rows
    if (isMediumScreen) return 6; // Tablet: 2 columns x 3 rows
    if (isLargeScreen) return 9; // Small desktop: 3 columns x 3 rows
    return 12; // Large desktop: 3 columns x 4 rows
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <Alert severity="error">
          Failed to load services. Please try again later.
        </Alert>
      </ErrorContainer>
    );
  }

  if (!services || services.length === 0) {
    return (
      <ErrorContainer>
        <Alert severity="info">
          No services found. Create your first service to get started.
        </Alert>
      </ErrorContainer>
    );
  }

  const itemsPerPage = getItemsPerPage();
  const paginatedServices = services.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  return (
    <GridContainer container spacing={isSmallScreen ? 1.5 : 3}>
      {paginatedServices.map(service => (
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={service._id}>
          <ServiceCard
            service={service}
            onEdit={() => onEdit(service)}
            onDelete={() => onDelete(service)}
          />
        </Grid>
      ))}
    </GridContainer>
  );
}
