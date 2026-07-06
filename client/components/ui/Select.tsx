'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import styles from './Select.module.css';

/**
 * Living Design 3.5 Select Component
 *
 * Standalone implementation with no external dependencies.
 * Custom listbox pattern with full keyboard accessibility.
 *
 * @example
 * ```tsx
 * <Select label="Choose option" value={value} onValueChange={setValue}>
 *   <SelectItem value="1">Option 1</SelectItem>
 *   <SelectItem value="2">Option 2</SelectItem>
 * </Select>
 * ```
 */

/* ─── Context ─── */

interface SelectContextValue {
  value: string | undefined;
  onSelect: (value: string, label: string) => void;
  highlightedIndex: number;
  setHighlightedIndex: (i: number) => void;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

function useSelectContext() {
  const ctx = React.useContext(SelectContext);
  if (!ctx) throw new Error('SelectItem must be used within a Select');
  return ctx;
}

/* ─── SelectItem ─── */

export interface SelectItemProps {
  children: React.ReactNode;
  value: string;
  disabled?: boolean;
  className?: string;
}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, value, disabled, className }, ref) => {
    const ctx = useSelectContext();
    const isSelected = ctx.value === value;

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled || undefined}
        data-state={isSelected ? 'checked' : 'unchecked'}
        data-disabled={disabled || undefined}
        data-value={value}
        className={cn(styles.item, className)}
        onClick={() => {
          if (!disabled) {
            ctx.onSelect(value, typeof children === 'string' ? children : '');
          }
        }}
      >
        <span>{children}</span>
        {isSelected && (
          <span className={styles.itemIndicator}>
            <CheckIcon />
          </span>
        )}
      </div>
    );
  },
);
SelectItem.displayName = 'SelectItem';

/* ─── SelectSeparator ─── */

export const SelectSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(styles.separator, className)} {...props} />
));
SelectSeparator.displayName = 'SelectSeparator';

/* ─── SelectLabel ─── */

export const SelectLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(styles.groupLabel, className)} {...props} />
));
SelectLabel.displayName = 'SelectLabel';

/* ─── Main Select ─── */

export interface SelectProps {
  label: string;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: 'small' | 'large';
  error?: boolean;
  errorMessage?: string;
  isMagic?: boolean;
  helperText?: string;
  leadingIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
  defaultValue?: string;
  borderless?: boolean;
}

