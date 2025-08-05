'use client';

import 'keen-slider/keen-slider.min.css';

import { Box, useTheme } from '@mui/material';
import { useKeenSlider } from 'keen-slider/react';
import { useEffect, useState } from 'react';

import { useGetPlansQuery } from '@/features/public/publicApiSlice';
import type { Plan, PlanButton } from '@/types/plan.types';

import PricingCard from './PricingCard';

function parseRRule(rrule: string): string {
  if (rrule.includes('FREQ=MONTHLY;INTERVAL=3')) return 'quarter';
  if (rrule.includes('FREQ=MONTHLY')) return 'month';
  if (rrule.includes('FREQ=YEARLY')) return 'year';
  return '';
}

function getPrice(pricing: { rrule: string; price: number }[]): {
  priceDisplay: string;
  periodDisplay: string;
} {
  const matched = pricing[0];
  if (!matched) return { priceDisplay: '--', periodDisplay: '' };
  if (matched.price === 0) return { priceDisplay: 'FREE', periodDisplay: '' };
  return {
    priceDisplay: `$${matched.price}`,
    periodDisplay: ` /${parseRRule(matched.rrule)}`,
  };
}

function getButtons(tier: Plan['tier']): PlanButton[] {
  switch (tier) {
    case 'FREE':
      return [{ label: 'Try for Free', variant: 'primary' }];
    case 'BASIC':
      return [
        { label: 'Go with Basic', variant: 'primary' },
        { label: 'Request Demo', variant: 'secondary' },
      ];
    case 'PRO':
      return [
        { label: 'Go with Pro', variant: 'primary' },
        { label: 'Request Demo', variant: 'secondary' },
      ];
  }
}

export default function PricingSection() {
  const theme = useTheme();
  const { data: plans = [], isLoading, isError } = useGetPlansQuery(undefined);

  const tierOrder = { FREE: 0, BASIC: 1, PRO: 2 };
  const sortedPlans = [...plans].sort(
    (a, b) => tierOrder[a.tier] - tierOrder[b.tier],
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1,
      spacing: 0,
    },
    breakpoints: {
      '(min-width: 900px)': {
        slides: { perView: 2, spacing: 0 },
      },
      '(min-width: 1200px)': {
        slides: { perView: 3, spacing: 0 },
      },
    },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      slider.current?.update();
    }, 100);
    return () => clearTimeout(timeout);
  }, [slider]);

  return (
    <Box
      component="section"
      sx={{
        padding: {
          xs: '0 0 40px 0',
          sm: '0 0 68px 0',
        },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        component="h2"
        sx={{
          ...theme.typography.h1,
          textAlign: 'center',
          margin: {
            xs: '48px 0 32px 0',
            sm: '120px 0 100px 0',
          },
        }}
      >
        Choose the Right Plan for You
      </Box>

      <Box
        ref={sliderRef}
        className="keen-slider"
        sx={{
          maxWidth: {
            xs: 380,
            sm: 900,
            md: 1050,
            lg: 1500,
          },
          overflow: 'hidden',
        }}
      >
        {isLoading && <p>Loading...</p>}
        {isError && <p>Failed to load plans.</p>}
        {sortedPlans.map(plan => (
          <Box
            key={plan._id}
            className="keen-slider__slide"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              px: 1,
              boxSizing: 'border-box',
            }}
          >
            <PricingCard
              tier={plan.tier}
              features={plan.features}
              pricing={getPrice(plan.pricing)}
              buttons={getButtons(plan.tier)}
            />
          </Box>
        ))}
      </Box>

      {/* Dots */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          justifyContent: 'center',
          mt: 3,
          gap: 1.5,
        }}
      >
        {sortedPlans.map((_, idx) => (
          <Box
            key={idx}
            onClick={() => {
              slider.current?.moveToIdx(idx);
            }}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor:
                currentSlide === idx ? 'primary.main' : 'grey.400',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
