'use client';

import { Box } from '@mui/material';
import React from 'react';

import EditModal from '@/app/admin/settings/components/EditModal';
import SectionDivider from '@/app/admin/settings/components/SectionDivider';
import SectionHeader from '@/app/admin/settings/components/SectionHeader';
import VerificationCard from '@/app/admin/settings/components/Verification/VerificationCard';
import VerificationForm from '@/app/admin/settings/components/Verification/VerificationForm';
import { useVerificationLogic } from '@/hooks/useVerificationLogic';

export default function VerificationSection() {
  const {
    open,
    values,
    formValues,
    error,
    handleEdit,
    handleClose,
    handleSave,
    handleVerifyMobile,
    handleVerifyEmail,
    setFormValues,
  } = useVerificationLogic();

  const renderVerificationCards = () => {
    if (values.type === 'Both') {
      return (
        <>
          {/* SMS Section */}
          {values.mobile && (
            <VerificationCard
              type="SMS"
              mobile={values.mobile}
              onVerifyMobile={handleVerifyMobile}
            />
          )}

          {/* Email Section */}
          {values.email && (
            <VerificationCard
              type="Email"
              email={values.email}
              showMarketingPromotions
              onVerifyEmail={handleVerifyEmail}
              isLastCard
            />
          )}
        </>
      );
    }

    // Single verification type
    return (
      <VerificationCard
        type={values.type}
        mobile={values.type === 'SMS' ? values.mobile : undefined}
        email={values.type === 'Email' ? values.email : undefined}
        onVerifyMobile={values.type === 'SMS' ? handleVerifyMobile : undefined}
        showMarketingPromotions={values.type === 'Email'}
        onVerifyEmail={values.type === 'Email' ? handleVerifyEmail : undefined}
        isLastCard
      />
    );
  };

  return (
    <>
      <SectionDivider />
      <SectionHeader title="Verification" onEdit={handleEdit} />

      {/* Display Mode */}
      <Box sx={{ mt: 2 }}>
        {(values.mobile || values.email) && renderVerificationCards()}
      </Box>

      {/* Edit Modal */}
      <EditModal
        open={open}
        title="Verification"
        onClose={handleClose}
        onSave={handleSave}
      >
        <VerificationForm
          values={formValues}
          onChange={setFormValues}
          error={error}
        />
      </EditModal>
    </>
  );
}
