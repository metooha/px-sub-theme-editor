import React from 'react';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { snackbar } from '@/components/ui/useSnackbar';

export const SnackbarExample: React.FC = () => {
  const handleBasicSnackbar = () => {
    snackbar({
      message: 'This is a basic snackbar notification',
    });
  };

  const handleSnackbarWithAction = () => {
    snackbar({
      message: 'Item moved to trash',
      actionLabel: 'Undo',
      onAction: () => {
        console.log('Undo action clicked');
        snackbar({
          message: 'Action undone',
        });
      },
    });
  };

  const handleLongMessage = () => {
    snackbar({
      message: 'This is a longer message that demonstrates how the snackbar handles text that might wrap to multiple lines',
      duration: 6000,
    });
  };

  const handleNoAutoDismiss = () => {
    snackbar({
      message: 'This snackbar will not auto-dismiss',
      duration: Infinity,
    });
  };

  const handleBottomLeft = () => {
    snackbar({
      message: 'Positioned at bottom-left',
      position: 'bottom-left',
    });
  };

  const handleBottomCenter = () => {
    snackbar({
      message: 'Positioned at bottom-center',
      position: 'bottom-center',
    });
  };

  const handleBottomRight = () => {
    snackbar({
      message: 'Positioned at bottom-right',
      position: 'bottom-right',
    });
  };

  const handleCustomDuration = () => {
    snackbar({
      message: 'This snackbar will dismiss after 2 seconds',
      duration: 2000,
    });
  };

  const handleSuccessMessage = () => {
    snackbar({
      message: '✓ Changes saved successfully',
      duration: 3000,
    });
  };

  const handleErrorMessage = () => {
    snackbar({
      message: '✕ Unable to save changes',
      actionLabel: 'Retry',
      onAction: () => {
        console.log('Retry action clicked');
      },
      duration: 5000,
    });
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: 700, 
        marginBottom: '16px',
        fontFamily: 'var(--ld-semantic-font-family-sans)'
      }}>
        Snackbar Examples
      </h2>
      
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: 600, 
          marginBottom: '12px',
          fontFamily: 'var(--ld-semantic-font-family-sans)'
        }}>
          Basic Variants
        </h3>
        <ButtonGroup>
          <Button variant="primary" onClick={handleBasicSnackbar}>
            Basic Snackbar
          </Button>
          <Button variant="primary" onClick={handleSnackbarWithAction}>
            With Action
          </Button>
          <Button variant="primary" onClick={handleLongMessage}>
            Long Message
          </Button>
        </ButtonGroup>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: 600, 
          marginBottom: '12px',
          fontFamily: 'var(--ld-semantic-font-family-sans)'
        }}>
          Position Variants
        </h3>
        <ButtonGroup>
          <Button variant="secondary" onClick={handleBottomLeft}>
            Bottom Left
          </Button>
          <Button variant="secondary" onClick={handleBottomCenter}>
            Bottom Center
          </Button>
          <Button variant="secondary" onClick={handleBottomRight}>
            Bottom Right
          </Button>
        </ButtonGroup>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: 600, 
          marginBottom: '12px',
          fontFamily: 'var(--ld-semantic-font-family-sans)'
        }}>
          Duration Options
        </h3>
        <ButtonGroup>
          <Button variant="secondary" onClick={handleCustomDuration}>
            2 Second Duration
          </Button>
          <Button variant="secondary" onClick={handleNoAutoDismiss}>
            No Auto-Dismiss
          </Button>
        </ButtonGroup>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: 600, 
          marginBottom: '12px',
          fontFamily: 'var(--ld-semantic-font-family-sans)'
        }}>
          Use Cases
        </h3>
        <ButtonGroup>
          <Button variant="secondary" onClick={handleSuccessMessage}>
            Success Message
          </Button>
          <Button variant="secondary" onClick={handleErrorMessage}>
            Error with Retry
          </Button>
        </ButtonGroup>
      </div>

      <div style={{ 
        marginTop: '32px',
        padding: '16px',
        background: 'var(--ld-semantic-color-fill-secondary)',
        borderRadius: 'var(--ld-primitive-scale-borderradius-50)',
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        fontSize: '14px',
        lineHeight: '1.5'
      }}>
        <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>Usage</h4>
        <pre style={{ 
          background: 'var(--ld-semantic-color-fill-primary)',
          padding: '12px',
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '13px'
        }}>
{`import { snackbar } from '@/components/ui/useSnackbar';

// Basic snackbar
snackbar({
  message: 'This is a notification'
});

// With action
snackbar({
  message: 'Item deleted',
  actionLabel: 'Undo',
  onAction: () => {
    // Handle action
  }
});

// Custom position and duration
snackbar({
  message: 'Custom snackbar',
  position: 'bottom-left',
  duration: 5000
});`}
        </pre>
      </div>
    </div>
  );
};

export default SnackbarExample;
