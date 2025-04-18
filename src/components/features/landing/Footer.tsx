import { Box, Container, Grid, Typography, Link, Stack, IconButton, Button } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 6, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and Social Media */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#9BF00B',
                fontWeight: 'bold',
                mb: 2 
              }}
            >
              DispatchAI
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Follow Us On Social Media
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <IconButton href="#" color="inherit">
                <LinkedInIcon />
              </IconButton>
              <IconButton href="#" color="inherit">
                <FacebookIcon />
              </IconButton>
              <IconButton href="#" color="inherit">
                <InstagramIcon />
              </IconButton>
              <IconButton href="#" color="inherit">
                <TwitterIcon />
              </IconButton>
              <IconButton href="#" color="inherit">
                <YouTubeIcon />
              </IconButton>
            </Stack>
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              Company
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="inherit" underline="none">Home</Link>
              <Link href="#" color="inherit" underline="none">Products</Link>
              <Link href="#" color="inherit" underline="none">Pricing</Link>
              <Link href="#" color="inherit" underline="none">Blogs</Link>
            </Stack>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              Features
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="inherit" underline="none">Features</Link>
              <Link href="#" color="inherit" underline="none">About Us</Link>
              <Link href="#" color="inherit" underline="none">Support</Link>
            </Stack>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              Support
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="inherit" underline="none">Documents</Link>
              <Link href="#" color="inherit" underline="none">FAQs</Link>
              <Link href="#" color="inherit" underline="none">Need Help</Link>
              <Link href="#" color="inherit" underline="none">Contact Us</Link>
            </Stack>
          </Grid>

          {/* Ready to Save Time? Section */}
          <Grid item xs={12} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              Ready to Save Time?
            </Typography>
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: 'black',
                color: 'white',
                borderRadius: '24px',
                padding: '10px 20px',
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

        {/* Copyright */}
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mt: 4, textAlign: 'left' }}
        >
          ©Copyright 2025 Dispatch AI
        </Typography>
      </Container>
    </Box>
  );
}