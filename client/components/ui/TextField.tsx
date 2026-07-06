import * as React from 'react';
import styles from './TextField.module.css';

export type TextFieldSize = 'large' | 'small';
export type TextFieldType = 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number';

/**
 * Props for the TextField component
 */
export interface TextFieldProps {
  /**
   * The label for the text field (required for accessibility)
   */
  label: React.ReactNode;
  
  /**
   * The current value of the text field (for controlled component)
   */
  value?: string;

  /**
   * The default value of the text field (for uncontrolled component)
   */
  defaultValue?: string;

  /**
   * Callback when the value changes
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Callback when the field loses focus
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * Callback when the field receives focus
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * The size of the text field
   * - small: 32px height, 14px text
   * - large: 56px height, 16px text (default)
   * @default "large"
   */
  size?: TextFieldSize;
  
  /**
   * If the text field is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * If the text field is read-only
   * @default false
   */
  readOnly?: boolean;
  
  /**
   * If the content was AI-generated (shows magic icon)
   * @default false
   */
  isMagic?: boolean;
  
  /**
   * Helper text to display below the text field
   */
  helperText?: React.ReactNode;
  
  /**
   * Error message to display below the text field (replaces helper text)
   */
  error?: React.ReactNode;
  
  /**
   * Leading icon (24x24px recommended, decorative only)
   */
  leadingIcon?: React.ReactNode;
  
  /**
   * Trailing content slot (buttons, icons, custom elements)
   */
  trailingContent?: React.ReactNode;
  
  /**
   * The input type
   * @default "text"
   */
  type?: TextFieldType;
  
  /**
   * Placeholder text
   */
  placeholder?: string;
  
  /**
   * ID for the input element
   */
  id?: string;
  
  /**
   * Accessible label for the magic icon
   * @default "AI Generated"
   */
  a11yMagicLabel?: string;
  
  /**
   * Additional input element props (except those controlled by TextField)
   */
  inputProps?: Omit<
    React.ComponentPropsWithoutRef<'input'>,
    'id' | 'value' | 'defaultValue' | 'onChange' | 'disabled' | 'readOnly' | 'type' | 'placeholder' | 'className' | 'style'
  >;
  
  /**
   * Unsafe className override (use sparingly)
   */
  UNSAFE_className?: string;
  
  /**
   * Unsafe style override (use sparingly)
   */
  UNSAFE_style?: React.CSSProperties;
}

/**
 * TextField component for Living Design 3.5
 * 
 * A single-line text input component with support for labels, error states, helper text,
 * leading icons, trailing content, and AI-generated content indicators.
 * 
 * @example
 * ```tsx
 * <TextField 
 *   label="Email Address" 
 *   type="email"
 *   placeholder="Enter email"
 *   helperText="We'll never share your email"
 * />
 * ```
 * 
 * @example With error state
 * ```tsx
 * <TextField 
 *   label="Campaign Name" 
 *   value={name}
 *   onChange={(e) => setName(e.target.value)}
 *   error="Campaign name is required"
 * />
 * ```
 * 
 * @example With leading icon and trailing button
 * ```tsx
 * <TextField 
 *   label="Search" 
 *   leadingIcon={<Search size={20} />}
 *   trailingContent={
 *     <Button variant="tertiary" size="small" onClick={handleClear}>
 *       <X size={16} />
 *     </Button>
 *   }
 * />
 * ```
 */
