import * as React from 'react';
import styles from './Button.module.css';
import { cva, type VariantProps } from 'class-variance-authority';

export type ButtonSize = 'large' | 'medium' | 'small';
export type ButtonType = 'button' | 'reset' | 'submit';
export type ButtonVariant = 'destructive' | 'primary' | 'secondary' | 'tertiary';

interface CommonProps {
  'aria-label'?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

interface ButtonBaseProps extends CommonProps {
  /**
   * The content for the button.
   */
  children: React.ReactNode;

  /**
   * If the button is displayed at full width.
   * @default false
   */
  isFullWidth?: boolean;

  /**
   * If the button is in a loading/progress state.
   * Displays an animated spinner and disables interaction.
   * @default false
   */
  isLoading?: boolean;

  /**
   * The leading content for the button (typically an icon).
   */
  leading?: React.ReactNode;

  /**
   * The size for the button.
   * @default "small"
   */
  size?: ButtonSize;

  /**
   * The trailing content for the button (typically an icon).
   */
  trailing?: React.ReactNode;

  /**
   * The variant for the button.
   * @default "secondary"
   */
  variant?: ButtonVariant;
}

/**
 * Props for Button when rendered as an anchor element
 */
export type ButtonAnchorProps = ButtonBaseProps &
  Omit<React.ComponentPropsWithoutRef<'a'>, 'className' | 'style'> & {
    /**
     * The href for the button (makes it render as an anchor).
     */
    href: string;
  };

/**
 * Props for Button when rendered as a button element
 */
export type ButtonButtonProps = ButtonBaseProps &
  Omit<React.ComponentPropsWithoutRef<'button'>, 'className' | 'style'> & {
    /**
     * If the button is disabled.
     * @default false
     */
    disabled?: boolean;
    
    /**
     * The type for the button.
     * @default "button"
     */
    type?: ButtonType;
  };

export type ButtonProps = ButtonAnchorProps | ButtonButtonProps;

/**
 * Type guard to check if props include href (anchor behavior)
 */
function isAnchorProps(props: ButtonProps): props is ButtonAnchorProps {
  return 'href' in props;
}

/**
 * Button component for Living Design 3.5
 * 
 * A versatile clickable button component that can render as either an HTML button or anchor element,
 * featuring multiple variants (primary, secondary, tertiary, destructive), sizes, and support for
 * leading/trailing content.
 */
/** Spinner sizes per button size (matches LD 3.5 Figma spec) */
const SPINNER_SIZES: Record<ButtonSize, number> = {
  small: 16,
  medium: 24,
  large: 32,
};

/** Inline spinner SVG matching the LD 3.5 Generic Spinner (Walmart variant) */
function ButtonSpinner({ size }: { size: ButtonSize }) {
  const dim = SPINNER_SIZES[size];
  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={styles.button__spinner}
    >
      <path
        d="M30.6666 15.9999C30.6666 18.9007 29.8065 21.7364 28.1949 24.1483C26.5833 26.5602 24.2927 28.4401 21.6127 29.5502C18.9327 30.6602 15.9837 30.9507 13.1387 30.3848C10.2936 29.8189 7.68025 28.422 5.62908 26.3708C3.57791 24.3196 2.18105 21.7063 1.61513 18.8612C1.04921 16.0162 1.33966 13.0672 2.44975 10.3872C3.55983 7.70725 5.4397 5.41663 7.85162 3.80503C10.2635 2.19344 13.0992 1.33325 16 1.33325L16 4.85325C13.7954 4.85325 11.6403 5.50699 9.80722 6.7318C7.97416 7.95662 6.54547 9.69749 5.7018 11.7343C4.85814 13.7711 4.6374 16.0123 5.06749 18.1745C5.49759 20.3368 6.55921 22.3229 8.1181 23.8818C9.67699 25.4407 11.6631 26.5023 13.8254 26.9324C15.9876 27.3625 18.2288 27.1418 20.2656 26.2981C22.3024 25.4544 24.0433 24.0257 25.2681 22.1927C26.4929 20.3596 27.1466 18.2045 27.1466 15.9999H30.6666Z"
        fill="currentColor"
      />
    </svg>
  );
}

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const {
    children,
    isFullWidth = false,
    isLoading = false,
    leading,
    size = 'small',
    trailing,
    variant = 'secondary',
    'aria-label': ariaLabel,
    UNSAFE_className,
    UNSAFE_style,
    ...restProps
  } = props;

  const className = [
    styles.button,
    styles[`button--variant-${variant}`],
    styles[`button--size-${size}`],
    isFullWidth && styles['button--fullWidth'],
    isLoading && styles['button--loading'],
    UNSAFE_className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = isLoading ? (
    <ButtonSpinner size={size} />
  ) : (
    <>
      {leading && <span className={styles.button__leading}>{leading}</span>}
      <span className={styles.button__content}>{children}</span>
      {trailing && <span className={styles.button__trailing}>{trailing}</span>}
    </>
  );

  // Render as anchor if href is provided
  if (isAnchorProps(props)) {
    const { href, ...anchorProps } = restProps as Omit<ButtonAnchorProps, keyof ButtonBaseProps>;

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={className}
        style={UNSAFE_style}
        aria-label={ariaLabel}
        aria-busy={isLoading || undefined}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  // Render as button
  const {
    disabled = false,
    type = 'button',
    ...buttonProps
  } = restProps as Omit<ButtonButtonProps, keyof ButtonBaseProps>;

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled || isLoading}
      className={className}
      style={UNSAFE_style}
      aria-label={ariaLabel}
      aria-busy={isLoading || undefined}
      {...buttonProps}
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';

/**
 * buttonVariants - CVA-based button variants for Shadcn component compatibility
 *
 * @deprecated This is provided only for backward compatibility with Shadcn components
 * (alert-dialog, pagination, calendar) that compose button styles using CVA.
 *
 * For new code, always use the Button component directly with LD 3.5 variants.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-sm",
        primary: "text-white rounded-full text-sm [background:var(--ld-semantic-color-action-fill-primary)] hover:[background:var(--ld-semantic-color-action-fill-primary-hovered)] active:[background:var(--ld-semantic-color-action-fill-primary-pressed)]",
        secondary: "border rounded-full text-sm [border-color:var(--ld-semantic-color-border-strong)] bg-white [color:var(--ld-semantic-color-text-primary)] hover:[background:var(--ld-semantic-color-action-fill-transparent-hovered)] active:[background:var(--ld-semantic-color-action-fill-transparent-pressed)]",
        destructive: "bg-[var(--ld-semantic-color-action-fill-destructive)] text-white hover:bg-[var(--ld-semantic-color-action-fill-destructive-hovered)] rounded-full text-sm",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-md text-sm",
        link: "text-primary underline-offset-4 hover:underline text-sm",
      },
      size: {
        default: "h-10 px-6",
        sm: "h-9 px-4 text-sm",
        lg: "h-11 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
