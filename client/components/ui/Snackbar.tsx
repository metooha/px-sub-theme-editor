import React, { useEffect, useRef } from 'react';
import { X } from '@/components/icons/X';
import styles from './Snackbar.module.css';

export interface SnackbarProps {
  id?: string;
  message: string | React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
  open?: boolean;
  duration?: number; // auto-dismiss duration in ms (default: 4000, set to Infinity for manual close only)
  position?: 'bottom-left' | 'bottom-center' | 'bottom-right';
}

export const Snackbar: React.FC<SnackbarProps> = ({
  id,
  message,
  actionLabel,
  onAction,
  onClose,
  open = true,
  duration = 4000,
  position = 'bottom-center',
}) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-dismiss functionality
  useEffect(() => {
    if (open && duration !== Infinity && onClose) {
      timerRef.current = setTimeout(() => {
        onClose();
      }, duration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [open, duration, onClose]);

  const handleActionClick = () => {
    if (onAction) {
      onAction();
    }
    // Optionally close after action
    if (onClose) {
      onClose();
    }
  };

  const handleCloseClick = () => {
    if (onClose) {
      onClose();
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div
      id={id}
      className={`${styles.snackbar} ${styles[position]} ${open ? styles.open : ''}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className={styles.content}>
        <div className={styles.message}>{message}</div>
      </div>

      {actionLabel && onAction && (
        <button
          className={styles.action}
          onClick={handleActionClick}
          type="button"
        >
          {actionLabel}
        </button>
      )}

      <button
        className={styles.close}
        onClick={handleCloseClick}
        type="button"
        aria-label="Close notification"
      >
        <X width={16} height={16} />
      </button>
    </div>
  );
};

export default Snackbar;
