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
  [theme.breakpoints.down('md')]: {
    flexDirection: 'row', // 保持水平布局
    alignItems: 'flex-start', // 顶部对齐
    gap: theme.spacing(1),
  },
}));

const AuthorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    marginTop: 0,
    flexDirection: 'row', // 移动端改为水平布局
    alignItems: 'center', // 居中对齐
    gap: theme.spacing(1.5), // 增加间距
    minHeight: '60px', // 确保容器高度
  },
}));

// 头像容器
const AvatarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#f5f5f5',
    // border: '1px',
    overflow: 'hidden', // 确保圆形边界
    flexShrink: 0,
  },
}));

const AvatarImage = styled('img')(({ theme }) => ({
  width: '20%',
  height: 'auto',
  paddingTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    width: '100%', // 占满容器
    height: '100%', // 占满容器
    objectFit: 'contain', // 确保完整显示，不会被裁剪
    objectPosition: 'center', // 居中显示
    paddingTop: 0,
    marginBottom: 0,
    display: 'block',
  },
}));

const AuthorName = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  [theme.breakpoints.down('md')]: {
    fontSize: '0.8rem', // 移动端稍微增大字体
    fontWeight: 600,
    margin: 0,
    lineHeight: 1.2, // 调整行高
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
    marginTop: theme.spacing(0.5), // 与名字的间距
    fontSize: '0.875rem', // 移动端字体大小
    color: theme.palette.text.secondary,
    lineHeight: 1.2, // 调整行高
  },
}));

// 新增：作者信息容器（头像右侧的文字部分）
const AuthorInfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    flex: 1, // 占据剩余空间
    minHeight: '60px', // 确保容器高度与头像一致
    justifyContent: 'center', // 垂直居中
  },
}));

// 修改：移动端社交媒体容器，与头像左右平行
const MobileSocialContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end', // 靠右对齐
  alignItems: 'center',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
  [theme.breakpoints.down('md')]: {
    marginTop: 0,
    marginBottom: 0,
    flex: 1, // 占据剩余空间
    justifyContent: 'flex-end', // 确保靠右
    alignItems: 'center', // 居中对齐
    minHeight: '60px', // 确保容器高度与头像一致
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
              {/* 作者信息容器 */}
              <AuthorInfoContainer>
                <AuthorName>{blog.author}</AuthorName>
                {/* 移动端日期显示在名字下面 */}
                <MetaInfo variant="caption">
                  {new Date(blog.date).toLocaleDateString()}
                </MetaInfo>
              </AuthorInfoContainer>
            </AuthorContainer>

            {/* 桌面端日期保持原位置 */}
            <Box
              sx={{
                display: {
                  xs: 'none',
                  md: 'block',
                },
              }}
            >
              <MetaInfo variant="caption">
                {new Date(blog.date).toLocaleDateString()}
              </MetaInfo>
            </Box>

            {/* 移动端社交媒体组件 - 与头像左右平行 */}
            <MobileSocialContainer>
              <SocialMedia />
            </MobileSocialContainer>
          </HeaderContainer>

          {blog.imageUrl && (
            <Box
              component="img"
              src={blog.imageUrl}
              alt={blog.title}
              sx={{
                width: '100%',
                height: 'auto',
                marginBottom: 3, // 使用数字而不是theme函数
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
        {/* 桌面端社交媒体组件 */}
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
