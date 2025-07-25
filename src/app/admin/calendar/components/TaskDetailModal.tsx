import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import BuildIcon from '@mui/icons-material/Build';
import PersonIcon from '@mui/icons-material/Person';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import React from 'react';

interface Task {
  status?: string;
  bookingTime?: string | Date;
  start?: string | Date;
  client?: {
    name?: string;
    phoneNumber?: string;
    address?: string;
  };
  serviceId?: {
    name?: string;
    price?: number;
    notifications?: {
      phoneNumber?: string;
      email?: string;
    };
    isAvailable?: boolean;
    description?: string;
  };
  note?: string;
}

interface Service {
  name?: string;
  price?: number;
  notifications?: {
    phoneNumber?: string;
    email?: string;
  };
  isAvailable?: boolean;
  description?: string;
}

interface TaskDetailModalProps {
  open: boolean;
  onClose: () => void;
  task?: Task;
  service?: Service;
}

const iconSx = { verticalAlign: 'middle', mr: 0.75, color: '#a8f574' };
const sectionSx = { mb: 1 };
const hrSx = { my: 1.5 };

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  open,
  onClose,
  task,
  service,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth="sm"
    fullWidth
    disableScrollLock
  >
    <DialogTitle>Task Detail</DialogTitle>
    <DialogContent dividers>
      {task ? (
        <Box>
          <Box sx={sectionSx}>
            <AssignmentTurnedInIcon sx={iconSx} />
            <Typography component="span" fontWeight={700}>
              Task Status:
            </Typography>{' '}
            {task.status}
          </Box>
          <Box sx={sectionSx}>
            <AccessTimeIcon sx={iconSx} />
            <Typography component="span" fontWeight={700}>
              Booking time:
            </Typography>{' '}
            {task.bookingTime
              ? new Date(task.bookingTime).toLocaleString()
              : task.start
                ? new Date(task.start).toLocaleString()
                : ''}
          </Box>
          <Divider sx={hrSx} />
          <Box sx={sectionSx}>
            <PersonIcon sx={iconSx} />
            <Typography component="span" fontWeight={700}>
              Client Info
            </Typography>
          </Box>
          <Typography>Name: {task.client?.name ?? '-'}</Typography>
          <Typography>Phone: {task.client?.phoneNumber ?? '-'}</Typography>
          <Typography>Address: {task.client?.address ?? '-'}</Typography>
          <Divider sx={hrSx} />
          <Box sx={sectionSx}>
            <BuildIcon sx={iconSx} />
            <Typography component="span" fontWeight={700}>
              Service Info
            </Typography>
          </Box>
          <Typography>Name: {service?.name ?? '-'}</Typography>
          <Typography>Price: {service?.price ?? '-'}</Typography>
          <Typography>
            Phone: {service?.notifications?.phoneNumber ?? '-'}
          </Typography>
          <Typography>Email: {service?.notifications?.email ?? '-'}</Typography>
          <Typography>
            Is Available:{' '}
            {typeof service?.isAvailable === 'boolean'
              ? service.isAvailable
                ? 'Yes'
                : 'No'
              : '-'}
          </Typography>
          <Typography>Description: {service?.description ?? '-'}</Typography>
          <Divider sx={hrSx} />
          <Box sx={sectionSx}>
            <StickyNote2Icon sx={iconSx} />
            <Typography component="span" fontWeight={700}>
              Note:
            </Typography>{' '}
            {task.note ?? '-'}
          </Box>
        </Box>
      ) : (
        <Typography>No data</Typography>
      )}
    </DialogContent>
    <DialogActions>
      <Button
        onClick={onClose}
        variant="contained"
        sx={{
          background: '#a8f574',
          borderColor: '#a8f574',
          color: '#222',
          boxShadow: 'none',
          '&:hover': {
            background: '#a8f574',
            borderColor: '#a8f574',
            boxShadow: 'none',
          },
        }}
      >
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

export default TaskDetailModal;
