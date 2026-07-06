import * as React from 'react';
import styles from './DataTableCellActions.module.css';

interface CommonProps {
  'aria-label'?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export type DataTableFrozen = 'left' | 'right';

export interface DataTableCellActionsProps
  extends Omit<React.ComponentPropsWithoutRef<'td'>, 'align' | 'className' | 'style'>,
    CommonProps {
  /** Typically IconButton or Menu components. */
  children: React.ReactNode;
  /** Freeze (sticky) this cell to the left or right edge. @default undefined */
  frozen?: DataTableFrozen;
}

/**
 * Container cell for row-level action buttons.
 */
export const DataTableCellActions = React.forwardRef<HTMLTableCellElement, DataTableCellActionsProps>(
  ({ children, frozen, UNSAFE_className, UNSAFE_style, ...props }, ref) => {
    const className = [
      styles.cell,
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
        <div className={styles.actions}>{children}</div>
      </td>
    );
  },
);
DataTableCellActions.displayName = 'DataTableCellActions';
