'use client';

import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import React from 'react';

// Styled Components
const FeaturesWrapper = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(20),
  backgroundColor: theme.palette.background.default,
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  display: 'block',
  whiteSpace: 'normal',
  [theme.breakpoints.up('md')]: {
    whiteSpace: 'nowrap',
  },
  textAlign: 'center',
  marginBottom: theme.spacing(8),
  width: '100%',
}));

const FeatureCard = styled(Card)(() => ({
  height: '100%',
  maxWidth: 440,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  textAlign: 'left',
  padding: 0,
  paddingLeft: 0,
  boxShadow: 'none',
  backgroundColor: 'transparent',
}));

const FeatureIconContainer = styled(Box)(({ theme }) => ({
  width: '72px',
  height: '72px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#e5fcd5',
  marginBottom: theme.spacing(3),
  alignSelf: 'flex-start',
  marginLeft: 0,
  borderRadius: '50%',
}));

const FeatureTitle = styled(Typography)(({ theme }) => ({
  lineHeight: '30px',
  height: '30px',
  maxWidth: '269px',
  marginBottom: theme.spacing(3),
  textAlign: 'left',
  whiteSpace: 'nowrap',
}));

const FeatureDescription = styled(Typography)(({ theme }) => ({
  lineHeight: '20px',
  maxWidth: '420px',
  height: '40px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  marginTop: theme.spacing(2.5),
  color: theme.palette.text.secondary,
}));

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function FeaturesSection() {
  const features: Feature[] = [
    {
      title: 'Automated Call Handling',
      description:
        'AI answers calls, takes down key information, and creates tickets for you.',
      icon: (
        <Image
          src="/landing/assert-1.svg"
          alt="Follow-Up Actions"
          width={60}
          height={60}
          style={{ transform: 'scale(0.7)' }}
        />
      ),
    },
    {
      title: 'Follow-Up Actions',
      description:
        'Text message or email conclusions, arrange service bookings, and calendar reminders automatically.',
      icon: (
        <Image
          src="/landing/assert-2.svg"
          alt="Follow-Up Actions"
          width={60}
          height={60}
          style={{ transform: 'scale(0.7)' }}
        />
      ),
    },
    {
      title: '24/7 Availability',
      description:
        'Never miss a call, even after hours. Perfect for contractors and rental managers.',
      icon: (
        <Image
          src="/landing/assert-3.svg"
          alt="Follow-Up Actions"
          width={60}
          height={60}
          style={{ transform: 'scale(0.7)' }}
        />
      ),
    },
    {
      title: 'No Tech Skills Needed',
      description:
        'Set up in 3 minutes. Works with your existing phone number.',
      icon: (
        <Image
          src="/landing/assert-4.svg"
          alt="Follow-Up Actions"
          width={60}
          height={60}
          style={{ transform: 'scale(0.7)' }}
        />
      ),
    },
  ];

  return (
    <FeaturesWrapper>
      <StyledContainer maxWidth="lg">
        <SectionTitle variant="h2">
          Automated Calls, Save Time, Grow Your Business
        </SectionTitle>

        <Grid container spacing={10}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <FeatureCard>
                <FeatureIconContainer>{feature.icon}</FeatureIconContainer>
                <CardContent
                  sx={{
                    padding: 0,
                    paddingTop: 0,
                    '&:last-child': { paddingBottom: 0 },
                    width: '100%',
                  }}
                >
                  <FeatureTitle variant="h3">{feature.title}</FeatureTitle>
                  <FeatureDescription variant="body2">
                    {feature.description}
                  </FeatureDescription>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </StyledContainer>
    </FeaturesWrapper>
  );
}
