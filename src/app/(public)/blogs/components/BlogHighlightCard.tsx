'use client';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, Card, Typography } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import type { Blog } from '@/types/blog';

interface BlogHighlightCardProps {
  blogs: Blog[];
}

export default function BlogHighlightCard({ blogs }: BlogHighlightCardProps) {
  const [centerIndex, setCenterIndex] = useState(0);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const displayBlogs = blogs.slice(0, 3);

  useEffect(() => {
    if (displayBlogs.length <= 1) return;

    const interval = setInterval(() => {
      setCenterIndex(prev => (prev + 1) % displayBlogs.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [displayBlogs.length]);

  const handleBlogClick = (id: string) => {
    router.push(`/blogs/${id}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        height: '300px',
        width: '100%',
        my: 6,
        overflow: 'visible',
      }}
    >
      {displayBlogs.map((blog, index) => {
        const isCenter = index === centerIndex;
        const isLeft =
          index ===
          (centerIndex - 1 + displayBlogs.length) % displayBlogs.length;
        const isRight = index === (centerIndex + 1) % displayBlogs.length;

        const cardWidth = isMobile ? 280 : isTablet ? 380 : 741.6;
        const cardHeight = isMobile ? 140 : isTablet ? 180 : 238.5;
        const offset = isMobile ? 100 : isTablet ? 130 : 280;
        const sideCardScale = isMobile ? 0.9 : 0.75;

        const offsetString = isLeft
          ? `- ${offset}px`
          : isRight
            ? `+ ${offset}px`
            : '';

        return (
          <Card
            key={blog._id}
            onClick={() => handleBlogClick(blog._id)}
            sx={{
              width: cardWidth,
              height: cardHeight,
              borderRadius: 3,
              boxShadow: 3,
              position: 'absolute',
              left: `calc(50% - ${cardWidth / 2}px ${offsetString})`,
              top: `calc(50% - ${cardHeight / 2}px)`,
              transform: isCenter ? 'scale(1)' : `scale(${sideCardScale})`,
              zIndex: isCenter ? 3 : 1,
              opacity: isCenter ? 1 : 0.7,
              transition: 'all 0.6s ease',
              cursor: 'pointer',
              overflow: 'hidden',
              '&:hover': {
                opacity: 1,
                zIndex: 4,
              },
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {/* 博客图片 - 左侧 */}
            <Box
              sx={{
                position: 'relative',
                width: '50%',
                height: '100%',
                minWidth: '50%',
                p: 2,
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: 2,
                  overflow: 'hidden',
                  backgroundColor: 'rgba(0,0,0,0.03)',
                }}
              >
                {blog.imageUrl && (
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      padding: 2,
                    }}
                  >
                    <Image
                      src={blog.imageUrl}
                      alt={blog.title}
                      fill
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        borderRadius: 2,
                      }}
                    />
                  </Box>
                )}
              </Box>
            </Box>

            {/* 中间卡片的内容区域 - 右侧 */}
            <Box
              sx={{
                flex: 1,
                py: 4,
                px: 1,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'background.paper',
                position: 'relative',
                minWidth: 0, // 防止内容撑大布局
                justifyContent: 'space-between',
              }}
            >
              <Box>
                {/* 标题 */}
                <Typography
                  sx={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'text.primary',
                    lineHeight: 1.3,
                    mb: 1,
                  }}
                >
                  {blog.title}
                </Typography>

                {/* 摘要 */}
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: 'text.secondary',
                    lineHeight: 1.5,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    mb: 3,
                  }}
                >
                  {blog.summary}
                </Typography>
              </Box>

              {/* Read More 按钮 */}
              <Button
                variant="text"
                endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                sx={{
                  fontWeight: 600,
                  padding: 0,
                  color: '#000',
                  textTransform: 'none',
                  alignSelf: 'flex-start',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    textDecoration: 'underline',
                  },
                }}
                onClick={e => {
                  e.stopPropagation();
                  handleBlogClick(blog._id);
                }}
              >
                Read More
              </Button>
            </Box>
          </Card>
        );
      })}
    </Box>
  );
}
