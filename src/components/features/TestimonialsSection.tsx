// components/features/TestimonialsSection.tsx
'use client';

import { Box, Typography } from '@mui/material';
import TestimonialCard from '@/components/ui/TestimonialCard';
import { SxProps, Theme } from '@mui/system';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  margin: SxProps<Theme>['m'];
}

const testimonials: Testimonial[] = [
  {
    quote: 'SmartAgent cut our missed calls by 80%. Lifesaver for my plumbing business!',
    name: 'Josn',
    title: 'CEO of ABC Company',
    margin: { xs: 0, md: '72px 48px 120px 240px' },
  },
  {
    quote: 'Automated follow-ups saved me 10+ hours a week managing rentals.',
    name: 'Jena',
    title: 'Rental Manager',
    margin: { xs: 0, md: '72px 240px 120px 48px' },
  },
];

export default function TestimonialsSection() {
  return (
    <Box sx={{ px: 2, py: 10, bgcolor: 'white' }}>
      {/* Section Title */}
      <Typography
        sx={{
          fontFamily: 'Roboto',
          fontSize: '48px',
          fontWeight: 900,
          lineHeight: 1.17,
          textAlign: 'center',
          color: '#060606',
          maxWidth: '864px',
          mx: 'auto',
          mt: '200px',
          mb: '72px',
        }}
      >
        Trusted by Small Businesses Like Yours
      </Typography>

      {/* Responsive Card Layout */}
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        alignItems="center"
        justifyContent="center"
        gap={{ xs: 4, md: 0 }}
        sx={{ overflowX: 'auto' }}
      >
        {testimonials.map((item, idx) => (
          <TestimonialCard
            key={idx}
            quote={item.quote}
            name={item.name}
            title={item.title}
            sx={{ m: item.margin }}
          />
        ))}
      </Box>
    </Box>
  );
}
