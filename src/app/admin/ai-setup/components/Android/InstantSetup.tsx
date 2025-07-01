'use client';

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { useState } from 'react';

import CommonButton from '@/components/ui/CommonButton';

import QrCodeModal from '../QrCodeModal';

const CONSTANTS = {
  COLORS: {
    PRIMARY: '#060606',
    BACKGROUND: '#fafafa',
    BORDER: '#bbb',
    WHITE: '#ffffff',
    HOVER: '#fafafa',
    HOVER_DARK: '#202020',
    HOVER_GRAY: '#bdbdbd',
    SECONDARY: '#e0e0e0',
    CHIP_BG: '#616161',
  },
  SIZES: {
    CONTAINER_WIDTH: '678px',
    BUTTON_HEIGHT: 40,
    BACK_BUTTON_WIDTH: 88,
    ACTION_BUTTON_WIDTH: 216,
    CHIP_WIDTH: '127.5px',
    CHIP_HEIGHT: '36px',
    IMAGE_WIDTH_SMALL: 150,
    IMAGE_HEIGHT_SMALL: 130,
    IMAGE_WIDTH_LARGE: 110,
    IMAGE_HEIGHT_LARGE: 228,
  },
  SPACING: {
    BORDER_RADIUS: '16px',
    CHIP_BORDER_RADIUS: '18px',
    GAP: 2,
    MARGIN_SMALL: '12px',
    MARGIN_MEDIUM: '20px',
    MARGIN_LARGE: '32px',
    MARGIN_XLARGE: '200px',
    PADDING: '24px',
  },
  TYPOGRAPHY: {
    TITLE_SIZE: '20px',
    BODY_SIZE: '14px',
    FONT_FAMILY: 'Roboto, sans-serif',
  },
} as const;

const STEPS = [
  {
    id: 1,
    description: (
      <>
        When ready, <b>click start instant setup</b> and open the default camera
        app on your android phone. <b>scan the QR code.</b>
      </>
    ),
    image: {
      src: '/dashboard/ai-setup/A_IS_step1.png',
      alt: 'Scan QR code on Android',
      width: CONSTANTS.SIZES.IMAGE_WIDTH_SMALL,
      height: CONSTANTS.SIZES.IMAGE_HEIGHT_SMALL,
    },
    isChip: false,
    chipText: undefined,
  },
  {
    id: 2,
    description: (
      <>
        <b>Press call</b> to open your phone app. <b>Press the call button</b>{' '}
        to connect to Dispatch.
      </>
    ),
    image: {
      src: '/dashboard/ai-setup/A_IS_step2.png',
      alt: 'Dial number on Android',
      width: CONSTANTS.SIZES.IMAGE_WIDTH_LARGE,
      height: CONSTANTS.SIZES.IMAGE_HEIGHT_LARGE,
    },
    isChip: false,
    chipText: undefined,
  },
  {
    id: 3,
    description: (
      <>
        If everything is set up you'll see{' '}
        <b>a small popup saying "MMI code started".</b>
      </>
    ),
    image: undefined,
    isChip: true,
    chipText: 'MMI code started.',
  },
] as const;

const commonTypographyStyles = {
  fontFamily: CONSTANTS.TYPOGRAPHY.FONT_FAMILY,
  color: CONSTANTS.COLORS.PRIMARY,
};

const Title = styled(Typography)(({ theme }) => ({
  ...commonTypographyStyles,
  fontSize: CONSTANTS.TYPOGRAPHY.TITLE_SIZE,
  fontWeight: 700,
  marginBottom: CONSTANTS.SPACING.MARGIN_LARGE,
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    marginBottom: CONSTANTS.SPACING.MARGIN_MEDIUM,
    fontSize: '18px',
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  ...commonTypographyStyles,
  fontSize: CONSTANTS.TYPOGRAPHY.BODY_SIZE,
  width: CONSTANTS.SIZES.CONTAINER_WIDTH,
  textAlign: 'left',
  marginBottom: CONSTANTS.SPACING.MARGIN_SMALL,
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
  [theme.breakpoints.down('md')]: {
    width: '95%',
  },
}));

const ImageBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: CONSTANTS.SPACING.BORDER_RADIUS,
  backgroundColor: CONSTANTS.COLORS.BACKGROUND,
  boxSizing: 'border-box',
  width: CONSTANTS.SIZES.CONTAINER_WIDTH,
  padding: CONSTANTS.SPACING.PADDING,
  marginBottom: CONSTANTS.SPACING.MARGIN_MEDIUM,
  [theme.breakpoints.down('md')]: {
    width: '95%',
    maxWidth: CONSTANTS.SIZES.CONTAINER_WIDTH,
  },
}));

