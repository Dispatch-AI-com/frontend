'use client';

import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';

import { useGetRecentServicesQuery } from '@/features/overview/overviewApi';
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
    fontFamily:
      'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.43,
    letterSpacing: 'normal',
    color: '#6d6d6d',
    textAlign: 'left',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    padding: '10px 20px 10px 20px',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '36px',
    fontFamily:
      'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.43,
    letterSpacing: 'normal',
    color: '#060606',
  },
  firstRow: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '36px',
    fontFamily:
      'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.43,
    letterSpacing: 'normal',
    color: '#060606',
  },
  lastRow: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '36px',
    fontFamily:
      'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.43,
    letterSpacing: 'normal',
    color: '#060606',
  },
  cell: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    height: '36px',
    paddingRight: '8px',
  },
  // mobile card style
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
    fontFamily:
      'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    fontSize: '16px',
    fontWeight: '600',
    color: '#060606',
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  cardRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  cardLabel: {
    fontFamily:
      'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    fontSize: '12px',
    fontWeight: '500',
    color: '#6d6d6d',
    minWidth: '80px',
  },
  cardValue: {
    fontFamily:
      'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    fontSize: '14px',
    color: '#060606',
    flex: 1,
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: '100%',
  },
  emptyStateContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontFamily:
      'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.43,
    letterSpacing: 'normal',
    color: '#060606',
    marginTop: '8px',
  },
};

export default function RecentService() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // 900px以下
  const user = useSelector((state: RootState) => state.auth.user);
  const {
    data: services,
    isLoading,
    error,
  } = useGetRecentServicesQuery(user?._id);
  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(' ') ??
    user?.email ??
    'Unknown';

  const renderDesktopRows = () => {
    if (!services || services.length === 0) return null;
    return services.slice(0, 3).map((service, index) => (
      <Box
        key={service._id}
        sx={
          index === 0
            ? styles.firstRow
            : index === services.length - 1
              ? styles.lastRow
              : styles.row
        }
      >
        <Box sx={{ ...styles.cell, flex: 1.2 }}>{service.name}</Box>
        <Box sx={{ ...styles.cell, flex: 1 }}>
          <Image
            src={user?.avatar ?? '/avatars/user-avatar.jpg'}
            alt={fullName}
            width={28}
            height={28}
            style={{ borderRadius: '50%', marginRight: 8 }}
          />
          {fullName}
        </Box>
        <Box sx={{ ...styles.cell, flex: 1 }}>
          {dayjs(service.createdAt).format('YYYY/MM/DD HH:mm:ss')}
        </Box>
        <Box sx={{ ...styles.cell, flex: 1 }}>{service.description ?? '-'}</Box>
      </Box>
    ));
  };

  const renderMobileCards = () => {
    if (!services || services.length === 0) return null;
    return services.slice(0, 3).map(service => (
      <Box key={service._id} sx={styles.card}>
        <Box sx={styles.cardHeader}>
          <Typography sx={styles.cardTitle}>{service.name}</Typography>
        </Box>
        <Box sx={styles.cardContent}>
          <Box sx={styles.cardRow}>
            <Typography sx={styles.cardLabel}>Created By:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <Image
                src={user?.avatar ?? '/avatars/user-avatar.jpg'}
                alt={fullName}
                width={20}
                height={20}
                style={{ borderRadius: '50%', marginRight: 8 }}
              />
              <Typography sx={styles.cardValue}>{fullName}</Typography>
            </Box>
          </Box>
          <Box sx={styles.cardRow}>
            <Typography sx={styles.cardLabel}>Date & Time:</Typography>
            <Typography sx={styles.cardValue}>
              {dayjs(service.createdAt).format('YYYY/MM/DD HH:mm:ss')}
            </Typography>
          </Box>
          <Box sx={styles.cardRow}>
            <Typography sx={styles.cardLabel}>Description:</Typography>
            <Typography sx={styles.cardValue}>
              {service.description ?? '-'}
            </Typography>
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
          <Typography
            sx={{ color: '#6d6d6d', textAlign: 'center', width: '100%' }}
          >
            Loading...
          </Typography>
        ) : error ? (
          <Typography sx={{ color: 'red', textAlign: 'center', width: '100%' }}>
            Failed to load
          </Typography>
        ) : services && services.length > 0 ? (
          isMobile ? (
            renderMobileCards()
          ) : (
            renderDesktopRows()
          )
        ) : (
          <Box sx={styles.emptyState}>
            <Box sx={styles.emptyStateContent}>
              <Image
                src="/overview/invalid-name.svg"
                alt="No services"
                width={100}
                height={100}
                priority
              />
              <Typography sx={styles.emptyStateText}>
                No services found
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
