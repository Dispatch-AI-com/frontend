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
import React, { useState } from 'react';

interface VerificationCodeModalProps {
  open: boolean;
  type: 'mobile' | 'email';
  contact: string; // mobile number or email
  onClose: () => void;
  //   onVerify: (code: string) => Promise<void>;
}

const VerificationCodeModal: React.FC<VerificationCodeModalProps> = ({
  open,
  type,
  contact,
  onClose,
  //   onVerify,
}) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setCode('');
    setError(null);
    onClose();
  };

  const handleVerify = () => {
    if (!code.trim()) {
      setError('Please enter verification code');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      //   await onVerify(code);
      handleClose();
    } catch {
      setError('Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 6) {
      setCode(value);
      setError(null);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      disableScrollLock
      PaperProps={{ sx: { pb: 1, pt: 1, pl: 2, pr: 2 } }}
    >
      <DialogTitle>
        Verify {type === 'mobile' ? 'Mobile Number' : 'Email Address'}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} p={2}>
          <Typography variant="body2" color="text.secondary">
            We've sent a verification code to:
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {contact}
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Verification Code"
            value={code}
            onChange={handleCodeChange}
            placeholder="Enter 6-digit code"
            inputProps={{
              maxLength: 6,
              style: {
                textAlign: 'center',
                fontSize: '18px',
                letterSpacing: '4px',
              },
            }}
            fullWidth
            autoFocus
          />

          <Typography
            variant="caption"
            color="text.secondary"
            textAlign="center"
          >
            Didn't receive the code? Check your spam folder or try again.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleClose}
          disabled={isLoading}
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
          onClick={() => {
            void handleVerify();
          }}
          disabled={isLoading || !code.trim()}
          sx={{
            backgroundColor: 'black',
            color: 'white',
            width: '114px',
            height: '40px',
            '&:hover': {
              backgroundColor: '#333',
            },
            '&:disabled': {
              backgroundColor: '#ccc',
            },
          }}
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VerificationCodeModal;
