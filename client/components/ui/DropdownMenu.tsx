import * as React from "react";
import * as ReactDOM from "react-dom";
import { Check, ChevronRight, Circle } from "@/components/icons";
import { cn } from "@/lib/utils";
import styles from "./DropdownMenu.module.css";

/* ------------------------------------------------------------------ */
/*  Contexts                                                           */
/* ------------------------------------------------------------------ */

interface MenuContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  highlightedIndex: number;
  setHighlightedIndex: (i: number) => void;
}

const MenuCtx = React.createContext<MenuContextValue | null>(null);
function useMenuCtx() {
  const ctx = React.useContext(MenuCtx);
  if (!ctx) throw new Error('DropdownMenu components must be used within <DropdownMenu>');
  return ctx;
}

interface RadioGroupContextValue {
  value: string;
  onValueChange: (value: string) => void;
}
const RadioGroupCtx = React.createContext<RadioGroupContextValue | null>(null);

/* ------------------------------------------------------------------ */
/*  Root                                                               */
/* ------------------------------------------------------------------ */

interface DropdownMenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function DropdownMenu({ open: controlledOpen, defaultOpen = false, onOpenChange, children }: DropdownMenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);

  const handleChange = React.useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) setUncontrolledOpen(next);
      onOpenChange?.(next);
      if (!next) setHighlightedIndex(-1);
    },
    [controlledOpen, onOpenChange],
  );

  return (
    <MenuCtx.Provider value={{ open, onOpenChange: handleChange, triggerRef, highlightedIndex, setHighlightedIndex }}>
      {children}
    </MenuCtx.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Trigger                                                            */
/* ------------------------------------------------------------------ */

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ onClick, children, asChild, ...props }, ref) => {
  const { open, onOpenChange, triggerRef } = useMenuCtx();

  const mergedRef = React.useCallback(
    (node: HTMLButtonElement | null) => {
      (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
    },
    [ref, triggerRef],
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    onOpenChange(!open);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ref: mergedRef,
      onClick: handleClick,
      'aria-expanded': open,
      'aria-haspopup': 'menu',
      'data-state': open ? 'open' : 'closed',
    });
  }

  return (
    <button
      ref={mergedRef}
      type="button"
      onClick={handleClick}
      aria-expanded={open}
      aria-haspopup="menu"
      data-state={open ? 'open' : 'closed'}
      {...props}
    >
      {children}
    </button>
  );
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

/* ------------------------------------------------------------------ */
/*  Group                                                              */
/* ------------------------------------------------------------------ */

const DropdownMenuGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => <div ref={ref} role="group" {...props} />);
DropdownMenuGroup.displayName = "DropdownMenuGroup";

/* ------------------------------------------------------------------ */
/*  Portal                                                             */
/* ------------------------------------------------------------------ */

function DropdownMenuPortal({ children }: { children: React.ReactNode }) {
  return ReactDOM.createPortal(children, document.body);
}

/* ------------------------------------------------------------------ */
/*  Sub (simplified)                                                   */
/* ------------------------------------------------------------------ */

interface SubContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const SubCtx = React.createContext<SubContextValue | null>(null);

function DropdownMenuSub({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <SubCtx.Provider value={{ open, onOpenChange: setOpen }}>
      {children}
    </SubCtx.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  RadioGroup                                                         */
/* ------------------------------------------------------------------ */

interface DropdownMenuRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const DropdownMenuRadioGroup = React.forwardRef<HTMLDivElement, DropdownMenuRadioGroupProps>(
  ({ value = '', onValueChange, ...props }, ref) => (
    <RadioGroupCtx.Provider value={{ value, onValueChange: onValueChange || (() => {}) }}>
      <div ref={ref} role="group" {...props} />
    </RadioGroupCtx.Provider>
  ),
);
DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";

/* ------------------------------------------------------------------ */
/*  SubTrigger                                                         */
/* ------------------------------------------------------------------ */

const DropdownMenuSubTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
>(({ className, inset, children, onMouseEnter, onMouseLeave, ...props }, ref) => {
  const sub = React.useContext(SubCtx);

  return (
    <div
      ref={ref}
      role="menuitem"
      aria-haspopup="menu"
      data-state={sub?.open ? 'open' : 'closed'}
      className={cn(styles.subTrigger, inset && styles['item--inset'], className)}
      onMouseEnter={(e) => {
        sub?.onOpenChange(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        sub?.onOpenChange(false);
        onMouseLeave?.(e);
      }}
      {...props}
    >
      {children}
      <ChevronRight className={styles.chevron} />
    </div>
  );
});
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

/* ------------------------------------------------------------------ */
/*  SubContent                                                         */
/* ------------------------------------------------------------------ */

const DropdownMenuSubContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const sub = React.useContext(SubCtx);
  if (!sub?.open) return null;

  return (
    <div
      ref={ref}
      role="menu"
      data-state="open"
      className={cn(styles.content, className)}
      style={{ position: 'absolute', left: '100%', top: 0 }}
      {...props}
    />
  );
});
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  sideOffset?: number;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
}

