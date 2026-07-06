import * as React from 'react';
import { Callout, type CalloutPosition } from '@/components/ui/Callout';

const positions: { position: CalloutPosition; label: string }[] = [
  { position: 'topLeft', label: 'Top Left' },
  { position: 'topCenter', label: 'Top Center' },
  { position: 'topRight', label: 'Top Right' },
  { position: 'left', label: 'Left' },
  { position: 'right', label: 'Right' },
  { position: 'bottomLeft', label: 'Bottom Left' },
  { position: 'bottomCenter', label: 'Bottom Center' },
  { position: 'bottomRight', label: 'Bottom Right' },
];

export const CalloutExample: React.FC = () => {
  const [dismissed, setDismissed] = React.useState<Set<string>>(new Set());

  const toggleDismiss = (pos: string) => {
    setDismissed((prev) => {
      const next = new Set(prev);
      if (next.has(pos)) {
        next.delete(pos);
      } else {
        next.add(pos);
      }
      return next;
    });
  };

  const resetAll = () => setDismissed(new Set());

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* All Positions */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Nubbin Positions
        </h2>
        <p style={{ marginBottom: '24px', fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
          The nubbin (pointer) indicates which element the callout is anchored to. Eight positions are supported.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '48px 24px',
            padding: '32px 0',
          }}
        >
          {positions.map(({ position, label }) => (
            <div key={position} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ld-semantic-color-text-secondary, #74767C)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {label}
              </span>
              {!dismissed.has(position) ? (
                <Callout
                  position={position}
                  onClose={() => toggleDismiss(position)}
                  a11yContentLabel={`Example callout with ${label} nubbin`}
                >
                  Callout message
                </Callout>
              ) : (
                <button
                  type="button"
                  onClick={() => toggleDismiss(position)}
                  style={{
                    padding: '8px 16px',
                    fontSize: '13px',
                    border: '1px dashed var(--ld-semantic-color-border-strong, #BABBBE)',
                    borderRadius: '6px',
                    background: 'none',
                    cursor: 'pointer',
                    color: 'var(--ld-semantic-color-text-secondary, #74767C)',
                  }}
                >
                  Show again
                </button>
              )}
            </div>
          ))}
        </div>
        {dismissed.size > 0 && (
          <div style={{ marginTop: '8px' }}>
            <button
              type="button"
              onClick={resetAll}
              style={{
                padding: '6px 14px',
                fontSize: '13px',
                border: '1px solid var(--ld-semantic-color-border-strong, #BABBBE)',
                borderRadius: '9999px',
                background: 'none',
                cursor: 'pointer',
                color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
              }}
            >
              Reset all
            </button>
          </div>
        )}
      </section>

      {/* Without Close Button */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Without Close Button
        </h2>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
          Set <code style={{ fontSize: '13px', background: 'var(--ld-semantic-color-surface-secondary, #F1F1F2)', padding: '2px 6px', borderRadius: '4px' }}>closable=false</code> to hide the close button.
        </p>
        <Callout position="bottomCenter" closable={false}>
          This callout has no close button.
        </Callout>
      </section>

      {/* Custom Content */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Rich Content
        </h2>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
          Pass any React content as children for richer callout messages.
        </p>
        <Callout position="topCenter" closable={false}>
          <strong>Pro tip:</strong> You can organize items into folders for easier management.
        </Callout>
      </section>
    </div>
  );
};
