'use client';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Container, IconButton, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

import CommonButton from '@/components/ui/CommonButton';

const FooterWrapper = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  backgroundColor: theme.palette.background.paper,
  width: '100%',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  width: '126px',
  height: '30px',
  position: 'relative',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up('sm')]: {
    marginBottom: theme.spacing(12),
  },
}));

const FooterStack = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.spacing(4),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    gap: theme.spacing(2),
  },
}));

const LogoAndSocialBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 3,
  [theme.breakpoints.up('sm')]: {
    alignItems: 'flex-start',
  },
}));

const SocialBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2.75),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    gap: theme.spacing(1),
  },
}));

const SocialText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'center',
  whiteSpace: 'nowrap',
  marginRight: theme.spacing(0.5),
  [theme.breakpoints.up('sm')]: {
    textAlign: 'left',
  },
}));

const SocialIconsRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'flex-start',
  },
}));

const SocialIconButton = styled(IconButton)(() => ({
  width: 20,
  height: 20,
  padding: 0,
  '& svg': {
    width: 20,
    height: 20,
  },
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'center',
  [theme.breakpoints.up('sm')]: {
    textAlign: 'left',
  },
}));

const NavLinksBox = styled(Box)(({ theme }) => ({
  flex: 5,
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'block',
  },
}));

const NavLinksStack = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: theme.spacing(4),
  whiteSpace: 'nowrap',
}));

const NavLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  cursor: 'pointer',
  color: 'inherit',
  ...theme.typography.body1,
}));

const SupportLinksStack = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  marginTop: theme.spacing(4),
}));

const SupportLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  ...theme.typography.body2,
}));

const FreeTrialBox = styled(Box)(({ theme }) => ({
  flex: 2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'flex-start',
  },
}));

const FreeTrialTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  textAlign: 'center',
  [theme.breakpoints.up('sm')]: {
    marginBottom: theme.spacing(4),
    textAlign: 'left',
  },
}));

export default function Footer() {
  return (
    <FooterWrapper as="footer">
      <Container maxWidth="xl">
        <FooterStack>
          {/* Logo and Social Media */}
          <LogoAndSocialBox>
            <LogoContainer>
              <Image src="/logo.svg" alt="DispatchAI Logo" layout="fill" objectFit="contain" priority />
            </LogoContainer>
            <SocialBox>
              <SocialText variant="body2">Follow Us On Social Media</SocialText>
              <SocialIconsRow direction="row" spacing={0.8}>
                <SocialIconButton color="inherit"><LinkedInIcon /></SocialIconButton>
                <SocialIconButton color="inherit"><FacebookIcon /></SocialIconButton>
                <SocialIconButton color="inherit"><InstagramIcon /></SocialIconButton>
                <SocialIconButton color="inherit"><XIcon /></SocialIconButton>
                <SocialIconButton color="inherit"><YouTubeIcon /></SocialIconButton>
              </SocialIconsRow>
            </SocialBox>
            <CopyrightText variant="body2">©Copyright 2025 Dispatch AI</CopyrightText>
          </LogoAndSocialBox>

          {/* Navigation Links */}
          <NavLinksBox>
            <NavLinksStack>
              <NavLink href="/" color="inherit">Home</NavLink>
              <NavLink href="/products" color="inherit">Products</NavLink>
              <NavLink href="/pricing" color="inherit">Pricing</NavLink>
              <NavLink href="/blogs" color="inherit">Blogs</NavLink>
              <NavLink href="/features" color="inherit">Features</NavLink>
              <NavLink href="/about" color="inherit">About Us</NavLink>
              <Box>
                <NavLink href="/support" color="inherit">Support</NavLink>
                <SupportLinksStack spacing={2.5}>
                  <SupportLink href="/support/documents">Documents</SupportLink>
                  <SupportLink href="/support/faqs">FAQs</SupportLink>
                  <SupportLink href="/support/help">Need Help</SupportLink>
                  <SupportLink href="/support/contact">Contact Us</SupportLink>
                </SupportLinksStack>
              </Box>
            </NavLinksStack>
          </NavLinksBox>

          {/* Free Trial Section */}
          <FreeTrialBox>
            <FreeTrialTitle variant="body1">Ready to Save Time?</FreeTrialTitle>
            <CommonButton
              buttonVariant="black"
              endIcon={<ArrowForwardIcon sx={{ width: '20px', height: '20px' }} />}
            >
              Start Your Free Trial
            </CommonButton>
          </FreeTrialBox>
        </FooterStack>
      </Container>
    </FooterWrapper>
  );
}