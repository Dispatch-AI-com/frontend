"use client"
import { Button, Grid , styled} from '@mui/material';

import BlogCard from './BlogCard';

const mockBlogs = Array.from({ length: 12 }).map((_, i) => ({
  title: `AI 如何提升运营效率 ${i + 1}`,
  summary: '探索 AI 在调度和运营中的实际应用，助力企业降本增效。',
  date: '2024-05-01',
  tag: 'AI',
}));

const NextButton = styled(Button)(() => ({
  background: '#111',
  color: '#fff',
  fontWeight: 700,
  borderRadius: 8,
  boxShadow: 'none',
  minWidth: 80,
  minheight: 36,
  margin: 24,
  textTransform: 'none',
  '&:hover': {
    background: '#222',
    boxShadow: 'none',
  },
}));


export default function BlogList() {
  return (
    <Grid container spacing={4} justifyContent="center" alignItems="stretch" sx={{ my: 6 }} >
      {mockBlogs.map((blog, idx) => (
        <Grid item xs={12} sm={6} md={4} key={idx} >
          <BlogCard {...blog} />
        </Grid>
      ))}
      <NextButton>Next →</NextButton>
    </Grid>
  );
}
