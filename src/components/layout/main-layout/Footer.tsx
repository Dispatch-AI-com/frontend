'use client';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Container, IconButton,Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

import CommmonButton from '@/components/ui/CommonButton';

// Styled Components
const FooterWrapper = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  backgroundColor: theme.palette.background.paper,
  width: '100%',
}));

const LogoContainer = styled(Box)({
  marginBottom: '80px',
  width: '152px',
  height: '36px',
  position: 'relative'
});

const SocialContainer = styled(Box)({
  marginBottom: '24px',
  display: 'flex',
  alignItems: 'center'
});

const SocialText = styled(Typography)(({ theme }) => ({
  marginRight: '8px',
  color: theme.palette.text.secondary
}));

const SocialIconButton = styled(IconButton)({
  padding: '2px',
  '& svg': {
    width: '20px',
    height: '20px'
  }
});

const CopyrightText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary
}));

const NavLinksStack = styled(Stack)({
  marginRight: '16px',
});

const NavLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  cursor: 'pointer',
  color: 'inherit',
  ...theme.typography.body1
}));

const SupportLinksStack = styled(Stack)({
  position: 'absolute',
  marginTop: '24px',
});

const SupportLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  ...theme.typography.body2
}));

const ButtonTitle = styled(Typography)(({ theme }) => ({
  marginBottom: '16px',
  ...theme.typography.body1
}));

export default function Footer() {
  return (
    <FooterWrapper as="footer">
      <Container maxWidth={false} sx={{ maxWidth: '1440px', margin: '0 auto' }}>
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={{ xs: 4, md: 2 }}
        >
          {/* Logo and Social Media */}
          <Box flex={{ md:4.5 }}>
            <LogoContainer>
              <Image src="/logo.svg" alt="DispatchAI Logo" layout="fill" objectFit="contain" priority />
            </LogoContainer>
            <SocialContainer>
              <SocialText variant="body2">Follow Us On Social Media</SocialText>
              <Stack direction="row" spacing={0.8}>
                <SocialIconButton color="inherit"><LinkedInIcon /></SocialIconButton>
                <SocialIconButton color="inherit"><FacebookIcon /></SocialIconButton>
                <SocialIconButton color="inherit"><InstagramIcon /></SocialIconButton>
                <SocialIconButton color="inherit"><XIcon /></SocialIconButton>
                <SocialIconButton color="inherit"><YouTubeIcon /></SocialIconButton>
              </Stack>
            </SocialContainer>
            <CopyrightText variant="body2">©Copyright 2025 Dispatch AI</CopyrightText>
          </Box>

          {/* Navigation Links */}
          <Box
            flex={{ md: 8 }}
            sx={{ 
              display: { xs: 'none', lg: 'block' }
            }}
          >
            <NavLinksStack direction="row" spacing={5}>
              <NavLink href="/" color="inherit">Home</NavLink>
              <NavLink href="/products" color="inherit">Products</NavLink>
              <NavLink href="/pricing" color="inherit">Pricing</NavLink>
              <NavLink href="/blogs" color="inherit">Blogs</NavLink>
              <NavLink href="/features" color="inherit">Features</NavLink>
              <NavLink href="/about" color="inherit">About Us</NavLink>
              <Box>
                <NavLink href="/support" color="inherit">Support</NavLink>
                <SupportLinksStack spacing={2}>
                  <SupportLink href="/support/documents">Documents</SupportLink>
                  <SupportLink href="/support/faqs">FAQs</SupportLink>
                  <SupportLink href="/support/help">Need Help</SupportLink>
                  <SupportLink href="/support/contact">Contact Us</SupportLink>
                </SupportLinksStack>
              </Box>
            </NavLinksStack>
          </Box>

          {/* Free Trial Section */}
          <Box 
            flex={{ md: 3 }}
            sx={{ 
              marginLeft: { md: 4 },
              gap: 3
            }}
          >
            <ButtonTitle>Ready to Save Time?</ButtonTitle>
            <CommmonButton
              buttonVariant="black"
              endIcon={<ArrowForwardIcon sx={{ width: '20px', height: '20px' }} />}
            >
              Start Your Free Trial
            </CommmonButton>
          </Box>
        </Stack>
      </Container>
    </FooterWrapper>
  );
}