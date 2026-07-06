import * as React from 'react';
import styles from './SpotIcon.module.css';

export type SpotIconSize = 'small' | 'large';
export type SpotIconColor = 'brand' | 'neutral' | 'white';

export interface SpotIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  /**
   * The icon content to display (typically an Icon component or SVG).
   */
  icon: React.ReactNode;
  
  /**
   * The size of the spot icon.
   * - small: 48px container with 24px icon
   * - large: 64px container with 32px icon
   * @default "small"
   */
  size?: SpotIconSize;
  
  /**
   * The color variant of the spot icon.
   * - brand: Uses brand background and text colors
   * - neutral: Uses neutral text color with same container
   * - white: Uses white background with brand icon color
   * @default "brand"
   */
  color?: SpotIconColor;
  
  /**
   * Additional CSS class name for custom styling.
   */
  className?: string;
}

/**
 * SpotIcon component for Living Design 3.5
 * 
 * Spot Icons are used to add visual interest, clarity, and to direct the user's eye
 * to interface elements like navigation items or messaging.
 * 
 * They are decorative only. They are not interactive.
 * If needing an interactive icon use the Icon Button component instead.
 * 
 * @example
 * ```tsx
 * <SpotIcon icon={<ArticleIcon />} size="small" color="brand" />
 * <SpotIcon icon={<BellIcon />} size="large" color="neutral" />
 * ```
 */
export const SpotIcon = React.forwardRef<HTMLDivElement, SpotIconProps>(
  ({ icon, size = 'small', color = 'brand', className, ...props }, ref) => {
    const containerClassName = [
      styles.spotIcon,
      styles[`spotIcon--${size}`],
      styles[`spotIcon--${color}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const iconClassName = [
      styles.spotIconInner,
      styles[`spotIconInner--${size}`],
      styles[`spotIconInner--${color}`],
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={containerClassName} {...props}>
        <span className={iconClassName}>{icon}</span>
      </div>
    );
  }
);

SpotIcon.displayName = 'SpotIcon';
