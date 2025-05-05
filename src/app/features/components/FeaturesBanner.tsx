'use client'

import { Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const BannerSection = styled('section')(({ theme }) => ({
  background: '#000',
  width: '100vw',
  position: 'relative',
  left: '50%',
  right: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(20),
    paddingBottom: theme.spacing(15),
  },
}));

const BannerContainer = styled(Container)(({ theme }) => ({
  maxWidth: theme.breakpoints.values.xl,
}));

const BannerTitle = styled('h1')(({ theme }) => ({
  ...theme.typography.h1,
  color: '#b8ff66',
  textAlign: 'center',
  fontSize: '48px !important',
  margin: 0,
  marginBottom: 4,
  lineHeight: 1.2,
  [theme.breakpoints.down('md')]: {
    fontSize: '32px !important',
    lineHeight: 1.2,
  },
  '&:last-of-type': {
    marginBottom: 0,
  },
}));

const FeatureGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(12),
  justifyContent: 'center',
  columnGap: theme.spacing(16),
}));

const FeatureText = styled('div')(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 400,
  fontFamily: theme.typography.fontFamily,
  color: '#fff',
  textAlign: 'center',
  marginTop: theme.spacing(2),
}));

export default function FeaturesBanner() {
  return (
    <BannerSection>
      <BannerContainer maxWidth="xl">
        <BannerTitle>Your 24/7 Phone Assistant</BannerTitle>
        <BannerTitle>Let Us Answer While You Get the Job Done</BannerTitle>
        <FeatureGrid container spacing={2}>
          <Grid item xs={12} md="auto">
            <FeatureText>Never Miss Customer Calls</FeatureText>
          </Grid>
          <Grid item xs={12} md="auto">
            <FeatureText>Auto-Handle Paperwork</FeatureText>
          </Grid>
          <Grid item xs={12} md="auto">
            <FeatureText>Works While You Sleep</FeatureText>
          </Grid>
        </FeatureGrid>
      </BannerContainer>
    </BannerSection>
  );
} 