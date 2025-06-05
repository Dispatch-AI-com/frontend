'use client';

import { Box, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

const SectionRoot = styled('section')(({ theme }) => ({
  background: '#fafafa',
  paddingBottom: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(12),
  },
}));

const SectionContainer = styled(Container)(() => ({
  maxWidth: 1440,
  margin: '0 auto',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h2,
  textAlign: 'center',
  fontWeight: 900,
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    marginBottom: theme.spacing(12),
  },
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 20,
  marginBottom: theme.spacing(1),
}));

const CardDesc = styled(Typography)(({ theme }) => ({
  color: '#444',
  fontSize: 14,
  maxWidth: 262,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

// 大半圆 styled component
const LargeHalfCircle = styled(Box)(() => ({
  width: '500px',
  height: '250px',
  margin: '0',
  padding: '0',
  backgroundImage: 'linear-gradient(to bottom, #e8f7de 0%, #fff 100%)',
  borderTopLeftRadius: '250px',
  borderTopRightRadius: '250px',
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  position: 'absolute',
  right: 0,
  bottom: 0,
  zIndex: 0,
  pointerEvents: 'none',
}));

// 小半圆 styled component
const SmallCircle = styled(Box)(() => ({
  width: '400px',
  height: '200px',
  margin: '0',
  padding: '0',
  backgroundImage: 'linear-gradient(to bottom, #cdefb6 0%,#ffffff)',
  borderTopLeftRadius: '200px',
  borderTopRightRadius: '200px',
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  position: 'absolute',
  right: 50,
  bottom: 0,
  zIndex: 0,
  pointerEvents: 'none',
}));

// 第一行卡片 styled component
const FirstRowCard = styled(Box)(({ theme }) => ({
  width: 704,
  maxWidth: '100%',
  margin: '0 auto',
  height: 326,
  position: 'relative',
  overflow: 'hidden',
  background: '#fff',
  borderRadius: 20,
  boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: theme.spacing(4, 3),
  marginBottom: theme.spacing(4),
  '@media (max-width: 1300px)': {
    height: 400,
  },
  [theme.breakpoints.down('md')]: {
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

// 第二行卡片 styled component
const SecondRowCard = styled(Box)(({ theme }) => ({
  width: 458,
  maxWidth: '100%',
  margin: '0 auto',
  minHeight: 220,
  background: '#fff',
  borderRadius: 20,
  boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
  padding: theme.spacing(4, 3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

// 半圆背景容器 styled component
const CircleBgContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  bottom: 0,
  width: 500,
  height: 246,
  zIndex: 0,
  pointerEvents: 'none',
  [theme.breakpoints.down('md')]: {
    left: '50%',
    right: 'auto',
    transform: 'translateX(-50%)',
  },
}));

export default function FeaturesSection() {
  return (
    <SectionRoot>
      <SectionContainer>
        <SectionTitle variant="h2">
          Combined Features & Workflow Section
        </SectionTitle>
        <Grid container spacing={4}>
          {/* 第一行两张卡 */}
          <Box sx={{ margin: '0 auto', width: '100%' }}>
            <Grid container spacing={4} justifyContent="center" px={2}>
              <Grid item xs={12} md={6}>
                <FirstRowCard>
                  <CircleBgContainer>
                    <LargeHalfCircle
                      style={{ position: 'absolute', right: 0, bottom: 0 }}
                    />
                    <SmallCircle
                      style={{ position: 'absolute', right: 50, bottom: 0 }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        left: '50%',
                        bottom: 16,
                        transform: 'translateX(-50%)',
                        width: 121,
                        height: 246,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        pointerEvents: 'auto',
                      }}
                    >
                      <Image
                        src="/features/phone.jpg"
                        alt="Phone Mockup"
                        width={121}
                        height={246}
                        style={{
                          objectFit: 'contain',
                        }}
                      />
                    </Box>
                  </CircleBgContainer>
                  <Box
                    sx={{
                      position: 'relative',
                      zIndex: 1,
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <CardTitle>Incoming Call</CardTitle>
                    <CardDesc>
                      24/7 Auto-Answer; Never miss calls - even at 3am
                    </CardDesc>
                  </Box>
                </FirstRowCard>
              </Grid>
              <Grid item xs={12} md={6}>
                <FirstRowCard>
                  <CircleBgContainer>
                    <LargeHalfCircle
                      style={{ position: 'absolute', right: 0, bottom: 0 }}
                    />
                    <SmallCircle
                      style={{ position: 'absolute', right: 50, bottom: 0 }}
                    />
                  </CircleBgContainer>
                  <Box sx={{ position: 'relative', zIndex: 1, width: '100%' }}>
                    <CardTitle>AI Interaction</CardTitle>
                    <CardDesc>
                      Worry about missing any important calls? Don't worry. Let
                      AI handle it for you.
                    </CardDesc>
                  </Box>
                </FirstRowCard>
              </Grid>
            </Grid>
          </Box>
          {/* 第二行三张卡 */}
          <Box sx={{ width: '100%' }}>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={4} sx={{ display: 'flex', width: '100%' }}>
                <SecondRowCard>
                  <CardTitle>Auto Task Creation</CardTitle>
                  <CardDesc>
                    We write down the job details so you don't have to.
                  </CardDesc>
                  <Box
                    mt={2}
                    display="flex"
                    justifyContent="center"
                    width="100%"
                  >
                    <Image
                      src="/features/inbox.jpg"
                      alt="Inbox Illustration"
                      width={303}
                      height={180}
                      style={{
                        width: '100%',
                        maxWidth: '100%',
                        display: 'block',
                        height: 'auto',
                      }}
                    />
                  </Box>
                </SecondRowCard>
              </Grid>
              <Grid item xs={12} md={4} sx={{ display: 'flex', width: '100%' }}>
                <SecondRowCard>
                  <CardTitle>Reminders & Follow-ups</CardTitle>
                  <CardDesc>Show SMS/notification bubble.</CardDesc>
                  <Box
                    mt={2}
                    display="flex"
                    justifyContent="center"
                    width="100%"
                  >
                    <Image
                      src="/features/calendar.jpg"
                      alt="Calendar Illustration"
                      width={303}
                      height={180}
                      style={{
                        width: '100%',
                        maxWidth: '100%',
                        display: 'block',
                        height: 'auto',
                      }}
                    />
                  </Box>
                </SecondRowCard>
              </Grid>
              <Grid item xs={12} md={4} sx={{ display: 'flex', width: '100%' }}>
                <SecondRowCard>
                  <CardTitle>History & Management</CardTitle>
                  <CardDesc>
                    We have prepared your services that need to be done today.
                  </CardDesc>
                  <Box
                    mt={2}
                    display="flex"
                    justifyContent="center"
                    width="100%"
                  >
                    <Image
                      src="/features/service.jpg"
                      alt="Service Illustration"
                      width={303}
                      height={180}
                      style={{
                        width: '100%',
                        maxWidth: '100%',
                        display: 'block',
                        height: 'auto',
                      }}
                    />
                  </Box>
                </SecondRowCard>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </SectionContainer>
    </SectionRoot>
  );
}
