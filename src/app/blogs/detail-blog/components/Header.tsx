// /blogs/detail-blog/components/Header.tsx
'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { styled } from '@mui/material/styles';

// Styled components
const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

const TitleRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(2),
  },
}));

const SocialContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
}));

const AuthorRow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const AuthorAvatar = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(2),
  borderRadius: '50%',
  overflow: 'hidden',
  width: 40,
  height: 40,
  backgroundColor: '#ccc',
}));

const DateText = styled(Typography)(({ theme }) => ({
  marginLeft: 'auto',
  color: theme.palette.text.secondary,
}));

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [shareType, setShareType] = useState<string | null>(null);

  // Handle social sharing clicks
  const handleShare = (platform: string) => {
    setShareType(platform);
    
    const url = window.location.href;
    const title = "New Lucy Features Update: Enhanced FAQs & Get Call Notifications Your Way";
    
    let shareUrl = '';
    
    switch(platform) {
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
    <HeaderContainer>
      <TitleRow>
        <PageTitle variant="h4">
          New Lucy Features Update: Enhanced FAQs & Get Call Notifications Your Way
        </PageTitle>
        
        <SocialContainer>
          <Typography variant="subtitle2" sx={{ mr: 1 }}>Social Sharing</Typography>
          <StyledIconButton onClick={() => handleShare('linkedin')}>
            <LinkedInIcon />
          </StyledIconButton>
          <StyledIconButton onClick={() => handleShare('facebook')}>
            <FacebookIcon />
          </StyledIconButton>
          <StyledIconButton onClick={() => handleShare('twitter')}>
            <TwitterIcon />
          </StyledIconButton>
        </SocialContainer>
      </TitleRow>
      
      <AuthorRow>
        <AuthorAvatar />
        <Typography variant="subtitle1">Jone</Typography>
        <DateText variant="body2">2025/03/28</DateText>
      </AuthorRow>
    </HeaderContainer>
  );
};

export default Header;