'use client';

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { useState } from 'react';

import CommonButton from '@/components/ui/CommonButton';

const Title = styled(Typography)({
  fontFamily: 'Roboto, sans-serif',
  fontSize: '20px',
  fontWeight: 700,
  color: '#060606',
  marginBottom: '32px',
});

const OptionsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: '48px',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
    marginBottom: '24px',
  },
}));

const OptionCard = styled(Box)<{ selected?: boolean }>(
  ({ selected, theme }) => ({
    width: '160px',
    height: '160px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '16px',
    backgroundColor: selected ? '#e5fcd5' : '#fafafa',
    border: selected ? '1px solid #060606' : 'none',
    marginRight: '32px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxSizing: 'border-box',
    '&:last-child': {
      marginRight: 0,
    },
    [theme.breakpoints.down('md')]: {
      marginRight: 0,
      marginBottom: '16px',
      '&:last-child': {
        marginBottom: 0,
      },
    },
  }),
);

const carriers = [
  {
    key: 'telstra',
    label: 'Telstra',
    icon: '/dashboard/ai-setup/telstra.svg',
  },
  {
    key: 'optus',
    label: 'Optus',
    icon: '/dashboard/ai-setup/optus.png',
  },
  {
    key: 'vodafone',
    label: 'Vodafone',
    icon: '/dashboard/ai-setup/vodafone.png',
  },
];

interface StepCarrierSelectProps {
  onNext: () => void;
  onBack: () => void;
}

export default function StepCarrierSelect({
  onNext,
  onBack,
}: StepCarrierSelectProps) {
  const [selected, setSelected] = useState<string>('telstra');

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      pt={0}
      sx={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 160px)',
      }}
    >
      <Title>Which phone carrier are you using?</Title>
      <OptionsRow>
        {carriers.map(carrier => (
          <OptionCard
            key={carrier.key}
            selected={selected === carrier.key}
            onClick={() => {
              setSelected(carrier.key);
            }}
          >
            <Image
              src={carrier.icon}
              alt={carrier.label}
              width={carrier.key === 'optus' ? 102 : 40}
              height={40}
            />
            <Typography
              mt={2}
              fontFamily="Roboto, sans-serif"
              fontSize={14}
              color="#060606"
            >
              {carrier.label}
            </Typography>
          </OptionCard>
        ))}
      </OptionsRow>
      <Box display="flex" flexDirection="row" gap={2}>
        <CommonButton
          sx={{
            width: 88,
            height: 40,
            borderRadius: 1,
            background: '#fff',
            color: '#060606',
            border: '1px solid #bbb',
            boxShadow: 'none',
            padding: '12px 16px',
            '&:hover': { background: '#fafafa' },
          }}
          onClick={onBack}
        >
          ← Back
        </CommonButton>
        <CommonButton
          sx={{
            width: 216,
            height: 40,
            borderRadius: 1,
            padding: '10px 93px',
          }}
          onClick={onNext}
        >
          Next
        </CommonButton>
      </Box>
    </Box>
  );
}
