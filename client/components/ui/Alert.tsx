import React from 'react';
import styles from './Alert.module.css';
import { InfoCircle, CheckCircle, Warning, ExclamationCircle } from '@/components/icons';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  variant?: AlertVariant;
  children: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

// Default icons for each variant (using LD 3.5 icon library)
const DEFAULT_ICONS: Record<AlertVariant, React.ReactNode> = {
  info: <InfoCircle style={{ width: 16, height: 16 }} />,
  success: <CheckCircle style={{ width: 16, height: 16 }} />,
  warning: <Warning style={{ width: 16, height: 16 }} />,
  error: <ExclamationCircle style={{ width: 16, height: 16 }} />,
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'info', children, icon, action, ...props }, ref) => {
    const displayIcon = icon !== undefined ? icon : DEFAULT_ICONS[variant];
    
    const className = [
      styles.alert,
      styles[`alert--${variant}`],
    ]
      .filter(Boolean)
      .join(' ');

    // Use role="alert" for error variant, aria-live="polite" for others
    const ariaProps = variant === 'error' 
      ? { role: 'alert' }
      : { 'aria-live': 'polite' as const };

    return (
      <div
        ref={ref}
        className={className}
        {...ariaProps}
        {...props}
      >
        {displayIcon && (
          <div className={styles.alert__icon}>
            {displayIcon}
          </div>
        )}
        <div className={styles.alert__content}>
          <div className={styles.alert__text}>
            {children}
          </div>
          {action && (
            <div className={styles.alert__action}>
              {action}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';
