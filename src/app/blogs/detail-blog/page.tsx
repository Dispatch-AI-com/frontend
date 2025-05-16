'use client';

import React from 'react';
import { Box, Container } from '@mui/material';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import FaqSection from './components/FaqSection';
import VideoSection from './components/VideoSection';
import SocialMedia from './components/SocialMedia';

const BlogDetailPage = () => {
  return (
    <Container maxWidth="lg" sx={{ display:'flex', py: 4, gap: 10 }}>
      <Box >
        <Header />
        <HeroSection />
        <IntroSection />
        <FaqSection />
        <VideoSection />
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <SocialMedia />
      </Box>
    </Container>
    
  );
};

export default BlogDetailPage;