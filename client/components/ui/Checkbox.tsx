import * as React from 'react';
import styles from './Checkbox.module.css';

export type CheckboxSize = 'small' | 'large';

export interface CheckboxProps {
  /**
   * Controlled checked state. Use `'indeterminate'` for partial selection.
   */
  checked?: boolean | 'indeterminate';

  /**
   * Default checked state for uncontrolled usage.
   */
  defaultChecked?: boolean;

  /**
   * Whether the checkbox is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * The size of the checkbox.
   * Use 'large' for confirmation messages and prominent single-checkbox flows.
   * @default 'small'
   */
  size?: CheckboxSize;

  /**
   * Callback when checked state changes.
   */
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;

  /**
   * Optional visible label rendered beside the checkbox.
   */
  label?: string;

  /**
   * Accessible label (if no visible label is provided).
   */
  'aria-label'?: string;

  /**
   * HTML id for label association.
   */
  id?: string;

  /**
   * Form field name.
   */
  name?: string;

  /**
   * Form field value.
   * @default 'on'
   */
  value?: string;

  /**
   * Whether the checkbox is required.
   * @default false
   */
  required?: boolean;

  /**
   * Escape hatch for additional CSS classes on the checkbox root.
   */
  UNSAFE_className?: string;

  /**
   * Escape hatch for inline styles on the checkbox root.
   */
  UNSAFE_style?: React.CSSProperties;
}

const CheckIcon = () => (
  <svg
    className={styles.checkIcon}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.5 6L5 8.5L9.5 3.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </svg>
);

const IndeterminateIcon = () => (
  <svg
    className={styles.indeterminateIcon}
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 5H9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
    />
  </svg>
);

/**
 * LD 3.5 Checkbox component.
 *
 * Standalone implementation with no external dependencies.
 * Uses native HTML + React state for accessibility and state management.
 * Uses CSS modules with LD 3.5 semantic input tokens exclusively.
 */
export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      disabled = false,
      size = 'small',
      onCheckedChange,
      label,
      'aria-label': ariaLabel,
      id,
      name,
      value = 'on',
      required,
      UNSAFE_className,
      UNSAFE_style,
    },
    ref,
  ) => {
    const isControlled = controlledChecked !== undefined;
    const [internalChecked, setInternalChecked] = React.useState<boolean | 'indeterminate'>(
      defaultChecked
    );

    const checkedState = isControlled ? controlledChecked : internalChecked;
    const isChecked = checkedState === true;
    const isIndeterminate = checkedState === 'indeterminate';

    const dataState = isIndeterminate
      ? 'indeterminate'
      : isChecked
        ? 'checked'
        : 'unchecked';

    const handleClick = () => {
      if (disabled) return;

      const nextChecked = isIndeterminate ? true : !isChecked;

      if (!isControlled) {
        setInternalChecked(nextChecked);
      }
      onCheckedChange?.(nextChecked);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      // Space and Enter toggle the checkbox
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleClick();
      }
    };

    const checkboxClassName = [
      styles.checkbox,
      size === 'large' && styles['checkbox--large'],
      UNSAFE_className,
    ]
      .filter(Boolean)
      .join(' ');

    const checkbox = (
      <>
        <button
          ref={ref}
          type="button"
          role="checkbox"
          aria-checked={isIndeterminate ? 'mixed' : isChecked}
          aria-label={!label ? ariaLabel : undefined}
          aria-required={required || undefined}
          aria-disabled={disabled || undefined}
          id={id}
          disabled={disabled}
          data-state={dataState}
          data-disabled={disabled || undefined}
          className={checkboxClassName}
          style={UNSAFE_style}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          {(isChecked || isIndeterminate) && (
            <span className={styles.indicator}>
              {isIndeterminate ? <IndeterminateIcon /> : <CheckIcon />}
            </span>
          )}
        </button>
        {/* Hidden native input for form submission */}
        {name && (
          <input
            type="hidden"
            name={name}
            value={isChecked ? value : ''}
            disabled={disabled}
          />
        )}
      </>
    );

    if (label) {
      const wrapperClassName = [
        styles.wrapper,
        disabled && styles['wrapper--disabled'],
      ]
        .filter(Boolean)
        .join(' ');

      const labelClassName = [
        styles.label,
        disabled && styles['label--disabled'],
      ]
        .filter(Boolean)
        .join(' ');

      return (
        <label className={wrapperClassName}>
          {checkbox}
          <span className={labelClassName}>{label}</span>
        </label>
      );
    }

    return checkbox;
  },
);

Checkbox.displayName = 'Checkbox';
