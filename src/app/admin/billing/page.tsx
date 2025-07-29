'use client';

import { Box, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import BillingSection from '@/app/admin/billing/components/BillingSection';
import { AdminPageLayout } from '@/components/layout/admin-layout';
import BillingStatusModal from '@/components/ui/BillingStatusModal';

import BillingHistorySection from './components/BillingHistorySection';

const styles = {
  contentContainer: {
    flex: 1,
    display: 'flex',
    padding: '24px 24px 0 24px',
    borderRadius: '20px',
    overflowX: 'visible',
  },
  sectionTitle: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#060606',
    lineHeight: '22px',
    padding: '0 24px',
    marginTop: '24px',
  },
};

export default function BillingboxPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const status = searchParams.get('status'); // 'success' | 'failed' | null
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status === 'success' || status === 'failed') {
      setShowModal(true);
    }
  }, [status]);

  const handleCloseModal = () => {
    setShowModal(false);
    const newUrl = window.location.pathname;
    router.replace(newUrl);
  };

  return (
    <>
      <AdminPageLayout title="Billing" padding="normal" background="solid">
        <Box sx={styles.contentContainer}>
          <BillingSection />
        </Box>

        <Typography sx={styles.sectionTitle}>Invoice History</Typography>
        <Box sx={styles.contentContainer}>
          <BillingHistorySection />
        </Box>
      </AdminPageLayout>

      <BillingStatusModal
        open={showModal}
        onClose={handleCloseModal}
        status={status === 'success' ? 'success' : 'failure'}
      />
    </>
  );
}
