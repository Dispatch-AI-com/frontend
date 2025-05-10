import { Box } from '@mui/material';
import { IconButton } from '@mui/material';
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

export const CallToActionTitle = styled('h2')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
    fontSize: theme.typography.h2.fontSize,
    fontFamily: theme.typography.h2.fontFamily,
    fontWeight: theme.typography.h2.fontWeight,
}));


export const CallToActionWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.dark,
    padding: theme.spacing(10, 50),
    color: theme.palette.text.primary,
    gap: theme.spacing(5),
}));


export const SocialMediaButton = styled(IconButton)(({ theme }) => ({
    padding: theme.spacing(1),
    '& svg': {
        width: '30px',
        height: '30px',
        color: 'white',
    }
}));