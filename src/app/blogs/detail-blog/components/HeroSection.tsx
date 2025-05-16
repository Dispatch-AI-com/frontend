// /blogs/detail-blog/components/HeroSection.tsx
'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

// Styled components
const GradientPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(4),
  background: 'linear-gradient(135deg, #a374ff 0%, #ff74a4 100%)',
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const TextSection = styled(Box)(({ theme }) => ({
  flex: '0 0 58%',
  padding: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    flex: '1 0 auto',
  },
}));

const ImageSection = styled(Box)(({ theme }) => ({
  flex: '0 0 42%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    flex: '1 0 auto',
    marginTop: theme.spacing(2),
  },
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontWeight: 700,
  fontSize: '3.5rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
  },
}));

const SubtitleBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: 'rgba(67, 33, 122, 0.8)',
  borderRadius: theme.spacing(1),
}));

const PhoneImageContainer = styled(Box)(() => ({
  position: 'relative',
  width: 220,
  height: 400,
}));

const HeroSection = () => {
  return (
    <GradientPaper elevation={3}>
      <ContentContainer>
        <TextSection>
          <HeroTitle>
            LUCY MARCH UPDATE
          </HeroTitle>
          <SubtitleBox>
            <Typography variant="h6" sx={{ color: 'white' }}>
              Enhanced FAQs & Get Call Notifications Your Way
            </Typography>
          </SubtitleBox>
        </TextSection>
        <ImageSection>
          <PhoneImageContainer>
            {/* Phone Image Placeholder - Replace with your actual image component */}
            {/* <Image 
              src="/images/phone-notification.png" 
              alt="Phone with Lucy notifications" 
              layout="fill" 
              objectFit="contain" 
            /> */}
          </PhoneImageContainer>
        </ImageSection>
      </ContentContainer>
    </GradientPaper>
  );
};

export default HeroSection;