import { Box } from '@mui/material';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CallToActionText = styled('h3')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  color: 'white',
  fontSize: theme.typography.h3.fontSize,
  fontFamily: theme.typography.h3.fontFamily,
  fontWeight: theme.typography.h3.fontWeight,
  margin: theme.spacing(1, 0, 5),
}));

export const CallToActionTitle = styled('h2')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  color: 'white',
  fontSize: theme.typography.h2.fontSize,
  fontFamily: theme.typography.h2.fontFamily,
  fontWeight: theme.typography.h2.fontWeight,
}));

export const CallToActionWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.dark,
  padding: theme.spacing(10, 4),
  color: theme.palette.text.primary,
  gap: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 1),
  },
}));

export const SocialMediaButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1),
  '& svg': {
    width: '30px',
    height: '30px',
    color: 'white',
  },
}));
