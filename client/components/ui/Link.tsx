import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styles from './Link.module.css';

export type LinkVariant = 'default' | 'subtle' | 'white';

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> {
  /**
   * The URL that the link points to
   */
  href: string;

  /**
   * Visual variant of the link
   * - 'default': Dark text color with underline
   * - 'subtle': Subtle gray text color with underline
   * - 'white': White text color for dark backgrounds
   * @default 'default'
   */
  variant?: LinkVariant;
  
  /**
   * Whether to show underline
   * @default true
   */
  underline?: boolean;
  
  /**
   * Children content
   */
  children: React.ReactNode;
  
  /**
   * Whether to use React Router for internal navigation
   * Set to true for internal app links (/page), false for external links (https://...)
   * @default Auto-detected based on href
   */
  internal?: boolean;
}

/**
 * Link Component - Living Design 3.5
 * 
 * Links are navigational elements. They take users to a different page/screen,
 * a different site, or a location within the same page.
 * 
 * @example
 * ```tsx
 * // Internal navigation
 * <Link href="/account">Account settings</Link>
 * 
 * // External navigation
 * <Link href="https://example.com" target="_blank" rel="noreferrer noopener">
 *   View documentation
 * </Link>
 * 
 * // In-page anchor
 * <Link href="#billing">Jump to billing</Link>
 * 
 * // Subtle variant
 * <Link href="/help" variant="subtle">Help</Link>
 * 
 * // Without underline
 * <Link href="/dashboard" underline={false}>Dashboard</Link>
 * ```
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      variant = 'default',
      underline = true,
      children,
      className,
      internal,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    // Auto-detect if link is internal based on href
    const isInternal =
      internal !== undefined
        ? internal
        : href.startsWith('/') || href.startsWith('#');

    // Auto-add security attributes for external links opening in new tab
    const safeRel =
      target === '_blank' && !rel
        ? 'noreferrer noopener'
        : rel;

    const linkClasses = [
      styles.link,
      styles[`link--variant-${variant}`],
      underline ? styles['link--underlined'] : styles['link--no-underline'],
      className
    ].filter(Boolean).join(' ');

    // Use React Router Link for internal navigation
    if (isInternal && !target) {
      return (
        <RouterLink
          ref={ref as React.Ref<HTMLAnchorElement>}
          to={href}
          className={linkClasses}
          {...props}
        >
          {children}
        </RouterLink>
      );
    }

    // Use standard anchor for external links or links with target
    return (
      <a
        ref={ref}
        href={href}
        className={linkClasses}
        target={target}
        rel={safeRel}
        {...props}
      >
        {children}
      </a>
    );
  }
);

Link.displayName = 'Link';
