'use client';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

import CommonButton from '@/components/ui/CommonButton';
import { useGetCompanyByUserIdQuery } from '@/features/company/companyApi';
import { useAppSelector } from '@/redux/hooks';

const CONSTANTS = {
  COLORS: {
    PRIMARY: '#060606',
    SECONDARY: '#9e9e9e',
    BLUE: '#007aff',
    BACKGROUND: '#fafafa',
    BORDER: '#bbb',
    WHITE: '#ffffff',
    HOVER: '#fafafa',
    HOVER_DARK: '#202020',
    HOVER_GRAY: '#bdbdbd',
    SUCCESS_BG: '#e5fcd5',
  },
  SIZES: {
    CONTAINER_WIDTH: '678px',
    TEXT_MAX_WIDTH: '350px',
    BUTTON_HEIGHT: 40,
    BACK_BUTTON_WIDTH: 88,
    ACTION_BUTTON_WIDTH: 216,
    ICON_HEIGHT: 60,
    PHONE_ICON_SIZE: 60,
    KEYPAD_ICON_SIZE: 45,
    STEP_IMAGE_WIDTH: 110,
    STEP_IMAGE_HEIGHT: 228,
  },
  SPACING: {
    CARD_PADDING: '24px',
    CARD_MARGIN: '16px',
    BORDER_RADIUS: '16px',
    SUCCESS_BORDER_RADIUS: '24px',
    SUCCESS_PADDING: '8px 20px',
    GAP: '16px',
    ICON_GAP: '51px',
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
    label: 'step 1:',
    description: 'Open the "Phone" app on your device and go to the "Keypad".',
    images: [
      {
        src: '/dashboard/ai-setup/MS_step1_phone.png',
        alt: 'Phone icon',
        width: CONSTANTS.SIZES.PHONE_ICON_SIZE,
        height: CONSTANTS.SIZES.PHONE_ICON_SIZE,
        label: 'Phone',
        color: CONSTANTS.COLORS.SECONDARY,
      },
      {
        src: '/dashboard/ai-setup/MS_step1_keypad.svg',
        alt: 'Keypad icon',
        width: CONSTANTS.SIZES.KEYPAD_ICON_SIZE,
        height: CONSTANTS.SIZES.KEYPAD_ICON_SIZE,
        label: 'Keypad',
        color: CONSTANTS.COLORS.BLUE,
      },
    ],
  },
  {
    id: 2,
    label: 'step 2:',
    description:
      'Enter the following phone number, including * and # characters, and press the green call button.',
    image: {
      src: '/dashboard/ai-setup/MS_step2.png',
      alt: 'Dial number',
      width: CONSTANTS.SIZES.STEP_IMAGE_WIDTH,
      height: CONSTANTS.SIZES.STEP_IMAGE_HEIGHT,
    },
  },
  {
    id: 3,
    label: 'step 3:',
    description: 'Success screen',
    image: {
      src: '/dashboard/ai-setup/MS_step3.png',
      alt: 'Success screen',
      width: CONSTANTS.SIZES.STEP_IMAGE_WIDTH,
      height: CONSTANTS.SIZES.STEP_IMAGE_HEIGHT,
    },
  },
] as const;

const commonTypographyStyles = {
  fontFamily: CONSTANTS.TYPOGRAPHY.FONT_FAMILY,
  color: CONSTANTS.COLORS.PRIMARY,
};

const Title = styled(Typography)({
  ...commonTypographyStyles,
  fontSize: CONSTANTS.TYPOGRAPHY.TITLE_SIZE,
  fontWeight: 700,
  marginBottom: '32px',
  textAlign: 'center',
});

const StepCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: CONSTANTS.SPACING.CARD_PADDING,
  borderRadius: CONSTANTS.SPACING.BORDER_RADIUS,
  backgroundColor: CONSTANTS.COLORS.BACKGROUND,
  marginBottom: CONSTANTS.SPACING.CARD_MARGIN,
  width: '100%',
  maxWidth: '678px',
  boxSizing: 'border-box',
  [theme.breakpoints.down('md')]: {
    width: '95%',
    maxWidth: '95%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    maxWidth: '100%',
  },
}));

const StepTextContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: CONSTANTS.SIZES.TEXT_MAX_WIDTH,
});

const StepLabel = styled(Typography)({
  ...commonTypographyStyles,
  fontSize: CONSTANTS.TYPOGRAPHY.BODY_SIZE,
  fontWeight: 700,
  marginBottom: '8px',
});

const StepDescription = styled(Typography)({
  ...commonTypographyStyles,
  fontSize: CONSTANTS.TYPOGRAPHY.BODY_SIZE,
});

const FinalDescription = styled(Typography)(({ theme }) => ({
  ...commonTypographyStyles,
  fontSize: CONSTANTS.TYPOGRAPHY.BODY_SIZE,
  width: CONSTANTS.SIZES.CONTAINER_WIDTH,
  marginBottom: CONSTANTS.SPACING.CARD_MARGIN,
  textAlign: 'left',
  [theme.breakpoints.down('md')]: {
    width: '95%',
  },
}));

interface ManualSetupProps {
  onSuccess: () => void;
  onBack: () => void;
  onFailure: () => void;
}

interface IconWithLabelProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  label: string;
  color: string;
}

const IconWithLabel = ({
  src,
  alt,
  width,
  height,
  label,
  color,
}: IconWithLabelProps) => (
  <Box display="flex" flexDirection="column" alignItems="center">
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={CONSTANTS.SIZES.ICON_HEIGHT}
      mb={0.5}
    >
      <Image src={src} alt={alt} width={width} height={height} />
    </Box>
    <Typography
      fontSize={CONSTANTS.TYPOGRAPHY.BODY_SIZE}
      color={color}
      fontFamily={CONSTANTS.TYPOGRAPHY.FONT_FAMILY}
      mt={0.5}
    >
      {label}
    </Typography>
  </Box>
);

const CopyCodeBox = ({
  mmiCode,
  onCopy,
}: {
  mmiCode: string;
  onCopy: () => void;
}) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="flex-start"
    mt={1}
    sx={{
      background: CONSTANTS.COLORS.SUCCESS_BG,
      borderRadius: CONSTANTS.SPACING.SUCCESS_BORDER_RADIUS,
      padding: CONSTANTS.SPACING.SUCCESS_PADDING,
      width: 'fit-content',
    }}
  >
    <Typography
      fontSize={CONSTANTS.TYPOGRAPHY.BODY_SIZE}
      fontWeight={700}
      color={CONSTANTS.COLORS.PRIMARY}
      fontFamily={CONSTANTS.TYPOGRAPHY.FONT_FAMILY}
      mr={1}
    >
      {mmiCode}
    </Typography>
    <IconButton onClick={onCopy} size="small">
      <ContentCopyIcon fontSize="small" />
    </IconButton>
  </Box>
);

