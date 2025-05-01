import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const CallToActionWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.dark,
    padding: theme.spacing(10, 50),
    color: theme.palette.text.primary,
    gap: theme.spacing(5),
}));
