import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import { Pencil } from '@/components/icons/Pencil';
import { CheckCircleFill } from '@/components/icons/CheckCircleFill';
import { ExclamationCircleFill } from '@/components/icons/ExclamationCircleFill';
import styles from './DataTableCellInlineEdit.module.css';

interface CommonProps {
  'aria-label'?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export interface DataTableCellInlineEditTextAreaProps
  extends Omit<React.ComponentPropsWithoutRef<'td'>, 'onChange'>,
    CommonProps {
  /** Accessible label for the edit dialog. */
  a11yDialogLabel: string;
  /** Accessible label for the textarea. */
  a11yTextAreaLabel: string;
  /** Error message. */
  error?: React.ReactNode;
  /** Whether the edit dialog is open. @default false */
  isOpen?: boolean;
  /** Whether the value is in saved state. @default false */
  isSaved?: boolean;
  /** Called when user cancels editing. */
  onCancel: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
  /** Called when textarea value changes. */
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Called when user clicks the trigger to open editing. */
  onOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Called when user saves. */
  onSave: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Props for the save button. */
  saveButtonProps?: { children?: React.ReactNode; disabled?: boolean };
  /** Props for the cancel button. */
  cancelButtonProps?: { children?: React.ReactNode };
  /** Props for the textarea. */
  textAreaProps?: React.ComponentPropsWithRef<'textarea'>;
  /** Current value. */
  value: string;
  /** @default "alphanumeric" */
  variant?: 'alphanumeric' | 'numeric';
}

/**
 * Inline editable cell (LD 3.5 DT Cell: Inline Edit Text Area).
 *
 * - Alphanumeric: text left, icons (saved ✓ + pencil ✎) on right, shown on hover
 * - Numeric: icons (pencil ✎ + saved ✓) on left, text right-aligned, shown on hover
 * - Error (closed): pink background + red border + error icon+text below value
 * - Open: floating dialog with textarea, error state, Cancel+Save actions
 */
export const DataTableCellInlineEditTextArea = React.forwardRef<
  HTMLTableCellElement,
  DataTableCellInlineEditTextAreaProps
>(
  (
    {
      a11yDialogLabel,
      a11yTextAreaLabel,
      error,
      isOpen = false,
      isSaved = false,
      onCancel,
      onChange,
      onOpen,
      onSave,
      saveButtonProps,
      cancelButtonProps,
      textAreaProps,
      value,
      variant = 'alphanumeric',
      UNSAFE_className,
      UNSAFE_style,
      ...props
    },
    ref,
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const isNumeric = variant === 'numeric';

    // Auto-focus and resize textarea when dialog opens
    React.useEffect(() => {
      if (isOpen && textareaRef.current) {
        const el = textareaRef.current;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
        el.focus();
        el.setSelectionRange(el.value.length, el.value.length);
      }
    }, [isOpen, value]);

    // Escape key closes dialog
    React.useEffect(() => {
      if (!isOpen) return;
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onCancel(e);
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onCancel]);

    // ── Icons ─────────────────────────────────────────────────────────────
    // Alphanumeric: [saved?, pencil]   Numeric: [pencil, saved?]
    // Icons are hidden by default; the CSS .trigger:hover makes .icons visible.
    const iconsAlphanumeric = (
      <span className={styles.icons}>
        {isSaved && (
          <span className={styles.savedIconWrapper}>
            <CheckCircleFill aria-hidden />
          </span>
        )}
        <span className={styles.editIconWrapper}>
          <Pencil aria-hidden />
        </span>
      </span>
    );

    const iconsNumeric = (
      <span className={styles.icons}>
        <span className={styles.editIconWrapper}>
          <Pencil aria-hidden />
        </span>
        {isSaved && (
          <span className={styles.savedIconWrapper}>
            <CheckCircleFill aria-hidden />
          </span>
        )}
      </span>
    );

    // ── Trigger class ─────────────────────────────────────────────────────
    const triggerClass = [
      styles.trigger,
      isNumeric && styles.triggerNumeric,
      error && styles.triggerError,
    ]
      .filter(Boolean)
      .join(' ');

    const cellClass = [styles.cell, UNSAFE_className].filter(Boolean).join(' ');

    // ── Textarea class (inside dialog) ────────────────────────────────────
    const textareaClass = [
      styles.textarea,
      isNumeric && styles.textareaNumeric,
      error && styles.textareaError,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <td ref={ref} className={cellClass} style={UNSAFE_style} {...props}>
        {/* ── Closed / trigger state ── */}
        {!isOpen && (
          <div className={styles.triggerWrapper}>
            <button
              type="button"
              className={triggerClass}
              onClick={onOpen}
              aria-label={
                isSaved
                  ? `Saved: ${value}. Click to edit.`
                  : `${value}. Click to edit.`
              }
            >
              {isNumeric ? (
                <>
                  {iconsNumeric}
                  <span className={styles.triggerValue}>{value}</span>
                </>
              ) : (
                <>
                  <span className={styles.triggerValue}>{value}</span>
                  {iconsAlphanumeric}
                </>
              )}
            </button>

            {/* Error helper text shown below the trigger when not open */}
            {error && (
              <div className={styles.triggerHelperText}>
                <span className={styles.triggerHelperIcon} aria-hidden>
                  <ExclamationCircleFill />
                </span>
                <span>{error}</span>
              </div>
            )}
          </div>
        )}

        {/* ── Open / edit dialog ── */}
        {isOpen && (
          <>
            {/* Click-away overlay */}
            <div
              className={styles.dialogOverlay}
              onClick={(e) =>
                onCancel(e as unknown as React.MouseEvent<HTMLButtonElement>)
              }
              aria-hidden
            />
            <div
              className={styles.dialog}
              role="dialog"
              aria-label={a11yDialogLabel}
            >
              {/* Textarea */}
              <textarea
                ref={textareaRef}
                className={textareaClass}
                value={value}
                onChange={(e) => {
                  onChange(e);
                  const el = e.target;
                  el.style.height = 'auto';
                  el.style.height = `${el.scrollHeight}px`;
                }}
                aria-label={a11yTextAreaLabel}
                rows={1}
                {...textAreaProps}
              />

              {/* Error helper text inside dialog */}
              {error && (
                <div className={styles.dialogError}>
                  <span className={styles.dialogErrorIcon} aria-hidden>
                    <ExclamationCircleFill />
                  </span>
                  <span>{error}</span>
                </div>
              )}

              {/* Cancel / Save actions */}
              <div className={styles.dialogActions}>
                <LinkButton
                  size="small"
                  onClick={(e) =>
                    onCancel(
                      e as unknown as React.MouseEvent<HTMLButtonElement>,
                    )
                  }
                >
                  {cancelButtonProps?.children ?? 'Cancel'}
                </LinkButton>
                <Button
                  variant="primary"
                  size="small"
                  onClick={onSave}
                  disabled={saveButtonProps?.disabled}
                >
                  {saveButtonProps?.children ?? 'Save'}
                </Button>
              </div>
            </div>
          </>
        )}
      </td>
    );
  },
);
DataTableCellInlineEditTextArea.displayName = 'DataTableCellInlineEditTextArea';
