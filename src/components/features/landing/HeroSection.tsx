"use client";

import * as React from 'react';
import theme from '@/theme';
import Box from '@mui/material/Box';
import CommonButton from '@/components/ui/CommonButton';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Styled component for the Demo image box
const StyledBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  height: 300,
  margin: '72px auto 0',
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  border: '1px solid',
  borderColor: theme.palette.grey[200],
  boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
  backgroundImage: 'url("/demo-image.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  [theme.breakpoints.up('sm')]: {
    width: 1100,
    height: 530,
    marginTop: theme.spacing(10),
  },
  [theme.breakpoints.up('xs')]: {
    height: 700,
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
    backgroundImage: `url("/demo-image.png")`,
    outlineColor: 'hsla(220, 20%, 42%, 0.1)',
    borderColor: theme.palette.grey[700],
  }),
}));

export default function HeroSection() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(136.66666666666669, 81.81818181818188%, 95.68627450980391%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
        }),
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={theme.spacing(2)}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '70%', sm: '100%' } }}
        >
            <Typography
            variant="h1"
            sx={(theme) => ({
              alignItems: 'center',
              color: theme.palette.text.primary,
              fontSize: { xs: theme.typography.h2.fontSize, sm: theme.typography.h1.fontSize },
              fontFamily: theme.typography.h1.fontFamily,
              fontWeight: theme.typography.h1.fontWeight,
              ...theme.applyStyles('dark', {
                color: theme.palette.text.secondary,
              }),
            })}
            >
            Let&nbsp;AI&nbsp;Handle&nbsp;Your&nbsp;Calls
            </Typography>

          <Typography
            variant="h1"
            sx={(theme) => ({
              alignItems: 'center',
              color: theme.palette.text.primary,
              fontSize: { xs: theme.typography.h2.fontSize, sm: theme.typography.h1.fontSize },
              fontFamily: theme.typography.h1.fontFamily,
              fontWeight: theme.typography.h1.fontWeight,
              ...theme.applyStyles('dark', {
                color: theme.palette.text.secondary,
              }),
            })}
          >
            Focus&nbsp;on&nbsp;Growing&nbsp;Your&nbsp;Business
          </Typography>

            <Typography
            sx={{
              textAlign: 'center',
              color: theme.palette.text.primary,
              margin: '32px 0',
              fontSize: { xs: theme.typography.body2.fontSize, sm: theme.typography.body1.fontSize },
              fontFamily: theme.typography.fontFamily,
              fontWeight: 'normal',
            }}
            >
            SmartAgent is your 24/7 virtual phone
            assistant for rental managers, plumbers, contractors,
            and small businesses.<br />
            Answer calls, schedule follow-ups,
            and automate workflows&nbsp;—&nbsp;no human effort needed.
            </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={theme.spacing(5)}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ pt: 2, width: { xs: '90%', sm: '100%' }}}
          >
            <CommonButton
              buttonVariant="black"
              endIcon={<ArrowForwardIcon />}
              sx={
                { minWidth: '250px',
                  height: '56px',
                  fontSize: theme.typography.button.fontSize,
                  fontWeight: theme.typography.button.fontWeight,
                }
              }
            >
              Start Your Free Trial
            </CommonButton>

            <CommonButton
              buttonVariant="green"
              endIcon={<ArrowForwardIcon />}
              sx={
                { minWidth: '250px',
                  height: '56px',
                  fontSize: theme.typography.button.fontSize,
                  fontWeight: theme.typography.button.fontWeight,
                }
              }
            >
              Request a Demo
            </CommonButton>
          </Stack>
        </Stack>

        <StyledBox />

      </Container>
    </Box>
  );
}


