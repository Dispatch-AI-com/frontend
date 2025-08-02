'use client';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {
  Box,
  Container,
  IconButton,
  Link,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

import CommonButton from '@/components/ui/CommonButton';

const FooterWrapper = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(6),
  backgroundColor: theme.palette.background.paper,
  width: '100%',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  width: '126px',
  height: '30px',
  position: 'relative',
  marginBottom: 0,
  [theme.breakpoints.up('sm')]: {
    marginBottom: theme.spacing(11.5),
  },
}));

const FooterStack = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.spacing(4),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    gap: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    '& > *': {
      order: 0,
    },
  },
}));

const LogoAndSocialBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flex: 3,
  [theme.breakpoints.up('sm')]: {
    alignItems: 'flex-start',
  },
}));

const SocialBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2.75),
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(1),
  },
}));

const SocialText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'left',
  whiteSpace: 'nowrap',
  marginRight: theme.spacing(0.5),
}));

const SocialIconsRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'flex-start',
  gap: theme.spacing(0.8),
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1.4),
  },
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  width: 20,
  height: 20,
  padding: 0,
  '& svg': {
    width: 20,
    height: 20,
  },
  [theme.breakpoints.down('sm')]: {
    width: 24,
    height: 24,
    '& svg': {
      width: 24,
      height: 24,
    },
  },
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'left',
}));

const NavLinksBox = styled(Box)(({ theme }) => ({
  flex: 5,
  paddingRight: theme.spacing(4),
  '@media (min-width: 600px) and (max-width: 1130px)': {
    display: 'none',
  },
}));

const NavLinksStack = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    gap: theme.spacing(4),
    whiteSpace: 'nowrap',
    justifyContent: 'flex-end',
  },
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
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(2),
  },
}));

const SupportLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  ...theme.typography.body2,
}));

const FreeTrialBox = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'flex-end',
    marginLeft: 'auto',
  },
}));

const FreeTrialContent = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: 'fit-content',
}));

const ButtonWrapper = styled(Box)({
  width: '195px',
  height: '40px',
  '& > button': {
    width: '100%',
    height: '100%',
  },
});

const FreeTrialTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  textAlign: 'left',
  [theme.breakpoints.up('sm')]: {
    marginBottom: theme.spacing(4),
  },
}));

// mobile styled components
const MobileNavLayout = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const DesktopNavLayout = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(4),
    whiteSpace: 'nowrap',
    justifyContent: 'flex-end',
  },
}));

const NavRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  position: 'relative',
  '& > *:last-child': {
    textAlign: 'left',
    position: 'absolute',
    left: '60%',
  },
});

const MobileFreeTrialBox = styled(FreeTrialBox)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    order: 2,
    width: '100%',
    marginTop: 120,
  },
}));

const MobileSocialBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    order: 3,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 1,
  },
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const MobileSocialContent = styled(SocialBox)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const MobileCopyrightText = styled(CopyrightText)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

