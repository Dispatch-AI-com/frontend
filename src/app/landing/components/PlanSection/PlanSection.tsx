'use client';

import { styled } from '@mui/material/styles';
import React from 'react';

import { useGetPlansQuery } from '@/features/public/publicApiSlice';
import type { Plan, PlanButton } from '@/types/plan.types';

import PlanCard from './PlanCard';

function getButtons(tier: Plan['tier']): PlanButton[] {
  switch (tier) {
    case 'FREE':
      return [{ label: 'Try for Free', variant: 'primary' }];
    case 'BASIC':
      return [
        { label: 'Learn more about Basic', variant: 'primary' },
        { label: 'Request Demo', variant: 'secondary' },
      ];
    case 'PRO':
      return [
        { label: 'Go with Pro', variant: 'primary' },
        { label: 'Request Demo', variant: 'secondary' },
      ];
  }
}

function getDescription(tier: Plan['tier']): string {
  switch (tier) {
    case 'FREE':
      return '7-day trial,unlimited calls';
    case 'BASIC':
      return 'Perfect for small businesses ready to automate calls and save time';
    case 'PRO':
      return 'Enjoy unlimited and highly customizable features';
    default:
      return '';
  }
}

const SectionContainer = styled('section')(({ theme }) => ({
  padding: '120px 0 0 0',
  textAlign: 'center',
  backgroundColor: theme.palette.background.default,
}));

const SectionTitle = styled('h2')(({ theme }) => ({
  ...theme.typography.h2,
  textAlign: 'center',
  margin: '0 0 64px',
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

export default function PlanSection() {
  const { data: plans = [], isLoading, isError } = useGetPlansQuery(undefined);

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
      <PlanGrid>
        {plans.map(plan => (
          <PlanCard
            key={plan._id}
            tier={plan.tier}
            name={plan.name}
            description={getDescription(plan.tier)}
            buttons={getButtons(plan.tier)}
          />
        ))}
      </PlanGrid>
    </SectionContainer>
  );
}
