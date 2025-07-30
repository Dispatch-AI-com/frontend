// BookingList.tsx
'use client';

import {
  Box,
  Card,
  CardContent,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';

import type { Service } from '@/features/service/serviceApi';

const StyledTableHead = styled(TableHead)(() => ({
  backgroundColor: '#F7F8FA',
  '& .MuiTableRow-root': {
    height: '56px',
  },
}));

const StyledHeaderCell = styled(TableCell)(() => ({
  fontWeight: 700,
  fontSize: '16px',
  color: '#1A1A1A',
  backgroundColor: '#F7F8FA',
  borderBottom: '1px solid #EAEAEA',
  padding: '16px 20px',
  whiteSpace: 'nowrap',
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  height: '56px',
}));

const StyledTableCell = styled(TableCell)(() => ({
  border: 'none',
  padding: '12px 16px',
  fontSize: '15px',
  color: '#1A1A1A',
  fontWeight: 500,
  backgroundColor: '#fff',
}));

const TableContentContainer = styled(Box)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minHeight: 0,
  overflowX: 'auto',
  minWidth: '700px',
  borderRadius: '16px',
  border: '1px solid #E0E0E0',
  backgroundColor: '#fff',
}));

const ScrollableTableContainer = styled(TableContainer)(() => ({
  flex: 1,
  border: 'none',
  borderRadius: '16px',
  overflow: 'auto',
  minHeight: 0,
  boxShadow: 'none',
  background: '#fff',
  paddingBottom: '8px',
  '&::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f1f1f1',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#c1c1c1',
    borderRadius: '3px',
    '&:hover': {
      backgroundColor: '#a8a8a8',
    },
  },
}));

const NoServicesImage = styled(Image)(() => ({
  width: '120px',
  height: '120px',
  margin: '0 0 24px',
  objectFit: 'contain',
  '@media (max-width: 600px)': {
    width: '90px',
    height: '90px',
    margin: '0 0 16px',
  },
}));

const NoServicesText = styled(Typography)(() => ({
  fontFamily: 'Roboto',
  fontSize: '16px',
  fontWeight: 700,
  lineHeight: '24px',
  color: '#1A1A1A',
  textAlign: 'center',
  '@media (max-width: 600px)': {
    fontSize: '13px',
    lineHeight: '20px',
  },
}));

const EmptyStateContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  width: '100%',
  height: '100%',
  minHeight: '600px',
}));

const FixedHeaderTable = styled(Table)(() => ({
  borderCollapse: 'separate',
  borderSpacing: 0,
  tableLayout: 'fixed',
  width: '100%',
  minWidth: '700px',
}));

const TableHeaderContainer = styled(Box)({
  flexShrink: 0,
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
  overflow: 'hidden',
});

const StyledTableRow = styled(TableRow)(() => ({
  '&:hover': {
    backgroundColor: '#F0F2F5',
  },
  '&:first-of-type': {
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
  },
  '&:last-of-type': {
    borderBottomLeftRadius: '16px',
    borderBottomRightRadius: '16px',
  },
}));

const StatusChip = ({ status }: { status: string }) => {
  // 直接在组件中定义颜色，不依赖外部文件
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return { bg: '#e1f0ff', bar: '#0687ff' };
      case 'Done':
        return { bg: '#e7f8dc', bar: '#58c112' };
      case 'Cancelled':
        return { bg: '#fff0e6', bar: '#ff7206' };
      default:
        return { bg: '#fff0e6', bar: '#ff7206' };
    }
  };

  const style = getStatusStyle(status);

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        px: 1.5,
        py: 0.5,
        borderRadius: '12px',
        backgroundColor: style.bg,
        width: 'fit-content',
        height: 24,
      }}
    >
      <Box
        sx={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          backgroundColor: style.bar,
          marginRight: 1,
        }}
      />
      <Typography
        sx={{
          fontFamily: 'Roboto',
          fontSize: 13,
          fontWeight: 'normal',
          fontStretch: 'normal',
          fontStyle: 'normal',
          letterSpacing: 'normal',
          lineHeight: '16px',
          color: '#060606',
        }}
      >
        {status}
      </Typography>
    </Box>
  );
};

interface Props {
  services: Service[];
  onServiceClick?: (service: Service) => void;
}

