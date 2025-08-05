// src/app/blogs/[id]/components/IntroSection.tsx
'use client';

import type { TypographyProps } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

import type { Blog } from '@/types/blog';

import SocialMedia from './SocialMedia';

const SectionContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1100px',
  margin: '0 auto',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  margin: 0,
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(2),
  },
}));

const Paragraph = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const IntroWrapper = styled(Box)(({ theme }) => ({
  display: 'block',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: theme.spacing(4),
  },
}));

const LeftContainer = styled(Box)(() => ({}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  marginTop: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

const AuthorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    minHeight: '60px',
  },
  [theme.breakpoints.up('md')]: {
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(2),
    minHeight: '80px',
  },
}));

const AvatarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
    flexShrink: 0,
  },
  [theme.breakpoints.up('md')]: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
  },
}));

const AvatarImage = styled('img')(({ theme }) => ({
  width: '20%',
  height: 'auto',
  paddingTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'center',
    paddingTop: 0,
    marginBottom: 0,
    display: 'block',
  },
  [theme.breakpoints.up('md')]: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'contain',
    objectPosition: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 0,
    marginBottom: 0,
    display: 'block',
  },
}));

const AuthorName = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  [theme.breakpoints.down('md')]: {
    fontSize: '0.8rem',
    fontWeight: 600,
    margin: 0,
    lineHeight: 1.2,
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.125rem',
    fontWeight: 600,
    margin: 0,
    lineHeight: 1.2,
  },
}));

const MetaInfo = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(2),
  display: 'block',
  marginLeft: 'auto',
  width: 'fit-content',
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
    marginTop: 0,
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    lineHeight: 1.2,
  },
}));

const MobileDateContainer = styled(Box)(({ theme }) => ({
  display: 'block',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(0.5),
  },
}));

const AuthorInfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    flex: 1,
    minHeight: '60px',
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    flex: 1,
    minHeight: '80px',
    justifyContent: 'center',
  },
}));

const MobileSocialContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
  [theme.breakpoints.down('md')]: {
    marginTop: 0,
    marginBottom: 0,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    minHeight: '60px',
  },
}));

const DesktopDateContainer = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

const BlogImageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
}));

const BlogImage = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: 'inherit',
});

const VideoContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  position: 'relative',
  paddingTop: '56.25%',
}));

const VideoIframe = styled('iframe')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  border: 0,
});

const DesktopSocialContainer = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

interface IntroSectionProps {
  blog: Blog;
}

export default function IntroSection({ blog }: IntroSectionProps) {
  return (
    <SectionContainer>
      <IntroWrapper>
        <LeftContainer>
          <SectionTitle variant="h4">{blog.title}</SectionTitle>
          <HeaderContainer>
            <AuthorContainer>
              {blog.avatarUrl && (
                <AvatarContainer>
                  <AvatarImage src={blog.avatarUrl} alt={blog.title} />
                </AvatarContainer>
              )}
              <AuthorInfoContainer>
                <AuthorName>{blog.author}</AuthorName>
                <MobileDateContainer>
                  <MetaInfo variant="caption">
                    {new Date(blog.date).toLocaleDateString()}
                  </MetaInfo>
                </MobileDateContainer>
              </AuthorInfoContainer>
            </AuthorContainer>

            <DesktopDateContainer>
              <MetaInfo variant="caption">
                {new Date(blog.date).toLocaleDateString()}
              </MetaInfo>
            </DesktopDateContainer>

            <MobileSocialContainer>
              <SocialMedia />
            </MobileSocialContainer>
          </HeaderContainer>

          {blog.imageUrl && (
            <BlogImageContainer>
              <BlogImage src={blog.imageUrl} alt={blog.title} />
            </BlogImageContainer>
          )}

          <Paragraph
            component="div"
            variant="body1"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {blog.videoEmbedUrl && (
            <VideoContainer>
              <VideoIframe
                src={blog.videoEmbedUrl}
                title="Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </VideoContainer>
          )}
        </LeftContainer>
        <DesktopSocialContainer>
          <SocialMedia />
        </DesktopSocialContainer>
      </IntroWrapper>
    </SectionContainer>
  );
}
