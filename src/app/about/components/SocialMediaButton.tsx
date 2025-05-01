import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';

export const SocialMediaButton = styled(IconButton)(({ theme }) => ({
    padding: theme.spacing(1),
    '& svg': {
        width: '30px',
        height: '30px',
        color: 'white',
    }
}));
