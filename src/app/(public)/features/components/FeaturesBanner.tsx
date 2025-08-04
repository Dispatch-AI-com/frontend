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
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(16),
  minHeight: 380,
  [theme.breakpoints.up('lg')]: {
    paddingTop: theme.spacing(12),
    minHeight: 350,
  },
  [theme.breakpoints.between('md', 'lg')]: {
    minHeight: 650,
    paddingBottom: theme.spacing(0),
  },
  [theme.breakpoints.down('md')]: {
    minHeight: 'auto',
    paddingBottom: theme.spacing(4),
  },
}));

const BannerTitle = styled('h1')(({ theme }) => ({
  ...theme.typography.h1,
  color: '#b8ff66',
  textAlign: 'center',
  margin: 0,
  lineHeight: 1,
  position: 'relative',
  zIndex: 10,
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  borderRadius: 24,
  boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)',
  padding: theme.spacing(2.5),
  width: 380,
  minHeight: 120,
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('lg')]: {
    width: 360,
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    maxWidth: 380,
    alignItems: 'flex-start',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    maxWidth: '100%',
    alignItems: 'flex-start',
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
  marginBottom: theme.spacing(0.5),
  [theme.breakpoints.down('md')]: {
    alignSelf: 'flex-start',
  },
}));

const FeatureTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 18,
  color: '#060606',
  paddingBottom: 2,
  [theme.breakpoints.down('md')]: {
    textAlign: 'left',
  },
}));

const FeatureDesc = styled(Typography)(({ theme }) => ({
  color: '#6d6d6d',
  fontSize: 14,
  fontWeight: 400,
  lineHeight: 1.5,
  paddingBottom: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    textAlign: 'left',
  },
}));

const FloatingCardsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  zIndex: 2,
  overflow: 'visible',
  position: 'absolute',
  left: 0,
  right: 0,
  top: theme.spacing(32),
  transform: 'none',
  [theme.breakpoints.between('md', 'lg')]: {
    bottom: theme.spacing(8),
    minHeight: '320px',
  },
  [theme.breakpoints.down('md')]: {
    position: 'static', // Change to static positioning for 899px and narrower
    marginTop: theme.spacing(2),
    minHeight: 'auto',
  },
}));

const CardsGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: theme.spacing(4),
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto',
  padding: theme.spacing(0, 2),
  [theme.breakpoints.up('lg')]: {
    flexWrap: 'nowrap',
    gap: theme.spacing(6),
    maxWidth: '1400px',
    padding: theme.spacing(0, 3),
  },
  [theme.breakpoints.between('md', 'lg')]: {
    alignContent: 'flex-start',
    '& > :nth-of-type(1), & > :nth-of-type(2)': {
      flexBasis: 'calc(50% - 16px)',
      maxWidth: '380px',
      minWidth: '350px',
    },
    '& > :nth-of-type(3)': {
      flexBasis: '100%',
      maxWidth: '380px',
      margin: '0 auto',
    },
  },
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '400px',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    padding: theme.spacing(0, 1),
    gap: theme.spacing(2),
  },
}));

export default function FeaturesBanner() {
  return (
    <>
      <BannerSection>
        <Container maxWidth="xl">
          <BannerTitle
            sx={{
              display: { xs: 'none', sm: 'none', md: 'block' },
            }}
          >
            Your 24/7 Phone Assistant -
          </BannerTitle>
          <BannerTitle
            sx={{
              display: { xs: 'none', sm: 'none', md: 'block' },
            }}
          >
            Let Us Answer While You Get the Job Done
          </BannerTitle>

          {/* 4-line title for devices 375px and narrower */}
          <BannerTitle
            sx={{
              display: { xs: 'block', sm: 'block', md: 'none' },
              fontSize: '1.6rem',
              lineHeight: 1.1,
              mb: 0.5,
              whiteSpace: 'nowrap',
            }}
          >
            Your 24/7 Phone Assistant
          </BannerTitle>
          <BannerTitle
            sx={{
              display: { xs: 'block', sm: 'block', md: 'none' },
              fontSize: '1.6rem',
              lineHeight: 1.1,
              mb: 0.5,
              whiteSpace: 'nowrap',
            }}
          >
            -
          </BannerTitle>
          <BannerTitle
            sx={{
              display: { xs: 'block', sm: 'block', md: 'none' },
              fontSize: '1.6rem',
              lineHeight: 1.1,
              mb: 0.5,
              whiteSpace: 'nowrap',
            }}
          >
            Let Us Answer While You
          </BannerTitle>
          <BannerTitle
            sx={{
              display: { xs: 'block', sm: 'block', md: 'none' },
              fontSize: '1.6rem',
              lineHeight: 1.1,
              mb: 0.5,
              whiteSpace: 'nowrap',
            }}
          >
            Get the Job Done
          </BannerTitle>
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
