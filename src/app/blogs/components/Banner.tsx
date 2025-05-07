"use client";
import { Box, styled, Typography } from '@mui/material';

const BannerWrapper = styled(Box)(() => ({
  width: '100%',
  minWidth: '1200px',
  maxWidth: '1920px',
  height: 460,
  margin: '0 auto 120px auto',
  padding: '0 0 100px 0',
  backgroundColor: '#060606',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
}));

const Title = styled(Typography)(() => ({
  color: '#A7FF9B',
  fontWeight: 700,
  fontSize: 48,
  marginBottom: 24,
}));

const Subtitle = styled(Typography)(() => ({
  color: '#fff',
  opacity: 0.8,
  fontSize: 14,
  maxWidth: 650,
  textAlign: 'center',
  lineHeight: 1.7,
}));

export default function Banner() {
  return (
    <BannerWrapper>
      <Title>
        Blogs and Insights
      </Title>
      <Subtitle>
        Discover the latest news, insights and strategies from conversational AI experts. Learn how voice AI assistants are transforming customer engagement, get tips to elevate your CX, identify opportunities within your business for automation, and more. Stay in the know.
      </Subtitle>
    </BannerWrapper>
  );
}
