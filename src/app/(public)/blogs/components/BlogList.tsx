'use client';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, Grid, Snackbar, styled, Typography } from '@mui/material';
import axios from 'axios';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import theme from '@/theme';
import type { Blog } from '@/types/blog';

import BlogCard from './BlogCard';

const NextButton = styled(Button)(() => ({
  background: '#111',
  color: '#fff',
  fontWeight: 700,
  borderRadius: 8,
  boxShadow: 'none',
  width: 114,
  height: 48,
  margin: '10px 10px 120px',
  textTransform: 'none',
  '&:hover': { background: '#222', boxShadow: 'none' },
  [theme.breakpoints.down('md')]: {
    margin: '20px 10px 50px',
    borderRadius: 16,
    fontSize: '16px',
  },
}));

export default function BlogList() {
  const searchParams = useSearchParams();
  const router: AppRouterInstance = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [, setTotal] = useState(0);
  const [open, setOpen] = useState(false);

  const keyword = searchParams.get('keyword') ?? '';
  const topic = searchParams.get('topic') ?? '';
  const limit = 9;
  const page = Number(searchParams.get('page') ?? '1');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const params = new URLSearchParams({
          limit: String(limit),
          page: String(page),
        });
        if (keyword.trim()) params.set('keyword', keyword.trim());
        if (topic.trim()) params.set('topic', topic.trim());

        const baseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000/api';
        const url = `${baseUrl}/blogs/search?${params.toString()}`;

        const res = await axios.get<{
          data: Blog[];
          total: number;
          page: number;
          limit: number;
        }>(url);
        const fetched = [...res.data.data];

        setBlogs(fetched);
        setTotal(res.data.total);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch blogs:', err);
      }
    };
    void fetchBlogs();
  }, [keyword, topic, page]);

  const handleNextPage = async () => {
    try {
      const nextParams = new URLSearchParams({
        limit: String(limit),
        page: String(page + 1),
      });
      if (keyword.trim()) nextParams.set('keyword', keyword.trim());
      if (topic.trim()) nextParams.set('topic', topic.trim());

      const baseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000/api';
      const checkUrl = `${baseUrl}/blogs/search?${nextParams.toString()}`;

      const res = await axios.get<{ data: Blog[] }>(checkUrl);

      if (!res.data.data || res.data.data.length === 0) {
        setOpen(true);
        return;
      }

      router.replace(`/blogs?${nextParams.toString()}#anchor`, {
        scroll: true,
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('check next page failed', e);
    }
  };

  const handlePrevPage = () => {
    const prevParams = new URLSearchParams({
      limit: String(limit),
      page: String(page - 1),
    });
    if (keyword.trim()) prevParams.set('keyword', keyword.trim());
    if (topic.trim()) prevParams.set('topic', topic.trim());

    router.replace(`/blogs?${prevParams.toString()}#anchor`, {
      scroll: true,
    });
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hash === '#anchor') {
      const el = document.getElementById('anchor');
      if (el) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        });
      }
    }
  }, [blogs]);

  return (
    <>
      <Box
        sx={{
          minHeight: { xs: '70vh', md: '65vh' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        {blogs.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="text.secondary"
              sx={{ mt: 20 }}
              gutterBottom
            >
              No results found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 20 }}>
              We could not find any blogs matching <strong>{keyword}</strong>
            </Typography>
          </Box>
        ) : (
          <Grid
            container
            spacing={{ xs: 2, sm: 4 }}
            justifyContent="flex-start"
            alignItems="stretch"
            sx={{ mb: { sm: 2, md: 6 }, mt: 1 }}
          >
            {blogs.map(blog => (
              <Grid item xs={12} sm={6} md={4} key={blog._id}>
                <BlogCard {...blog} imageUrl={blog.imageUrl} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {page > 1 && <NextButton onClick={handlePrevPage}>Back ←</NextButton>}
        {blogs.length === limit && (
          <NextButton
            onClick={() => {
              void handleNextPage();
            }}
          >
            Next
            <ArrowForwardIcon
              sx={{ width: '20px', height: '18px', marginLeft: '6px' }}
            />
          </NextButton>
        )}
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="No more results available."
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        ContentProps={{
          sx: {
            backgroundColor: 'red',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1rem',
          },
        }}
      />
    </>
  );
}
