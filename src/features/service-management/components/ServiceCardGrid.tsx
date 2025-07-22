import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { useAppSelector } from '@/redux/hooks';
import theme from '@/theme';

import type { ServiceManagement } from '../serviceManagementApi';
import { useGetServicesQuery } from '../serviceManagementApi';
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

  // 获取当前用户
  const user = useAppSelector(state => state.auth.user);
  // 只获取当前用户的 service
  const userId = user?._id;
  const {
    data: services,
    isLoading,
    error,
  } = useGetServicesQuery({ userId: userId ?? '' }, { skip: !userId });

  // 根据屏幕尺寸调整每页显示的服务数量
  const getItemsPerPage = () => {
    if (isSmallScreen) return 6; // 手机：2列 x 3行
    if (isMediumScreen) return 6; // 平板：2列 x 3行
    if (isLargeScreen) return 9; // 小桌面：3列 x 3行
    return 12; // 大桌面：3列 x 4行
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
