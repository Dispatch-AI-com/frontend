import { Box } from '@mui/material';
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

export const SectionWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(7),
    color: theme.palette.text.primary,
}));