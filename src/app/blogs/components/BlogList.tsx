"use client"
import { Button, Grid , styled} from '@mui/material';

import BlogCard from './BlogCard';

const mockBlogs = Array.from({ length: 12 }).map(() => ({
  title: `Lucy Now Speaks More Languages- the product update you've been the product update you've …`,
  summary: 'Why limit your customer experience to just one language? When all the important people in your life...',
  date: '2024-05-01',
  tag: 'Small And Medium Businesses',
}));

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
  return (
    <Grid container spacing={4} justifyContent="center" alignItems="stretch" sx={{ mb: 6, mt:1 }} >
      {mockBlogs.map((blog, idx) => (
        <Grid item xs={12} sm={6} md={4} key={idx} >
          <BlogCard {...blog} />
        </Grid>
      ))}
      <NextButton>Next →</NextButton>
    </Grid>
  );
}
