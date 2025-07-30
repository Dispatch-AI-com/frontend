'use client';
import { Box, Switch, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

import theme from '@/theme';

const CalendarForm = styled(Box)({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(0, 3),
  marginTop: theme.spacing(1),
});

const CalendarOption = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1.5, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
  },
});

const CalendarLabel = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
});

const ColorDot = styled(Box)(({ color }: { color: string }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: color,
}));

const CustomSwitch = styled(Switch)({
  width: 38,
  height: 20,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(18px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#58c112',
        opacity: 1,
        border: 0,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#4caf50',
      border: '6px solid #fff',
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 16,
    height: 16,
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  '& .MuiSwitch-track': {
    borderRadius: 20 / 2,
    backgroundColor: '#e0e0e0',
    opacity: 1,
    transition: 'background-color 300ms',
  },
});

export interface CalendarItem {
  id: string;
  name: string;
  color: string;
  checked: boolean;
}

interface CalendarOptionsListProps {
  calendars: CalendarItem[];
  onToggle: (calendarId: string) => void;
  title?: string;
}

export default function CalendarOptionsList({
  calendars,
  onToggle,
  title = 'Calendars to show:',
}: CalendarOptionsListProps) {
  return (
    <>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
        {title}
      </Typography>
      <CalendarForm>
        {calendars.map(calendar => (
          <CalendarOption key={calendar.id}>
            <CalendarLabel>
              <ColorDot color={calendar.color} />
              <Typography variant="body2">{calendar.name}</Typography>
            </CalendarLabel>
            <CustomSwitch
              checked={calendar.checked}
              onChange={() => onToggle(calendar.id)}
              size="small"
            />
          </CalendarOption>
        ))}
      </CalendarForm>
    </>
  );
}
