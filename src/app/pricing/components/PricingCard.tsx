'use client';

import { styled } from '@mui/material/styles';

import CommonButton from '@/components/ui/CommonButton';
import { PlanButton } from '@/types/plan.types';

interface PricingCardProps {
  features: {
    callMinutes: string;
    support: string;
  };
  pricing: { priceDisplay: string; periodDisplay: string };
  buttons: PlanButton[];
}

function CustomCheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="8"
        cy="8"
        r="6.2"
        stroke="#6d6d6d"
        strokeWidth="1.6"
        fill="none"
      />
      <path
        d="M5.6 8L7.2 9.6L10.4 6.8"
        stroke="#6d6d6d"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CardContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '448px',
  minWidth: '280px',
  minHeight: '458px',
  height: 'auto',
  padding: '30px',
  borderRadius: '24px',
  border: '1px solid #d5d5d5',
  backgroundColor: '#fff',
}));

const PriceRow = styled('div')(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
  margin: '96px 0 40px 0', 
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
  marginTop: '18px', 
}));

const BtnContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  marginBottom: '40px',

  [theme.breakpoints.up('lg')]: {
    flexWrap: 'nowrap', 
  },
}));

const FeatureItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '16px',
});

const IconWrapper = styled('div')({
  width: '20px',
  height: '20px',
  padding: '2px',
  marginRight: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const FeatureLabel = styled('span')({
  fontFamily: 'Roboto',
  fontSize: '14px',
  color: '#6d6d6d',
  margin: '2px 8px 2px 0px',
});

const FeatureValue = styled('span')({
  fontFamily: 'Roboto',
  fontSize: '14px',
  color: '#060606',
  margin: '2px 0 2px 0px',
});

export default function PricingCard({  features, pricing, buttons }: PricingCardProps) {
  return (
    <CardContainer>
      <PriceRow>
        <PriceText>
          {pricing.priceDisplay}
        </PriceText>
        <PeriodText>
          {pricing.periodDisplay}
        </PeriodText>
      </PriceRow>
      <BtnContainer>
        {buttons.map((btn, i) => (
          <CommonButton
            key={i}
            buttonVariant={btn.variant === 'primary' ? 'black' : 'green'}
            sx={{
              width: '388px',
              height: '48px',
            }}
          >
            {btn.label}
          </CommonButton>
        ))}
      </BtnContainer>

      <FeatureItem>
        <IconWrapper><CustomCheckIcon /></IconWrapper>
        <FeatureLabel>Call Minutes:</FeatureLabel>
        <FeatureValue>{features.callMinutes}</FeatureValue>
      </FeatureItem>

      <FeatureItem>
        <IconWrapper><CustomCheckIcon /></IconWrapper>
        <FeatureLabel>Support:</FeatureLabel>
        <FeatureValue>{features.support}</FeatureValue>
      </FeatureItem>
    </CardContainer>
  );
}
