import React from 'react';

import MonthlyView from './MonthlyView';
import WeeklyView from './WeeklyView';

interface CalendarViewProps {
  viewType: 'monthly' | 'weekly';
  currentDate: Date;
  onDateChange: (date: Date) => void;
  selectedFilters?: string[];
  search?: string;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  viewType,
  currentDate,
  onDateChange,
  selectedFilters = ['Cancelled', 'Confirmed', 'Done'],
  search = '',
}) =>
  viewType === 'monthly' ? (
    <MonthlyView
      value={currentDate}
      onChange={onDateChange}
      selectedFilters={selectedFilters}
      search={search}
    />
  ) : (
    <WeeklyView
      value={currentDate}
      onChange={onDateChange}
      selectedFilters={selectedFilters}
      search={search}
    />
  );

export default CalendarView;
