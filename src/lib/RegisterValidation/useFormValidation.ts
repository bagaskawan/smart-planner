import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import {
  FormData,
  FormErrors,
  PasswordRule,
} from "@/lib/RegisterValidation/types";
import { signup } from "@/lib/auth-actions";

export function useFormValidation(initialData: FormData) {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordRules, setPasswordRules] = useState<PasswordRule[]>([
    { label: "Must contain at least 8 characters", isValid: false },
    {
      label: "Must contain uppercase, lowercase letters, and numbers",
      isValid: false,
    },
    {
      label: "If less than 12 characters, must contain a special character",
      isValid: false,
    },
  ]);
  const [debouncedFormData] = useDebounce(formData, 300);

  const validateForm = () => {
    const newErrors: FormErrors = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      const hasUpperCase = /[A-Z]/.test(formData.password);
      const hasLowerCase = /[a-z]/.test(formData.password);
      const hasNumber = /\d/.test(formData.password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
      const length = formData.password.length;

      // Update password rules status
      const updatedRules: PasswordRule[] = [
        { label: "Must contain at least 8 characters", isValid: length >= 8 },
        {
          label: "Must contain uppercase, lowercase letters, and numbers",
          isValid: hasUpperCase && hasLowerCase && hasNumber,
        },
        {
          label: "If less than 12 characters, must contain a special character",
          isValid: length >= 12 || (length < 12 && hasSpecialChar),
        },
      ];
      setPasswordRules(updatedRules);

      if (length < 8) {
        newErrors.password = "Password is required (at least 8 characters)";
      } else if (!hasUpperCase || !hasLowerCase || !hasNumber) {
        newErrors.password =
          "Must contain uppercase, lowercase letters, and numbers";
      } else if (length < 12 && !hasSpecialChar) {
        newErrors.password =
          "If less than 12 characters, must contain a special character";
      }
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  useEffect(() => {
    if (Object.values(touched).some((t) => t)) {
      validateForm();
    }
  }, [debouncedFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (name: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await signup(formData);
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          general: "Registration failed. Please try again.",
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const isFormValid =
    Object.values(errors).every((error) => !error) &&
    Object.values(formData).every((value) => value);

  return {
    formData,
    errors,
    touched,
    isSubmitting,
    passwordRules,
    handleChange,
    handleBlur,
    handleSubmit,
    isFormValid,
  };
}
