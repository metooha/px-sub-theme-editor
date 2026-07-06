import * as React from 'react';
import styles from './TextArea.module.css';

export type TextAreaSize = 'large' | 'small';

/**
 * Props for the TextArea component
 */
export interface TextAreaProps {
  /**
   * The label for the textarea (required for accessibility)
   */
  label: React.ReactNode;
  
  /**
   * The current value of the textarea
   */
  value?: string;
  
  /**
   * Callback when the value changes
   */
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  
  /**
   * The size of the textarea
   * - small: 100px height
   * - large: 128px height (default)
   * @default "large"
   */
  size?: TextAreaSize;
  
  /**
   * If the textarea is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * If the textarea is read-only
   * @default false
   */
  readOnly?: boolean;
  
  /**
   * If the content was AI-generated (shows magic icon)
   * @default false
   */
  isMagic?: boolean;
  
  /**
   * Helper text to display below the textarea
   */
  helperText?: React.ReactNode;
  
  /**
   * Error message to display below the textarea (replaces helper text)
   */
  error?: React.ReactNode;
  
  /**
   * Maximum character length (shows character counter)
   */
  maxLength?: number;
  
  /**
   * Placeholder text for the textarea
   */
  placeholder?: string;

  /**
   * ID for the textarea element
   */
  id?: string;
  
  /**
   * Accessible label for the magic icon
   * @default "AI Generated"
   */
  a11yMagicLabel?: string;
  
  /**
   * Custom announcement for max length character count
   */
  maxLengthA11yAnnouncement?: string;
  
  /**
   * Additional textarea props
   */
  textAreaProps?: Omit<React.ComponentPropsWithoutRef<'textarea'>, 'id' | 'value' | 'onChange' | 'disabled' | 'readOnly' | 'maxLength'>;
  
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
 * TextArea component for Living Design 3.5
 * 
 * A multi-line text input component with support for labels, error states, helper text,
 * character counting, and AI-generated content indicators.
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const {
      label,
      value = '',
      onChange,
      size = 'large',
      disabled = false,
      readOnly = false,
      isMagic = false,
      helperText,
      error,
      maxLength,
      id: providedId,
      placeholder,
      a11yMagicLabel = 'AI Generated',
      maxLengthA11yAnnouncement,
      textAreaProps,
      UNSAFE_className,
      UNSAFE_style,
    } = props;

    // Generate ID if not provided
    const generatedId = React.useId();
    const id = providedId || `textarea-${generatedId}`;
    const helperTextId = `${id}-helper`;
    const errorId = `${id}-error`;
    const counterId = `${id}-counter`;

