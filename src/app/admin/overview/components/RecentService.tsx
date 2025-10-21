'use client';

import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';

import { useGetServiceByIdQuery } from '@/features/service/serviceApi';
import { useGetBookingsQuery } from '@/features/service/serviceBookingApi';
import type { RootState } from '@/redux/store';

const styles = {
  container: {
    height: '244px',
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px solid #eaeaea',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflow: 'hidden',
  },
  header: {
    height: '52px',
    backgroundColor: '#fafafa',
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    borderBottom: '1px solid #eaeaea',
  },
  headerText: {
    fontSize: '14px',
    color: '#6d6d6d',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 20px',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '36px',
    fontSize: '14px',
    color: '#060606',
  },
  cell: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    height: '52px',
    paddingRight: '8px',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '16px',
    overflowY: 'auto',
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '16px',
    border: '1px solid #e9ecef',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#060606',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  cardLabel: {
    fontSize: '12px',
    fontWeight: 500,
    color: '#6d6d6d',
    minWidth: '80px',
  },
  cardValue: {
    fontSize: '14px',
    color: '#060606',
    flex: 1,
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
};

const ServiceName = ({ serviceId }: { serviceId: string }) => {
  const { data, isLoading } = useGetServiceByIdQuery(serviceId, {
    skip: !serviceId,
  });
  return <>{isLoading ? 'Loading...' : (data?.name ?? serviceId)}</>;
};

export default function RecentService() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const user = useSelector((state: RootState) => state.auth.user);
  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(' ') ??
    user?.email ??
    'Unknown';

  const {
    data: bookings,
    isLoading,
    error,
  } = useGetBookingsQuery({ userId: user?._id }, { skip: !user?._id });

  const renderDesktopRows = () => {
    if (!bookings || bookings.length === 0) return null;
    return bookings.slice(0, 3).map(booking => (
      <Box key={booking._id} sx={styles.row}>
        <Box sx={{ ...styles.cell, flex: 1.2 }}>
          <ServiceName serviceId={booking.serviceId} />
        </Box>
        <Box sx={{ ...styles.cell, flex: 1 }}>
          <Image
            src="/avatars/user-avatar.jpg"
            alt={fullName}
            width={28}
            height={28}
            style={{ borderRadius: '50%', marginRight: 8 }}
          />
          {fullName}
        </Box>
        <Box sx={{ ...styles.cell, flex: 1 }}>
          {dayjs(booking.bookingTime).format('YYYY/MM/DD HH:mm:ss')}
        </Box>
        <Box sx={{ ...styles.cell, flex: 1 }}>{booking.note}</Box>
      </Box>
    ));
  };

  const renderMobileCards = () => {
    if (!bookings || bookings.length === 0) return null;
    return bookings.slice(0, 3).map(booking => (
      <Box key={booking._id} sx={styles.card}>
        <Box sx={styles.cardHeader}>
          <Typography sx={styles.cardTitle}>
            <ServiceName serviceId={booking.serviceId} />
          </Typography>
        </Box>
        <Box>
          <Box sx={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
            <Typography sx={styles.cardLabel}>Created By:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <Image
                src="/avatars/user-avatar.jpg"
                alt={fullName}
                width={20}
                height={20}
                style={{ borderRadius: '50%', marginRight: 8 }}
              />
              <Typography sx={styles.cardValue}>{fullName}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
            <Typography sx={styles.cardLabel}>Date & Time:</Typography>
            <Typography sx={styles.cardValue}>
              {dayjs(booking.bookingTime).format('YYYY/MM/DD HH:mm:ss')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '8px' }}>
            <Typography sx={styles.cardLabel}>Description:</Typography>
            <Typography sx={styles.cardValue}>{booking.note}</Typography>
          </Box>
        </Box>
      </Box>
    ));
  };

  return (
    <Box sx={styles.container}>
      {!isMobile && (
        <Box sx={styles.header}>
          <Stack direction="row" spacing={0} sx={{ width: '100%' }}>
            <Box sx={{ flex: 1.2 }}>
              <Typography sx={styles.headerText}>Service Name</Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={styles.headerText}>Created By</Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={styles.headerText}>Date & Time</Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={styles.headerText}>Description</Typography>
            </Box>
          </Stack>
        </Box>
      )}
      <Box sx={isMobile ? styles.cardContainer : styles.content}>
        {isLoading ? (
          <Typography sx={{ color: '#6d6d6d', textAlign: 'center' }}>
            Loading...
          </Typography>
        ) : error ? (
          <Typography sx={{ color: 'red', textAlign: 'center' }}>
            Failed to load
          </Typography>
        ) : bookings && bookings.length > 0 ? (
          isMobile ? (
            renderMobileCards()
          ) : (
            renderDesktopRows()
          )
        ) : (
          <Box sx={styles.emptyState}>
            <Image
              src="/overview/invalid-name.svg"
              alt="No bookings"
              width={100}
              height={100}
              priority
            />
            <Typography sx={{ marginTop: '8px' }}>No bookings found</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
