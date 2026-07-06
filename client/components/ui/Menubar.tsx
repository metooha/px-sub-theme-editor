import * as React from "react";
import * as ReactDOM from "react-dom";
import { Check, ChevronRight, Circle } from "@/components/icons";
import { cn } from "@/lib/utils";
import menuStyles from "./DropdownMenu.module.css";
import barStyles from "./Menubar.module.css";

/* ------------------------------------------------------------------ */
/*  Contexts                                                           */
/* ------------------------------------------------------------------ */

interface MenubarContextValue {
  activeMenu: string | null;
  setActiveMenu: (id: string | null) => void;
}

const MenubarCtx = React.createContext<MenubarContextValue>({
  activeMenu: null,
  setActiveMenu: () => {},
});

interface MenuContextValue {
  menuId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const MenuCtx = React.createContext<MenuContextValue | null>(null);
function useMenuCtx() {
  const ctx = React.useContext(MenuCtx);
  if (!ctx) throw new Error('Menubar menu components must be used within <MenubarMenu>');
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

const Menubar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

  return (
    <MenubarCtx.Provider value={{ activeMenu, setActiveMenu }}>
      <div
        ref={ref}
        role="menubar"
        className={cn(barStyles.root, className)}
        {...props}
      />
    </MenubarCtx.Provider>
  );
});
Menubar.displayName = "Menubar";

/* ------------------------------------------------------------------ */
/*  Menu                                                               */
/* ------------------------------------------------------------------ */

function MenubarMenu({ children }: { children: React.ReactNode }) {
  const menuId = React.useId();
  const { activeMenu, setActiveMenu } = React.useContext(MenubarCtx);
  const open = activeMenu === menuId;
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const onOpenChange = React.useCallback(
    (next: boolean) => setActiveMenu(next ? menuId : null),
    [menuId, setActiveMenu],
  );

  return (
    <MenuCtx.Provider value={{ menuId, open, onOpenChange, triggerRef }}>
      {children}
    </MenuCtx.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Group                                                              */
/* ------------------------------------------------------------------ */

const MenubarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => <div ref={ref} role="group" {...props} />);
MenubarGroup.displayName = "MenubarGroup";

/* ------------------------------------------------------------------ */
/*  Portal                                                             */
/* ------------------------------------------------------------------ */

function MenubarPortal({ children }: { children: React.ReactNode }) {
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

function MenubarSub({ children }: { children: React.ReactNode }) {
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

interface MenubarRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const MenubarRadioGroup = React.forwardRef<HTMLDivElement, MenubarRadioGroupProps>(
  ({ value = '', onValueChange, ...props }, ref) => (
    <RadioGroupCtx.Provider value={{ value, onValueChange: onValueChange || (() => {}) }}>
      <div ref={ref} role="group" {...props} />
    </RadioGroupCtx.Provider>
  ),
);
MenubarRadioGroup.displayName = "MenubarRadioGroup";

/* ------------------------------------------------------------------ */
/*  Trigger                                                            */
/* ------------------------------------------------------------------ */

const MenubarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => {
  const { open, onOpenChange, triggerRef } = useMenuCtx();
  const { activeMenu } = React.useContext(MenubarCtx);

  const mergedRef = React.useCallback(
    (node: HTMLButtonElement | null) => {
      (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
    },
    [ref, triggerRef],
  );

  return (
    <button
      ref={mergedRef}
      type="button"
      role="menuitem"
      aria-expanded={open}
      aria-haspopup="menu"
      data-state={open ? 'open' : 'closed'}
      className={cn(barStyles.trigger, className)}
      onClick={(e) => {
        onClick?.(e);
        onOpenChange(!open);
      }}
      onMouseEnter={() => {
        // If another menu is already open, switch to this one
        if (activeMenu !== null) onOpenChange(true);
      }}
      {...props}
    />
  );
});
MenubarTrigger.displayName = "MenubarTrigger";

/* ------------------------------------------------------------------ */
/*  SubTrigger                                                         */
/* ------------------------------------------------------------------ */

const MenubarSubTrigger = React.forwardRef<
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
      className={cn(menuStyles.subTrigger, inset && menuStyles['item--inset'], className)}
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
      <ChevronRight className={menuStyles.chevron} />
    </div>
  );
});
MenubarSubTrigger.displayName = "MenubarSubTrigger";

