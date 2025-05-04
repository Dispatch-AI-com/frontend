"use client";

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/material/styles';
import * as React from 'react';

import CommonButton from '@/components/ui/CommonButton';

const StyledContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing(12)};
  padding-bottom: ${({ theme }) => theme.spacing(12)};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.values.xs}px) {
    padding-top: ${({ theme }) => theme.spacing(10)};
    padding-bottom: ${({ theme }) => theme.spacing(10)};
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

const StyledHeader = styled('h1')`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: ${({ theme }) => theme.typography.h1.fontSize};
  font-family: ${({ theme }) => theme.typography.h1.fontFamily};
  font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
  margin: 0;
  overflow-wrap: anywhere;

  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    font-size: ${({ theme }) => theme.typography.h2.fontSize};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.values.lg}px) {
    font-size: ${({ theme }) => theme.typography.h1.fontSize};
  }
`;

const StyledTypographyBody = styled('p')`
  text-align: center;
  color: ${({ theme }) => theme.palette.text.primary};
  margin: 32px 0;
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  font-family: ${({ theme }) => theme.typography.fontFamily};

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
  padding-top: ${({ theme }) => theme.spacing(2)};

  @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    flex-direction: row;
    width: 100%;
  }
`;

const StyledDemoBox = styled('div')`
  align-self: center;
  background-color: ${({ theme }) => theme.palette.background.default};
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  border: 1px solid ${({ theme }) => theme.palette.grey[200]};
  box-shadow: 0 0 12px 8px ${({ theme }) => theme.shadows[4]};
  background-image: url('/demo-image.png');
  background-size: cover;
  background-position: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    width: 90%;
    height: auto;
    aspect-ratio: 16 / 9;
    margin-top: ${({ theme }) => theme.spacing(10)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    width: 90%;
    max-width: 700px;
    height: auto;
    aspect-ratio: 16 / 9;
    margin-top: ${({ theme }) => theme.spacing(7)};
  }
`;

export default function HeroSection() {
  return (
    <StyledContainer>
      <StyledStack>
        <StyledHeader>
          Let&nbsp;AI&nbsp;Handle&nbsp;Your&nbsp;Calls
        </StyledHeader>
        <StyledHeader>
          Focus&nbsp;on&nbsp;Growing&nbsp;Your&nbsp;Business
        </StyledHeader>
        <StyledTypographyBody>
          SmartAgent is your 24/7 virtual phone assistant for rental managers, plumbers, contractors,
          and small businesses.<br />
          Answer calls, schedule follow-ups, and automate workflows&nbsp;—&nbsp;no human effort needed.
        </StyledTypographyBody>
        <ButtonStack>
          <CommonButton buttonVariant="black" endIcon={<ArrowForwardIcon />}>
            Start Your Free Trial
          </CommonButton>
          <CommonButton buttonVariant="green" endIcon={<ArrowForwardIcon />}>
            Request a Demo
          </CommonButton>
        </ButtonStack>
      </StyledStack>
      <StyledDemoBox />
    </StyledContainer>
  );
}


