import * as React from 'react';
import { createPortal } from 'react-dom';
import { IconButton } from './IconButton';
import { Divider } from './Divider';
import { Scrim } from './Scrim';
import * as Icons from '@/components/icons';
import styles from './Panel.module.css';

export interface PanelProps {
  /**
   * Controls whether the panel is open or closed
   */
  isOpen: boolean;

  /**
   * Callback when the panel should close
   */
  onClose: () => void;

  /**
   * The title displayed in the panel header
   */
  title: string | React.ReactNode;

  /**
   * The main content of the panel
   */
  children: React.ReactNode;

  /**
   * The size of the panel (determines width on desktop)
   * - small: 320px
   * - medium: 420px (default)
   * - large: 600px
   * Mobile (<900px): viewport width - 24px regardless of size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Position of the panel slide-in
   * @default 'right'
   */
  position?: 'left' | 'right';

  /**
   * Optional actions/buttons to display in footer
   * If undefined, the actions section won't be rendered
   */
  actions?: React.ReactNode;

  /**
   * Whether pressing Escape key closes the panel
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Whether clicking the scrim/overlay closes the panel
   * @default true
   */
  closeOnScrimClick?: boolean;

  /**
   * Optional className for the panel container
   */
  className?: string;

  /**
   * Accessible label for the panel (for screen readers)
   */
  ariaLabel?: string;

  /**
   * Accessible label for the close button
   * @default 'Close panel'
   */
  closeButtonAriaLabel?: string;

  /**
   * Callback fired after the panel exit animation completes
   */
  onClosed?: () => void;
}

/**
 * Panel component for Living Design 3.5
 * 
 * A slide-out panel component that can be positioned on the left or right side
 * of the viewport. Supports three size variants and includes header, scrollable
 * content area, and optional footer actions.
 * 
 * @example
 * ```tsx
 * <Panel
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Settings"
 *   size="medium"
 *   position="right"
 *   actions={
 *     <ButtonGroup>
 *       <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
 *       <Button variant="primary" onClick={handleSave}>Save</Button>
 *     </ButtonGroup>
 *   }
 * >
 *   <p>Panel content goes here...</p>
 * </Panel>
 * ```
 */
export const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  (
    {
      isOpen,
      onClose,
      title,
      children,
      size = 'medium',
      position = 'right',
      actions,
      closeOnEscape = true,
      closeOnScrimClick = true,
      className,
      ariaLabel,
      closeButtonAriaLabel = 'Close panel',
      onClosed,
    },
    ref
  ) => {
    const [isAnimating, setIsAnimating] = React.useState(false);
    const panelRef = React.useRef<HTMLDivElement>(null);
    const previousFocusRef = React.useRef<HTMLElement | null>(null);

    // Combine refs
    React.useImperativeHandle(ref, () => panelRef.current!);

    // Handle escape key
    React.useEffect(() => {
      if (!isOpen || !closeOnEscape) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, closeOnEscape, onClose]);

    // Handle body scroll lock
    React.useEffect(() => {
      if (isOpen) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      } else {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }

      return () => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      };
    }, [isOpen]);

    // Handle focus management
    React.useEffect(() => {
      if (isOpen) {
        // Store the currently focused element
        previousFocusRef.current = document.activeElement as HTMLElement;

        // Focus the panel after a short delay to allow animation
        setTimeout(() => {
          if (panelRef.current) {
            const firstFocusable = panelRef.current.querySelector<HTMLElement>(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            firstFocusable?.focus();
          }
        }, 100);
      } else {
        // Restore focus when panel closes
        if (previousFocusRef.current && document.body.contains(previousFocusRef.current)) {
          previousFocusRef.current.focus();
        }
      }
    }, [isOpen]);

    // Handle animation state
    React.useEffect(() => {
      if (isOpen) {
        setIsAnimating(true);
      } else if (isAnimating) {
        // Wait for exit animation to complete
        const timer = setTimeout(() => {
          setIsAnimating(false);
          onClosed?.();
        }, 300); // Match CSS transition duration
        return () => clearTimeout(timer);
      }
    }, [isOpen, isAnimating, onClosed]);

    // Trap focus within panel
    React.useEffect(() => {
      if (!isOpen) return;

      const handleTab = (event: KeyboardEvent) => {
        if (event.key !== 'Tab' || !panelRef.current) return;

        const focusableElements = panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
        );

        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstFocusable) {
            event.preventDefault();
            lastFocusable?.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            event.preventDefault();
            firstFocusable?.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTab);
      return () => document.removeEventListener('keydown', handleTab);
    }, [isOpen]);

    // Don't render anything if not open and not animating
    if (!isOpen && !isAnimating) return null;

    const handleScrimClick = () => {
      if (closeOnScrimClick) {
        onClose();
      }
    };

    const sizeClass = styles[`panel--size-${size}`];
    const positionClass = styles[`panel--position-${position}`];
    const stateClass = isOpen ? styles['panel--open'] : styles['panel--closing'];

    const panelContent = (
      <>
        {/* Scrim */}
        <Scrim
          isOpen={isOpen}
          isClosing={!isOpen}
          onClick={handleScrimClick}
        />

        {/* Panel */}
        <div
          ref={panelRef}
          className={`${styles.panel} ${sizeClass} ${positionClass} ${stateClass} ${className || ''}`}
          role="dialog"
          aria-modal="true"
          aria-label={typeof title === 'string' ? title : ariaLabel}
        >
          {/* Header */}
          <div className={styles.panel__header}>
            <div className={styles.panel__titleContainer}>
              {typeof title === 'string' ? (
                <h2 className={styles.panel__title}>{title}</h2>
              ) : (
                title
              )}
            </div>
            <IconButton
              aria-label={closeButtonAriaLabel}
              variant="ghost"
              size="medium"
              shape="rounded"
              onClick={onClose}
              UNSAFE_className={styles.panel__closeButton}
            >
              <Icons.X style={{ width: 20, height: 20 }} />
            </IconButton>
          </div>

          <Divider />

          {/* Content */}
          <div className={styles.panel__content}>
            {children}
          </div>

          {/* Actions (optional) */}
          {actions && (
            <>
              <Divider />
              <div className={styles.panel__actions}>
                {actions}
              </div>
            </>
          )}
        </div>
      </>
    );

    return createPortal(panelContent, document.body);
  }
);

Panel.displayName = 'Panel';
