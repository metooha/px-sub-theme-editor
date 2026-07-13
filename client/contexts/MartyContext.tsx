import { createContext, useContext, useState, useEffect, useMemo, useRef, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

/* ── Table Command Types ─────────────────────────────────────────── */
export type SortField = 'name' | 'status' | 'totalBudget' | 'impressions' | 'pacing';

export type TableCommand =
  | { type: 'FILTER_STATUS'; values: string[] }
  | { type: 'SEARCH'; query: string }
  | { type: 'SET_COLUMN_VISIBILITY'; columnId: string; visible: boolean }
  | { type: 'SORT'; field: SortField; dir: 'asc' | 'desc' }
  | { type: 'PREVIEW_BUDGET_ADJUSTMENT'; mode: 'percent' | 'absolute'; amount: number }
  | { type: 'APPLY_PREVIEWS' }
  | { type: 'REVERT_PREVIEWS' };

export interface SelectedElement {
  id: string;
  label: string;
  context: string;
  type: 'metric' | 'generic';
  metricName?: string;
}

interface MartyContextValue {
  isMinimized: boolean;
  isDocked: boolean;
  isSidePanel: boolean;
  dockedSection: string | null;
  initialPosition: { x: number; y: number };
  isElementSelecting: boolean;
  pendingMessage: string | null;
  selectedElements: SelectedElement[];
  setIsMinimized: (minimized: boolean) => void;
  setIsDocked: (docked: boolean) => void;
  setIsSidePanel: (sidePanel: boolean) => void;
  setDockedSection: (section: string | null) => void;
  setInitialPosition: (pos: { x: number; y: number }) => void;
  setIsElementSelecting: (selecting: boolean) => void;
  setPendingMessage: (message: string | null) => void;
  setSelectedElements: (els: SelectedElement[] | ((prev: SelectedElement[]) => SelectedElement[])) => void;
  tableCommand: TableCommand | null;
  setTableCommand: (cmd: TableCommand | null) => void;
}

const MartyContext = createContext<MartyContextValue | undefined>(undefined);

interface MartyProviderProps {
  children: ReactNode;
}

export function MartyProvider({ children }: MartyProviderProps) {
  // Initialize state from localStorage or defaults
  const [isMinimized, setIsMinimized] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('marty-minimized');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [isDocked, setIsDocked] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('marty-docked');
      return saved !== null ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [dockedSection, setDockedSection] = useState<string | null>(() => {
    try {
      return localStorage.getItem('marty-docked-section') || null;
    } catch {
      return null;
    }
  });

  const [isSidePanel, setIsSidePanelRaw] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('marty-side-panel');
      return saved !== null ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const setIsSidePanel = (value: boolean) => {
    setIsSidePanelRaw(value);
    if (value) {
      setIsMinimized(false);
    }
  };

  const [isElementSelecting, setIsElementSelecting] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const [selectedElements, setSelectedElements] = useState<SelectedElement[]>([]);
  const [tableCommand, setTableCommand] = useState<TableCommand | null>(null);

  const [initialPosition, setInitialPosition] = useState<{ x: number; y: number }>(() => {
    try {
      const saved = localStorage.getItem('marty-position');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore parse errors
    }
    // Safe window access - use default if window is not available
    const defaultX = typeof window !== 'undefined' ? window.innerWidth - 400 : 800;
    return { x: defaultX, y: 100 };
  });

  // Persist to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem('marty-minimized', JSON.stringify(isMinimized));
    } catch {
      // Ignore localStorage errors
    }
  }, [isMinimized]);

  useEffect(() => {
    try {
      localStorage.setItem('marty-docked', JSON.stringify(isDocked));
    } catch {
      // Ignore localStorage errors
    }
  }, [isDocked]);

  useEffect(() => {
    try {
      localStorage.setItem('marty-side-panel', JSON.stringify(isSidePanel));
    } catch {
      // Ignore localStorage errors
    }
  }, [isSidePanel]);

  useEffect(() => {
    try {
      if (dockedSection) {
        localStorage.setItem('marty-docked-section', dockedSection);
      } else {
        localStorage.removeItem('marty-docked-section');
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [dockedSection]);

  useEffect(() => {
    try {
      localStorage.setItem('marty-position', JSON.stringify(initialPosition));
    } catch {
      // Ignore localStorage errors
    }
  }, [initialPosition]);

  const location = useLocation();

  // When navigating to a different page, dock back into the masthead
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setDockedSection(null);
    setIsDocked(true);
    setIsMinimized(true);
    setIsSidePanelRaw(false);
    setIsElementSelecting(false);
  }, [location.pathname]);

  const value = useMemo<MartyContextValue>(() => ({
    isMinimized,
    isDocked,
    isSidePanel,
    dockedSection,
    initialPosition,
    isElementSelecting,
    pendingMessage,
    selectedElements,
    setIsMinimized,
    setIsDocked,
    setIsSidePanel,
    setDockedSection,
    setInitialPosition,
    setIsElementSelecting,
    setPendingMessage,
    setSelectedElements,
    tableCommand,
    setTableCommand,
  }), [isMinimized, isDocked, isSidePanel, dockedSection, initialPosition, isElementSelecting, pendingMessage, selectedElements, tableCommand]);

  return (
    <MartyContext.Provider value={value}>
      {children}
    </MartyContext.Provider>
  );
}

export function useMarty() {
  const context = useContext(MartyContext);
  if (context === undefined) {
    throw new Error('useMarty must be used within a MartyProvider');
  }
  return context;
}

/** Safe version — returns null when used outside a MartyProvider (e.g. component library pages). */
export function useMartyOptional() {
  return useContext(MartyContext) ?? null;
}
