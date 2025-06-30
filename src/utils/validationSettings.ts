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
 * Validates minimum length for text fields
 */
export const validateMinLength = (
  value: string,
  minLength: number,
  fieldName: string,
): ValidationResult => {
  if (value.trim().length < minLength) {
    return {
      isValid: false,
      error: `${fieldName} must be at least ${minLength} characters`,
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
 * Validates contact information (phone or email)
 */
export const validateContact = (contact: string): ValidationResult => {
  if (!contact || contact.trim().length === 0) {
    return { isValid: true }; // Contact is optional
  }

  // Check if it's an email or phone number
  if (contact.includes('@')) {
    return validateEmail(contact);
  } else {
    return validatePhoneNumber(contact);
  }
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
