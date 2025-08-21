import { Box, Card } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TeamCardContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(10),
  maxWidth: `calc(3 * 324px + 2 * ${theme.spacing(4)})`,
  marginLeft: 'auto',
  marginRight: 'auto',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    maxWidth: `calc(2 * 324px + ${theme.spacing(4)})`,
  },
}));

export const TeamMemberCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '324px',
  height: '464px',
  padding: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    height: 'auto',
    padding: theme.spacing(1),
  },
}));

export const TeamMemberImage = styled('div')<{ backgroundImage: string }>(
  ({ theme, backgroundImage }) => ({
    width: '300px',
    height: '300px',
    borderRadius: theme.spacing(2),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url(${backgroundImage})`,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      aspectRatio: '1 / 1',
      height: 'auto',
    },
  }),
);