export default function ManualSetup({
  onSuccess,
  onBack,
  onFailure,
}: ManualSetupProps) {
  const user = useAppSelector(state => state.auth.user);
  const { data: company } = useGetCompanyByUserIdQuery(user?._id ?? '', {
    skip: !user?._id,
  });

  const dispatchNumber = company?.number ?? '*********';
  const mmiCode = `*004*+61${dispatchNumber.replace(/^0+/, '')}#`;

  const handleCopy = () => {
    navigator.clipboard.writeText(mmiCode).catch(() => {
      // Silent fail for copy operation
    });
  };

  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      pt={0}
      sx={{
        width: '100%',
        px: { xs: 1, sm: 2, md: 0 }, // xs: 8px, sm: 16px, md及以上无padding
      }}
    >
      <Title>Manual setup</Title>

      <StepCard>
        <StepTextContainer>
          <StepLabel>{STEPS[0].label}</StepLabel>
          <StepDescription>
            Open the "Phone" app on your device and go to the "Keypad".
          </StepDescription>
        </StepTextContainer>
        {isMdDown ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
              width: '100%',
            }}
          >
            <IconWithLabel {...STEPS[0].images[0]} />
            <Box width={CONSTANTS.SPACING.ICON_GAP} />
            <IconWithLabel {...STEPS[0].images[1]} />
          </Box>
        ) : (
          <Box display="flex" flexDirection="row" alignItems="flex-end">
            <IconWithLabel {...STEPS[0].images[0]} />
            <Box width={CONSTANTS.SPACING.ICON_GAP} />
            <IconWithLabel {...STEPS[0].images[1]} />
          </Box>
        )}
      </StepCard>

      <StepCard>
        <StepTextContainer>
          <StepLabel>{STEPS[1].label}</StepLabel>
          <StepDescription>
            Enter the following phone number, including * and # characters, and
            press the green call button.
          </StepDescription>
          {isMdDown ? (
            <Box
              sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
            >
              <CopyCodeBox mmiCode={mmiCode} onCopy={handleCopy} />
            </Box>
          ) : (
            <CopyCodeBox mmiCode={mmiCode} onCopy={handleCopy} />
          )}
        </StepTextContainer>
        {isMdDown ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
              width: '100%',
            }}
          >
            <Image
              src={STEPS[1].image.src}
              alt={STEPS[1].image.alt}
              width={STEPS[1].image.width}
              height={STEPS[1].image.height}
            />
          </Box>
        ) : (
          <Image
            src={STEPS[1].image.src}
            alt={STEPS[1].image.alt}
            width={STEPS[1].image.width}
            height={STEPS[1].image.height}
          />
        )}
      </StepCard>

      <FinalDescription sx={isMdDown ? { width: '95%' } : {}}>
        If everything is set up, you'll be shown a screen with details of
        settings changed which you can then dismiss.
      </FinalDescription>

      <StepCard
        sx={{ justifyContent: 'center', ...(isMdDown && { width: '95%' }) }}
      >
        {isMdDown ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
              width: '100%',
            }}
          >
            <Image
              src={STEPS[2].image.src}
              alt={STEPS[2].image.alt}
              width={STEPS[2].image.width}
              height={STEPS[2].image.height}
            />
          </Box>
        ) : (
          <Image
            src={STEPS[2].image.src}
            alt={STEPS[2].image.alt}
            width={STEPS[2].image.width}
            height={STEPS[2].image.height}
          />
        )}
      </StepCard>

      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent="center"
        gap={CONSTANTS.SPACING.GAP}
        mt={6}
        sx={{
          width: '100%',
          maxWidth: CONSTANTS.SIZES.CONTAINER_WIDTH,
          alignItems: { xs: 'center', md: 'center' },
          '& > *': {
            width: { xs: CONSTANTS.SIZES.ACTION_BUTTON_WIDTH, md: undefined },
            minWidth: 0,
            mb: { xs: 2, md: 0 },
          },
          '& > *:first-of-type': {
            width: {
              xs: CONSTANTS.SIZES.ACTION_BUTTON_WIDTH,
              md: CONSTANTS.SIZES.BACK_BUTTON_WIDTH,
            },
            minWidth: 0,
          },
          '& > *:last-child': {
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
            padding: '10px 77px 10px 76px',
            '&:hover': { background: CONSTANTS.COLORS.HOVER_DARK },
          }}
          onClick={onSuccess}
        >
          It worked!
        </CommonButton>
        <CommonButton
          sx={{
            height: CONSTANTS.SIZES.BUTTON_HEIGHT,
            borderRadius: 1,
            background: '#d5d5d5',
            color: CONSTANTS.COLORS.PRIMARY,
            padding: '10px 36px 10px 35px',
            fontSize: 'inherit',
            '&:hover': { background: '#d5d5d5' },
          }}
          onClick={onFailure}
        >
          Something went wrong
        </CommonButton>
      </Box>
      <Box height="48px" />
    </Box>
  );
}
