'use client';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import * as React from 'react';

import CommonButton from '@/components/ui/CommonButton';
import theme from '@/theme';

const StyledContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing(7.5)};
  padding-bottom: ${({ theme }) => theme.spacing(5)};

  @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    padding-top: ${({ theme }) => theme.spacing(10)};
  }
`;

const StyledStack = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  width: 70%;

  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm - 1}px) {
    width: 100%;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing(1)};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    width: 100%;
  }
`;

const StyledHeader = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  width: 100%;
  text-align: center;
  white-space: normal;
  max-width: 100%;
  line-height: 1.2;

  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm - 1}px) {
    text-align: left;
    justify-content: flex-start;
    font-size: 28px;
    letter-spacing: -1.5px;
  }
`;

const StyledTypographyBody = styled(Typography)`
  text-align: center;
  margin: 32px 0;
  word-break: break-word;

  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm - 1}px) {
    text-align: left;
    margin: 16px 0;

    .sm-only-br {
      display: none;
    }
  }
`;

const ButtonStack = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(7)};

  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm - 1}px) {
    width: 100%;
    align-items: stretch;
    gap: ${({ theme }) => theme.spacing(2)};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    flex-direction: row;
    width: 100%;
  }
`;

const StyledDemoBox = styled(Box)`
  align-self: center;
  background-color: ${({ theme }) => theme.palette.background.default};
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  box-shadow: 0 0 12px 8px ${({ theme }) => theme.shadows[4]};
  padding: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    width: 85%;
    height: auto;
    display: block;
    border-radius: 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm - 1}px) {
    width: 100%;
    height: 215px;
    padding: 0;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    width: 90%;
    height: auto;
    aspect-ratio: 16 / 9;
    margin-top: ${({ theme }) => theme.spacing(10)};
  }
`;

const RoundedImage = styled(Image)`
  border-radius: 16px;
`;

export default function HeroSection() {
  return (
    <StyledContainer>
      <StyledStack>
        <StyledHeader
          sx={{
            marginTop: 0,
            [theme.breakpoints.up('md')]: {
              marginTop: theme.spacing(10),
            },
          }}
          variant="h1"
          color="text.primary"
        >
          Let AI Handle Your Calls
        </StyledHeader>
        <StyledHeader variant="h1" color="text.primary">
          Focus on Growing Your Business
        </StyledHeader>
        <StyledTypographyBody variant="body1" color="text.primary">
          SmartAgent is your 24/7 virtual phone assistant for rental managers,
          plumbers, contractors, and small businesses.
          <span className="sm-only-br">
            <br />
          </span>
          Answer calls, schedule follow-ups, and automate
          workflows&nbsp;—&nbsp;no human effort needed.
        </StyledTypographyBody>
        <ButtonStack>
          <CommonButton
            buttonVariant="black"
            endIcon={<ArrowForwardIcon />}
            sx={{
              height: '48px',
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Start Your Free Trial
          </CommonButton>
          <CommonButton
            buttonVariant="green"
            endIcon={<ArrowForwardIcon />}
            sx={{
              height: '48px',
              width: { xs: '100%', sm: 'auto' },
              marginBottom: { xs: '16px', sm: '0' },
            }}
          >
            Request a Demo
          </CommonButton>
        </ButtonStack>
      </StyledStack>
      <StyledDemoBox>
        <RoundedImage
          src="/landing/herosection-image-1.png"
          alt="Demo"
          width={1920}
          height={1080}
        />
      </StyledDemoBox>
    </StyledContainer>
  );
}