export function Select({
  label,
  value: controlledValue,
  onValueChange,
  placeholder = 'Select option...',
  disabled = false,
  size = 'large',
  error = false,
  errorMessage,
  isMagic = false,
  helperText,
  leadingIcon,
  children,
  className,
  id,
  name,
  required = false,
  defaultValue,
  borderless = false,
}: SelectProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
  const currentValue = isControlled ? controlledValue : internalValue;

  const [open, setOpen] = React.useState(false);
  const [displayLabel, setDisplayLabel] = React.useState('');
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);

  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Build a flat list of item values for keyboard navigation
  const itemValues = React.useMemo(() => {
    const values: string[] = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement<SelectItemProps>(child) && child.type === SelectItem) {
        if (!child.props.disabled) {
          values.push(child.props.value);
        }
      }
    });
    return values;
  }, [children]);

  // Resolve display label from children on mount and when value changes
  React.useEffect(() => {
    let found = '';
    React.Children.forEach(children, (child) => {
      if (React.isValidElement<SelectItemProps>(child) && child.type === SelectItem) {
        if (child.props.value === currentValue) {
          found = typeof child.props.children === 'string'
            ? child.props.children
            : currentValue;
        }
      }
    });
    setDisplayLabel(found);
  }, [currentValue, children]);

  // Close on click outside
  React.useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Close on Escape
  React.useEffect(() => {
    if (!open) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open]);

  const handleSelect = (val: string, lbl: string) => {
    if (!isControlled) {
      setInternalValue(val);
    }
    onValueChange?.(val);
    setDisplayLabel(lbl || val);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleTriggerClick = () => {
    if (disabled) return;
    setOpen((o) => !o);
    if (!open) {
      // Highlight the currently selected item when opening
      const idx = itemValues.indexOf(currentValue ?? '');
      setHighlightedIndex(idx >= 0 ? idx : 0);
    }
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowUp':
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!open) {
          setOpen(true);
          const idx = itemValues.indexOf(currentValue ?? '');
          setHighlightedIndex(idx >= 0 ? idx : 0);
        } else if (e.key === 'Enter' || e.key === ' ') {
          // Select the highlighted item
          if (highlightedIndex >= 0 && highlightedIndex < itemValues.length) {
            const val = itemValues[highlightedIndex];
            // Find label
            let lbl = val;
            React.Children.forEach(children, (child) => {
              if (React.isValidElement<SelectItemProps>(child) && child.type === SelectItem) {
                if (child.props.value === val) {
                  lbl = typeof child.props.children === 'string' ? child.props.children : val;
                }
              }
            });
            handleSelect(val, lbl);
          }
        } else if (e.key === 'ArrowDown') {
          setHighlightedIndex((i) => Math.min(i + 1, itemValues.length - 1));
        } else if (e.key === 'ArrowUp') {
          setHighlightedIndex((i) => Math.max(i - 1, 0));
        }
        break;
      case 'Home':
        if (open) {
          e.preventDefault();
          setHighlightedIndex(0);
        }
        break;
      case 'End':
        if (open) {
          e.preventDefault();
          setHighlightedIndex(itemValues.length - 1);
        }
        break;
    }
  };

  // Scroll highlighted item into view
  React.useEffect(() => {
    if (!open || highlightedIndex < 0) return;
    const items = contentRef.current?.querySelectorAll('[role="option"]:not([data-disabled])');
    if (items && items[highlightedIndex]) {
      items[highlightedIndex].scrollIntoView({ block: 'nearest' });
      // Add visual focus
      items.forEach((item, i) => {
        (item as HTMLElement).setAttribute('data-highlighted', i === highlightedIndex ? 'true' : '');
      });
    }
  }, [open, highlightedIndex]);

  const labelId = id ? `${id}-label` : undefined;
  const errorId = error && errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const listboxId = id ? `${id}-listbox` : undefined;

  return (
    <div className={cn(styles.select, className)} ref={containerRef}>
      {/* Label */}
      <div className={styles.labelContainer}>
        {isMagic && (
          <MagicIcon
            size={size}
            disabled={disabled}
            className={cn(styles.magicIcon, styles[`magicIcon--${size}`])}
          />
        )}
        <label
          id={labelId}
          className={cn(
            styles.label,
            styles[`label--size-${size}`],
            disabled && styles['label--disabled'],
          )}
        >
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      </div>

      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        id={id}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-labelledby={labelId}
        aria-describedby={cn(errorId, helperId) || undefined}
        aria-invalid={error || undefined}
        aria-required={required || undefined}
        disabled={disabled}
        data-state={open ? 'open' : 'closed'}
        data-disabled={disabled || undefined}
        className={cn(
          styles.trigger,
          styles[`trigger--size-${size}`],
          error && styles['trigger--error'],
          isMagic && !error && styles['trigger--magic'],
          disabled && styles['trigger--disabled'],
          borderless && styles['trigger--borderless'],
        )}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
      >
        <div className={styles.valueContainer}>
          {leadingIcon && (
            <span className={styles.leadingIcon}>{leadingIcon}</span>
          )}
          <span className={displayLabel ? undefined : styles.placeholder}>
            {displayLabel || placeholder}
          </span>
        </div>
        <ChevronDownIcon className={styles.chevron} />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          ref={contentRef}
          role="listbox"
          id={listboxId}
          aria-labelledby={labelId}
          className={styles.content}
          data-side="bottom"
        >
          <div className={styles.viewport}>
            <SelectContext.Provider
              value={{
                value: currentValue,
                onSelect: handleSelect,
                highlightedIndex,
                setHighlightedIndex,
              }}
            >
              {children}
            </SelectContext.Provider>
          </div>
        </div>
      )}

      {/* Hidden input for form submission */}
      {name && (
        <input type="hidden" name={name} value={currentValue ?? ''} disabled={disabled} />
      )}

      {/* Error message */}
      {error && errorMessage && (
        <div id={errorId} className={styles.errorContainer}>
          <ErrorIcon className={styles.errorIcon} />
          <span className={styles.errorText}>{errorMessage}</span>
        </div>
      )}

      {/* Helper text */}
      {helperText && !error && (
        <div id={helperId} className={styles.helperText}>
          {helperText}
        </div>
      )}
    </div>
  );
}

