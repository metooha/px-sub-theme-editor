import * as React from "react";
import * as ReactDOM from "react-dom";
import { Check, ChevronRight, Circle } from "@/components/icons";
import { cn } from "@/lib/utils";
import styles from "./DropdownMenu.module.css";

/* ------------------------------------------------------------------ */
/*  Contexts                                                           */
/* ------------------------------------------------------------------ */

interface ContextMenuContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position: { x: number; y: number };
  setPosition: (pos: { x: number; y: number }) => void;
}

const ContextMenuCtx = React.createContext<ContextMenuContextValue | null>(null);
function useContextMenuCtx() {
  const ctx = React.useContext(ContextMenuCtx);
  if (!ctx) throw new Error('ContextMenu components must be used within <ContextMenu>');
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

function ContextMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  return (
    <ContextMenuCtx.Provider value={{ open, onOpenChange: setOpen, position, setPosition }}>
      {children}
    </ContextMenuCtx.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Trigger                                                            */
/* ------------------------------------------------------------------ */

const ContextMenuTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ onContextMenu, children, ...props }, ref) => {
  const { onOpenChange, setPosition } = useContextMenuCtx();

  return (
    <div
      ref={ref}
      onContextMenu={(e) => {
        e.preventDefault();
        setPosition({ x: e.clientX, y: e.clientY });
        onOpenChange(true);
        onContextMenu?.(e);
      }}
      {...props}
    >
      {children}
    </div>
  );
});
ContextMenuTrigger.displayName = "ContextMenuTrigger";

/* ------------------------------------------------------------------ */
/*  Group                                                              */
/* ------------------------------------------------------------------ */

const ContextMenuGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => <div ref={ref} role="group" {...props} />);
ContextMenuGroup.displayName = "ContextMenuGroup";

/* ------------------------------------------------------------------ */
/*  Portal                                                             */
/* ------------------------------------------------------------------ */

function ContextMenuPortal({ children }: { children: React.ReactNode }) {
  return ReactDOM.createPortal(children, document.body);
}

/* ------------------------------------------------------------------ */
/*  Sub                                                                */
/* ------------------------------------------------------------------ */

interface SubContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const SubCtx = React.createContext<SubContextValue | null>(null);

function ContextMenuSub({ children }: { children: React.ReactNode }) {
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

interface ContextMenuRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const ContextMenuRadioGroup = React.forwardRef<HTMLDivElement, ContextMenuRadioGroupProps>(
  ({ value = '', onValueChange, ...props }, ref) => (
    <RadioGroupCtx.Provider value={{ value, onValueChange: onValueChange || (() => {}) }}>
      <div ref={ref} role="group" {...props} />
    </RadioGroupCtx.Provider>
  ),
);
ContextMenuRadioGroup.displayName = "ContextMenuRadioGroup";

/* ------------------------------------------------------------------ */
/*  SubTrigger                                                         */
/* ------------------------------------------------------------------ */

const ContextMenuSubTrigger = React.forwardRef<
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
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";

/* ------------------------------------------------------------------ */
/*  SubContent                                                         */
/* ------------------------------------------------------------------ */

const ContextMenuSubContent = React.forwardRef<
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
ContextMenuSubContent.displayName = "ContextMenuSubContent";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const ContextMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
  const { open, onOpenChange, position } = useContextMenuCtx();
  const contentRef = React.useRef<HTMLDivElement>(null);

  const mergedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref],
  );

  React.useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        onOpenChange(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onOpenChange(false);
      }

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

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <ContextMenuPortal>
      <div
        ref={mergedRef}
        role="menu"
        data-state="open"
        className={cn(styles.content, className)}
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          zIndex: 50,
          ...style,
        }}
        {...props}
      />
    </ContextMenuPortal>
  );
});
ContextMenuContent.displayName = "ContextMenuContent";

/* ------------------------------------------------------------------ */
/*  Item                                                               */
/* ------------------------------------------------------------------ */

const ContextMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean; disabled?: boolean; onSelect?: () => void }
>(({ className, inset, disabled, onSelect, onClick, ...props }, ref) => {
  const { onOpenChange } = useContextMenuCtx();

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
ContextMenuItem.displayName = "ContextMenuItem";

/* ------------------------------------------------------------------ */
/*  CheckboxItem                                                       */
/* ------------------------------------------------------------------ */

interface ContextMenuCheckboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const ContextMenuCheckboxItem = React.forwardRef<HTMLDivElement, ContextMenuCheckboxItemProps>(
  ({ className, children, checked, onCheckedChange, disabled, onClick, ...props }, ref) => {
    const { onOpenChange } = useContextMenuCtx();

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
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

/* ------------------------------------------------------------------ */
/*  RadioItem                                                          */
/* ------------------------------------------------------------------ */

interface ContextMenuRadioItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

const ContextMenuRadioItem = React.forwardRef<HTMLDivElement, ContextMenuRadioItemProps>(
  ({ className, children, value, disabled, onClick, ...props }, ref) => {
    const { onOpenChange } = useContextMenuCtx();
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
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";

/* ------------------------------------------------------------------ */
/*  Label                                                              */
/* ------------------------------------------------------------------ */

const ContextMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(styles.label, inset && styles['label--inset'], className)}
    {...props}
  />
));
ContextMenuLabel.displayName = "ContextMenuLabel";

/* ------------------------------------------------------------------ */
/*  Separator                                                          */
/* ------------------------------------------------------------------ */

const ContextMenuSeparator = React.forwardRef<
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
ContextMenuSeparator.displayName = "ContextMenuSeparator";

/* ------------------------------------------------------------------ */
/*  Shortcut                                                           */
/* ------------------------------------------------------------------ */

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn(styles.shortcut, className)} {...props} />
);
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
