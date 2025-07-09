'use client';

import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

import CommonButton from '@/components/ui/CommonButton';

const CONSTANTS = {
  COLORS: {
    PRIMARY: '#060606',
    SECONDARY: '#6d6d6d',
    BACKGROUND: '#fafafa',
    BORDER: '#bbb',
    WHITE: '#ffffff',
    HOVER: '#fafafa',
    HOVER_DARK: '#202020',
  },
  SIZES: {
    CONTAINER_WIDTH: '678px',
    CARD_HEIGHT: '124px',
    TEXT_MAX_WIDTH: '350px',
    BUTTON_HEIGHT: 40,
    BACK_BUTTON_WIDTH: 88,
    NEXT_BUTTON_WIDTH: 216,
  },
  SPACING: {
    CARD_PADDING: '11px 24px',
    CARD_MARGIN: '20px',
    BORDER_RADIUS: '16px',
    GAP: 2,
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
    description: 'Open the Settings app on your iPhone.',
    image: '/dashboard/ai-setup/DLV_step1.png',
    width: 60,
    height: 60,
    showSettingsLabel: true,
    marginRight: 7,
  },
  {
    id: 2,
    label: 'step 2:',
    description:
      'Navigate to the Live Voicemail settings by tapping on the search bar at the top of the settings app, and searching for "Live Voicemail".',
    image: '/dashboard/ai-setup/DLV_step2.png',
    width: 166,
    height: 102,
    showSettingsLabel: false,
    marginRight: 0,
  },
  {
    id: 3,
    label: 'step 3:',
    description:
      'Toggle the switch off to disable LiveVoicemail as shown below.',
    image: '/dashboard/ai-setup/DLV_step3.png',
    width: 166,
    height: 102,
    showSettingsLabel: false,
    marginRight: 0,
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
  marginBottom: '8px',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
    marginBottom: '6px',
  },
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  ...commonTypographyStyles,
  fontSize: CONSTANTS.TYPOGRAPHY.BODY_SIZE,
  marginBottom: '32px',
  textAlign: 'left',
  width: '100%',
  maxWidth: CONSTANTS.SIZES.CONTAINER_WIDTH,
  [theme.breakpoints.down('sm')]: {
    fontSize: '13px',
    marginBottom: '24px',
    padding: '0 16px',
  },
}));

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
  maxWidth: CONSTANTS.SIZES.CONTAINER_WIDTH,
  height: CONSTANTS.SIZES.CARD_HEIGHT,
  boxSizing: 'border-box',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    height: 'auto',
    minHeight: '120px',
    padding: '16px',
    marginBottom: '16px',
    borderRadius: '12px',
  },
}));

const StepTextContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: CONSTANTS.SIZES.TEXT_MAX_WIDTH,
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    marginBottom: '12px',
    textAlign: 'center',
  },
}));

const StepLabel = styled(Typography)(({ theme }) => ({
  ...commonTypographyStyles,
  fontSize: CONSTANTS.TYPOGRAPHY.BODY_SIZE,
  fontWeight: 700,
  marginBottom: '8px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '13px',
    marginBottom: '6px',
  },
}));

const StepDescription = styled(Typography)(({ theme }) => ({
  ...commonTypographyStyles,
  fontSize: CONSTANTS.TYPOGRAPHY.BODY_SIZE,
  [theme.breakpoints.down('sm')]: {
    fontSize: '13px',
    lineHeight: 1.4,
  },
}));

const SettingsLabel = styled(Typography)(({ theme }) => ({
  ...commonTypographyStyles,
  fontSize: CONSTANTS.TYPOGRAPHY.BODY_SIZE,
  color: CONSTANTS.COLORS.SECONDARY,
  textAlign: 'center',
  marginTop: '4px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    marginTop: '2px',
  },
}));

