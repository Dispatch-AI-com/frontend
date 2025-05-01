import { styled } from '@mui/material/styles';

export const SectionTitle = styled('h2')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: theme.palette.text.primary,
    fontSize: theme.typography.h2.fontSize,
    fontFamily: theme.typography.h2.fontFamily,
    fontWeight: theme.typography.h2.fontWeight,
    margin: theme.spacing(4, 0, 2),
}));