const BookingList: React.FC<Props> = ({ services, onServiceClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const handleRowClick = (service: Service) => {
    if (onServiceClick) {
      onServiceClick(service);
    }
  };

  const formatDateTime = (datetime?: string) => {
    if (!datetime) return 'No data';
    const date = new Date(datetime);
    const isValid = !isNaN(date.getTime());
    if (!isValid) {
      return `Invalid: ${datetime.substring(0, 20)}`;
    }
    try {
      return date.toLocaleString('en-AU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    } catch {
      // fallback to manual formatting
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${day}/${month}/${year}, ${hours}:${minutes}`;
    }
  };

  const createPlaceholderRows = (count: number) => {
    return Array.from({ length: count }, (_, index) => (
      <TableRow
        key={`placeholder-${index}`}
        sx={{ height: '60px', background: '#fff' }}
      >
        <StyledTableCell colSpan={6} sx={{ border: 'none', padding: 0 }}>
          <Box sx={{ height: '60px' }} />
        </StyledTableCell>
      </TableRow>
    ));
  };

  const placeholderCount = Math.max(0, 10 - services.length);

  // Mobile Card Component
  const BookingCard = ({ service }: { service: Service }) => (
    <Card
      sx={{
        mb: 2,
        cursor: onServiceClick ? 'pointer' : 'default',
        '&:hover': {
          boxShadow: 2,
        },
      }}
      onClick={() => onServiceClick && onServiceClick(service)}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontSize: '16px', fontWeight: 600, flex: 1 }}
          >
            {service.name}
          </Typography>
          <StatusChip status={service.status ?? 'Confirmed'} />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="body2"
              sx={{ color: '#666', fontWeight: 500, minWidth: '80px' }}
            >
              Created By:
            </Typography>
            <Typography variant="body2">
              {service.createdBy?.name ?? 'Unknown'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="body2"
              sx={{ color: '#666', fontWeight: 500, minWidth: '80px' }}
            >
              Date & Time:
            </Typography>
            <Typography variant="body2">
              {formatDateTime(service.dateTime ?? service.createdAt)}
            </Typography>
          </Box>

          {service.client && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: '#666', fontWeight: 500, minWidth: '80px' }}
              >
                Client:
              </Typography>
              <Typography variant="body2">{service.client.name}</Typography>
            </Box>
          )}

          {service.description && (
            <Box sx={{ mt: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: '#666', fontWeight: 500 }}
              >
                Description:
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {service.description}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );

  if (isMobile) {
    return (
      <Box sx={{ p: 1 }}>
        {services.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '300px',
              textAlign: 'center',
            }}
          >
            <Image
              src="/avatars/service/no-tasks.svg"
              alt="No bookings"
              width={120}
              height={120}
            />
            <Typography sx={{ mt: 2, color: '#666' }}>
              No bookings found.
            </Typography>
          </Box>
        ) : (
          services.map(service => (
            <BookingCard key={service._id} service={service} />
          ))
        )}
      </Box>
    );
  }

  return (
    <TableContentContainer>
      <TableHeaderContainer>
        <FixedHeaderTable>
          <StyledTableHead>
            <TableRow>
              <StyledHeaderCell>Service Name</StyledHeaderCell>
              <StyledHeaderCell>Created By</StyledHeaderCell>
              <StyledHeaderCell>Status</StyledHeaderCell>
              <StyledHeaderCell>Date & Time</StyledHeaderCell>
              <StyledHeaderCell>Description</StyledHeaderCell>
              <StyledHeaderCell>Booking Form</StyledHeaderCell>
            </TableRow>
          </StyledTableHead>
        </FixedHeaderTable>
      </TableHeaderContainer>

      {services.length === 0 ? (
        <EmptyStateContainer>
          <NoServicesImage
            src="/avatars/service/no-tasks.svg"
            alt="No bookings"
            width={120}
            height={120}
          />
          <NoServicesText>No bookings found.</NoServicesText>
        </EmptyStateContainer>
      ) : (
        <ScrollableTableContainer>
          <FixedHeaderTable>
            <TableBody>
              {services.map(service => {
                return (
                  <StyledTableRow
                    key={service._id}
                    hover
                    sx={{ cursor: onServiceClick ? 'pointer' : 'default' }}
                    onClick={() => handleRowClick(service)}
                  >
                    <StyledTableCell>{service.name}</StyledTableCell>
                    <StyledTableCell>
                      {service.createdBy?.name ?? 'Unknown'}
                    </StyledTableCell>
                    <StyledTableCell>
                      <StatusChip status={service.status ?? 'Confirmed'} />
                    </StyledTableCell>
                    <StyledTableCell>
                      {formatDateTime(service.dateTime ?? service.createdAt)}
                    </StyledTableCell>
                    <StyledTableCell>{service.description}</StyledTableCell>
                    <StyledTableCell className="col-serviceform">
                      {/* Place a button or leave it blank */}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
              {createPlaceholderRows(placeholderCount)}
            </TableBody>
          </FixedHeaderTable>
        </ScrollableTableContainer>
      )}
    </TableContentContainer>
  );
};

export default BookingList;
