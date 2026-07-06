import { useState, useRef, useEffect, useCallback } from 'react';

interface UseResizablePanelOptions {
  /** localStorage key for width persistence. Pass undefined to disable persistence. */
  storageKey?: string;
  /** Starting width in px */
  defaultWidth: number;
  /** Minimum allowed width in px */
  minWidth: number;
  /** Maximum allowed width in px */
  maxWidth: number;
  /**
   * Which edge the resize handle lives on.
   * 'left'  — handle on the left edge (right-side panels: drag left=wider, right=narrower)
   * 'right' — handle on the right edge (left-side sidebars: drag right=wider, left=narrower)
   * @default 'right'
   */
  handleEdge?: 'left' | 'right';
}

interface UseResizablePanelResult {
  /** Current panel width in px */
  width: number;
  /** Spread onto the resize handle element */
  resizeHandleProps: {
    onMouseDown: (e: React.MouseEvent) => void;
    role: string;
    'aria-orientation': 'vertical';
    tabIndex: number;
    style: { cursor: string };
  };
}

function readStoredWidth(key: string, min: number, max: number, fallback: number): number {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const n = parseInt(raw, 10);
      if (!isNaN(n) && n >= min && n <= max) return n;
    }
  } catch { /* noop */ }
  return fallback;
}

/**
 * Shared resize logic for panels and sidebars with optional localStorage persistence.
 *
 * @example
 * // Right-side editor panel with left-edge handle
 * const { width, resizeHandleProps } = useResizablePanel({
 *   storageKey: 'editor-width',
 *   defaultWidth: 360,
 *   minWidth: 320,
 *   maxWidth: 640,
 *   handleEdge: 'left',
 * });
 *
 * @example
 * // Left-side sidebar with right-edge handle (no persistence)
 * const { width, resizeHandleProps } = useResizablePanel({
 *   defaultWidth: 220,
 *   minWidth: 64,
 *   maxWidth: 400,
 *   handleEdge: 'right',
 * });
 */
export function useResizablePanel({
  storageKey,
  defaultWidth,
  minWidth,
  maxWidth,
  handleEdge = 'right',
}: UseResizablePanelOptions): UseResizablePanelResult {
  const [width, setWidth] = useState<number>(() =>
    storageKey ? readStoredWidth(storageKey, minWidth, maxWidth, defaultWidth) : defaultWidth,
  );

  const isResizing = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      isResizing.current = true;
      startX.current = e.clientX;
      startWidth.current = width;
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    },
    [width],
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      const delta =
        handleEdge === 'left'
          ? startX.current - e.clientX   // left-edge handle: drag left = grow
          : e.clientX - startX.current;  // right-edge handle: drag right = grow
      const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth.current + delta));
      setWidth(newWidth);
      startWidth.current = newWidth;
      startX.current = e.clientX;
    };

    const onMouseUp = () => {
      if (!isResizing.current) return;
      isResizing.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      if (storageKey) {
        try { localStorage.setItem(storageKey, String(startWidth.current)); } catch { /* noop */ }
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [handleEdge, minWidth, maxWidth, storageKey]);

  return {
    width,
    resizeHandleProps: {
      onMouseDown: handleMouseDown,
      role: 'separator',
      'aria-orientation': 'vertical',
      tabIndex: 0,
      style: { cursor: 'col-resize' },
    },
  };
}
