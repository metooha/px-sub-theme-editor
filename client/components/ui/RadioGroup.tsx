import * as React from 'react';

import { cn } from '@/lib/utils';

/* ── RadioGroup Context ── */

interface RadioGroupContextValue {
  name: string | undefined;
  value: string | undefined;
  disabled: boolean;
  required: boolean;
  onValueChange: (value: string) => void;
}

const RadioGroupCtx = React.createContext<RadioGroupContextValue | null>(null);

export function useRadioGroupContext() {
  return React.useContext(RadioGroupCtx);
}

/* ── RadioGroup ── */

interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  orientation?: 'horizontal' | 'vertical';
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      disabled = false,
      required = false,
      name,
      orientation = 'vertical',
      className,
      children,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
    const currentValue = isControlled ? controlledValue : internalValue;
    const containerRef = React.useRef<HTMLDivElement>(null);

    const handleValueChange = React.useCallback(
      (val: string) => {
        if (!isControlled) setInternalValue(val);
        onValueChange?.(val);
      },
      [isControlled, onValueChange],
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container) return;

      const radios = Array.from(
        container.querySelectorAll<HTMLButtonElement>('[role="radio"]:not([disabled])'),
      );
      if (radios.length === 0) return;

      const currentIndex = radios.findIndex((r) => r === document.activeElement);
      let nextIndex = -1;

      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          nextIndex = currentIndex < radios.length - 1 ? currentIndex + 1 : 0;
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          nextIndex = currentIndex > 0 ? currentIndex - 1 : radios.length - 1;
          break;
        default:
          break;
      }

      if (nextIndex >= 0) {
        radios[nextIndex].focus();
        radios[nextIndex].click();
      }

      onKeyDown?.(e);
    };

    return (
      <RadioGroupCtx.Provider
        value={{ name, value: currentValue, disabled, required, onValueChange: handleValueChange }}
      >
        <div
          ref={(node) => {
            (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          role="radiogroup"
          aria-orientation={orientation}
          aria-required={required || undefined}
          aria-disabled={disabled || undefined}
          className={cn('grid gap-[var(--ld-primitive-scale-space-150,12px)]', className)}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      </RadioGroupCtx.Provider>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';

export { RadioGroup };

// Re-export the LD 3.5 Radio item component for convenience
export { Radio } from './Radio';
export type { RadioProps } from './Radio';
