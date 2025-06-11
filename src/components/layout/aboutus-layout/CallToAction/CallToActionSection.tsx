'use client';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Stack } from '@mui/material';
import React from 'react';

import { HeaderText } from '@/app/(public)/about/components/AboutBanner';
import {
  CallToActionText,
  CallToActionTitle,
  CallToActionWrapper,
  SocialMediaButton,
} from '@/app/(public)/about/components/CallToAction';

const CallToActionSection = () => {
  return (
    <CallToActionWrapper>
      <CallToActionTitle>Want to work with us?</CallToActionTitle>
      <HeaderText>
        Email us at{' '}
        <a
          href="mailto:hello@jiangren.com.au"
          style={{ color: '#a8f574', textDecoration: 'underline' }}
        >
          hello@jiangren.com.au
        </a>{' '}
        with your resume and tell us why you&apos;re a great fit!
      </HeaderText>
      <HeaderText>Address</HeaderText>
      <CallToActionText>
        217 Flinders St, Adelaide, South Australia 5000, AU
      </CallToActionText>
      <HeaderText>Phone</HeaderText>
      <CallToActionText style={{ whiteSpace: 'nowrap' }}>
        +63 4233365542
      </CallToActionText>
      <HeaderText>Find us on social media</HeaderText>
      <Stack direction="row" spacing={0}>
        <a
          href="https://www.linkedin.com/company/get-dispatch-ai"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialMediaButton color="inherit">
            <LinkedInIcon />
          </SocialMediaButton>
        </a>
        <SocialMediaButton color="inherit">
          <FacebookIcon />
        </SocialMediaButton>
        <SocialMediaButton color="inherit">
          <InstagramIcon />
        </SocialMediaButton>
        <SocialMediaButton color="inherit">
          <XIcon />
        </SocialMediaButton>
        <SocialMediaButton color="inherit">
          <YouTubeIcon />
        </SocialMediaButton>
      </Stack>
    </CallToActionWrapper>
  );
};

export default CallToActionSection;
