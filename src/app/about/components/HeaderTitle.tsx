import { styled } from '@mui/material/styles';

export const HeaderTitle = styled('h1')(({ theme }) => ({
    color: 'white',
    fontSize: theme.typography.h1.fontSize,
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: theme.typography.h1.fontWeight,
    margin: 0,
    lineHeight: 1.2,
}));
