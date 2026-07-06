import * as React from 'react';
import { CardSizeContext } from './Card';
import { Heading } from './Heading';
import styles from './CardHeader.module.css';

interface CardHeaderProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style' | 'title'> {
  /**
   * The leading icon for the card header.
   */
  leadingIcon?: React.ReactNode;
  
  /**
   * The title for the card header.
   */
  title: React.ReactNode;
  
  /**
   * The trailing content for the card header.
   */
  trailing?: React.ReactNode;
  
  /**
   * Additional CSS classes (escape hatch)
   */
  UNSAFE_className?: string;
  
  /**
   * Custom inline styles (escape hatch)
   */
  UNSAFE_style?: React.CSSProperties;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ leadingIcon, title, trailing, UNSAFE_className, UNSAFE_style, ...props }, ref) => {
    const size = React.useContext(CardSizeContext);

    const className = [
      styles.cardHeader,
      styles[`cardHeader--size-${size}`],
      UNSAFE_className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={className} style={UNSAFE_style} {...props}>
        {leadingIcon && (
          <div className={styles.cardHeader__leadingIcon}>
            {leadingIcon}
          </div>
        )}
        <div className={styles.cardHeader__title}>
          <Heading as="h3" size={size === 'large' ? 'medium' : 'small'} weight="default">
            {title}
          </Heading>
        </div>
        {trailing && (
          <div className={styles.cardHeader__trailing}>
            {trailing}
          </div>
        )}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';
