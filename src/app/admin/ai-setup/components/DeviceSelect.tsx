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
  marginBottom: '16px',
  lineHeight: 1.2,
});

const SubTitle = styled(Typography)({
  fontFamily: 'Roboto, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#060606',
  marginBottom: '24px',
  lineHeight: 1.14,
});

const OptionsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: '48px',
  [theme.breakpoints.down('sm')]: {
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
    marginRight: '40px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxSizing: 'border-box',
    padding: selected ? '40px 55px' : '40px 58px',
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
      marginBottom: '16px',
    },
  }),
);

const devices = [
  {
    key: 'iphone',
    label: 'iPhone',
    icon: '/dashboard/ai-setup/apple.svg',
  },
  {
    key: 'android',
    label: 'Android',
    icon: '/dashboard/ai-setup/android.svg',
  },
];

interface DeviceSelectProps {
  onNext: (device: 'iphone' | 'android') => void;
}

export default function DeviceSelect({ onNext }: DeviceSelectProps) {
  const [selected, setSelected] = useState<'iphone' | 'android'>('iphone');

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
      <Title>Let's get Dispatch AI ready to work with you</Title>
      <SubTitle>What device do you want to answer missed calls on?</SubTitle>
      <OptionsRow>
        {devices.map((device, idx) => (
          <OptionCard
            key={device.key}
            selected={selected === device.key}
            onClick={() => {
              setSelected(device.key as 'iphone' | 'android');
            }}
            sx={{
              marginRight: idx === 0 ? '40px' : 0,
            }}
          >
            <Image
              src={device.icon}
              alt={device.label}
              width={40}
              height={40}
            />
            <Typography
              mt={2}
              fontFamily="Roboto, sans-serif"
              fontSize={16}
              color="#060606"
            >
              {device.label}
            </Typography>
          </OptionCard>
        ))}
      </OptionsRow>
      <CommonButton
        sx={{ width: 216, height: 40, borderRadius: 1 }}
        onClick={() => onNext(selected)}
      >
        Next
      </CommonButton>
    </Box>
  );
}
