import * as React from "react";
import { ChevronDown } from "@/components/icons";
import { cn } from "@/lib/utils";
import styles from "./NavigationMenu.module.css";

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

interface NavMenuContextValue {
  activeItem: string | null;
  setActiveItem: (id: string | null) => void;
}

const NavMenuCtx = React.createContext<NavMenuContextValue>({
  activeItem: null,
  setActiveItem: () => {},
});

/* ------------------------------------------------------------------ */
/*  Root                                                               */
/* ------------------------------------------------------------------ */

const NavigationMenu = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & { children: React.ReactNode }
>(({ className, children, ...props }, ref) => {
  const [activeItem, setActiveItem] = React.useState<string | null>(null);

  return (
    <NavMenuCtx.Provider value={{ activeItem, setActiveItem }}>
      <nav
        ref={ref}
        className={cn(styles.root, className)}
        {...props}
      >
        {children}
        <NavigationMenuViewport />
      </nav>
    </NavMenuCtx.Provider>
  );
});
NavigationMenu.displayName = "NavigationMenu";

/* ------------------------------------------------------------------ */
/*  List                                                               */
/* ------------------------------------------------------------------ */

const NavigationMenuList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(styles.list, className)}
    {...props}
  />
));
NavigationMenuList.displayName = "NavigationMenuList";

/* ------------------------------------------------------------------ */
/*  Item                                                               */
/* ------------------------------------------------------------------ */

interface ItemContextValue {
  itemId: string;
}
const ItemCtx = React.createContext<ItemContextValue>({ itemId: '' });

const NavigationMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ children, ...props }, ref) => {
  const itemId = React.useId();

  return (
    <ItemCtx.Provider value={{ itemId }}>
      <li ref={ref} style={{ position: 'relative' }} {...props}>
        {children}
      </li>
    </ItemCtx.Provider>
  );
});
NavigationMenuItem.displayName = "NavigationMenuItem";

/* ------------------------------------------------------------------ */
/*  Trigger style helper                                               */
/* ------------------------------------------------------------------ */

const navigationMenuTriggerStyle = () => styles.triggerStyle;

/* ------------------------------------------------------------------ */
/*  Trigger                                                            */
/* ------------------------------------------------------------------ */

const NavigationMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, onClick, ...props }, ref) => {
  const { activeItem, setActiveItem } = React.useContext(NavMenuCtx);
  const { itemId } = React.useContext(ItemCtx);
  const isOpen = activeItem === itemId;

  return (
    <button
      ref={ref}
      type="button"
      className={cn(styles.trigger, className)}
      data-state={isOpen ? 'open' : 'closed'}
      aria-expanded={isOpen}
      onClick={(e) => {
        onClick?.(e);
        setActiveItem(isOpen ? null : itemId);
      }}
      onMouseEnter={() => setActiveItem(itemId)}
      {...props}
    >
      {children}{" "}
      <ChevronDown
        className={styles.chevron}
        aria-hidden="true"
      />
    </button>
  );
});
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const NavigationMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { activeItem } = React.useContext(NavMenuCtx);
  const { itemId } = React.useContext(ItemCtx);
  const isOpen = activeItem === itemId;

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      data-state="open"
      className={cn(styles.content, className)}
      {...props}
    />
  );
});
NavigationMenuContent.displayName = "NavigationMenuContent";

/* ------------------------------------------------------------------ */
/*  Link                                                               */
/* ------------------------------------------------------------------ */

const NavigationMenuLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { active?: boolean; onSelect?: () => void }
>(({ className, active, onSelect, onClick, ...props }, ref) => {
  const { setActiveItem } = React.useContext(NavMenuCtx);

  return (
    <a
      ref={ref}
      data-active={active || undefined}
      className={cn(styles.triggerStyle, className)}
      onClick={(e) => {
        onClick?.(e);
        onSelect?.();
        setActiveItem(null);
      }}
      {...props}
    />
  );
});
NavigationMenuLink.displayName = "NavigationMenuLink";

/* ------------------------------------------------------------------ */
/*  Viewport                                                           */
/* ------------------------------------------------------------------ */

const NavigationMenuViewport = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { activeItem, setActiveItem } = React.useContext(NavMenuCtx);

  React.useEffect(() => {
    if (!activeItem) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Close if clicking outside the nav
      if (!target.closest('nav')) {
        setActiveItem(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveItem(null);
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeItem, setActiveItem]);

  return (
    <div className={styles.viewportWrapper}>
      <div
        ref={ref}
        data-state={activeItem ? 'open' : 'closed'}
        className={cn(styles.viewport, className)}
        style={{
          display: activeItem ? undefined : 'none',
        }}
        {...props}
      />
    </div>
  );
});
NavigationMenuViewport.displayName = "NavigationMenuViewport";

/* ------------------------------------------------------------------ */
/*  Indicator                                                          */
/* ------------------------------------------------------------------ */

const NavigationMenuIndicator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { activeItem } = React.useContext(NavMenuCtx);

  return (
    <div
      ref={ref}
      data-state={activeItem ? 'visible' : 'hidden'}
      className={cn(styles.indicator, className)}
      style={{ display: activeItem ? undefined : 'none' }}
      {...props}
    >
      <div className={styles.indicatorArrow} />
    </div>
  );
});
NavigationMenuIndicator.displayName = "NavigationMenuIndicator";

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
