'use client';

import { styled } from '@mui/material/styles';
import { padding } from '@mui/system';
import Image from 'next/image';

import CommonButton from '@/components/ui/CommonButton';
import theme from '@/theme';
import type { PlanButton } from '@/types/plan.types';

interface PricingCardProps {
  tier: 'FREE' | 'BASIC' | 'PRO';
  features: {
    callMinutes: string;
    support: string;
  };
  pricing: { priceDisplay: string; periodDisplay: string };
  buttons: PlanButton[];
  onButtonClick: (label: string) => void;
  isCurrent: boolean;
}

const CardContainer = styled('div')<{ isCurrent: boolean }>(
  ({ isCurrent }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '408px',
    width: '100%',
    maxWidth: '570px',
    padding: '30px',
    borderRadius: '24px',
    border: '1px solid #d5d5d5',
    backgroundColor: isCurrent ? '#f9fff6' : '#fff',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      padding: '15px',
    },
  }),
);

const CurrentPlanTag = styled('div')(() => ({
  position: 'absolute',
  top: '12px',
  right: '12px',
  width: '128px',
  height: '28px',
  backgroundColor: '#a8f574',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Roboto',
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#060606',
  fontStretch: 'normal',
  fontStyle: 'normal',
  lineHeight: '1.43',
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
  fontSize: '16px',
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
  margin: '30px 0 30px 0',
}));

const PriceText = styled('span')(() => ({
  fontFamily: 'DINAlternate, sans-serif',
  fontSize: '40px',
  fontWeight: 'bold',
  color: '#060606',
  lineHeight: 1,
}));

const PeriodText = styled('span')(() => ({
  fontFamily: 'Roboto, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: 1.25,
  color: '#060606',
  marginTop: '24px',
}));

const BtnContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'nowrap',
  justifyContent: 'center',
  marginBottom: '20px',
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
  alignSelf: 'flex-start',
  justifyContent: 'center',
  marginTop: '4px',
});

const FeatureLabel = styled('span')({
  fontFamily: 'Roboto',
  fontSize: '14px',
  color: '#6d6d6d',
  margin: '2px 8px 2px 12px',
  alignSelf: 'flex-start',
});

const FeatureValue = styled('span')({
  fontFamily: 'Roboto',
  fontSize: '14px',
  color: '#060606',
  margin: '2px 0 2px 0px',
  width: '120px',
  alignSelf: 'flex-start',
});

export default function PricingCard({
  tier,
  features,
  pricing,
  buttons,
  onButtonClick,
  isCurrent,
}: PricingCardProps) {
  return (
    <CardContainer isCurrent={isCurrent}>
      <IconWrapper tier={tier}>
        {tier === 'FREE' && (
          <Image src="/plan/free.svg" alt="Free Plan" width={24} height={24} />
        )}
        {tier === 'BASIC' && (
          <Image
            src="/plan/basic.svg"
            alt="Basic Plan"
            width={24}
            height={24}
          />
        )}
        {tier === 'PRO' && (
          <Image src="/plan/pro.svg" alt="Pro Plan" width={24} height={24} />
        )}
      </IconWrapper>

      {isCurrent && <CurrentPlanTag>Your current plan</CurrentPlanTag>}

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
            buttonVariant={
              btn.variant === 'primary'
                ? 'black'
                : btn.variant === 'secondary'
                  ? 'green'
                  : btn.variant === 'cancel'
                    ? 'cancel'
                    : 'disabled'
            }
            onClick={
              btn.variant === 'disabled'
                ? undefined
                : () => onButtonClick(btn.label)
            }
            sx={{
              width:
                buttons.length === 1
                  ? '100%'
                  : btn.variant === 'primary'
                    ? '50%'
                    : '50%',
              height: '40px',
            }}
          >
            {btn.label}
          </CommonButton>
        ))}
      </BtnContainer>

      <FeatureItem>
        <CheckWrapper>
          <Image
            src="/plan/check.svg"
            alt="check Icon"
            width={16}
            height={16}
          />
        </CheckWrapper>
        <FeatureLabel>Call Minutes:</FeatureLabel>
        <FeatureValue>{features.callMinutes}</FeatureValue>
      </FeatureItem>

      <FeatureItem>
        <CheckWrapper>
          <Image
            src="/plan/check.svg"
            alt="check Icon"
            width={16}
            height={16}
          />
        </CheckWrapper>
        <FeatureLabel>Support:</FeatureLabel>
        <FeatureValue>{features.support}</FeatureValue>
      </FeatureItem>
    </CardContainer>
  );
}
