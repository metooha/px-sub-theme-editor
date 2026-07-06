import React from 'react';
import { Skeleton, SkeletonProps } from './Skeleton';
import styles from './SkeletonText.module.css';
import { cn } from '@/lib/utils';

interface CommonProps {
  'aria-label'?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export interface SkeletonTextProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'>,
    CommonProps {
  /**
   * Indicates if this skeleton represents AI-generated content with special animation.
   * This prop is passed to all child Skeleton components.
   * @default false
   */
  isMagic?: boolean;
  
  /**
   * Number of skeleton lines to render.
   * @default 3
   */
  lines?: number;
  
  /**
   * The shape variant of the skeleton lines.
   * - rectangle: Uses LD borderradius-50 (4px)
   * - rounded: Uses LD borderradius-round (9999px/pill shape)
   * @default 'rectangle'
   */
  variant?: SkeletonProps['variant'];
}

export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  (
    {
      'aria-label': ariaLabel = 'Loading text...',
      isMagic = false,
      lines = 3,
      variant = 'rectangle',
      UNSAFE_className,
      UNSAFE_style,
      ...props
    },
    ref
  ) => {
    // Generate array of line widths - last line is shorter for natural text appearance
    const lineWidths = Array.from({ length: lines }, (_, index) => {
      if (index === lines - 1 && lines > 1) {
        // Last line: 60-90% width for natural text appearance
        const randomWidth = 60 + Math.floor(Math.random() * 31); // 60-90
        return `${randomWidth}%`;
      }
      return '100%';
    });

    return (
      <div
        ref={ref}
        className={cn(styles.skeletonText, UNSAFE_className)}
        style={UNSAFE_style}
        aria-label={ariaLabel}
        aria-busy="true"
        role="status"
        {...props}
      >
        {lineWidths.map((width, index) => (
          <Skeleton
            key={index}
            isMagic={isMagic}
            variant={variant}
            width={width}
            height={16}
            UNSAFE_style={{
              animationDelay: isMagic ? `${index * 200}ms` : undefined,
            }}
          />
        ))}
      </div>
    );
  }
);

SkeletonText.displayName = 'SkeletonText';
