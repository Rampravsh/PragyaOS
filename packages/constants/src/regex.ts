export const Regex = {
  // At least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  
  // Standard phone number format matching internationally
  PHONE: /^\+?[1-9]\d{1,14}$/,
  
  // Standard UUID format check
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
} as const;
