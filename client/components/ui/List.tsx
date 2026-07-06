import * as React from 'react';
import styles from './List.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ListItemLeading = 'empty' | 'icon' | 'spot-icon' | 'custom';
export type ListItemTrailing = 'empty' | 'icon' | 'link' | 'custom';

export interface ListProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'role'> {
  children: React.ReactNode;
}

export interface ListItemProps {
  /** Title text for the list item */
  title: string;
  /** Secondary text below the title */
  text?: string;
  /** Whether to show the title. @default true */
  showTitle?: boolean;

  // ── Leading variants ──────────────────────────────────────────────────────

  /** The leading content type */
  leading?: ListItemLeading;
  /** Icon element for leading="icon" (rendered at 16px) */
  leadingIcon?: React.ReactNode;
  /** Icon element for leading="spot-icon" (rendered at 24px inside a 48px circle) */
  spotIcon?: React.ReactNode;
  /** Custom content for leading="custom" */
  leadingContent?: React.ReactNode;

  // ── Trailing variants ─────────────────────────────────────────────────────

  /** The trailing content type */
  trailing?: ListItemTrailing;
  /** Custom icon for trailing="icon". Falls back to ChevronRight. */
  trailingIcon?: React.ReactNode;
  /** Link config for trailing="link" */
  trailingLink?: { text: string; href?: string; onClick?: () => void };
  /** Custom content for trailing="custom" */
  trailingContent?: React.ReactNode;

  className?: string;
}

// ─── Default ChevronRight SVG ─────────────────────────────────────────────────

const ChevronRightIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M11.834 8.37659L5.69175 13.9998L5 13.2461L10.7307 7.99976L5 2.75342L5.69175 1.99976L11.834 7.62292C11.9398 7.71975 12 7.85646 12 7.99975C12 8.14305 11.9398 8.27976 11.834 8.37659Z"
      fill="currentColor"
    />
  </svg>
);

// ─── List Component ───────────────────────────────────────────────────────────

export const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ children, className, ...props }, ref) => {
    const classNames = [styles.list, className].filter(Boolean).join(' ');

    return (
      <ul
        ref={ref}
        {...props}
        className={classNames}
        role="list"
      >
        {children}
      </ul>
    );
  }
);

List.displayName = 'List';

// ─── Leading Renderer ─────────────────────────────────────────────────────────

function renderLeading(props: ListItemProps): React.ReactNode {
  const { leading = 'empty', leadingIcon, spotIcon, leadingContent } = props;

  switch (leading) {
    case 'icon':
      return (
        <div className={styles.listItemLeading}>
          <span className={styles.listItemLeadingIcon}>
            {leadingIcon}
          </span>
        </div>
      );

    case 'spot-icon':
      return (
        <div className={styles.listItemSpotIcon}>
          <span className={styles.listItemSpotIconInner}>
            {spotIcon}
          </span>
        </div>
      );

    case 'custom':
      return (
        <div className={styles.listItemLeadingCustom}>
          {leadingContent}
        </div>
      );

    default:
      return null;
  }
}

// ─── Trailing Renderer ────────────────────────────────────────────────────────

function renderTrailing(props: ListItemProps): React.ReactNode {
  const { trailing = 'empty', trailingIcon, trailingLink, trailingContent } = props;

  switch (trailing) {
    case 'icon':
      return (
        <div className={styles.listItemTrailingIcon}>
          <span className={styles.listItemTrailingIconInner}>
            {trailingIcon ?? <ChevronRightIcon />}
          </span>
        </div>
      );

    case 'link':
      if (!trailingLink) return null;
      return trailingLink.href ? (
        <a
          href={trailingLink.href}
          className={styles.listItemTrailingLink}
          onClick={trailingLink.onClick}
        >
          {trailingLink.text}
        </a>
      ) : (
        <button
          type="button"
          className={styles.listItemTrailingLink}
          onClick={trailingLink.onClick}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          {trailingLink.text}
        </button>
      );

    case 'custom':
      return (
        <div className={styles.listItemTrailingCustom}>
          {trailingContent}
        </div>
      );

    default:
      return null;
  }
}

// ─── ListItem Component ───────────────────────────────────────────────────────

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  (props, ref) => {
    const { title, text, showTitle = true, className } = props;
    const classNames = [styles.listItem, className].filter(Boolean).join(' ');

    return (
      <li ref={ref} className={classNames} role="listitem">
        {renderLeading(props)}

        <div className={styles.listItemContent}>
          {showTitle && (
            <p className={styles.listItemTitle}>{title}</p>
          )}
          {text && (
            <p className={styles.listItemText}>{text}</p>
          )}
        </div>

        {renderTrailing(props)}
      </li>
    );
  }
);

ListItem.displayName = 'ListItem';
