"use client"
import { Grid } from '@mui/material';

import BlogCard from './BlogCard';

const mockBlogs = Array.from({ length: 12 }).map((_, i) => ({
  title: `AI 如何提升运营效率 ${i + 1}`,
  summary: '探索 AI 在调度和运营中的实际应用，助力企业降本增效。',
  date: '2024-05-01',
  tag: 'AI',
}));

export default function BlogList() {
  return (
    <Grid container spacing={4} justifyContent="center" alignItems="stretch">
      {mockBlogs.map((blog, idx) => (
        <Grid item xs={12} sm={6} md={4} key={idx} >
          <BlogCard {...blog} />
        </Grid>
      ))}
    </Grid>
  );
}