export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const {
      label,
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      size = 'large',
      disabled = false,
      readOnly = false,
      isMagic = false,
      helperText,
      error,
      leadingIcon,
      trailingContent,
      type = 'text',
      placeholder,
      id: providedId,
      a11yMagicLabel = 'AI Generated',
      inputProps,
      UNSAFE_className,
      UNSAFE_style,
    } = props;

    // Generate ID if not provided
    const generatedId = React.useId();
    const id = providedId || `textfield-${generatedId}`;
    const helperTextId = `${id}-helper`;
    const errorId = `${id}-error`;

    // Build className for container
    const containerClassName = [
      styles.container,
      UNSAFE_className,
    ].filter(Boolean).join(' ');

    // Build className for input container
    const inputContainerClassName = [
      styles.inputContainer,
      size === 'small' ? styles.inputContainerSmall : styles.inputContainerLarge,
      disabled && styles.inputContainerDisabled,
      error && styles.inputContainerError,
      isMagic && !error && styles.inputContainerMagic,
    ].filter(Boolean).join(' ');

    // Build className for input
    const inputClassName = [
      styles.input,
      size === 'small' ? styles.inputSmall : styles.inputLarge,
    ].filter(Boolean).join(' ');

    // Build className for label
    const labelClassName = [
      styles.labelText,
      disabled && styles.labelDisabled,
    ].filter(Boolean).join(' ');

    // Determine aria-describedby
    const describedBy = [];
    if (error) {
      describedBy.push(errorId);
    } else if (helperText) {
      describedBy.push(helperTextId);
    }

    return (
      <div className={containerClassName} style={UNSAFE_style}>
        {/* Label with optional Magic icon */}
        <label htmlFor={id} className={styles.label}>
          {isMagic && (
            <span className={disabled ? styles.magicIconDisabled : styles.magicIcon} aria-label={a11yMagicLabel}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.1458 2.79167L12.3333 2.33333L12.7708 1.16667C12.7917 1.0625 12.8958 1 13 1C13.0833 1 13.1875 1.0625 13.2083 1.16667L13.6667 2.33333L14.8333 2.79167C14.9375 2.8125 15 2.91667 15 3C15 3.10417 14.9375 3.20833 14.8333 3.22917L13.6667 3.66667L13.2083 4.85417C13.1875 4.9375 13.0833 5 13 5C12.8958 5 12.7917 4.9375 12.7708 4.85417L12.3333 3.66667L11.1458 3.22917C11.0625 3.20833 11 3.10417 11 3C11 2.91667 11.0625 2.8125 11.1458 2.79167Z" />
                <path d="M1.28346 8.5288L1.8189 8.3089L2.07087 8.18325H2.10236L4.87402 6.89529L6.16535 4.09948L6.29134 3.84817L6.54331 3.31414C6.6063 3.12565 6.79528 3 6.98425 3C7.17323 3 7.3622 3.12565 7.45669 3.31414L7.70866 3.84817L7.80315 4.09948L7.83465 4.13089L9.09449 6.89529L11.8976 8.18325L12.1496 8.3089L12.685 8.56021C12.874 8.62304 13 8.81152 13 9C13 9.18848 12.874 9.37696 12.685 9.4712L12.1496 9.6911L11.8976 9.81675L9.09449 11.1047L7.80315 13.8691V13.9005L7.67717 14.1518L7.45669 14.6859C7.3622 14.8743 7.17323 15 6.98425 15C6.79528 15 6.6063 14.8743 6.54331 14.6859L6.29134 14.1518L6.16535 13.9005V13.8691L4.87402 11.1047L2.10236 9.81675H2.07087L1.8189 9.6911L1.28346 9.4712C1.09449 9.37696 1 9.18848 1 9C1 8.81152 1.09449 8.62304 1.28346 8.5288ZM3.89764 9L5.50394 9.75393C5.8189 9.87958 6.10236 10.1623 6.25984 10.4764L6.98425 12.0785L7.74016 10.4764C7.89764 10.1623 8.14961 9.87958 8.46457 9.75393L10.0709 9L8.46457 8.24607C8.14961 8.12042 7.89764 7.8377 7.74016 7.52356L6.98425 5.92147L6.25984 7.52356C6.10236 7.8377 5.8189 8.12042 5.50394 8.24607L3.89764 9Z" />
              </svg>
            </span>
          )}
          <span className={labelClassName}>{label}</span>
        </label>

        {/* Input Container with leading icon, input, and trailing content */}
        <div className={inputContainerClassName}>
          {leadingIcon && (
            <span className={styles.leadingIcon} aria-hidden="true">
              {leadingIcon}
            </span>
          )}
          
          <input
            ref={ref}
            id={id}
            type={type}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={disabled}
            readOnly={readOnly || (value !== undefined && !onChange)}
            placeholder={placeholder}
            className={inputClassName}
            aria-describedby={describedBy.length > 0 ? describedBy.join(' ') : undefined}
            aria-invalid={error ? 'true' : 'false'}
            {...inputProps}
          />

          {trailingContent && (
            <div className={styles.trailingContent}>
              {trailingContent}
            </div>
          )}
        </div>

        {/* Helper/Error Text */}
        {(helperText || error) && (
          <div className={styles.helperRow}>
            {error ? (
              <div className={styles.errorContainer}>
                <svg className={styles.errorIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 14.9998C11.866 14.9998 15 11.8657 15 7.99976C15 4.13376 11.866 0.999756 8 0.999756C4.13401 0.999756 1 4.13376 1 7.99976C1 11.8657 4.13401 14.9998 8 14.9998ZM7.36905 9.19587L7.08333 4.11987H8.91667L8.64286 9.19587H7.36905ZM8 11.8719C7.71429 11.8719 7.47619 11.7919 7.28571 11.6319C7.09524 11.4639 7 11.2319 7 10.9359C7 10.6559 7.09524 10.4279 7.28571 10.2519C7.47619 10.0759 7.71429 9.98787 8 9.98787C8.27778 9.98787 8.5119 10.0759 8.70238 10.2519C8.90079 10.4279 9 10.6559 9 10.9359C9 11.2319 8.90079 11.4639 8.70238 11.6319C8.5119 11.7919 8.27778 11.8719 8 11.8719Z" />
                </svg>
                <span id={errorId} className={styles.errorText}>
                  {error}
                </span>
              </div>
            ) : (
              <span id={helperTextId} className={styles.helperText}>
                {helperText}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';
