'use client';
import React from 'react';

import EditableSection from '@/app/admin/settings/components/EditableSection';
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

const validateABN = (abn: string): ValidationResult => {
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

export default function BankAccountSection() {
  return (
    <EditableSection
      title="Company Info"
      fields={[
        {
          label: 'Company Name:',
          key: 'company',
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
      initialValues={{
        company: 'Jone Smith',
        abn: '12345678909',
      }}
    />
  );
}
