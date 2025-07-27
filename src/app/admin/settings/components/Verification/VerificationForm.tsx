import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import React from 'react';

import LabeledTextField from '../LabeledTextField';
import PhoneInput from '../PhoneInput';
import SelectField from '../SelectField';

const VERIFICATION_OPTIONS = [
  { label: 'Email', value: 'Email' },
  { label: 'SMS', value: 'SMS' },
  { label: 'Both', value: 'Both' },
];

interface FormValues {
  type: 'SMS' | 'Email' | 'Both';
  mobile: string;
  email: string;
  marketingPromotions: boolean;
}

interface VerificationFormProps {
  values: FormValues;
  onChange: (values: FormValues) => void;
  error?: string;
}

export default function VerificationForm({
  values,
  onChange,
  error,
}: VerificationFormProps) {
  const handleFieldChange = (
    field: keyof FormValues,
    value: string | boolean,
  ) => {
    onChange({ ...values, [field]: value });
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} p={2}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box>
        <Typography variant="body1" mb={0.5}>
          Verification type
        </Typography>
        <SelectField
          value={values.type}
          onChange={value => handleFieldChange('type', value)}
          options={VERIFICATION_OPTIONS}
          placeholder="Select type"
        />
      </Box>

      {(values.type === 'SMS' || values.type === 'Both') && (
        <Box>
          <Typography variant="body1" mb={0.5}>
            Mobile Number
          </Typography>
          <PhoneInput
            value={values.mobile}
            onChange={value => handleFieldChange('mobile', value)}
          />
        </Box>
      )}

      {(values.type === 'Email' || values.type === 'Both') && (
        <LabeledTextField
          label="Email Address"
          value={values.email}
          onChange={e => handleFieldChange('email', e.target.value)}
          placeholder="Email Address"
        />
      )}

      {/* Marketing Promotions Checkbox - only show when Email is selected */}
      {(values.type === 'Email' || values.type === 'Both') && (
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={values.marketingPromotions}
                onChange={e =>
                  handleFieldChange('marketingPromotions', e.target.checked)
                }
                sx={{
                  '&.Mui-checked': {
                    color: '#58c112',
                  },
                }}
              />
            }
            label="Receive Marketing Promotions?"
          />
        </Box>
      )}
    </Box>
  );
}
