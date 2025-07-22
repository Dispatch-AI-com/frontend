'use client';
import React from 'react';

import EditableSection from '@/app/admin/settings/components/EditableSection';
import {
  useCheckABNExistsMutation,
  useGetCompanyInfoQuery,
  useUpdateCompanyInfoMutation,
} from '@/features/settings/settingsApi';
import { useAppSelector } from '@/redux/hooks';
import type { ValidationResult } from '@/utils/validationSettings';
import {
  combineValidations,
  validateMaxLength,
  validateRequired,
} from '@/utils/validationSettings';

const validateCompanyName = (name: string): ValidationResult => {
  return combineValidations(
    validateRequired(name, 'Account Name'),
    validateMaxLength(name, 50, 'Account Name'),
  );
};

const validateABNFormat = (abn: string): ValidationResult => {
  const requiredValidation = validateRequired(abn, 'ABN');
  if (!requiredValidation.isValid) {
    return requiredValidation;
  }

  // Remove any spaces, dashes, or other non-digit characters
  const cleanAbn = abn.replace(/\D/g, '');

  // ABN must be exactly 11 digits
  if (cleanAbn.length !== 11) {
    return {
      isValid: false,
      error: 'ABN must be 11 digits',
    };
  }

  // ABN algorithm validation
  const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  let sum = 0;

  // Subtract 1 from the first digit
  const firstDigit = parseInt(cleanAbn[0]) - 1;
  sum += firstDigit * weights[0];

  // Add weighted sum of remaining digits
  for (let i = 1; i < 11; i++) {
    sum += parseInt(cleanAbn[i]) * weights[i];
  }

  if (sum % 89 !== 0) {
    return {
      isValid: false,
      error: 'Invalid ABN format',
    };
  }

  return { isValid: true };
};

export default function CompanyInfoSection() {
  const user = useAppSelector(state => state.auth.user);
  const [checkABNExists] = useCheckABNExistsMutation();

  // Synchronous validation for real-time feedback (format only)
  const validateABN = (abn: string): ValidationResult => {
    return validateABNFormat(abn);
  };

  const { data: companyData, isLoading } = useGetCompanyInfoQuery(
    user?._id ?? '',
    {
      skip: !user?._id,
    },
  );

  const [updateCompanyInfo] = useUpdateCompanyInfoMutation();
  const handleSave = async (values: Record<string, string>) => {
    if (!user?._id) {
      throw new Error('User not logged in');
    }

    // Clean the ABN (remove spaces, dashes, and other non-digit characters)
    const cleanAbn = values.abn.replace(/\D/g, '');

    // Check for ABN duplication before saving
    if (user._id) {
      try {
        const result = await checkABNExists({
          abn: cleanAbn,
          userId: user._id,
        }).unwrap();

        if (result.exists) {
          throw new Error('This ABN is already registered by another company');
        }
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
      }
    }

    await updateCompanyInfo({
      userId: user._id,
      companyName: values.companyName,
      abn: cleanAbn,
    }).unwrap();
  };

  const convertedData = companyData
    ? {
        companyName: companyData.companyName,
        abn: companyData.abn,
      }
    : undefined;

  return (
    <EditableSection
      title="Company Info"
      fields={[
        {
          label: 'Company Name:',
          key: 'companyName',
          placeholder: 'e.g. Google',
          validate: validateCompanyName,
        },
        {
          label: 'ABN:',
          key: 'abn',
          placeholder: 'e.g. 12345678909',
          validate: validateABN,
        },
      ]}
      data={convertedData}
      isLoading={isLoading}
      onSave={handleSave}
      initialValues={{
        companyName: '',
        abn: '',
      }}
    />
  );
}
