import * as React from 'react';
import { Scrim } from '@/components/ui/Scrim';
import { Button } from '@/components/ui/Button';

/**
 * ScrimExample - Demonstrates LD 3.5 Scrim component usage
 * 
 * A semi-transparent backdrop component that provides a visual scrim layer for overlay components.
 */
export function ScrimExample() {
  const [showDefaultScrim, setShowDefaultScrim] = React.useState(false);
  const [showInverseScrim, setShowInverseScrim] = React.useState(false);
  const [showAnimatedScrim, setShowAnimatedScrim] = React.useState(false);
  const [isAnimatedClosing, setIsAnimatedClosing] = React.useState(false);

  const handleCloseAnimated = () => {
    setIsAnimatedClosing(true);
    setTimeout(() => {
      setShowAnimatedScrim(false);
      setIsAnimatedClosing(false);
    }, 300);
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Basic Scrim Usage
        </h2>
        <p style={{ marginBottom: '16px', color: '#74767C' }}>
          The Scrim component creates a semi-transparent backdrop, typically used with modals, panels, and overlays.
        </p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Button variant="primary" onClick={() => setShowDefaultScrim(true)}>
            Show Default Scrim
          </Button>
          <Button variant="secondary" onClick={() => setShowInverseScrim(true)}>
            Show Inverse Scrim
          </Button>
          <Button variant="tertiary" onClick={() => setShowAnimatedScrim(true)}>
            Show Animated Scrim
          </Button>
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Variants
        </h2>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px', minWidth: '250px' }}>
            <h3 style={{ marginBottom: '8px', fontSize: '16px', fontWeight: 600 }}>
              Default
            </h3>
            <p style={{ marginBottom: '12px', color: '#74767C', fontSize: '14px' }}>
              Dark semi-transparent scrim (rgba(0, 0, 0, 0.4)) - most commonly used for overlays on light backgrounds.
            </p>
            <div 
              style={{ 
                position: 'relative', 
                height: '150px', 
                border: '1px solid #d9d9d9',
                borderRadius: '8px',
                overflow: 'hidden',
                background: '#FFFFFF'
              }}
            >
              <Scrim variant="default" style={{ position: 'absolute' }} />
              <div style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                color: '#FFFFFF',
                fontWeight: 700,
                zIndex: 50,
                textAlign: 'center'
              }}>
                Default Scrim
              </div>
            </div>
          </div>

          <div style={{ flex: '1 1 300px', minWidth: '250px' }}>
            <h3 style={{ marginBottom: '8px', fontSize: '16px', fontWeight: 600 }}>
              Inverse
            </h3>
            <p style={{ marginBottom: '12px', color: '#74767C', fontSize: '14px' }}>
              Light semi-transparent scrim (rgba(255, 255, 255, 0.4)) - used for overlays on dark backgrounds.
            </p>
            <div 
              style={{ 
                position: 'relative', 
                height: '150px', 
                border: '1px solid #d9d9d9',
                borderRadius: '8px',
                overflow: 'hidden',
                background: '#2E2F32'
              }}
            >
              <Scrim variant="inverse" style={{ position: 'absolute' }} />
              <div style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                color: '#2E2F32',
                fontWeight: 700,
                zIndex: 50,
                textAlign: 'center'
              }}>
                Inverse Scrim
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Usage Guidelines
        </h2>
        <ul style={{ 
          listStyle: 'disc', 
          paddingLeft: '24px', 
          color: '#2E2F32',
          lineHeight: '1.6'
        }}>
          <li>Use Scrim to provide visual separation between overlay content and background</li>
          <li>Scrim helps focus user attention on modal dialogs, panels, and bottom sheets</li>
          <li>Always use <code>aria-hidden="true"</code> (included by default) since scrim is decorative</li>
          <li>Click handlers can be added to close overlays when clicking outside</li>
          <li>Use the <code>isOpen</code> and <code>isClosing</code> props for smooth fade animations</li>
          <li>Default variant works best with light backgrounds (most common)</li>
          <li>Inverse variant works best with dark backgrounds or themes</li>
        </ul>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Code Examples
        </h2>
        <div style={{ 
          background: '#F5F5F5', 
          padding: '16px', 
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '14px'
        }}>
          <pre style={{ margin: 0 }}>{`// Basic usage
<Scrim onClick={handleClose} />

// With variant
<Scrim variant="inverse" onClick={handleClose} />

// With animation states
<Scrim 
  isOpen={isOpen} 
  isClosing={isClosing} 
  onClick={handleClose} 
/>`}</pre>
        </div>
      </section>

      {/* Demo Scrims */}
      {showDefaultScrim && (
        <>
          <Scrim onClick={() => setShowDefaultScrim(false)} />
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#FFFFFF',
            padding: '32px',
            borderRadius: '8px',
            boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)',
            zIndex: 50,
            maxWidth: '400px'
          }}>
            <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 700 }}>
              Default Scrim Demo
            </h3>
            <p style={{ marginBottom: '24px', color: '#74767C' }}>
              This is an example of content displayed above the default scrim. Click the scrim background to close.
            </p>
            <Button variant="primary" onClick={() => setShowDefaultScrim(false)}>
              Close
            </Button>
          </div>
        </>
      )}

      {showInverseScrim && (
        <>
          <Scrim variant="inverse" onClick={() => setShowInverseScrim(false)} />
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#2E2F32',
            color: '#FFFFFF',
            padding: '32px',
            borderRadius: '8px',
            boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)',
            zIndex: 50,
            maxWidth: '400px'
          }}>
            <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 700 }}>
              Inverse Scrim Demo
            </h3>
            <p style={{ marginBottom: '24px', color: '#D9D9D9' }}>
              This is an example of content displayed above the inverse scrim. Click the scrim background to close.
            </p>
            <Button variant="primary" onClick={() => setShowInverseScrim(false)}>
              Close
            </Button>
          </div>
        </>
      )}

      {showAnimatedScrim && (
        <>
          <Scrim 
            isOpen={!isAnimatedClosing} 
            isClosing={isAnimatedClosing} 
            onClick={handleCloseAnimated} 
          />
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#FFFFFF',
            padding: '32px',
            borderRadius: '8px',
            boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)',
            zIndex: 50,
            maxWidth: '400px',
            opacity: isAnimatedClosing ? 0 : 1,
            transition: 'opacity 300ms ease-in-out'
          }}>
            <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 700 }}>
              Animated Scrim Demo
            </h3>
            <p style={{ marginBottom: '24px', color: '#74767C' }}>
              This demo shows the scrim fade animation. Click the scrim background or the button to see the close animation.
            </p>
            <Button variant="primary" onClick={handleCloseAnimated}>
              Close with Animation
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
