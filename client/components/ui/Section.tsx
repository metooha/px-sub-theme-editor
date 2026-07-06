import * as React from 'react';
import { ChevronDown } from '@/components/icons';
import { Divider } from '@/components/ui/Divider';
import styles from './Section.module.css';

type SectionLevel = 'primary' | 'secondary' | 'tertiary';

export interface SectionProps extends Omit<React.ComponentPropsWithoutRef<'section'>, 'className' | 'style' | 'title'> {
  /** Optional heading text */
  title?: string;
  /** Optional subtitle below the title */
  description?: string | React.ReactNode;
  /** Section content */
  children: React.ReactNode;
  /** Show a divider between header and content */
  divider?: boolean;
  /** Optional action buttons rendered in the header row */
  actions?: React.ReactNode;
  /** Whether the section can be collapsed */
  collapsible?: boolean;
  /** Initial open state when collapsible */
  defaultOpen?: boolean;
  /** Escape hatch for additional CSS classes */
  UNSAFE_className?: string;
  /** Escape hatch for inline styles */
  UNSAFE_style?: React.CSSProperties;
}

const SectionBase = React.forwardRef<HTMLElement, SectionProps & { level: SectionLevel }>(
  (
    {
      level,
      title,
      description,
      children,
      divider = false,
      actions,
      collapsible = false,
      defaultOpen = true,
      UNSAFE_className,
      UNSAFE_style,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    const className = [
      styles.section,
      styles[`section--${level}`],
      UNSAFE_className,
    ]
      .filter(Boolean)
      .join(' ');

    const hasHeader = title || description || actions;

    return (
      <section ref={ref} className={className} style={UNSAFE_style} {...props}>
        {hasHeader && (
          <div className={styles.section__header}>
            <div className={styles.section__headerContent}>
              {title && (
                <div className={styles.section__titleRow}>
                  {collapsible ? (
                    <button
                      type="button"
                      className={styles.section__collapseButton}
                      aria-expanded={isOpen}
                      onClick={() => setIsOpen((prev) => !prev)}
                    >
                      <span className={[styles.section__title, styles[`section__title--${level}`]].join(' ')}>
                        {title}
                      </span>
                      <ChevronDown
                        className={[
                          styles.section__chevron,
                          !isOpen ? styles['section__chevron--collapsed'] : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      />
                    </button>
                  ) : (
                    <span className={[styles.section__title, styles[`section__title--${level}`]].join(' ')}>
                      {title}
                    </span>
                  )}
                  {actions && <div className={styles.section__actions}>{actions}</div>}
                </div>
              )}
              {description && (
                <div className={styles.section__description}>{description}</div>
              )}
            </div>
          </div>
        )}

        {divider && hasHeader && <Divider />}

        {collapsible ? (
          <div
            className={[
              styles.section__body,
              !isOpen ? styles['section__body--collapsed'] : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {children}
          </div>
        ) : (
          <div className={styles.section__body}>{children}</div>
        )}
      </section>
    );
  },
);

SectionBase.displayName = 'SectionBase';

/** Top-level page section with prominent heading, generous padding, and strong elevation. */
export const PrimarySection = React.forwardRef<HTMLElement, SectionProps>(
  (props, ref) => <SectionBase ref={ref} level="primary" {...props} />,
);
PrimarySection.displayName = 'PrimarySection';

/** Sub-section within a page with medium heading, moderate padding, and subtle elevation. */
export const SecondarySection = React.forwardRef<HTMLElement, SectionProps>(
  (props, ref) => <SectionBase ref={ref} level="secondary" {...props} />,
);
SecondarySection.displayName = 'SecondarySection';

/** Nested grouping with compact heading, minimal padding, and flat styling. */
export const TertiarySection = React.forwardRef<HTMLElement, SectionProps>(
  (props, ref) => <SectionBase ref={ref} level="tertiary" {...props} />,
);
TertiarySection.displayName = 'TertiarySection';
