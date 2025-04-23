'use client';

import { Box, Container, Stack, Typography, Link, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';
import CTAButton from '@/components/ui/CTAButton';

// Styled Components
const FooterWrapper = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  backgroundColor: theme.palette.background.paper
}));

const LogoContainer = styled(Box)({
  marginBottom: '60px',
  width: '120px',
  height: '40px',
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
    width: '18px',
    height: '18px'
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
  marginTop: '16px',
});

const SupportLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  ...theme.typography.body2
}));

const CTATitle = styled(Typography)(({ theme }) => ({
  marginBottom: '16px',
  ...theme.typography.body1
}));

export default function Footer() {
  return (
    <FooterWrapper as="footer">
      <Container>
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={{ xs: 4, md: 2 }}
        >
          {/* Logo and Social Media */}
          <Box flex={{ md: 2.5 }}>
            <LogoContainer>
              <Image src="/logo.svg" alt="DispatchAI Logo" layout="fill" objectFit="contain" priority />
            </LogoContainer>
            <SocialContainer>
              <SocialText variant="body2">Follow Us On</SocialText>
              <Stack direction="row" spacing={0}>
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
            flex={{ md: 6.5 }}
            sx={{ 
              display: { xs: 'none', lg: 'block' }
            }}
          >
            <NavLinksStack direction="row" spacing={3}>
              <NavLink as={Link} href="#" color="inherit">Home</NavLink>
              <NavLink as={Link} href="#" color="inherit">Products</NavLink>
              <NavLink as={Link} href="#" color="inherit">Pricing</NavLink>
              <NavLink as={Link} href="#" color="inherit">Blogs</NavLink>
              <NavLink as={Link} href="#" color="inherit">Features</NavLink>
              <NavLink as={Link} href="#" color="inherit">About Us</NavLink>
              <Box>
                <NavLink as={Link} href="#" color="inherit">Support</NavLink>
                <SupportLinksStack spacing={1.5}>
                  <SupportLink href="#">Documents</SupportLink>
                  <SupportLink href="#">FAQs</SupportLink>
                  <SupportLink href="#">Need Help</SupportLink>
                  <SupportLink href="#">Contact Us</SupportLink>
                </SupportLinksStack>
              </Box>
            </NavLinksStack>
          </Box>

          {/* CTA Section */}
          <Box 
            flex={{ md: 3 }}
            sx={{ 
              marginLeft: { md: 4 },
              gap: 3
            }}
          >
            <CTATitle>Ready to Save Time?</CTATitle>
            <CTAButton
              variant="black"
              endIcon={<ArrowForwardIcon sx={{ width: '12px', height: '12px' }} />}
            >
              Start Your Free Trial
            </CTAButton>
          </Box>
        </Stack>
      </Container>
    </FooterWrapper>
  );
}