import * as React from 'react';
import styles from './MagicBox.module.css';

export type MagicBoxState = 'idle' | 'loading' | 'active';

export interface MagicBoxProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  /**
   * Whether the magic effect is active.
   * When false, the component renders children without the glow effect.
   * @default false
   */
  active?: boolean;
  
  /**
   * The content to wrap with the magic effect.
   */
  children?: React.ReactNode;
  
  /**
   * The animation state of the magic effect.
   * - 'idle': Static subtle glow
   * - 'loading': Pulsing animation (AI processing)
   * - 'active': Subtle shimmer (AI enhancement active)
   * @default 'loading'
   */
  state?: MagicBoxState;
  
  /**
   * Escape hatch for custom CSS class names.
   * @deprecated Use sparingly. Prefer component props for styling.
   */
  UNSAFE_className?: string;
  
  /**
   * Escape hatch for inline styles.
   * @deprecated Use sparingly. Prefer component props for styling.
   */
  UNSAFE_style?: React.CSSProperties;
}

/**
 * Magic Box component for Living Design 3.5
 * 
 * Highlights AI-generated content being actively processed. Wrapper component with animated 
 * glow effect that responds to theme. The magic glow uses semantic tokens that automatically
 * adapt between default theme (blue gradient) and developer theme (blue-green gradient).
 * 
 * @example
 * ```tsx
 * <MagicBox active={isProcessing} state="loading">
 *   <Card>AI-generated content here</Card>
 * </MagicBox>
 * ```
 */
export const MagicBox = React.forwardRef<HTMLDivElement, MagicBoxProps>(
  (props, ref) => {
    const {
      active = false,
      children,
      state = 'loading',
      UNSAFE_className,
      UNSAFE_style,
      ...restProps
    } = props;

    // If not active, just render children without magic effect
    if (!active) {
      return <>{children}</>;
    }

    const wrapperClassName = [
      styles['magic-box'],
      styles[`magic-box--${state}`],
      UNSAFE_className,
    ]
      .filter(Boolean)
      .join(' ');

    // Border radius value
    const borderRadius = 16;

    // Unique ID per instance to prevent SVG gradient ID collisions
    const instanceId = React.useId();
    const gradientId = (size: string) => `magic-gradient-${size}-${instanceId}`;

    return (
      <div
        ref={ref}
        className={wrapperClassName}
        style={UNSAFE_style}
        data-magic-active={active}
        {...restProps}
      >
        {/* SVG-based layered blur effects for the magic glow */}
        <div className={styles['magic-box__glow-container']} aria-hidden="true">
          {/* Blur S */}
          <svg className={`${styles['magic-box__blur']} ${styles['magic-box__blur--s']}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id={gradientId('s')} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--ld-semantic-color-border-magic-start, #0053E2)" />
                <stop offset="50%" stopColor="var(--ld-semantic-color-border-magic-middle, #3D90EC)" />
                <stop offset="100%" stopColor="var(--ld-semantic-color-border-magic-stop, #79CDF6)" />
              </linearGradient>
            </defs>
            <rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              rx={borderRadius}
              ry={borderRadius}
              fill="none"
              stroke={`url(#${gradientId('s')})`}
              strokeWidth="2"
            />
          </svg>

          {/* Blur M */}
          <svg className={`${styles['magic-box__blur']} ${styles['magic-box__blur--m']}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id={gradientId('m')} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--ld-semantic-color-border-magic-start, #0053E2)" />
                <stop offset="50%" stopColor="var(--ld-semantic-color-border-magic-middle, #3D90EC)" />
                <stop offset="100%" stopColor="var(--ld-semantic-color-border-magic-stop, #79CDF6)" />
              </linearGradient>
            </defs>
            <rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              rx={borderRadius}
              ry={borderRadius}
              fill="none"
              stroke={`url(#${gradientId('m')})`}
              strokeWidth="2"
            />
          </svg>

          {/* Blur L */}
          <svg className={`${styles['magic-box__blur']} ${styles['magic-box__blur--l']}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id={gradientId('l')} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--ld-semantic-color-border-magic-start, #0053E2)" />
                <stop offset="50%" stopColor="var(--ld-semantic-color-border-magic-middle, #3D90EC)" />
                <stop offset="100%" stopColor="var(--ld-semantic-color-border-magic-stop, #79CDF6)" />
              </linearGradient>
            </defs>
            <rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              rx={borderRadius}
              ry={borderRadius}
              fill="none"
              stroke={`url(#${gradientId('l')})`}
              strokeWidth="2"
            />
          </svg>

          {/* Blur XL */}
          <svg className={`${styles['magic-box__blur']} ${styles['magic-box__blur--xl']}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id={gradientId('xl')} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--ld-semantic-color-border-magic-start, #0053E2)" />
                <stop offset="50%" stopColor="var(--ld-semantic-color-border-magic-middle, #3D90EC)" />
                <stop offset="100%" stopColor="var(--ld-semantic-color-border-magic-stop, #79CDF6)" />
              </linearGradient>
            </defs>
            <rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              rx={borderRadius}
              ry={borderRadius}
              fill="none"
              stroke={`url(#${gradientId('xl')})`}
              strokeWidth="2"
            />
          </svg>
        </div>
        
        {/* Content wrapper */}
        <div className={styles['magic-box__content']}>
          {children}
        </div>
      </div>
    );
  }
);

MagicBox.displayName = 'MagicBox';
