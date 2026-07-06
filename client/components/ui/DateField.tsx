import * as React from 'react';
import styles from './DateField.module.css';

export interface DateFieldProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'className' | 'style' | 'type'> {
  /** Label text displayed above the input */
  label?: string;

  /** Error message — when provided, shows error state */
  error?: string;

  /** Helper text shown below input (hidden when error is present) */
  helperText?: string;

  /** Whether to show a decorative calendar icon */
  showCalendarIcon?: boolean;

  /** Whether to validate date format on blur (default: true) */
  validateOnBlur?: boolean;

  /** Callback when built-in validation fails */
  onValidationError?: (error: string) => void;

  /** Escape hatch for additional CSS classes */
  UNSAFE_className?: string;

  /** Escape hatch for inline styles */
  UNSAFE_style?: React.CSSProperties;

  /** End adornment rendered inside the input wrapper (e.g. icon button) */
  endAdornment?: React.ReactNode;
}

/**
 * Validate a mm/dd/yyyy date string.
 * Returns an error message string, or empty string if valid.
 */
function validateDate(value: string): string {
  if (!value) return '';

  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = value.match(regex);
  if (!match) return 'Please enter a valid date (mm/dd/yyyy)';

  const month = parseInt(match[1], 10);
  const day = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);

  if (month < 1 || month > 12) return 'Please enter a valid date (mm/dd/yyyy)';
  if (day < 1 || day > 31) return 'Please enter a valid date (mm/dd/yyyy)';
  if (year < 1000) return 'Please enter a valid date (mm/dd/yyyy)';

  // Check actual date validity (e.g. Feb 30 is invalid)
  const dateObj = new Date(year, month - 1, day);
  if (
    dateObj.getFullYear() !== year ||
    dateObj.getMonth() !== month - 1 ||
    dateObj.getDate() !== day
  ) {
    return 'Please enter a valid date (mm/dd/yyyy)';
  }

  return '';
}

/**
 * DateField component for Living Design 3.5
 *
 * A text input for manual date entry in mm/dd/yyyy format.
 * Supports label, error, helper text, optional calendar icon,
 * and built-in validation on blur.
 */
export const DateField = React.forwardRef<HTMLInputElement, DateFieldProps>(
  (props, ref) => {
    const {
      label,
      error: externalError,
      helperText,
      showCalendarIcon = false,
      validateOnBlur = true,
      onValidationError,
      disabled = false,
      placeholder = 'mm/dd/yyyy',
      UNSAFE_className,
      UNSAFE_style,
      endAdornment,
      onBlur,
      ...restProps
    } = props;

    const [internalError, setInternalError] = React.useState('');

    // External error takes precedence over internal validation error
    const error = externalError ?? internalError;
    const hasError = !!error;

    const handleBlur = React.useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        if (validateOnBlur && !externalError) {
          const value = e.target.value;
          const validationError = validateDate(value);
          setInternalError(validationError);
          if (validationError && onValidationError) {
            onValidationError(validationError);
          }
        }
        onBlur?.(e);
      },
      [validateOnBlur, externalError, onValidationError, onBlur],
    );

    // Clear internal error when user starts typing (only when no external error)
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (internalError) {
          setInternalError('');
        }
        restProps.onChange?.(e);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [internalError, restProps.onChange],
    );

    const wrapperClassName = [
      styles.dateField,
      hasError && styles['dateField--error'],
      disabled && styles['dateField--disabled'],
      UNSAFE_className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClassName} style={UNSAFE_style}>
        {label && (
          <label className={styles.dateField__label}>{label}</label>
        )}

        <div className={[
          styles.dateField__inputWrapper,
          endAdornment && styles['dateField__inputWrapper--withEndAdornment'],
        ].filter(Boolean).join(' ')}>
          <input
            ref={ref}
            type="text"
            inputMode="numeric"
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={
              hasError ? `${label ?? 'date'}-error` : helperText ? `${label ?? 'date'}-helper` : undefined
            }
            className={styles.dateField__input}
            onBlur={handleBlur}
            {...restProps}
            onChange={handleChange}
          />

          {showCalendarIcon && (
            <span className={styles.dateField__icon} aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="4"
                  width="14"
                  height="13"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path d="M3 8H17" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M6 3V5M14 3V5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </span>
          )}
          {endAdornment}
        </div>

        {hasError && (
          <div
            className={styles.dateField__errorMessage}
            id={`${label ?? 'date'}-error`}
            role="alert"
          >
            <span className={styles.dateField__errorIcon} aria-hidden="true">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M8 4.5V9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="8" cy="11.5" r="0.75" fill="currentColor" />
              </svg>
            </span>
            {error}
          </div>
        )}

        {!hasError && helperText && (
          <div
            className={styles.dateField__helperText}
            id={`${label ?? 'date'}-helper`}
          >
            {helperText}
          </div>
        )}
      </div>
    );
  },
);

DateField.displayName = 'DateField';
