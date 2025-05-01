import { styled } from '@mui/material/styles';

export const SectionText = styled('p')(({ theme }) => ({
    textAlign: 'center',
    color: theme.palette.text.primary,
    fontSize: theme.typography.body1.fontSize,
    fontFamily: theme.typography.fontFamily,
    lineHeight: theme.spacing(3),
    maxWidth: '60%',
    marginBottom: theme.spacing(8),
    [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.body2.fontSize,
    },
}));
