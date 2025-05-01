import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const TeamCardContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: theme.spacing(4),
    marginBottom: theme.spacing(10),
}));
