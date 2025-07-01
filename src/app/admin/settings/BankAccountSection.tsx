'use client';
import React from 'react';

import EditableSection from '@/app/admin/settings/components/EditableSection';
import type { ValidationResult } from '@/utils/validationSettings';
import {
  combineValidations,
  validateMaxLength,
  validateRequired,
} from '@/utils/validationSettings';

const validateAcountName = (name: string): ValidationResult => {
  return combineValidations(
    validateRequired(name, 'Account Name'),
    validateMaxLength(name, 50, 'Account Name'),
  );
};

const validateBSB = (bsb: string): ValidationResult => {
  // Australian BSB validation (6 digits)
  const bsbRegex = /^\d{6}$/;

  const requiredValidation = validateRequired(bsb, 'BSB');
  if (!requiredValidation.isValid) {
    return requiredValidation;
  }
  // Remove any spaces or dashes for validation
  const cleanBsb = bsb.replace(/[\s-]/g, '');

  if (!bsbRegex.test(cleanBsb)) {
    return {
      isValid: false,
      error: 'BSB must be 6 digits',
    };
  }

  return { isValid: true };
};

const validateAccountNumber = (accountNumber: string): ValidationResult => {
  const requiredValidation = validateRequired(accountNumber, 'Account Number');
  if (!requiredValidation.isValid) {
    return requiredValidation;
  }

  // Remove spaces for validation
  const cleanAccountNumber = accountNumber.replace(/\s/g, '');
  // Australian account number validation (6-10 digits, allowing spaces)
  if (cleanAccountNumber.length < 6 || cleanAccountNumber.length > 10) {
    return {
      isValid: false,
      error: 'Account number must be 6-10 digits',
    };
  }

  if (!/^\d+$/.test(cleanAccountNumber)) {
    return {
      isValid: false,
      error: 'Account number must contain only numbers',
    };
  }

  return { isValid: true };
};

export default function BankAccountSection() {
  return (
    <EditableSection
      title="Bank Account"
      fields={[
        {
          label: 'Account Name:',
          key: 'accname',
          placeholder: 'e.g. Jone Smith',
          validate: validateAcountName,
        },
        {
          label: 'BSB:',
          key: 'bsb',
          placeholder: 'e.g. 123456',
          validate: validateBSB,
        },
        {
          label: 'Account Number:',
          key: 'accnum',
          placeholder: 'e.g. 1234 1234 1234 1234',
          validate: validateAccountNumber,
        },
      ]}
      initialValues={{
        accname: 'Jone Smith',
        bsb: '123456',
        accnum: '1234 1234 1234 1234',
      }}
    />
  );
}
