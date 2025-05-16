// /blogs/detail-blog/components/FaqSection.tsx
'use client';

import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { styled } from '@mui/material/styles';

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

const StyledList = styled(List)(({ theme }) => ({
  padding: 0,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const CheckListItem = styled(ListItem)(() => ({
  padding: '4px 0',
}));

const StyledListItemIcon = styled(ListItemIcon)(() => ({
  minWidth: 36,
}));

const HowItHelps = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const Pointer = styled('span')(() => ({
  display: 'inline-block',
}));

const FaqSection = () => {
  return (
    <SectionContainer>
      <SectionTitle variant="h6">Enhanced FAQs, Load Larger Documents & Webpages</SectionTitle>
      
      <Paragraph variant="body1">
        Manually copying and pasting FAQs is a thing of the past. Lucy can now handle much larger 
        FAQ documents and even pull information directly from your website so you can set up 
        smarter responses with minimal effort.
      </Paragraph>
      
      <StyledList>
        <CheckListItem>
          <StyledListItemIcon>
            <CheckCircleOutlineIcon color="primary" />
          </StyledListItemIcon>
          <ListItemText primary="Upload significantly larger FAQ documents" />
        </CheckListItem>
        
        <CheckListItem>
          <StyledListItemIcon>
            <CheckCircleOutlineIcon color="primary" />
          </StyledListItemIcon>
          <ListItemText primary="Import FAQs from a webpage—just paste the link, and Lucy pulls in the details" />
        </CheckListItem>
        
        <CheckListItem>
          <StyledListItemIcon>
            <CheckCircleOutlineIcon color="primary" />
          </StyledListItemIcon>
          <ListItemText primary="Easier manual entry—copy and paste everything into a single document and upload it" />
        </CheckListItem>
      </StyledList>
      
      <HowItHelps variant="body1">
        <Pointer>👉</Pointer> How it helps: Instead of spending time manually inputting FAQ responses, 
        just upload or link to your existing FAQ content, and Lucy will do the rest, ensuring customers 
        get quick and accurate answers every time.
      </HowItHelps>
    </SectionContainer>
  );
};

export default FaqSection;