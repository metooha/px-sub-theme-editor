import * as React from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 
  | 'info' 
  | 'success' 
  | 'warning' 
  | 'error'
  | 'neutral'
  | 'blue'
  | 'green'
  | 'red'
  | 'orange'
  | 'purple'
  | 'pink'
  | 'teal'
  | 'yellow';

export type BadgeSize = 'small' | 'medium' | 'large';

export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /**
   * The variant/intent of the badge, determines its color
   */
  variant?: BadgeVariant;
  
  /**
   * The numeric value to display in the badge
   * If not provided, badge will render as a dot
   */
  value?: number | string;
  
  /**
   * Size of the badge
   * @default 'medium'
   */
  size?: BadgeSize;
  
  /**
   * Accessible label for the badge
   * Recommended format: "{count} {description}" (e.g., "2 unread messages")
   */
  'aria-label'?: string;
}

/**
 * Badge Component - Living Design 3.5
 * 
 * Badges highlight an object to visually indicate a count or status.
 * Badges are non-interactive.
 * 
 * @example
 * ```tsx
 * // Count badge
 * <Badge variant="info" value={5} aria-label="5 unread messages" />
 * 
 * // Status badge (dot only)
 * <Badge variant="success" aria-label="Status: active" />
 * 
 * // With a button
 * <Button aria-label="Inbox, 2 unread emails">
 *   Inbox <Badge variant="error" value={2} />
 * </Button>
 * ```
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { 
      variant = 'neutral', 
      value,
      size = 'medium',
      className,
      'aria-label': ariaLabel,
      ...props 
    },
    ref
  ) => {
    const badgeClasses = [
      styles.badge,
      styles[`badge--variant-${variant}`],
      styles[`badge--size-${size}`],
      className
    ].filter(Boolean).join(' ');

    // If value is provided, render it; otherwise render as dot badge
    const content = value !== undefined ? value : null;

    return (
      <span
        ref={ref}
        className={badgeClasses}
        role="status"
        aria-label={ariaLabel}
        {...props}
      >
        {content}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
