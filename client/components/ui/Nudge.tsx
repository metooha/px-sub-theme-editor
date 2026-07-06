import * as React from 'react';
import { X } from '@/components/icons';
import { IconButton } from '@/components/ui/IconButton';
import { cn } from '@/lib/utils';
import styles from './Nudge.module.css';

export interface NudgeProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style' | 'title'> {
  /**
   * The title for the nudge.
   */
  title: React.ReactNode;
  
  /**
   * The content for the nudge.
   */
  children?: React.ReactNode;
  
  /**
   * The leading content for the nudge (typically a SpotIcon component).
   */
  leading?: React.ReactNode;
  
  /**
   * The callback fired when the nudge requests to close.
   */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /**
   * The actions for the nudge (buttons, links, ButtonGroup, etc).
   */
  actions?: React.ReactNode;
  
  /**
   * The props spread to the nudge's close button.
   */
  closeButtonProps?: React.ComponentPropsWithoutRef<'button'>;
  
  /**
   * Unsafe override for className. Use sparingly.
   */
  UNSAFE_className?: string;
  
  /**
   * Unsafe override for style. Use sparingly.
   */
  UNSAFE_style?: React.CSSProperties;
}

/**
 * Nudge component for Living Design 3.5
 * 
 * Nudges provide in-context guidance, tips, or prompts for user action.
 * They use the surface-brand background color and can include a leading SpotIcon,
 * title, content, actions, and an optional close button.
 * 
 * @example
 * ```tsx
 * <Nudge
 *   title="Try our new feature"
 *   leading={<SpotIcon icon={<Star />} size="small" color="brand" />}
 *   actions={<Button variant="primary">Get started</Button>}
 *   onClose={() => handleDismiss()}
 * >
 *   Discover powerful new tools to help you work faster.
 * </Nudge>
 * ```
 */
export const Nudge = React.forwardRef<HTMLDivElement, NudgeProps>(
  (
    {
      title,
      children,
      leading,
      onClose,
      actions,
      closeButtonProps,
      UNSAFE_className,
      UNSAFE_style,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(styles.nudge, UNSAFE_className)}
        style={UNSAFE_style}
        {...rest}
      >
        {/* Leading Section (Spot Icon) */}
        {leading && <div className={styles.leading}>{leading}</div>}

        {/* Contents Section: Title + Content + Actions */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.title}>{title}</div>
          </div>
          
          {/* Content */}
          {children && <div className={styles.content}>{children}</div>}

          {/* Actions */}
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>

        {/* Close Button */}
        {onClose && (
          <IconButton
            variant="ghost"
            size="medium"
            shape="rounded"
            onClick={onClose}
            aria-label="Close"
            UNSAFE_className={styles.closeButton}
            {...closeButtonProps}
          >
            <X />
          </IconButton>
        )}
      </div>
    );
  }
);

Nudge.displayName = 'Nudge';
