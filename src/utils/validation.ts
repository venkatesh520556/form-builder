import { ValidationRule } from "../types/formTypes";

export const validateField = (value: any, rules?: ValidationRule): string | null => {
  if (!rules) return null;
  if (rules.required && !value) return "This field is required";
  if (rules.minLength && value.length < rules.minLength) return `Minimum length is ${rules.minLength}`;
  if (rules.maxLength && value.length > rules.maxLength) return `Maximum length is ${rules.maxLength}`;
  if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email";
  if (rules.passwordRule && !/^(?=.*[0-9]).{8,}$/.test(value)) return "Password must contain at least 8 characters and a number";
  return null;
};
