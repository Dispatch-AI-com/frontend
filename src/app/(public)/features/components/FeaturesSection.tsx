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
  [theme.breakpoints.down('md')]: {
    paddingTop: 0,
    paddingBottom: 0,
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
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(3),
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
  position: 'relative',
  overflow: 'hidden',
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
    marginBottom: theme.spacing(2),
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
  [theme.breakpoints.down('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(3, 3),
    justifyContent: 'flex-start',
  },
}));

const SecondRowCard = styled(BaseCard)(({ theme }) => ({
  width: 450,
  minHeight: 420,
  padding: theme.spacing(4, 3),
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(3, 3),
  },
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 20,
  marginBottom: 8,
  [theme.breakpoints.down('md')]: {
    textAlign: 'left',
    marginBottom: theme.spacing(1),
  },
}));

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
    textAlign: 'left',
    marginLeft: 0,
    marginRight: 0,
    maxWidth: 'none',
    marginBottom: theme.spacing(1),
  },
}));

const BackgroundCircle = styled(Box, {
  shouldForwardProp: prop => prop !== 'size',
})<{ size: 'large' | 'small' }>(({ size, theme }) => ({
  margin: 0,
  padding: 0,
  position: 'absolute',
  bottom: 0,
  zIndex: 0,
  pointerEvents: 'none',
  ...(size === 'large' && {
    width: '500px',
    height: '280px',
    backgroundImage: 'url(/features/cardbg-l.svg)',
    backgroundSize: 'contain',
    backgroundPosition: 'bottom center',
    backgroundRepeat: 'no-repeat',
    right: '0px',
  }),
  ...(size === 'small' && {
    width: '400px',
    height: '220px',
    backgroundImage: 'url(/features/cardbg-l.svg)',
    backgroundSize: 'contain',
    backgroundPosition: 'bottom center',
    backgroundRepeat: 'no-repeat',
    right: '50px',
  }),
  // Mobile optimization
  [theme.breakpoints.down('md')]: {
    ...(size === 'large' && {
      width: '100%',
      height: '70%',
      backgroundImage: 'url(/features/cardbg-s.svg)',
      backgroundSize: 'contain',
      left: '0',
      right: '0',
    }),
    ...(size === 'small' && {
      width: '80%',
      height: '60%',
      backgroundImage: 'url(/features/cardbg-s.svg)',
      backgroundSize: 'contain',
      left: '10%',
      right: '10%',
    }),
  },
}));

const CircleBgContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  bottom: 0,
  width: 500,
  height: 280,
  zIndex: 0,
  pointerEvents: 'none',
  '@media (max-width: 1399px)': {
    left: '50%',
    right: 'auto',
    transform: 'translateX(-50%)',
  },
  [theme.breakpoints.down('md')]: {
    left: '0',
    right: '0',
    transform: 'none',
    width: '100%',
    height: '70%',
  },
}));

const PhoneImageContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  bottom: 30,
  transform: 'translateX(-50%)',
  width: 121,
  height: 246,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  pointerEvents: 'auto',
  '@media (max-width: 1399px)': {
    bottom: 40,
    zIndex: 2,
  },
  [theme.breakpoints.down('md')]: {
    width: 100,
    height: 200,
    bottom: 45,
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
    width: '100%',
    maxWidth: '100%',
    alignItems: 'stretch',
    margin: '0',
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 1),
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
    maxWidth: isUser ? '85%' : '85%',
    padding: theme.spacing(1.5, 2),
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
  '&:last-of-type': {
    [theme.breakpoints.down('md')]: {
      paddingBottom: theme.spacing(4),
    },
  },
  [theme.breakpoints.down('md')]: {
    paddingBottom: 16,
    rowGap: 0,
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  width: '100%',
  height: '100%',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: theme.spacing(1),
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  marginTop: 20,
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  position: 'relative',
  zIndex: 1,
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
    marginTop: 0,
  },
}));

const StyledImage = styled(Image)(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
  display: 'block',
  height: 'auto',
  [theme.breakpoints.down('md')]: {
    width: '90%',
    height: 'auto',
  },
}));

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
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <BackgroundCircle size="large" />
              </Box>
              <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <BackgroundCircle size="large" />
              </Box>
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
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <BackgroundCircle size="large" />
              </Box>
              <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <BackgroundCircle size="large" />
              </Box>
            </CircleBgContainer>
            <ContentWrapper>
              <CardTitle>AI Interaction</CardTitle>
              <CardDesc>
                Worry about missing any important calls? Don't worry. Let AI
                handle it for you.
              </CardDesc>
              <DialogContainer>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  <Image
                    src="/avatars/AI-avatar.svg"
                    alt="AI Avatar"
                    width={36}
                    height={36}
                    style={{ marginRight: 12, flexShrink: 0 }}
                  />
                  <DialogBubble>
                    <Typography
                      variant="body1"
                      sx={{ color: '#222', textAlign: 'left' }}
                    >
                      Hi, this is your AI Assistant. How can I help today?
                    </Typography>
                  </DialogBubble>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                    position: 'relative',
                  }}
                >
                  <DialogBubble isUser sx={{ mr: 1.5 }}>
                    <Typography
                      variant="body1"
                      sx={{ color: '#060606', textAlign: 'left' }}
                    >
                      Make an appointment for maintenance services after hail
                      weather.
                    </Typography>
                  </DialogBubble>
                  <Image
                    src="/avatars/user-avatar.jpg"
                    alt="User Avatar"
                    width={36}
                    height={36}
                    style={{
                      borderRadius: '50%',
                      alignSelf: 'flex-start',
                    }}
                  />
                </Box>
              </DialogContainer>
            </ContentWrapper>
          </FirstRowCard>
        </GridContainer>

        {/* Second Row - Service Cards */}
        <GridContainer>
          <SecondRowCard>
            <CircleBgContainer>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <BackgroundCircle size="large" />
              </Box>
              <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <BackgroundCircle size="large" />
              </Box>
            </CircleBgContainer>
            <ContentWrapper>
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
            </ContentWrapper>
          </SecondRowCard>

          <SecondRowCard>
            <CircleBgContainer>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <BackgroundCircle size="large" />
              </Box>
              <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <BackgroundCircle size="large" />
              </Box>
            </CircleBgContainer>
            <ContentWrapper>
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
            </ContentWrapper>
          </SecondRowCard>

          <SecondRowCard>
            <CircleBgContainer>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <BackgroundCircle size="large" />
              </Box>
              <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <BackgroundCircle size="large" />
              </Box>
            </CircleBgContainer>
            <ContentWrapper>
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
            </ContentWrapper>
          </SecondRowCard>
        </GridContainer>
      </SectionContainer>
    </SectionRoot>
  );
}
