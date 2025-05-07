
"use client"

import { Box, Container } from '@mui/material';

import Banner from './components/Banner';
import BlogFilterBar from './components/BlogFilterBar';
import BlogHighlightCard from './components/BlogHighlightCard';
import BlogList from './components/BlogList';
import SubscriptionSection from './components/SubscriptionSection';

export default function BlogsPage() {
  return (
    <Container maxWidth="lg" sx={{ pt: 6, pb: 12 }}>
      <Banner />
      <Box mt={4} mb={4}>
        <BlogHighlightCard />
      </Box>
      <BlogFilterBar />
      <Box >
        <BlogList />
      </Box>
      <SubscriptionSection />
    </Container>
  );
}
