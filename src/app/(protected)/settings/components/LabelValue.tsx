import { Box, Typography } from '@mui/material';

interface LabelValueProps {
  label: string;
  value: React.ReactNode;
  sx?: object;
}

export default function LabelValue({ label, value, sx }: LabelValueProps) {
  return (
    <Box mb={2} sx={sx}>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: 540 }}>
        {value}
      </Typography>
    </Box>
  );
}
