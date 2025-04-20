// components/ui/TestimonialCard.tsx
'use client';

import { Box, Typography, Card, CardContent, SxProps, Theme } from '@mui/material';
import React from 'react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  sx?: SxProps<Theme>; // Responsive override support
}

export default function TestimonialCard({ quote, name, title, sx }: TestimonialCardProps) {
  return (
    <Card
      sx={{
        width: { xs: '100%', md: '696px' },
        height: 'auto',
        p: '60px',
        borderRadius: '24px',
        border: '1px solid #d5d5d5',
        bgcolor: '#fff',
        boxShadow: 0,
        flexShrink: 0,
        ...sx,
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            width: '22px',
            height: '20px',
            margin: '0 554px 24px 0',
          }}
        >
          <img
            src="/invalid-name.svg"
            alt="Quote Icon"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </Box>

        <Typography
          sx={{
            width: '576px',
            height: '64px',
            mt: '24px',
            mb: '48px',
            fontFamily: 'Roboto',
            fontSize: '24px',
            fontWeight: 'bold',
            lineHeight: 1.33,
            color: '#060606',
          }}
        >
          {quote}
        </Typography>

        <Typography
          sx={{
            width: '53px',
            height: '30px',
            mb: '16px',
            fontFamily: 'Roboto',
            fontSize: '24px',
            fontWeight: 'bold',
            lineHeight: 1.25,
            color: '#060606',
          }}
        >
          {name}
        </Typography>

        <Typography
          sx={{
            width: 'auto',
            height: '20px',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: 1.25,
            color: '#6d6d6d',
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
