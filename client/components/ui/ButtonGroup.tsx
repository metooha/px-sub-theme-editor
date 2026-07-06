import * as React from 'react';
import styles from './ButtonGroup.module.css';

interface CommonProps {
  'aria-label'?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export interface ButtonGroupProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'>,
    CommonProps {
  /**
   * The content for the button group (typically Button components).
   */
  children: React.ReactNode;
}

/**
 * ButtonGroup component for Living Design 3.5
 * 
 * Layout container that displays multiple related buttons in a horizontal row
 * with proper spacing and accessibility structure.
 */
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ children, 'aria-label': ariaLabel, UNSAFE_className, UNSAFE_style, ...props }, ref) => {
    const className = [styles.buttonGroup, UNSAFE_className]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={className}
        style={UNSAFE_style}
        role="group"
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';
