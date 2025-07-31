import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';

import { useDeleteCallLogMutation } from '@/features/callog/calllogApi';
import { useAppSelector } from '@/redux/hooks';
import type { ICallLog } from '@/types/calllog.d';

const StyledDialogTitle = styled(DialogTitle)`
  && {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #d32f2f;
  }
`;

const StyledDialogContent = styled(DialogContent)`
  && {
    padding: 24px;
    min-width: 400px;
  }
`;

const CallLogInfo = styled(Box)`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  border-left: 4px solid #1976d2;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  font-weight: 500;
  color: #666;
`;

const InfoValue = styled.span`
  color: #333;
`;

const WarningText = styled(Typography)`
  && {
    color: #d32f2f;
    margin-top: 16px;
    font-weight: 500;
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

  if (!callLog) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <StyledDialogTitle>
        <DeleteIcon />
        Delete Call Log
      </StyledDialogTitle>

      <StyledDialogContent>
        <Typography variant="body1" gutterBottom>
          Are you sure you want to delete this call log? This action cannot be
          undone.
        </Typography>

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

        <Box display="flex" alignItems="center" gap={1}>
          <WarningIcon color="warning" />
          <WarningText variant="body2">
            This will also delete the associated transcript and conversation
            chunks.
          </WarningText>
        </Box>
      </StyledDialogContent>

      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button onClick={onClose} disabled={isDeleting} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => void handleDelete()}
          disabled={isDeleting}
          variant="contained"
          color="error"
          startIcon={
            isDeleting ? <CircularProgress size={16} /> : <DeleteIcon />
          }
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
