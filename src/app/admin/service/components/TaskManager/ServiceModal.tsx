// ServiceModal.tsx
'use client';

import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  Select,
  styled,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import type { Service, TaskStatus } from '@/features/service/serviceApi';
import {
  useCreateServiceMutation,
  useGetServicesQuery,
} from '@/features/service/serviceApi';
import { useCreateServiceBookingMutation } from '@/features/service/serviceBookingApi';
import { useAppSelector } from '@/redux/hooks';

const ModalContainer = styled(Box)({
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
});

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
});

const FormField = styled(Box)({
  marginBottom: '20px',
});

const FieldLabel = styled(Typography)({
  fontSize: '14px',
  fontWeight: 500,
  color: '#1a1a1a',
  marginBottom: '8px',
});

const StyledTextField = styled(TextField)({
  width: '420px',
  '& .MuiOutlinedInput-root': {
    height: '40px',
    borderRadius: '12px',
    backgroundColor: '#fafafa',
    '& fieldset': {
      borderColor: '#d5d5d5',
    },
    '&:hover fieldset': {
      borderColor: '#bdbdbd',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
    },
  },
  '& .MuiInputBase-input': {
    padding: '12px 16px',
    fontSize: '14px',
    fontFamily: 'Roboto',
    height: '16px',
  },
});

const CreatedByContainer = styled(Box)({
  width: '123px',
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
});

const StatusSelect = styled(Select)({
  width: '420px',
  height: '40px',
  borderRadius: '12px',
  backgroundColor: '#fafafa',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#d5d5d5',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#bdbdbd',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#1976d2',
  },
  '& .MuiSelect-select': {
    padding: '12px 16px',
    fontSize: '14px',
    color: '#666',
    '&[aria-expanded="false"]:empty::before': {
      content: '"Please Select"',
      color: '#999',
    },
  },
});

const DateTimeInput = styled(TextField)({
  width: '420px',
  '& .MuiOutlinedInput-root': {
    height: '40px',
    borderRadius: '12px',
    backgroundColor: '#fafafa',
    '& fieldset': {
      borderColor: '#d5d5d5',
    },
    '&:hover fieldset': {
      borderColor: '#bdbdbd',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
    },
  },
  '& .MuiInputBase-input': {
    padding: '12px 16px',
    fontSize: '14px',
  },
});

const DescriptionTextarea = styled(TextareaAutosize)({
  width: '420px',
  minHeight: '80px',
  padding: '12px 16px',
  border: '1px solid #d5d5d5',
  borderRadius: '12px',
  backgroundColor: '#fafafa',
  fontSize: '14px',
  resize: 'none',
  outline: 'none',
});

const ModalFooter = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '12px',
  padding: '24px',
  borderTop: '1px solid #f0f0f0',
  marginTop: '24px',
});

const CancelButton = styled(Button)({
  padding: '8px 24px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '14px',
  color: '#666',
  border: '1px solid #e0e0e0',
});

const CreateButton = styled(Button)({
  padding: '8px 24px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '14px',
  backgroundColor: '#1a1a1a',
  color: 'white',
  '&:hover': {
    backgroundColor: '#333',
  },
  '&:disabled': {
    backgroundColor: '#f0f0f0',
    color: '#999',
  },
});

interface Props {
  onClose: () => void;
  onCreate: (service: Service) => void;
}

