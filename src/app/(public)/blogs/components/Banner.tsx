'use client';
import { Box, styled, Typography } from '@mui/material';

const BannerWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1920px',
  height: 400,
  margin: '0 auto 80px auto',
  backgroundColor: '#060606',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  boxSizing: 'border-box',
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
  maxWidth: 650,
  textAlign: 'center',
  lineHeight: 1.7,
  opacity: 0.8,
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
