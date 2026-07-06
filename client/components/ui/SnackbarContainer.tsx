import React, { useEffect, useState } from 'react';
import { Snackbar } from './Snackbar';
import { subscribe, dismissSnackbar } from '@/hooks/useSnackbar';
import type { SnackbarState } from '@/hooks/useSnackbar';

export const SnackbarContainer: React.FC = () => {
  const [currentSnackbar, setCurrentSnackbar] = useState<SnackbarState | null>(null);

  useEffect(() => {
    // Subscribe to snackbar state changes
    const unsubscribe = subscribe(setCurrentSnackbar);
    return unsubscribe;
  }, []);

  if (!currentSnackbar) {
    return null;
  }

  return (
    <Snackbar
      id={currentSnackbar.id}
      message={currentSnackbar.message}
      actionLabel={currentSnackbar.actionLabel}
      onAction={currentSnackbar.onAction}
      onClose={dismissSnackbar}
      open={currentSnackbar.open}
      duration={currentSnackbar.duration}
      position={currentSnackbar.position}
    />
  );
};

export default SnackbarContainer;
