'use client';

import { Box, Container, Grid, Typography, Link, Stack, IconButton, Button } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import CTAButton from '@/components/ui/CTAButton';

export default function Footer() {
  const theme = useTheme();

  return (
    <Box component="footer" sx={{ 
      py: 6, 
      bgcolor: theme.palette.background.paper 
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} >
          {/* Logo and Social Media */}
          <Grid item xs={12} md={2.5}>
            <Box sx={{ mb: 5, width: '100px', height: '28px', position: 'relative' }}>
              <Image src="/logo.svg" alt="DispatchAI Logo" layout="fill" objectFit="contain" priority />
            </Box>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  mr: 1,
                  fontSize: '0.6rem'
                }}
              >
                Follow Us On
              </Typography>
              <Stack direction="row" spacing={0}>
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
                  <XIcon />
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
            </Box>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                fontSize: '0.6rem'
              }}
            >
              ©Copyright 2025 Dispatch AI
            </Typography>
          </Grid>

          {/* Navigation Links - Single Row */}
          <Grid item xs={12} md={6.5} sx={{ 
            display: { xs: 'none', lg: 'block' }
          }}>
            <Stack direction="row" spacing={4} sx={{ mb: 2 }}>
              <Typography className="footer-link" component={Link} href="#" color="inherit" sx={{ textDecoration: 'none' }}>Home</Typography>
              <Typography className="footer-link" component={Link} href="#" color="inherit" sx={{ textDecoration: 'none' }}>Products</Typography>
              <Typography className="footer-link" component={Link} href="#" color="inherit" sx={{ textDecoration: 'none' }}>Pricing</Typography>
              <Typography className="footer-link" component={Link} href="#" color="inherit" sx={{ textDecoration: 'none' }}>Blogs</Typography>
              <Typography className="footer-link" component={Link} href="#" color="inherit" sx={{ textDecoration: 'none' }}>Features</Typography>
              <Typography className="footer-link" component={Link} href="#" color="inherit" sx={{ textDecoration: 'none' }}>About Us</Typography>
              <Box>
                <Typography className="footer-link" component={Link} href="#" color="inherit" sx={{ textDecoration: 'none' }}>
                  Support
                </Typography>
                <Stack spacing={1.5} sx={{ position: 'absolute', mt: 2 }}>
                  <Link href="#" color="text.secondary" underline="none" className="footer-text">Documents</Link>
                  <Link href="#" color="text.secondary" underline="none" className="footer-text">FAQs</Link>
                  <Link href="#" color="text.secondary" underline="none" className="footer-text">Need Help</Link>
                  <Link href="#" color="text.secondary" underline="none" className="footer-text">Contact Us</Link>
                </Stack>
              </Box>
            </Stack>
          </Grid>

          {/* Ready to Save Time? Section */}
          <Grid item xs={12} md={3}>
            <Typography className="footer-link" sx={{ mb: 3 }}>
              Ready to Save Time?
            </Typography>
            <CTAButton
              variant="black"
              endIcon={<ArrowForwardIcon sx={{ fontSize: '0.75rem' }} />}
              sx={{
                fontSize: '0.75rem',
                padding: '6px 16px',
                height: '32px',
                whiteSpace: 'nowrap',
                minWidth: 'auto',
                '& .MuiButton-endIcon': {
                  marginLeft: '4px'
                }
              }}
            >
              Start Your Free Trial
            </CTAButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}