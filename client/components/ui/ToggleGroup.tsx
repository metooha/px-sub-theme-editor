import * as React from "react";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { toggleVariants, type ToggleVariant, type ToggleSize } from "@/components/ui/Toggle";
import styles from "./Toggle.module.css";

/* ── Context ── */

const ToggleGroupContext = React.createContext<{
  size?: string | null;
  variant?: string | null;
}>({
  size: "default",
  variant: "default",
});

/* ── Helpers ── */

function resolveSize(size: string | null | undefined): ToggleSize {
  switch (size) {
    case "sm":
    case "small":
      return "small";
    case "lg":
    case "large":
      return "large";
    default:
      return "medium";
  }
}

/* ── Root ── */

type ToggleGroupSingleProps = {
  type: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

type ToggleGroupMultipleProps = {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
};

type ToggleGroupProps = (ToggleGroupSingleProps | ToggleGroupMultipleProps) &
  React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof toggleVariants>;

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    if (props.type === "single") {
      return (
        <ToggleGroupSingle ref={ref} className={className} variant={variant} size={size} {...(props as ToggleGroupSingleProps & React.HTMLAttributes<HTMLDivElement>)}>
          {children}
        </ToggleGroupSingle>
      );
    }
    return (
      <ToggleGroupMultiple ref={ref} className={className} variant={variant} size={size} {...(props as ToggleGroupMultipleProps & React.HTMLAttributes<HTMLDivElement>)}>
        {children}
      </ToggleGroupMultiple>
    );
  },
);
ToggleGroup.displayName = "ToggleGroup";

/* ── Single ── */

interface ToggleGroupInternalProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ToggleVariant | string | null;
  size?: ToggleSize | string | null;
}

const ToggleGroupSingleCtx = React.createContext<{
  value: string;
  onItemClick: (val: string) => void;
}>({ value: "", onItemClick: () => {} });

const ToggleGroupSingle = React.forwardRef<HTMLDivElement, ToggleGroupSingleProps & ToggleGroupInternalProps>(
  ({ value: controlledValue, defaultValue = "", onValueChange, variant, size, className, children, type: _, ...props }, ref) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const current = isControlled ? controlledValue : internalValue;

    const onItemClick = React.useCallback((val: string) => {
      const next = current === val ? "" : val;
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    }, [current, isControlled, onValueChange]);

    return (
      <ToggleGroupContext.Provider value={{ variant, size }}>
        <ToggleGroupSingleCtx.Provider value={{ value: current, onItemClick }}>
          <div ref={ref} role="group" className={cn("flex items-center justify-center gap-1", className)} {...props}>
            {children}
          </div>
        </ToggleGroupSingleCtx.Provider>
      </ToggleGroupContext.Provider>
    );
  },
);

/* ── Multiple ── */

const ToggleGroupMultipleCtx = React.createContext<{
  value: string[];
  onItemClick: (val: string) => void;
}>({ value: [], onItemClick: () => {} });

const ToggleGroupMultiple = React.forwardRef<HTMLDivElement, ToggleGroupMultipleProps & ToggleGroupInternalProps>(
  ({ value: controlledValue, defaultValue = [], onValueChange, variant, size, className, children, type: _, ...props }, ref) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const current = isControlled ? controlledValue : internalValue;

    const onItemClick = React.useCallback((val: string) => {
      const next = current.includes(val) ? current.filter((v) => v !== val) : [...current, val];
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    }, [current, isControlled, onValueChange]);

    return (
      <ToggleGroupContext.Provider value={{ variant, size }}>
        <ToggleGroupMultipleCtx.Provider value={{ value: current, onItemClick }}>
          <div ref={ref} role="group" className={cn("flex items-center justify-center gap-1", className)} {...props}>
            {children}
          </div>
        </ToggleGroupMultipleCtx.Provider>
      </ToggleGroupContext.Provider>
    );
  },
);

/* ── Item ── */

interface ToggleGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  variant?: ToggleVariant;
  size?: ToggleSize | "default" | "sm" | "lg";
}

const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ className, children, value, variant, size, disabled, onClick, ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext);
    const singleCtx = React.useContext(ToggleGroupSingleCtx);
    const multiCtx = React.useContext(ToggleGroupMultipleCtx);

    const resolvedVariant = (context.variant || variant || "default") as ToggleVariant;
    const resolvedSize = resolveSize(context.size || size);

    // Determine if pressed
    const isPressed = singleCtx.onItemClick !== (() => {})
      ? singleCtx.value === value
      : multiCtx.value.includes(value);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (singleCtx.onItemClick) singleCtx.onItemClick(value);
      else if (multiCtx.onItemClick) multiCtx.onItemClick(value);
      onClick?.(e);
    };

    const cls = [
      styles.toggle,
      styles[`toggle--variant-${resolvedVariant}`],
      styles[`toggle--size-${resolvedSize}`],
      className,
    ].filter(Boolean).join(" ");

    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={isPressed}
        aria-pressed={isPressed}
        data-state={isPressed ? "on" : "off"}
        disabled={disabled}
        className={cls}
        onClick={handleClick}
        {...props}
      >
        <span className={styles.toggle__content}>{children}</span>
      </button>
    );
  },
);
ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
