import * as React from 'react';
import styles from './Divider.module.css';

export interface DividerProps
  extends Omit<React.ComponentPropsWithoutRef<'hr'>, 'className' | 'style'> {
  /** Optional text label centered within the divider */
  title?: string;
  /**
   * Orientation of the divider.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * When true, the divider is hidden from assistive technology.
   * @default true
   */
  decorative?: boolean;
  /** Escape hatch for additional CSS classes. */
  UNSAFE_className?: string;
  /** Escape hatch for inline styles. */
  UNSAFE_style?: React.CSSProperties;
}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  (
    {
      title,
      orientation = 'horizontal',
      decorative = true,
      UNSAFE_className,
      UNSAFE_style,
      ...props
    },
    ref,
  ) => {
    const hrClassName = [
      styles.divider,
      orientation === 'vertical' ? styles['divider--vertical'] : undefined,
      title ? undefined : UNSAFE_className,
    ]
      .filter(Boolean)
      .join(' ');

    const hrProps = {
      'aria-hidden': decorative ? ('true' as const) : undefined,
      role: decorative ? 'none' : 'separator',
      'aria-orientation':
        !decorative && orientation === 'vertical'
          ? ('vertical' as const)
          : undefined,
      ...props,
    };

    if (title) {
      return (
        <div
          role="separator"
          aria-label={title}
          className={[styles.divider__titled, UNSAFE_className]
            .filter(Boolean)
            .join(' ')}
          style={UNSAFE_style}
        >
          <hr className={hrClassName} aria-hidden="true" />
          <span className={styles.divider__label}>{title}</span>
          <hr className={hrClassName} aria-hidden="true" />
        </div>
      );
    }

    return (
      <hr
        ref={ref}
        className={hrClassName}
        style={UNSAFE_style}
        {...hrProps}
      />
    );
  },
);

Divider.displayName = 'Divider';
