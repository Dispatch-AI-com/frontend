'use client';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { styled } from '@mui/material/styles';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { enGB } from 'date-fns/locale';
import React, { useState } from 'react';
import {
  Calendar,
  dateFnsLocalizer,
  type DateLocalizer,
} from 'react-big-calendar';
import { useSelector } from 'react-redux';

import { useGetBookingsQuery } from '@/features/calendar/calendarApi';
import { useGetCompanyByUserIdQuery } from '@/features/company/companyApi';

import TaskCard from './TaskCard';
import TaskDetailModal from './TaskDetailModal';

interface Booking {
  _id: string;
  serviceId?: {
    name?: string;
  };
  client?: {
    name?: string;
  };
  bookingTime: string | Date;
  status: string;
}

interface RootState {
  auth?: {
    user?: {
      _id: string;
    };
  };
}

const locales = { 'en-GB': enGB };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
});

const StyledCalendarWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 1155,
  minWidth: 0,
  marginLeft: 0,
  background: '#fff',
  borderRadius: 12,
  overflowX: 'hidden',
  boxSizing: 'border-box',
  border: '1px solid #eee',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '100vw',
    borderRadius: 0,
  },
  '.rbc-month-view .rbc-date-cell': {
    position: 'relative',
    paddingBottom: 8,
    paddingRight: 8,
    minHeight: 32,
    alignItems: 'initial',
    justifyContent: 'initial',
  },
  '.rbc-month-view .rbc-date-cell .rbc-button-link': {
    position: 'absolute',
    bottom: 8,
    right: 8,
    zIndex: 2,
    float: 'none',
    alignSelf: 'auto',
    margin: 0,
    padding: 0,
  },
  '.rbc-month-view .rbc-date-cell.rbc-now, .rbc-month-view .rbc-day-bg.rbc-today':
    {
      background: 'transparent',
    },
  '.rbc-month-view .rbc-date-cell.rbc-now .rbc-button-link': {
    background: '#060606',
    color: '#a8f574',
    borderRadius: '50%',
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 500,
    border: 'none',
    margin: 0,
    padding: '2px 4px 2px 3px',
  },
  '.rbc-month-header': {
    height: 52,
  },
  '.rbc-header, .rbc-day-bg, .rbc-date-cell': {
    width: 'calc(100% / 7)',
    minWidth: 'calc(100% / 7)',
    maxWidth: 'calc(100% / 7)',
    boxSizing: 'border-box',
  },
  '.rbc-header': {
    textAlign: 'left',
    fontWeight: 500,
    fontSize: 13,
    color: '#6d6d6d',
    lineHeight: 1.23,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 8,
  },
  '.rbc-date-cell span': {
    fontSize: 14,
    color: '#888',
  },
  '.rbc-month-row': {
    minHeight: 108,
    maxHeight: 108,
  },
  '.rbc-event': {
    width: '80%',
    minWidth: 0,
    maxWidth: '200px',
    height: 24,
    minHeight: 24,
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
    padding: 0,
    margin: '0 0 0 8px',
    '@media (max-width: 600px)': {
      width: '100%',
      maxWidth: 'none',
      margin: 0,
    },
  },
  '.rbc-month-view': {
    borderRadius: 12,
  },
  '.rbc-time-header-content, .rbc-time-content': {
    borderRadius: '0 0 12px 12px',
  },
  '.rbc-time-header-cell': {
    width: 165,
    minWidth: 165,
    maxWidth: 165,
    textAlign: 'center',
    fontWeight: 500,
    fontSize: 16,
  },
  '.rbc-timeslot-group': {
    height: 108,
  },
  '.rbc-month-view .rbc-day-bg.rbc-off-range, .rbc-month-view .rbc-day-bg.rbc-off-range-bg':
    {
      backgroundColor: '#fafafa',
      background: '#fafafa',
    },
  '.rbc-month-view .rbc-date-cell.rbc-off-range span, .rbc-month-view .rbc-date-cell.rbc-off-range a':
    {
      color: '#ccc',
    },
}));

interface MonthlyViewProps {
  value: Date;
  onChange: (date: Date) => void;
  selectedFilters?: string[];
  search?: string;
}

const MonthlyView: React.FC<MonthlyViewProps> = ({
  value,
  onChange,
  selectedFilters = ['task', 'completed', 'missed', 'follow-up'],
  search = '',
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Booking | null>(null);
  const userId = useSelector((state: RootState) => state.auth?.user?._id);
  const { data: company } = useGetCompanyByUserIdQuery(userId!, {
    skip: !userId,
  });
  const companyId = company?._id;
  const { data: bookings = [] } = useGetBookingsQuery(
    { companyId },
    { skip: !companyId },
  ) as { data: Booking[] };

  const filteredBookings = bookings.filter(
    (item: Booking) =>
      (item.client?.name ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (item.serviceId?.name ?? '').toLowerCase().includes(search.toLowerCase()),
  );

  const allEvents = filteredBookings.map((item: Booking) => ({
    ...item,
    id: item._id,
    title: `${item.serviceId?.name ?? ''} - ${item.client?.name ?? ''}`,
    start: new Date(item.bookingTime),
    end: new Date(item.bookingTime),
  }));

  const events = allEvents.filter((event: Booking) => {
    if (selectedFilters.length === 0) return false;
    const statusToFilterMap: Record<string, string> = {
      task: 'task',
      completed: 'completed',
      missed: 'missed',
      followup: 'follow-up',
    };
    const filterType = statusToFilterMap[event.status];
    return filterType ? selectedFilters.includes(filterType) : false;
  });

  return (
    <StyledCalendarWrapper>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week']}
        defaultView="month"
        date={value}
        onNavigate={onChange}
        culture="en-GB"
        formats={{
          weekdayFormat: (
            date: Date,
            culture: string | undefined,
            localizer: DateLocalizer | undefined,
          ) => localizer?.format(date, 'EEEE', culture) ?? '',
        }}
        style={{
          background: '#fff',
          borderRadius: 12,
        }}
        popup
        toolbar={false}
        components={{
          event: ({ event }: { event: Booking }) => (
            <TaskCard
              taskName={`${event.serviceId?.name ?? ''} - ${event.client?.name ?? ''}`}
              status={
                event.status as 'task' | 'completed' | 'missed' | 'followup'
              }
              onClick={() => {
                setSelectedTask(event);
                setModalOpen(true);
              }}
            />
          ),
        }}
      />
      <TaskDetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        task={selectedTask ?? undefined}
      />
    </StyledCalendarWrapper>
  );
};

export default MonthlyView;
