import 'react-big-calendar/lib/css/react-big-calendar.css';

import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { format, getDay, isSameDay, parse, startOfWeek } from 'date-fns';
import { enGB } from 'date-fns/locale';
import React, { useEffect, useMemo } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
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

const StyledWeeklyCalendarWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 1155,
  minWidth: 0,
  background: '#fff',
  borderRadius: 12,
  border: '1px solid #eee',
  overflowX: 'auto',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '100vw',
    overflowX: 'auto',
    borderRadius: 0,
  },
  '.rbc-allday-slot, .rbc-allday-cell': {
    display: 'none !important',
  },
  '.rbc-header': {
    position: 'sticky',
    top: 0,
    zIndex: 3,
    background: '#fff',
    height: 72,
    lineHeight: 1.1,
    borderBottom: '1px solid #eee',
    alignItems: 'flex-start !important',
    justifyContent: 'flex-start !important',
    textAlign: 'left !important',
    paddingTop: 0,
  },
  '.rbc-header:last-child': {
    borderRight: 'none',
  },
  '.rbc-time-content': {
    overflowY: 'auto !important',
    width: '100% !important',
    boxSizing: 'border-box !important',
    marginRight: 0,
    paddingRight: 0,
  },
  '.rbc-row.rbc-row-bg, .rbc-row.rbc-day-bg, .rbc-day-bg': {
    display: 'none !important',
  },
  '.rbc-time-gutter': {
    width: 86,
    minWidth: 86,
    maxWidth: 86,
  },
  '.rbc-time-gutter .rbc-label': {
    display: 'flex !important',
    alignItems: 'center !important',
    justifyContent: 'center !important',
    height: 80,
    width: '100%',
    fontSize: 14,
    color: '#6d6d6d',
    textAlign: 'center',
    boxSizing: 'border-box',
  },
  '.rbc-timeslot-group > .rbc-time-slot, .rbc-timeslot-group > .rbc-day-slot': {
    height: 80,
    minHeight: 80,
    margin: 0,
    padding: 0,
  },
  '.rbc-current-time-indicator': {
    background:
      'repeating-linear-gradient(to right, #060606 0px, #060606 2px, transparent 2px, transparent 4px)',
    height: 1,
  },
  '.rbc-current-time-indicator::before': {
    content: "''",
    position: 'absolute',
    left: -8,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 16,
    height: 16,
    borderRadius: '50%',
    backgroundColor: '#a8f574',
    border: 'solid 1px #060606',
  },
  '.rbc-month-view .rbc-day-bg.rbc-today, .rbc-time-view .rbc-day-bg.rbc-today, .rbc-day-bg.rbc-today':
    {
      background: '#f8fff4 !important',
      backgroundColor: '#f8fff4 !important',
    },
  '.rbc-header.rbc-today': {
    background: '#f8fff4 !important',
  },
  '.rbc-day-slot.rbc-today': {
    background: '#f8fff4 !important',
    backgroundColor: '#f8fff4 !important',
  },
  '.rbc-event-label': {
    display: 'none !important',
  },
  '.rbc-event': {
    background: 'none !important',
    padding: 0,
    margin: 0,
    width: '100% !important',
    borderRadius: 6,
    boxSizing: 'border-box',
  },
  '.rbc-event-content': {
    paddingLeft: 0,
    width: '100% !important',
    backgroundColor: 'inherit !important',
    borderRadius: 6,
    boxSizing: 'border-box',
  },
  '.rbc-time-content .rbc-event': {
    left: '0 !important',
    width: '100% !important',
    minWidth: '0 !important',
    maxWidth: '100% !important',
    marginLeft: '0 !important',
    marginRight: '0 !important',
  },
}));

export interface CalendarEvent {
  id: string | number;
  title: string;
  start: Date;
  end: Date;
  color?: string;
}

interface WeeklyViewProps {
  value: Date;
  onChange: (date: Date) => void;
  selectedFilters: string[];
  search: string;
}

