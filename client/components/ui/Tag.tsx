import * as React from 'react';
import { cn } from '@/lib/utils';
import styles from './Tag.module.css';

export type TagVariant = 'primary' | 'secondary' | 'tertiary';

export type TagColor =
  | 'brand'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'info'
  | 'edited'
  | 'blue'
  | 'spark'
  | 'green'
  | 'red'
  | 'purple'
  | 'gray'
  | 'cyan'
  | 'orange'
  | 'pink'
  | 'yellow'
  | 'teal';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  color?: TagColor;
  leading?: React.ReactNode;
  children: React.ReactNode;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className,
      variant = 'secondary',
      color = 'brand',
      leading,
      children,
      ...props
    },
    ref
  ) => {
    const variantClass = styles[`tag${variant.charAt(0).toUpperCase() + variant.slice(1)}`];
    const colorClass = styles[`color${color.charAt(0).toUpperCase() + color.slice(1)}`];

    return (
      <span
        ref={ref}
        className={cn(styles.tag, variantClass, colorClass, className)}
        {...props}
      >
        {leading && <span className={styles.leading}>{leading}</span>}
        <span className={styles.label}>{children}</span>
      </span>
    );
  }
);

Tag.displayName = 'Tag';

export { Tag };
