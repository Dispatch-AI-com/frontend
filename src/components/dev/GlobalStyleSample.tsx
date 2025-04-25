// src/components/dev/GlobalStyleSample.tsx

import { Typography, Button, Stack, Box } from '@mui/material';
import CTAButton from '@/components/ui/CTAButton';

export default function GlobalStyleSample() {
  return (
    <Box
      sx={{
        p: 4,
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: '100vh',
      }}
    >
      <Stack spacing={4}>
        <Typography variant="h1">This is H1</Typography>
        <Typography variant="h2">This is H2</Typography>
        <Typography variant="h3">This is H3</Typography>
        <Typography variant="body1">This is body1 — main paragraph text</Typography>
        <Typography variant="body2">This is body2 — secondary text</Typography>

        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            CTA Button (Black)
          </Typography>
          <CTAButton variant="black">Start Your Free Trial</CTAButton>
        </Box>

        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            CTA Button (Green)
          </Typography>
          <CTAButton variant="green">Request a Demo</CTAButton>
        </Box>
      </Stack>
    </Box>
  );
}
