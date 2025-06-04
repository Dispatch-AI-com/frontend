'use client';

import { Box } from '@mui/material';
import React from 'react';

import {
  AboutHeader,
  HeaderContainer,
  HeaderImage,
  HeaderText,
  HeaderTitle,
} from '@/app/about/components/AboutBanner';

const AboutBannerSection = () => {
  return (
    <AboutHeader>
      <HeaderContainer>
        <HeaderImage src="/voice-ai.png" alt="Voice AI" />
        <Box>
          <HeaderTitle>
            Building the future of <br /> Voice AI
          </HeaderTitle>
          <HeaderText>
            Transforming human-machine interaction through advanced voice
            technology.
          </HeaderText>
        </Box>
      </HeaderContainer>
    </AboutHeader>
  );
};

export default AboutBannerSection;