export default function Footer() {
  const theme = useTheme();

  return (
    <FooterWrapper as="footer">
      <Container maxWidth="xl">
        <FooterStack>
          {/* Logo and Social Media */}
          <LogoAndSocialBox>
            <LogoContainer>
              <Image
                src="/logo.svg"
                alt="DispatchAI Logo"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </LogoContainer>
            <SocialBox
              sx={{
                [theme.breakpoints.down('sm')]: {
                  display: 'none',
                },
              }}
            >
              <SocialText>Follow Us On Social Media</SocialText>
              <SocialIconsRow direction="row">
                <SocialIconButton color="inherit">
                  <LinkedInIcon />
                </SocialIconButton>
                <SocialIconButton color="inherit">
                  <FacebookIcon />
                </SocialIconButton>
                <SocialIconButton color="inherit">
                  <InstagramIcon />
                </SocialIconButton>
                <SocialIconButton color="inherit">
                  <XIcon />
                </SocialIconButton>
                <SocialIconButton color="inherit">
                  <YouTubeIcon />
                </SocialIconButton>
              </SocialIconsRow>
            </SocialBox>
            <CopyrightText
              sx={{
                [theme.breakpoints.down('sm')]: {
                  display: 'none',
                },
              }}
            >
              ©Copyright 2025 Dispatch AI
            </CopyrightText>
          </LogoAndSocialBox>

          {/* Navigation Links */}
          <NavLinksBox>
            <NavLinksStack>
              {/* Mobile Layout */}
              <MobileNavLayout>
                {/* Row 1: Home and Products */}
                <NavRow>
                  <NavLink href="/" color="inherit">
                    Home
                  </NavLink>
                  <NavLink href="/products" color="inherit">
                    Products
                  </NavLink>
                </NavRow>

                {/* Row 2: Pricing and Blogs */}
                <NavRow>
                  <NavLink href="/pricing" color="inherit">
                    Pricing
                  </NavLink>
                  <NavLink href="/blogs" color="inherit">
                    Blogs
                  </NavLink>
                </NavRow>

                {/* Row 3: Features and About Us */}
                <NavRow>
                  <NavLink href="/features" color="inherit">
                    Features
                  </NavLink>
                  <NavLink href="/about" color="inherit">
                    About Us
                  </NavLink>
                </NavRow>

                {/* Row 4: Support and its dropdown */}
                <NavRow>
                  <Box>
                    <NavLink href="/support" color="inherit">
                      Support
                    </NavLink>
                    <SupportLinksStack spacing={1.5}>
                      <SupportLink href="/support/documents">
                        Documents
                      </SupportLink>
                      <SupportLink href="/support/faqs">FAQs</SupportLink>
                      <SupportLink href="/support/help">Need Help</SupportLink>
                      <SupportLink href="/support/contact">
                        Contact Us
                      </SupportLink>
                    </SupportLinksStack>
                  </Box>
                  <Box></Box>
                </NavRow>
              </MobileNavLayout>

              {/* Desktop Layout */}
              <DesktopNavLayout>
                <NavLink href="/" color="inherit">
                  Home
                </NavLink>
                <NavLink href="/products" color="inherit">
                  Products
                </NavLink>
                <NavLink href="/pricing" color="inherit">
                  Pricing
                </NavLink>
                <NavLink href="/blogs" color="inherit">
                  Blogs
                </NavLink>
                <NavLink href="/features" color="inherit">
                  Features
                </NavLink>
                <NavLink href="/about" color="inherit">
                  About Us
                </NavLink>
                <Box>
                  <NavLink href="/support" color="inherit">
                    Support
                  </NavLink>
                  <SupportLinksStack spacing={1.5}>
                    <SupportLink href="/support/documents">
                      Documents
                    </SupportLink>
                    <SupportLink href="/support/faqs">FAQs</SupportLink>
                    <SupportLink href="/support/help">Need Help</SupportLink>
                    <SupportLink href="/support/contact">
                      Contact Us
                    </SupportLink>
                  </SupportLinksStack>
                </Box>
              </DesktopNavLayout>
            </NavLinksStack>
          </NavLinksBox>

          {/* Free Trial Section */}
          <MobileFreeTrialBox>
            <FreeTrialContent>
              <FreeTrialTitle variant="body1">
                Ready to Save Time?
              </FreeTrialTitle>
              <ButtonWrapper>
                <CommonButton
                  buttonVariant="black"
                  endIcon={
                    <ArrowForwardIcon sx={{ width: '20px', height: '20px' }} />
                  }
                >
                  Start Your Free Trial
                </CommonButton>
              </ButtonWrapper>
            </FreeTrialContent>
          </MobileFreeTrialBox>

          {/* Mobile Social and Copyright Section */}
          <MobileSocialBox>
            <MobileSocialContent>
              <SocialText>Follow Us On Social Media</SocialText>
              <SocialIconsRow direction="row">
                <SocialIconButton color="inherit">
                  <LinkedInIcon />
                </SocialIconButton>
                <SocialIconButton color="inherit">
                  <FacebookIcon />
                </SocialIconButton>
                <SocialIconButton color="inherit">
                  <InstagramIcon />
                </SocialIconButton>
                <SocialIconButton color="inherit">
                  <XIcon />
                </SocialIconButton>
                <SocialIconButton color="inherit">
                  <YouTubeIcon />
                </SocialIconButton>
              </SocialIconsRow>
            </MobileSocialContent>
            <MobileCopyrightText>
              ©Copyright 2025 Dispatch AI
            </MobileCopyrightText>
          </MobileSocialBox>
        </FooterStack>
      </Container>
    </FooterWrapper>
  );
}
