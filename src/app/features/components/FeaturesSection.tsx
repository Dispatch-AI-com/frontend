'use client';

import { Box, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

const SectionRoot = styled('section')(({ theme }) => ({
  background: '#fafafa',
  paddingBottom: theme.spacing(12),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(24),
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
  width: 690,
  height: 326,
  position: 'relative',
  overflow: 'hidden',
  background: '#fff',
  borderRadius: 24,
  boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4, 3),
  marginBottom: theme.spacing(4),
  '@media (max-width: 1300px)': {
    height: 400,
  },
  [theme.breakpoints.down('md')]: {
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    margin: 0,
  },
}));

// 第二行卡片 styled component
const SecondRowCard = styled(Box)(({ theme }) => ({
  width: 450,
  minHeight: 420,
  background: '#fff',
  borderRadius: 24,
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
    margin: 0,
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

const StyledGridContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  margin: '0 auto',
  justifyContent: 'center',
  columnGap: 32,
  rowGap: 48,
  boxSizing: 'border-box',
  [theme.breakpoints.down('md')]: {
    paddingBottom: 64,
  },
}));

export default function FeaturesSection() {
  return (
    <SectionRoot>
      <SectionContainer>
        <SectionTitle variant="h2">
          Combined Features & Workflow Section
        </SectionTitle>
        <StyledGridContainer>
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
                    alignItems: 'center',
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
                  Worry about missing any important calls? Don't worry. Let AI
                  handle it for you.
                </CardDesc>
                <Box
                  sx={theme => ({
                    position: 'absolute',
                    right: 0,
                    width: 500,
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    [theme.breakpoints.down('md')]: {
                      position: 'static',
                      width: 250,
                      alignItems: 'center',
                      mt: 10,
                      mb: 0,
                    },
                  })}
                >
                  {/* AI气泡 */}
                  <Box
                    sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}
                  >
                    {/* AI头像 */}
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: '#060606',
                        color: '#a8f574',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: 20,
                        mr: 1.5,
                        flexShrink: 0,
                      }}
                    >
                      D
                    </Box>
                    {/* 气泡 */}
                    <Box
                      sx={theme => ({
                        background: '#fff',
                        borderRadius: 2,
                        px: 2.5,
                        py: 1.5,
                        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.06)',
                        maxWidth: 276,
                        width: 'fit-content',
                        fontSize: 'inherit',
                        color: '#222',
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        borderBottomRightRadius: 16,
                        borderBottomLeftRadius: 16,
                        wordBreak: 'break-word',
                        [theme.breakpoints.down('md')]: {
                          maxWidth: '80%',
                        },
                      })}
                    >
                      <Typography variant="body1" sx={{ color: '#222' }}>
                        Hi, this is your AI Assistant. How can I help today?
                      </Typography>
                    </Box>
                  </Box>
                  {/* 用户气泡 */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {/* 气泡 */}
                    <Box
                      sx={theme => ({
                        background: '#a8f574',
                        borderRadius: 2,
                        px: 2.5,
                        py: 1.5,
                        maxWidth: 280,
                        width: 'fit-content',
                        fontSize: 'inherit',
                        color: '#060606',
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        borderBottomRightRadius: 16,
                        borderBottomLeftRadius: 16,
                        wordBreak: 'break-word',
                        mr: 1.5,
                        [theme.breakpoints.down('md')]: {
                          maxWidth: '80%',
                        },
                      })}
                    >
                      <Typography variant="body1" sx={{ color: '#060606' }}>
                        Make an appointment for maintenance services after hail
                        weather.
                      </Typography>
                    </Box>
                    {/* 用户头像 */}
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: '#222',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: 14,
                        flexShrink: 0,
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <circle
                          cx="10"
                          cy="10"
                          r="10"
                          fill="#fff"
                          fillOpacity="0.2"
                        />
                      </svg>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </FirstRowCard>
          </Grid>
        </StyledGridContainer>
        <StyledGridContainer>
          <Grid item xs={12} md={4} sx={{ display: 'flex' }}>
            <SecondRowCard>
              <CardTitle>Auto Task Creation</CardTitle>
              <CardDesc>
                We write down the job details so you don't have to.
              </CardDesc>
              <Box mt={2} display="flex" justifyContent="center" width="100%">
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
          <Grid item xs={12} md={4} sx={{ display: 'flex' }}>
            <SecondRowCard>
              <CardTitle>Reminders & Follow-ups</CardTitle>
              <CardDesc>Show SMS/notification bubble.</CardDesc>
              <Box mt={2} display="flex" justifyContent="center" width="100%">
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
          <Grid item xs={12} md={4} sx={{ display: 'flex' }}>
            <SecondRowCard>
              <CardTitle>History & Management</CardTitle>
              <CardDesc>
                We have prepared your services that need to be done today.
              </CardDesc>
              <Box mt={2} display="flex" justifyContent="center" width="100%">
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
        </StyledGridContainer>
      </SectionContainer>
    </SectionRoot>
  );
}
