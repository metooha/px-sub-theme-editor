import * as React from "react";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  ),
);
Avatar.displayName = "Avatar";

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  onLoadingStatusChange?: (status: "loading" | "loaded" | "error") => void;
}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, alt, onLoadingStatusChange, onLoad, onError, ...props }, ref) => {
    const [status, setStatus] = React.useState<"loading" | "loaded" | "error">("loading");

    React.useEffect(() => {
      setStatus("loading");
    }, [src]);

    React.useEffect(() => {
      onLoadingStatusChange?.(status);
    }, [status, onLoadingStatusChange]);

    return (
      <img
        ref={ref}
        className={cn("aspect-square h-full w-full", className)}
        src={src}
        alt={alt}
        onLoad={(e) => {
          setStatus("loaded");
          onLoad?.(e);
        }}
        onError={(e) => {
          setStatus("error");
          onError?.(e);
        }}
        style={status === "loaded" ? undefined : { display: "none" }}
        {...props}
      />
    );
  },
);
AvatarImage.displayName = "AvatarImage";

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {
  delayMs?: number;
}

const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, delayMs, children, ...props }, ref) => {
    const [show, setShow] = React.useState(!delayMs);

    React.useEffect(() => {
      if (!delayMs) return;
      const timer = setTimeout(() => setShow(true), delayMs);
      return () => clearTimeout(timer);
    }, [delayMs]);

    if (!show) return null;

    return (
      <span
        ref={ref}
        className={cn(
          "flex h-full w-full items-center justify-center rounded-full",
          className,
        )}
        style={{
          backgroundColor: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)',
          color: 'var(--ld-semantic-color-text, #2E2F32)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)',
          fontWeight: 700,
        }}
        {...props}
      >
        {children}
      </span>
    );
  },
);
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
