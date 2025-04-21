import { Box, Container, Grid, Typography, Link, Stack, IconButton, Button } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';


export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 6, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and Social Media */}
          <Grid item xs={12} md={2.5}>
            <Box sx={{ mb: 4, width: '100px', height: '28px', position: 'relative' }}>
                <Image
                  src="/logo.svg"
                  alt="DispatchAI Logo"
                  layout="fill"
                  objectFit="contain"
                  priority
                />
            </Box>
            <Box sx={{ mb: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.6rem' }}>
                Follow Us On Social Media
              </Typography>
            </Box>
            <Stack direction="row" spacing={0} sx={{ mb: 2 }}>
              <IconButton href="#" color="inherit" sx={{ 
                padding: '2px',
                '& svg': {
                  width: '18px',
                  height: '18px'
                }
              }}>
                <LinkedInIcon />
              </IconButton>
              <IconButton href="#" color="inherit" sx={{ 
                padding: '2px',
                '& svg': {
                  width: '18px',
                  height: '18px'
                }
              }}>
                <FacebookIcon />
              </IconButton>
              <IconButton href="#" color="inherit" sx={{ 
                padding: '2px',
                '& svg': {
                  width: '18px',
                  height: '18px'
                }
              }}>
                <InstagramIcon />
              </IconButton>
              <IconButton href="#" color="inherit" sx={{ 
                padding: '2px',
                '& svg': {
                  width: '18px',
                  height: '18px'
                }
              }}>
                <TwitterIcon />
              </IconButton>
              <IconButton href="#" color="inherit" sx={{ 
                padding: '2px',
                '& svg': {
                  width: '18px',
                  height: '18px'
                }
              }}>
                <YouTubeIcon />
              </IconButton>
            </Stack>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ fontSize: '0.6rem' }}
            >
              ©Copyright 2025 Dispatch AI
            </Typography>
          </Grid>

          {/* Navigation Links - Single Row */}
          <Grid item xs={12} md={6.5}>
            <Stack direction="row" spacing={4} sx={{ mb: 2 }}>
              <Typography sx={{ textDecoration: 'none', fontSize: '0.75rem' }} variant="subtitle1" fontWeight="bold" component={Link} href="#" color="inherit">Home</Typography>
              <Typography sx={{ textDecoration: 'none', fontSize: '0.75rem' }} variant="subtitle1" fontWeight="bold" component={Link} href="#" color="inherit">Products</Typography>
              <Typography sx={{ textDecoration: 'none', fontSize: '0.75rem' }} variant="subtitle1" fontWeight="bold" component={Link} href="#" color="inherit">Pricing</Typography>
              <Typography sx={{ textDecoration: 'none', fontSize: '0.75rem' }} variant="subtitle1" fontWeight="bold" component={Link} href="#" color="inherit">Blogs</Typography>
              <Typography sx={{ textDecoration: 'none', fontSize: '0.75rem' }} variant="subtitle1" fontWeight="bold" component={Link} href="#" color="inherit">Features</Typography>
              <Typography sx={{ textDecoration: 'none', fontSize: '0.75rem' }} variant="subtitle1" fontWeight="bold" component={Link} href="#" color="inherit">About Us</Typography>
              <Box>
                <Typography sx={{ textDecoration: 'none', fontSize: '0.75rem' }} variant="subtitle1" fontWeight="bold" component={Link} href="#" color="inherit">
                  Support
                </Typography>
                <Stack spacing={1.5} sx={{ position: 'absolute', mt: 2 }}>
                  <Link href="#" color="text.secondary" underline="none" sx={{ fontSize: '0.7rem' }}>Documents</Link>
                  <Link href="#" color="text.secondary" underline="none" sx={{ fontSize: '0.7rem' }}>FAQs</Link>
                  <Link href="#" color="text.secondary" underline="none" sx={{ fontSize: '0.7rem' }}>Need Help</Link>
                  <Link href="#" color="text.secondary" underline="none" sx={{ fontSize: '0.7rem' }}>Contact Us</Link>
                </Stack>
              </Box>
            </Stack>
          </Grid>

          {/* Ready to Save Time? Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2} sx={{ fontSize: '0.75rem' }}>
              Ready to Save Time?
            </Typography>
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: 'black',
                color: 'white',
                borderRadius: '10px',
                padding: '6px 16px',
                fontSize: '0.75rem',
                textTransform: 'none',
                fontWeight: 'bold',
                height: '32px',
                '&:hover': {
                  bgcolor: 'black',
                  opacity: 0.9,
                },
              }}
            >
              Start Your Free Trial
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}