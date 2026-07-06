import * as React from "react";
import * as ReactDOM from "react-dom";
import { cn } from "@/lib/utils";
import styles from "./Popover.module.css";

/* ── Context ── */

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  anchorRef: React.RefObject<HTMLElement | null>;
}

const PopoverCtx = React.createContext<PopoverContextValue | null>(null);

function usePopoverCtx() {
  const ctx = React.useContext(PopoverCtx);
  if (!ctx) throw new Error("Popover.* must be used within <Popover>");
  return ctx;
}

/* ── Root ── */

interface PopoverProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Popover({ children, open: controlledOpen, defaultOpen = false, onOpenChange }: PopoverProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const triggerRef = React.useRef<HTMLElement | null>(null);
  const anchorRef = React.useRef<HTMLElement | null>(null);

  const setOpen = React.useCallback((next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }, [isControlled, onOpenChange]);

  return (
    <PopoverCtx.Provider value={{ open: isOpen, setOpen, triggerRef, anchorRef }}>
      {children}
    </PopoverCtx.Provider>
  );
}

/* ── Trigger ── */

interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ children, onClick, asChild, ...props }, ref) => {
    const { open, setOpen, triggerRef } = usePopoverCtx();

    const setRef = (node: HTMLElement | null) => {
      (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node;
      if (typeof ref === 'function') ref(node as HTMLButtonElement | null);
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node as HTMLButtonElement | null;
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(!open);
      onClick?.(e);
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        ref: setRef,
        'aria-expanded': open,
        'aria-haspopup': 'dialog',
        'data-state': open ? 'open' : 'closed',
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          handleClick(e);
          (children as React.ReactElement<any>).props?.onClick?.(e);
        },
      });
    }

    return (
      <button
        ref={setRef as React.Ref<HTMLButtonElement>}
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        data-state={open ? "open" : "closed"}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  },
);
PopoverTrigger.displayName = "PopoverTrigger";

/* ── Anchor ── */

const PopoverAnchor = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => {
    const { anchorRef } = usePopoverCtx();
    return (
      <div
        ref={(node) => {
          (anchorRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);
PopoverAnchor.displayName = "PopoverAnchor";

/* ── Arrow ── */

const PopoverArrow = React.forwardRef<SVGSVGElement, React.SVGAttributes<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      width={12}
      height={6}
      viewBox="0 0 12 6"
      className={cn(styles.popoverArrow, className)}
      {...props}
    >
      <polygon points="0,6 6,0 12,6" />
    </svg>
  ),
);
PopoverArrow.displayName = "PopoverArrow";

/* ── Content ── */

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  sideOffset?: number;
  showArrow?: boolean;
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, align = "center", sideOffset = 8, showArrow = false, children, ...props }, ref) => {
    const { open, setOpen, triggerRef, anchorRef } = usePopoverCtx();
    const contentRef = React.useRef<HTMLDivElement | null>(null);
    const [pos, setPos] = React.useState({ top: 0, left: 0 });

    React.useEffect(() => {
      if (!open) return;
      const anchor = anchorRef.current || triggerRef.current;
      const content = contentRef.current;
      if (!anchor || !content) return;

      const aRect = anchor.getBoundingClientRect();
      const cRect = content.getBoundingClientRect();
      let left = 0;
      const top = aRect.bottom + sideOffset + window.scrollY;

      switch (align) {
        case "start":
          left = aRect.left + window.scrollX;
          break;
        case "end":
          left = aRect.right - cRect.width + window.scrollX;
          break;
        default:
          left = aRect.left + aRect.width / 2 - cRect.width / 2 + window.scrollX;
      }

      setPos({ top, left });
    }, [open, align, sideOffset, triggerRef, anchorRef]);

    // Close on click outside
    React.useEffect(() => {
      if (!open) return;
      const handleClick = (e: MouseEvent) => {
        const content = contentRef.current;
        const trigger = triggerRef.current;
        if (content && !content.contains(e.target as Node) && trigger && !trigger.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, [open, setOpen, triggerRef]);

    // Close on Escape
    React.useEffect(() => {
      if (!open) return;
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setOpen(false);
          triggerRef.current?.focus();
        }
      };
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [open, setOpen, triggerRef]);

    if (!open) return null;

    return ReactDOM.createPortal(
      <div
        ref={(node) => {
          contentRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        role="dialog"
        data-state={open ? "open" : "closed"}
        className={cn(styles.popoverContent, className)}
        style={{ position: "absolute", top: pos.top, left: pos.left }}
        {...props}
      >
        {children}
        {showArrow && <PopoverArrow />}
      </div>,
      document.body,
    );
  },
);
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverAnchor, PopoverContent, PopoverArrow };
