import * as React from "react";
import { ChevronDown } from "@/components/icons";
import { cn } from "@/lib/utils";

/* ── Context ── */

interface AccordionContextValue {
  type: "single" | "multiple";
  value: string[];
  toggle: (itemValue: string) => void;
}

const AccordionCtx = React.createContext<AccordionContextValue | null>(null);

function useAccordionCtx() {
  const ctx = React.useContext(AccordionCtx);
  if (!ctx) throw new Error("Accordion.* must be used within <Accordion>");
  return ctx;
}

const AccordionItemCtx = React.createContext<string>("");

/* ── Root ── */

type AccordionSingleProps = {
  type: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  collapsible?: boolean;
};

type AccordionMultipleProps = {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
};

type AccordionProps = (AccordionSingleProps | AccordionMultipleProps) &
  React.HTMLAttributes<HTMLDivElement>;

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => {
    const { type, children, className, ...rest } = props;

    if (type === "single") {
      return <AccordionSingle ref={ref} className={className} {...(rest as any)} {...{ type }}>{children}</AccordionSingle>;
    }
    return <AccordionMultiple ref={ref} className={className} {...(rest as any)} {...{ type }}>{children}</AccordionMultiple>;
  },
);
Accordion.displayName = "Accordion";

const AccordionSingle = React.forwardRef<HTMLDivElement, AccordionSingleProps & React.HTMLAttributes<HTMLDivElement>>(
  ({ value: controlledValue, defaultValue = "", onValueChange, collapsible = false, children, className, type: _, ...props }, ref) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const current = isControlled ? controlledValue : internalValue;

    const toggle = React.useCallback((itemValue: string) => {
      const next = current === itemValue ? (collapsible ? "" : current) : itemValue;
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    }, [current, collapsible, isControlled, onValueChange]);

    return (
      <AccordionCtx.Provider value={{ type: "single", value: current ? [current] : [], toggle }}>
        <div ref={ref} className={cn(className)} data-orientation="vertical" {...props}>{children}</div>
      </AccordionCtx.Provider>
    );
  },
);

const AccordionMultiple = React.forwardRef<HTMLDivElement, AccordionMultipleProps & React.HTMLAttributes<HTMLDivElement>>(
  ({ value: controlledValue, defaultValue = [], onValueChange, children, className, type: _, ...props }, ref) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const current = isControlled ? controlledValue : internalValue;

    const toggle = React.useCallback((itemValue: string) => {
      const next = current.includes(itemValue)
        ? current.filter((v) => v !== itemValue)
        : [...current, itemValue];
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    }, [current, isControlled, onValueChange]);

    return (
      <AccordionCtx.Provider value={{ type: "multiple", value: current, toggle }}>
        <div ref={ref} className={cn(className)} data-orientation="vertical" {...props}>{children}</div>
      </AccordionCtx.Provider>
    );
  },
);

/* ── Item ── */

const AccordionItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string }>(
  ({ className, value, children, ...props }, ref) => {
    const { value: openValues } = useAccordionCtx();
    const isOpen = openValues.includes(value);

    return (
      <AccordionItemCtx.Provider value={value}>
        <div
          ref={ref}
          data-state={isOpen ? "open" : "closed"}
          className={cn(className)}
          style={{ borderBottom: '1px solid var(--ld-semantic-color-separator, #E3E4E5)' }}
          {...props}
        >
          {children}
        </div>
      </AccordionItemCtx.Provider>
    );
  },
);
AccordionItem.displayName = "AccordionItem";

/* ── Trigger ── */

const AccordionTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    const { toggle } = useAccordionCtx();
    const itemValue = React.useContext(AccordionItemCtx);
    const { value: openValues } = useAccordionCtx();
    const isOpen = openValues.includes(itemValue);

    return (
      <h3 className="flex">
        <button
          ref={ref}
          type="button"
          aria-expanded={isOpen}
          data-state={isOpen ? "open" : "closed"}
          className={cn(
            "flex flex-1 items-center justify-between transition-all [&[data-state=open]>svg]:rotate-180",
            className,
          )}
          style={{
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            fontWeight: 'var(--ld-semantic-font-body-medium-weight-bold, 700)' as any,
            fontSize: 'var(--ld-semantic-font-body-medium-size, 1rem)',
            lineHeight: 'var(--ld-semantic-font-body-medium-lineheight, 1.5)',
            color: 'var(--ld-semantic-color-text, #2E2F32)',
            padding: 'var(--ld-primitive-scale-space-200, 1rem) 0',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            textAlign: 'left',
          }}
          onClick={() => toggle(itemValue)}
          {...props}
        >
          {children}
          <ChevronDown
            className="shrink-0 transition-transform duration-200"
            style={{
              width: 'var(--ld-semantic-scale-icon-small, 1rem)',
              height: 'var(--ld-semantic-scale-icon-small, 1rem)',
              color: 'var(--ld-semantic-color-text-subtle, #74767C)',
            }}
          />
        </button>
      </h3>
    );
  },
);
AccordionTrigger.displayName = "AccordionTrigger";

/* ── Content ── */

const AccordionContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const itemValue = React.useContext(AccordionItemCtx);
    const { value: openValues } = useAccordionCtx();
    const isOpen = openValues.includes(itemValue);

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        role="region"
        data-state={isOpen ? "open" : "closed"}
        className="overflow-hidden"
        {...props}
      >
        <div
          className={cn(className)}
          style={{
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)',
            lineHeight: 'var(--ld-semantic-font-body-small-lineheight, 1.25rem)',
            color: 'var(--ld-semantic-color-text, #2E2F32)',
            paddingBottom: 'var(--ld-primitive-scale-space-200, 1rem)',
          }}
        >
          {children}
        </div>
      </div>
    );
  },
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
