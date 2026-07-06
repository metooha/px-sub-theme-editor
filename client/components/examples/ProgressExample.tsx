import React from 'react';
import { ProgressIndicator } from '@/components/ui/ProgressIndicator';
import { Button } from '@/components/ui/Button';

export default function ProgressExample() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Progress Bar
        </h3>
        <div style={{ maxWidth: '600px' }}>
          <ProgressIndicator value={progress} showValue />
          <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary)' }}>
            Progress: {progress}%
          </p>
        </div>
      </section>

      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Interactive Progress
        </h3>
        <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ProgressIndicator value={progress} showValue />
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="secondary" size="small" onClick={() => setProgress(Math.max(0, progress - 10))}>
              -10%
            </Button>
            <Button variant="secondary" size="small" onClick={() => setProgress(Math.min(100, progress + 10))}>
              +10%
            </Button>
            <Button variant="secondary" size="small" onClick={() => setProgress(0)}>
              Reset
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
