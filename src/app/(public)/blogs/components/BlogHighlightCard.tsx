'use client';

import { Box, Card, Typography } from '@mui/material';
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
            }}
          >
            {/* 博客图片 */}
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
              }}
            >
              {blog.imageUrl && (
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              )}

              {/* 中间卡片的内容覆盖层 */}
              {isCenter && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                    color: 'white',
                    padding: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {blog.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.875rem',
                      opacity: 0.9,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {blog.summary}
                  </Typography>
                </Box>
              )}
            </Box>
          </Card>
        );
      })}
    </Box>
  );
}
