import * as React from 'react';
import styles from './DataTableCellText.module.css';

interface CommonProps {
  'aria-label'?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export type DataTableFrozen = 'left' | 'right';

export interface DataTableCellStatusProps
  extends Omit<React.ComponentPropsWithoutRef<'td'>, 'align' | 'className' | 'style'>,
    CommonProps {
  /** Typically Tag components. */
  children: React.ReactNode;
  /** Freeze (sticky) this cell to the left or right edge. */
  frozen?: DataTableFrozen;
}

/**
 * Specialized cell for displaying status information using Tag components.
 */
export const DataTableCellStatus = React.forwardRef<HTMLTableCellElement, DataTableCellStatusProps>(
  ({ children, frozen, UNSAFE_className, UNSAFE_style, ...props }, ref) => {
    const className = [
      styles.cell,
      styles.cellAlphanumeric,
      frozen && styles.frozen,
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
DataTableCellStatus.displayName = 'DataTableCellStatus';
