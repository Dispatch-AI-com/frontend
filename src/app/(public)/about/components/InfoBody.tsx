import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SectionText = styled('p')(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.text.primary,
  fontSize: theme.typography.body1.fontSize,
  fontFamily: theme.typography.fontFamily,
  lineHeight: theme.spacing(3),
  maxWidth: '60%',
  marginTop: theme.spacing(6),
  marginBottom: '118px',
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.body2.fontSize,
    maxWidth: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(6),
  },
}));

export const SectionTitle = styled('h2')(({ theme }) => ({
  display: 'flex',
  margin: 0,
  flexDirection: 'column',
  alignItems: 'center',
  color: theme.palette.text.primary,
  fontSize: theme.typography.h2.fontSize,
  fontFamily: theme.typography.h2.fontFamily,
  fontWeight: theme.typography.h2.fontWeight,
}));

export const SectionWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
  paddingTop: '150px',
  color: theme.palette.text.primary,
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(6),
  },
}));
