import * as React from 'react';
import styles from './LinkButton.module.css';

export type LinkButtonColor = 'default' | 'subtle' | 'white';
export type LinkButtonSize = 'large' | 'medium' | 'small';
export type LinkButtonType = 'button' | 'reset' | 'submit';

interface LinkButtonBaseProps {
  /**
   * The content for the link button.
   */
  children: React.ReactNode;

  /**
   * The color for the link button.
   * @default "default"
   */
  color?: LinkButtonColor;

  /**
   * If the link button is displayed at full width.
   * @default false
   */
  isFullWidth?: boolean;

  /**
   * The leading icon for the link button.
   */
  leading?: React.ReactNode;

  /**
   * The size for the link button.
   * @default "small"
   */
  size?: LinkButtonSize;

  /**
   * The trailing icon for the link button.
   */
  trailing?: React.ReactNode;

  'aria-label'?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

/**
 * Props for LinkButton when rendered as an anchor element.
 */
export type LinkButtonAnchorProps = LinkButtonBaseProps &
  Omit<React.ComponentPropsWithoutRef<'a'>, 'className' | 'style'> & {
    /**
     * The href for the link button (renders as `<a>`).
     */
    href: string;
  };

/**
 * Props for LinkButton when rendered as a button element.
 */
export type LinkButtonButtonProps = LinkButtonBaseProps &
  Omit<React.ComponentPropsWithoutRef<'button'>, 'className' | 'style'> & {
    /**
     * If the link button is disabled.
     * @default false
     */
    disabled?: boolean;

    /**
     * The type for the link button.
     * @default "button"
     */
    type?: LinkButtonType;
  };

export type LinkButtonProps = LinkButtonAnchorProps | LinkButtonButtonProps;

/**
 * Type guard to check if props include href (anchor behaviour).
 */
function isAnchorProps(props: LinkButtonProps): props is LinkButtonAnchorProps {
  return 'href' in props;
}

/**
 * LinkButton – Living Design 3.5
 *
 * A polymorphic interactive element that provides link-styled text with
 * button-like features (icons, sizes) but NO pill shape or background.
 * Renders as `<a>` when `href` is provided, `<button>` otherwise.
 */
export const LinkButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  LinkButtonProps
>((props, ref) => {
  const {
    children,
    color = 'default',
    isFullWidth = false,
    leading,
    size = 'small',
    trailing,
    'aria-label': ariaLabel,
    UNSAFE_className,
    UNSAFE_style,
    ...restProps
  } = props;

  const isDisabled = !isAnchorProps(props) && (props as LinkButtonButtonProps).disabled;

  const className = [
    styles.linkButton,
    styles[`linkButton--color-${color}`],
    styles[`linkButton--size-${size}`],
    isFullWidth && styles['linkButton--fullWidth'],
    isDisabled && styles['linkButton--disabled'],
    UNSAFE_className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {leading && <span className={styles.linkButton__leading}>{leading}</span>}
      <span className={styles.linkButton__content}>{children}</span>
      {trailing && <span className={styles.linkButton__trailing}>{trailing}</span>}
    </>
  );

  // Render as anchor when href is provided
  if (isAnchorProps(props)) {
    const { href, ...anchorRest } = restProps as Omit<
      LinkButtonAnchorProps,
      keyof LinkButtonBaseProps
    >;

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={className}
        style={UNSAFE_style}
        aria-label={ariaLabel}
        {...anchorRest}
      >
        {content}
      </a>
    );
  }

  // Render as button
  const {
    disabled = false,
    type = 'button',
    ...buttonRest
  } = restProps as Omit<LinkButtonButtonProps, keyof LinkButtonBaseProps>;

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      className={className}
      style={UNSAFE_style}
      aria-label={ariaLabel}
      {...buttonRest}
    >
      {content}
    </button>
  );
});

LinkButton.displayName = 'LinkButton';
