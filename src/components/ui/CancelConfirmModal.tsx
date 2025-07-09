// components/common/CancelConfirmModal.tsx
'use client';

import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal, Typography } from '@mui/material';

import CommonButton from '@/components/ui/CommonButton';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function CancelConfirmModal({
  open,
  onClose,
  onConfirm,
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
          height: 232,
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
          Are you sure you want to cancel your subscription?
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Your subscription will remain active by today.
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
            Go Back
          </CommonButton>
          <CommonButton
            onClick={() => {
              void onConfirm();
            }}
          >
            Cancel My Plan
          </CommonButton>
        </Box>
      </Box>
    </Modal>
  );
}
