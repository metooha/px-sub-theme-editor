import * as React from 'react';
import { Chip } from '@/components/ui/Chip';

export function ChipExample() {
  // Multi-select pattern
  const [multiFilters, setMultiFilters] = React.useState<Record<string, boolean>>({
    all: true,
    open: false,
    closed: false,
    assigned: false,
  });

  const toggleMultiFilter = (key: string) => {
    if (key === 'all') {
      setMultiFilters({ all: true, open: false, closed: false, assigned: false });
    } else {
      setMultiFilters(prev => {
        const next = { ...prev, [key]: !prev[key], all: false };
        if (!next.open && !next.closed && !next.assigned) {
          next.all = true;
        }
        return next;
      });
    }
  };

  // Single-select pattern
  const [singleSelect, setSingleSelect] = React.useState('featured');

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px', maxWidth: '1200px' }}>
      {/* Multi-Select Pattern */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '8px',
        }}>
          Multi-Select Pattern (Chip Group)
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--ld-semantic-color-text-subtle)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          marginBottom: '24px',
        }}>
          Click chips to toggle selections. 'All' is mutually exclusive with other options.
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Chip
            size="medium"
            selected={multiFilters.all}
            onClick={() => toggleMultiFilter('all')}
          >
            All
          </Chip>
          <Chip
            size="medium"
            selected={multiFilters.open}
            onClick={() => toggleMultiFilter('open')}
          >
            Open
          </Chip>
          <Chip
            size="medium"
            selected={multiFilters.closed}
            onClick={() => toggleMultiFilter('closed')}
          >
            Closed
          </Chip>
          <Chip
            size="medium"
            selected={multiFilters.assigned}
            onClick={() => toggleMultiFilter('assigned')}
          >
            Assigned to me
          </Chip>
        </div>
      </section>

      {/* Single-Select Pattern */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '8px',
        }}>
          Single-Select Pattern (Chip Group)
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--ld-semantic-color-text-subtle)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          marginBottom: '24px',
        }}>
          Only one chip can be selected at a time (radio-like behavior).
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['Featured', 'New', 'Sale', 'Clearance'].map((category) => (
            <Chip
              key={category}
              size="medium"
              selected={singleSelect === category.toLowerCase()}
              onClick={() => setSingleSelect(category.toLowerCase())}
            >
              {category}
            </Chip>
          ))}
        </div>
      </section>

      {/* Size Variants */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '8px',
        }}>
          Size Variants
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--ld-semantic-color-text-subtle)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          marginBottom: '24px',
        }}>
          Small (32px height) and Medium (40px height). Both use 16px horizontal padding.
        </p>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '8px' }}>
              Small (32px)
            </div>
            <Chip size="small">Label</Chip>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '8px' }}>
              Medium (40px)
            </div>
            <Chip size="medium">Label</Chip>
          </div>
        </div>
      </section>

      {/* All States */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '8px',
        }}>
          Chip States
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--ld-semantic-color-text-subtle)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          marginBottom: '24px',
        }}>
          Unselected (1px border), Selected (2px border, dark fill), Disabled (no fill, light gray), Selected + Disabled (2px border, no fill)
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <Chip size="medium" selected={false}>Unselected</Chip>
            <span style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)' }}>1px border</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <Chip size="medium" selected={true}>Selected</Chip>
            <span style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)' }}>2px border</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <Chip size="medium" disabled>Disabled</Chip>
            <span style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)' }}>No fill</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <Chip size="medium" selected={true} disabled>Selected + Disabled</Chip>
            <span style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)' }}>2px, no fill</span>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper components
function ExampleSection({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 style={{
        fontSize: '18px',
        fontWeight: 700,
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        color: 'var(--ld-semantic-color-text)',
        marginBottom: '8px',
      }}>
        {title}
      </h3>
      {description && (
        <p style={{
          fontSize: '14px',
          color: 'var(--ld-semantic-color-text-subtle)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          marginBottom: '16px',
        }}>
          {description}
        </p>
      )}
      {children}
    </section>
  );
}
