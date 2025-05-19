'use client';

import { Avatar, Box, Button, Card, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const items = [
  { 
    title: 'Lucy March Update',
    content: (
      <Box>
        <Typography variant="h6" fontWeight="bold" color="primary">
          Enhanced FAQs
        </Typography>
        <Typography variant="body2" mt={1}>
          Get Call Notifications Your Way
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }}>
          Learn More
        </Button>
      </Box>
    ),
    bg: '#a18cd1' 
  },
  { 
    title: 'Lucy Now Speaks More Languages',
    content: (
      <Box sx={{ textAlign: 'center' }}>
        <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2 }}>🌐</Avatar>
        <Typography variant="subtitle1" fontStyle="italic">
          Why limit your customer experience?
        </Typography>
      </Box>
    ),
    bg: '#ffffff' 
  },
  { 
    title: 'Exciting Deals Await!',
    content: (
      <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
        <Typography variant="h5" fontWeight="bold" sx={{ flexGrow: 1 }}>
          Discover exclusive offers!
        </Typography>
        <Box sx={{ backgroundColor: 'rgba(0,0,0,0.1)', p: 1, borderRadius: 2 }}>
          <Typography variant="caption">Limited time only</Typography>
        </Box>
      </Box>
    ),
    bg: '#fbc2eb' 
  },
];

export default function BlogHighlightCard() {
  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCenterIndex((prev) => (prev + 1) % items.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      height: '300px',
      width: '100%',
      my: 6,
      overflow: 'hidden' // 防止卡片溢出容器
    }}>
      {items.map((item, index) => {
        const isCenter = index === centerIndex;
        const isLeft = index === (centerIndex - 1 + items.length) % items.length;
        const isRight = index === (centerIndex + 1) % items.length;

        const cardWidth = 741.6;
        const cardHeight = 238.5;
        const offset = 280; // 增大间距值（原为250）
        const sideCardScale = 0.75; // 缩小侧边卡片的缩放比例（原为0.75）

        return (
          <Card
            key={index}
            sx={{
              width: cardWidth,
              height: cardHeight,
              p: 3,
              borderRadius: 3,
              boxShadow: 3,
              backgroundColor: item.bg,
              position: 'absolute',
              left: `calc(50% - ${cardWidth/2}px ${isLeft ? `- ${offset}px` : isRight ? `+ ${offset}px` : ''})`,
              top: `calc(50% - ${cardHeight/2}px)`,
              transform: isCenter ? 'scale(1)' : `scale(${sideCardScale})`,
              zIndex: isCenter ? 3 : 1,
              opacity: isCenter ? 1 : 0.7, // 提高侧边卡片透明度
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