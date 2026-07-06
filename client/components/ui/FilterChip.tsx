import * as React from 'react';
import styles from './FilterChip.module.css';
import { Sliders, ChevronDown, ChevronUp } from '@/components/icons';

export interface FilterChipProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'className' | 'style'
  > {
  /**
   * Whether the filter chip is in selected/pressed state.
   * @default false
   */
  selected?: boolean;

  /**
   * Callback when filter chip selection changes.
   */
  onSelectedChange?: (selected: boolean) => void;

  /**
   * Optional leading icon/content (rendered before the label).
   * Note: If `isAllFilters` is true, this will be ignored and Sliders icon will be used.
   */
  iconLeading?: React.ReactNode;

  /**
   * Optional trailing icon/content (rendered after the label).
   * Note: If `isMultiSelect` is true, this will be ignored and chevron icons will be used.
   */
  iconTrailing?: React.ReactNode;

  /**
   * Whether the filter chip is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Enable Multi-Select variant with chevron icons.
   * When true, shows ChevronDown when closed and ChevronUp when open.
   * @default false
   */
  isMultiSelect?: boolean;

  /**
   * Controls the open/closed state for Multi-Select variant.
   * When true, shows ChevronUp. When false, shows ChevronDown.
   * Only applies when `isMultiSelect` is true.
   * @default false
   */
  isOpen?: boolean;

  /**
   * Enable "All Filters" variant with Sliders icon.
   * When true, always shows Sliders icon and allows optional label/count.
   * @default false
   */
  isAllFilters?: boolean;

  /**
   * Show text label in All Filters variant.
   * Only applies when `isAllFilters` is true.
   * @default true
   */
  showLabel?: boolean;

  /**
   * Show count badge/number.
   * When true and count is provided, displays count in parentheses.
   * @default false
   */
  showCount?: boolean;

  /**
   * Active filter count to display.
   * Only shown when `showCount` is true.
   * @example "All Filters (2)"
   */
  count?: number;

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
 * FilterChip (Toggle) component — Living Design 3.5
 *
 * Interactive, selectable pill-shaped toggle buttons specifically designed for filtering.
 * FilterChips are toggle buttons that expose their selected state via `aria-pressed`.
 * They use the FILTER semantic token family and have fully rounded corners (pill shape).
 *
 * **Single Size:** Fixed at 32px height (no size variants)
 * **Variants:**
 * - Toggle: Simple on/off filter
 * - Multi-Select: Opens dropdown menu (shows ChevronDown when closed, ChevronUp when open)
 * - All Filters: Special variant with Sliders icon
 *
 * **Tokens Used:**
 * - Unselected: `filter-fill` (white), `filter-border` (gray-160, 1px), `filter-text-on-fill` (gray-160)
 * - Selected: `filter-fill-activated` (blue-10), `filter-border-activated` (blue-100, 2px)
 * - All states include `-hovered`, `-focused`, `-pressed`, and `-disabled` variants
 *
 * @example
 * Basic filter chip (Toggle)
 * ```tsx
 * <FilterChip selected={isActive} onSelectedChange={setIsActive}>
 *   Open
 * </FilterChip>
 * ```
 *
 * @example
 * Multi-Select variant (dropdown trigger)
 * ```tsx
 * <FilterChip
 *   isMultiSelect
 *   isOpen={menuOpen}
 *   selected={hasFilters}
 *   iconLeading={<FilterIcon />}
 *   showCount
 *   count={2}
 * >
 *   Text label
 * </FilterChip>
 * ```
 *
 * @example
 * All Filters variant with label and count
 * ```tsx
 * <FilterChip isAllFilters selected showCount count={3}>
 *   All Filters
 * </FilterChip>
 * ```
 *
 * @example
 * All Filters variant - icon only (28x28)
 * ```tsx
 * <FilterChip isAllFilters selected showLabel={false} />
 * ```
 *
 * @example
 * All Filters variant - icon + count (no label)
 * ```tsx
 * <FilterChip isAllFilters selected showLabel={false} showCount count={5} />
 * ```
 */
export const FilterChip = React.forwardRef<HTMLButtonElement, FilterChipProps>(
  (
    {
      selected = false,
      onSelectedChange,
      iconLeading,
      iconTrailing,
      disabled = false,
      children,
      onClick,
      isAllFilters = false,
      isMultiSelect = false,
      isOpen = false,
      showLabel = true,
      showCount = false,
      count,
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
      styles.filterChip,
      selected && styles['filterChip--selected'],
      isAllFilters && styles['filterChip--allFilters'],
      isMultiSelect && styles['filterChip--multiSelect'],
      UNSAFE_className,
    ]
      .filter(Boolean)
      .join(' ');

    // All Filters variant: always show Sliders icon, optional label and count
    if (isAllFilters) {
      const labelText = showLabel ? (children || 'All Filters') : null;
      const countText = showCount && typeof count === 'number' && count > 0 ? ` (${count})` : '';

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
          <span className={styles.filterChip__iconLeading}>
            <Sliders />
          </span>
          {(labelText || countText) && (
            <span className={styles.filterChip__label}>
              {labelText}{countText}
            </span>
          )}
        </button>
      );
    }

    // Multi-Select variant: show chevron down when closed, chevron up when open
    if (isMultiSelect) {
      const ChevronIcon = isOpen ? ChevronUp : ChevronDown;
      const countText = showCount && typeof count === 'number' && count > 0 ? ` (${count})` : '';

      return (
        <button
          ref={ref}
          type="button"
          className={className}
          style={UNSAFE_style}
          disabled={disabled}
          aria-pressed={selected}
          aria-expanded={isOpen}
          onClick={handleClick}
          {...restProps}
        >
          {iconLeading && (
            <span className={styles.filterChip__iconLeading}>{iconLeading}</span>
          )}
          <span className={styles.filterChip__label}>
            {children}{countText}
          </span>
          <span className={styles.filterChip__iconTrailing}>
            <ChevronIcon />
          </span>
        </button>
      );
    }

    // Standard Toggle variant
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
          <span className={styles.filterChip__iconLeading}>{iconLeading}</span>
        )}
        <span className={styles.filterChip__label}>{children}</span>
        {iconTrailing && (
          <span className={styles.filterChip__iconTrailing}>{iconTrailing}</span>
        )}
      </button>
    );
  },
);

FilterChip.displayName = 'FilterChip';
