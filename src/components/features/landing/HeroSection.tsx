"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/900.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Styled component for the Demo image box
const StyledBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: 1100,
  height: 530,
  margin: '72px 51px 0',
  backgroundColor: '#eee',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid',
  borderColor: theme.palette.grey[200],
  boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
  backgroundImage: 'url("/demo-image.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
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
          // pt - padding top
          //sm - small screen
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={1}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: '72px',
              fontFamily: 'Roboto',
              fontWeight: '900',
            }}
          >
            Let&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: 'inherit',
                color: '#a8f574',
                fontWeight: '900',
                ...theme.applyStyles('dark', {
                  color: 'primary.light',
                  fontWeight: '900',
                }),
              })}
            >
              AI
            </Typography>
            &nbsp;Handle&nbsp;Your&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: 'inherit',
                color: '#a8f574',
                fontWeight: '900',
                ...theme.applyStyles('dark', {
                  color: 'primary.light',
                  fontWeight: '900',
                }),
              })}
            >
              Calls
            </Typography>
          </Typography>
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: '72px',
              fontWeight: '900',
              fontFamily: 'Roboto',
            }}
          >
            Focus&nbsp;on&nbsp;Growing&nbsp;Your&nbsp;Business
          </Typography>

          <Typography
            sx={{
              textAlign: 'center',
              color: '#060606',
              width: { xs: '100%', sm: '90%', md: '1062px' },
              margin: '32px 0 56px',
              fontSize: '20px',
              fontFamily: 'Roboto',
              fontWeight: 'normal',
            }}
          >
            SmartAgent is your 24/7 virtual phone
            assistant for rental managers, plumbers, contractors,
            and small businesses.<br />
            Answer calls, schedule follow-ups,
            and automate workflows—no human effort needed.
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ pt: 2, width: { xs: '100%', sm: '350px' } }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                minWidth: '250px', height: '56px', borderRadius: '16px', fontSize: '18px', padding: '16px 24px', backgroundColor: '#060606', textTransform: 'capitalize', fontWeight: 'bold'}}
                endIcon={<ArrowForwardIcon />}
            >
              Start Your Free Trial
            </Button>
            <Button
              variant="contained"
              sx={{
                minWidth: '239px', height: '56px', borderRadius: '16px', fontSize: '18px', padding: '16px 24px', backgroundColor: '#a8f574', textTransform: 'capitalize', fontWeight: 'bold', color: 'black'}}
                endIcon={<ArrowForwardIcon />}
            >
              Request a Demo
            </Button>
          </Stack>
        </Stack>

        <StyledBox id="image" />

      </Container>
    </Box>
  );
}


