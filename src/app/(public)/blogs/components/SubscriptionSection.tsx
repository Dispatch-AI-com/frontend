'use client';
import { Box, Grid, styled, TextField, Typography } from '@mui/material';

const SubscriptionWrapper = styled(Box)(() => ({
  background: '#111',
  textAlign: 'center',
  padding: '100px 16px',
}));

const FormWrapper = styled(Box)(() => ({
  margin: '32px auto 0 auto',
  maxWidth: 600,
  textAlign: 'left',
}));

const Label = styled(Typography)(() => ({
  color: '#fff',
  fontWeight: 400,
  fontSize: 14,
  marginBottom: 4,
}));

export default function SubscriptionSection() {
  return (
    <SubscriptionWrapper>
      <Typography
        fontWeight={900}
        fontSize="32px"
        lineHeight="40px"
        textAlign="center"
        color="#ffffff"
        gutterBottom
      >
        Subscription
      </Typography>
      <Typography
        fontWeight={400}
        fontSize="14px"
        lineHeight="20px"
        color="#bbbbbb"
        textAlign="center"
      >
        Enter your credentials to access your account
      </Typography>

      <FormWrapper>
        {/* Email Field */}
        <Box sx={{ marginBottom: 4 }}>
          <Label>Email address</Label>
          <TextField
            name="email"
            size="small"
            placeholder="Email address"
            fullWidth
            sx={{
              height: '40px',
              bgcolor: '#fff',
              borderRadius: '12px',
              '& .MuiInputBase-root': {
                height: '40px',
                padding: '12px 16px',
                borderRadius: '12px',
                backgroundColor: '#fff',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
          />
        </Box>

        {/* First and Last Name Fields Side by Side */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Label>First Name</Label>
            <TextField
              name="firstName"
              size="small"
              placeholder="First Name"
              fullWidth
              sx={{
                height: '40px',
                bgcolor: '#fff',
                borderRadius: '12px',
                '& .MuiInputBase-root': {
                  height: '40px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  backgroundColor: '#fff',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: '1px solid #d5d5d5',
                },
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <Label>Last Name</Label>
            <TextField
              name="lastName"
              size="small"
              placeholder="Last Name"
              fullWidth
              sx={{
                height: '40px',
                bgcolor: '#fff',
                borderRadius: '12px',
                '& .MuiInputBase-root': {
                  height: '40px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  backgroundColor: '#fff',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: '1px solid #d5d5d5',
                },
              }}
            />
          </Grid>
        </Grid>
      </FormWrapper>
    </SubscriptionWrapper>
  );
}
