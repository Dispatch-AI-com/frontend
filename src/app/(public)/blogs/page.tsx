'use client';

import { Box, Container } from '@mui/material';
import axios from 'axios';
import { Suspense, useEffect, useState } from 'react';

import theme from '@/theme';
import type { Blog } from '@/types/blog';
import { getApiBaseUrl } from '@/utils/api-config';

import Banner from './components/Banner';
import BlogFilterBar from './components/BlogFilterBar';
import BlogHighlightCard from './components/BlogHighlightCard';
import BlogList from './components/BlogList';
import SubscriptionSection from './components/SubscriptionSection';

export default function BlogsPage() {
  const [highlightBlogs, setHighlightBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchHighlightBlogs = async () => {
      try {
        const baseUrl = getApiBaseUrl();

        const res = await axios.get<Blog[]>(`${baseUrl}/blogs/highlights`, {
          params: { limit: 3 },
          signal: abortController.signal,
        });

        setHighlightBlogs(res.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          // eslint-disable-next-line no-console
          console.error('Failed to fetch highlight blogs:', error);
        }
      }
    };

    void fetchHighlightBlogs();

    return () => abortController.abort();
  }, []);
  return (
    <>
      <Box>
        <Banner />
        <Container
          sx={{
            width: '80%',
            [theme.breakpoints.down('sm')]: {
              width: '95%',
            },
          }}
        >
          <BlogHighlightCard blogs={highlightBlogs} />
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
