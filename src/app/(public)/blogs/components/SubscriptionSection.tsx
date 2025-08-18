'use client';
import { Box, Grid, styled, TextField, Typography } from '@mui/material';

import theme from '@/theme';

const SubscriptionWrapper = styled(Box)(() => ({
  background: '#111',
  textAlign: 'center',
  padding: '100px 16px',
  [theme.breakpoints.down('md')]: {
    padding: '60px 16px',
  },
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

export const StyledInput = styled(TextField)({
  '& .MuiInputBase-root': {
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  '& .MuiInputBase-input': {
    padding: '6px 16px', // 控制输入框内边距
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: '1px solid #d5d5d5', // 默认边框
  },
});

export default function SubscriptionSection() {
  return (
    <SubscriptionWrapper>
      <Typography
        fontWeight={900}
        fontSize={{ sm: 32, xs: 24 }}
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
          <StyledInput
            name="email"
            size="small"
            placeholder="Email address"
            fullWidth
          />
        </Box>

        {/* First and Last Name Fields Side by Side */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Label>First Name</Label>
            <StyledInput
              name="firstName"
              size="small"
              placeholder="First Name"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <Label>Last Name</Label>
            <StyledInput
              name="lastName"
              size="small"
              placeholder="Last Name"
              fullWidth
            />
          </Grid>
        </Grid>
      </FormWrapper>
    </SubscriptionWrapper>
  );
}
