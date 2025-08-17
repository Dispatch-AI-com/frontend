'use client';
import { Box, styled, Typography } from '@mui/material';

const BannerWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 400,
  margin: '0 auto',
  marginBottom: theme.spacing(10),
  backgroundColor: '#060606',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(0),
    paddingTop: 50,
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.h1,
  color: '#a8f574',
  textAlign: 'center',
  marginBottom: 24,
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  color: '#ffffff',
  maxWidth: 750,
  textAlign: 'center',
  lineHeight: 1.7,
  [theme.breakpoints.down('sm')]: {
    fontSize: 14,
    margin: '0 15px',
  },
}));

export default function Banner() {
  return (
    <BannerWrapper>
      <Title>Blogs and Insights</Title>
      <Subtitle>
        Discover the latest news, insights and strategies from conversational AI
        experts. Learn how voice AI assistants are transforming customer
        engagement, get tips to elevate your CX, identify opportunities within
        your business for automation, and more. Stay in the know.
      </Subtitle>
    </BannerWrapper>
  );
}
