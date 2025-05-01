import { styled } from '@mui/material/styles';

export const CallToActionTitle = styled('h2')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
    fontSize: theme.typography.h2.fontSize,
    fontFamily: theme.typography.h2.fontFamily,
    fontWeight: theme.typography.h2.fontWeight,
}));
