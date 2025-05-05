"use client"

import { Box, Container, Grid,Typography } from '@mui/material';
import styled from 'styled-components';

const GradientText = styled(Typography)`
  background: linear-gradient(120deg, #b8ff66, #50fa7b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
`;

const FeatureBox = styled(Box)`
  text-align: center;
  padding: 2rem;
  color: white;
`;

const DarkSection = styled(Box)`
  background-color: #000000;
  padding: 6rem 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

export default function Banner() {
  return (
    <DarkSection>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <GradientText variant="h2" sx={{ mb: 2 }}>
            Your 24/7 Phone Assistant
          </GradientText>
          <GradientText variant="h2">
            Let Us Answer While You Get the Job Done
          </GradientText>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureBox>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Never Miss Customer Calls
              </Typography>
            </FeatureBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureBox>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Auto-Handle Paperwork
              </Typography>
            </FeatureBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureBox>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Works While You Sleep
              </Typography>
            </FeatureBox>
          </Grid>
        </Grid>
      </Container>
    </DarkSection>
  );
} 