import { InputHTMLAttributes, forwardRef } from 'react';
import './InputField.css';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, icon, id, ...props }, ref) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className="input-field">
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
        <div className={`input-wrapper ${error ? 'input-error' : ''}`}>
          {icon && <span className="input-icon">{icon}</span>}
          <input
            ref={ref}
            id={inputId}
            className="input-control"
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="input-error-message" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
