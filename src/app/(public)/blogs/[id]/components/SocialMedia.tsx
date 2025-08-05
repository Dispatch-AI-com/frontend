'use client';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
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
    justifyContent: 'flex-end', // 移动端靠右对齐
    gap: theme.spacing(0.5), // 缩小间距
    width: '100%', // 占满宽度以便靠右
  },
}));

const StyledLabelWrapper = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
    paddingBottom: 0,
    display: 'none', // 移动端隐藏文字
  },
}));

const StyledIconRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(0.5), // 缩小图标间距
    justifyContent: 'flex-end', // 图标靠右
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.black,
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0.75), // 增加内边距
    width: 44, // 增大宽度
    height: 44, // 增大高度
    '& .MuiSvgIcon-root': {
      fontSize: 22, // 增大图标大小
      width: 22,
      height: 22,
    },
    '& img': {
      width: 22, // 增大图片大小
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

// 自定义X图标组件，确保与其他图标大小一致
const XIcon = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 22,
  height: 22,
});

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
          <XIcon>
            <Image src="/icons/xlogo.svg" alt="X" width={22} height={22} />
          </XIcon>
        </StyledIconButton>
      </StyledIconRow>
    </SocialContainer>
  );
};

export default SocialMedia;
