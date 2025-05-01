import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

export const TeamMemberCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '324px',
    height: '464px',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    textAlign: 'center',
}));
