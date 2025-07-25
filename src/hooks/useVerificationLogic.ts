import React from 'react';

import { validateVerificationForm } from '@/utils/validationSettings';

interface VerificationValues {
  type: string;
  mobile: string;
  email: string;
}

const INITIAL_VALUES: VerificationValues = {
  type: 'SMS',
  mobile: '',
  email: '',
};

export function useVerificationLogic() {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] =
    React.useState<VerificationValues>(INITIAL_VALUES);
  const [formValues, setFormValues] =
    React.useState<VerificationValues>(INITIAL_VALUES);
  const [error, setError] = React.useState('');

  const handleEdit = () => {
    setFormValues(values);
    setError('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
  };

  const handleSave = () => {
    setError('');

    const validationResult = validateVerificationForm(formValues);
    if (!validationResult.isValid) {
      setError(validationResult.error ?? 'Validation failed');
      return;
    }

    setValues(formValues);
    setOpen(false);
  };

  const handleVerifyMobile = () => {
    // Handle mobile verification logic
  };
  const handleVerifyEmail = () => {
    // Handle mobile verification logic
  };

  return {
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
  };
}
