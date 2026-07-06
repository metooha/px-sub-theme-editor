import * as React from 'react';
import styles from './Radio.module.css';
import { useRadioGroupContext } from './RadioGroup';

export interface RadioProps {
  /** The value for this radio option. */
  value: string;
  /** Optional visible label text. */
  label?: React.ReactNode;
  /** Whether to show the label. @default true */
  showLabel?: boolean;
  /** Whether the radio button is disabled. @default false */
  disabled?: boolean;
  /** HTML id for label association. */
  id?: string;
  /** Accessible label (when no visible label is provided). */
  'aria-label'?: string;
  /** Escape hatch for additional CSS classes. */
  UNSAFE_className?: string;
  /** Escape hatch for inline styles. */
  UNSAFE_style?: React.CSSProperties;
}

/**
 * LD 3.5 Radio component - Standalone (no Radix dependency).
 *
 * Uses native button with role="radio" and data-state attributes
 * for CSS compatibility with existing Radio.module.css.
 *
 * Must be used inside a `<RadioGroup>` container.
 */
export const Radio = React.forwardRef<HTMLButtonElement, RadioProps>(
  (
    {
      value,
      label,
      showLabel = true,
      disabled: disabledProp = false,
      id,
      'aria-label': ariaLabel,
      UNSAFE_className,
      UNSAFE_style,
    },
    ref,
  ) => {
    const ctx = useRadioGroupContext();
    const isChecked = ctx ? ctx.value === value : false;
    const isDisabled = disabledProp || (ctx?.disabled ?? false);
    const dataState = isChecked ? 'checked' : 'unchecked';

    const handleClick = () => {
      if (isDisabled) return;
      ctx?.onValueChange(value);
    };

    const radioClassName = [styles.radio, UNSAFE_className]
      .filter(Boolean)
      .join(' ');

    const radio = (
      <button
        ref={ref}
        type="button"
        role="radio"
        id={id}
        aria-checked={isChecked}
        aria-label={!label || !showLabel ? ariaLabel : undefined}
        aria-disabled={isDisabled || undefined}
        disabled={isDisabled}
        data-state={dataState}
        data-disabled={isDisabled || undefined}
        tabIndex={isChecked ? 0 : -1}
        className={radioClassName}
        style={UNSAFE_style}
        onClick={handleClick}
      >
        {isChecked && (
          <span className={styles.indicator}>
            <span className={styles.dot} />
          </span>
        )}
      </button>
    );

    if (label && showLabel) {
      const wrapperClassName = [
        styles.wrapper,
        isDisabled && styles['wrapper--disabled'],
      ]
        .filter(Boolean)
        .join(' ');

      const labelClassName = [
        styles.label,
        isChecked && styles['label--checked'],
        isDisabled && styles['label--disabled'],
      ]
        .filter(Boolean)
        .join(' ');

      return (
        <label className={wrapperClassName}>
          {radio}
          <span className={labelClassName} data-radio-label="">
            {label}
          </span>
        </label>
      );
    }

    return radio;
  },
);

Radio.displayName = 'Radio';
