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

const SectionTitle = styled(Typography)(() => ({
  fontWeight: 600,
  margin: 0,
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
  marginBottom: theme.spacing(2),
}));

const MetaInfo = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
  // fontStyle: 'italic',

  display: 'block',
  marginLeft: 'auto',
  width: 'fit-content',
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
            {blog.avatarUrl && (
              <Box
                component="img"
                src={blog.avatarUrl}
                alt={blog.title}
                sx={{
                  width: '13%',
                  height: 'auto',
                  marginBottom: theme => theme.spacing(3),
                }}
              />
            )}
            <MetaInfo variant="caption">
              {new Date(blog.date).toLocaleDateString()}
            </MetaInfo>
          </HeaderContainer>

          {blog.imageUrl && (
            <Box
              component="img"
              src={blog.imageUrl}
              alt={blog.title}
              sx={{
                width: '100%',
                height: 'auto',
                marginBottom: theme => theme.spacing(3),
              }}
            />
          )}

          <Paragraph
            component="div"
            variant="body1"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {blog.videoEmbedUrl && (
            <Box mb={4} sx={{ position: 'relative', pt: '56.25%' /* 16:9 */ }}>
              <iframe
                src={blog.videoEmbedUrl}
                title="Video"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0,
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
          )}
        </LeftContainer>
        <Box
          sx={{
            flexShrink: 0,
            display: {
              xs: 'none',
              md: 'block',
            },
          }}
        >
          <SocialMedia />
        </Box>
      </IntroWrapper>
    </SectionContainer>
  );
}
