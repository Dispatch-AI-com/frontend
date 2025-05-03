import { Box, Card } from '@mui/material';
import { styled } from '@mui/material/styles';

const TeamCardContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: theme.spacing(4),
    marginBottom: theme.spacing(10),
}));

const TeamMemberCard = styled(Card)(({ theme }) => ({
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

const TeamMemberImage = styled('div')(({ theme }) => ({
    width: '300px',
    height: '300px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[300],
    marginBottom: theme.spacing(1),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));

export { TeamCardContainer, TeamMemberCard, TeamMemberImage };