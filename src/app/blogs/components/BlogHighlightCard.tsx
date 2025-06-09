'use client';

import { Box, Card } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const items = [
  {
    title: 'Automated Call Handling',
    content: (
      <Image
        src="/blog/call_handling.png"
        alt="call_handling"
        fill
        style={{ objectFit: 'fill', borderRadius: '24px' }}
      />
    ),
  },
  {
    title: 'Follow-Up Actions',
    content: (
      <Image
        src="/blog/follow_up.png"
        alt="follow_up"
        fill
        style={{ objectFit: 'fill', borderRadius: '24px' }}
      />
    ),
  },
  {
    title: 'Trusted by Small Businesses',
    content: (
      <Image
        src="/blog/testimonial.png"
        alt="testimonial"
        fill
        style={{ objectFit: 'fill', borderRadius: '24px' }}
      />
    ),
  },
];

export default function BlogHighlightCard() {
  const [centerIndex, setCenterIndex] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCenterIndex(prev => {
        return (prev + 1) % items.length;
      });
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
      {items.map((item, index) => {
        const isCenter = index === centerIndex;
        const isLeft =
          index === (centerIndex - 1 + items.length) % items.length;
        const isRight = index === (centerIndex + 1) % items.length;

        const cardWidth = isMobile ? 280 : isTablet ? 380 : 741.6;
        const cardHeight = isMobile ? 140 : isTablet ? 180 : 238.5;
        const offset = isMobile ? 100 : isTablet ? 130 : 280;
        const sideCardScale = isMobile ? 0.9 : 0.75;

        const offsetString = isLeft
          ? `- ${offset.toFixed(0)}px`
          : isRight
            ? `+ ${offset.toFixed(0)}px`
            : '';

        return (
          <Card
            key={index}
            sx={{
              width: cardWidth,
              height: cardHeight,
              borderRadius: 3,
              boxShadow: 3,
              position: 'absolute',
              left: `calc(50% - ${(cardWidth / 2).toFixed(1)}px ${offsetString})`,
              top: `calc(50% - ${(cardHeight / 2).toFixed(1)}px)`,
              transform: isCenter
                ? 'scale(1)'
                : `scale(${sideCardScale.toFixed(2)})`,
              zIndex: isCenter ? 3 : 1,
              opacity: isCenter ? 1 : 0.7,
              transition: 'all 0.6s ease',
            }}
          >
            {item.content}
          </Card>
        );
      })}
    </Box>
  );
}