const MmiCodeChip = styled(Box)({
  width: CONSTANTS.SIZES.CHIP_WIDTH,
  height: CONSTANTS.SIZES.CHIP_HEIGHT,
  backgroundColor: CONSTANTS.COLORS.CHIP_BG,
  color: CONSTANTS.COLORS.WHITE,
  borderRadius: CONSTANTS.SPACING.CHIP_BORDER_RADIUS,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: CONSTANTS.TYPOGRAPHY.FONT_FAMILY,
  fontSize: '12px',
});

interface AndroidInstantSetupProps {
  onNext: () => void;
  onBack: () => void;
  onManualSetup: () => void;
}

interface StepProps {
  step: (typeof STEPS)[number];
}

const Step = ({ step }: StepProps) => (
  <>
    <Description>{step.description}</Description>
    <ImageBox>
      {step.isChip ? (
        <MmiCodeChip>{step.chipText}</MmiCodeChip>
      ) : (
        step.image && (
          <Image
            src={step.image.src}
            alt={step.image.alt}
            width={step.image.width}
            height={step.image.height}
          />
        )
      )}
    </ImageBox>
  </>
);

export default function AndroidInstantSetup({
  onNext,
  onBack,
  onManualSetup,
}: AndroidInstantSetupProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => setIsModalOpen(false);
  const handleModalSuccess = () => {
    setIsModalOpen(false);
    onNext();
  };
  const handleModalManualSetup = () => {
    setIsModalOpen(false);
    onManualSetup();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      pt={0}
      sx={{
        width: '100%',
        px: { xs: 2, sm: 3, md: 0 },
        maxWidth: { xs: '100%', md: 'auto' },
      }}
    >
      <Title>Instant Setup</Title>

      {STEPS.map(step => (
        <Step key={step.id} step={step} />
      ))}

      <Box
        display={{ xs: 'flex', md: 'flex' }}
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent="center"
        gap={CONSTANTS.SPACING.GAP}
        mt={4}
        mb={4}
        sx={{
          width: '100%',
          maxWidth: CONSTANTS.SIZES.CONTAINER_WIDTH,
          alignItems: { xs: 'center', md: 'center' },
          '& > *': {
            width: {
              xs: '100%',
              sm: '95%',
              md: undefined,
            },
            minWidth: 0,
            mb: { xs: 2, md: 0 },
          },
          '& > *:first-of-type': {
            width: {
              xs: '100%',
              sm: '95%',
              md: CONSTANTS.SIZES.BACK_BUTTON_WIDTH,
            },
            minWidth: 0,
          },
          '& > *:nth-of-type(2)': {
            width: {
              xs: '100%',
              sm: '95%',
              md: CONSTANTS.SIZES.ACTION_BUTTON_WIDTH,
            },
            minWidth: 0,
          },
          '& > *:last-child': {
            width: {
              xs: '100%',
              sm: '95%',
              md: CONSTANTS.SIZES.ACTION_BUTTON_WIDTH,
            },
            minWidth: 0,
            mb: 0,
          },
        }}
      >
        <CommonButton
          sx={{
            height: CONSTANTS.SIZES.BUTTON_HEIGHT,
            borderRadius: 1,
            background: CONSTANTS.COLORS.WHITE,
            color: CONSTANTS.COLORS.PRIMARY,
            border: `1px solid ${CONSTANTS.COLORS.BORDER}`,
            boxShadow: 'none',
            padding: '12px 16px',
            fontSize: 'inherit',
            '&:hover': { background: CONSTANTS.COLORS.HOVER },
          }}
          onClick={onBack}
        >
          ← Back
        </CommonButton>
        <CommonButton
          sx={{
            height: CONSTANTS.SIZES.BUTTON_HEIGHT,
            borderRadius: 1,
            background: CONSTANTS.COLORS.PRIMARY,
            color: CONSTANTS.COLORS.WHITE,
            padding: '10px 49px 10px 48px',
            fontSize: 'inherit',
            '&:hover': { background: CONSTANTS.COLORS.HOVER_DARK },
          }}
          onClick={() => setIsModalOpen(true)}
        >
          Start Instant Setup
        </CommonButton>
        <CommonButton
          sx={{
            height: CONSTANTS.SIZES.BUTTON_HEIGHT,
            borderRadius: 1,
            background: CONSTANTS.COLORS.SECONDARY,
            color: CONSTANTS.COLORS.PRIMARY,
            padding: '10px 49px 10px 48px',
            fontSize: 'inherit',
            '&:hover': { background: CONSTANTS.COLORS.HOVER_GRAY },
          }}
          onClick={onManualSetup}
        >
          Manual setup
        </CommonButton>
      </Box>
      <QrCodeModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
        onManualSetup={handleModalManualSetup}
      />
    </Box>
  );
}
