import * as React from 'react';
import styles from './DataTableRow.module.css';

interface CommonProps {
  'aria-label'?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export interface DataTableRowProps
  extends Omit<React.ComponentPropsWithoutRef<'tr'>, 'className' | 'style'>,
    CommonProps {
  children: React.ReactNode;
  /** If the row is selected. */
  selected?: boolean;
}

export const DataTableRow = React.forwardRef<HTMLTableRowElement, DataTableRowProps>(
  ({ children, selected = false, UNSAFE_className, UNSAFE_style, ...props }, ref) => {
    const className = [
      styles.row,
      selected && styles.rowSelected,
      UNSAFE_className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <tr
        ref={ref}
        className={className}
        style={UNSAFE_style}
        data-state={selected ? 'selected' : undefined}
        {...props}
      >
        {children}
      </tr>
    );
  },
);
DataTableRow.displayName = 'DataTableRow';
