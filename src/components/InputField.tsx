import { InputFieldProps } from "@/lib/RegisterValidation/types";

export function InputField({
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
}: InputFieldProps) {
  const inputStyles = `w-full p-3 border rounded-md focus:outline-none focus:ring-2 transition ${
    error && touched
      ? "border-red-500 focus:ring-red-500"
      : "border-gray-200 focus:ring-primary/50"
  }`;

  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={() => onBlur(name)}
        className={inputStyles}
        required
        aria-invalid={!!error}
        aria-describedby={error && touched ? `${name}-error` : undefined}
      />
      {error && touched && (
        <p id={`${name}-error`} className="text-red-500 text-sm mt-1 text-left">
          {error}
        </p>
      )}
    </div>
  );
}
