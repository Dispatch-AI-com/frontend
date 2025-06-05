'use client';

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const steps = [
  {
    label: 'Select your phone type',
    color: 'black',
  },
  {
    label: 'Select your carrier',
    color: 'green',
  },
  {
    label: 'Complete pre-work in your phone',
    color: 'black',
  },
  {
    label: 'Scan a QR Code & Complete the rest work',
    color: 'green',
  },
  {
    label: 'Done — Start enjoying AI-managed calls',
    color: 'black',
  },
];

const StepContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: theme.spacing(3),
  marginTop: theme.spacing(6),
  flexWrap: 'wrap',
  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
}));

const StepCard = styled(Box)(({ theme, bgcolor }) => ({
  background: bgcolor === 'green' ? '#b8ff66' : '#060606',
  color: bgcolor === 'green' ? '#060606' : '#fff',
  borderRadius: 20,
  minWidth: 220,
  maxWidth: 260,
  padding: theme.spacing(4, 2.5, 3, 2.5),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  position: 'relative',
  flex: '1 1 220px',
  [theme.breakpoints.down('md')]: {
    minWidth: 180,
    maxWidth: '100%',
    padding: theme.spacing(3, 1.5, 2, 1.5),
    alignItems: 'center',
  },
}));

const StepNumber = styled(Box)(({ theme }) => ({
  background: '#b8ff66',
  color: '#060606',
  borderRadius: '50%',
  width: 36,
  height: 36,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700,
  fontSize: 18,
  position: 'absolute',
  top: -22,
  left: 20,
  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.06)',
  [theme.breakpoints.down('md')]: {
    left: '50%',
    transform: 'translateX(-50%)',
    top: -20,
  },
}));

const Arrow = styled(Box)(({ theme }) => ({
  color: '#b8ff66',
  fontWeight: 900,
  fontSize: 28,
  alignSelf: 'center',
  margin: theme.spacing(0, 0.5),
  [theme.breakpoints.down('md')]: {
    fontSize: 22,
  },
}));

export default function SetupSteps() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1844,
        mx: 'auto',
        mt: { xs: 6, md: 10 },
        mb: { xs: 6, md: 10 },
        px: { xs: 2, md: 0 },
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, textAlign: 'center', mb: 1 }}
      >
        Setup in 3 Minutes
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ color: '#888', textAlign: 'center', mb: 4 }}
      >
        No computer skills required — just talk.
      </Typography>
      <StepContainer>
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <StepCard bgcolor={step.color}>
              <StepNumber bgcolor={step.color}>
                {'0' + String(idx + 1)}
              </StepNumber>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: step.color === 'green' ? 700 : 400,
                  textAlign: { xs: 'center', md: 'left' },
                  mt: { xs: 2, md: 3 },
                  mb: 0,
                }}
              >
                {step.label}
              </Typography>
            </StepCard>
            {idx < steps.length - 1 && <Arrow as="span">&gt;&gt;</Arrow>}
          </React.Fragment>
        ))}
      </StepContainer>
    </Box>
  );
}
