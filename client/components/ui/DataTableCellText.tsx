import * as React from 'react';
import styles from './DataTableCellText.module.css';

interface CommonProps {
  'aria-label'?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export type DataTableCellVariant = 'alphanumeric' | 'numeric';
export type DataTableFrozen = 'left' | 'right';

export interface DataTableCellProps
  extends Omit<React.ComponentPropsWithoutRef<'td'>, 'align' | 'className' | 'style'>,
    CommonProps {
  children: React.ReactNode;
  /** Content type styling. @default "alphanumeric" */
  variant?: DataTableCellVariant;
  /** Freeze (sticky) this cell to the left or right edge. */
  frozen?: DataTableFrozen;
  /** Allow cell content to wrap instead of truncating with ellipsis. @default false */
  wrap?: boolean;
}

/**
 * Basic data cell for DataTable. Supports alphanumeric (left-aligned) and
 * numeric (right-aligned, monospace) variants.
 */
export const DataTableCell = React.forwardRef<HTMLTableCellElement, DataTableCellProps>(
  ({ children, variant = 'alphanumeric', frozen, wrap = false, UNSAFE_className, UNSAFE_style, ...props }, ref) => {
    const variantClass =
      variant === 'numeric' ? styles.cellNumeric : styles.cellAlphanumeric;

    const className = [
      styles.cell,
      variantClass,
      frozen && styles.frozen,
      wrap && styles.cellWrap,
      UNSAFE_className,
    ].filter(Boolean).join(' ');

    const style: React.CSSProperties = {
      ...UNSAFE_style,
      ...(frozen === 'left' ? { left: 0 } : {}),
      ...(frozen === 'right' ? { right: 0 } : {}),
    };

    return (
      <td ref={ref} className={className} style={style} {...props}>
        {children}
      </td>
    );
  },
);
DataTableCell.displayName = 'DataTableCell';
