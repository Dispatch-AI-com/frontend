'use client';

import React from 'react';
import { Container } from '@mui/material';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import FaqSection from './components/FaqSection';
import VideoSection from './components/VideoSection';

const BlogDetailPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Header />
      <HeroSection />
      <IntroSection />
      <FaqSection />
      <VideoSection />
    </Container>
  );
};

export default BlogDetailPage;