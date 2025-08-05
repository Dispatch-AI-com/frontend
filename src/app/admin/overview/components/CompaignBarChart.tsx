import { Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import React from 'react';

import type { SimpleAggregatedLog } from './utils/ChartData';

interface CampaignBarChartProps {
  data: SimpleAggregatedLog[];
  isLoading?: boolean;
  isService?: boolean;
}

export default function CampaignBarChart({
  data,
  isLoading,
  isService = false,
}: CampaignBarChartProps) {
  if (isLoading) return <Typography>Loading...</Typography>;
  if (!data || data.length === 0) return <Typography> </Typography>;

  const xLabels = data.map(d => d.name);

  return (
    <Box sx={{ width: '100%', height: 320 }}>
      <BarChart
        margin={{ left: 0 }}
        grid={{ horizontal: true, vertical: false }}
        borderRadius={5}
        xAxis={[
          {
            scaleType: 'band',
            data: xLabels,
            tickLabelStyle: { fontSize: 12, fill: '#6d6d6d' },
          },
        ]}
        yAxis={[
          {
            label: isService ? 'Number of Bookings' : 'Number of Phone Calls',
            tickMinStep: 1,
          },
        ]}
        series={
          isService
            ? [
                {
                  data: data.map(d => (d.type === 'service' ? d.completed : 0)),
                  label: 'Done',
                  color: '#90CAF9',
                },
                {
                  data: data.map(d => (d.type === 'service' ? d.followUp : 0)),
                  label: 'Confirmed',
                  color: '#8df556',
                },
              ]
            : [
                {
                  data: data.map(d => (d.type === 'call' ? d.count : 0)),
                  label: 'Phone Calls',
                  color: '#8df556',
                },
              ]
        }
        slotProps={{
          legend: {
            sx: {
              '& .MuiChartsLegend-label': {
                fontSize: 13,
                fill: '#333',
                fontWeight: 500,
              },
            },
          },
        }}
        height={300}
        sx={{
          '.MuiChartsAxis-left .MuiChartsAxis-label': {
            transform: 'translate(5px, 0)',
            fill: '#060606',
            fontSize: 13,
          },
        }}
      />
    </Box>
  );
}
