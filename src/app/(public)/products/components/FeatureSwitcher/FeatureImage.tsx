'use client';

import { Box, styled } from '@mui/material';
import Image from 'next/image';

import type { FeatureItem } from './FeatureList';

interface FeatureImageProps {
  items: FeatureItem[];
  activeIndex: number;
}

const Wrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  aspectRatio: '4 / 3',
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
}));

const Backdrop = styled(Box)({
  position: 'absolute',
  inset: 0,
  borderRadius: 'inherit',
});

const Inner = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: theme.spacing(3),
}));

export default function FeatureImage({
  items,
  activeIndex,
}: FeatureImageProps) {
  const { image, title, bg } = items[activeIndex];

  return (
    <Wrapper>
      <Backdrop sx={{ background: bg ?? '#f6f6f6' }} />

      <Inner>
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width:900px) 100vw, 600px"
          priority
        />
      </Inner>
    </Wrapper>
  );
}
