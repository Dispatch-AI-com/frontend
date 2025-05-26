'use client';

import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';

import type { Plan, PlanButton } from '@/types/plan.types';
import axios from '@/utils/axios';

import PricingCard from './PricingCard';

function getButtons(tier: Plan['tier']): PlanButton[] {
  switch (tier) {
    case 'FREE':
      return [{ label: 'Try for Free', variant: 'primary' }];
    case 'BASIC':
      return [{ label: 'Get Basic', variant: 'primary' }];
    case 'PRO':
      return [{ label: 'Go Pro', variant: 'primary' }];
  }
}

function parseRRule(rrule: string): string {
  if (rrule.includes('FREQ=MONTHLY;INTERVAL=3')) return 'quarter';
  if (rrule.includes('FREQ=MONTHLY')) return 'month';
  if (rrule.includes('FREQ=YEARLY')) return 'year';
  return '';
}

/* eslint-disable @typescript-eslint/no-unnecessary-condition */
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
/* eslint-enable @typescript-eslint/no-unnecessary-condition */

const PricingContainer = styled('section')(({ theme }) => ({
  padding: '128px 0 68px 0',
  textAlign: 'center',
  backgroundColor: theme.palette.background.default,
}));

const SectionTitle = styled('h2')(({ theme }) => ({
  ...theme.typography.h2,
  textAlign: 'center',
  margin: '0 0 80px',
}));

const PlanGrid = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'nowrap',
  overflowX: 'auto',
  gap: theme.spacing(2),
  padding: `0 ${theme.spacing(2)}px`,
  scrollSnapType: 'x mandatory',
  WebkitOverflowScrolling: 'touch',
}));

export default function PricingSection() {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get<Plan[]>('api/plan');
        setPlans(res.data);
      } catch {
        // console.error("Failed to fetch plans");
      }
    };
    void fetchPlans();
  }, []);

  return (
    <PricingContainer>
      <SectionTitle>Choose the Right Plan for You</SectionTitle>
      <PlanGrid>
        {plans.map(plan => (
          <PricingCard
            key={plan._id}
            features={plan.features}
            pricing={getPrice(plan.pricing)}
            buttons={getButtons(plan.tier)}
          />
        ))}
      </PlanGrid>
    </PricingContainer>
  );
}
