import React from 'react';
import styles from './SideNavigation.module.css';

/**
 * Props for SideNavigation container component
 */
export interface SideNavigationProps extends Omit<React.ComponentPropsWithoutRef<'nav'>, 'className' | 'style'> {
  /**
   * The navigation items (should be SideNavigationItem components)
   */
  children: React.ReactNode;
  
  /**
   * ARIA label for the navigation
   */
  'aria-label'?: string;
}

/**
 * Props for SideNavigationItem component
 */
export interface SideNavigationItemProps {
  /**
   * The content/label for the navigation item
   */
  children: React.ReactNode;

  /**
   * Render as an anchor ('a') or button ('button').
   * Use 'button' when there is no URL (e.g., filter lists, panels).
   * Defaults to 'a'.
   */
  as?: 'a' | 'button';

  /**
   * The URL to navigate to. Required when as='a' (the default).
   */
  href?: string;

  /**
   * Whether this item represents the current page / selected option.
   * Adds aria-current="page" for anchors, aria-pressed for buttons.
   * @default false
   */
  isCurrent?: boolean;

  /**
   * Leading content (typically an icon)
   */
  leading?: React.ReactNode;

  /**
   * Click handler for the item
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;

  /**
   * Whether the item is disabled (only applies when as='button')
   */
  disabled?: boolean;

  /**
   * Link target (e.g., "_blank" for external links). Only applies when as='a'.
   */
  target?: string;

  /**
   * Relationship to the linked resource. Only applies when as='a'.
   */
  rel?: string;
}

/**
 * SideNavigation - A vertical page navigation component for Living Design 3.5
 * 
 * Used for primary navigation in multi-page apps and dashboards. Items are 
 * grouped together based on related content or categories.
 * 
 * @example
 * ```tsx
 * <SideNavigation aria-label="Main navigation">
 *   <SideNavigationItem href="/home" isCurrent>
 *     Home
 *   </SideNavigationItem>
 *   <SideNavigationItem href="/campaigns">
 *     Campaigns
 *   </SideNavigationItem>
 * </SideNavigation>
 * ```
 */
export const SideNavigation = React.forwardRef<HTMLElement, SideNavigationProps>(
  ({ children, 'aria-label': ariaLabel, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        {...props}
      >
        <ul className={styles.sideNavigation}>
          {React.Children.map(children, (child, index) => (
            <li key={index}>
              {child}
            </li>
          ))}
        </ul>
      </nav>
    );
  }
);

SideNavigation.displayName = 'SideNavigation';

/**
 * SideNavigationItem - An individual navigation link within a SideNavigation
 * 
 * Renders as an anchor element with proper interactive states (hover, focus, pressed, current).
 * Use the `isCurrent` prop to indicate the currently active page.
 * 
 * The current item displays a 4px blue indicator bar on the left side.
 * 
 * @example
 * ```tsx
 * <SideNavigationItem 
 *   href="/campaigns" 
 *   isCurrent
 *   leading={<CampaignIcon />}
 * >
 *   Campaigns
 * </SideNavigationItem>
 * ```
 */
export const SideNavigationItem = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  SideNavigationItemProps
>(
  ({ children, as = 'a', href, isCurrent = false, leading, onClick, disabled, target, rel, ...props }, ref) => {
    const className = [
      styles.sideNavigationItem,
      isCurrent && styles['sideNavigationItem--current'],
    ]
      .filter(Boolean)
      .join(' ');

    const sharedProps = {
      className,
      onClick: onClick as React.MouseEventHandler<any>,
      ...props,
    };

    const content = (
      <>
        {leading && (
          <span className={styles.sideNavigationItem__leading}>
            {leading}
          </span>
        )}
        <span className={styles.sideNavigationItem__content}>
          {children}
        </span>
      </>
    );

    if (as === 'button') {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          disabled={disabled}
          aria-pressed={isCurrent ? true : undefined}
          {...sharedProps}
        >
          {content}
        </button>
      );
    }

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        aria-current={isCurrent ? 'page' : undefined}
        target={target}
        rel={rel}
        {...sharedProps}
      >
        {content}
      </a>
    );
  }
);

SideNavigationItem.displayName = 'SideNavigationItem';
