import { Box } from '@mui/material';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CallToActionText = styled('h3')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  color: 'white',
  margin: 0,
  marginBottom: '16px',
  fontSize: theme.typography.h3.fontSize,
  fontFamily: theme.typography.h3.fontFamily,
  fontWeight: theme.typography.h3.fontWeight,
}));

export const CallToActionTitle = styled('h2')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  color: 'white',
  margin: 0,
  fontSize: theme.typography.h2.fontSize,
  fontFamily: theme.typography.h2.fontFamily,
  fontWeight: theme.typography.h2.fontWeight,
}));

export const ContactText = styled('p')(({ theme }) => ({
  color: 'white',
  marginTop: '12px',
  marginBottom: '16px',
  fontSize: theme.typography.body1.fontSize,
  fontFamily: theme.typography.fontFamily,
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('lg')]: {
    fontSize: theme.typography.body2.fontSize,
    whiteSpace: 'normal',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: theme.typography.body2.fontSize,
    whiteSpace: 'normal',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.body2.fontSize,
    textAlign: 'center',
    whiteSpace: 'normal',
  },
}));

export const CallToActionWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.dark,
  padding: theme.spacing(10, 4),
  color: theme.palette.text.primary,
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(6, 2),
  },
}));

export const SocialMediaButton = styled(IconButton)(({ theme }) => ({
  margin: 0,
  padding: 0,
  width: theme.spacing(4),
  height: theme.spacing(4),
  minWidth: theme.spacing(4),
  minHeight: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '28px',
    height: '28px',
    minWidth: '28px',
    minHeight: '28px',
  },
  '& svg': {
    color: 'white',
    width: theme.spacing(4),
    height: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '28px',
      height: '28px',
    },
  },
}));
