import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import styles from "./Toggle.module.css";

export type ToggleSize = "small" | "medium" | "large";
export type ToggleVariant = "default" | "outline";
export type ToggleShape = "square" | "rounded";

/**
 * CVA stub kept for ToggleGroup context compatibility.
 * Actual styling is driven entirely by the CSS module using LD 3.5 tokens.
 */
const toggleVariants = cva("", {
  variants: {
    variant: {
      default: "",
      outline: "",
    },
    size: {
      default: "",
      sm: "",
      lg: "",
      small: "",
      medium: "",
      large: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

/* Maps legacy CVA size keys to CSS module size keys */
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

export interface ToggleProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "style"
  > {
  /** Whether the toggle is pressed. */
  pressed?: boolean;
  /** Default pressed state (uncontrolled). */
  defaultPressed?: boolean;
  /** Callback when pressed state changes. */
  onPressedChange?: (pressed: boolean) => void;
  /** Visual variant. @default "default" */
  variant?: ToggleVariant;
  /** Size of the toggle button. @default "medium" */
  size?: ToggleSize | "default" | "sm" | "lg";
  /** Shape of the toggle button. @default "square" */
  shape?: ToggleShape;
  /** Escape-hatch class name. */
  UNSAFE_className?: string;
  /** Escape-hatch inline style. */
  UNSAFE_style?: React.CSSProperties;
  /** @deprecated Use UNSAFE_className instead. Kept for Shadcn compat. */
  className?: string;
}

/**
 * Toggle component – Living Design 3.5
 *
 * A two-state button that mirrors LD 3.5 Icon Button tokens for background,
 * border, text/icon colour, hover, pressed, focus-outline, and disabled states.
 */
const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      pressed: controlledPressed,
      defaultPressed = false,
      onPressedChange,
      variant = "default",
      size = "medium",
      shape = "square",
      disabled,
      UNSAFE_className,
      UNSAFE_style,
      className,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const isControlled = controlledPressed !== undefined;
    const [internalPressed, setInternalPressed] = React.useState(defaultPressed);
    const isPressed = isControlled ? controlledPressed : internalPressed;
    const resolved = resolveSize(size);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      const next = !isPressed;
      if (!isControlled) setInternalPressed(next);
      onPressedChange?.(next);
      onClick?.(e);
    };

    const cls = [
      styles.toggle,
      styles[`toggle--variant-${variant}`],
      styles[`toggle--size-${resolved}`],
      styles[`toggle--shape-${shape}`],
      UNSAFE_className,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={isPressed}
        data-state={isPressed ? "on" : "off"}
        disabled={disabled}
        className={cls}
        style={UNSAFE_style}
        onClick={handleClick}
        {...props}
      >
        <span className={styles.toggle__content}>{children}</span>
      </button>
    );
  },
);

Toggle.displayName = "Toggle";

export { Toggle, toggleVariants };
