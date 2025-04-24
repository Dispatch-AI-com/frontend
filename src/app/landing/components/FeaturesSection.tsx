'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent
} from '@mui/material';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BuildIcon from '@mui/icons-material/Build';
import SectionTitle from '../../../components/ui/SectionTitle';

export default function FeaturesSection() {
  const features = [
    {
      title: "Automated Call Handling",
      description: "AI answers calls, takes down key information, and creates tickets for you.",
      icon: <PhoneInTalkIcon sx={{ fontSize: 60 }} />
    },
    {
      title: "Follow-Up Actions",
      description: "Text message or email conclusions, arrange service bookings, and calendar reminders automatically.",
      icon: <NotificationsActiveIcon sx={{ fontSize: 60 }} />
    },
    {
      title: "24/7 Availability",
      description: "Never miss a call, even after hours. Perfect for contractors and rental managers.",
      icon: <AccessTimeIcon sx={{ fontSize: 60 }} />
    },
    {
      title: "No Tech Skills Needed",
      description: "Set up in 3 minutes. Works with your existing phone number.",
      icon: <BuildIcon sx={{ fontSize: 60 }} />
    }
  ];

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <SectionTitle mb={12}>
          Automated Calls, Save Time, Grow Your Business
        </SectionTitle>

        <Grid container spacing={6} sx={{ pl: { xs: 2, sm: 3, md: 4 } }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  ml:'20px',
                  mb:'20px',
                  p: 0,
                  pl: 0,
                  boxShadow: 'none',
                  bgcolor: 'transparent'
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'grey.100',
                    borderRadius: '12px',
                    mb: 3,
                    alignSelf: 'flex-start',
                    ml: 0
                  }}
                >
                  {feature.icon}
                </Box>
                <CardContent sx={{ 
                  padding: 0, 
                  paddingTop: 0,
                  "&:last-child": { paddingBottom: 0 },
                  width: '100%'
                }}>
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    gutterBottom
                    sx={{ 
                      fontFamily: 'var(--font-roboto)',
                      fontWeight: 'bold',
                      fontSize: '24px',
                      lineHeight:'30px',
                      height: '30px',
                      maxWidth: '269px',
                      mb: 3
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary"
                    sx={{
                      fontFamily: 'var(--font-roboto)',
                      maxWidth: '420px',
                      height: '40px',
                      fontSize: '16px',
                      lineHeight: '20px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      mt: '20px'
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 