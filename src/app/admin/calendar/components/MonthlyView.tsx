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

import type { Service } from '@/features/calendar/calendarApi';
import {
  useGetBookingsQuery,
  useGetServicesQuery,
} from '@/features/calendar/calendarApi';

import TaskCard from './TaskCard';
import TaskDetailModal from './TaskDetailModal';

interface Booking {
  _id: string;
  serviceId: string;
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
  '@media (min-width:600px) and (max-width:900px)': {
    maxWidth: 'calc(100vw - 80px)',
    width: 'calc(100vw - 80px)',
  },
  '@media (min-width:900px) and (max-width:1155px)': {
    maxWidth: 'calc(100vw - 240px)',
    width: 'calc(100vw - 240px)',
  },
  '.rbc-month-view .rbc-date-cell': {
    position: 'relative',
    width: 0,
    height: 0,
    padding: 0,
    marginTop: 10,
    overflow: 'visible',
  },
  '.rbc-month-view .rbc-date-cell .rbc-button-link': {
    position: 'absolute',
    bottom: -90,
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
    fontWeight: 700,
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
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
    padding: 0,
    margin: 0,
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
  selectedFilters = ['confirmed', 'done', 'pending'],
  search = '',
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Booking | null>(null);
  const userId = useSelector((state: RootState) => state.auth?.user?._id);
  const bookingsQueryResult = useGetBookingsQuery(
    { userId },
    { skip: !userId },
  );
  const bookingList: Booking[] = Array.isArray(bookingsQueryResult?.data)
    ? (bookingsQueryResult.data as Booking[])
    : Array.isArray(bookingsQueryResult)
      ? (bookingsQueryResult as Booking[])
      : [];

  const { data: services = [] } = useGetServicesQuery() ?? {};
  const serviceMap = React.useMemo(() => {
    const map = new Map<string, Service>();
    if (Array.isArray(services)) {
      services.forEach(s => {
        if (s && typeof s._id === 'string') {
          map.set(s._id, s);
        }
      });
    }
    return map;
  }, [services]);

  const filteredBookings = bookingList.filter(item => {
    const clientName = (item.client?.name ?? '').toLowerCase();
    const serviceName = (
      serviceMap.get(item.serviceId)?.name ?? ''
    ).toLowerCase();
    return (
      clientName.includes(search.toLowerCase()) ||
      serviceName.includes(search.toLowerCase())
    );
  });

  const allEvents = filteredBookings.map((item: Booking) => ({
    ...item,
    id: item._id,
    title: `
      ${serviceMap.get(item.serviceId)?.name ?? ''} - ${item.client?.name ?? ''}
    `,
    start: new Date(item.bookingTime),
    end: new Date(item.bookingTime),
  }));

  const events = allEvents.filter(event =>
    selectedFilters.includes(event.status),
  );

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
          dateFormat: 'd',
        }}
        style={{
          background: '#fff',
          borderRadius: 12,
        }}
        popup
        toolbar={false}
        components={{
          event: ({ event }: { event: Booking }) => {
            return (
              <TaskCard
                taskName={`${serviceMap.get(event.serviceId)?.name ?? ''} - ${event.client?.name ?? ''}`}
                status={event.status as 'confirmed' | 'done' | 'pending'}
                onClick={() => {
                  setSelectedTask(event);
                  setModalOpen(true);
                }}
              />
            );
          },
        }}
      />
      <TaskDetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        task={
          selectedTask
            ? {
                ...selectedTask,
                serviceId:
                  selectedTask.serviceId &&
                  serviceMap.get(selectedTask.serviceId)
                    ? {
                        ...serviceMap.get(selectedTask.serviceId),
                      }
                    : undefined,
              }
            : undefined
        }
        service={
          selectedTask ? serviceMap.get(selectedTask.serviceId) : undefined
        }
      />
    </StyledCalendarWrapper>
  );
};

export default MonthlyView;
