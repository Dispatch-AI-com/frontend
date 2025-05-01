import { styled } from '@mui/material/styles';

export const BodyText = styled('p')(({ theme }) => ({
    color: 'white',
    marginTop: theme.spacing(2),
    marginBottom: 0,
    fontSize: theme.typography.body1.fontSize,
    fontFamily: theme.typography.fontFamily,
}));
