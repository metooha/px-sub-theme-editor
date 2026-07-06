import * as React from 'react';
import styles from './Tab.module.css';

/**
 * Context for managing tab state
 */
interface TabsContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Tab components must be used within a Tabs component');
  }
  return context;
}

/**
 * Props for the Tabs root component
 */
export interface TabsProps {
  /**
   * The controlled value of the active tab
   */
  value?: string;
  
  /**
   * The default value for uncontrolled usage
   */
  defaultValue?: string;
  
  /**
   * Callback when the active tab changes
   */
  onValueChange?: (value: string) => void;
  
  /**
   * The tab triggers and content panels
   */
  children: React.ReactNode;
  
  /**
   * Unsafe escape hatch for custom className
   */
  UNSAFE_className?: string;
  
  /**
   * Unsafe escape hatch for custom styles
   */
  UNSAFE_style?: React.CSSProperties;
}

/**
 * Tabs - Root container component for tab navigation
 * 
 * Manages the active tab state and provides context to child components.
 * Can be used in controlled or uncontrolled mode.
 */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const {
    value: controlledValue,
    defaultValue,
    onValueChange,
    children,
    UNSAFE_className,
    UNSAFE_style,
  } = props;
  
  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  
  // Determine if controlled or uncontrolled
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  
  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange]
  );
  
  const contextValue = React.useMemo(
    () => ({
      value,
      onValueChange: handleValueChange,
    }),
    [value, handleValueChange]
  );
  
  return (
    <TabsContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={UNSAFE_className}
        style={UNSAFE_style}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
});

Tabs.displayName = 'Tabs';

/**
 * Props for the TabList component
 */
export interface TabListProps {
  /**
   * The tab triggers to display
   */
  children: React.ReactNode;

  /**
   * Visual variant of the tab list
   * - 'default': Transparent background with blue tint on hover/active
   * - 'filled': White surface background for use on colored/subtle page backgrounds
   * @default 'default'
   */
  variant?: 'default' | 'filled';

  /**
   * Whether to use small screen mode (tabs fill width evenly)
   * @default false
   */
  smallScreen?: boolean;
  
  /**
   * Unsafe escape hatch for custom className
   */
  UNSAFE_className?: string;
  
  /**
   * Unsafe escape hatch for custom styles
   */
  UNSAFE_style?: React.CSSProperties;
}

/**
 * TabList - Container for tab triggers
 * 
 * Displays the tab navigation with divider. In smallScreen mode,
 * tabs fill the width evenly for mobile responsive behavior.
 */
export const TabList = React.forwardRef<HTMLDivElement, TabListProps>((props, ref) => {
  const {
    children,
    variant = 'default',
    smallScreen = false,
    UNSAFE_className,
    UNSAFE_style,
  } = props;

  const className = [
    styles.tabList,
    variant === 'filled' && styles['tabList--filled'],
    smallScreen && styles['tabList--smallScreen'],
    UNSAFE_className,
  ]
    .filter(Boolean)
    .join(' ');
  
  return (
    <div
      ref={ref}
      role="tablist"
      className={className}
      style={UNSAFE_style}
    >
      {children}
    </div>
  );
});

TabList.displayName = 'TabList';

/**
 * Props for the Tab trigger component
 */
export interface TabProps {
  /**
   * The value that identifies this tab
   */
  value: string;
  
  /**
   * The label content for the tab
   */
  children: React.ReactNode;
  
  /**
   * Leading content (typically an icon)
   */
  leading?: React.ReactNode;
  
  /**
   * Trailing content (typically a badge or count)
   */
  trailing?: React.ReactNode;
  
  /**
   * Whether the tab is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Unsafe escape hatch for custom className
   */
  UNSAFE_className?: string;
  
  /**
   * Unsafe escape hatch for custom styles
   */
  UNSAFE_style?: React.CSSProperties;
  
  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Tab - Individual tab trigger
 * 
 * Displays a clickable tab with optional leading icon and trailing badge.
 * Shows an active indicator (bottom border) when selected.
 */
export const Tab = React.forwardRef<HTMLButtonElement, TabProps>((props, ref) => {
  const {
    value,
    children,
    leading,
    trailing,
    disabled = false,
    UNSAFE_className,
    UNSAFE_style,
    onClick,
  } = props;
  
  const { value: activeValue, onValueChange } = useTabsContext();
  const isActive = activeValue === value;
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onValueChange?.(value);
      onClick?.(event);
    }
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft' && event.key !== 'Home' && event.key !== 'End') return;

    event.preventDefault();
    const tablist = event.currentTarget.closest('[role="tablist"]');
    if (!tablist) return;

    const tabs = Array.from(
      tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])')
    );
    const currentIndex = tabs.indexOf(event.currentTarget);
    if (currentIndex === -1) return;

    let nextIndex: number;
    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    tabs[nextIndex].focus();
    tabs[nextIndex].click();
  };
  
  const className = [
    styles.tab,
    isActive && styles['tab--active'],
    disabled && styles['tab--disabled'],
    UNSAFE_className,
  ]
    .filter(Boolean)
    .join(' ');
  
  return (
    <button
      ref={ref}
      role="tab"
      type="button"
      aria-selected={isActive}
      aria-disabled={disabled}
      disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      className={className}
      style={UNSAFE_style}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.tab__labelContainer}>
        <div className={styles.tab__content}>
          {leading && <span className={styles.tab__leading}>{leading}</span>}
          <span className={styles.tab__label}>{children}</span>
          {trailing && <span className={styles.tab__trailing}>{trailing}</span>}
        </div>
        {isActive && <div className={styles.tab__indicator} />}
      </div>
      <div className={styles.tab__divider} />
    </button>
  );
});

Tab.displayName = 'Tab';

/**
 * Props for the TabPanel component
 */
export interface TabPanelProps {
  /**
   * The value that identifies which tab controls this panel
   */
  value: string;
  
  /**
   * The content to display when this panel is active
   */
  children: React.ReactNode;
  
  /**
   * Unsafe escape hatch for custom className
   */
  UNSAFE_className?: string;
  
  /**
   * Unsafe escape hatch for custom styles
   */
  UNSAFE_style?: React.CSSProperties;
}

/**
 * TabPanel - Content container for each tab
 * 
 * Only displays its content when the corresponding tab is active.
 */
export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>((props, ref) => {
  const {
    value,
    children,
    UNSAFE_className,
    UNSAFE_style,
  } = props;
  
  const { value: activeValue } = useTabsContext();
  const isActive = activeValue === value;
  
  if (!isActive) {
    return null;
  }
  
  return (
    <div
      ref={ref}
      role="tabpanel"
      tabIndex={0}
      className={UNSAFE_className}
      style={UNSAFE_style}
    >
      {children}
    </div>
  );
});

TabPanel.displayName = 'TabPanel';
