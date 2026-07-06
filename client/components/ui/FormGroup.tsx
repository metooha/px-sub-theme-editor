import * as React from 'react';
import { ExclamationCircleFill } from '@/components/icons/ExclamationCircleFill';
import styles from './FormGroup.module.css';

export interface FormGroupProps {
  /**
   * Group label rendered as a `<legend>` for accessibility.
   */
  label?: React.ReactNode;

  /**
   * Helper text displayed below the label (hidden when `error` is set).
   */
  helperText?: React.ReactNode;

  /**
   * Error message. When set, takes precedence over `helperText` and
   * renders with a red error icon.
   */
  error?: React.ReactNode;

  /**
   * Whether the group is required. Shows an asterisk (*) after the label.
   * @default false
   */
  required?: boolean;

  /**
   * Whether all children are disabled. Dims the group and prevents interaction.
   * @default false
   */
  disabled?: boolean;

  /**
   * The form controls to group (Checkbox, Radio, etc.).
   */
  children: React.ReactNode;

  /**
   * Escape hatch for additional CSS classes.
   */
  UNSAFE_className?: string;

  /**
   * Escape hatch for inline styles.
   */
  UNSAFE_style?: React.CSSProperties;
}

/**
 * LD 3.5 FormGroup component.
 *
 * Renders a semantic `<fieldset>` / `<legend>` wrapper for grouping related
 * form controls (checkboxes, radio buttons, etc.) with optional label,
 * helper text, and error state.
 *
 * Uses LD 3.5 semantic tokens exclusively.
 */
export const FormGroup = React.forwardRef<HTMLFieldSetElement, FormGroupProps>(
  (
    {
      label,
      helperText,
      error,
      required = false,
      disabled = false,
      children,
      UNSAFE_className,
      UNSAFE_style,
    },
    ref,
  ) => {
    const metaId = React.useId();
    const errorId = `${metaId}-error`;
    const helperId = `${metaId}-helper`;
    const hasError = Boolean(error);
    const hasHelper = Boolean(helperText) && !hasError;

    const rootClassName = [
      styles.formGroup,
      disabled && styles['formGroup--disabled'],
      UNSAFE_className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <fieldset
        ref={ref}
        className={rootClassName}
        style={UNSAFE_style}
        disabled={disabled}
        aria-invalid={hasError || undefined}
        aria-describedby={
          hasError ? errorId : hasHelper ? helperId : undefined
        }
      >
        {label && (
          <legend className={styles.legend}>
            {label}
            {required && (
              <span className={styles.requiredIndicator} aria-hidden="true">
                *
              </span>
            )}
          </legend>
        )}

        {(hasError || hasHelper) && (
          <div className={styles.meta}>
            {hasError && (
              <div
                id={errorId}
                className={styles.errorText}
                role="alert"
              >
                <ExclamationCircleFill className={styles.errorIcon} />
                <span>{error}</span>
              </div>
            )}
            {hasHelper && (
              <p id={helperId} className={styles.helperText}>
                {helperText}
              </p>
            )}
          </div>
        )}

        <div className={styles.children}>{children}</div>
      </fieldset>
    );
  },
);

FormGroup.displayName = 'FormGroup';
