import * as React from 'react';

/**
 * Standalone Slot component (replaces @radix-ui/react-slot).
 *
 * Renders its single child element, merging all Slot props onto that child.
 * This enables the "asChild" pattern where a component renders as its child
 * element instead of its default element.
 */
interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
  return (value: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

function mergeProps(slotProps: Record<string, any>, childProps: Record<string, any>) {
  const merged: Record<string, any> = { ...slotProps };

  for (const key of Object.keys(childProps)) {
    const slotVal = slotProps[key];
    const childVal = childProps[key];

    if (key === 'style') {
      merged[key] = { ...slotVal, ...childVal };
    } else if (key === 'className') {
      merged[key] = [slotVal, childVal].filter(Boolean).join(' ');
    } else if (/^on[A-Z]/.test(key)) {
      // Merge event handlers: call both
      if (typeof slotVal === 'function' && typeof childVal === 'function') {
        merged[key] = (...args: unknown[]) => {
          childVal(...args);
          slotVal(...args);
        };
      } else {
        merged[key] = childVal || slotVal;
      }
    } else {
      merged[key] = childVal !== undefined ? childVal : slotVal;
    }
  }

  return merged;
}

const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, ...slotProps }, forwardedRef) => {
    const child = React.Children.only(children) as React.ReactElement<any>;

    if (!React.isValidElement(child)) {
      return null;
    }

    const childRef = (child as any).ref;
    const mergedRef = mergeRefs(forwardedRef, childRef);
    const mergedAllProps = mergeProps(slotProps, child.props);

    return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
      ...mergedAllProps,
      ref: mergedRef,
    });
  },
);

Slot.displayName = 'Slot';

export { Slot };
export type { SlotProps };
