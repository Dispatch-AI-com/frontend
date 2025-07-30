'use client';

import { Box, Grid, styled, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

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
  backgroundColor: theme.palette.background.default,
}));

export default function FeatureSwitcher({
  items,
  title = 'Combined Features & Workflow Section',
}: FeatureSwitcherProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setActiveIndex(prev => (prev + 1) % items.length);
    }, 3000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeIndex, items.length]);

  const handleChange = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <Wrapper>
      <Typography fontSize={24} textAlign="center" fontWeight={700} mb={12}>
        {title}
      </Typography>
      <Box component="section" sx={{ mx: 'auto', maxWidth: 1280 }}>
        <Grid
          container
          columnSpacing={{ xs: 4, md: 8 }}
          rowSpacing={{ xs: 4, md: 6 }}
          justifyContent="center"
          alignItems="flex-start"
        >
          {/* Feature list */}
          <Grid item xs={12} md={5} order={{ xs: 2, md: 1 }}>
            <FeatureList
              items={items}
              activeIndex={activeIndex}
              onChange={handleChange}
            />
          </Grid>

          {/* Feature image */}
          <Grid
            item
            xs={12}
            md={6}
            order={{ xs: 1, md: 2 }}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Box sx={{ width: '100%', maxWidth: 540, maxHeight: '100%' }}>
              <FeatureImage items={items} activeIndex={activeIndex} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Wrapper>
  );
}
