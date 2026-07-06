import * as React from "react";
import * as ReactDOM from "react-dom";
import { cn } from "@/lib/utils";

/* ── Provider ── */

interface TooltipProviderProps {
  children: React.ReactNode;
  delayDuration?: number;
  skipDelayDuration?: number;
}

const TooltipDelayCtx = React.createContext(700);

function TooltipProvider({ children, delayDuration = 700 }: TooltipProviderProps) {
  return (
    <TooltipDelayCtx.Provider value={delayDuration}>
      {children}
    </TooltipDelayCtx.Provider>
  );
}

/* ── Context ── */

interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  delayDuration: number;
}

const TooltipCtx = React.createContext<TooltipContextValue | null>(null);

function useTooltipCtx() {
  const ctx = React.useContext(TooltipCtx);
  if (!ctx) throw new Error("Tooltip.* must be used within <Tooltip>");
  return ctx;
}

/* ── Root ── */

interface TooltipProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
}

function Tooltip({ children, open: controlledOpen, defaultOpen = false, onOpenChange, delayDuration: localDelay }: TooltipProps) {
  const globalDelay = React.useContext(TooltipDelayCtx);
  const delay = localDelay ?? globalDelay;
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const triggerRef = React.useRef<HTMLElement | null>(null);

  const setOpen = React.useCallback((next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }, [isControlled, onOpenChange]);

  return (
    <TooltipCtx.Provider value={{ open: isOpen, setOpen, triggerRef, delayDuration: delay }}>
      {children}
    </TooltipCtx.Provider>
  );
}

/* ── Trigger ── */

const TooltipTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }>(
  ({ children, onMouseEnter, onMouseLeave, onFocus, onBlur, ...props }, ref) => {
    const { setOpen, triggerRef, delayDuration } = useTooltipCtx();
    const timerRef = React.useRef<ReturnType<typeof setTimeout>>();

    const handleEnter = () => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setOpen(true), delayDuration);
    };

    const handleLeave = () => {
      clearTimeout(timerRef.current);
      setOpen(false);
    };

    return (
      <button
        ref={(node) => {
          (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        type="button"
        onMouseEnter={(e) => { handleEnter(); onMouseEnter?.(e); }}
        onMouseLeave={(e) => { handleLeave(); onMouseLeave?.(e); }}
        onFocus={(e) => { handleEnter(); onFocus?.(e); }}
        onBlur={(e) => { handleLeave(); onBlur?.(e); }}
        {...props}
      >
        {children}
      </button>
    );
  },
);
TooltipTrigger.displayName = "TooltipTrigger";

/* ── Content ── */

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, side = "top", align: _align, sideOffset = 4, style, children, ...props }, ref) => {
    const { open, triggerRef } = useTooltipCtx();
    const [pos, setPos] = React.useState({ top: 0, left: 0 });
    const contentRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
      if (!open) return;
      const trigger = triggerRef.current;
      const content = contentRef.current;
      if (!trigger || !content) return;

      const tRect = trigger.getBoundingClientRect();
      const cRect = content.getBoundingClientRect();
      let top = 0, left = 0;

      switch (side) {
        case "top":
          top = tRect.top - cRect.height - sideOffset;
          left = tRect.left + tRect.width / 2 - cRect.width / 2;
          break;
        case "bottom":
          top = tRect.bottom + sideOffset;
          left = tRect.left + tRect.width / 2 - cRect.width / 2;
          break;
        case "left":
          top = tRect.top + tRect.height / 2 - cRect.height / 2;
          left = tRect.left - cRect.width - sideOffset;
          break;
        case "right":
          top = tRect.top + tRect.height / 2 - cRect.height / 2;
          left = tRect.right + sideOffset;
          break;
      }

      setPos({ top: top + window.scrollY, left: left + window.scrollX });
    }, [open, side, sideOffset, triggerRef]);

    if (!open) return null;

    return ReactDOM.createPortal(
      <div
        ref={(node) => {
          contentRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        role="tooltip"
        data-state={open ? "open" : "closed"}
        data-side={side}
        className={cn(
          "z-50 overflow-hidden rounded-lg animate-in fade-in-0 zoom-in-95",
          className,
        )}
        style={{
          position: "absolute",
          top: pos.top,
          left: pos.left,
          backgroundColor: 'var(--ld-semantic-color-surface-inverted, #2E2F32)',
          color: 'var(--ld-semantic-color-text-inverted, #FFFFFF)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)',
          lineHeight: 'var(--ld-semantic-font-body-small-lineheight, 1.25rem)',
          padding: 'var(--ld-primitive-scale-space-50, 0.25rem) var(--ld-primitive-scale-space-100, 0.5rem)',
          boxShadow: 'var(--ld-semantic-elevation-200)',
          pointerEvents: "none",
          ...style,
        }}
        {...props}
      >
        {children}
      </div>,
      document.body,
    );
  },
);
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
