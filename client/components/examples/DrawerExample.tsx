import React from 'react';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';

export default function DrawerExample() {
  const [isOpen, setIsOpen] = React.useState(false);

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
          Bottom Sheet (replaces Drawer)
        </h3>
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          Open Bottom Sheet
        </Button>

        <BottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Are you absolutely sure?"
          actions={
            <ButtonGroup>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Submit
              </Button>
            </ButtonGroup>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{
              color: 'var(--ld-semantic-color-text-secondary)',
              fontSize: '14px',
              lineHeight: '1.5'
            }}>
              This action cannot be undone.
            </p>
            <p style={{ color: 'var(--ld-semantic-color-text-secondary)' }}>
              Bottom Sheet content goes here. This is a mobile-friendly modal component
              that slides up from the bottom of the screen.
            </p>
          </div>
        </BottomSheet>
      </section>
    </div>
  );
}
