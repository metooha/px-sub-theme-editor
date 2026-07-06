import * as React from 'react';
import { ExclamationCircleFill } from '@/components/icons/ExclamationCircleFill';
import styles from './DataTableCellBulkEdit.module.css';

interface CommonProps {
  'aria-label'?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export interface DataTableCellBulkEditTextAreaProps
  extends Omit<React.ComponentPropsWithoutRef<'td'>, 'onChange'>,
    CommonProps {
  /** IDs referencing header + unique row identifier for a11y. */
  a11yTextAreaLabelledBy: string;
  /** Helper text when edited. @default "Edited" */
  editedHelperTextLabel?: string;
  /** Error message. */
  error?: React.ReactNode;
  /** Whether the cell has been edited. @default false */
  isEdited?: boolean;
  /** Callback on textarea change. */
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Extra textarea props. */
  textAreaProps?: React.ComponentPropsWithRef<'textarea'>;
  /** Current value. @default "" */
  value?: string;
  /** @default "alphanumeric" */
  variant?: 'alphanumeric' | 'numeric';
}

/**
 * Bulk-editable cell (LD 3.5 DT Cell: Bulk Edit Text Area).
 *
 * Always visible as an editable area. Shows "Edited" helper text in purple
 * when modified, and error icon + text in red when invalid.
 */
export const DataTableCellBulkEditTextArea = React.forwardRef<
  HTMLTableCellElement,
  DataTableCellBulkEditTextAreaProps
>(
  (
    {
      a11yTextAreaLabelledBy,
      editedHelperTextLabel = 'Edited',
      error,
      isEdited = false,
      onChange,
      textAreaProps,
      value = '',
      variant = 'alphanumeric',
      UNSAFE_className,
      UNSAFE_style,
      ...props
    },
    ref,
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const isNumeric = variant === 'numeric';

    // Auto-resize textarea on value changes
    React.useEffect(() => {
      if (textareaRef.current) {
        const el = textareaRef.current;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
      }
    }, [value]);

    const cellClassName = [styles.cell, UNSAFE_className].filter(Boolean).join(' ');

    const wrapperClassName = [
      styles.wrapper,
      error && styles.wrapperError,
      !error && isEdited && styles.wrapperEdited,
    ]
      .filter(Boolean)
      .join(' ');

    const textareaClassName = [
      styles.textarea,
      isNumeric && styles.textareaNumeric,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <td ref={ref} className={cellClassName} style={UNSAFE_style} {...props}>
        <div className={wrapperClassName}>
          <textarea
            ref={textareaRef}
            className={textareaClassName}
            value={value}
            onChange={(e) => {
              onChange(e);
              const el = e.target;
              el.style.height = 'auto';
              el.style.height = `${el.scrollHeight}px`;
            }}
            aria-labelledby={a11yTextAreaLabelledBy}
            rows={1}
            {...textAreaProps}
          />

          {/* Error helper text with icon */}
          {error && (
            <span className={`${styles.helperText} ${styles.errorText}`}>
              <span className={styles.helperIcon} aria-hidden>
                <ExclamationCircleFill />
              </span>
              {error}
            </span>
          )}

          {/* Edited label (only when edited and no error) */}
          {!error && isEdited && (
            <span className={`${styles.helperText} ${styles.editedText}`}>
              {editedHelperTextLabel}
            </span>
          )}
        </div>
      </td>
    );
  },
);
DataTableCellBulkEditTextArea.displayName = 'DataTableCellBulkEditTextArea';
