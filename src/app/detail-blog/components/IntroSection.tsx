// /blogs/detail-blog/components/IntroSection.tsx
'use client';

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

// Styled components
const SectionContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
}));

const Paragraph = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const Emoji = styled('span')(() => ({
  display: 'inline-block',
}));

const IntroSection = () => {
  return (
    <SectionContainer>
      <SectionTitle variant="h6">We&#39;re making Lucy even more efficient</SectionTitle>
      
      <Paragraph variant="body1">
        As you know, we&#39;re always working to make Lucy our AI phone answering experience even better. 
        And today, we have two powerful updates that will save you time, improve efficiency, and give 
        you even more control over your call experience.
      </Paragraph>
      
      <Paragraph variant="body1">
        But first, a quick milestone worth celebrating—last month, Lucy processed 650,000 phone calls! 
        <Emoji> 🎉</Emoji> This wouldn&#39;t be possible without you, so thank you for trusting Lucy to 
        handle your calls and support your business.
      </Paragraph>
      
      <Paragraph variant="body1">
        Now, let&#39;s dive into what&#39;s new:
      </Paragraph>
    </SectionContainer>
  );
};

export default IntroSection;