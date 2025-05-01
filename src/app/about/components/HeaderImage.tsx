import { styled } from '@mui/material/styles';

export const HeaderImage = styled('img')(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    width: '40%',
    height: 'auto',
    objectFit: 'cover',
}));
