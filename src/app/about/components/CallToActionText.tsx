import { styled } from '@mui/material/styles';

export const CallToActionText = styled('h4')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
    fontSize: theme.typography.h4.fontSize,
    fontFamily: theme.typography.h4.fontFamily,
    fontWeight: theme.typography.h4.fontWeight,
    margin: theme.spacing(1, 0, 5),
}));
