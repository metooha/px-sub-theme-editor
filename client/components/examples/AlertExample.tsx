import * as React from 'react';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Star } from '@/components/icons';

/**
 * AlertExample - Demonstrates LD 3.5 Alert component usage
 * 
 * Alerts are used to communicate important information to users.
 * They support four semantic variants: info, success, warning, and error.
 */
export function AlertExample() {
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
      {/* Semantic Variants */}
      <section>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '16px',
        }}>
          Alert Variants
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--ld-semantic-color-text-subtle)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          marginBottom: '16px',
          lineHeight: '1.5',
        }}>
          Alerts come in four semantic variants with default icons.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Alert variant="info">
            This is an informational alert with important details.
          </Alert>

          <Alert variant="success">
            Your changes have been saved successfully.
          </Alert>

          <Alert variant="warning">
            Please review your information before submitting.
          </Alert>

          <Alert variant="error">
            An error occurred while processing your request.
          </Alert>
        </div>
      </section>

      {/* With Actions */}
      <section>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '16px',
        }}>
          Alerts with Actions
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--ld-semantic-color-text-subtle)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          marginBottom: '16px',
          lineHeight: '1.5',
        }}>
          Add action links or buttons for users to take immediate action.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Alert 
            variant="info"
            action={<a href="#" onClick={(e) => e.preventDefault()}>Learn more</a>}
          >
            New features are available in this update.
          </Alert>

          <Alert 
            variant="warning"
            action={<a href="#" onClick={(e) => e.preventDefault()}>Review now</a>}
          >
            Your session will expire in 5 minutes.
          </Alert>

          <Alert 
            variant="error"
            action={<button type="button">Retry</button>}
          >
            Failed to connect to the server.
          </Alert>
        </div>
      </section>

      {/* Custom Icons */}
      <section>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '16px',
        }}>
          Custom Icons
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--ld-semantic-color-text-subtle)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          marginBottom: '16px',
          lineHeight: '1.5',
        }}>
          Replace default icons with custom ones or hide icons entirely.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Alert
            variant="info"
            icon={<Star style={{ width: 16, height: 16 }} />}
          >
            Custom icon example with a star from the icon library.
          </Alert>

          <Alert variant="success" icon={null}>
            Alert without an icon.
          </Alert>
        </div>
      </section>

      {/* Usage Code */}
      <section>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '16px',
        }}>
          Usage
        </h3>
        <pre style={{
          fontFamily: 'var(--ld-semantic-font-family-mono)',
          fontSize: '13px',
          color: 'var(--ld-semantic-color-text)',
          lineHeight: '1.6',
          overflowX: 'auto',
          padding: '16px',
          backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
          borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
          margin: 0,
        }}>
{`import { Alert } from '@/components/ui/Alert';
import { Star } from '@/components/icons';

// Basic alert (uses default library icons)
<Alert variant="info">
  This is an informational message.
</Alert>

// Alert with action
<Alert
  variant="warning"
  action={<a href="#">Learn more</a>}
>
  Important update available.
</Alert>

// Alert with custom icon from library
<Alert
  variant="success"
  icon={<Star style={{ width: 16, height: 16 }} />}
>
  Custom icon example using library icons.
</Alert>

// Alert without icon
<Alert variant="error" icon={null}>
  Error message without icon.
</Alert>`}
        </pre>
      </section>
    </div>
  );
}
