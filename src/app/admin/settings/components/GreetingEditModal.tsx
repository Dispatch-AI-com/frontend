import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
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
import React, { useEffect, useState } from 'react';

import { validateGreeting } from '@/utils/validationSettings';

interface GreetingEditModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (
    message: string,
    isCustom: boolean,
  ) => { success: boolean; error?: string };
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
  const [message, setMessage] = useState(initialMessage);
  const [isCustomMessage, setIsCustomMessage] = useState(isCustom);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setMessage(initialMessage);
      setIsCustomMessage(isCustom);
      setError('');
    }
  }, [open, initialMessage, isCustom]);

  const validateMessage = (msg: string, custom: boolean): string => {
    const validation = validateGreeting(msg, custom);
    return validation.isValid ? '' : (validation.error ?? '');
  };

  const handleSave = () => {
    setError('');
    setIsLoading(true);

    const validationError = validateMessage(message, isCustomMessage);
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    const result = onSave(message, isCustomMessage);

    if (result.success) {
      onClose();
    } else {
      setError(result.error ?? 'An error occurred while saving');
    }

    setIsLoading(false);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMessage = event.target.value;
    setMessage(newMessage);

    // Clear error if message becomes valid
    if (error) {
      const validationError = validateMessage(newMessage, isCustomMessage);
      if (!validationError) {
        setError('');
      }
    }
  };

  // Update the button click handlers
  const handleDefaultClick = () => {
    setIsCustomMessage(false);
    setMessage(defaultMessage);
    setError('');
  };

  const handleCustomClick = () => {
    setIsCustomMessage(true);
    setMessage('');
    setError('');
  };

  const defaultMessage = `We will generate a greeting message based on your service list. 
    
Here's an example:

Welcome! We are ABC Auto Repair. We provide car maintenance, engine diagnostics, and brake repair services. May I get your name please?
`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      disableScrollLock
      PaperProps={{
        sx: {
          minWidth: { xs: '90vw', sm: '564px' },
          maxWidth: { xs: '95vw', sm: '600px' },
          pb: 2,
          pt: 2,
          pl: { xs: 2, sm: 3 },
          pr: { xs: 2, sm: 3 },
          borderRadius: 3,
          margin: { xs: 1, sm: 2 },
        },
      }}
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
          sx={{
            position: 'absolute',
            right: { xs: 8, sm: 16 },
            top: { xs: 8, sm: 16 },
            padding: { xs: 1, sm: 1 },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 4, px: { xs: 0, sm: 3 } }}>
        <Box
          display="flex"
          gap={0}
          mb={2}
          sx={{
            backgroundColor: '#f5f5f5',
            borderRadius: 2,
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Button
            onClick={handleDefaultClick}
            sx={{
              flex: 1,
              backgroundColor: !isCustomMessage ? '#a8f574' : '#f5f5f5',
              color: !isCustomMessage ? 'black' : 'text.primary',
              textTransform: 'none',
              fontWeight: 'normal',
              '&:hover': {
                backgroundColor: !isCustomMessage ? '#96e862' : '#f5f5f5',
              },
            }}
          >
            Default
          </Button>
          <Button
            onClick={handleCustomClick}
            sx={{
              flex: 1,
              backgroundColor: isCustomMessage ? '#a8f574' : '#f5f5f5',
              color: isCustomMessage ? 'black' : 'text.primary',
              textTransform: 'none',
              fontWeight: 'normal',
              '&:hover': {
                backgroundColor: isCustomMessage ? '#96e862' : '#f5f5f5',
              },
            }}
          >
            Custom
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {isCustomMessage ? (
          <TextField
            placeholder="Enter your custom greeting here"
            multiline
            minRows={6}
            fullWidth
            variant="outlined"
            value={message}
            onChange={handleMessageChange}
            error={!!error}
            helperText={`${message.length}/1000 characters`}
            disabled={isLoading}
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
        ) : (
          <Box
            sx={{
              p: 2,
              backgroundColor: '#f7f7f7',
              borderRadius: 2,
              minHeight: 120,
            }}
          >
            <Typography
              variant="body2"
              sx={{ whiteSpace: 'pre-line', lineHeight: { xs: 1.4, sm: 1.5 } }}
            >
              {defaultMessage}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          pt: 2,
          px: { xs: 0, sm: 0 },
          gap: { xs: 1, sm: 1 },
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
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
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GreetingEditModal;
