'use client';
import { Box, Button, Grid, styled, Typography } from '@mui/material';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { Blog } from '../../../types/blog';
import BlogCard from './BlogCard';

const NextButton = styled(Button)(() => ({
  background: '#111',
  color: '#fff',
  fontWeight: 700,
  borderRadius: 8,
  boxShadow: 'none',
  width: '114px',
  height: '48px',
  marginTop: '40px',
  marginBottom: '72px',
  textTransform: 'none',
  '&:hover': {
    background: '#222',
    boxShadow: 'none',
  },
}));

export default function BlogList() {
  const searchParams = useSearchParams();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const keyword = searchParams.get('keyword') ?? '';
  const topic = searchParams.get('topic') ?? '';
  const limit = 12;
  const page = 1;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const params = new URLSearchParams({
          limit: String(limit),
          page: String(page),
        });

        if (keyword.trim() !== '') {
          params.set('keyword', keyword);
        }

        if (topic.trim() !== '') {
          params.set('topic', topic);
        }

        const url = `http://localhost:4000/api/blogs/search?${params.toString()}`;

        const res = await axios.get<{
          data: Blog[];
          total: number;
          page: number;
          limit: number;
        }>(url);

        const fetched = res.data.data;

        if (!keyword && !topic) {
          if (fetched.length > 0 && fetched.length < 9) {
            const base = fetched[0];
            while (fetched.length < 9) {
              fetched.push({
                ...base,
                _id: `${String(base._id)}-dup${String(fetched.length)}`,
              });
            }
          }
        }

        setBlogs(fetched);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch blogs:', err);
      }
    };

    void fetchBlogs();
  }, [keyword, topic, page]);

  return (
    <>
      {blogs.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            color="text.secondary"
            gutterBottom
          >
            😕 No results found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            We could not find any blogs matching <strong>{keyword}</strong>
          </Typography>
        </Box>
      ) : (
        <Grid
          container
          spacing={4}
          justifyContent="flex-start"
          alignItems="stretch"
          sx={{ mb: 6, mt: 1 }}
        >
          {blogs.map(blog => (
            <Grid item xs={12} sm={6} md={4} key={blog._id}>
              <BlogCard {...blog} />
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <NextButton>Next →</NextButton>
      </Box>
    </>
  );
}
