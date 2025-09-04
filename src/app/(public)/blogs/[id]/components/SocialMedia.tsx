'use client';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import { Box, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

// Styled components
const SocialContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: theme.spacing(0.5),
    width: '100%',
  },
}));

const StyledLabelWrapper = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
    paddingBottom: 0,
    display: 'none',
  },
}));

const StyledIconRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),

  '& > :nth-of-type(-n+2)': {
    borderRadius: 8,
    padding: theme.spacing(0.5, 1),
    overflow: 'hidden',
  },
  '& > :nth-of-type(-n+2) .MuiTouchRipple-root': {
    borderRadius: 8,
  },

  '& > :nth-of-type(-n+2) .MuiSvgIcon-root': {
    borderRadius: 6,
    overflow: 'hidden',
  },

  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(0.5),
    justifyContent: 'flex-end',
    '& > :nth-of-type(-n+2)': {
      borderRadius: 8,
      padding: theme.spacing(0.8),
    },
    '& > :nth-of-type(-n+2) .MuiTouchRipple-root': {
      borderRadius: 8,
    },
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.black,
  padding: theme.spacing(0.5, 1),
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0.8),
    '& .MuiSvgIcon-root': {
      fontSize: 24,
      '& path': {
        transform: 'scale(1.3)',
        transformOrigin: 'center',
      },
    },
    '& img': {
      width: 22,
      height: 22,
    },
  },
}));

const SocialLabel = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    fontSize: '0.875rem',
    fontWeight: 500,
  },
}));

const SocialMedia = () => {
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title =
      'New Lucy Features Update: Enhanced FAQs & Get Call Notifications Your Way';

    let shareUrl = '';

    switch (platform) {
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <SocialContainer>
      <StyledLabelWrapper>
        <SocialLabel variant="subtitle2">Social Sharing</SocialLabel>
      </StyledLabelWrapper>
      <StyledIconRow>
        <StyledIconButton
          onClick={() => {
            handleShare('linkedin');
          }}
        >
          <LinkedInIcon />
        </StyledIconButton>
        <StyledIconButton
          onClick={() => {
            handleShare('facebook');
          }}
        >
          <FacebookIcon />
        </StyledIconButton>
        <StyledIconButton
          onClick={() => {
            handleShare('twitter');
          }}
        >
          <XIcon />
        </StyledIconButton>
      </StyledIconRow>
    </SocialContainer>
  );
};

export default SocialMedia;
