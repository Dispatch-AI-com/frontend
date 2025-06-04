'use client';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BuildIcon from '@mui/icons-material/Build';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
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
  width: 64,
  height: 64,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.grey[100],
  borderRadius: '12px',
  marginBottom: theme.spacing(3),
  alignSelf: 'flex-start',
  marginLeft: 0,
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
      icon: <PhoneInTalkIcon sx={{ fontSize: 60 }} />,
    },
    {
      title: 'Follow-Up Actions',
      description:
        'Text message or email conclusions, arrange service bookings, and calendar reminders automatically.',
      icon: <NotificationsActiveIcon sx={{ fontSize: 60 }} />,
    },
    {
      title: '24/7 Availability',
      description:
        'Never miss a call, even after hours. Perfect for contractors and rental managers.',
      icon: <AccessTimeIcon sx={{ fontSize: 60 }} />,
    },
    {
      title: 'No Tech Skills Needed',
      description:
        'Set up in 3 minutes. Works with your existing phone number.',
      icon: <BuildIcon sx={{ fontSize: 60 }} />,
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
