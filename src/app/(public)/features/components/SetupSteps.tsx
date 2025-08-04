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

const MainTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(12),
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  color: '#888',
  textAlign: 'center',
  marginBottom: theme.spacing(12),
  marginTop: theme.spacing(1),
}));

const StepContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'stretch',
  columnGap: theme.spacing(1.5),
  rowGap: theme.spacing(6),
  marginTop: theme.spacing(6),
  flexWrap: 'wrap',
  [theme.breakpoints.down('md')]: {
    columnGap: theme.spacing(1),
    marginTop: theme.spacing(4),
  },
  // Styles for 529px and below
  [theme.breakpoints.down(530)]: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(3),
    maxWidth: '400px',
    margin: '0 auto',
    marginTop: theme.spacing(4),
  },
}));

const StepCard = styled(Box)(({ theme, bgcolor }) => ({
  background: bgcolor === 'green' ? '#a8f574' : '#060606',
  color: bgcolor === 'green' ? '#060606' : '#ffffff',
  borderRadius: 24,
  width: 220,
  height: 110,
  padding: theme.spacing(2.5),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  position: 'relative',
  flex: '0 0 220px',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    maxWidth: '100%',
    minWidth: 0,
    height: 110,
    padding: theme.spacing(1.5),
  },
  // Styles for 529px and below
  [theme.breakpoints.down(530)]: {
    width: '100%',
    maxWidth: '350px',
    height: '80px !important',
    minHeight: '80px !important',
    maxHeight: '80px !important',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing(1.5, 1),
    justifyContent: 'center',
  },
}));

const StepNumber = styled(Box)(({ theme, bgcolor }) => ({
  background: bgcolor === 'green' ? '#060606' : '#a8f574',
  color: bgcolor === 'green' ? '#a8f574' : '#060606',
  borderRadius: '50%',
  width: 32,
  height: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: -20,
  left: 20,
  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.06)',
  [theme.breakpoints.down('md')]: {
    top: -18,
  },
  // Styles for 529px and below - center display
  [theme.breakpoints.down(530)]: {
    position: 'absolute',
    top: '-16px !important',
    left: '50% !important',
    transform: 'translateX(-50%) !important',
    width: '28px !important',
    height: '28px !important',
  },
}));

const StepNumberText = styled(Typography)(({ color }) => ({
  color: color === 'green' ? '#a8f574' : '#060606',
  fontSize: '16px',
  fontWeight: 700,
}));

const StepLabel = styled(Typography)(({ color, theme }) => ({
  color: color === 'green' ? '#060606' : '#ffffff',
  fontSize: '16px',
  fontWeight: 700,
  lineHeight: 1.3,
  // Styles for 529px and below
  [theme.breakpoints.down(530)]: {
    marginTop: '0 !important',
    fontSize: '14px !important',
    lineHeight: '1.1 !important',
    fontWeight: '600 !important',
  },
}));

const Arrow = styled(Box)(({ theme }) => ({
  color: '#a8f574',
  fontWeight: 900,
  fontSize: 12,
  alignSelf: 'center',
  [theme.breakpoints.down('md')]: {
    fontSize: 8,
  },
  // Show downward arrow for 529px and below
  [theme.breakpoints.down(530)]: {
    fontSize: 16,
    transform: 'rotate(90deg)',
    margin: theme.spacing(1, 0),
  },
}));

// New: Small screen connector line component
const ConnectorLine = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down(530)]: {
    display: 'block',
    width: '2px',
    height: theme.spacing(2),
    background: '#a8f574',
    margin: '0 auto',
  },
}));

const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 1844,
  margin: '0 auto',
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(10),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

export default function SetupSteps() {
  return (
    <Container>
      <MainTitle variant="h2">Setup in 3 Minutes</MainTitle>
      <SubTitle variant="body1">
        No computer skills required — just talk.
      </SubTitle>
      <StepContainer>
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <StepCard bgcolor={step.color}>
              <StepNumber bgcolor={step.color}>
                <StepNumberText color={step.color}>
                  {'0' + String(idx + 1)}
                </StepNumberText>
              </StepNumber>
              <StepLabel color={step.color} theme={undefined}>
                {step.label}
              </StepLabel>
            </StepCard>
            {idx < steps.length - 1 && <Arrow as="span">&gt;&gt;</Arrow>}
          </React.Fragment>
        ))}
      </StepContainer>
    </Container>
  );
}
