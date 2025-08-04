'use client';

import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useMemo, useState } from 'react';

import { useGetCallLogsQuery } from '@/features/callog/calllogApi';
import { useGetBookingsQuery } from '@/features/service/serviceBookingApi';
import { useAppSelector } from '@/redux/hooks';

import CampaignBarChart from './CompaignBarChart';
import type { SimpleAggregatedLog } from './utils/ChartData';
import { CallogsData, ServiceLogsData } from './utils/ChartData';

export default function CampaignProgressSection() {
  const userId = useAppSelector(state => state.auth.user?._id);
  const [tab, setTab] = useState<'phone' | 'service'>('phone');
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const { data: callLogsData, isLoading: isCallLoading } = useGetCallLogsQuery(
    { userId: userId ?? '', options: { pageSize: 1000 } },
    { skip: !userId },
  );

  const { data: bookingsData, isLoading: isServiceLoading } =
    useGetBookingsQuery({ userId: userId ?? '' }, { skip: !userId });

  const isService = tab === 'service';

  const chartData: SimpleAggregatedLog[] = useMemo(() => {
    return isService
      ? ServiceLogsData(bookingsData ?? [], period)
      : CallogsData(callLogsData?.data ?? [], period);
  }, [isService, period, callLogsData, bookingsData]);

  const handleTabChange = (
    _: React.MouseEvent<HTMLElement>,
    newValue: 'phone' | 'service',
  ) => {
    if (newValue !== null) setTab(newValue);
  };

  const handlePeriodChange = (
    _: React.MouseEvent<HTMLElement>,
    newValue: 'daily' | 'weekly' | 'monthly' | null,
  ) => {
    if (newValue !== null) setPeriod(newValue);
  };

  return (
    <Box
      sx={{
        borderRadius: '16px',
        border: '1px solid #eaeaea',
        padding: '20px 20px 20px 24px',
        width: '100%',
        minHeight: '370px',
        maxHeight: '420px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <ToggleButtonGroup
          value={tab}
          exclusive
          onChange={handleTabChange}
          sx={{
            backgroundColor: '#f1f1f1',
            borderRadius: '12px',
            height: '32px',
            '& .MuiToggleButton-root': {
              border: 'none',
              textTransform: 'none',
              fontWeight: 500,
              padding: '6px 16px',
              borderRadius: '12px',
              color: '#444',
              '&.Mui-selected': {
                backgroundColor: '#060606',
                color: '#fff',
              },
            },
          }}
        >
          <ToggleButton value="phone">Numbers of phone calls</ToggleButton>
          <ToggleButton value="service">Numbers of services</ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          value={period}
          exclusive
          onChange={handlePeriodChange}
          sx={{
            backgroundColor: '#f9f9f9',
            height: '32px',
            borderRadius: '12px',
            '& .MuiToggleButton-root': {
              border: 'none',
              textTransform: 'none',
              fontWeight: 500,
              padding: '6px 18px',
              borderRadius: '12px',
              color: '#444',

              '&.Mui-selected': {
                backgroundColor: '#b5ff80',
                color: '#000',
              },
            },
          }}
        >
          <ToggleButton value="daily">Daily</ToggleButton>
          <ToggleButton value="weekly">Weekly</ToggleButton>
          <ToggleButton value="monthly">Monthly</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <CampaignBarChart
        data={chartData}
        isLoading={isService ? isServiceLoading : isCallLoading}
        isService={isService}
      />
    </Box>
  );
}
