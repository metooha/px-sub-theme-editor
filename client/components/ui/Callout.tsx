import * as React from 'react';
import styles from './Callout.module.css';

export type CalloutPosition =
  | 'bottomCenter'
  | 'bottomLeft'
  | 'bottomRight'
  | 'topCenter'
  | 'topLeft'
  | 'topRight'
  | 'left'
  | 'right';

export interface CalloutProps {
  /** The content displayed inside the callout. */
  children: React.ReactNode;
  /** Position of the nubbin (arrow pointer). @default 'bottomCenter' */
  position?: CalloutPosition;
  /** Whether the close button is shown. @default true */
  closable?: boolean;
  /** Callback fired when the close button is activated. */
  onClose?: () => void;
  /** Accessible description of the callout content. */
  a11yContentLabel?: string;
  /** Additional CSS class name. */
  UNSAFE_className?: string;
  /** Additional inline styles. */
  UNSAFE_style?: React.CSSProperties;
}

/**
 * Callout component for Living Design 3.5
 *
 * Displays system-generated coaching/onboarding guidance anchored to a
 * specific UI element. The nubbin (pointer) indicates which element the
 * callout refers to.
 *
 * @example
 * ```tsx
 * <Callout position="topRight" onClose={() => setOpen(false)}>
 *   Create a project to organize your work.
 * </Callout>
 * ```
 */
export const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  (
    {
      children,
      position = 'bottomCenter',
      closable = true,
      onClose,
      a11yContentLabel,
      UNSAFE_className,
      UNSAFE_style,
    },
    ref,
  ) => {
    const className = [
      styles.callout,
      styles[`callout--${position}`],
      UNSAFE_className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={className}
        style={UNSAFE_style}
        role="status"
        aria-live="polite"
        aria-label={a11yContentLabel}
      >
        {/* Nubbin / arrow */}
        <span className={styles.callout__nubbin} aria-hidden="true" />

        <div className={styles.callout__body}>
          <div className={styles.callout__text}>{children}</div>
          {closable && (
            <button
              type="button"
              className={styles.callout__close}
              onClick={onClose}
              aria-label="Close callout"
            >
              Close
            </button>
          )}
        </div>
      </div>
    );
  },
);

Callout.displayName = 'Callout';
