'use client';

import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

const SectionRoot = styled('section')(({ theme }) => ({
  background: '#fafafa',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(8),
  },
}));

const SectionContainer = styled(Container)({
  margin: '0 auto',
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h2,
  textAlign: 'center',
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    marginBottom: theme.spacing(12),
  },
}));

// Base card styles for unified responsive behavior
const BaseCard = styled(Box)(({ theme }) => ({
  background: '#fff',
  borderRadius: 24,
  boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: theme.spacing(4),
  // Unified responsive styles
  '@media (max-width: 1399px)': {
    alignItems: 'center',
    textAlign: 'center',
    width: '95%',
    maxWidth: '600px',
    minWidth: 350,
    margin: '0 auto',
    padding: theme.spacing(3, 6),
    marginBottom: theme.spacing(3),
    minHeight: 420,
    height: 'auto',
  },
  [theme.breakpoints.down('md')]: {
    width: 350,
    minWidth: 350,
    maxWidth: 350,
    margin: '0 auto',
    padding: theme.spacing(3, 10),
    marginBottom: theme.spacing(1),
    minHeight: 400,
  },
}));

const FirstRowCard = styled(BaseCard)(({ theme }) => ({
  width: 690,
  height: 326,
  position: 'relative',
  overflow: 'hidden',
  alignItems: 'center',
  padding: theme.spacing(4, 3),
  '@media (max-width: 1300px)': {
    height: 400,
  },
  '@media (max-width: 1399px)': {
    justifyContent: 'flex-start',
  },
}));

const SecondRowCard = styled(BaseCard)(({ theme }) => ({
  width: 450,
  minHeight: 420,
  padding: theme.spacing(4, 3),
  alignItems: 'flex-start',
}));

const CardTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: 20,
  marginBottom: 8,
});

const CardDesc = styled(Typography)(({ theme }) => ({
  color: '#444',
  fontSize: 14,
  maxWidth: 262,
  marginBottom: theme.spacing(2),
  '@media (max-width: 1399px)': {
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const BackgroundCircle = styled(Box, {
  shouldForwardProp: prop => prop !== 'size',
})<{ size: 'large' | 'small' }>(({ size }) => ({
  margin: 0,
  padding: 0,
  position: 'absolute',
  bottom: 0,
  zIndex: 0,
  pointerEvents: 'none',
  ...(size === 'large' && {
    width: '500px',
    height: '250px',
    backgroundImage: 'linear-gradient(to bottom, #e8f7de 0%, #fff 100%)',
    borderTopLeftRadius: '250px',
    borderTopRightRadius: '250px',
    right: 0,
  }),
  ...(size === 'small' && {
    width: '400px',
    height: '200px',
    backgroundImage: 'linear-gradient(to bottom, #cdefb6 0%,#ffffff)',
    borderTopLeftRadius: '200px',
    borderTopRightRadius: '200px',
    right: 50,
  }),
}));

const CircleBgContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  bottom: 0,
  width: 500,
  height: 246,
  zIndex: 0,
  pointerEvents: 'none',
  '@media (max-width: 1399px)': {
    left: '50%',
    right: 'auto',
    transform: 'translateX(-50%)',
  },
  [theme.breakpoints.down('md')]: {
    left: '50%',
    right: 'auto',
    transform: 'translateX(-50%)',
  },
}));

const PhoneImageContainer = styled(Box)(() => ({
  position: 'absolute',
  left: '50%',
  bottom: 16,
  transform: 'translateX(-50%)',
  width: 121,
  height: 246,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  pointerEvents: 'auto',
  '@media (max-width: 1399px)': {
    bottom: 10,
    zIndex: 2,
  },
}));

const DialogContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  width: 500,
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  '@media (max-width: 1399px)': {
    position: 'static',
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    margin: '0 auto',
    marginTop: theme.spacing(6),
    marginBottom: 0,
  },
  [theme.breakpoints.down('md')]: {
    position: 'static',
    width: '135%',
    maxWidth: 350,
    alignItems: 'center',
    paddingTop: theme.spacing(4),
    marginLeft: '-20%',
    marginTop: theme.spacing(2),
  },
}));

const DialogBubble = styled(Box, {
  shouldForwardProp: prop => prop !== 'isUser',
})<{ isUser?: boolean }>(({ theme, isUser }) => ({
  background: isUser ? '#a8f574' : '#fff',
  borderRadius: 16,
  padding: theme.spacing(1.5, 2.5),
  maxWidth: isUser ? 280 : 276,
  width: 'fit-content',
  fontSize: 'inherit',
  color: isUser ? '#060606' : '#222',
  wordBreak: 'break-word',
  boxShadow: isUser ? 'none' : '0 2px 8px 0 rgba(0,0,0,0.06)',
  [theme.breakpoints.down('md')]: {
    maxWidth: '80%',
  },
}));

const GridContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  margin: '0 auto',
  justifyContent: 'center',
  columnGap: 32,
  rowGap: 32,
  boxSizing: 'border-box',
  '&:first-of-type': {
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(0),
    },
  },
  [theme.breakpoints.down('md')]: {
    paddingBottom: 32,
  },
}));

const ContentWrapper = styled(Box)({
  position: 'relative',
  zIndex: 1,
  width: '100%',
  height: '100%',
});

const ImageContainer = styled(Box)({
  marginTop: 16,
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
});

const StyledImage = styled(Image)({
  width: '100%',
  maxWidth: '100%',
  display: 'block',
  height: 'auto',
});

export default function FeaturesSection() {
  return (
    <SectionRoot>
      <SectionContainer>
        <SectionTitle variant="h2">
          Combined Features & Workflow Section
        </SectionTitle>

        {/* First Row - Feature Cards */}
        <GridContainer>
          <FirstRowCard>
            <CircleBgContainer>
              <BackgroundCircle size="large" />
              <BackgroundCircle size="small" />
              <PhoneImageContainer>
                <Image
                  src="/features/phone.jpg"
                  alt="Phone Mockup"
                  width={121}
                  height={246}
                  style={{ objectFit: 'contain' }}
                />
              </PhoneImageContainer>
            </CircleBgContainer>
            <ContentWrapper>
              <CardTitle>Incoming Call</CardTitle>
              <CardDesc>
                24/7 Auto-Answer; Never miss calls - even at 3am
              </CardDesc>
            </ContentWrapper>
          </FirstRowCard>

          <FirstRowCard>
            <CircleBgContainer>
              <BackgroundCircle size="large" />
              <BackgroundCircle size="small" />
            </CircleBgContainer>
            <ContentWrapper>
              <CardTitle>AI Interaction</CardTitle>
              <CardDesc>
                Worry about missing any important calls? Don't worry. Let AI
                handle it for you.
              </CardDesc>
              <DialogContainer>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Image
                    src="/avatars/AI-avatar.svg"
                    alt="AI Avatar"
                    width={36}
                    height={36}
                    style={{ marginRight: 12, flexShrink: 0 }}
                  />
                  <DialogBubble>
                    <Typography variant="body1" sx={{ color: '#222' }}>
                      Hi, this is your AI Assistant. How can I help today?
                    </Typography>
                  </DialogBubble>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                  }}
                >
                  <DialogBubble isUser sx={{ mr: 1.5 }}>
                    <Typography variant="body1" sx={{ color: '#060606' }}>
                      Make an appointment for maintenance services after hail
                      weather.
                    </Typography>
                  </DialogBubble>
                  <Image
                    src="/avatars/user-avatar.jpg"
                    alt="User Avatar"
                    width={36}
                    height={36}
                    style={{ borderRadius: '50%' }}
                  />
                </Box>
              </DialogContainer>
            </ContentWrapper>
          </FirstRowCard>
        </GridContainer>

        {/* Second Row - Service Cards */}
        <GridContainer>
          <SecondRowCard>
            <CardTitle>Auto Task Creation</CardTitle>
            <CardDesc>
              We write down the job details so you don't have to.
            </CardDesc>
            <ImageContainer>
              <StyledImage
                src="/features/inbox.jpg"
                alt="Inbox Illustration"
                width={303}
                height={180}
              />
            </ImageContainer>
          </SecondRowCard>

          <SecondRowCard>
            <CardTitle>Reminders & Follow-ups</CardTitle>
            <CardDesc>Show SMS/notification bubble.</CardDesc>
            <ImageContainer>
              <StyledImage
                src="/features/calendar.jpg"
                alt="Calendar Illustration"
                width={303}
                height={180}
              />
            </ImageContainer>
          </SecondRowCard>

          <SecondRowCard>
            <CardTitle>History & Management</CardTitle>
            <CardDesc>
              We have prepared your services that need to be done today.
            </CardDesc>
            <ImageContainer>
              <StyledImage
                src="/features/service.jpg"
                alt="Service Illustration"
                width={303}
                height={180}
              />
            </ImageContainer>
          </SecondRowCard>
        </GridContainer>
      </SectionContainer>
    </SectionRoot>
  );
}
