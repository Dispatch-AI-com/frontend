'use client';

import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
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
    SECONDARY: '#d5d5d5',
  },
  SIZES: {
    CONTAINER_WIDTH: '678px',
    CONTAINER_WIDTH_TABLET: '90%',
    CONTAINER_WIDTH_MOBILE: '95%',
    BUTTON_HEIGHT: 40,
    BACK_BUTTON_WIDTH: 88,
    ACTION_BUTTON_WIDTH: 216,
    IMAGE_HEIGHT_SMALL: '100px',
    IMAGE_HEIGHT_LARGE: '284px',
    IMAGE_HEIGHT_SMALL_MOBILE: '80px',
    IMAGE_HEIGHT_LARGE_MOBILE: '200px',
  },
  SPACING: {
    BORDER_RADIUS: '16px',
    GAP: 2,
    GAP_MOBILE: 1,
    MARGIN_SMALL: '16px',
    MARGIN_MEDIUM: '24px',
    MARGIN_LARGE: '32px',
    MARGIN_XLARGE: '48px',
    MARGIN_MOBILE: '12px',
  },
  TYPOGRAPHY: {
    TITLE_SIZE: '20px',
    BODY_SIZE: '14px',
    FONT_FAMILY: 'Roboto, sans-serif',
    LINE_HEIGHT: 1.14,
  },
} as const;

const STEPS = [
  {
    id: 1,
    description:
      'When ready, <b>click Start Instant Setup</b> and open the default camera app on your iPhone. <b>Scan the QR code.</b>',
    image: {
      src: '/dashboard/ai-setup/IS_step1.png',
      alt: 'Scan QR code',
      height: CONSTANTS.SIZES.IMAGE_HEIGHT_SMALL,
      heightMobile: CONSTANTS.SIZES.IMAGE_HEIGHT_SMALL_MOBILE,
      marginBottom: CONSTANTS.SPACING.MARGIN_MEDIUM,
      marginBottomMobile: CONSTANTS.SPACING.MARGIN_MOBILE,
    },
  },
  {
    id: 2,
    description:
      "<b>Press the yellow call button.</b> When successfully set up you'll be shown a screen with details of settings changed which you can then dismiss.",
    image: {
      src: '/dashboard/ai-setup/IS_step2.png',
      alt: 'Call confirmation',
      height: CONSTANTS.SIZES.IMAGE_HEIGHT_LARGE,
      heightMobile: CONSTANTS.SIZES.IMAGE_HEIGHT_LARGE_MOBILE,
      marginBottom: CONSTANTS.SPACING.MARGIN_XLARGE,
      marginBottomMobile: CONSTANTS.SPACING.MARGIN_MOBILE,
    },
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
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  ...commonTypographyStyles,
  fontSize: CONSTANTS.TYPOGRAPHY.BODY_SIZE,
  width: CONSTANTS.SIZES.CONTAINER_WIDTH,
  textAlign: 'left',
  marginBottom: CONSTANTS.SPACING.MARGIN_SMALL,
  lineHeight: CONSTANTS.TYPOGRAPHY.LINE_HEIGHT,
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
  [theme.breakpoints.down('md')]: {
    width: '95%',
  },
}));

const ImageBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: CONSTANTS.SPACING.BORDER_RADIUS,
  backgroundColor: CONSTANTS.COLORS.BACKGROUND,
  boxSizing: 'border-box',
  position: 'relative',
  overflow: 'hidden',
});

interface InstantSetupProps {
  onNext: () => void;
  onBack: () => void;
  onManualSetup: () => void;
}

interface StepProps {
  step: (typeof STEPS)[number];
}

const Step = ({ step }: StepProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Description
        sx={{
          whiteSpace: step.id === 1 ? 'nowrap' : 'normal',
          '@media (max-width: 950px)': {
            whiteSpace: 'normal',
          },
        }}
      >
        <span dangerouslySetInnerHTML={{ __html: step.description }} />
      </Description>
      <ImageBox
        sx={{
          width: '100%',
          maxWidth: CONSTANTS.SIZES.CONTAINER_WIDTH,
          height: isMobile ? step.image.heightMobile : step.image.height,
          marginBottom: isMobile
            ? step.image.marginBottomMobile
            : step.image.marginBottom,
        }}
      >
        <Image
          src={step.image.src}
          alt={step.image.alt}
          fill
          style={{ objectFit: 'contain' }}
        />
      </ImageBox>
    </>
  );
};

export default function InstantSetup({
  onNext,
  onBack,
  onManualSetup,
}: InstantSetupProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

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
      }}
    >
      <Title>Instant Setup</Title>

      {STEPS.map(step => (
        <Step key={step.id} step={step} />
      ))}

      <Box
        display="flex"
        flexDirection={isMobile ? 'column' : 'row'}
        gap={isMobile ? CONSTANTS.SPACING.GAP_MOBILE : CONSTANTS.SPACING.GAP}
        sx={{
          width: '100%',
          maxWidth: CONSTANTS.SIZES.CONTAINER_WIDTH,
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: isTablet ? 'wrap' : 'nowrap',
        }}
      >
        <CommonButton
          sx={{
            width: isMobile
              ? '100%'
              : isTablet
                ? 'calc(50% - 8px)'
                : CONSTANTS.SIZES.BACK_BUTTON_WIDTH,
            height: CONSTANTS.SIZES.BUTTON_HEIGHT,
            borderRadius: 1,
            background: CONSTANTS.COLORS.WHITE,
            color: CONSTANTS.COLORS.PRIMARY,
            border: `1px solid ${CONSTANTS.COLORS.BORDER}`,
            boxShadow: 'none',
            '&:hover': { background: CONSTANTS.COLORS.HOVER },
          }}
          onClick={onBack}
        >
          ← Back
        </CommonButton>
        <CommonButton
          sx={{
            width: isMobile
              ? '100%'
              : isTablet
                ? 'calc(50% - 8px)'
                : CONSTANTS.SIZES.ACTION_BUTTON_WIDTH,
            height: CONSTANTS.SIZES.BUTTON_HEIGHT,
            borderRadius: 1,
            background: CONSTANTS.COLORS.PRIMARY,
            color: CONSTANTS.COLORS.WHITE,
            '&:hover': { background: CONSTANTS.COLORS.HOVER_DARK },
          }}
          onClick={() => setIsModalOpen(true)}
        >
          Start Instant Setup
        </CommonButton>
        <CommonButton
          sx={{
            width: isMobile
              ? '100%'
              : isTablet
                ? '100%'
                : CONSTANTS.SIZES.ACTION_BUTTON_WIDTH,
            height: CONSTANTS.SIZES.BUTTON_HEIGHT,
            borderRadius: 1,
            background: CONSTANTS.COLORS.SECONDARY,
            color: CONSTANTS.COLORS.PRIMARY,
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
