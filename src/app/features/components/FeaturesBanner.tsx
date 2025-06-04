'use client';

import { AppBar, Toolbar, Button, Box, Container, Grid, Typography, Paper, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import PhoneIcon from '@mui/icons-material/Phone';
import DescriptionIcon from '@mui/icons-material/Description';
import NightsStayIcon from '@mui/icons-material/NightsStay';

const BannerSection = styled('section')(({ theme }) => ({
  background: '#000',
  width: '100vw',
  position: 'relative',
  left: '50%',
  right: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(20),
    paddingBottom: theme.spacing(15),
  },
}));

const BannerTitle = styled('h1')(({ theme }) => ({
  ...theme.typography.h1,
  color: '#b8ff66',
  textAlign: 'center',
  fontSize: '48px !important',
  margin: 0,
  marginBottom: 4,
  lineHeight: 1.5,
  [theme.breakpoints.down('md')]: {
    fontSize: '28px !important',
    lineHeight: 1.5,
  },
  '&:last-of-type': {
    marginBottom: 0,
  },
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  borderRadius: 24,
  boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)',
  padding: theme.spacing(4, 3),
  minWidth: 340,
  maxWidth: 370,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: {
    minWidth: 'unset',
    maxWidth: 'unset',
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
  },
}));

const FeatureIconBox = styled(Box)(({ theme }) => ({
  color: '#222',
  background: '#f6f6f6',
  borderRadius: '50%',
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(1),
}));

const FeatureTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 18,
  color: '#222',
}));

const FeatureDesc = styled(Typography)(({ theme }) => ({
  color: '#444',
  fontSize: 15,
  fontWeight: 400,
  lineHeight: 1.5,
}));

const NavLogo = styled('span')(({ theme }) => ({
  fontFamily: 'inherit',
  fontWeight: 700,
  fontSize: 28,
  color: '#b8ff66',
  fontStyle: 'italic',
  marginRight: theme.spacing(2),
  letterSpacing: 0.5,
}));

const NavLink = styled(Button)(({ theme }) => ({
  color: '#fff',
  fontWeight: 500,
  fontSize: 16,
  textTransform: 'none',
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
}));

export default function FeaturesBanner() {
  return (
    <>
      <AppBar position="static" color="transparent" elevation={0} sx={{ background: 'transparent', boxShadow: 'none', pt: 2 }}>
        <Toolbar sx={{ maxWidth: 1440, width: '100%', mx: 'auto', justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <NavLogo>DispatchAI</NavLogo>
            <NavLink>Home</NavLink>
            <NavLink>Products</NavLink>
            <NavLink>Pricing</NavLink>
            <NavLink>Blogs</NavLink>
            <NavLink>Features</NavLink>
            <NavLink>About Us</NavLink>
          </Box>
          <Box>
            <NavLink>Login</NavLink>
            <Button variant="contained" sx={{ borderRadius: 999, fontWeight: 700, ml: 2, background: '#fff', color: '#222', '&:hover': { background: '#b8ff66', color: '#222' } }}>Sign Up</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <BannerSection>
        <Container maxWidth="xl">
          <BannerTitle>Your 24/7 Phone Assistant -</BannerTitle>
          <BannerTitle>Let Us Answer While You Get the Job Done</BannerTitle>
          <Grid container justifyContent="center" alignItems="stretch" spacing={0} sx={{ mt: { xs: 4, md: 12 } }} columnGap={{ xs: 2, md: 16 }}>
            <Grid item>
              <FeatureCard>
                <FeatureIconBox>
                  <PhoneIcon fontSize="medium" />
                </FeatureIconBox>
                <FeatureTitle>Never Miss Customer Calls</FeatureTitle>
                <FeatureDesc>Dispatch AI ensures you never miss a potential customer call, capturing every opportunity.</FeatureDesc>
              </FeatureCard>
            </Grid>
            <Grid item sx={{ ml: { md: '192px' } }}>
              <FeatureCard>
                <FeatureIconBox>
                  <DescriptionIcon fontSize="medium" />
                </FeatureIconBox>
                <FeatureTitle>Auto-Handle Paperwork</FeatureTitle>
                <FeatureDesc>Automate your paperwork with Dispatch AI, saving time and reducing administrative burdens.</FeatureDesc>
              </FeatureCard>
            </Grid>
            <Grid item>
              <FeatureCard>
                <FeatureIconBox>
                  <NightsStayIcon fontSize="medium" />
                </FeatureIconBox>
                <FeatureTitle>Works While You Sleep</FeatureTitle>
                <FeatureDesc>Dispatch AI works around the clock, ensuring your business is always responsive, even while you rest.</FeatureDesc>
              </FeatureCard>
            </Grid>
          </Grid>
        </Container>
      </BannerSection>
    </>
  );
}
