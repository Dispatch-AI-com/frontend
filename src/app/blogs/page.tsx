'use client';

import { Box, Container } from '@mui/material';
import { Suspense } from 'react';

import Banner from './components/Banner';
import BlogFilterBar from './components/BlogFilterBar';
import BlogHighlightCard from './components/BlogHighlightCard';
import BlogList from './components/BlogList';
import SubscriptionSection from './components/SubscriptionSection';

export default function BlogsPage() {
  return (
    <>
      <Box>
        <Banner />
        <Container
          sx={{
            width: '80%',
            mx: 'auto',
          }}
        >
          <BlogHighlightCard />
          <BlogFilterBar />
          <Suspense fallback={<p>Loading blogs...</p>}>
            <BlogList />
          </Suspense>
        </Container>
        <SubscriptionSection />
      </Box>
    </>
  );
}
