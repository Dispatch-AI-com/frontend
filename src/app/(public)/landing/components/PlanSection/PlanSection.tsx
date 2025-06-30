'use client';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { styled } from '@mui/material/styles';
import React from 'react';
import Slider from 'react-slick';

import { useGetPlansQuery } from '@/features/public/publicApiSlice';
import type { Plan, PlanButton } from '@/types/plan.types';

import PlanCard from './PlanCard';

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

const settings = {
  dots: true,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 960,
      settings: {
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const StyledSlider = styled(Slider)(() => ({
  '.slick-slide > div': {
    padding: '0 16px 0 0',
    display: 'flex',
    justifyContent: 'center',
  },
}));

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
  if (!matched) {
    return { priceDisplay: '--', periodDisplay: '' };
  }
  if (matched.price === 0) {
    return { priceDisplay: 'FREE', periodDisplay: '' };
  }
  return {
    priceDisplay: `$${String(matched.price)}`,
    periodDisplay: ` /${parseRRule(matched.rrule)}`,
  };
}

const SectionContainer = styled('section')(({ theme }) => ({
  padding: '80px 0 0 0',
  textAlign: 'center',
  backgroundColor: theme.palette.background.default,
}));

const SectionTitle = styled('h2')(({ theme }) => ({
  ...theme.typography.h2,
  textAlign: 'center',
  margin: '0 0 64px',
}));

export default function PlanSection() {
  const { data: plans = [], isLoading, isError } = useGetPlansQuery(undefined);
  const tierOrder = { FREE: 0, BASIC: 1, PRO: 2 };
  const sortedPlans = [...plans].sort((a, b) => {
    return tierOrder[a.tier] - tierOrder[b.tier];
  });

  if (isLoading) {
    return (
      <SectionContainer>
        <SectionTitle>Flexible Plans to Match Your Needs</SectionTitle>
        <p>Loading plans...</p>
      </SectionContainer>
    );
  }

  if (isError) {
    return (
      <SectionContainer>
        <SectionTitle>Flexible Plans to Match Your Needs</SectionTitle>
        <p>Failed to load plans. Please try again later.</p>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer id="LandingPlans">
      <SectionTitle>Flexible Plans to Match Your Needs</SectionTitle>
      <StyledSlider {...settings}>
        {sortedPlans.map(plan => (
          <PlanCard
            key={plan._id}
            tier={plan.tier}
            pricing={getPrice(plan.pricing)}
            buttons={getButtons(plan.tier)}
          />
        ))}
      </StyledSlider>
    </SectionContainer>
  );
}