/* ------------------------------------------------------------------ */
/*  SubContent                                                         */
/* ------------------------------------------------------------------ */

const MenubarSubContent = React.forwardRef<
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
      className={cn(menuStyles.content, className)}
      style={{ position: 'absolute', left: '100%', top: 0 }}
      {...props}
    />
  );
});
MenubarSubContent.displayName = "MenubarSubContent";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

interface MenubarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end';
  alignOffset?: number;
  sideOffset?: number;
}

const MenubarContent = React.forwardRef<HTMLDivElement, MenubarContentProps>(
  ({ className, align = "start", alignOffset = -4, sideOffset = 8, style, ...props }, ref) => {
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

    React.useEffect(() => {
      if (!open || !triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      let left = rect.left + alignOffset;
      if (align === 'end') left = rect.right + alignOffset;
      if (align === 'center') left = rect.left + rect.width / 2 + alignOffset;
      setPos({ top: rect.bottom + sideOffset, left });
    }, [open, align, alignOffset, sideOffset, triggerRef]);

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
    }, [open, onOpenChange, triggerRef]);

    if (!open) return null;

    return (
      <MenubarPortal>
        <div
          ref={mergedRef}
          role="menu"
          data-state="open"
          className={cn(menuStyles.content, className)}
          style={{
            position: 'fixed',
            top: pos.top,
            left: pos.left,
            zIndex: 50,
            ...style,
          }}
          {...props}
        />
      </MenubarPortal>
    );
  },
);
MenubarContent.displayName = "MenubarContent";

/* ------------------------------------------------------------------ */
/*  Item                                                               */
/* ------------------------------------------------------------------ */

const MenubarItem = React.forwardRef<
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
      className={cn(menuStyles.item, inset && menuStyles['item--inset'], className)}
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
MenubarItem.displayName = "MenubarItem";

/* ------------------------------------------------------------------ */
/*  CheckboxItem                                                       */
/* ------------------------------------------------------------------ */

interface MenubarCheckboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const MenubarCheckboxItem = React.forwardRef<HTMLDivElement, MenubarCheckboxItemProps>(
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
        className={cn(menuStyles.itemWithIndicator, className)}
        onClick={(e) => {
          if (disabled) return;
          onClick?.(e);
          onCheckedChange?.(!checked);
          onOpenChange(false);
        }}
        {...props}
      >
        <span className={menuStyles.indicator}>
          {checked && <Check />}
        </span>
        {children}
      </div>
    );
  },
);
MenubarCheckboxItem.displayName = "MenubarCheckboxItem";

/* ------------------------------------------------------------------ */
/*  RadioItem                                                          */
/* ------------------------------------------------------------------ */

interface MenubarRadioItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

const MenubarRadioItem = React.forwardRef<HTMLDivElement, MenubarRadioItemProps>(
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
        className={cn(menuStyles.itemWithIndicator, className)}
        onClick={(e) => {
          if (disabled) return;
          onClick?.(e);
          radioGroup?.onValueChange(value);
          onOpenChange(false);
        }}
        {...props}
      >
        <span className={menuStyles.indicator}>
          {checked && <Circle className={menuStyles.radioDot} />}
        </span>
        {children}
      </div>
    );
  },
);
MenubarRadioItem.displayName = "MenubarRadioItem";

/* ------------------------------------------------------------------ */
/*  Label                                                              */
/* ------------------------------------------------------------------ */

const MenubarLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(menuStyles.label, inset && menuStyles['label--inset'], className)}
    {...props}
  />
));
MenubarLabel.displayName = "MenubarLabel";

/* ------------------------------------------------------------------ */
/*  Separator                                                          */
/* ------------------------------------------------------------------ */

const MenubarSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn(menuStyles.separator, className)}
    {...props}
  />
));
MenubarSeparator.displayName = "MenubarSeparator";

/* ------------------------------------------------------------------ */
/*  Shortcut                                                           */
/* ------------------------------------------------------------------ */

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn(menuStyles.shortcut, className)} {...props} />
);
MenubarShortcut.displayName = "MenubarShortcut";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};
