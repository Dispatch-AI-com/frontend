import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const SectionWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(7),
    color: theme.palette.text.primary,
}));
