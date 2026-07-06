import React from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/Collapsible';
import { Button } from '@/components/ui/Button';

export default function CollapsibleExample() {
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
          Basic Collapsible
        </h3>
        <Collapsible open={isOpen} onOpenChange={setIsOpen} style={{ maxWidth: '600px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '16px',
            border: '1px solid var(--ld-semantic-color-border-moderate)',
            borderRadius: '8px',
            marginBottom: '8px'
          }}>
            <h4 style={{ fontWeight: '600', color: 'var(--ld-semantic-color-text-primary)' }}>
              Order #WM-20250218 — 3 items
            </h4>
            <CollapsibleTrigger asChild>
              <Button variant="secondary" size="small">
                {isOpen ? 'Hide' : 'Show'}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div style={{
              padding: '16px',
              border: '1px solid var(--ld-semantic-color-border-moderate)',
              borderRadius: '8px',
              marginBottom: '8px',
              backgroundColor: 'var(--ld-semantic-color-fill-surface-primary)'
            }}>
              <p style={{ fontSize: '14px', fontWeight: '500', color: 'var(--ld-semantic-color-text-primary)' }}>
                Organic Whole Milk, 1 Gallon
              </p>
              <p style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-secondary)', marginTop: '4px' }}>
                Qty: 1 &middot; $4.98
              </p>
            </div>
            <div style={{
              padding: '16px',
              border: '1px solid var(--ld-semantic-color-border-moderate)',
              borderRadius: '8px',
              marginBottom: '8px',
              backgroundColor: 'var(--ld-semantic-color-fill-surface-primary)'
            }}>
              <p style={{ fontSize: '14px', fontWeight: '500', color: 'var(--ld-semantic-color-text-primary)' }}>
                Fresh Bananas, Each
              </p>
              <p style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-secondary)', marginTop: '4px' }}>
                Qty: 6 &middot; $0.27 each
              </p>
            </div>
            <div style={{
              padding: '16px',
              border: '1px solid var(--ld-semantic-color-border-moderate)',
              borderRadius: '8px',
              backgroundColor: 'var(--ld-semantic-color-fill-surface-primary)'
            }}>
              <p style={{ fontSize: '14px', fontWeight: '500', color: 'var(--ld-semantic-color-text-primary)' }}>
                Great Value Large White Eggs, 12 Count
              </p>
              <p style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-secondary)', marginTop: '4px' }}>
                Qty: 1 &middot; $3.12
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </section>
    </div>
  );
}