/* ─── Icons ─── */

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M11.4356 15.4934C11.578 15.6562 11.7837 15.7495 12 15.7495C12.2163 15.7495 12.422 15.6562 12.5644 15.4934L17.8144 9.49339C18.0082 9.27192 18.0546 8.95758 17.933 8.6896C17.8114 8.42162 17.5443 8.24951 17.25 8.24951H6.75001C6.45573 8.24951 6.18864 8.42162 6.06704 8.6896C5.94544 8.95758 5.99179 9.27192 6.18558 9.49339L11.4356 15.4934Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M13.5 4.5L6 12L2.5 8.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ErrorIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM7.36905 9.19612L7.08333 4.12012H8.91667L8.64286 9.19612H7.36905ZM8 11.8721C7.71429 11.8721 7.47619 11.7921 7.28571 11.6321C7.09524 11.4641 7 11.2321 7 10.9361C7 10.6561 7.09524 10.4281 7.28571 10.2521C7.47619 10.0761 7.71429 9.98812 8 9.98812C8.27778 9.98812 8.5119 10.0761 8.70238 10.2521C8.90079 10.4281 9 10.6561 9 10.9361C9 11.2321 8.90079 11.4641 8.70238 11.6321C8.5119 11.7921 8.27778 11.8721 8 11.8721Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MagicIcon({
  size,
  disabled,
  className,
}: {
  size: 'small' | 'large';
  disabled?: boolean;
  className?: string;
}) {
  const iconSize = size === 'small' ? 16 : 24;

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        styles.magicIconSvg,
        disabled && styles['magicIconSvg--disabled'],
        className,
      )}
      aria-label="AI-assisted"
    >
      <defs>
        <linearGradient id="magic-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--ld-semantic-color-border-magic-start, #0053E2)" />
          <stop offset="50%" stopColor="var(--ld-semantic-color-border-magic-middle, #3D90EC)" />
          <stop offset="100%" stopColor="var(--ld-semantic-color-border-magic-stop, #79CDF6)" />
        </linearGradient>
      </defs>
      <path
        d="M11.1458 2.79167L12.3333 2.33333L12.7708 1.16667C12.7917 1.0625 12.8958 1 13 1C13.0833 1 13.1875 1.0625 13.2083 1.16667L13.6667 2.33333L14.8333 2.79167C14.9375 2.8125 15 2.91667 15 3C15 3.10417 14.9375 3.20833 14.8333 3.22917L13.6667 3.66667L13.2083 4.85417C13.1875 4.9375 13.0833 5 13 5C12.8958 5 12.7917 4.9375 12.7708 4.85417L12.3333 3.66667L11.1458 3.22917C11.0625 3.20833 11 3.10417 11 3C11 2.91667 11.0625 2.8125 11.1458 2.79167Z"
        fill={disabled ? 'currentColor' : 'url(#magic-gradient)'}
      />
      <path
        d="M1.28346 8.5288L1.8189 8.3089L2.07087 8.18325H2.10236L4.87402 6.89529L6.16535 4.09948L6.29134 3.84817L6.54331 3.31414C6.6063 3.12565 6.79528 3 6.98425 3C7.17323 3 7.3622 3.12565 7.45669 3.31414L7.70866 3.84817L7.80315 4.09948L7.83465 4.13089L9.09449 6.89529L11.8976 8.18325L12.1496 8.3089L12.685 8.56021C12.874 8.62304 13 8.81152 13 9C13 9.18848 12.874 9.37696 12.685 9.4712L12.1496 9.6911L11.8976 9.81675L9.09449 11.1047L7.80315 13.8691V13.9005L7.67717 14.1518L7.45669 14.6859C7.3622 14.8743 7.17323 15 6.98425 15C6.79528 15 6.6063 14.8743 6.54331 14.6859L6.29134 14.1518L6.16535 13.9005V13.8691L4.87402 11.1047L2.10236 9.81675H2.07087L1.8189 9.6911L1.28346 9.4712C1.09449 9.37696 1 9.18848 1 9C1 8.81152 1.09449 8.62304 1.28346 8.5288ZM3.89764 9L5.50394 9.75393C5.8189 9.87958 6.10236 10.1623 6.25984 10.4764L6.98425 12.0785L7.74016 10.4764C7.89764 10.1623 8.14961 9.87958 8.46457 9.75393L10.0709 9L8.46457 8.24607C8.14961 8.12042 7.89764 7.8377 7.74016 7.52356L6.98425 5.92147L6.25984 7.52356C6.10236 7.8377 5.8189 8.12042 5.50394 8.24607L3.89764 9Z"
        fill={disabled ? 'currentColor' : 'url(#magic-gradient)'}
      />
    </svg>
  );
}

/* ─── Legacy re-exports for backward compatibility ─── */
export const SelectRoot = Select;
export const SelectGroup = 'div' as unknown as React.FC<React.HTMLAttributes<HTMLDivElement>>;
export const SelectValue = 'span' as unknown as React.FC<React.HTMLAttributes<HTMLSpanElement>>;