const ServiceModal: React.FC<Props> = ({ onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [datetime, setDatetime] = useState(() => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  });
  const [description, setDescription] = useState('');
  const [createService] = useCreateServiceMutation();
  const [createServiceBooking] = useCreateServiceBookingMutation();
  const user = useAppSelector(state => state.auth.user);
  const userName =
    user && (user.firstName ?? user.lastName)
      ? `${user.firstName ?? ''}${user.lastName ? ' ' + user.lastName : ''}`.trim()
      : (user?.email ?? 'User');
  const userInitials = user
    ? (
        (user.firstName?.[0] ?? '') + (user.lastName?.[0] ?? '')
      ).toUpperCase() ||
      (user.email?.[0]?.toUpperCase() ?? 'U')
    : 'U';

  const isValid = name && status && datetime;

  // Utility function: Map frontend status to backend booking status
  const mapStatusToBookingStatus = (
    status: string,
  ): 'pending' | 'confirmed' | 'done' => {
    switch (status) {
      case 'Completed':
        return 'done';
      case 'Missed':
        return 'pending';
      case 'Follow-up':
        return 'confirmed';
      default:
        return 'pending';
    }
  };

  // 工具函数：将 datetime-local 补全为后端需要的 UTC 字符串（标准 ISO/UTC，不手动加 Z）
  function toBackendDateString(datetime: string) {
    if (!datetime) return '';
    try {
      let dateStr = datetime;
      if (dateStr.length === 16) {
        dateStr = `${dateStr}:00`;
      }
      const testDate = new Date(dateStr);
      if (isNaN(testDate.getTime())) {
        throw new Error('Invalid date format');
      }
      return testDate.toISOString();
    } catch (error) {
      console.error(
        'Error converting date to backend format:',
        datetime,
        error,
      );
      throw new Error('Invalid date format');
    }
  }

  const handleCreate = async () => {
    try {
      if (!user) {
        throw new Error('User is missing, please login again.');
      }
      const bookingStatus = mapStatusToBookingStatus(status);
      const serviceId = uuidv4();
      const bookingTime = toBackendDateString(datetime);
      if (!bookingTime) {
        alert('Please select a valid date and time');
        return;
      }
      await createServiceBooking({
        serviceId,
        companyId: 'default',
        client: { name: userName, phoneNumber: 'dummy', address: 'dummy' },
        serviceFormValues: [{ serviceFieldId: 'dummy', answer: name }],
        bookingTime,
        status: bookingStatus,
        note: description,
        userId: user?._id,
      }).unwrap();
      const statusMap: Record<string, TaskStatus> = {
        done: 'Completed',
        pending: 'Missed',
        confirmed: 'Follow-up',
      };
      onCreate({
        name,
        price: 0,
        notifications: {
          preferNotificationType: 'EMAIL',
          phoneNumber: '',
          email: '',
        },
        isAvailable: true,
        companyId: 'default',
        status: statusMap[bookingStatus],
        description,
      });
      onClose();
    } catch (error: unknown) {
      // if (typeof error === 'object' && error !== null && 'data' in error) {
      //   const errData = (error as { data?: { message?: string } }).data;
      //   console.error('Failed to create booking:', errData?.message ?? JSON.stringify(error));
      // } else {
      //   console.error('Failed to create booking:', JSON.stringify(error));
      // }
    }
  };

  return (
    <Modal open onClose={onClose}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Create New Service</ModalTitle>
          <CloseButton onClick={onClose}>
            <CloseIcon fontSize="small" />
          </CloseButton>
        </ModalHeader>

        <ModalContent>
          <FormField>
            <FieldLabel>Service Name</FieldLabel>
            <StyledTextField
              fullWidth
              placeholder="Service Name"
              value={name}
              onChange={e => setName(e.target.value)}
              variant="outlined"
            />
          </FormField>

          <FormField>
            <FieldLabel>Created By</FieldLabel>
            <CreatedByContainer>
              <UserAvatar>{userInitials}</UserAvatar>
              <UserName>{userName}</UserName>
            </CreatedByContainer>
          </FormField>

          <FormField>
            <FieldLabel>Status</FieldLabel>
            <FormControl fullWidth>
              <StatusSelect
                value={status}
                onChange={e => setStatus(e.target.value as TaskStatus)}
                displayEmpty
                renderValue={selected => {
                  if (!selected) {
                    return <span style={{ color: '#999' }}>Please Select</span>;
                  }
                  return typeof selected === 'string'
                    ? selected
                    : JSON.stringify(selected);
                }}
              >
                {['Completed', 'Missed', 'Follow-up'].map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </StatusSelect>
            </FormControl>
          </FormField>

          <FormField>
            <FieldLabel>Date & Time</FieldLabel>
            <DateTimeInput
              fullWidth
              type="datetime-local"
              value={datetime}
              onChange={e => setDatetime(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </FormField>

          <FormField>
            <FieldLabel>Description</FieldLabel>
            <DescriptionTextarea
              placeholder="Fill in"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </FormField>
        </ModalContent>

        <ModalFooter>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <CreateButton onClick={() => void handleCreate()} disabled={!isValid}>
            Create
          </CreateButton>
        </ModalFooter>
      </ModalContainer>
    </Modal>
  );
};

export default ServiceModal;
