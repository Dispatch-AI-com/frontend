// ViewFormModal.tsx
'use client';

import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar,
  Box,
  IconButton,
  Modal,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';

import type { Service } from '@/features/service/serviceApi';

interface Props {
  service: Service;
  onClose: () => void;
}

const ModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 480,
  backgroundColor: 'white',
  borderRadius: 16,
  padding: 0,
  outline: 'none',
  boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('sm')]: {
    width: '95vw',
    height: '90vh',
    borderRadius: 12,
    margin: '5vh 2.5vw',
  },
}));

const ModalHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px 24px 0',
  marginBottom: '24px',
});

const ModalTitle = styled(Typography)({
  fontSize: '20px',
  fontWeight: 600,
  color: '#1a1a1a',
});

const CloseButton = styled(IconButton)({
  padding: 4,
  color: '#666',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
});

const ModalContent = styled(Box)({
  padding: '0 24px',
  maxHeight: '60vh',
  overflowY: 'auto',
});

const FormField = styled(Box)({
  marginBottom: '20px',
});

const FieldLabel = styled(Typography)({
  fontSize: '14px',
  fontWeight: 500,
  color: '#1a1a1a',
  marginBottom: '8px',
  fontFamily: 'Roboto',
});

const FieldValue = styled(Typography)({
  fontSize: '14px',
  color: '#666',
  lineHeight: '1.5',
  wordBreak: 'break-word',
  fontFamily: 'Roboto',
});

const CreatedByContainer = styled(Box)({
  width: 'fit-content',
  height: '40px',
  margin: '6px 0 0',
  padding: '6px 10px',
  borderRadius: '20px',
  border: 'solid 1px #d5d5d5',
  backgroundColor: '#f5f5f5',
  display: 'flex',
  alignItems: 'center',
});

const UserAvatar = styled(Avatar)({
  width: 24,
  height: 24,
  fontSize: '12px',
  backgroundColor: '#1976d2',
  marginRight: '8px',
});

const UserName = styled(Typography)({
  fontSize: '14px',
  color: '#060606',
  fontFamily: 'Roboto',
});

const StatusChip = ({ status }: { status: string }) => {
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

const ViewFormModal: React.FC<Props> = ({ service, onClose }) => {
  const theme = useTheme();
  useMediaQuery(theme.breakpoints.down('sm'));

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
        second: '2-digit',
        hour12: false,
      });
    } catch {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    }
  };

  const getUserInitials = (
    user:
      | { name?: string; firstName?: string; lastName?: string; email?: string }
      | null
      | undefined,
  ) => {
    if (!user) return 'U';
    if (user.name) {
      return user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return (
      (
        (user.firstName?.[0] ?? '') + (user.lastName?.[0] ?? '')
      ).toUpperCase() ||
      (user.email?.[0]?.toUpperCase() ?? 'U')
    );
  };

  const getUserName = (
    user:
      | { name?: string; firstName?: string; lastName?: string; email?: string }
      | null
      | undefined,
  ) => {
    if (!user) return 'Unknown';
    if (user.name) return user.name;
    if (user.firstName || user.lastName) {
      return `${user.firstName ?? ''}${user.lastName ? ' ' + user.lastName : ''}`.trim();
    }
    return user.email ?? 'Unknown';
  };

  return (
    <Modal open onClose={onClose}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>View Service Form</ModalTitle>
          <CloseButton onClick={onClose}>
            <CloseIcon fontSize="small" />
          </CloseButton>
        </ModalHeader>

        <ModalContent>
          <FormField>
            <FieldLabel>Service Name:</FieldLabel>
            <FieldValue>{service.name}</FieldValue>
          </FormField>

          <FormField>
            <FieldLabel>Status:</FieldLabel>
            <StatusChip status={service.status ?? 'Confirmed'} />
          </FormField>

          <FormField>
            <FieldLabel>Date & Time:</FieldLabel>
            <FieldValue>
              {formatDateTime(service.dateTime ?? service.createdAt)}
            </FieldValue>
          </FormField>

          {service.description && (
            <FormField>
              <FieldLabel>Description:</FieldLabel>
              <FieldValue>{service.description}</FieldValue>
            </FormField>
          )}

          {service.client && (
            <>
              <FormField>
                <FieldLabel>Client Name:</FieldLabel>
                <FieldValue>{service.client.name}</FieldValue>
              </FormField>

              <FormField>
                <FieldLabel>Client Phone Number:</FieldLabel>
                <FieldValue>{service.client.phoneNumber}</FieldValue>
              </FormField>

              <FormField>
                <FieldLabel>Client Address:</FieldLabel>
                <FieldValue>{service.client.address}</FieldValue>
              </FormField>
            </>
          )}

          <FormField>
            <FieldLabel>Created By:</FieldLabel>
            <CreatedByContainer>
              <UserAvatar>{getUserInitials(service.createdBy)}</UserAvatar>
              <UserName>{getUserName(service.createdBy)}</UserName>
            </CreatedByContainer>
          </FormField>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default ViewFormModal;
