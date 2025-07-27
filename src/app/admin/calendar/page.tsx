'use client';

import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';

import Filter from './components/CalendarToolbar/Filter';
import MonthSelect from './components/CalendarToolbar/MonthSelect';
import Search from './components/CalendarToolbar/Search';
import Switch from './components/CalendarToolbar/Switch';
import Tag from './components/CalendarToolbar/Tag';
import WeekSelect from './components/CalendarToolbar/WeekSelect';
import CalendarView from './components/CalendarView';

const styles = {
  pageContainer: () => ({
    display: 'flex',
    margin: 0,
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
    'Cancelled',
    'Confirmed',
    'Done',
  ]);
  const [search, setSearch] = useState('');

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #effbf5, #fff 100%)',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: { xs: 0, sm: '80px', md: '240px' },
          flexShrink: 0,
          transition: 'width 0.2s',
        }}
      />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 'calc(100vh - 16px)',
          overflow: 'auto',
          margin: '8px 8px 8px 0',
        }}
      >
        <Box sx={styles.mainContent}>
          <Box sx={styles.titleBar}>
            <Typography sx={styles.titleText}>Calendar</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Search onSearch={setSearch} />
              <Filter onFilterChange={setSelectedFilters} />
            </Box>
          </Box>
          <Box sx={{ width: '100%', height: '1px', background: '#eaeaea' }} />
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
                width: '100%',
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
    </Box>
  );
}
