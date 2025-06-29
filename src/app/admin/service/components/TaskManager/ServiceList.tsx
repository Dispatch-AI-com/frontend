// ServiceList.tsx
'use client';

import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Image from 'next/image';

import type { Service } from '@/features/service/serviceApi';

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#F7F8FA',
  '& .MuiTableRow-root': {
    height: '56px',
  },
}));

const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: 'none',
  padding: '12px 16px',
  fontSize: '15px',
  color: '#1A1A1A',
  fontWeight: 500,
  backgroundColor: '#fff',
}));

const TableContentContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minHeight: 0,
  overflowX: 'auto',
  minWidth: '700px',
}));

const ScrollableTableContainer = styled(TableContainer)(({ theme }) => ({
  flex: 1,
  border: 'none',
  borderRadius: '0',
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

const NoServicesImage = styled(Image)(({ theme }) => ({
  width: '120px',
  height: '120px',
  margin: '0 0 24px',
  objectFit: 'contain',
  [theme.breakpoints.down('sm')]: {
    width: '90px',
    height: '90px',
    margin: '0 0 16px',
  },
}));

const NoServicesText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto',
  fontSize: '16px',
  fontWeight: 700,
  lineHeight: '24px',
  color: '#1A1A1A',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '13px',
    lineHeight: '20px',
  },
}));

const EmptyStateContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  width: '100%',
  height: '100%',
  minHeight: '600px',
}));

const FixedHeaderTable = styled(Table)(({ theme }) => ({
  borderCollapse: 'separate',
  borderSpacing: 0,
  tableLayout: 'fixed',
  width: '100%',
  minWidth: '700px',
}));

const TableHeaderContainer = styled(Box)({
  flexShrink: 0,
});

const UserAvatar = styled(Box)({
  width: 24,
  height: 24,
  borderRadius: '50%',
  backgroundColor: '#e0e0e0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#666',
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#F0F2F5',
  },
}));

const StatusChip = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return '#E8F5E8';
      case 'Missed':
        return '#FEE4E2';
      case 'Follow-up':
        return '#FEF0C7';
      default:
        return '#F7F8FA';
    }
  };

  return (
    <Box
      sx={{
        px: 2,
        py: 0.5,
        borderRadius: '12px',
        backgroundColor: getStatusColor(status),
        display: 'inline-block',
        fontSize: '13px',
        fontWeight: 500,
        color: '#1A1A1A',
      }}
    >
      {status}
    </Box>
  );
};

interface Props {
  services: Service[];
  onServiceClick?: (service: Service) => void;
}

const ServiceList: React.FC<Props> = ({ services, onServiceClick }) => {
  const handleRowClick = (service: Service) => {
    if (onServiceClick) {
      onServiceClick(service);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return '#D1FADF';
      case 'Missed':
        return '#FEE4E2';
      case 'Follow-up':
        return '#FEF0C7';
      default:
        return '#E0E0E0';
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
    } catch (error) {
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
              <StyledHeaderCell>Service Form</StyledHeaderCell>
            </TableRow>
          </StyledTableHead>
        </FixedHeaderTable>
      </TableHeaderContainer>

      {services.length === 0 ? (
        <EmptyStateContainer>
          <NoServicesImage
            src="/avatars/service/no-tasks.svg"
            alt="No services"
            width={120}
            height={120}
          />
          <NoServicesText>No tasks found.</NoServicesText>
        </EmptyStateContainer>
      ) : (
        <ScrollableTableContainer>
          <FixedHeaderTable>
            <TableBody>
              {services.map((service, index) => {
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
                      <StatusChip status={service.status ?? 'Follow-up'} />
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

export default ServiceList;