const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, sideOffset = 4, side = 'bottom', align = 'start', style, ...props }, ref) => {
    const { open, onOpenChange, triggerRef } = useMenuCtx();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [pos, setPos] = React.useState<{ top: number; left: number }>({ top: 0, left: 0 });

    const mergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref],
    );

    // Position relative to trigger
    React.useEffect(() => {
      if (!open || !triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();

      let top = rect.bottom + sideOffset;
      let left = rect.left;

      if (side === 'top') top = rect.top - sideOffset;
      if (align === 'end') left = rect.right;
      if (align === 'center') left = rect.left + rect.width / 2;

      setPos({ top, left });
    }, [open, sideOffset, side, align, triggerRef]);

    // Click outside + escape
    React.useEffect(() => {
      if (!open) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (
          contentRef.current && !contentRef.current.contains(e.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(e.target as Node)
        ) {
          onOpenChange(false);
        }
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onOpenChange(false);
          triggerRef.current?.focus();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [open, onOpenChange, triggerRef]);

    // Keyboard navigation
    React.useEffect(() => {
      if (!open || !contentRef.current) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          const items = contentRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([data-disabled])');
          if (!items || items.length === 0) return;

          const current = Array.from(items).findIndex((el) => el === document.activeElement);
          let next: number;

          if (e.key === 'ArrowDown') {
            next = current < items.length - 1 ? current + 1 : 0;
          } else {
            next = current > 0 ? current - 1 : items.length - 1;
          }

          items[next].focus();
        }
      };

      contentRef.current.addEventListener('keydown', handleKeyDown);
      const el = contentRef.current;
      return () => el?.removeEventListener('keydown', handleKeyDown);
    }, [open]);

    if (!open) return null;

    return (
      <DropdownMenuPortal>
        <div
          ref={mergedRef}
          role="menu"
          data-state="open"
          className={cn(styles.content, className)}
          style={{
            position: 'fixed',
            top: pos.top,
            left: pos.left,
            zIndex: 50,
            ...style,
          }}
          {...props}
        />
      </DropdownMenuPortal>
    );
  },
);
DropdownMenuContent.displayName = "DropdownMenuContent";

/* ------------------------------------------------------------------ */
/*  Item                                                               */
/* ------------------------------------------------------------------ */

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean; disabled?: boolean; onSelect?: () => void }
>(({ className, inset, disabled, onSelect, onClick, ...props }, ref) => {
  const { onOpenChange } = useMenuCtx();

  return (
    <div
      ref={ref}
      role="menuitem"
      tabIndex={disabled ? undefined : -1}
      data-disabled={disabled || undefined}
      className={cn(styles.item, inset && styles['item--inset'], className)}
      onClick={(e) => {
        if (disabled) return;
        onClick?.(e);
        onSelect?.();
        onOpenChange(false);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!disabled) {
            onSelect?.();
            onOpenChange(false);
          }
        }
      }}
      {...props}
    />
  );
});
DropdownMenuItem.displayName = "DropdownMenuItem";

/* ------------------------------------------------------------------ */
/*  CheckboxItem                                                       */
/* ------------------------------------------------------------------ */

interface DropdownMenuCheckboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const DropdownMenuCheckboxItem = React.forwardRef<HTMLDivElement, DropdownMenuCheckboxItemProps>(
  ({ className, children, checked, onCheckedChange, disabled, onClick, ...props }, ref) => {
    const { onOpenChange } = useMenuCtx();

    return (
      <div
        ref={ref}
        role="menuitemcheckbox"
        aria-checked={checked}
        tabIndex={disabled ? undefined : -1}
        data-disabled={disabled || undefined}
        data-state={checked ? 'checked' : 'unchecked'}
        className={cn(styles.itemWithIndicator, className)}
        onClick={(e) => {
          if (disabled) return;
          onClick?.(e);
          onCheckedChange?.(!checked);
          onOpenChange(false);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!disabled) {
              onCheckedChange?.(!checked);
              onOpenChange(false);
            }
          }
        }}
        {...props}
      >
        <span className={styles.indicator}>
          {checked && <Check />}
        </span>
        {children}
      </div>
    );
  },
);
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

/* ------------------------------------------------------------------ */
/*  RadioItem                                                          */
/* ------------------------------------------------------------------ */

interface DropdownMenuRadioItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

const DropdownMenuRadioItem = React.forwardRef<HTMLDivElement, DropdownMenuRadioItemProps>(
  ({ className, children, value, disabled, onClick, ...props }, ref) => {
    const { onOpenChange } = useMenuCtx();
    const radioGroup = React.useContext(RadioGroupCtx);
    const checked = radioGroup?.value === value;

    return (
      <div
        ref={ref}
        role="menuitemradio"
        aria-checked={checked}
        tabIndex={disabled ? undefined : -1}
        data-disabled={disabled || undefined}
        data-state={checked ? 'checked' : 'unchecked'}
        className={cn(styles.itemWithIndicator, className)}
        onClick={(e) => {
          if (disabled) return;
          onClick?.(e);
          radioGroup?.onValueChange(value);
          onOpenChange(false);
        }}
        {...props}
      >
        <span className={styles.indicator}>
          {checked && <Circle className={styles.radioDot} />}
        </span>
        {children}
      </div>
    );
  },
);
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

/* ------------------------------------------------------------------ */
/*  Label                                                              */
/* ------------------------------------------------------------------ */

const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(styles.label, inset && styles['label--inset'], className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

/* ------------------------------------------------------------------ */
/*  Separator                                                          */
/* ------------------------------------------------------------------ */

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn(styles.separator, className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

/* ------------------------------------------------------------------ */
/*  Shortcut                                                           */
/* ------------------------------------------------------------------ */

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn(styles.shortcut, className)} {...props} />
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
