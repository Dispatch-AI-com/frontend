'use client';

import { Box } from '@mui/material';
import TestimonialsSection from '@/components/features/TestimonialsSection';

export default function LandingPage() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '5172px',
        bgcolor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* TODO: Hero Section */}
      {/* TODO: Features Section */}
      <TestimonialsSection />
      {/* TODO: Call to Action / Footer */}
    </Box>
  );
}