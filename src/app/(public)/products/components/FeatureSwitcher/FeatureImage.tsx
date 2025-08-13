'use client';

import { Box, styled, Typography } from '@mui/material';
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
  [theme.breakpoints.down('sm')]: {
    aspectRatio: '4 / 5',
  },
}));

const Backdrop = styled(Box)({
  position: 'absolute',
  inset: 0,
  borderRadius: 'inherit',
  zIndex: 0,
});

const Inner = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: theme.spacing(3),
  zIndex: 1,
  [theme.breakpoints.down('sm')]: {
    left: theme.spacing(1.5),
    right: theme.spacing(1.5),
    bottom: theme.spacing(1.5),
    top: theme.spacing(12),
  },
}));

const Header = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: theme.spacing(2),
  right: theme.spacing(2),
  top: theme.spacing(2),
  zIndex: 2,
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'block',
  },
}));

export default function FeatureImage({
  items,
  activeIndex,
}: FeatureImageProps) {
  const { image, title, bg, description } = items[activeIndex];

  return (
    <Wrapper>
      <Backdrop sx={{ background: bg ?? '#f6f6f6' }} />

      <Header>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}
        >
          {title}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          {description}
        </Typography>
      </Header>

      <Inner>
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 900px) 100vw, 600px"
          priority
        />
      </Inner>
    </Wrapper>
  );
}
