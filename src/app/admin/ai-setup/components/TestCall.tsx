'use client';

import { Box, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import CommonButton from '@/components/ui/CommonButton';

const Title = styled(Typography)({
  fontFamily: 'Roboto, sans-serif',
  fontSize: '20px',
  fontWeight: 700,
  color: '#060606',
  marginBottom: '32px',
});

const Section = styled(Box)(({ theme: _theme }) => ({
  width: '100%',
  maxWidth: 700,
  marginBottom: '24px',
  textAlign: 'left',
}));

const SectionTitle = styled(Typography)({
  fontFamily: 'Roboto, sans-serif',
  fontSize: '16px',
  fontWeight: 700,
  color: '#060606',
  marginBottom: '8px',
});

const BodyText = styled(Typography)({
  fontFamily: 'Roboto, sans-serif',
  fontSize: '14px',
  color: '#060606',
  lineHeight: 1.5,
});

const ButtonRow = styled(Box)(({ theme: _theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 16,
  marginTop: _theme.spacing(4),
  [_theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: 8,
    width: '100%',
    alignItems: 'stretch',
  },
}));

interface TestCallProps {
  onBack: () => void;
  onGoToDashboard: () => void;
}

export default function TestCall({ onBack, onGoToDashboard }: TestCallProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      pt={0}
      sx={{
        width: '100%',
        maxWidth: 900,
        px: { xs: 2, sm: 3, md: 4 },
        height: '100%',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 160px)',
      }}
    >
      <Title
        sx={{
          textAlign: 'center',
          mx: 'auto',
        }}
      >
        Let's test! Get a friend or family member to give you a call.
      </Title>

      <Section>
        <BodyText>
          But <b>don't answer</b>, let it ring out or just hang up.
        </BodyText>
        <BodyText sx={{ mt: 2 }}>Let Dispatch AI take the call!</BodyText>
      </Section>

      <Section>
        <SectionTitle>Finished testing?</SectionTitle>
        <BodyText>
          You can further customise Dispatch AI and manage your account from
          your Dispatch AI portal.
        </BodyText>
      </Section>

      <Section>
        <SectionTitle>Dispatch AI Didn't Pick Up?</SectionTitle>
        <BodyText>
          Did you hear your regular voicemail instead of Dispatch AI? We can
          help troubleshooting the most common issues. Please follow{' '}
          <Link
            href="#"
            underline="always"
            sx={{
              color: '#060606',
              fontWeight: 'bold',
              textDecorationThickness: '2px',
              textDecorationColor: '#060606',
              '&:hover': {
                color: '#1976d2',
                textDecorationColor: '#1976d2',
              },
            }}
          >
            <b>our Troubleshooting steps here</b>
          </Link>
          .
        </BodyText>
      </Section>

      <Section>
        <SectionTitle>My Phone Didn't Ring?</SectionTitle>
        <BodyText>
          Did Dispatch AI pick up before your phone rang? We can help
          troubleshoot the most common issues. Please follow{' '}
          <Link
            href="#"
            underline="always"
            sx={{
              color: '#060606',
              fontWeight: 'bold',
              textDecorationThickness: '2px',
              textDecorationColor: '#060606',
              '&:hover': {
                color: '#1976d2',
                textDecorationColor: '#1976d2',
              },
            }}
          >
            <b>our Troubleshooting steps here</b>
          </Link>
          .
        </BodyText>
      </Section>

      <ButtonRow>
        <CommonButton
          sx={{
            width: 88,
            height: 40,
            borderRadius: 1,
            background: '#fff',
            color: '#060606',
            border: '1px solid #bbb',
            boxShadow: 'none',
            '&:hover': {
              background: '#fafafa',
            },
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
            background: '#060606',
            color: '#ffffff',
            '&:hover': {
              background: '#202020',
            },
          }}
          onClick={onGoToDashboard}
        >
          Go to Dashboard
        </CommonButton>
      </ButtonRow>
    </Box>
  );
}
