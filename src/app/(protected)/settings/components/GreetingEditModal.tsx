import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import theme from '@/theme';

interface GreetingEditModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (message: string, isCustom: boolean) => void;
  initialMessage: string;
  isCustom: boolean;
}

const GreetingEditModal: React.FC<GreetingEditModalProps> = ({
  open,
  onClose,
  onSave,
  initialMessage,
  isCustom,
}) => {
  const [selectedType, setSelectedType] = useState<'default' | 'custom'>(
    isCustom ? 'custom' : 'default',
  );
  const [customMessage, setCustomMessage] = useState(
    isCustom ? initialMessage : '',
  );

  const defaultMessage = `Hello! I'm an Dispatch AI assistant working for you.

Your team is not available to take the call right now.

I can take a message for you, or help you book an appointment with your team. What can I do for you today?

你也可以和我说普通话。`;

  const handleSave = () => {
    const messageToSave =
      selectedType === 'default' ? defaultMessage : customMessage;
    onSave(messageToSave, selectedType === 'custom');
    onClose();
  };

  const handleTypeChange = (type: 'default' | 'custom') => {
    setSelectedType(type);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      disableScrollLock
      PaperProps={{ sx: { pb: 2, pt: 2, pl: 3, pr: 3, borderRadius: 3 } }}
    >
      <DialogTitle sx={{ pb: 2 }}>
        <Typography variant="h6" component="div">
          Greeting
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 2, mb: 1 }}
        >
          What do you want Dispatch AI to say when she picks up the phone?
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 16, top: 16 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 4 }}>
        <Box
          display="flex"
          gap={0}
          mb={2}
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            p: 0.5,
          }}
        >
          <Button
            onClick={() => handleTypeChange('default')}
            sx={{
              flex: 1,
              backgroundColor:
                selectedType === 'default' ? '#a8f574' : 'transparent',
              color: selectedType === 'default' ? 'black' : 'text.primary',
              textTransform: 'none',
              fontWeight: 'normal',
              '&:hover': {
                backgroundColor:
                  selectedType === 'default' ? '#96e862' : '#f5f5f5',
              },
            }}
          >
            Default
          </Button>
          <Button
            onClick={() => handleTypeChange('custom')}
            sx={{
              flex: 1,
              backgroundColor:
                selectedType === 'custom' ? '#a8f574' : 'transparent',
              color: selectedType === 'custom' ? 'black' : 'text.primary',
              textTransform: 'none',
              fontWeight: 'normal',
              '&:hover': {
                backgroundColor:
                  selectedType === 'custom' ? '#96e862' : '#f5f5f5',
              },
            }}
          >
            Custom
          </Button>
        </Box>

        {selectedType === 'default' ? (
          <Box
            sx={{
              p: 2,
              backgroundColor: '#f7f7f7',
              borderRadius: 2,
              minHeight: 120,
            }}
          >
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
              {defaultMessage}
            </Typography>
          </Box>
        ) : (
          <TextField
            placeholder="Enter your custom greeting here"
            multiline
            minRows={6}
            fullWidth
            variant="outlined"
            value={customMessage}
            onChange={e => setCustomMessage(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#f7f7f7',
                borderRadius: 2,
                '& fieldset': {
                  border: 'none',
                },
              },
            }}
          />
        )}
      </DialogContent>

      <DialogActions sx={{ pt: 2, px: 0 }}>
        <Button
          onClick={onClose}
          sx={{
            backgroundColor: 'white',
            color: 'black',
            width: '114px',
            height: '40px',
            border: '1px solid #ccc',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
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
};

export default GreetingEditModal;
