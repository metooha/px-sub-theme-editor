import * as React from 'react';
import styles from './DataTableTitle.module.css';

interface CommonProps {
  'aria-label'?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export interface DataTableTitleProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'>,
    CommonProps {
  /** Table title text. */
  children: React.ReactNode;
  /** Optional actions (buttons, icons) rendered on the right side. */
  actions?: React.ReactNode;
  /** Optional subtitle / description below the title. */
  subtitle?: React.ReactNode;
}

/**
 * Header / title bar that sits above a DataTable.
 */
export const DataTableTitle = React.forwardRef<HTMLDivElement, DataTableTitleProps>(
  ({ children, actions, subtitle, UNSAFE_className, UNSAFE_style, ...props }, ref) => {
    const className = [styles.root, UNSAFE_className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={className} style={UNSAFE_style} {...props}>
        <div className={styles.content}>
          <h3 className={styles.title}>{children}</h3>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    );
  },
);
DataTableTitle.displayName = 'DataTableTitle';
