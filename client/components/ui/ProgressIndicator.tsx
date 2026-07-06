import React from 'react';
import styles from './ProgressIndicator.module.css';

export interface ProgressIndicatorProps {
  /**
   * The current progress value (0-100)
   */
  value: number;
  /**
   * The maximum value for the progress indicator
   * @default 100
   */
  max?: number;
  /**
   * Optional label displayed on the left side
   */
  label?: string;
  /**
   * Optional value label displayed on the right side
   * If not provided and showValue is true, will display percentage
   */
  valueLabel?: string;
  /**
   * Visual variant representing different states
   * @default 'primary'
   */
  variant?: 'primary' | 'success' | 'warning' | 'error';
  /**
   * Automatically show percentage value if no valueLabel provided
   * @default false
   */
  showValue?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * ProgressIndicator component displays progress with visual feedback.
 * Supports multiple color variants for different states and contexts.
 * 
 * @example
 * ```tsx
 * <ProgressIndicator value={75} label="Loading" variant="primary" showValue />
 * <ProgressIndicator value={90} label="Upload" variant="success" valueLabel="90%" />
 * <ProgressIndicator value={60} label="Warning" variant="warning" />
 * <ProgressIndicator value={30} label="Error" variant="error" />
 * ```
 */
export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  value,
  max = 100,
  label,
  valueLabel,
  variant = 'primary',
  showValue = false,
  className = '',
}) => {
  // Clamp value between 0 and max
  const clampedValue = Math.min(Math.max(value, 0), max);
  const percentage = (clampedValue / max) * 100;

  // Auto-generate value label if showValue is true and no custom valueLabel
  const displayValueLabel = valueLabel || (showValue ? `${Math.round(percentage)}%` : undefined);

  return (
    <div className={`${styles.container} ${className}`}>
      {label && <div className={styles.label}>{label}</div>}
      
      <div className={styles.progressWrapper}>
        <div
          className={styles.track}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || 'Progress'}
        >
          <div
            className={`${styles.fill} ${styles[`fill-${variant}`]}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {displayValueLabel && (
        <div className={styles.valueLabel}>{displayValueLabel}</div>
      )}
    </div>
  );
};

export default ProgressIndicator;
