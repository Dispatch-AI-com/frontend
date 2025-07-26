import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';

import theme from '@/theme';

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },

  [theme.breakpoints.down('xs')]: {
    marginBottom: theme.spacing(2),
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',

  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
    textAlign: 'center',
  },

  [theme.breakpoints.down('xs')]: {
    fontSize: '1.25rem',
  },
}));

const CreateButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#000',
  color: '#fff',
  padding: theme.spacing(1.5, 3),
  borderRadius: theme.spacing(1),

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: theme.spacing(1.5, 2),
  },

  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(1, 2),
    fontSize: '0.875rem',
  },
}));

export default function ServiceHeader({ onCreate }: { onCreate: () => void }) {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <HeaderContainer>
      <Title variant={isSmallScreen ? 'h5' : 'h4'}>Service Management</Title>
      <CreateButton
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onCreate}
      >
        Create New Service
      </CreateButton>
    </HeaderContainer>
  );
}
