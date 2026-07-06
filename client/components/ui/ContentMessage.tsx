import * as React from 'react';
import styles from './ContentMessage.module.css';

export type ContentMessageVariant = 'error' | 'success' | 'info' | 'warning' | 'neutral';
export type ContentMessageSize = 'small' | 'large';
export type ContentMessageHeadingLevel = 'h2' | 'h3' | 'h4';

export interface ContentMessageProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style' | 'title'> {
  /**
   * The title/heading — states what happened.
   */
  title: React.ReactNode;

  /**
   * The description/body — states what the user can do next.
   */
  children: React.ReactNode;

  /**
   * Visual variant for color-coding the message state.
   * @default 'neutral'
   */
  variant?: ContentMessageVariant;

  /**
   * Optional media (icon, illustration) displayed above the content.
   */
  media?: React.ReactNode;

  /**
   * Optional action buttons/links rendered below the description.
   */
  actions?: React.ReactNode;

  /**
   * Size variant controlling padding and typography scale.
   * @default 'small'
   */
  size?: ContentMessageSize;

  /**
   * Heading level for the title (for proper heading hierarchy).
   * @default 'h2'
   */
  headingLevel?: ContentMessageHeadingLevel;

  /**
   * Escape hatch for additional CSS classes.
   */
  UNSAFE_className?: string;

  /**
   * Escape hatch for inline styles.
   */
  UNSAFE_style?: React.CSSProperties;
}

export const ContentMessage = React.forwardRef<HTMLDivElement, ContentMessageProps>(
  (
    {
      title,
      children,
      variant = 'neutral',
      media,
      actions,
      size = 'small',
      headingLevel = 'h2',
      UNSAFE_className,
      UNSAFE_style,
      ...props
    },
    ref
  ) => {
    const HeadingTag = headingLevel;

    const className = [
      styles.contentMessage,
      styles[`contentMessage--variant-${variant}`],
      styles[`contentMessage--size-${size}`],
      UNSAFE_className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={className} style={UNSAFE_style} {...props}>
        {media && (
          <div className={styles.contentMessage__media}>{media}</div>
        )}
        <div className={styles.contentMessage__content}>
          <HeadingTag className={styles.contentMessage__title}>
            {title}
          </HeadingTag>
          <div className={styles.contentMessage__description}>{children}</div>
          {actions && (
            <div className={styles.contentMessage__actions}>{actions}</div>
          )}
        </div>
      </div>
    );
  }
);

ContentMessage.displayName = 'ContentMessage';
