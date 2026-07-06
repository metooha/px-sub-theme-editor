import * as React from 'react';
import styles from './Heading.module.css';

type HeadingElement = 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';

type HeadingColor = 
  | 'default'
  | 'brand'
  | 'subtle'
  | 'negative'
  | 'positive'
  | 'warning'
  | 'inverse';

interface HeadingProps<T extends HeadingElement = 'span'> {
  as?: T;
  color?: HeadingColor;
  size?: 'large' | 'medium' | 'small';
  weight?: 'default' | 'alt';
  children: React.ReactNode;
  'aria-label'?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export const Heading = <T extends HeadingElement = 'span'>({
  as,
  color = 'default',
  size = 'medium',
  weight = 'default',
  children,
  'aria-label': ariaLabel,
  UNSAFE_className,
  UNSAFE_style,
  ...props
}: HeadingProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof HeadingProps<T>>) => {
  const Component = (as || 'span') as React.ElementType;

  const className = [
    styles.heading,
    styles[`heading--size-${size}`],
    styles[`heading--weight-${weight}`],
    styles[`heading--color-${color}`],
    UNSAFE_className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component
      className={className}
      style={UNSAFE_style}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </Component>
  );
};

Heading.displayName = 'Heading';
