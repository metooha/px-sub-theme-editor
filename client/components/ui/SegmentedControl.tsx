import * as React from 'react';
import styles from './SegmentedControl.module.css';

export interface SegmentedControlItem {
  /** Unique value for this segment */
  value: string;
  /** Label displayed in the segment */
  label: React.ReactNode;
  /** Optional leading icon */
  icon?: React.ReactNode;
  /** Disable this individual segment */
  disabled?: boolean;
}

export interface SegmentedControlProps {
  /**
   * The list of segment items (2–5 items).
   */
  items: SegmentedControlItem[];

  /**
   * The currently selected value (controlled).
   */
  value: string;

  /**
   * Called when the user selects a segment.
   */
  onChange: (value: string) => void;

  /**
   * Accessible label for the control group.
   */
  'aria-label'?: string;

  /**
   * Disable all segments.
   * @default false
   */
  disabled?: boolean;

  /**
   * If true the control stretches to fill its container width.
   * @default false
   */
  isFullWidth?: boolean;

  /** Additional CSS class. */
  UNSAFE_className?: string;

  /** Additional inline styles. */
  UNSAFE_style?: React.CSSProperties;
}

/**
 * SegmentedControl — Living Design 3.5
 *
 * A linear set of 2–5 mutually exclusive segments, each functioning as a
 * button. Matches the [WCP] Segmented Control Figma spec.
 */
export const SegmentedControl = React.forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>((props, ref) => {
  const {
    items,
    value,
    onChange,
    'aria-label': ariaLabel,
    disabled = false,
    isFullWidth = false,
    UNSAFE_className,
    UNSAFE_style,
  } = props;

  const count = items.length;

  function getPosition(index: number): 'left' | 'center' | 'right' {
    if (index === 0) return 'left';
    if (index === count - 1) return 'right';
    return 'center';
  }

  const containerClass = [
    styles.segmentedControl,
    isFullWidth && styles['segmentedControl--fullWidth'],
    UNSAFE_className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      role="group"
      aria-label={ariaLabel}
      className={containerClass}
      style={UNSAFE_style}
    >
      {items.map((item, index) => {
        const isActive = item.value === value;
        const isDisabled = disabled || item.disabled;
        const position = getPosition(index);

        const segmentClass = [
          styles.segment,
          styles[`segment--${position}`],
          isActive && styles['segment--active'],
          isDisabled && styles['segment--disabled'],
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={item.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            disabled={isDisabled}
            className={segmentClass}
            onClick={() => {
              if (!isDisabled) onChange(item.value);
            }}
          >
            {item.icon && (
              <span className={styles.segment__icon} aria-hidden="true">
                {item.icon}
              </span>
            )}
            <span className={styles.segment__label}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
});

SegmentedControl.displayName = 'SegmentedControl';
