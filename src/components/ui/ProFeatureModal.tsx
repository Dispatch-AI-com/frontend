'use client';

import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal, Typography } from '@mui/material';

import CommonButton from '@/components/ui/CommonButton';

interface ProFeatureModalProps {
  open: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  featureName?: string;
}

export default function ProFeatureModal({
  open,
  onClose,
  onUpgrade,
  featureName,
}: ProFeatureModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
    >
      <Box
        sx={{
          width: 520,
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

        <Typography variant="h6" fontWeight="bold" mt={1} gutterBottom>
          Pro plan required
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {featureName
            ? `${featureName} is available for Pro users.`
            : 'This feature is available for Pro users.'}{' '}
          Upgrade to unlock full access.
        </Typography>

        <Box mt={2} component="ul" sx={{ pl: 3, m: 0 }}>
          <Typography component="li" variant="body2">
            Unlimited bookings and calendar access
          </Typography>
          <Typography component="li" variant="body2">
            Advanced service management tools
          </Typography>
          <Typography component="li" variant="body2">
            Priority support and faster updates
          </Typography>
        </Box>

        <Box display="flex" gap={2} mt={4} justifyContent="flex-end">
          <CommonButton
            onClick={onClose}
            sx={{
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid #ccc',
            }}
          >
            Not for Now
          </CommonButton>
          <CommonButton onClick={onUpgrade}>Upgrade to Pro</CommonButton>
        </Box>
      </Box>
    </Modal>
  );
}
