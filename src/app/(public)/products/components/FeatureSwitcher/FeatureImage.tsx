'use client';

import { Box, styled } from '@mui/material';
import Image from 'next/image';

import type { FeatureItem } from './FeatureList';

interface FeatureImageProps {
  items: FeatureItem[];
  activeIndex: number;
}

const ImageContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  paddingTop: '75%', // 4:3 aspect ratio placeholder
});

export default function FeatureImage({
  items,
  activeIndex,
}: FeatureImageProps) {
  return (
    <ImageContainer>
      {items.map((item, idx) => (
        <Box
          key={item.key}
          sx={{
            display: idx === activeIndex ? 'block' : 'none',
            position: 'absolute',
            inset: 0,
          }}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 900px) 100vw, 600px"
            priority={idx === activeIndex}
          />
        </Box>
      ))}
    </ImageContainer>
  );
}
