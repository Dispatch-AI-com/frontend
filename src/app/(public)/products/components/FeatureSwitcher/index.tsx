'use client';

import { Grid, styled, Typography } from '@mui/material';
import { useState } from 'react';

import FeatureImage from './FeatureImage';
import type { FeatureItem } from './FeatureList';
import FeatureList from './FeatureList';

interface FeatureSwitcherProps {
  items: FeatureItem[];
  title?: string;
}

const Wrapper = styled('section')(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2, 2),
}));

export default function FeatureSwitcher({
  items,
  title = 'Combined Features & Workflow Section',
}: FeatureSwitcherProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Wrapper>
      <Typography fontSize={24} textAlign="center" fontWeight={700} mb={6}>
        {title}
      </Typography>

      <Grid
        container
        spacing={{ xs: 4, md: 8 }}
        alignItems="center"
        justifyContent="center"
      >
        {/* Feature list */}
        <Grid item xs={12} md={4} order={{ xs: 2, md: 1 }}>
          <FeatureList
            items={items}
            activeIndex={activeIndex}
            onChange={setActiveIndex}
          />
        </Grid>

        {/* Feature image */}
        <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
          <FeatureImage items={items} activeIndex={activeIndex} />
        </Grid>
      </Grid>
    </Wrapper>
  );
}
