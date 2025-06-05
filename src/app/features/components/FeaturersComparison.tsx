'use client';

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const rows = [
  {
    diy: 'Busy or phone off at night',
    ai: '24/7 automatic answering',
  },
  {
    diy: 'Paper notes can get lost',
    ai: 'Automatic archiving',
  },
  {
    diy: 'Personally texting/calling for payment',
    ai: 'Automatic reminders',
  },
  {
    diy: 'Might miss urgent calls',
    ai: 'Red alert for high priority',
  },
];

const TableContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 900,
  margin: '0 auto',
  background: '#fff',
  borderRadius: 20,
  boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
  overflow: 'hidden',
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(8),
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));

const TableRow = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'center',
  borderBottom: '1px solid #f0f0f0',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

const TableCell = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  fontSize: 16,
  color: '#222',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 1.5),
    textAlign: 'center',
  },
}));

export default function FeaturersComparison() {
  return (
    <Box sx={{ width: '100%', px: { xs: 2, md: 0 } }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, textAlign: 'center', mb: 4 }}
      >
        DIY vs AI Assistant
      </Typography>
      <TableContainer>
        <TableRow>
          <TableCell sx={{ textAlign: 'center', fontWeight: 700 }}>
            DIY
          </TableCell>
          <TableCell
            sx={{ textAlign: 'center', fontWeight: 700, background: '#e8f7de' }}
          >
            AI Assistant
          </TableCell>
        </TableRow>
        {rows.map((row, idx) => (
          <TableRow key={idx}>
            <TableCell>{row.diy}</TableCell>
            <TableCell sx={{ background: '#e8f7de' }}>{row.ai}</TableCell>
          </TableRow>
        ))}
      </TableContainer>
    </Box>
  );
}
