import * as React from "react";

/* ── Context ── */

interface CollapsibleContextValue {
  open: boolean;
  toggle: () => void;
  disabled: boolean;
}

const CollapsibleCtx = React.createContext<CollapsibleContextValue | null>(null);

function useCollapsible() {
  const ctx = React.useContext(CollapsibleCtx);
  if (!ctx) throw new Error("Collapsible.* must be used within <Collapsible>");
  return ctx;
}

/* ── Root ── */

interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    { open: controlledOpen, defaultOpen = false, onOpenChange, disabled = false, children, ...props },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const toggle = React.useCallback(() => {
      if (disabled) return;
      const next = !isOpen;
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    }, [disabled, isOpen, isControlled, onOpenChange]);

    return (
      <CollapsibleCtx.Provider value={{ open: isOpen, toggle, disabled }}>
        <div ref={ref} data-state={isOpen ? "open" : "closed"} data-disabled={disabled || undefined} {...props}>
          {children}
        </div>
      </CollapsibleCtx.Provider>
    );
  },
);

Collapsible.displayName = "Collapsible";

/* ── Trigger ── */

interface CollapsibleTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({ onClick, children, ...props }, ref) => {
    const { open, toggle, disabled } = useCollapsible();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      toggle();
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={open}
        disabled={disabled}
        data-state={open ? "open" : "closed"}
        data-disabled={disabled || undefined}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  },
);

CollapsibleTrigger.displayName = "CollapsibleTrigger";

/* ── Content ── */

const CollapsibleContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, style, ...props }, ref) => {
    const { open } = useCollapsible();

    if (!open) return null;

    return (
      <div ref={ref} data-state={open ? "open" : "closed"} style={style} {...props}>
        {children}
      </div>
    );
  },
);

CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
