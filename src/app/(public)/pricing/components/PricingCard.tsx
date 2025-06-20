'use client';

import { styled } from '@mui/material/styles';

import CommonButton from '@/components/ui/CommonButton';
import type { PlanButton } from '@/types/plan.types';

interface PricingCardProps {
  tier: 'FREE' | 'BASIC' | 'PRO';
  features: {
    callMinutes: string;
    support: string;
  };
  pricing: { priceDisplay: string; periodDisplay: string };
  buttons: PlanButton[];
}

const CardContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '448px',
  height: '464px',
  width: '100%',
  flexShrink: 0,
  padding: '30px',
  borderRadius: '24px',
  border: '1px solid #d5d5d5',
  backgroundColor: '#fff',
}));

const tierColors = {
  FREE: '#e5fcd5',
  BASIC: '#e1f0ff',
  PRO: '#fff2d1',
};

const IconWrapper = styled('div')<{ tier: 'FREE' | 'BASIC' | 'PRO' }>(
  ({ tier }) => ({
    width: '36px',
    height: '36px',
    padding: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    backgroundColor: tierColors[tier],
  }),
);

const PriceTitle = styled('h3')(({ theme }) => ({
  margin: '16px 0 0 0',
  fontFamily: theme.typography.h3.fontFamily,
  fontSize: theme.typography.h3.fontSize,
  fontWeight: theme.typography.h3.fontWeight,
  fontStretch: 'normal',
  fontStyle: 'normal',
  lineHeight: 1.33,
  letterSpacing: 'normal',
  color: '#060606',
  textAlign: 'left',
}));

const PriceDescription = styled('p')(() => ({
  margin: '8px 0 0 0',
  fontFamily: 'Roboto',
  fontSize: '14px',
  fontWeight: 'normal',
  fontStretch: 'normal',
  fontStyle: 'normal',
  lineHeight: 'normal',
  letterSpacing: 'normal',
  color: '#6d6d6d',
  textAlign: 'left',
  minHeight: '28px',
}));

const PriceRow = styled('div')(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
  margin: '40px 0 40px 0',
}));

const PriceText = styled('span')(() => ({
  fontFamily: 'DINAlternate, sans-serif',
  fontSize: '48px',
  fontWeight: 'bold',
  color: '#060606',
  lineHeight: 1,
}));

const PeriodText = styled('span')(() => ({
  fontFamily: 'Roboto, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: 1.25,
  color: '#060606',
  marginTop: '24px',
}));

const BtnContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'nowrap',
  justifyContent: 'center',
  marginBottom: '40px',
  gap: theme.spacing(1.5),
}));

const FeatureItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '16px',
});

const CheckWrapper = styled('div')({
  width: '16px',
  height: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const FeatureLabel = styled('span')({
  fontFamily: 'Roboto',
  fontSize: '14px',
  color: '#6d6d6d',
  margin: '2px 8px 2px 12px',
});

const FeatureValue = styled('span')({
  fontFamily: 'Roboto',
  fontSize: '14px',
  color: '#060606',
  margin: '2px 0 2px 0px',
});

export default function PricingCard({
  tier,
  features,
  pricing,
  buttons,
}: PricingCardProps) {
  return (
    <CardContainer>
      <IconWrapper tier={tier}>
        {tier === 'FREE' && <img src="/plan/free.svg" alt="Free Plan" />}
        {tier === 'BASIC' && <img src="/plan/basic.svg" alt="Basic Plan" />}
        {tier === 'PRO' && <img src="/plan/pro.svg" alt="Pro Plan" />}
      </IconWrapper>

      <PriceTitle>
        {tier === 'FREE' && 'Free Plan'}
        {tier === 'BASIC' && 'Basic Plan'}
        {tier === 'PRO' && 'Pro Plan'}
      </PriceTitle>

      <PriceDescription>
        {tier === 'FREE' && 'Unlimited calls'}
        {tier === 'BASIC' &&
          'Perfect for small businesses ready to automate calls and save time'}
        {tier === 'PRO' && 'Enjoy unlimited and highly customizable features'}
      </PriceDescription>

      <PriceRow>
        <PriceText>{pricing.priceDisplay}</PriceText>
        <PeriodText>{pricing.periodDisplay}</PeriodText>
      </PriceRow>

      <BtnContainer>
        {buttons.map((btn, i) => (
          <CommonButton
            key={i}
            buttonVariant={btn.variant === 'primary' ? 'black' : 'green'}
            sx={{
              width:
                buttons.length === 1
                  ? '388px'
                  : btn.variant === 'primary'
                    ? '216px'
                    : '160px',
              height: '40px',
            }}
          >
            {btn.label}
          </CommonButton>
        ))}
      </BtnContainer>

      <FeatureItem>
        <CheckWrapper>
          <img src="/plan/check.svg" alt="check Icon" />
        </CheckWrapper>
        <FeatureLabel>Call Minutes:</FeatureLabel>
        <FeatureValue>{features.callMinutes}</FeatureValue>
      </FeatureItem>

      <FeatureItem>
        <CheckWrapper>
          <img src="/plan/check.svg" alt="check Icon" />
        </CheckWrapper>
        <FeatureLabel>Support:</FeatureLabel>
        <FeatureValue>{features.support}</FeatureValue>
      </FeatureItem>
    </CardContainer>
  );
}
