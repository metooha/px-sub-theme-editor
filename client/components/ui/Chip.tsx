import * as React from 'react';
import styles from './Chip.module.css';

export type ChipSize = 'small' | 'medium';

export interface ChipProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'className' | 'style'
  > {
  /**
   * Whether the chip is in selected/pressed state.
   * @default false
   */
  selected?: boolean;

  /**
   * Callback when chip selection changes.
   */
  onSelectedChange?: (selected: boolean) => void;

  /**
   * The size of the chip.
   * - `small`: 32px height, 16px horizontal padding
   * - `medium`: 40px height, 16px horizontal padding
   * @default 'medium'
   */
  size?: ChipSize;

  /**
   * Optional leading icon/content (rendered before the label).
   */
  iconLeading?: React.ReactNode;

  /**
   * Optional trailing icon/content (rendered after the label).
   */
  iconTrailing?: React.ReactNode;

  /**
   * Whether the chip is disabled.
   * @default false
   */
  disabled?: boolean;

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
 * Chip component — Living Design 3.5
 *
 * Interactive, selectable buttons with subtle rounded corners used for
 * categorization and selection. Chips are toggle buttons that expose their
 * selected state via `aria-pressed`. For filter-specific chips, use FilterChip.
 *
 * @example
 * ```tsx
 * <Chip selected={isActive} onSelectedChange={setIsActive}>
 *   Open
 * </Chip>
 * ```
 */
export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      selected = false,
      onSelectedChange,
      size = 'medium',
      iconLeading,
      iconTrailing,
      disabled = false,
      children,
      onClick,
      UNSAFE_className,
      UNSAFE_style,
      ...restProps
    },
    ref,
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        onSelectedChange?.(!selected);
      }
      onClick?.(e);
    };

    const className = [
      styles.chip,
      styles[`chip--size-${size}`],
      selected && styles['chip--selected'],
      UNSAFE_className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type="button"
        className={className}
        style={UNSAFE_style}
        disabled={disabled}
        aria-pressed={selected}
        onClick={handleClick}
        {...restProps}
      >
        {iconLeading && (
          <span className={styles.chip__iconLeading}>{iconLeading}</span>
        )}
        <span className={styles.chip__label}>{children}</span>
        {iconTrailing && (
          <span className={styles.chip__iconTrailing}>{iconTrailing}</span>
        )}
      </button>
    );
  },
);

Chip.displayName = 'Chip';
