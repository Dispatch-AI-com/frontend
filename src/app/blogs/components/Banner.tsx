'use client';
import { Box, styled, Typography } from '@mui/material';

const BannerWrapper = styled(Box)(() => ({
  width: '100%',
  minWidth: '1200px',
  maxWidth: '1920px',
  height: 400,
  margin: '0 auto 80px auto',
  backgroundColor: '#060606',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
}));

const Title = styled(Typography)(() => ({
  color: '#a8f574',
  fontWeight: 700,
  fontSize: '48px',
  marginBottom: 24,
  textAlign: 'center',
  lineHeight: '76px',
}));

const Subtitle = styled(Typography)(() => ({
  color: '#ffffff',
  fontSize: '14px',
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
