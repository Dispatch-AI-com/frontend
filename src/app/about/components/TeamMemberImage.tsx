import { styled } from '@mui/material/styles';

export const TeamMemberImage = styled('div')(({ theme }) => ({
    width: '300px',
    height: '300px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[300],
    marginBottom: theme.spacing(1),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));
