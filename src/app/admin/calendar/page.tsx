'use client';

import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { AdminPageLayout } from '@/components/layout/admin-layout';
import { useSubscription } from '@/features/subscription/useSubscription';
import { getPlanTier, isProPlan } from '@/utils/planUtils';

import Filter from './components/CalendarToolbar/Filter';
import MonthSelect from './components/CalendarToolbar/MonthSelect';
import Search from './components/CalendarToolbar/Search';
import Switch from './components/CalendarToolbar/Switch';
import Tag from './components/CalendarToolbar/Tag';
import WeekSelect from './components/CalendarToolbar/WeekSelect';
import CalendarView from './components/CalendarView';

const styles = {
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
  toolbarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: -1,
  },
  toolbarRight: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: '24px',
    height: 40,
  },
};

export default function CalendarPage() {
  const router = useRouter();
  const { subscription } = useSubscription();
  const isPro = isProPlan(getPlanTier(subscription));
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<'weekly' | 'monthly'>('monthly');
  const [selectedFilters, setSelectedFilters] = useState([
    'Cancelled',
    'Confirmed',
    'Done',
  ]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!isPro) {
      router.replace(
        '/admin/overview?featurePrompt=' + encodeURIComponent('Calendar'),
      );
    }
  }, [isPro, router]);

  if (!isPro) return null;

  const headerActions = (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Search onSearch={setSearch} />
      <Filter onFilterChange={setSelectedFilters} />
    </Box>
  );

  return (
    <AdminPageLayout
      title="Calendar"
      headerActions={headerActions}
      padding="normal"
      background="solid"
    >
      <Box sx={styles.toolbarContainer}>
        {viewType === 'monthly' ? (
          <MonthSelect value={currentDate} onChange={setCurrentDate} />
        ) : (
          <WeekSelect value={currentDate} onChange={setCurrentDate} />
        )}
        <Box sx={styles.toolbarRight}>
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
    </AdminPageLayout>
  );
}
