'use client';

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

// Styled components
const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(4),
}));

const TitleRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(2),
  },
}));

const PageTitle = styled(Typography)(() => ({
  fontWeight: 700,
}));

const AuthorRow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const AuthorAvatar = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(2),
  borderRadius: '50%',
  overflow: 'hidden',
  width: 40,
  height: 40,
  backgroundColor: '#ccc',
}));

const DateText = styled(Typography)(({ theme }) => ({
  marginLeft: 'auto',
  color: theme.palette.text.secondary,
}));

const Header = () => {
  return (
    <HeaderContainer>
      <TitleRow>
        <PageTitle variant="h6">
          New Lucy Features Update: Enhanced FAQs & Get Call Notifications Your
          Way
        </PageTitle>
      </TitleRow>

      <AuthorRow>
        <AuthorAvatar />
        <Typography variant="subtitle1">Jone</Typography>
        <DateText variant="body2">2025/03/28</DateText>
      </AuthorRow>
    </HeaderContainer>
  );
};

export default Header;
