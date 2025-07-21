'use client';

import { Box, Container, Grid, styled, Typography } from '@mui/material';
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
  backgroundColor: theme.palette.background.default,
}));

export default function FeatureSwitcher({
  items,
  title = 'Combined Features & Workflow Section',
}: FeatureSwitcherProps) {
  const [activeIndex, setActiveIndex] = useState(0);

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
          sx={{ width: 'auto' }}
        >
          {/* Feature list */}
          <Grid item xs={12} md={5} order={{ xs: 2, md: 1 }}>
            <FeatureList
              items={items}
              activeIndex={activeIndex}
              onChange={setActiveIndex}
            />
          </Grid>

          {/* Feature image */}
          <Grid
            item
            xs={12}
            md={6}
            order={{ xs: 1, md: 2 }}
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
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
