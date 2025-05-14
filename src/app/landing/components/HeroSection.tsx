"use client";

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
    padding-top: ${({ theme }) => theme.spacing(12)};
  padding-bottom: ${({ theme }) => theme.spacing(12)};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.values.xs}px) {
    padding-top: ${({ theme }) => theme.spacing(10)};
    padding-bottom: ${({ theme }) => theme.spacing(5)};
  }
`;

const StyledStack = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  width: 70%;

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
`;

const StyledTypographyBody = styled(Typography)`
  text-align: center;
  color: ${({ theme }) => theme.palette.text.primary};
  margin: 32px 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    font-size: ${({ theme }) => theme.typography.body2.fontSize};
    min-width: 1000px;
  }
`;

const ButtonStack = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(7)};

  @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    flex-direction: row;
    width: 100%;
  }
`;

const StyledDemoBox = styled(Box)`
  align-self: center;
  background-color: ${({ theme }) => theme.palette.background.default};
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  border: 1px solid ${({ theme }) => theme.palette.grey[200]};
  box-shadow: 0 0 12px 8px ${({ theme }) => theme.shadows[4]};

  & img {
    width: 100%;
    height: auto;
    display: block;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    width: 90%;
    height: auto;
    aspect-ratio: 16 / 9;
    margin-top: ${({ theme }) => theme.spacing(10)};
  }
`;

export default function HeroSection() {
  return (
    <StyledContainer>
      <StyledStack>
        <StyledHeader sx={{marginTop: theme.spacing(10)}} variant="h1" color="text.primary">
          Let AI Handle Your Calls
        </StyledHeader>
        <StyledHeader variant="h1" color="text.primary">
          Focus on Growing Your Business
        </StyledHeader>
        <StyledTypographyBody variant='body1' color="text.primary">
          SmartAgent is your 24/7 virtual phone assistant for rental managers, plumbers, contractors,
          and small businesses.<br />
          Answer calls, schedule follow-ups, and automate workflows&nbsp;—&nbsp;no human effort needed.
        </StyledTypographyBody>
        <ButtonStack>
          <CommonButton buttonVariant="black" endIcon={<ArrowForwardIcon />} sx={{height: '48px'}}>
            Start Your Free Trial
          </CommonButton>
          <CommonButton buttonVariant="green" endIcon={<ArrowForwardIcon />} sx={{height: '48px'}}>
            Request a Demo
          </CommonButton>
        </ButtonStack>
      </StyledStack>
      <StyledDemoBox>
        <Image
          src="/demo-image.png"
          alt="Demo"
          width={1920}
          height={1080}
        />
      </StyledDemoBox>
    </StyledContainer>
  );
}