const DayHeader: React.FC<{ date: Date }> = ({ date }) => {
  const dayNumber = date.getDate();
  const dayName = format(date, 'EEEE', { locale: enGB });
  const isToday = isSameDay(date, new Date());
  const isSmallScreen = useMediaQuery('(max-width:800px)');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: '100%',
        width: '100%',
        paddingLeft: 2,
        paddingTop: 8,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: isToday ? '#000' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 6,
          marginTop: 0,
          marginLeft: 0,
        }}
      >
        <span
          style={{
            width: 23,
            height: 24,
            fontFamily:
              'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
            fontSize: 20,
            fontWeight: isToday ? 700 : 400,
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: 1.2,
            letterSpacing: 'normal',
            color: isToday ? '#a8f574' : '#000',
            marginLeft: -2,
          }}
        >
          {dayNumber}
        </span>
      </div>
      <div
        style={{
          fontSize: isSmallScreen ? 20 : 14,
          color: '#6d6d6d',
          fontWeight: 400,
          lineHeight: 1,
        }}
      >
        {isSmallScreen ? dayName.substring(0, 3) : dayName}
      </div>
    </div>
  );
};

const WeeklyView: React.FC<WeeklyViewProps> = ({
  value,
  onChange,
  selectedFilters,
  search,
}) => {
  const userId = useSelector((state: RootState) => state.auth?.user?._id);
  const { data: bookings = [] } = useGetBookingsQuery(
    { userId },
    { skip: !userId },
  );

  const { data: services = [] } =
    useGetServicesQuery({ userId: userId ?? '' }, { skip: !userId }) ?? {};
  const serviceMap = useMemo(() => {
    const map = new Map<string, ServiceManagement>();
    (Array.isArray(services) ? services : []).forEach(s => {
      if (s && typeof s._id === 'string') {
        map.set(s._id, s);
      }
    });
    return map;
  }, [services]);

  const filteredBookings = bookings.filter(item => {
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

  const allEvents = filteredBookings.map((item: Booking) => {
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
  });

  const events = allEvents.filter(event => {
    const isIncluded = selectedFilters.includes(event.status);
    return isIncluded;
  });

  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<Booking | null>(null);

  const { minTime, maxTime } = useMemo(() => {
    const min = new Date(value);
    min.setHours(0, 0, 0, 0);
    const max = new Date(value);
    max.setHours(23, 59, 59, 999);
    return { minTime: min, maxTime: max };
  }, [value]);

  const eventPropGetter = () => ({
    style: {
      backgroundColor: '#C7E0FF',
      border: 'none',
      borderRadius: 6,
      fontSize: 12,
      lineHeight: '20px',
      height: 24,
      padding: '0 6px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
    },
  });

  useEffect(() => {
    function syncHeaderPadding() {
      const content = document.querySelector('.rbc-time-content');
      const header = document.querySelector('.rbc-time-header');
      if (content && header) {
        const scrollbarWidth =
          (content as HTMLElement).offsetWidth -
          (content as HTMLElement).clientWidth;

        if (scrollbarWidth === 0) {
          (header as HTMLElement).style.paddingRight = '0px';
        }
      }
    }
    syncHeaderPadding();
    window.addEventListener('resize', syncHeaderPadding);
    return () => window.removeEventListener('resize', syncHeaderPadding);
  }, []);

  const SLOT_HEIGHT = 80;
  const HEADER_HEIGHT = 72;
  const VISIBLE_HOURS = 7;

  return (
    <StyledWeeklyCalendarWrapper
      style={{ height: SLOT_HEIGHT * VISIBLE_HOURS + HEADER_HEIGHT + 10 }}
    >
      <Calendar
        localizer={localizer}
        toolbar={false}
        date={value}
        onNavigate={onChange}
        defaultView={Views.WEEK}
        views={[Views.WEEK]}
        events={events}
        startAccessor="start"
        endAccessor="end"
        step={60}
        timeslots={1}
        min={minTime}
        max={maxTime}
        scrollToTime={minTime}
        culture="en-GB"
        components={{
          week: { header: DayHeader },
          event: ({ event }: { event: Booking }) => {
            return (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: 24,
                  lineHeight: '24px',
                  width: '100%',
                }}
              >
                <TaskCard
                  taskName={`${serviceMap.get(event.serviceId)?.name ?? ''} - ${event.client?.name ?? ''}`}
                  status={event.status as 'Confirmed' | 'Done' | 'Cancelled'}
                  onClick={() => {
                    setSelectedTask(event);
                    setModalOpen(true);
                  }}
                />
              </div>
            );
          },
        }}
        eventPropGetter={eventPropGetter}
        showMultiDayTimes={false}
        style={{ height: '100%' }}
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
                    ? { ...serviceMap.get(selectedTask.serviceId) }
                    : undefined,
              }
            : undefined
        }
        service={
          selectedTask ? serviceMap.get(selectedTask.serviceId) : undefined
        }
      />
    </StyledWeeklyCalendarWrapper>
  );
};

export default WeeklyView;
