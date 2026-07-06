import React from 'react';
import styles from './Skeleton.module.css';
import { cn } from '@/lib/utils';

interface CommonProps {
  'aria-label'?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export interface SkeletonProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'>,
    CommonProps {
  /**
   * The height of the skeleton.
   * If a number is provided, it will be converted to pixels.
   * If a string is provided, it will be used as-is.
   */
  height?: number | string;
  
  /**
   * Indicates if this skeleton represents AI-generated content with special animation.
   * @default false
   */
  isMagic?: boolean;
  
  /**
   * The shape variant of the skeleton.
   * - rectangle: Uses LD borderradius-50 (4px)
   * - rounded: Uses LD borderradius-round (9999px/pill shape)
   * @default 'rectangle'
   */
  variant?: 'rectangle' | 'rounded';
  
  /**
   * The width of the skeleton.
   * If a number is provided, it will be converted to pixels.
   * If a string is provided, it will be used as-is.
   */
  width?: number | string;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      'aria-label': ariaLabel = 'Loading...',
      height,
      isMagic = false,
      variant = 'rectangle',
      width,
      UNSAFE_className,
      UNSAFE_style,
      ...props
    },
    ref
  ) => {
    const inlineStyle: React.CSSProperties = {
      ...UNSAFE_style,
      ...(height !== undefined && {
        height: typeof height === 'number' ? `${height}px` : height,
      }),
      ...(width !== undefined && {
        width: typeof width === 'number' ? `${width}px` : width,
      }),
    };

    return (
      <div
        ref={ref}
        className={cn(
          styles.skeleton,
          {
            [styles.rectangle]: variant === 'rectangle',
            [styles.rounded]: variant === 'rounded',
            [styles.magic]: isMagic,
          },
          UNSAFE_className
        )}
        style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}
        aria-label={ariaLabel}
        aria-busy="true"
        role="status"
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';
