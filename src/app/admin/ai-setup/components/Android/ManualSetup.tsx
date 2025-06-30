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
    BACKGROUND: '#fafafa',
    BORDER: '#bbb',
    WHITE: '#ffffff',
    HOVER: '#fafafa',
    HOVER_DARK: '#202020',
    HOVER_GRAY: '#bdbdbd',
    SUCCESS_BG: '#e5fcd5',
    CHIP_BG: '#616161',
  },
  SIZES: {
    CONTAINER_WIDTH: '678px',
    TEXT_MAX_WIDTH: '350px',
    BUTTON_HEIGHT: 40,
    BACK_BUTTON_WIDTH: 88,
    ACTION_BUTTON_WIDTH: 216,
    CHIP_WIDTH: '127.5px',
    CHIP_HEIGHT: '36px',
    PHONE_ICON_SIZE: 60,
    STEP_IMAGE_WIDTH: 110,
    STEP_IMAGE_HEIGHT: 228,
    ICON_CONTAINER_WIDTH: 110,
  },
  SPACING: {
    CARD_PADDING: '24px',
    CARD_MARGIN: '16px',
    BORDER_RADIUS: '16px',
    SUCCESS_BORDER_RADIUS: '24px',
    SUCCESS_PADDING: '8px 20px',
    CHIP_BORDER_RADIUS: '18px',
    GAP: 2,
    BOTTOM_SPACING: '48px',
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
    description: 'Open the "Dialer" in the default "Phone" app on your device.',
    image: {
      src: '/dashboard/ai-setup/MS_step1_phone.png',
      alt: 'Phone icon',
      width: CONSTANTS.SIZES.PHONE_ICON_SIZE,
      height: CONSTANTS.SIZES.PHONE_ICON_SIZE,
      label: 'Phone',
      color: CONSTANTS.COLORS.SECONDARY,
    },
  },
  {
    id: 2,
    label: 'step 2:',
    description:
      'Enter the following phone number, including * and # characters, and press the call button.',
    image: {
      src: '/dashboard/ai-setup/A_IS_step2.png',
      alt: 'Dial number on Android',
      width: CONSTANTS.SIZES.STEP_IMAGE_WIDTH,
      height: CONSTANTS.SIZES.STEP_IMAGE_HEIGHT,
    },
  },
  {
    id: 3,
    label: 'step 3:',
    description: 'Success screen',
    isChip: true,
    chipText: 'MMI code started.',
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
  marginBottom: CONSTANTS.SPACING.CARD_MARGIN,
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
  width: CONSTANTS.SIZES.CONTAINER_WIDTH,
  boxSizing: 'border-box',
  [theme.breakpoints.down('md')]: {
    width: '95%',
    flexDirection: 'column',
    alignItems: 'stretch',
    textAlign: 'center',
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

interface AndroidManualSetupProps {
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
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    sx={{ width: CONSTANTS.SIZES.ICON_CONTAINER_WIDTH }}
  >
    <Image src={src} alt={alt} width={width} height={height} />
    <Typography
      fontSize={CONSTANTS.TYPOGRAPHY.BODY_SIZE}
      color={color}
      fontFamily={CONSTANTS.TYPOGRAPHY.FONT_FAMILY}
      mt={0.5}
      mb={0}
      align="center"
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

const MmiCodeChip = styled(Box)({
  width: CONSTANTS.SIZES.CHIP_WIDTH,
  height: CONSTANTS.SIZES.CHIP_HEIGHT,
  background: CONSTANTS.COLORS.CHIP_BG,
  color: CONSTANTS.COLORS.WHITE,
  borderRadius: CONSTANTS.SPACING.CHIP_BORDER_RADIUS,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: CONSTANTS.TYPOGRAPHY.FONT_FAMILY,
  fontSize: '12px',
});

export default function AndroidManualSetup({
  onSuccess,
  onBack,
  onFailure,
}: AndroidManualSetupProps) {
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
    <Box display="flex" flexDirection="column" alignItems="center" pt={0}>
      <Title>Manual setup</Title>

      <StepCard>
        <StepTextContainer>
          <StepLabel>{STEPS[0].label}</StepLabel>
          <StepDescription>
            Open the "Dialer" in the default "Phone" app on your device.
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
            <IconWithLabel {...STEPS[0].image} />
          </Box>
        ) : (
          <IconWithLabel {...STEPS[0].image} />
        )}
      </StepCard>

      <StepCard>
        <StepTextContainer>
          <StepLabel>{STEPS[1].label}</StepLabel>
          <StepDescription>
            Enter the following phone number, including * and # characters, and
            press the call button.
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

      <FinalDescription>
        If everything is set up you'll see{' '}
        <b>a small popup saying "MMI code started".</b>
      </FinalDescription>

      <StepCard sx={{ justifyContent: 'center' }}>
        {isMdDown ? (
          <Box
            sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            <MmiCodeChip>{STEPS[2].chipText}</MmiCodeChip>
          </Box>
        ) : (
          <MmiCodeChip>{STEPS[2].chipText}</MmiCodeChip>
        )}
      </StepCard>

      <Box
        display="flex"
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
            padding: '10px 77px 10px 76px',
            fontSize: 'inherit',
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
            '&:hover': { background: CONSTANTS.COLORS.HOVER_GRAY },
          }}
          onClick={onFailure}
        >
          Something went wrong
        </CommonButton>
      </Box>
      <Box height={CONSTANTS.SPACING.BOTTOM_SPACING} />
    </Box>
  );
}
