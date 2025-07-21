'use client';

import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';

import Filter from './components/CalendarToolbar/Filter';
import MonthSelect from './components/CalendarToolbar/MonthSelect';
import Search from './components/CalendarToolbar/Search';
import Switch from './components/CalendarToolbar/Switch';
import Tag from './components/CalendarToolbar/Tag';
import WeekSelect from './components/CalendarToolbar/WeekSelect';
import CalendarView from './components/CalendarView';

const styles = {
  pageContainer: (width: number) => ({
    display: 'flex',
    margin: width <= 600 ? 0 : width <= 900 ? '0 0 0 80px' : '0 0 0 240px',
    background: 'linear-gradient(to bottom, #effbf5, #fff 100%)',
    boxSizing: 'border-box',
  }),
  mainContent: {
    margin: 0,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: '20px',
  },
  contentContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '24px 0 24px 0',
    borderRadius: '20px',
    overflowX: 'visible',
    background: 'transparent',
  },
  calendarBox: {
    width: '1155px',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: 'none',
  },
  titleBar: {
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    borderBottom: '1px solid #eaeaea',
  },
  titleText: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#060606',
    lineHeight: 1.22,
  },
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<'weekly' | 'monthly'>('monthly');
  const [selectedFilters, setSelectedFilters] = useState([
    'task',
    'completed',
    'missed',
    'follow-up',
  ]);
  const [search, setSearch] = useState('');

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  let width = 1200;
  if (isSm) {
    width = 600;
  } else if (isMd) {
    width = 900;
  }
  const getSidebarWidth = (width: number) => {
    if (width <= 600) return 0;
    if (width <= 900) return 80;
    return 240;
  };
  const sidebarWidth = getSidebarWidth(width);

  return (
    <Box sx={styles.pageContainer(width)}>
      <Box sx={styles.mainContent}>
        <Box sx={styles.titleBar}>
          <Typography sx={styles.titleText}>Calendar</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Search onSearch={setSearch} />
            <Filter onFilterChange={setSelectedFilters} />
          </Box>
        </Box>
        <Box sx={{ width: '100%', height: 1, background: '#eaeaea' }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 2,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: -1,
          }}
        >
          {viewType === 'monthly' ? (
            <MonthSelect value={currentDate} onChange={setCurrentDate} />
          ) : (
            <WeekSelect value={currentDate} onChange={setCurrentDate} />
          )}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingRight: '24px',
              height: 40,
            }}
          >
            <Tag />
            <Switch value={viewType} onChange={setViewType} />
          </Box>
        </Box>
        <Box sx={styles.contentContainer}>
          <Box
            sx={{
              width: `calc(100vw - ${sidebarWidth}px)`,
              maxWidth: 1155,
              minWidth: 0,
              background: '#fff',
              borderRadius: '12px',
              boxShadow: 'none',
              overflowX: 'auto',
              mx: 'auto',
            }}
          >
            <CalendarView
              viewType={viewType}
              currentDate={currentDate}
              onDateChange={setCurrentDate}
              selectedFilters={selectedFilters}
              search={search}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