    // Debounced character count announcement for screen readers
    const [debouncedCount, setDebouncedCount] = React.useState(value.length);
    const debounceTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    React.useEffect(() => {
      if (maxLength) {
        // Clear existing timeout
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }

        // Set new timeout
        debounceTimeoutRef.current = setTimeout(() => {
          setDebouncedCount(value.length);
        }, 1500);

        return () => {
          if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
          }
        };
      }
    }, [value.length, maxLength]);

    // Build className for container
    const containerClassName = [
      styles.container,
      UNSAFE_className,
    ].filter(Boolean).join(' ');

    // Build className for textarea
    const textareaClassName = [
      styles.textarea,
      size === 'small' ? styles.textareaSmall : styles.textareaLarge,
      disabled && styles.textareaDisabled,
      readOnly && styles.textareaReadonly,
      error && styles.textareaError,
      isMagic && styles.textareaMagic,
    ].filter(Boolean).join(' ');

    // Build className for label
    const labelClassName = [
      styles.labelText,
      isMagic && styles.labelTextMagic,
      disabled && styles.labelDisabled,
    ].filter(Boolean).join(' ');

    // Determine aria-describedby
    const describedBy = [];
    if (error) {
      describedBy.push(errorId);
    } else if (helperText) {
      describedBy.push(helperTextId);
    }
    if (maxLength) {
      describedBy.push(counterId);
    }

    return (
      <div className={containerClassName} style={UNSAFE_style}>
        {/* Label with optional Magic icon */}
        <label htmlFor={id} className={styles.label}>
          {isMagic && (
            <span className={styles.magicIcon} aria-label={a11yMagicLabel}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.1458 2.79167L12.3333 2.33333L12.7708 1.16667C12.7917 1.0625 12.8958 1 13 1C13.0833 1 13.1875 1.0625 13.2083 1.16667L13.6667 2.33333L14.8333 2.79167C14.9375 2.8125 15 2.91667 15 3C15 3.10417 14.9375 3.20833 14.8333 3.22917L13.6667 3.66667L13.2083 4.85417C13.1875 4.9375 13.0833 5 13 5C12.8958 5 12.7917 4.9375 12.7708 4.85417L12.3333 3.66667L11.1458 3.22917C11.0625 3.20833 11 3.10417 11 3C11 2.91667 11.0625 2.8125 11.1458 2.79167Z" />
                <path d="M1.28346 8.5288L1.8189 8.3089L2.07087 8.18325H2.10236L4.87402 6.89529L6.16535 4.09948L6.29134 3.84817L6.54331 3.31414C6.6063 3.12565 6.79528 3 6.98425 3C7.17323 3 7.3622 3.12565 7.45669 3.31414L7.70866 3.84817L7.80315 4.09948L7.83465 4.13089L9.09449 6.89529L11.8976 8.18325L12.1496 8.3089L12.685 8.56021C12.874 8.62304 13 8.81152 13 9C13 9.18848 12.874 9.37696 12.685 9.4712L12.1496 9.6911L11.8976 9.81675L9.09449 11.1047L7.80315 13.8691V13.9005L7.67717 14.1518L7.45669 14.6859C7.3622 14.8743 7.17323 15 6.98425 15C6.79528 15 6.6063 14.8743 6.54331 14.6859L6.29134 14.1518L6.16535 13.9005V13.8691L4.87402 11.1047L2.10236 9.81675H2.07087L1.8189 9.6911L1.28346 9.4712C1.09449 9.37696 1 9.18848 1 9C1 8.81152 1.09449 8.62304 1.28346 8.5288ZM3.89764 9L5.50394 9.75393C5.8189 9.87958 6.10236 10.1623 6.25984 10.4764L6.98425 12.0785L7.74016 10.4764C7.89764 10.1623 8.14961 9.87958 8.46457 9.75393L10.0709 9L8.46457 8.24607C8.14961 8.12042 7.89764 7.8377 7.74016 7.52356L6.98425 5.92147L6.25984 7.52356C6.10236 7.8377 5.8189 8.12042 5.50394 8.24607L3.89764 9Z" />
              </svg>
            </span>
          )}
          <span className={labelClassName}>{label}</span>
        </label>

        {/* Textarea */}
        <textarea
          ref={ref}
          id={id}
          className={textareaClassName}
          value={value}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly || (!onChange && value !== '')}
          maxLength={maxLength}
          placeholder={placeholder}
          aria-describedby={describedBy.length > 0 ? describedBy.join(' ') : undefined}
          aria-invalid={error ? 'true' : 'false'}
          {...textAreaProps}
        />

        {/* Helper/Error/Counter Row */}
        {(helperText || error || maxLength) && (
          <div className={styles.helperRow}>
            {/* Helper or Error text */}
            {error ? (
              <div className={styles.errorContainer}>
                <svg className={styles.errorIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM7.36905 9.19612L7.08333 4.12012H8.91667L8.64286 9.19612H7.36905ZM8 11.8721C7.71429 11.8721 7.47619 11.7921 7.28571 11.6321C7.09524 11.4641 7 11.2321 7 10.9361C7 10.6561 7.09524 10.4281 7.28571 10.2521C7.47619 10.0761 7.71429 9.98812 8 9.98812C8.27778 9.98812 8.5119 10.0761 8.70238 10.2521C8.90079 10.4281 9 10.6561 9 10.9361C9 11.2321 8.90079 11.4641 8.70238 11.6321C8.5119 11.7921 8.27778 11.8721 8 11.8721Z" />
                </svg>
                <span id={errorId} className={styles.errorText}>
                  {error}
                </span>
              </div>
            ) : helperText ? (
              <span id={helperTextId} className={styles.helperText}>
                {helperText}
              </span>
            ) : (
              <span></span>
            )}

            {/* Character counter */}
            {maxLength && (
              <span id={counterId} className={styles.counter} aria-live="polite" aria-atomic="true">
                <span className="sr-only">
                  {maxLengthA11yAnnouncement 
                    ? maxLengthA11yAnnouncement.replace('{current}', String(debouncedCount)).replace('{max}', String(maxLength))
                    : `${debouncedCount} of ${maxLength} characters`
                  }
                </span>
                <span aria-hidden="true">{value.length}/{maxLength}</span>
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
