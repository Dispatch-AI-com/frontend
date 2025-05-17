"use client"
import { Button, Grid , styled,Typography} from '@mui/material';
import axios from 'axios';
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

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/blogs?limit=12&page=1');
        const fetched = res.data.data;

        if (fetched.length > 0 && fetched.length < 9) {
          const base = fetched[0]; 
          while (fetched.length < 9) {
            fetched.push({ ...base, _id: `${base._id}-dup${fetched.length}` });
          }
        }
        setBlogs(fetched); 
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Grid container spacing={4} justifyContent="center" alignItems="stretch" sx={{ mb: 6, mt:1 }} >
      {loading ? (
        <Typography variant="body1">Loading...</Typography>
      ) : (
        blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <BlogCard {...blog} />
          </Grid>
        ))
      )}
      <NextButton>Next →</NextButton>
    </Grid>
  );
}
