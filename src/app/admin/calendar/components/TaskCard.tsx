import { Box } from '@mui/material';
import React from 'react';

import { calendarStatusColor } from './calendarStatusColor';

interface TaskCardProps {
  taskName: string;
  status: 'Confirmed' | 'Done' | 'Cancelled';
  onClick?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ taskName, status, onClick }) => {
  const style = calendarStatusColor[status] || calendarStatusColor.Cancelled;
  return (
    <Box
      onClick={onClick}
      onKeyDown={e => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '4px',
        height: { xs: 20, sm: 24 },
        marginBottom: { xs: '2px', sm: '4px' },
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
        paddingLeft: { xs: '4px', sm: '8px' },
        paddingRight: { xs: '4px', sm: '8px' },
        fontSize: { xs: '11px', sm: '12px' },
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        letterSpacing: 'normal',
        color: '#060606',
        minWidth: 0,
        marginLeft: { xs: '4px', sm: '10px' },
        background: style.bg,
        cursor: onClick ? 'pointer' : 'default',
      }}
      title={taskName}
    >
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '2px',
          height: { xs: 20, sm: 24 },
          borderRadius: '2px',
          background: style.bar,
        }}
      />
      <Box
        sx={{
          flex: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          marginLeft: { xs: '4px', sm: '8px' },
        }}
      >
        {taskName}
      </Box>
    </Box>
  );
};

export default TaskCard;
