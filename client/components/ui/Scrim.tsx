import * as React from 'react';
import styles from './Scrim.module.css';

export type ScrimVariant = 'default' | 'inverse';

export interface ScrimProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * Visual variant of the scrim
   * @default 'default'
   */
  variant?: ScrimVariant;
  
  /**
   * Whether the scrim is visible/open
   * @default true
   */
  isOpen?: boolean;
  
  /**
   * Whether the scrim is in a closing animation state
   * @default false
   */
  isClosing?: boolean;
}

/**
 * Scrim
 * 
 * A semi-transparent backdrop component that provides a visual scrim layer for overlay components.
 * Scrim creates a darkened background that helps focus user attention on overlay content 
 * (such as Modals, Panels, and Bottom Sheets) while blocking interaction with the underlying page content.
 * 
 * @example
 * ```tsx
 * <Scrim onClick={handleClose} />
 * ```
 * 
 * @example
 * ```tsx
 * <Scrim variant="inverse" isOpen={isOpen} isClosing={isClosing} />
 * ```
 */
export const Scrim = React.forwardRef<HTMLDivElement, ScrimProps>(
  ({ 
    variant = 'default', 
    isOpen = true, 
    isClosing = false, 
    className, 
    ...props 
  }, ref) => {
    const variantClass = variant === 'inverse' ? styles['scrim--inverse'] : '';
    const openClass = isOpen ? styles['scrim--open'] : '';
    const closingClass = isClosing ? styles['scrim--closing'] : '';
    
    return (
      <div
        ref={ref}
        className={`${styles.scrim} ${variantClass} ${openClass} ${closingClass} ${className || ''}`}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Scrim.displayName = 'Scrim';
