import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

import type { ServiceManagement } from '@/features/service-management/serviceManagementApi';
import { useDeleteServiceMutation } from '@/features/service-management/serviceManagementApi';
import theme from '@/theme';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2),
      width: 'calc(100% - 32px)',
      maxWidth: 'none',
    },

    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(1),
      width: 'calc(100% - 16px)',
    },
  },
}));

const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: theme.spacing(1),

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 2, 1, 2),
  },

  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(1.5, 1.5, 0.5, 1.5),
  },
}));

const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  paddingTop: theme.spacing(2),

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 2, 2, 2),
  },

  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(0.5, 1.5, 1.5, 1.5),
  },
}));

const DialogActionsStyled = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(3, 3, 1, 3),

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 2, 1, 2),
    flexDirection: 'column',
    gap: theme.spacing(1),
  },

  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(1.5, 1.5, 0.5, 1.5),
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: theme.spacing(1.5, 2),
  },

  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(1, 2),
    fontSize: '0.875rem',
  },
}));

const MessageText = styled(Typography)(({ theme }) => ({
  color: '#666',

  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem',
    textAlign: 'center',
  },

  [theme.breakpoints.down('xs')]: {
    fontSize: '0.8rem',
  },
}));

export default function DeleteConfirmModal({
  open,
  service,
  onClose,
}: {
  open: boolean;
  service: ServiceManagement | null;
  onClose: () => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [deleteService] = useDeleteServiceMutation();
  const handleDelete = async () => {
    if (!service) return;
    setIsDeleting(true);
    try {
      await deleteService(service._id).unwrap();
      onClose();
    } catch {
      // Error handling can be added here
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isExtraSmallScreen}
    >
      <DialogTitleStyled>
        {/* 直接用 span 保留样式，避免嵌套 heading */}
        <span
          style={{
            fontWeight: 'bold',
            fontSize: isSmallScreen ? '1.25rem' : '1.5rem',
            lineHeight: 1.2,
          }}
        >
          Confirm Delete
        </span>
        <IconButton
          onClick={onClose}
          size={isExtraSmallScreen ? 'small' : 'small'}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitleStyled>

      <DialogContentStyled>
        <MessageText variant={isSmallScreen ? 'body2' : 'body1'}>
          Are you sure you want to delete "{service?.name}"? This action cannot
          be undone.
        </MessageText>
      </DialogContentStyled>

      <DialogActionsStyled>
        <ActionButton
          onClick={onClose}
          disabled={isDeleting}
          variant="outlined"
          sx={{
            border: '1px solid #000',
            color: '#000',
            '&:hover': {
              borderColor: '#333',
              backgroundColor: 'rgba(0,0,0,0.04)',
            },
          }}
        >
          Cancel
        </ActionButton>
        <ActionButton
          onClick={() => {
            void handleDelete();
          }}
          disabled={isDeleting}
          variant="contained"
          sx={{
            backgroundColor: '#d32f2f',
            color: '#fff',
            '&:hover': { backgroundColor: '#b71c1c' },
            '&:disabled': { backgroundColor: '#ccc', color: '#666' },
          }}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </ActionButton>
      </DialogActionsStyled>
    </StyledDialog>
  );
}
