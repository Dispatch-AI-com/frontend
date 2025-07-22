// Common validation functions for form inputs across the application

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates that a field is not empty
 */
export const validateRequired = (
  value: string,
  fieldName: string,
): ValidationResult => {
  if (!value || value.trim().length === 0) {
    return {
      isValid: false,
      error: `${fieldName} is required`,
    };
  }
  return { isValid: true };
};

/**
 * Validates maximum length for text fields
 */
export const validateMaxLength = (
  value: string,
  maxLength: number,
  fieldName: string,
): ValidationResult => {
  if (value.trim().length > maxLength) {
    return {
      isValid: false,
      error: `${fieldName} cannot exceed ${maxLength} characters`,
    };
  }
  return { isValid: true };
};

/**
 * Validates email format
 */
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return {
      isValid: false,
      error: 'Please enter a valid email address',
    };
  }
  return { isValid: true };
};

/**
 * Validates phone number format (basic validation)
 */
export const validatePhoneNumber = (phone: string): ValidationResult => {
  const phoneRegex = /^[+]?([1-9][\d]{0,15})$/;
  const cleanPhone = phone.replace(/[\s\-()]/g, '');

  if (!phoneRegex.test(cleanPhone)) {
    return {
      isValid: false,
      error: 'Please enter a valid phone number',
    };
  }
  return { isValid: true };
};

/**
 * Validates greeting message with custom/default logic
 */
export const validateGreeting = (
  message: string,
  isCustom: boolean,
): ValidationResult => {
  if (isCustom) {
    const requiredValidation = validateRequired(
      message,
      'Custom greeting message',
    );
    if (!requiredValidation.isValid) {
      return requiredValidation;
    }
  }

  return validateMaxLength(message, 1000, 'Greeting message');
};

/**
 * Validates user profile name
 */
export const validateUserName = (name: string): ValidationResult => {
  const requiredValidation = validateRequired(name, 'Name');
  if (!requiredValidation.isValid) {
    return requiredValidation;
  }

  return validateMaxLength(name, 100, 'Name');
};

/**
 * Validates company name
 */
export const validateCompany = (company: string): ValidationResult => {
  return validateMaxLength(company, 200, 'Company');
};

/**
 * Validates user role
 */
export const validateRole = (role: string): ValidationResult => {
  return validateMaxLength(role, 100, 'Role');
};

/**
 * Combines multiple validation results
 */
export const combineValidations = (
  ...validations: ValidationResult[]
): ValidationResult => {
  for (const validation of validations) {
    if (!validation.isValid) {
      return validation;
    }
  }
  return { isValid: true };
};

/**
 * Validates verification type selection
 */
export const validateVerificationType = (type: string): ValidationResult => {
  if (!type || type.trim() === '') {
    return {
      isValid: false,
      error: 'Please select a verification type',
    };
  }

  const validTypes = ['Email', 'SMS', 'Both'];
  if (!validTypes.includes(type)) {
    return {
      isValid: false,
      error: 'Please select a valid verification type',
    };
  }
  return { isValid: true };
};

/**
 * Validates mobile number for SMS verification
 */
export const validateSMSMobile = (mobile: string): ValidationResult => {
  const requiredValidation = validateRequired(mobile, 'Mobile number');
  if (!requiredValidation.isValid) {
    return requiredValidation;
  }

  return validatePhoneNumber(mobile);
};

/**
 * Validates email for email verification
 */
export const validateVerificationEmail = (email: string): ValidationResult => {
  const requiredValidation = validateRequired(email, 'Email address');
  if (!requiredValidation.isValid) {
    return requiredValidation;
  }

  return validateEmail(email);
};

/**
 * Validates complete verification form based on type
 */
export const validateVerificationForm = (values: {
  type: string;
  mobile: string;
  email: string;
}): ValidationResult => {
  // Validate verification type
  const typeValidation = validateVerificationType(values.type);
  if (!typeValidation.isValid) {
    return typeValidation;
  }

  // Validate based on selected type
  if (values.type === 'SMS' || values.type === 'Both') {
    const mobileValidation = validateSMSMobile(values.mobile);
    if (!mobileValidation.isValid) {
      return mobileValidation;
    }
  }

  if (values.type === 'Email' || values.type === 'Both') {
    const emailValidation = validateVerificationEmail(values.email);
    if (!emailValidation.isValid) {
      return emailValidation;
    }
  }

  return { isValid: true };
};
