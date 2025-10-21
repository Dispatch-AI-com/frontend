'use client';
import { Box, Typography } from '@mui/material';
import React from 'react';

import EditableSection from '@/app/admin/settings/components/EditableSection';
import SelectField from '@/app/admin/settings/components/SelectField';
import AddressAutocomplete from '@/components/ui/AddressAutocomplete';
import {
  type BillingAddressSettings,
  useGetBillingAddressQuery,
  useUpdateBillingAddressMutation,
} from '@/features/settings/settingsApi';
import { useAppSelector } from '@/redux/hooks';
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

const STATE_ABBREVIATION_MAP: Record<string, string> = {
  NSW: 'New South Wales',
  VIC: 'Victoria',
  QLD: 'Queensland',
  WA: 'Western Australia',
  SA: 'South Australia',
  TAS: 'Tasmania',
  ACT: 'Australian Capital Territory',
  NT: 'Northern Territory',
};

// Billing address specific validation functions
const validateStreetAddress = (street: string): ValidationResult => {
  return combineValidations(
    validateRequired(street, 'Street address'),
    validateMaxLength(street, 100, 'Street address'),
  );
};

const validateSuburb = (suburb: string): ValidationResult => {
  const basicValidation = combineValidations(
    validateRequired(suburb, 'Suburb'),
    validateMaxLength(suburb, 50, 'Suburb'),
  );

  if (!basicValidation.isValid) {
    return basicValidation;
  }

  // Check if user accidentally entered a state name in suburb field
  const stateNames = [
    'New South Wales',
    'NSW',
    'Victoria',
    'VIC',
    'Queensland',
    'QLD',
    'Western Australia',
    'WA',
    'South Australia',
    'SA',
    'Tasmania',
    'TAS',
    'Australian Capital Territory',
    'ACT',
    'Northern Territory',
    'NT',
  ];

  // Check if user accidentally entered a city name in suburb field
  const cityNames = [
    'Sydney',
    'Melbourne',
    'Brisbane',
    'Perth',
    'Adelaide',
    'Gold Coast',
    'Newcastle',
    'Canberra',
    'Central Coast',
    'Wollongong',
    'Logan City',
  ];

  const suburbLower = suburb.trim().toLowerCase();
  const isStateName = stateNames.some(
    state => state.toLowerCase() === suburbLower,
  );
  const isCityName = cityNames.some(city => city.toLowerCase() === suburbLower);

  if (isStateName) {
    return {
      isValid: false,
      error:
        'Please enter the suburb name, not the state. Use the State dropdown below.',
    };
  }

  if (isCityName) {
    return {
      isValid: false,
      error: 'Please enter the specific suburb name, not the city name.',
    };
  }

  return { isValid: true };
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
  const user = useAppSelector(state => state.auth.user);

  const { data: billingData, isLoading } = useGetBillingAddressQuery(
    user?._id ?? '',
    {
      skip: !user?._id,
    },
  );

  const [updateBillingAddress] = useUpdateBillingAddressMutation();
  const handleSave = async (values: Record<string, string>) => {
    if (!user?._id) {
      throw new Error('User not logged in');
    }

    // Convert Record<string, string> to BillingAddressSettings
    const billingAddressSettings: BillingAddressSettings = {
      unit: values.unit,
      streetAddress: values.streetAddress,
      suburb: values.suburb,
      state: values.state,
      postcode: values.postcode,
    };

    await updateBillingAddress({
      userId: user._id,
      ...billingAddressSettings,
    });
  };

  const convertedData = billingData
    ? {
        unit: billingData.unit ?? '',
        streetAddress: billingData.streetAddress,
        suburb: billingData.suburb,
        state: billingData.state,
        postcode: billingData.postcode,
      }
    : undefined;

  return (
    <EditableSection
      title="Billing Address"
      fields={[
        {
          label: 'Unit/Apt/PO Box:',
          key: 'unit',
          placeholder: 'Enter unit, apartment, or PO Box',
          validate: validateUnit,
        },
        {
          label: 'Street address:',
          key: 'streetAddress',
          placeholder: 'Street address',
          validate: validateStreetAddress,
          component: ({ label, value, onChange, setFieldValue, ...props }) => (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle2">{label}</Typography>
              <AddressAutocomplete
                value={value}
                onChange={onChange}
                onAddressSelect={(_address, _placeId, components) => {
                  if (components) {
                    setFieldValue(
                      'streetAddress',
                      `${components.streetNumber ?? ''} ${components.route ?? ''}`.trim(),
                    );
                    setFieldValue('suburb', components.locality ?? '');
                    const stateFullName =
                      STATE_ABBREVIATION_MAP[
                        components.administrativeAreaLevel1 ?? ''
                      ] ??
                      components.administrativeAreaLevel1 ??
                      '';
                    setFieldValue('state', stateFullName);
                    setFieldValue('postcode', components.postalCode ?? '');
                  }
                }}
                displayFullAddress={false}
                {...props}
              />
            </Box>
          ),
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
      data={convertedData}
      isLoading={isLoading}
      onSave={handleSave}
      initialValues={{
        unit: '',
        streetAddress: '',
        suburb: '',
        state: '',
        postcode: '',
      }}
    />
  );
}
