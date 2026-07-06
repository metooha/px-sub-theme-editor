import * as React from 'react';
import styles from './Breadcrumb.module.css';

/**
 * Props for the Breadcrumb container component
 */
export interface BreadcrumbProps {
  /**
   * The breadcrumb items to display
   */
  children: React.ReactNode;
  
  /**
   * Custom separator element between breadcrumb items
   * @default "/"
   */
  separator?: React.ReactNode;
  
  /**
   * Accessible label for the breadcrumb navigation
   * @default "Breadcrumb"
   */
  'aria-label'?: string;
  
  /**
   * Escape hatch for custom className
   */
  UNSAFE_className?: string;
}

/**
 * Base props for BreadcrumbItem
 */
interface BreadcrumbItemBaseProps {
  /**
   * The text content of the breadcrumb item
   */
  children: React.ReactNode;
  
  /**
   * Whether this item represents the current page
   * @default false
   */
  isCurrent?: boolean;
  
  /**
   * Escape hatch for custom className
   */
  UNSAFE_className?: string;
}

/**
 * Props for BreadcrumbItem when rendered as a link
 */
export type BreadcrumbItemLinkProps = BreadcrumbItemBaseProps & {
  /**
   * The href for the breadcrumb item (makes it render as an anchor)
   */
  href: string;
  onClick?: never;
};

/**
 * Props for BreadcrumbItem when rendered as a button
 */
export type BreadcrumbItemButtonProps = BreadcrumbItemBaseProps & {
  /**
   * Click handler for the breadcrumb item (makes it render as a button)
   */
  onClick: (e: React.MouseEvent) => void;
  href?: never;
};

/**
 * Props for BreadcrumbItem when rendered as plain text (current page)
 */
export type BreadcrumbItemTextProps = BreadcrumbItemBaseProps & {
  isCurrent: true;
  href?: never;
  onClick?: never;
};

export type BreadcrumbItemProps = 
  | BreadcrumbItemLinkProps 
  | BreadcrumbItemButtonProps 
  | BreadcrumbItemTextProps;

/**
 * Breadcrumb component for Living Design 3.5
 * 
 * A navigation aid that shows the user's location within a website hierarchy,
 * featuring multiple levels with clickable links and a current page indicator.
 * 
 * @example
 * ```tsx
 * <Breadcrumb aria-label="Breadcrumb navigation">
 *   <BreadcrumbItem href="/">Home</BreadcrumbItem>
 *   <BreadcrumbItem onClick={() => navigate('/products')}>Products</BreadcrumbItem>
 *   <BreadcrumbItem isCurrent>Product Details</BreadcrumbItem>
 * </Breadcrumb>
 * ```
 */
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (props, ref) => {
    const {
      children,
      separator = '/',
      'aria-label': ariaLabel = 'Breadcrumb',
      UNSAFE_className,
    } = props;

    const childrenArray = React.Children.toArray(children);
    const itemsWithSeparators: React.ReactNode[] = [];

    childrenArray.forEach((child, index) => {
      itemsWithSeparators.push(
        <React.Fragment key={`item-${index}`}>{child}</React.Fragment>
      );

      // Add separator after each item except the last one
      if (index < childrenArray.length - 1) {
        itemsWithSeparators.push(
          <span
            key={`separator-${index}`}
            className={styles.breadcrumbSeparator}
            aria-hidden="true"
          >
            {separator}
          </span>
        );
      }
    });

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={UNSAFE_className ? `${styles.breadcrumb} ${UNSAFE_className}` : styles.breadcrumb}
      >
        {itemsWithSeparators}
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

/**
 * BreadcrumbItem component for Living Design 3.5
 * 
 * Individual item within a breadcrumb navigation. Can be rendered as:
 * - Link (<a>) when href is provided
 * - Button when onClick is provided
 * - Plain text when isCurrent is true
 * 
 * @example
 * ```tsx
 * // As a link
 * <BreadcrumbItem href="/home">Home</BreadcrumbItem>
 * 
 * // As a button
 * <BreadcrumbItem onClick={() => navigate('/back')}>Back</BreadcrumbItem>
 * 
 * // As current page
 * <BreadcrumbItem isCurrent>Current Page</BreadcrumbItem>
 * ```
 */
export const BreadcrumbItem = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement,
  BreadcrumbItemProps
>((props, ref) => {
  const { children, isCurrent, UNSAFE_className } = props;

  // Current page - render as span
  if (isCurrent) {
    return (
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        className={UNSAFE_className ? `${styles.breadcrumbCurrent} ${UNSAFE_className}` : styles.breadcrumbCurrent}
        aria-current="page"
      >
        {children}
      </span>
    );
  }

  // Link - render as anchor
  if ('href' in props && props.href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={props.href}
        className={UNSAFE_className ? `${styles.breadcrumbLink} ${UNSAFE_className}` : styles.breadcrumbLink}
      >
        {children}
      </a>
    );
  }

  // Button - render as button
  if ('onClick' in props && props.onClick) {
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        onClick={props.onClick}
        className={UNSAFE_className ? `${styles.breadcrumbLink} ${UNSAFE_className}` : styles.breadcrumbLink}
      >
        {children}
      </button>
    );
  }

  // Fallback - render as span
  return (
    <span
      ref={ref as React.Ref<HTMLSpanElement>}
      className={UNSAFE_className ? `${styles.breadcrumbCurrent} ${UNSAFE_className}` : styles.breadcrumbCurrent}
    >
      {children}
    </span>
  );
});

BreadcrumbItem.displayName = 'BreadcrumbItem';
