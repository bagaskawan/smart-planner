export interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  general?: string;
}

export interface InputFieldProps {
  name: keyof FormData;
  type: "text" | "email" | "password";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (name: keyof FormData) => void;
  error: string;
  touched: boolean;
}

export interface PasswordRule {
  label: string;
  isValid: boolean;
}
