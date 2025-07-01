'use client';

import { Box, Typography } from '@mui/material';

import EditableSection from '@/app/admin/settings/components/EditableSection';
import LabeledTextField from '@/app/admin/settings/components/LabeledTextField';
import PhoneInput from '@/app/admin/settings/components/PhoneInput';
import SelectField from '@/app/admin/settings/components/SelectField';
import type { ValidationResult } from '@/utils/validationSettings';
import {
  validateEmail,
  validatePhoneNumber,
  validateRequired,
} from '@/utils/validationSettings';

// Constants
const VERIFICATION_OPTIONS = [
  { label: 'Email', value: 'Email' },
  { label: 'SMS', value: 'SMS' },
];

const INITIAL_VALUES = {
  type: 'SMS',
  mobile: '',
  email: '',
};

interface FieldComponentProps {
  value: string;
  onChange: (val: string) => void;
}

// Validation Functions
const validateVerificationType = (type: string): ValidationResult => {
  return validateRequired(type, 'Verification type');
};

const validateMobileNumber = (
  mobile: string,
  verificationType: string,
): ValidationResult => {
  if (verificationType === 'SMS') {
    const requiredValidation = validateRequired(mobile, 'Mobile number');
    if (!requiredValidation.isValid) {
      return requiredValidation;
    }
    return validatePhoneNumber(mobile);
  }
  // If type is not SMS but mobile has a value, validate it
  if (mobile && mobile.trim().length > 0) {
    return validatePhoneNumber(mobile);
  }
  return { isValid: true };
};

const validateEmailAddress = (
  email: string,
  verificationType: string,
): ValidationResult => {
  if (verificationType === 'Email') {
    const requiredValidation = validateRequired(email, 'Email address');
    if (!requiredValidation.isValid) {
      return requiredValidation;
    }
    return validateEmail(email);
  }
  // If type is not Email but email has a value, validate it
  if (email && email.trim().length > 0) {
    return validateEmail(email);
  }
  return { isValid: true };
};

// Field Components
const VerificationTypeField = ({ value, onChange }: FieldComponentProps) => (
  <Box>
    <Typography variant="body1" mb={0.5}>
      Verification type
    </Typography>
    <SelectField
      value={value}
      onChange={onChange}
      options={VERIFICATION_OPTIONS}
      placeholder="Select type"
    />
  </Box>
);

const MobileNumberField = (props: FieldComponentProps) => (
  <Box>
    <Typography variant="body1" mb={0.5}>
      Mobile Number
    </Typography>
    <PhoneInput {...props} />
  </Box>
);

const EmailAddressField = ({ value, onChange }: FieldComponentProps) => (
  <LabeledTextField
    label="Email Address"
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder="Email Address"
  />
);

// Field Definitions
const createVerificationTypeField = () => ({
  label: 'Verification type:',
  key: 'type',
  placeholder: 'Select type',
  component: VerificationTypeField,
  required: true,
});

const createMobileNumberField = (verificationType: string) => ({
  label: 'Mobile Number:',
  key: 'mobile',
  placeholder: '',
  component: MobileNumberField,
  required: verificationType === 'SMS',
});

const createEmailAddressField = (verificationType: string) => ({
  label: 'Email Address:',
  key: 'email',
  placeholder: 'Email Address',
  component: EmailAddressField,
  required: verificationType === 'Email',
});

// Field Logic
const shouldShowMobileField = (values: Record<string, string>): boolean => {
  return values.type === 'SMS' || !!values.mobile;
};

const shouldShowEmailField = (values: Record<string, string>): boolean => {
  return values.type === 'Email' || !!values.email;
};

const buildFieldsArray = (values: Record<string, string>) => {
  const fields = [createVerificationTypeField()];

  if (shouldShowMobileField(values)) {
    fields.push(createMobileNumberField(values.type));
  }

  if (shouldShowEmailField(values)) {
    fields.push(createEmailAddressField(values.type));
  }

  return fields;
};

export default function VerificationSection() {
  const handleValidation = (values: Record<string, string>) => {
    // Validate verification type
    const typeValidation = validateVerificationType(values.type);
    if (!typeValidation.isValid) {
      return typeValidation;
    }

    // Validate mobile number
    const mobileValidation = validateMobileNumber(values.mobile, values.type);
    if (!mobileValidation.isValid) {
      return mobileValidation;
    }

    // Validate email address
    const emailValidation = validateEmailAddress(values.email, values.type);
    if (!emailValidation.isValid) {
      return emailValidation;
    }

    return { isValid: true };
  };

  return (
    <EditableSection
      title="Verification"
      fields={buildFieldsArray}
      initialValues={INITIAL_VALUES}
      validation={handleValidation}
    />
  );
}
