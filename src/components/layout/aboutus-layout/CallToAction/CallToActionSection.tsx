'use client';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Stack } from '@mui/material';
import React from 'react';

import { HeaderText } from '@/app/(public)/about/components/AboutBanner';
import {
  CallToActionText,
  CallToActionTitle,
  CallToActionWrapper,
  ContactText,
  SocialMediaButton,
} from '@/app/(public)/about/components/CallToAction';

const CallToActionSection = () => {
  return (
    <CallToActionWrapper>
      <CallToActionTitle>Want to work with us?</CallToActionTitle>
      <ContactText>
        Email us at{' '}
        <a
          href="mailto:hello@jiangren.com.au"
          style={{ color: '#a8f574', textDecoration: 'underline' }}
        >
          hello@jiangren.com.au
        </a>{' '}
        with your resume and tell us why you&apos;re a great fit!
      </ContactText>
      <HeaderText>Address</HeaderText>
      <CallToActionText>
        217 Flinders St, Adelaide, South Australia 5000, AU
      </CallToActionText>
      <HeaderText>Phone</HeaderText>
      <CallToActionText style={{ whiteSpace: 'nowrap' }}>
        +63 4233365542
      </CallToActionText>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
        }}
      >
        <ContactText style={{ marginTop: '16px', marginBottom: 0 }}>
          Find us on social media
        </ContactText>
        <Stack
          direction="row"
          spacing={'24px'}
          style={{ margin: 0, padding: 0, marginTop: '16px' }}
        >
          <SocialMediaButton color="inherit">
            <LinkedInIcon
              fontSize="inherit"
              sx={{ transform: 'scale(1.3333)' }}
            />
          </SocialMediaButton>
          <SocialMediaButton color="inherit">
            <FacebookIcon
              fontSize="inherit"
              sx={{ transform: 'scale(1.3333)' }}
            />
          </SocialMediaButton>
          <SocialMediaButton color="inherit">
            <InstagramIcon
              fontSize="inherit"
              sx={{ transform: 'scale(1.3333)' }}
            />
          </SocialMediaButton>
          <SocialMediaButton color="inherit">
            <XIcon fontSize="inherit" sx={{ transform: 'scale(1.1119999)' }} />
          </SocialMediaButton>
          <SocialMediaButton color="inherit">
            <YouTubeIcon
              fontSize="inherit"
              sx={{ transform: 'scale(1.3333)' }}
            />
          </SocialMediaButton>
        </Stack>
      </Box>
    </CallToActionWrapper>
  );
};

export default CallToActionSection;
