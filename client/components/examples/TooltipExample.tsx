import React from 'react';
import { Callout } from '@/components/ui/Callout';
import { Button } from '@/components/ui/Button';

export default function TooltipExample() {
  const [showCallout1, setShowCallout1] = React.useState(false);
  const [showCallout2, setShowCallout2] = React.useState(false);
  const [showCallouts, setShowCallouts] = React.useState({
    top: false,
    bottom: false,
    left: false,
    right: false,
  });

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
          Basic Callout (replaces Tooltip)
        </h3>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Button
            variant="secondary"
            onClick={() => setShowCallout1(!showCallout1)}
          >
            Click me
          </Button>
          {showCallout1 && (
            <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, zIndex: 10 }}>
              <Callout
                position="topCenter"
                onClose={() => setShowCallout1(false)}
                a11yContentLabel="Library action information"
              >
                <p>Add to library</p>
              </Callout>
            </div>
          )}
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
          Callout with Rich Content
        </h3>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Button
            variant="primary"
            onClick={() => setShowCallout2(!showCallout2)}
          >
            Click for details
          </Button>
          {showCallout2 && (
            <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, zIndex: 10 }}>
              <Callout
                position="topLeft"
                onClose={() => setShowCallout2(false)}
                a11yContentLabel="Pro tip information"
              >
                <div style={{ maxWidth: '200px' }}>
                  <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>Pro Tip</h4>
                  <p style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-secondary)' }}>
                    You can customize the content of callouts with any React component.
                  </p>
                </div>
              </Callout>
            </div>
          )}
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
          Multiple Callouts with Different Positions
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            { key: 'top', position: 'bottomCenter', label: 'Top' },
            { key: 'bottom', position: 'topCenter', label: 'Bottom' },
            { key: 'left', position: 'right', label: 'Left' },
            { key: 'right', position: 'left', label: 'Right' },
          ].map(({ key, position, label }) => (
            <div key={key} style={{ position: 'relative', display: 'inline-block' }}>
              <Button
                variant="secondary"
                size="small"
                onClick={() => setShowCallouts(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
              >
                {label}
              </Button>
              {showCallouts[key as keyof typeof showCallouts] && (
                <div style={{
                  position: 'absolute',
                  ...(key === 'top' && { bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' }),
                  ...(key === 'bottom' && { top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' }),
                  ...(key === 'left' && { right: 'calc(100% + 8px)', top: '50%', transform: 'translateY(-50%)' }),
                  ...(key === 'right' && { left: 'calc(100% + 8px)', top: '50%', transform: 'translateY(-50%)' }),
                  zIndex: 10
                }}>
                  <Callout
                    position={position as any}
                    onClose={() => setShowCallouts(prev => ({ ...prev, [key]: false }))}
                    a11yContentLabel={`Callout on ${label.toLowerCase()}`}
                  >
                    <p>Callout on {label.toLowerCase()}</p>
                  </Callout>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
