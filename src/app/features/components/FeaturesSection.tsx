'use client';

import { Box, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

const SectionRoot = styled('section')(({ theme }) => ({
  background: theme.palette.background.default,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(36),
  },
}));

const SectionContainer = styled(Container)(({ theme }) => ({
  maxWidth: 1000,
  margin: '0 auto',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h2,
  textAlign: 'center',
  fontWeight: 900,
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    marginBottom: theme.spacing(12),
  },
}));

const FeatureImageBox = styled(Box)(({ theme }) => ({
  width: '100%',
  aspectRatio: '1 / 1',
  background: '#fff',
  border: `1px solid #bdbdbd`,
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    minWidth: 480,
    maxWidth: 800,
    height: 'auto',
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 1000,
  },
}));

const FeatureList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(8),
    gap: theme.spacing(8),
  },
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const FeatureTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

const FeatureDesc = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(0.5),
}));

export default function FeaturesSection() {
  return (
    <SectionRoot>
      <SectionContainer>
        <SectionTitle variant="h2">
          Combined Features & Workflow Section
        </SectionTitle>
        <Grid container justifyContent="center" alignItems="center" spacing={4}>
          <Grid item xs={12} md={7}>
            <FeatureImageBox>
              <Image
                src="/workflow.jpg"
                alt="Workflow"
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 900px) 100vw, 600px"
                priority
              />
            </FeatureImageBox>
          </Grid>
          <Grid item xs={12} md={5}>
            <FeatureList>
              <FeatureItem>
                <FeatureTitle>Incoming Call</FeatureTitle>
                <FeatureDesc>24/7 Auto-Answer & Smart Call Screening</FeatureDesc>
              </FeatureItem>
              <FeatureItem>
                <FeatureTitle>AI Interaction</FeatureTitle>
                <FeatureDesc>Emergency Alerts</FeatureDesc>
              </FeatureItem>
              <FeatureItem>
                <FeatureTitle>Auto Create Paperwork</FeatureTitle>
                <FeatureDesc>Auto-Ticket Creation</FeatureDesc>
              </FeatureItem>
              <FeatureItem>
                <FeatureTitle>Reminders & Follow-ups</FeatureTitle>
                <FeatureDesc>Smart Reminders</FeatureDesc>
              </FeatureItem>
              <FeatureItem>
                <FeatureTitle>History & Management</FeatureTitle>
                <FeatureDesc>Job History Tracking + Auto-Organize Contacts</FeatureDesc>
              </FeatureItem>
            </FeatureList>
          </Grid>
        </Grid>
      </SectionContainer>
    </SectionRoot>
  );
} 