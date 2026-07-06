import React, { useId, useState } from 'react';
import styles from './Switch.module.css';

export interface SwitchProps {
  /**
   * Label text for the switch (required for accessibility unless aria-labelledby is provided)
   */
  label?: React.ReactNode;

  /**
   * ID to link label via aria-labelledby (alternative to label prop)
   */
  'aria-labelledby'?: string;

  /**
   * Whether the switch is in the "on" state (controlled)
   */
  checked?: boolean;

  /**
   * Default checked state for uncontrolled usage
   */
  defaultChecked?: boolean;

  /**
   * Callback when switch state changes
   */
  onChange?: (checked: boolean) => void;

  /**
   * Whether the switch is disabled
   */
  disabled?: boolean;

  /**
   * HTML id attribute for the switch element
   */
  id?: string;

  /**
   * Additional CSS class name (UNSAFE - avoid using, prefer component props)
   */
  UNSAFE_className?: string;

  /**
   * Additional inline styles (UNSAFE - avoid using, prefer component props)
   */
  UNSAFE_style?: React.CSSProperties;
}

/**
 * Switch component following Living Design 3.5 specifications.
 * 
 * Switches are controls that have an on/off state, similar to a physical light switch.
 * When the user turns the switch on, the setting is immediately applied (no additional "save" button needed).
 * 
 * @example
 * // Controlled usage
 * <Switch 
 *   label="Enable notifications" 
 *   checked={isEnabled} 
 *   onChange={setIsEnabled} 
 * />
 * 
 * @example
 * // Uncontrolled usage
 * <Switch label="Dark mode" defaultChecked={true} />
 */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      label,
      'aria-labelledby': ariaLabelledby,
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      disabled = false,
      id: providedId,
      UNSAFE_className,
      UNSAFE_style,
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const labelId = `${id}-label`;

    // Handle controlled vs uncontrolled state
    const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : uncontrolledChecked;

    const handleClick = () => {
      if (disabled) return;

      const newChecked = !checked;

      if (!isControlled) {
        setUncontrolledChecked(newChecked);
      }

      onChange?.(newChecked);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      // Space and Enter toggle the switch
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        handleClick();
      }
    };

    return (
      <div 
        className={`${styles.container} ${UNSAFE_className || ''}`}
        style={UNSAFE_style}
      >
        <button
          ref={ref}
          id={id}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-labelledby={label ? labelId : ariaLabelledby}
          disabled={disabled}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={`${styles.track} ${checked ? styles['track--checked'] : ''} ${
            disabled ? styles['track--disabled'] : ''
          }`}
        >
          <span
            className={`${styles.handle} ${checked ? styles['handle--checked'] : ''} ${
              disabled ? styles['handle--disabled'] : ''
            }`}
            aria-hidden="true"
          />
        </button>
        {label && (
          <label 
            id={labelId} 
            htmlFor={id}
            className={`${styles.label} ${disabled ? styles['label--disabled'] : ''}`}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
