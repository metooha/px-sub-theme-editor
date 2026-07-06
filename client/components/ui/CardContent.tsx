import * as React from 'react';
import { CardSizeContext } from './Card';
import styles from './CardContent.module.css';

interface CardContentProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  /**
   * The content for the card content - can be any valid React content.
   */
  children: React.ReactNode;
  
  /**
   * Additional CSS classes (escape hatch)
   */
  UNSAFE_className?: string;
  
  /**
   * Custom inline styles (escape hatch)
   */
  UNSAFE_style?: React.CSSProperties;
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, UNSAFE_className, UNSAFE_style, ...props }, ref) => {
    const size = React.useContext(CardSizeContext);

    const className = [
      styles.cardContent,
      styles[`cardContent--size-${size}`],
      UNSAFE_className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={className} style={UNSAFE_style} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';
