import { styled } from '@mui/material/styles';

export const HeaderImage = styled('img')(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    maxWidth: '576px',
    height: 'auto',
    objectFit: 'cover'
}));
