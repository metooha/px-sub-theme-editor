import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { X } from '@/components/icons';
import { IconButton } from '@/components/ui/IconButton';
import { cn } from '@/lib/utils';
import styles from './Modal.module.css';

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

interface ModalContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModalCtx = React.createContext<ModalContextValue | null>(null);

function useModalCtx() {
  const ctx = React.useContext(ModalCtx);
  if (!ctx) throw new Error('Modal compound components must be used within <Modal>');
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  Root                                                               */
/* ------------------------------------------------------------------ */

export interface ModalProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function Modal({ open: controlledOpen, defaultOpen = false, onOpenChange, children }: ModalProps) {
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
    <ModalCtx.Provider value={{ open: isOpen, onOpenChange: handleChange }}>
      {children}
    </ModalCtx.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Trigger                                                            */
/* ------------------------------------------------------------------ */

export const ModalTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ onClick, children, asChild, ...props }, ref) => {
  const { onOpenChange } = useModalCtx();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    onOpenChange(true);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: handleClick,
    });
  }

  return (
    <button ref={ref} type="button" onClick={handleClick} {...props}>
      {children}
    </button>
  );
});
ModalTrigger.displayName = 'ModalTrigger';

/* ------------------------------------------------------------------ */
/*  Portal                                                             */
/* ------------------------------------------------------------------ */

export function ModalPortal({ children }: { children: React.ReactNode }) {
  return ReactDOM.createPortal(children, document.body);
}

/* ------------------------------------------------------------------ */
/*  Close                                                              */
/* ------------------------------------------------------------------ */

export const ModalClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ onClick, children, asChild, ...props }, ref) => {
  const { onOpenChange } = useModalCtx();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    onOpenChange(false);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: handleClick,
    });
  }

  return (
    <button ref={ref} type="button" onClick={handleClick} {...props}>
      {children}
    </button>
  );
});
ModalClose.displayName = 'ModalClose';

/* ------------------------------------------------------------------ */
/*  Overlay                                                            */
/* ------------------------------------------------------------------ */

export const ModalOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, onClick, ...props }, ref) => {
  const { onOpenChange } = useModalCtx();

  return (
    <div
      ref={ref}
      className={cn(styles.overlay, className)}
      data-state="open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false);
        onClick?.(e);
      }}
      {...props}
    />
  );
});
ModalOverlay.displayName = 'ModalOverlay';

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

export interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large';
  maxWidth?: string;
  hideClose?: boolean;
}

export const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, children, size = 'medium', maxWidth, hideClose = false, ...props }, ref) => {
    const { open, onOpenChange } = useModalCtx();
    const contentRef = React.useRef<HTMLDivElement>(null);

    // Merge refs
    const mergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref],
    );

    // Focus trap + escape key
    React.useEffect(() => {
      if (!open) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.stopPropagation();
          onOpenChange(false);
          return;
        }

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

      // Lock body scroll
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Auto-focus content
      requestAnimationFrame(() => {
        contentRef.current?.focus();
      });

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = prevOverflow;
      };
    }, [open, onOpenChange]);

    if (!open) return null;

    const sizeClass = size === 'small' ? styles.small : size === 'large' ? styles.large : styles.medium;

    return (
      <ModalPortal>
        <ModalOverlay />
        <div
          ref={mergedRef}
          role="dialog"
          aria-modal="true"
          data-state="open"
          tabIndex={-1}
          className={cn(styles.content, sizeClass, className)}
          style={maxWidth ? { maxWidth } : undefined}
          {...props}
        >
          {children}
          {!hideClose && (
            <ModalClose asChild>
              <IconButton
                variant="ghost"
                size="medium"
                shape="rounded"
                aria-label="Close"
                UNSAFE_className={styles.closeButton}
              >
                <X style={{ width: 20, height: 20 }} />
              </IconButton>
            </ModalClose>
          )}
        </div>
      </ModalPortal>
    );
  },
);
ModalContent.displayName = 'ModalContent';

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */

export const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(styles.header, className)} {...props} />
));
ModalHeader.displayName = 'ModalHeader';

/* ------------------------------------------------------------------ */
/*  Title                                                              */
/* ------------------------------------------------------------------ */

export const ModalTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn(styles.title, className)} {...props} />
));
ModalTitle.displayName = 'ModalTitle';

/* ------------------------------------------------------------------ */
/*  Description                                                        */
/* ------------------------------------------------------------------ */

export const ModalDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn(styles.description, className)} {...props} />
));
ModalDescription.displayName = 'ModalDescription';

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

export const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(styles.footer, className)} {...props} />
));
ModalFooter.displayName = 'ModalFooter';