const Note = styled(Typography)(({ theme }) => ({
  ...commonTypographyStyles,
  fontSize: CONSTANTS.TYPOGRAPHY.BODY_SIZE,
  marginTop: '0px',
  marginBottom: '48px',
  width: '100%',
  maxWidth: CONSTANTS.SIZES.CONTAINER_WIDTH,
  textAlign: 'left',
  [theme.breakpoints.down('sm')]: {
    fontSize: '13px',
    marginBottom: '32px',
    padding: '0 16px',
    lineHeight: 1.4,
  },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(CONSTANTS.SPACING.GAP),
  width: '100%',
  maxWidth: CONSTANTS.SIZES.CONTAINER_WIDTH,
  justifyContent: 'center',
  padding: '0 16px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
}));

const StyledButton = styled(CommonButton)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100% !important',
    maxWidth: '280px',
  },
}));

interface DisableLiveVoicemailProps {
  onNext: () => void;
  onBack: () => void;
}

interface StepProps {
  step: (typeof STEPS)[number];
  isFirst: boolean;
  isMobile: boolean;
}

const Step = ({ step, isFirst, isMobile }: StepProps) => (
  <StepCard sx={isFirst ? { marginBottom: '20px', marginTop: '-8px' } : {}}>
    <StepTextContainer>
      <StepLabel>{step.label}</StepLabel>
      {step.id === 2 ? (
        <StepDescription>
          {isMobile ? (
            'Navigate to the Live Voicemail settings by tapping on the search bar at the top of the settings app, and searching for "Live Voicemail".'
          ) : (
            <>
              Navigate to the Live Voicemail settings by tapping <br /> on the
              search bar at the top of the settings app, <br /> and searching
              for "Live Voicemail".
            </>
          )}
        </StepDescription>
      ) : step.id === 3 ? (
        <StepDescription>
          {isMobile ? (
            'Toggle the switch off to disable LiveVoicemail as shown below.'
          ) : (
            <>
              Toggle the switch off to disable LiveVoicemail as <br /> shown
              below.
            </>
          )}
        </StepDescription>
      ) : (
        <StepDescription>{step.description}</StepDescription>
      )}
    </StepTextContainer>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={step.marginRight && !isMobile ? { mr: step.marginRight } : {}}
    >
      <Image
        src={step.image}
        alt={step.label}
        width={step.width}
        height={step.height}
      />
      {step.showSettingsLabel && <SettingsLabel>Settings</SettingsLabel>}
    </Box>
  </StepCard>
);

export default function DisableLiveVoicemail({
  onNext,
  onBack,
}: DisableLiveVoicemailProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      pt={0}
      sx={{
        width: '100%',
        maxWidth: CONSTANTS.SIZES.CONTAINER_WIDTH,
        px: isMobile ? 2 : 0,
      }}
    >
      <Title>Disabling Live Voicemail</Title>
      <SubTitle>
        The iPhone live Voicemail setting will interfere with Lucy. Before
        continuing we need to disable it. To do this:
      </SubTitle>

      {STEPS.map((step, index) => (
        <Step
          key={step.id}
          step={step}
          isFirst={index === 0}
          isMobile={isMobile}
        />
      ))}

      <Note>
        <b>Note:</b>
        <br />
        live Voicemail is not available on all iPhones. If there is no Live
        Voicemail option, you can continue without needing to make any changes.
      </Note>

      <ButtonContainer>
        <StyledButton
          sx={{
            width: isMobile ? '100%' : CONSTANTS.SIZES.BACK_BUTTON_WIDTH,
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
        </StyledButton>
        <StyledButton
          sx={{
            width: isMobile ? '100%' : CONSTANTS.SIZES.NEXT_BUTTON_WIDTH,
            height: CONSTANTS.SIZES.BUTTON_HEIGHT,
            borderRadius: 1,
            background: CONSTANTS.COLORS.PRIMARY,
            color: CONSTANTS.COLORS.WHITE,
            '&:hover': { background: CONSTANTS.COLORS.HOVER_DARK },
          }}
          onClick={onNext}
        >
          I've disabled live voicemail
        </StyledButton>
      </ButtonContainer>
    </Box>
  );
}
