import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(labelVariants(), className)}
    style={{
      fontFamily: 'var(--ld-semantic-font-family-sans)',
      fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)',
      fontWeight: 'var(--ld-semantic-font-body-small-weight-bold, 700)' as any,
      color: 'var(--ld-semantic-color-text, #2E2F32)',
    }}
    {...props}
  />
));
Label.displayName = "Label";

export { Label };
