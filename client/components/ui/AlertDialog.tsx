import * as React from "react";
import * as ReactDOM from "react-dom";
import { cn } from "@/lib/utils";
import { Button, type ButtonVariant, type ButtonSize } from "@/components/ui/Button";

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

interface AlertDialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlertDialogCtx = React.createContext<AlertDialogContextValue | null>(null);

function useAlertDialogCtx() {
  const ctx = React.useContext(AlertDialogCtx);
  if (!ctx) throw new Error('AlertDialog compound components must be used within <AlertDialog>');
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  Root                                                               */
/* ------------------------------------------------------------------ */

interface AlertDialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function AlertDialog({ open: controlledOpen, defaultOpen = false, onOpenChange, children }: AlertDialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const handleChange = React.useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange],
  );

  return (
    <AlertDialogCtx.Provider value={{ open: isOpen, onOpenChange: handleChange }}>
      {children}
    </AlertDialogCtx.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Trigger                                                            */
/* ------------------------------------------------------------------ */

const AlertDialogTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ onClick, children, asChild, ...props }, ref) => {
  const { onOpenChange } = useAlertDialogCtx();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    onOpenChange(true);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ref,
      onClick: handleClick,
    });
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
});
AlertDialogTrigger.displayName = "AlertDialogTrigger";

/* ------------------------------------------------------------------ */
/*  Portal                                                             */
/* ------------------------------------------------------------------ */

function AlertDialogPortal({ children }: { children: React.ReactNode }) {
  return ReactDOM.createPortal(children, document.body);
}

/* ------------------------------------------------------------------ */
/*  Overlay                                                            */
/* ------------------------------------------------------------------ */

const AlertDialogOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    style={{
      backgroundColor: 'var(--ld-semantic-color-scrim, rgba(0, 0, 0, 0.6))',
    }}
    data-state="open"
    {...props}
  />
));
AlertDialogOverlay.displayName = "AlertDialogOverlay";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const AlertDialogContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { open, onOpenChange } = useAlertDialogCtx();
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

    const handleKeyDown = (e: KeyboardEvent) => {
      // Alert dialogs should NOT close on Escape (unlike regular dialogs)
      // Only action/cancel buttons dismiss them

      // Focus trap
      if (e.key === 'Tab' && contentRef.current) {
        const focusable = contentRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      contentRef.current?.focus();
    });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <div
        ref={mergedRef}
        role="alertdialog"
        aria-modal="true"
        data-state="open"
        tabIndex={-1}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          className,
        )}
        style={{
          backgroundColor: 'var(--ld-semantic-color-surface-overlay, #FFFFFF)',
          color: 'var(--ld-semantic-color-text, #2E2F32)',
          boxShadow: 'var(--ld-semantic-elevation-300)',
          padding: 'var(--ld-primitive-scale-space-300, 1.5rem)',
          gap: 'var(--ld-primitive-scale-space-200, 1rem)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          borderRadius: 'var(--ld-primitive-scale-borderradius-100, 16px)',
        }}
        {...props}
      >
        {children}
      </div>
    </AlertDialogPortal>
  );
});
AlertDialogContent.displayName = "AlertDialogContent";

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col", className)}
    style={{ gap: 'var(--ld-primitive-scale-space-100, 0.5rem)' }}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end", className)}
    style={{ gap: 'var(--ld-primitive-scale-space-150, 0.75rem)', marginTop: 'var(--ld-primitive-scale-space-100, 0.5rem)' }}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

/* ------------------------------------------------------------------ */
/*  Title                                                              */
/* ------------------------------------------------------------------ */

const AlertDialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(className)}
    style={{
      fontFamily: 'var(--ld-semantic-font-heading-medium-family, var(--ld-semantic-font-family-sans))',
      fontSize: 'var(--ld-semantic-font-heading-medium-size, 20px)',
      fontWeight: 700,
      lineHeight: 'var(--ld-semantic-font-heading-medium-lineHeight, 28px)',
      color: 'var(--ld-semantic-color-text, #2E2F32)',
      margin: 0,
    }}
    {...props}
  />
));
AlertDialogTitle.displayName = "AlertDialogTitle";

/* ------------------------------------------------------------------ */
/*  Description                                                        */
/* ------------------------------------------------------------------ */

const AlertDialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(className)}
    style={{
      fontFamily: 'var(--ld-semantic-font-body-medium-family, var(--ld-semantic-font-family-sans))',
      fontSize: 'var(--ld-semantic-font-body-medium-size, 16px)',
      fontWeight: 400,
      lineHeight: 'var(--ld-semantic-font-body-medium-lineHeight, 24px)',
      color: 'var(--ld-semantic-color-text-subtle, #515357)',
      margin: 0,
    }}
    {...props}
  />
));
AlertDialogDescription.displayName = "AlertDialogDescription";

/* ------------------------------------------------------------------ */
/*  Action                                                             */
/* ------------------------------------------------------------------ */

interface AlertDialogActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const AlertDialogAction = React.forwardRef<HTMLButtonElement, AlertDialogActionProps>(
  ({ children, variant = 'primary', size = 'small', className, onClick, ...props }, ref) => {
    const { onOpenChange } = useAlertDialogCtx();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        UNSAFE_className={className}
        onClick={(e) => {
          onClick?.(e as any);
          onOpenChange(false);
        }}
        {...(props as any)}
      >
        {children}
      </Button>
    );
  },
);
AlertDialogAction.displayName = "AlertDialogAction";

/* ------------------------------------------------------------------ */
/*  Cancel                                                             */
/* ------------------------------------------------------------------ */

interface AlertDialogCancelProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const AlertDialogCancel = React.forwardRef<HTMLButtonElement, AlertDialogCancelProps>(
  ({ children, variant = 'secondary', size = 'small', className, onClick, ...props }, ref) => {
    const { onOpenChange } = useAlertDialogCtx();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        UNSAFE_className={className}
        onClick={(e) => {
          onClick?.(e as any);
          onOpenChange(false);
        }}
        {...(props as any)}
      >
        {children}
      </Button>
    );
  },
);
AlertDialogCancel.displayName = "AlertDialogCancel";

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
