import React from 'react';
import { InfoCircle } from '@/components/icons';
import styles from './Metric.module.css';

/**
 * Metric Component
 * 
 * Emphasizes a single, specific value that informs users of a critical data point.
 * Allows users to identify meaningful changes and act on them.
 * 
 * @example
 * // Basic metric
 * <Metric title="Revenue" value="$45,200" />
 * 
 * @example
 * // Metric with positive trend
 * <Metric 
 *   title="Sales" 
 *   value="1,234" 
 *   unit="items"
 *   variant="positiveUp"
 *   textLabel="↑ 15% from last month"
 * />
 */
export interface MetricProps {
  /** The title/label describing what the metric represents (required) */
  title: string;
  
  /** The metric value to display (required) */
  value: string | number;
  
  /** Optional unit of measurement (e.g., "%", "USD", "items") */
  unit?: string;
  
  /** Optional timestamp or timeframe label */
  time?: string;
  
  /** Optional descriptive label with trend information */
  textLabel?: string;
  
  /** 
   * Variant determines the trend indicator and color
   * - neutral: No trend indicator (default)
   * - positiveUp: Green text + up arrow (good trend going up)
   * - negativeUp: Red text + up arrow (bad trend going up)
   * - positiveDown: Green text + down arrow (good trend going down)
   * - negativeDown: Red text + down arrow (bad trend going down)
   */
  variant?: 'neutral' | 'positiveUp' | 'negativeUp' | 'positiveDown' | 'negativeDown';
  
  /** Show an info circle icon next to the title */
  showInfoIcon?: boolean;

  /** Optional additional CSS classes */
  className?: string;

  /** Optional click handler (e.g. for Marty element selection) */
  onClick?: () => void;
}

/**
 * Up arrow icon for positive/negative up trends
 */
const UpArrowIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path 
      d="M8.35359 1.14645C8.15833 0.951184 7.84175 0.951184 7.64648 1.14645L3.14648 5.64645L3.85359 6.35355L7.50003 2.70711V15H8.50003V2.7071L12.1465 6.35355L12.8536 5.64645L8.35359 1.14645Z" 
      fill="currentColor"
    />
  </svg>
);

/**
 * Down arrow icon for positive/negative down trends
 */
const DownArrowIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path 
      d="M8.50003 13.2929L12.1465 9.64648L12.8536 10.3536L8.35359 14.8536C8.15833 15.0489 7.84175 15.0489 7.64648 14.8536L3.14648 10.3536L3.85359 9.64648L7.50003 13.2929V1H8.50003V13.2929Z" 
      fill="currentColor"
    />
  </svg>
);

/**
 * Get trend indicator content (icon + aria-label)
 */
const getTrendIndicator = (variant: MetricProps['variant']) => {
  switch (variant) {
    case 'positiveUp':
      return { 
        icon: <UpArrowIcon />, 
        label: 'trending up (positive)',
        colorClass: styles.positive 
      };
    case 'negativeUp':
      return { 
        icon: <UpArrowIcon />, 
        label: 'trending up (negative)',
        colorClass: styles.negative 
      };
    case 'positiveDown':
      return { 
        icon: <DownArrowIcon />, 
        label: 'trending down (positive)',
        colorClass: styles.positive 
      };
    case 'negativeDown':
      return { 
        icon: <DownArrowIcon />, 
        label: 'trending down (negative)',
        colorClass: styles.negative 
      };
    default:
      return null;
  }
};

export const Metric: React.FC<MetricProps> = ({
  title,
  value,
  unit,
  time,
  textLabel,
  variant = 'neutral',
  showInfoIcon,
  className = '',
  onClick,
}) => {
  const trendIndicator = getTrendIndicator(variant);
  const showTextLabel = textLabel || variant !== 'neutral';

  return (
    <div
      className={`${styles.metric} ${className}`}
      data-marty-selectable
      data-marty-label={title}
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : undefined}
    >
      {/* Title */}
      <div className={styles.title}>
        {title}
        {showInfoIcon && (
          <InfoCircle style={{ width: 14, height: 14, color: 'var(--ld-semantic-color-text-subtlest, #74767C)' }} />
        )}
      </div>

      {/* Time (optional) */}
      {time && (
        <div className={styles.time}>
          {time}
        </div>
      )}

      {/* Value + Unit */}
      <div className={styles.valueContainer}>
        <div className={styles.value}>
          {value}
        </div>
        {unit && (
          <div className={styles.unit}>
            {unit}
          </div>
        )}
      </div>

      {/* Text Label with optional trend indicator */}
      {showTextLabel && (
        <div className={styles.labelContainer}>
          {trendIndicator && (
            <div
              className={`${styles.trendIndicator} ${trendIndicator.colorClass}`}
              aria-label={trendIndicator.label}
              role="img"
            >
              {trendIndicator.icon}
            </div>
          )}
          {textLabel && (
            <div className={`${styles.textLabel} ${trendIndicator?.colorClass || ''}`}>
              {textLabel}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Metric;
