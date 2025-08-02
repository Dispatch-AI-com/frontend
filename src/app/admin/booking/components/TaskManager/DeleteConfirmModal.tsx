// DeleteConfirmModal.tsx
'use client';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  IconButton,
  Modal,
  styled,
  Typography,
} from '@mui/material';
import React from 'react';

import { useGetTasksByUserQuery } from '@/features/service/serviceApi';
import { useDeleteServiceBookingMutation } from '@/features/service/serviceBookingApi';
import { useAppSelector } from '@/redux/hooks';

const ModalContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  borderRadius: 16,
  padding: 0,
  outline: 'none',
  boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
}));

const ModalHeader = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px 24px 0',
  marginBottom: '16px',
}));

const ModalTitle = styled(Typography)(() => ({
  fontSize: '20px',
  fontWeight: 600,
  color: '#1a1a1a',
}));

const CloseButton = styled(IconButton)(() => ({
  padding: 4,
  color: '#666',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
}));

const ModalContent = styled(Box)(() => ({
  padding: '0 24px',
  marginBottom: '24px',
}));

const MessageText = styled(Typography)(() => ({
  fontSize: '14px',
  color: '#666',
  lineHeight: 1.5,
}));

const ModalFooter = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '12px',
  padding: '24px',
  borderTop: '1px solid #f0f0f0',
}));

const CancelButton = styled(Button)(() => ({
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

const DeleteButton = styled(Button)(() => ({
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
}));

interface Props {
  onClose: () => void;
  onConfirm: () => void;
  serviceId: string;
}

const DeleteConfirmModal: React.FC<Props> = ({
  onClose,
  onConfirm,
  serviceId,
}) => {
  const [deleteBooking] = useDeleteServiceBookingMutation();
  const userId = useAppSelector(state => state.auth.user?._id);
  const { refetch } = useGetTasksByUserQuery(userId ?? '');

  const handleConfirmDelete = async () => {
    try {
      await deleteBooking(serviceId).unwrap();
      await refetch();
      onConfirm();
    } catch {
      // console.error('Failed to delete booking:', error);
    }
  };

  return (
    <Modal open onClose={onClose}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Confirm Delete</ModalTitle>
          <CloseButton onClick={onClose}>
            <CloseIcon fontSize="small" />
          </CloseButton>
        </ModalHeader>

        <ModalContent>
          <MessageText>
            Deleted booking cannot be retrieved, continue?
          </MessageText>
        </ModalContent>

        <ModalFooter>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <DeleteButton
            onClick={() => {
              void handleConfirmDelete();
            }}
          >
            Delete
          </DeleteButton>
        </ModalFooter>
      </ModalContainer>
    </Modal>
  );
};

export default DeleteConfirmModal;
