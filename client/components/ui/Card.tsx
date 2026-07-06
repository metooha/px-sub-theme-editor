import * as React from 'react';
import styles from './Card.module.css';

export type CardSize = 'large' | 'small';
export const CardSizeContext = React.createContext<CardSize>('small');

interface CardProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  /**
   * The content for the card - typically a composition of CardContent, CardHeader, CardMedia, and CardActions.
   */
  children: React.ReactNode;
  
  /**
   * The size for the card, which propagates to all sub-components via context.
   * @default "small"
   */
  size?: CardSize;
  
  /**
   * Additional CSS classes (escape hatch)
   */
  UNSAFE_className?: string;
  
  /**
   * Custom inline styles (escape hatch)
   */
  UNSAFE_style?: React.CSSProperties;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, size = 'small', UNSAFE_className, UNSAFE_style, ...props }, ref) => {
    const className = [
      styles.card,
      styles[`card--size-${size}`],
      UNSAFE_className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <CardSizeContext.Provider value={size}>
        <div ref={ref} className={className} style={UNSAFE_style} {...props}>
          {children}
        </div>
      </CardSizeContext.Provider>
    );
  }
);

Card.displayName = 'Card';
