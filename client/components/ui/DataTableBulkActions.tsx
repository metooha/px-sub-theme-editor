import * as React from 'react';
import { LinkButton } from '@/components/ui/LinkButton';
import styles from './DataTableBulkActions.module.css';

interface CommonProps {
  'aria-label'?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export interface DataTableBulkActionsProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'>,
    CommonProps {
  /** Accessibility label for the region. @default "Table actions" */
  a11yLabel?: string;
  /** Custom action buttons placed on the right (e.g. Button + overflow). */
  actionContent?: React.ReactNode;
  /** Number of selected rows. @default 0 */
  count?: number;
  /** Custom count display label (overrides the auto-generated one). */
  countLabel?: string;
  /** Callback to clear selection. */
  onClearSelected?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Callback to select all rows. */
  onSelectAll?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Bulk-actions toolbar (LD 3.5 DT Bulk Actions).
 *
 * Shown above a DataTable when one or more rows are selected.
 * - Left: checkmark icon + bold blue count label + "Select all" / "Clear selected" links
 * - Right: custom action buttons (pushed to far right)
 */
export const DataTableBulkActions = React.forwardRef<HTMLDivElement, DataTableBulkActionsProps>(
  (
    {
      a11yLabel = 'Table actions',
      actionContent,
      count = 0,
      countLabel,
      onClearSelected,
      onSelectAll,
      UNSAFE_className,
      UNSAFE_style,
      ...props
    },
    ref,
  ) => {
    const className = [styles.root, UNSAFE_className].filter(Boolean).join(' ');
    const label = countLabel ?? `${count} row${count === 1 ? '' : 's'} selected`;

    return (
      <div
        ref={ref}
        className={className}
        style={UNSAFE_style}
        role="region"
        aria-label={a11yLabel}
        {...props}
      >
        {/* Left group: checkmark + count + selection links */}
        <div className={styles.leftGroup}>
          {/* Selected checkmark icon */}
          <span className={styles.checkIcon} aria-hidden>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.7858 6.58019L9.31609 18.0499C8.7303 18.6356 7.78055 18.6356 7.19477 18.0499L3.2251 14.0802L4.28576 13.0195L8.25543 16.9892L19.7251 5.51953L20.7858 6.58019Z" fill="currentColor"/>
            </svg>
          </span>

          {/* Count label */}
          <span className={styles.countLabel}>{label}</span>

          {/* Selection action links */}
          <div className={styles.selectionLinks}>
            {onSelectAll && (
              <LinkButton size="small" onClick={onSelectAll}>
                Select all
              </LinkButton>
            )}
            {onClearSelected && (
              <LinkButton size="small" onClick={onClearSelected}>
                Clear selected
              </LinkButton>
            )}
          </div>
        </div>

        {/* Right group: action buttons */}
        {actionContent && (
          <div className={styles.actionsArea}>{actionContent}</div>
        )}
      </div>
    );
  },
);
DataTableBulkActions.displayName = 'DataTableBulkActions';
