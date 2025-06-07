import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import React from 'react';

interface EditModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSave: () => void;
  children: React.ReactNode;
}

const EditModal: React.FC<EditModalProps> = ({
  open,
  title,
  onClose,
  onSave,
  children,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth="xs"
    fullWidth
    PaperProps={{ sx: { pb: 1, pt: 1, pl: 2, pr: 2 } }}
  >
    <DialogTitle>
      {title}
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{ position: 'absolute', right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent>{children}</DialogContent>
    <DialogActions>
      <Button
        onClick={onClose}
        sx={{
          backgroundColor: 'white',
          color: 'black',
          width: '114px',
          height: '40px',
          border: '1px solid #ccc',
          '&:hover': {
            backgroundColor: '#b5b3b3',
          },
        }}
      >
        Cancel
      </Button>
      <Button
        onClick={onSave}
        sx={{
          backgroundColor: 'black',
          color: 'white',
          width: '114px',
          height: '40px',
          '&:hover': {
            backgroundColor: '#333',
          },
        }}
      >
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

export default EditModal;
