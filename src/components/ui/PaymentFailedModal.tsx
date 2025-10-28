// components/ui/PaymentFailedModal.tsx
'use client';

import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal, Typography } from '@mui/material';

import CommonButton from '@/components/ui/CommonButton';

interface Props {
  open: boolean;
  onClose: () => void;
  onRetryPayment: () => Promise<void>;
}

export default function PaymentFailedModal({
  open,
  onClose,
  onRetryPayment,
}: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
    >
      <Box
        sx={{
          width: 456,
          height: 240,
          bgcolor: 'white',
          borderRadius: 3,
          p: 3,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 12, right: 12 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" fontWeight="bold" mt={4}>
          Payment Failed
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Your subscription payment failed. Please update your payment method to continue using our service.
        </Typography>

        <Box display="flex" gap={2} mt={4} justifyContent="flex-end">
          <CommonButton
            onClick={onClose}
            sx={{
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid #ccc',
            }}
          >
            Close
          </CommonButton>
          <CommonButton
            onClick={() => {
              void onRetryPayment();
            }}
          >
            Update Payment Method
          </CommonButton>
        </Box>
      </Box>
    </Modal>
  );
}
