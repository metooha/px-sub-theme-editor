import React, { useState, useCallback, useEffect } from 'react';

export interface SnackbarState {
  id: string;
  message: string | React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
  position?: 'bottom-left' | 'bottom-center' | 'bottom-right';
  open: boolean;
}

interface SnackbarOptions {
  message: string | React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
  position?: 'bottom-left' | 'bottom-center' | 'bottom-right';
}

// Global state for snackbar (single snackbar, replace mode)
let snackbarState: SnackbarState | null = null;
let listeners: Array<(state: SnackbarState | null) => void> = [];

// Generate unique ID for each snackbar
const generateId = () => Math.random().toString(36).substring(2, 9);

// Subscribe to snackbar state changes
const subscribe = (listener: (state: SnackbarState | null) => void) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};

// Notify all listeners of state change
const notify = () => {
  listeners.forEach((listener) => listener(snackbarState));
};

// Show a new snackbar (replaces any existing snackbar)
export const snackbar = (options: SnackbarOptions) => {
  const id = generateId();
  
  snackbarState = {
    id,
    message: options.message,
    actionLabel: options.actionLabel,
    onAction: options.onAction,
    duration: options.duration ?? 4000,
    position: options.position ?? 'bottom-center',
    open: true,
  };
  
  notify();
  
  return id;
};

// Dismiss the current snackbar
export const dismissSnackbar = () => {
  if (snackbarState) {
    snackbarState = { ...snackbarState, open: false };
    notify();
    
    // Clear state after animation completes
    setTimeout(() => {
      snackbarState = null;
      notify();
    }, 200); // Match CSS transition duration
  }
};

// Export subscribe for SnackbarContainer
export { subscribe };

// Hook to use snackbar state in components
export const useSnackbar = () => {
  const [state, setState] = useState<SnackbarState | null>(snackbarState);

  // Subscribe to state changes
  useEffect(() => {
    const unsubscribe = subscribe(setState);
    return unsubscribe;
  }, []);

  const show = useCallback((options: SnackbarOptions) => {
    return snackbar(options);
  }, []);

  const dismiss = useCallback(() => {
    dismissSnackbar();
  }, []);

  return {
    snackbar: state,
    show,
    dismiss,
  };
};
