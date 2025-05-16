// /blogs/detail-blog/components/VideoSection.tsx
'use client';

import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const VideoContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  position: 'relative',
  width: '100%', 
  height: 0,
  paddingBottom: '56.25%', // 16:9 aspect ratio
}));

const VideoPaper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f0f0f0',
}));

const VideoSection = () => {
  return (
    <VideoContainer>
      {/* Video placeholder - Replace with your actual video component */}
      <VideoPaper>
        <Typography variant="body1">Video Placeholder</Typography>
        {/* Actual video component will go here */}
        {/* 
        <video 
          controls 
          width="100%" 
          height="100%" 
          poster="/images/video-poster.jpg"
        >
          <source src="/videos/lucy-demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> 
        */}
      </VideoPaper>
    </VideoContainer>
  );
};

export default VideoSection;