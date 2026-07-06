import * as React from 'react';
import styles from './IconButton.module.css';
import { cva, type VariantProps } from 'class-variance-authority';

export type IconButtonSize = 'small' | 'medium' | 'large';
export type IconButtonType = 'button' | 'reset' | 'submit';
export type IconButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'ghost';
export type IconButtonShape = 'square' | 'rounded';

interface CommonProps {
  'aria-label': string; // Required for accessibility
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

interface IconButtonBaseProps extends CommonProps {
  /**
   * The icon content for the button.
   */
  children: React.ReactNode;

  /**
   * The size for the icon button.
   * @default "medium"
   */
  size?: IconButtonSize;

  /**
   * The variant for the icon button.
   * @default "ghost"
   */
  variant?: IconButtonVariant;

  /**
   * The shape for the icon button.
   * @default "rounded"
   */
  shape?: IconButtonShape;
}

/**
 * Props for IconButton when rendered as an anchor element
 */
export type IconButtonAnchorProps = IconButtonBaseProps &
  Omit<React.ComponentPropsWithoutRef<'a'>, 'className' | 'style'> & {
    /**
     * The href for the icon button (makes it render as an anchor).
     */
    href: string;
  };

/**
 * Props for IconButton when rendered as a button element
 */
export type IconButtonButtonProps = IconButtonBaseProps &
  Omit<React.ComponentPropsWithoutRef<'button'>, 'className' | 'style'> & {
    /**
     * If the icon button is disabled.
     * @default false
     */
    disabled?: boolean;
    
    /**
     * The type for the button.
     * @default "button"
     */
    type?: IconButtonType;
  };

export type IconButtonProps = IconButtonAnchorProps | IconButtonButtonProps;

/**
 * Type guard to check if props include href (anchor behavior)
 */
function isAnchorProps(props: IconButtonProps): props is IconButtonAnchorProps {
  return 'href' in props;
}

/**
 * Icon Button component for Living Design 3.5
 * 
 * A square icon-only button component that can render as either an HTML button or anchor element,
 * featuring multiple variants (primary, secondary, tertiary, destructive, ghost) and sizes.
 * 
 * @example
 * ```tsx
 * <IconButton aria-label="Close dialog" variant="ghost" size="medium">
 *   <CloseIcon />
 * </IconButton>
 * ```
 */
export const IconButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  IconButtonProps
>((props, ref) => {
  const {
    children,
    size = 'medium',
    variant = 'ghost',
    shape = 'rounded',
    'aria-label': ariaLabel,
    UNSAFE_className,
    UNSAFE_style,
    ...restProps
  } = props;

  const className = [
    styles.iconButton,
    styles[`iconButton--size-${size}`],
    styles[`iconButton--variant-${variant}`],
    styles[`iconButton--shape-${shape}`],
    UNSAFE_className,
  ]
    .filter(Boolean)
    .join(' ');

  const commonProps = {
    className,
    style: UNSAFE_style,
    'aria-label': ariaLabel,
  };

  if (isAnchorProps(props)) {
    const { href, ...anchorRestProps } = restProps as Omit<
      IconButtonAnchorProps,
      keyof IconButtonBaseProps
    >;

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        {...commonProps}
        {...anchorRestProps}
      >
        <span className={styles.iconButton__icon}>{children}</span>
      </a>
    );
  }

  const {
    disabled = false,
    type = 'button',
    ...buttonRestProps
  } = restProps as Omit<IconButtonButtonProps, keyof IconButtonBaseProps>;

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      {...commonProps}
      {...buttonRestProps}
    >
      <span className={styles.iconButton__icon}>{children}</span>
    </button>
  );
});

IconButton.displayName = 'IconButton';

// Export variant props type for external use
export type IconButtonVariantProps = VariantProps<typeof iconButtonVariants>;

// CVA variant configuration (for potential future use with Tailwind)
const iconButtonVariants = cva('', {
  variants: {
    size: {
      small: '',
      medium: '',
      large: '',
    },
    variant: {
      primary: '',
      secondary: '',
      tertiary: '',
      destructive: '',
      ghost: '',
    },
    shape: {
      square: '',
      rounded: '',
    },
  },
  defaultVariants: {
    size: 'medium',
    variant: 'ghost',
    shape: 'rounded',
  },
});
