'use client';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { GlobalStyles } from '@mui/material';
import { styled } from '@mui/material/styles';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { enGB } from 'date-fns/locale';
import React, { useMemo, useState } from 'react';
import {
  Calendar,
  dateFnsLocalizer,
  type DateLocalizer,
} from 'react-big-calendar';
import { useSelector } from 'react-redux';

import { useGetBookingsQuery } from '@/features/calendar/calendarApi';
import type { ServiceManagement } from '@/features/service-management/serviceManagementApi';
import { useGetServicesQuery } from '@/features/service-management/serviceManagementApi';

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
  overflow: 'visible',
  boxSizing: 'border-box',
  border: '1px solid #eee',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '100vw',
    overflowX: 'auto',
    borderRadius: 0,
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
  selectedFilters = ['Confirmed', 'Done', 'Cancelled'],
  search = '',
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Booking | null>(null);
  const userId = useSelector((state: RootState) => state.auth?.user?._id);

  const { data: bookings = [] } = useGetBookingsQuery(
    { userId },
    { skip: !userId },
  );

  const { data: services = [] } =
    useGetServicesQuery({ userId: userId ?? '' }, { skip: !userId }) ?? {};

  const serviceMap = useMemo(() => {
    const map = new Map<string, ServiceManagement>();
    if (Array.isArray(services)) {
      services.forEach(s => {
        if (s && typeof s._id === 'string') {
          map.set(s._id, s);
        }
      });
    }
    return map;
  }, [services]);

  const filteredBookings = useMemo(() => {
    return bookings.filter(item => {
      if (!item) return false;

      const clientName = (item.client?.name ?? '').toLowerCase();
      const serviceName = (
        serviceMap.get(item.serviceId)?.name ?? ''
      ).toLowerCase();
      const searchLower = search.toLowerCase();

      return (
        clientName.includes(searchLower) || serviceName.includes(searchLower)
      );
    });
  }, [bookings, serviceMap, search]);

  const events = useMemo(() => {
    return filteredBookings
      .map((item: Booking) => {
        const service = serviceMap.get(item.serviceId);
        const serviceName = service?.name ?? 'Unknown Service';
        const clientName = item.client?.name ?? 'Unknown Client';

        return {
          ...item,
          id: item._id,
          title: `${serviceName} - ${clientName}`,
          start: new Date(item.bookingTime),
          end: new Date(item.bookingTime),
        };
      })
      .filter(event => selectedFilters.includes(event.status));
  }, [filteredBookings, serviceMap, selectedFilters]);

  const handleEventClick = (event: Booking) => {
    setSelectedTask(event);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <GlobalStyles
        styles={{
          '.rbc-month-view .rbc-event, .rbc-month-view .rbc-row-segment': {
            height: 28,
            lineHeight: '28px',
            background: 'transparent',
            border: 'none',
            boxShadow: 'none',
            padding: 0,
            margin: 0,
          },
          '.rbc-overlay': {
            zIndex: 1300,
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            animation: 'popupFadeIn 0.2s ease-out',
            overflow: 'hidden',
          },
          '@keyframes popupFadeIn': {
            '0%': {
              opacity: 0,
              transform: 'scale(0.95) translateY(-10px)',
            },
            '100%': {
              opacity: 1,
              transform: 'scale(1) translateY(0)',
            },
          },
          '.rbc-overlay-header': {
            height: '48px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: 600,
            color: '#333',
            borderBottom: '1px solid #e0e0e0',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
          '.rbc-overlay .rbc-event': {
            background: 'transparent',
            border: 'none',
            boxShadow: 'none',
            padding: '4px 8px',
            margin: '2px 0',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 500,
            color: '#333',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          },
          '.rbc-overlay .rbc-event.rbc-selected': {
            backgroundColor: '#e3f2fd',
          },
          '.rbc-month-view .rbc-show-more': {
            display: 'inline-block',
            position: 'relative',
            bottom: -10,
            left: 10,
            fontSize: '0.7rem',
            fontWeight: 500,
            color: '#4a4a4a',
            cursor: 'pointer',
            padding: '2px 8px',
            borderRadius: '9999px',
            backgroundColor: '#ffffff',
            border: 'none',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            transition:
              'background-color 0.3s ease, transform 0.15s ease, box-shadow 0.3s ease',
            '&:hover': {
              backgroundColor: '#f5f5f5',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
              transform: 'translateY(-1px)',
            },
          },
        }}
      />
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
          popupOffset={{ x: 30, y: 20 }}
          toolbar={false}
          components={{
            event: ({ event }: { event: Booking }) => (
              <TaskCard
                taskName={`${serviceMap.get(event.serviceId)?.name ?? ''} - ${event.client?.name ?? ''}`}
                status={event.status as 'Confirmed' | 'Done' | 'Cancelled'}
                onClick={() => handleEventClick(event)}
              />
            ),
          }}
        />
        {modalOpen && selectedTask && (
          <TaskDetailModal
            open={modalOpen}
            onClose={handleModalClose}
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
        )}
      </StyledCalendarWrapper>
    </>
  );
};

export default MonthlyView;
