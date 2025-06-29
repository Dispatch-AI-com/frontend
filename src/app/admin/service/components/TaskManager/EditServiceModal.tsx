// EditServiceModal.tsx
'use client';

import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  styled,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import type { Service, TaskStatus } from '@/features/service/serviceApi';
import { useAppSelector } from '@/redux/hooks';

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
}));

const ModalHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px 24px 0',
  marginBottom: '24px',
}));

const ModalTitle = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 600,
  color: '#1a1a1a',
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  padding: 4,
  color: '#666',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
}));

const ModalContent = styled(Box)(({ theme }) => ({
  padding: '0 24px',
}));

const FormField = styled(Box)(({ theme }) => ({
  marginBottom: '20px',
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 500,
  color: '#1a1a1a',
  marginBottom: '8px',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
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
  '& .MuiInputLabel-root': {
    fontSize: '14px',
    color: '#999',
  },
}));

const CreatedByContainer = styled(Box)(({ theme }) => ({
  width: '123px',
  height: '40px',
  margin: '6px 0 0',
  padding: '6px 10px',
  borderRadius: '20px',
  border: 'solid 1px #d5d5d5',
  backgroundColor: '#f5f5f5',
  display: 'flex',
  alignItems: 'center',
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: 24,
  height: 24,
  fontSize: '12px',
  backgroundColor: '#1976d2',
  marginRight: '8px',
}));

const UserName = styled(Typography)(({ theme }) => ({
  width: '67px',
  height: '16px',
  fontFamily: 'Roboto',
  fontSize: '14px',
  fontWeight: 'normal',
  lineHeight: 1.14,
  color: '#060606',
}));

const StatusSelect = styled(Select)(({ theme }) => ({
  width: '420px',
  height: '40px',
  margin: '6px 0 0',
  borderRadius: '12px',
  border: 'solid 1px #d5d5d5',
  backgroundColor: '#fafafa',
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiSelect-select': {
    padding: '12px 16px',
    fontSize: '14px',
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    lineHeight: 1.14,
    color: '#060606',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
  },
}));

const DateTimeInput = styled(TextField)(({ theme }) => ({
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
}));

const DescriptionTextarea = styled(TextareaAutosize)(({ theme }) => ({
  width: '420px',
  minHeight: '80px',
  padding: '12px 16px',
  border: '1px solid #d5d5d5',
  borderRadius: '12px',
  backgroundColor: '#fafafa',
  fontSize: '14px',
  fontFamily: 'Roboto',
  resize: 'none',
  outline: 'none',
  boxSizing: 'border-box',
  '&:hover': {
    borderColor: '#bdbdbd',
  },
  '&:focus': {
    borderColor: '#1976d2',
  },
  '&::placeholder': {
    color: '#999',
  },
}));

const ModalFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '12px',
  padding: '24px',
  borderTop: '1px solid #f0f0f0',
  marginTop: '24px',
}));

const DeleteButton = styled(Button)(({ theme }) => ({
  padding: '8px 24px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 500,
  color: '#666',
  border: '1px solid #e0e0e0',
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    borderColor: '#bdbdbd',
  },
}));

const SaveButton = styled(Button)(({ theme }) => ({
  padding: '8px 24px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 500,
  backgroundColor: '#1a1a1a',
  color: 'white',
  '&:hover': {
    backgroundColor: '#333',
  },
  '&:disabled': {
    backgroundColor: '#f0f0f0',
    color: '#999',
  },
}));

interface Props {
  service: Service;
  onClose: () => void;
  onSave: (updatedService: Service) => void;
  onDelete: (serviceId: string) => void;
}

// Utility function: Convert ISO string to datetime-local format (local time)
function formatForDateTimeLocal(isoString: string): string {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  } catch {
    return '';
  }
}

const EditServiceModal: React.FC<Props> = ({
  service,
  onClose,
  onSave,
  onDelete,
}) => {
  const [name, setName] = useState(service.name);
  const [description, setDescription] = useState(service.description ?? '');
  const [status, setStatus] = useState<TaskStatus>(
    service.status ?? 'Follow-up',
  );
  const [dateTime, setDateTime] = useState(
    formatForDateTimeLocal(service.dateTime ?? ''),
  );

  const isValid = name && status && dateTime;

  const handleSave = () => {
    // Convert to ISO string when saving
    let isoDateTime = dateTime;
    if (isoDateTime && isoDateTime.length === 16) isoDateTime += ':00';
    const isoString = isoDateTime ? new Date(isoDateTime).toISOString() : '';
    const updatedService = {
      ...service,
      name,
      description,
      status,
      dateTime: isoString,
    };
    onSave(updatedService as Service);
  };

  const handleDelete = () => {
    if (service._id) {
      onDelete(service._id);
    }
  };

  return (
    <Modal open onClose={onClose}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Edit Service</ModalTitle>
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
              <UserAvatar>JC</UserAvatar>
              <UserName>
                {typeof service.createdBy === 'object' &&
                service.createdBy !== null
                  ? service.createdBy.name
                  : service.createdBy}
              </UserName>
            </CreatedByContainer>
          </FormField>

          <FormField>
            <FieldLabel>Status</FieldLabel>
            <FormControl fullWidth>
              <StatusSelect
                value={status}
                onChange={e => setStatus(e.target.value as TaskStatus)}
                displayEmpty
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
              value={dateTime}
              onChange={e => setDateTime(e.target.value)}
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
          <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
          <SaveButton onClick={handleSave} disabled={!isValid}>
            Save
          </SaveButton>
        </ModalFooter>
      </ModalContainer>
    </Modal>
  );
};

export default EditServiceModal;
