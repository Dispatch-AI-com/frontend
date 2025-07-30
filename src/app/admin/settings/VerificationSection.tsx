'use client';

import { Box } from '@mui/material';
import React, { useState } from 'react';

import EditModal from '@/app/admin/settings/components/EditModal';
import SectionDivider from '@/app/admin/settings/components/SectionDivider';
import SectionHeader from '@/app/admin/settings/components/SectionHeader';
import VerificationCard from '@/app/admin/settings/components/Verification/VerificationCard';
import VerificationCodeModal from '@/app/admin/settings/components/Verification/VerificationCodeModal';
import VerificationForm from '@/app/admin/settings/components/Verification/VerificationForm';
import {
  useGetUserProfileQuery,
  useGetVerificationQuery,
  useUpdateVerificationMutation,
  useVerifyEmailMutation,
  useVerifyMobileMutation,
} from '@/features/settings/settingsApi';
import { useAppSelector } from '@/redux/hooks';
import { validateVerificationForm } from '@/utils/validationSettings';

export default function VerificationSection() {
  const user = useAppSelector(state => state.auth.user);
  // Get verification data from API
  const { data: verificationData, isLoading: isVerificationLoading } =
    useGetVerificationQuery(user?._id ?? '', {
      skip: !user?._id,
    });
  // Get user profile to fallback to contact info
  const { data: profileData } = useGetUserProfileQuery(user?._id ?? '', {
    skip: !user?._id,
  });
  const [updateVerification] = useUpdateVerificationMutation();
  const [verifyMobile] = useVerifyMobileMutation();
  const [verifyEmail] = useVerifyEmailMutation();
  const [open, setOpen] = useState(false);
  const [verificationModal, setVerificationModal] = useState<{
    open: boolean;
    type: 'mobile' | 'email';
    contact: string;
  }>({
    open: false,
    type: 'mobile',
    contact: '',
  });
  // Define the form values type to match what VerificationForm expects
  interface FormValues {
    type: 'SMS' | 'Email' | 'Both';
    mobile: string;
    email: string;
    marketingPromotions: boolean;
  }
  const [formValues, setFormValues] = useState<FormValues>({
    type: 'Both' as 'SMS' | 'Email' | 'Both',
    mobile: '',
    email: '',
    marketingPromotions: false,
  });
  const [error, setError] = useState<string | null>(null);

  // Create a wrapper function to handle the form change
  const handleFormChange = (values: FormValues) => {
    setFormValues({
      type: values.type,
      mobile: values.mobile,
      email: values.email,
      marketingPromotions: values.marketingPromotions,
    });
  };
  // Merge verification data with profile data as fallback
  const values = React.useMemo(() => {
    const defaultValues = {
      type: 'Both' as 'SMS' | 'Email' | 'Both',
      mobile: profileData?.contact ?? '',
      email: user?.email ?? '',
      mobileVerified: false,
      emailVerified: false,
      marketingPromotions: false,
    };

    return verificationData
      ? { ...defaultValues, ...verificationData }
      : defaultValues;
  }, [verificationData, profileData, user]);

  const handleEdit = () => {
    setFormValues({
      type: values.type,
      mobile: values.mobile ?? '',
      email: values.email ?? '',
      marketingPromotions: values.marketingPromotions || false,
    });
    setError(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const handleSave = async () => {
    try {
      if (!user?._id) {
        throw new Error('User not logged in');
      }

      // Validate form before saving
      const validationResult = validateVerificationForm(formValues);
      if (!validationResult.isValid) {
        setError(validationResult.error ?? 'Validation failed');
        return;
      }

      // Check if mobile or email has changed
      const mobileChanged = formValues.mobile !== values.mobile;
      const emailChanged = formValues.email !== values.email;

      await updateVerification({
        userId: user._id,
        type: formValues.type,
        mobile: formValues.mobile,
        email: formValues.email,
        marketingPromotions: formValues.marketingPromotions,
        mobileVerified: mobileChanged ? false : values.mobileVerified,
        emailVerified: emailChanged ? false : values.emailVerified,
      }).unwrap();

      setOpen(false);
      setError(null);
    } catch {
      setError('Failed to update verification settings');
    }
  };

  const handleVerifyMobile = async () => {
    try {
      if (!user?._id || !values.mobile) {
        throw new Error('Mobile number not available');
      }

      await verifyMobile({
        userId: user._id,
        mobile: values.mobile,
      }).unwrap();

      setVerificationModal({
        open: true,
        type: 'mobile',
        contact: values.mobile,
      });
    } catch {
      setError('Failed to verify mobile number');
    }
  };

  const handleVerifyEmail = async () => {
    try {
      if (!user?._id || !values.email) {
        throw new Error('Email not available');
      }

      await verifyEmail({
        userId: user._id,
        email: values.email,
      }).unwrap();

      setVerificationModal({
        open: true,
        type: 'email',
        contact: values.email,
      });
    } catch {
      setError('Failed to verify email address');
    }
  };

  const handleCloseVerificationModal = () => {
    setVerificationModal({
      open: false,
      type: 'mobile',
      contact: '',
    });
  };

  const handleMarketingPromotionsChange = async (checked: boolean) => {
    try {
      if (!user?._id) {
        throw new Error('User not logged in');
      }

      await updateVerification({
        userId: user._id,
        type: values.type,
        mobile: values.mobile,
        email: values.email,
        marketingPromotions: checked,
        mobileVerified: values.mobileVerified,
        emailVerified: values.emailVerified,
      }).unwrap();

      setError(null);
    } catch (err) {
      function isErrorWithMessage(
        error: unknown,
      ): error is { message: string } {
        return (
          typeof error === 'object' &&
          error !== null &&
          'message' in error &&
          typeof (error as { message?: unknown }).message === 'string'
        );
      }

      const errorMessage = isErrorWithMessage(err)
        ? err.message
        : 'Failed to update marketing preferences';
      setError(errorMessage);
    }
  };

  const renderVerificationCards = () => {
    if (values.type === 'Both') {
      return (
        <>
          {/* SMS Section */}
          {values.mobile && (
            <VerificationCard
              type="SMS"
              mobile={values.mobile}
              mobileVerified={values.mobileVerified}
              onVerifyMobile={() => {
                void handleVerifyMobile();
              }}
            />
          )}

          {/* Email Section */}
          {values.email && (
            <VerificationCard
              type="Email"
              email={values.email}
              emailVerified={values.emailVerified}
              marketingPromotions={values.marketingPromotions}
              showMarketingPromotions
              onVerifyEmail={() => {
                void handleVerifyEmail();
              }}
              onMarketingPromotionsChange={checked => {
                void handleMarketingPromotionsChange(checked);
              }}
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
        mobileVerified={
          values.type === 'SMS' ? values.mobileVerified : undefined
        }
        emailVerified={
          values.type === 'Email' ? values.emailVerified : undefined
        }
        marketingPromotions={
          values.type === 'Email' ? values.marketingPromotions : undefined
        }
        onVerifyMobile={
          values.type === 'SMS'
            ? () => {
                void handleVerifyMobile();
              }
            : undefined
        }
        showMarketingPromotions={values.type === 'Email'}
        onVerifyEmail={
          values.type === 'Email'
            ? () => {
                void handleVerifyEmail();
              }
            : undefined
        }
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
        {isVerificationLoading ? (
          <div>Loading verification settings...</div>
        ) : (
          (values.mobile || values.email) && renderVerificationCards()
        )}
      </Box>

      {/* Edit Modal */}
      <EditModal
        open={open}
        title="Verification"
        onClose={handleClose}
        onSave={() => {
          void handleSave();
        }}
      >
        <VerificationForm
          values={formValues}
          onChange={handleFormChange}
          error={error ?? undefined}
        />
      </EditModal>

      {/* Verification Code Modal */}
      <VerificationCodeModal
        open={verificationModal.open}
        type={verificationModal.type}
        contact={verificationModal.contact}
        onClose={handleCloseVerificationModal}
      />
    </>
  );
}
