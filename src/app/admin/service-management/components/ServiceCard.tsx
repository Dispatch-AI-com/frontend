import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

import type { ServiceManagement } from '@/features/service-management/serviceManagementApi';
import theme from '@/theme';

const CardContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  border: '1px solid #e0e0e0',
  position: 'relative',
  minHeight: 200,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    borderColor: '#ccc',
  },

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    minHeight: 180,
  },

  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(1.5),
    minHeight: 160,
  },
}));

const ServiceTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'medium',
  color: '#000',
  marginBottom: theme.spacing(2),
  lineHeight: 1.4,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',

  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    marginBottom: theme.spacing(1.5),
  },

  [theme.breakpoints.down('xs')]: {
    fontSize: '0.875rem',
    marginBottom: theme.spacing(1),
  },
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: 'medium',
  '& .MuiChip-label': {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },

  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
    height: '24px',
  },

  [theme.breakpoints.down('xs')]: {
    fontSize: '0.7rem',
    height: '20px',
  },
}));

const DateTimeText = styled(Typography)(({ theme }) => ({
  color: '#666',
  marginBottom: theme.spacing(2),

  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
    marginBottom: theme.spacing(1.5),
  },

  [theme.breakpoints.down('xs')]: {
    fontSize: '0.7rem',
    marginBottom: theme.spacing(1),
  },
}));

const ActionsWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(2),
  bottom: theme.spacing(2),
  zIndex: 2,
}));

const MenuRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1, 2),
}));

export default function ServiceCard({
  service,
  onEdit,
  onDelete,
}: {
  service: ServiceManagement;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Format date and time
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      .replace(',', '');
  };

  // Get status display
  const getStatusDisplay = () => {
    return service.isAvailable ? 'Active' : 'Inactive';
  };

  return (
    <CardContainer>
      <ServiceTitle variant={isSmallScreen ? 'body1' : 'h6'}>
        {service.name}
      </ServiceTitle>
      <Box sx={{ mb: 2 }}>
        <StatusChip
          label={`• ${getStatusDisplay()}`}
          size={isExtraSmallScreen ? 'small' : 'small'}
          sx={{
            backgroundColor: service.isAvailable ? '#e8f5e8' : '#fff3e0',
            color: service.isAvailable ? '#2e7d32' : '#f57c00',
          }}
        />
      </Box>
      <DateTimeText variant={isSmallScreen ? 'caption' : 'body2'}>
        {formatDateTime(service.createdAt)}
      </DateTimeText>
      <ActionsWrapper>
        <IconButton onClick={e => setAnchorEl(e.currentTarget)} size="small">
          <MoreHorizIcon fontSize="medium" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{ sx: { p: 0, borderRadius: 2 } }}
        >
          <MenuRow>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                onEdit();
              }}
              sx={{ minWidth: 80 }}
            >
              <EditIcon fontSize="small" sx={{ mr: 1 }} /> Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                onDelete();
              }}
              sx={{ minWidth: 80, color: 'error.main' }}
            >
              <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Delete
            </MenuItem>
          </MenuRow>
        </Menu>
      </ActionsWrapper>
    </CardContainer>
  );
}
