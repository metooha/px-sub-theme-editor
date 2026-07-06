import * as React from "react";

import { cn } from "@/lib/utils";

interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  min?: number;
  max?: number;
  step?: number;
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  name?: string;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      min = 0,
      max = 100,
      step = 1,
      value: controlledValue,
      defaultValue = [0],
      onValueChange,
      disabled = false,
      name,
      ...props
    },
    ref,
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = isControlled ? controlledValue : internalValue;
    const val = currentValue[0] ?? min;
    const pct = ((val - min) / (max - min)) * 100;

    const trackRef = React.useRef<HTMLDivElement>(null);
    const isDragging = React.useRef(false);

    const updateValue = React.useCallback(
      (clientX: number) => {
        const track = trackRef.current;
        if (!track || disabled) return;
        const rect = track.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const raw = min + ratio * (max - min);
        const stepped = Math.round(raw / step) * step;
        const clamped = Math.max(min, Math.min(max, stepped));
        const next = [clamped];
        if (!isControlled) setInternalValue(next);
        onValueChange?.(next);
      },
      [disabled, min, max, step, isControlled, onValueChange],
    );

    React.useEffect(() => {
      if (!isDragging.current) return;
      const handleMove = (e: MouseEvent) => updateValue(e.clientX);
      const handleUp = () => { isDragging.current = false; };
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleUp);
      return () => {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleUp);
      };
    });

    const handleTrackMouseDown = (e: React.MouseEvent) => {
      if (disabled) return;
      isDragging.current = true;
      updateValue(e.clientX);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      let next = val;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          next = Math.min(max, val + step);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          next = Math.max(min, val - step);
          break;
        case "Home":
          next = min;
          break;
        case "End":
          next = max;
          break;
        default:
          return;
      }
      e.preventDefault();
      const arr = [next];
      if (!isControlled) setInternalValue(arr);
      onValueChange?.(arr);
    };

    return (
      <div
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}
      >
        <div
          ref={trackRef}
          className="relative h-2 w-full grow overflow-hidden rounded-full cursor-pointer"
          style={{ backgroundColor: "var(--ld-semantic-color-fill-subtle, #F5F5F6)" }}
          onMouseDown={handleTrackMouseDown}
        >
          <div
            className="absolute h-full"
            style={{
              backgroundColor: "var(--ld-semantic-color-action-fill-primary, #0071DC)",
              width: `${pct}%`,
            }}
          />
        </div>
        <span
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={val}
          aria-disabled={disabled || undefined}
          className="block h-5 w-5 rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          style={{
            position: "absolute",
            left: `calc(${pct}% - 10px)`,
            borderColor: "var(--ld-semantic-color-action-fill-primary, #0071DC)",
            backgroundColor: "var(--ld-semantic-color-surface, white)",
            cursor: disabled ? "not-allowed" : "grab",
          }}
          onMouseDown={(e) => {
            if (disabled) return;
            isDragging.current = true;
            e.preventDefault();
          }}
          onKeyDown={handleKeyDown}
        />
        {name && <input type="hidden" name={name} value={val} />}
      </div>
    );
  },
);

Slider.displayName = "Slider";

export { Slider };
