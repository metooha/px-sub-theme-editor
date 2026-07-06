import React from 'react';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { QuantityStepperAccessibilityDocs } from './QuantityStepperDocs';

const sectionStyle: React.CSSProperties = {
  marginBottom: '40px',
};

const headingStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: '600',
  color: 'var(--ld-semantic-color-text-secondary, #74767C)',
  marginBottom: '16px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  flexWrap: 'wrap',
  marginBottom: '12px',
};

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  color: 'var(--ld-semantic-color-text-tertiary, #9EA1A8)',
  minWidth: '60px',
};

export function QuantityStepperExample() {
  return (
    <div>
      {/* ── Primary ── */}
      <div style={sectionStyle}>
        <p style={headingStyle}>Primary</p>

        <p style={{ ...labelStyle, marginBottom: '8px' }}>+ Add (small / medium / large)</p>
        <div style={rowStyle}>
          <QuantityStepper variant="primary" size="small" />
          <QuantityStepper variant="primary" size="medium" />
          <QuantityStepper variant="primary" size="large" />
          <QuantityStepper variant="primary" size="medium" disabled />
        </div>

        <p style={{ ...labelStyle, marginBottom: '8px' }}>+ Add — label hidden (icon only)</p>
        <div style={rowStyle}>
          <QuantityStepper variant="primary" size="small" showAddLabel={false} />
          <QuantityStepper variant="primary" size="medium" showAddLabel={false} />
          <QuantityStepper variant="primary" size="large" showAddLabel={false} />
        </div>

        <p style={{ ...labelStyle, marginBottom: '8px' }}>Add to cart</p>
        <div style={rowStyle}>
          <QuantityStepper variant="primary" size="small" cartLabel="Add to cart" />
          <QuantityStepper variant="primary" size="medium" cartLabel="Add to cart" />
          <QuantityStepper variant="primary" size="large" cartLabel="Add to cart" />
          <QuantityStepper variant="primary" size="medium" cartLabel="Add to cart" disabled />
        </div>

        <p style={{ ...labelStyle, marginBottom: '8px' }}>Standard stepper (active)</p>
        <div style={rowStyle}>
          <QuantityStepper variant="primary" size="small" defaultCount={1} />
          <QuantityStepper variant="primary" size="medium" defaultCount={1} />
          <QuantityStepper variant="primary" size="large" defaultCount={1} />
        </div>

        <p style={{ ...labelStyle, marginBottom: '8px' }}>Max quantity reached</p>
        <div style={rowStyle}>
          <QuantityStepper variant="primary" size="small" defaultCount={5} maxQuantity={5} />
          <QuantityStepper variant="primary" size="medium" defaultCount={5} maxQuantity={5} />
          <QuantityStepper variant="primary" size="large" defaultCount={5} maxQuantity={5} />
        </div>
      </div>

      {/* ── Secondary ── */}
      <div style={sectionStyle}>
        <p style={headingStyle}>Secondary</p>

        <p style={{ ...labelStyle, marginBottom: '8px' }}>+ Add (small / medium / large)</p>
        <div style={rowStyle}>
          <QuantityStepper variant="secondary" size="small" />
          <QuantityStepper variant="secondary" size="medium" />
          <QuantityStepper variant="secondary" size="large" />
          <QuantityStepper variant="secondary" size="medium" disabled />
        </div>

        <p style={{ ...labelStyle, marginBottom: '8px' }}>+ Add — label hidden (icon only)</p>
        <div style={rowStyle}>
          <QuantityStepper variant="secondary" size="small" showAddLabel={false} />
          <QuantityStepper variant="secondary" size="medium" showAddLabel={false} />
          <QuantityStepper variant="secondary" size="large" showAddLabel={false} />
        </div>

        <p style={{ ...labelStyle, marginBottom: '8px' }}>Add to cart</p>
        <div style={rowStyle}>
          <QuantityStepper variant="secondary" size="small" cartLabel="Add to cart" />
          <QuantityStepper variant="secondary" size="medium" cartLabel="Add to cart" />
          <QuantityStepper variant="secondary" size="large" cartLabel="Add to cart" />
          <QuantityStepper variant="secondary" size="medium" cartLabel="Add to cart" disabled />
        </div>

        <p style={{ ...labelStyle, marginBottom: '8px' }}>Standard stepper (active)</p>
        <div style={rowStyle}>
          <QuantityStepper variant="secondary" size="small" defaultCount={1} />
          <QuantityStepper variant="secondary" size="medium" defaultCount={1} />
          <QuantityStepper variant="secondary" size="large" defaultCount={1} />
        </div>

        <p style={{ ...labelStyle, marginBottom: '8px' }}>Max quantity reached</p>
        <div style={rowStyle}>
          <QuantityStepper variant="secondary" size="small" defaultCount={5} maxQuantity={5} />
          <QuantityStepper variant="secondary" size="medium" defaultCount={5} maxQuantity={5} />
          <QuantityStepper variant="secondary" size="large" defaultCount={5} maxQuantity={5} />
        </div>
      </div>

      {/* ── Trash on Remove ── */}
      <div style={sectionStyle}>
        <p style={headingStyle}>Trash on Remove</p>
        <p style={{ fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle, #74767c)', marginBottom: '16px', lineHeight: '1.5' }}>
          Use <code>showTrashOnRemove</code> in cart/bag contexts. When count = 1, the − button becomes a trash icon — clicking it removes the item entirely.
        </p>

        <p style={{ ...labelStyle, marginBottom: '8px' }}>Secondary (small / medium / large) — start at 1</p>
        <div style={rowStyle}>
          <QuantityStepper variant="secondary" size="small" defaultCount={1} showTrashOnRemove />
          <QuantityStepper variant="secondary" size="medium" defaultCount={1} showTrashOnRemove />
          <QuantityStepper variant="secondary" size="large" defaultCount={1} showTrashOnRemove />
        </div>

        <p style={{ ...labelStyle, marginBottom: '8px' }}>Tertiary — start at 1</p>
        <div style={rowStyle}>
          <QuantityStepper variant="tertiary" size="small" defaultCount={1} showTrashOnRemove />
          <QuantityStepper variant="tertiary" size="medium" defaultCount={1} showTrashOnRemove />
          <QuantityStepper variant="tertiary" size="large" defaultCount={1} showTrashOnRemove />
        </div>

        <p style={{ ...labelStyle, marginBottom: '8px' }}>Primary — start at 1</p>
        <div style={rowStyle}>
          <QuantityStepper variant="primary" size="small" defaultCount={1} showTrashOnRemove />
          <QuantityStepper variant="primary" size="medium" defaultCount={1} showTrashOnRemove />
          <QuantityStepper variant="primary" size="large" defaultCount={1} showTrashOnRemove />
        </div>

        <p style={{ ...labelStyle, marginBottom: '8px' }}>Count &gt; 1 — shows − button (not trash)</p>
        <div style={rowStyle}>
          <QuantityStepper variant="secondary" size="medium" defaultCount={3} showTrashOnRemove />
          <QuantityStepper variant="tertiary" size="medium" defaultCount={5} maxQuantity={5} showTrashOnRemove />
        </div>
      </div>

      {/* ── Tertiary ── */}
      <div style={sectionStyle}>
        <p style={headingStyle}>Tertiary</p>

        <p style={{ ...labelStyle, marginBottom: '8px' }}>+ Add (small / medium / large)</p>
        <div style={rowStyle}>
          <QuantityStepper variant="tertiary" size="small" />
          <QuantityStepper variant="tertiary" size="medium" />
          <QuantityStepper variant="tertiary" size="large" />
          <QuantityStepper variant="tertiary" size="medium" disabled />
        </div>

        <p style={{ ...labelStyle, marginBottom: '8px' }}>+ Add — label hidden (icon only)</p>
        <div style={rowStyle}>
          <QuantityStepper variant="tertiary" size="small" showAddLabel={false} />
          <QuantityStepper variant="tertiary" size="medium" showAddLabel={false} />
          <QuantityStepper variant="tertiary" size="large" showAddLabel={false} />
        </div>

        <p style={{ ...labelStyle, marginBottom: '8px' }}>Add to cart</p>
        <div style={rowStyle}>
          <QuantityStepper variant="tertiary" size="small" cartLabel="Add to cart" />
          <QuantityStepper variant="tertiary" size="medium" cartLabel="Add to cart" />
          <QuantityStepper variant="tertiary" size="large" cartLabel="Add to cart" />
          <QuantityStepper variant="tertiary" size="medium" cartLabel="Add to cart" disabled />
        </div>

        <p style={{ ...labelStyle, marginBottom: '8px' }}>Standard stepper (active)</p>
        <div style={rowStyle}>
          <QuantityStepper variant="tertiary" size="small" defaultCount={1} />
          <QuantityStepper variant="tertiary" size="medium" defaultCount={1} />
          <QuantityStepper variant="tertiary" size="large" defaultCount={1} />
        </div>

        <p style={{ ...labelStyle, marginBottom: '8px' }}>Max quantity reached</p>
        <div style={rowStyle}>
          <QuantityStepper variant="tertiary" size="small" defaultCount={5} maxQuantity={5} />
          <QuantityStepper variant="tertiary" size="medium" defaultCount={5} maxQuantity={5} />
          <QuantityStepper variant="tertiary" size="large" defaultCount={5} maxQuantity={5} />
        </div>
      </div>

      {/* ── Accessibility, Animation & Guidelines Documentation ── */}
      <QuantityStepperAccessibilityDocs />
    </div>
  );
}
