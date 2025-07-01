'use client';
import React from 'react';

import EditableSection from '@/app/admin/settings/components/EditableSection';
import SelectField from '@/app/admin/settings/components/SelectField';
import type { ValidationResult } from '@/utils/validationSettings';
import {
  combineValidations,
  validateMaxLength,
  validateRequired,
} from '@/utils/validationSettings';

const STATE_OPTIONS = [
  { label: 'New South Wales', value: 'New South Wales' },
  { label: 'Victoria', value: 'Victoria' },
  { label: 'Queensland', value: 'Queensland' },
  { label: 'Western Australia', value: 'Western Australia' },
  { label: 'South Australia', value: 'South Australia' },
  { label: 'Tasmania', value: 'Tasmania' },
  {
    label: 'Australian Capital Territory',
    value: 'Australian Capital Territory',
  },
  { label: 'Northern Territory', value: 'Northern Territory' },
];

// Billing address specific validation functions
const validateStreetAddress = (street: string): ValidationResult => {
  return combineValidations(
    validateRequired(street, 'Street address'),
    validateMaxLength(street, 100, 'Street address'),
  );
};

const validateSuburb = (suburb: string): ValidationResult => {
  return combineValidations(
    validateRequired(suburb, 'Suburb'),
    validateMaxLength(suburb, 50, 'Suburb'),
  );
};

const validatePostcode = (postcode: string): ValidationResult => {
  // Australian postcode validation (4 digits)
  const postcodeRegex = /^\d{4}$/;

  const requiredValidation = validateRequired(postcode, 'Postcode');
  if (!requiredValidation.isValid) {
    return requiredValidation;
  }

  if (!postcodeRegex.test(postcode.trim())) {
    return {
      isValid: false,
      error: 'Postcode must be 4 digits',
    };
  }

  return { isValid: true };
};

const validateUnit = (unit: string): ValidationResult => {
  // Unit is optional, but if provided, validate max length
  if (unit && unit.trim().length > 0) {
    return validateMaxLength(unit, 50, 'Unit/Apt/PO Box');
  }
  return { isValid: true };
};

const validateState = (state: string): ValidationResult => {
  return validateRequired(state, 'State');
};

export default function BillingAddressSection() {
  return (
    <EditableSection
      title="Billing Address"
      fields={[
        {
          label: 'Unit/Apt/PO BoX:',
          key: 'unit',
          placeholder: 'Enter unit, apartment, or PO Box',
          validate: validateUnit,
        },
        {
          label: 'Street address:',
          key: 'street',
          placeholder: 'Street address',
          validate: validateStreetAddress,
        },
        {
          label: 'Suburb:',
          key: 'suburb',
          placeholder: 'Suburb',
          validate: validateSuburb,
        },
        {
          label: 'State:',
          key: 'state',
          component: props => (
            <SelectField
              {...props}
              options={STATE_OPTIONS}
              placeholder="Select"
            />
          ),
          validate: validateState,
        },
        {
          label: 'Postcode:',
          key: 'postcode',
          placeholder: 'e.g. 1234',
          validate: validatePostcode,
        },
      ]}
      initialValues={{
        unit: 'Enter unit, apartment, or PO Box',
        street: '3-5 Underwood Road',
        suburb: 'Parramatta',
        state: 'New South Wales',
        postcode: '2140',
      }}
    />
  );
}
