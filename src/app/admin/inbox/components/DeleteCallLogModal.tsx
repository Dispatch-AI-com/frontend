import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';

import { useDeleteCallLogMutation } from '@/features/callog/calllogApi';
import { useAppSelector } from '@/redux/hooks';
import type { ICallLog } from '@/types/calllog.d';

const Modal = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => (props.open ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1300;
`;

const ModalPaper = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 24px;
  max-width: 600px;
  width: calc(100% - 32px);
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1);
  outline: none;

  @media (max-width: 600px) {
    padding: 16px;
    margin: 16px;
    width: calc(100% - 32px);
  }

  @media (max-width: 400px) {
    padding: 12px;
    margin: 8px;
    width: calc(100% - 16px);
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;

  @media (max-width: 600px) {
    padding-bottom: 16px;
  }

  @media (max-width: 400px) {
    padding-bottom: 12px;
  }
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TitleText = styled.span<{ $isSmallScreen: boolean }>`
  font-weight: bold;
  font-size: ${props => (props.$isSmallScreen ? '1.25rem' : '1.5rem')};
  line-height: 1.2;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  color: #666;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ModalContent = styled.div`
  padding-top: 16px;

  @media (max-width: 600px) {
    padding: 8px 16px 16px 16px;
  }

  @media (max-width: 400px) {
    padding: 4px 12px 12px 12px;
  }
`;

const MainText = styled.div<{ $isSmallScreen: boolean }>`
  color: #666;
  margin-bottom: 16px;
  font-size: ${props => (props.$isSmallScreen ? '0.8rem' : '0.875rem')};

  @media (max-width: 400px) {
    font-size: 0.75rem;
  }
`;

const CallLogInfo = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.div`
  font-weight: 500;
  color: #666;
`;

const InfoValue = styled.div`
  color: #333;
`;

const WarningSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const WarningText = styled.div`
  color: #d32f2f;
  margin-top: 16px;
  font-weight: 500;
  font-size: 0.875rem;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 24px 0px 2px 0px;

  @media (max-width: 600px) {
    padding: 16px 0px 2px 0px;
    gap: 8px;
  }

  @media (max-width: 400px) {
    padding: 12px 0px 2px 0px;
  }
`;

const ActionButton = styled.button<{ variant: 'outlined' | 'contained' }>`
  padding: 8px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 100px;
  border: ${props =>
    props.variant === 'outlined' ? '1px solid #000' : '1px solid #d32f2f'};
  background-color: ${props =>
    props.variant === 'outlined' ? 'white' : '#d32f2f'};
  color: ${props => (props.variant === 'outlined' ? '#000' : '#fff')};

  &:hover {
    border-color: ${props =>
      props.variant === 'outlined' ? '#333' : '#b71c1c'};
    background-color: ${props =>
      props.variant === 'outlined' ? 'rgba(0,0,0,0.04)' : '#b71c1c'};
  }

  &:disabled {
    background-color: #ccc;
    color: #666;
    border-color: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    padding: 12px 16px;
    min-width: 120px;
  }

  @media (max-width: 400px) {
    padding: 8px 16px;
    font-size: 0.875rem;
    min-width: 100px;
  }
`;

interface DeleteCallLogModalProps {
  open: boolean;
  onClose: () => void;
  callLog: ICallLog | null;
  onDeleteSuccess?: () => void;
}

export default function DeleteCallLogModal({
  open,
  onClose,
  callLog,
  onDeleteSuccess,
}: DeleteCallLogModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const user = useAppSelector(state => state.auth.user);
  const [deleteCallLog] = useDeleteCallLogMutation();
  const isSmallScreen = window.innerWidth <= 600;

  const handleDelete = async () => {
    if (!callLog || !user?._id || !callLog._id) return;

    setIsDeleting(true);
    try {
      await deleteCallLog({
        userId: user._id,
        calllogId: callLog._id,
      }).unwrap();

      onDeleteSuccess?.();
      onClose();
    } catch (error) {
      // Error handling could be improved with a toast notification
      // eslint-disable-next-line no-console
      console.error('Failed to delete call log:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!callLog) return null;

  return (
    <Modal open={open} onClick={handleBackdropClick}>
      <ModalPaper>
        <ModalHeader>
          <TitleSection>
            <DeleteIcon style={{ color: '#d32f2f' }} />
            <TitleText $isSmallScreen={isSmallScreen}>
              Delete Call Log
            </TitleText>
          </TitleSection>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </ModalHeader>

        <ModalContent>
          <MainText $isSmallScreen={isSmallScreen}>
            Are you sure you want to delete this call log? This action cannot be
            undone.
          </MainText>

          <CallLogInfo>
            <InfoRow>
              <InfoLabel>Caller:</InfoLabel>
              <InfoValue>{callLog.callerName ?? 'Unknown'}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Phone:</InfoLabel>
              <InfoValue>{callLog.callerNumber}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Date:</InfoLabel>
              <InfoValue>
                {callLog.startAt
                  ? new Date(callLog.startAt).toLocaleString()
                  : 'Unknown'}
              </InfoValue>
            </InfoRow>
          </CallLogInfo>

          <WarningSection>
            <WarningIcon style={{ color: '#ed6c02' }} />
            <WarningText>
              This will also delete the associated transcript.
            </WarningText>
          </WarningSection>
        </ModalContent>

        <ModalActions>
          <ActionButton
            variant="outlined"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </ActionButton>
          <ActionButton
            variant="contained"
            onClick={() => void handleDelete()}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <CircularProgress size={16} style={{ color: 'white' }} />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </ActionButton>
        </ModalActions>
      </ModalPaper>
    </Modal>
  );
}
