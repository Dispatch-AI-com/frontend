
"use client"

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Box, Container } from '@mui/material';

import Banner from './components/Banner';
import BlogFilterBar from './components/BlogFilterBar';
import BlogHighlightCard from './components/BlogHighlightCard';
import BlogList from './components/BlogList';
import SubscriptionSection from './components/SubscriptionSection';

export default function BlogsPage() {
  return (
    <>
        <Box>
            <Banner/>
            <Container>
                <BlogHighlightCard />
                <BlogFilterBar />
                <BlogList />
            </Container>
            <SubscriptionSection/>
        </Box>
    </>
  );
}
