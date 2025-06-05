'use client';

import { Box, Container, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

const CallIcon = () => (
  <Image src="/features/call.svg" alt="Call" width={32} height={32} />
);
const PaperworkIcon = () => (
  <Image src="/features/paperwork.svg" alt="Paperwork" width={32} height={32} />
);
const SleepIcon = () => (
  <Image src="/features/sleep.svg" alt="Sleep" width={32} height={32} />
);

const BannerSection = styled('section')(({ theme }) => ({
  background: '#060606',
  position: 'relative',
  paddingTop: theme.spacing(12),
  minHeight: 450,
  [theme.breakpoints.up('xl')]: {
    paddingTop: theme.spacing(14),
  },
}));

const BannerTitle = styled('h1')(({ theme }) => ({
  ...theme.typography.h1,
  color: '#b8ff66',
  textAlign: 'center',
  margin: 0,
  lineHeight: 1.5,
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  borderRadius: 24,
  boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)',
  padding: theme.spacing(3, 2.5),
  width: 448,
  height: 192,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  [theme.breakpoints.down('xl')]: {
    height: 'auto',
    alignItems: 'center',
    paddingBottom: theme.spacing(2),
  },
}));

const FeatureIconBox = styled(Box)(({ theme }) => ({
  color: '#222',
  background: '#f6f6f6',
  borderRadius: '50%',
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(1),
}));

const FeatureTitle = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: 18,
  color: '#060606',
}));

const FeatureDesc = styled(Typography)(({ theme }) => ({
  color: '#6d6d6d',
  fontSize: 14,
  fontWeight: 400,
  lineHeight: 1.5,
  paddingBottom: theme.spacing(1),
  [theme.breakpoints.down('xl')]: {
    textAlign: 'center',
  },
}));

const FloatingCardsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  paddingBottom: theme.spacing(6),
  zIndex: 2,
  bottom: 0,
  [theme.breakpoints.up('xl')]: {
    position: 'absolute',
    bottom: '-145px',
  },
}));

const CardsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 448px)',
  gap: theme.spacing(6),
  justifyContent: 'center',
  width: 'auto',
  maxWidth: 'none',
  margin: '0 auto',
  [theme.breakpoints.down('xl')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(4),
    width: '100%',
  },
  '@media (max-width: 500px)': {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(8),
    padding: theme.spacing(3),
    '& > *': {
      width: '100%',
    },
  },
}));

export default function FeaturesBanner() {
  return (
    <>
      <BannerSection>
        <Container maxWidth="xl">
          <BannerTitle>Your 24/7 Phone Assistant -</BannerTitle>
          <BannerTitle>Let Us Answer While You Get the Job Done</BannerTitle>
        </Container>
        <FloatingCardsWrapper>
          <CardsGrid>
            <FeatureCard>
              <FeatureIconBox>
                <CallIcon />
              </FeatureIconBox>
              <FeatureTitle>Never Miss Customer Calls</FeatureTitle>
              <FeatureDesc>
                Dispatch AI ensures you never miss a potential customer call,
                capturing every opportunity.
              </FeatureDesc>
            </FeatureCard>
            <FeatureCard>
              <FeatureIconBox>
                <PaperworkIcon />
              </FeatureIconBox>
              <FeatureTitle>Auto-Handle Paperwork</FeatureTitle>
              <FeatureDesc>
                Automate your paperwork with Dispatch AI, saving time and
                reducing administrative burdens.
              </FeatureDesc>
            </FeatureCard>
            <FeatureCard>
              <FeatureIconBox>
                <SleepIcon />
              </FeatureIconBox>
              <FeatureTitle>Works While You Sleep</FeatureTitle>
              <FeatureDesc>
                Dispatch AI works around the clock, ensuring your business is
                always responsive, even while you rest.
              </FeatureDesc>
            </FeatureCard>
          </CardsGrid>
        </FloatingCardsWrapper>
      </BannerSection>
    </>
  );
}
