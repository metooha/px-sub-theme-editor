import * as React from 'react';
import { Tag } from '@/components/ui/Tag';
import * as Icons from '@/components/icons';

export function TagExample() {
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px', maxWidth: '1200px' }}>
      {/* All Three Variants */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '8px',
        }}>
          Tag Variants
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--ld-semantic-color-text-subtle)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          marginBottom: '24px',
        }}>
          Primary (filled), Secondary (text-only, default), and Tertiary (subtle fill) variants for different emphasis levels.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '8px' }}>
              Primary (Filled)
            </div>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              <Tag variant="primary" color="brand">Brand</Tag>
              <Tag variant="primary" color="positive">Positive</Tag>
              <Tag variant="primary" color="negative">Negative</Tag>
              <Tag variant="primary" color="warning">Warning</Tag>
              <Tag variant="primary" color="info">Info</Tag>
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '8px' }}>
              Secondary (Text-only) - Default
            </div>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              <Tag variant="secondary" color="brand">Brand</Tag>
              <Tag variant="secondary" color="positive">Positive</Tag>
              <Tag variant="secondary" color="negative">Negative</Tag>
              <Tag variant="secondary" color="warning">Warning</Tag>
              <Tag variant="secondary" color="info">Info</Tag>
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '8px' }}>
              Tertiary (Subtle Fill)
            </div>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              <Tag variant="tertiary" color="brand">Brand</Tag>
              <Tag variant="tertiary" color="positive">Positive</Tag>
              <Tag variant="tertiary" color="negative">Negative</Tag>
              <Tag variant="tertiary" color="warning">Warning</Tag>
              <Tag variant="tertiary" color="info">Info</Tag>
            </div>
          </div>
        </div>
      </section>

      {/* All Semantic Colors (Primary) */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '8px',
        }}>
          Semantic Colors
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--ld-semantic-color-text-subtle)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          marginBottom: '24px',
        }}>
          Primary variant showcasing all 6 semantic colors for communicating meaning and state.
        </p>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          <Tag variant="primary" color="brand">Brand</Tag>
          <Tag variant="primary" color="positive">Positive</Tag>
          <Tag variant="primary" color="negative">Negative</Tag>
          <Tag variant="primary" color="warning">Warning</Tag>
          <Tag variant="primary" color="info">Info</Tag>
          <Tag variant="primary" color="edited">Edited</Tag>
        </div>
      </section>

      {/* All Accent Colors (Tertiary) */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '8px',
        }}>
          Accent Colors
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--ld-semantic-color-text-subtle)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          marginBottom: '24px',
        }}>
          Tertiary variant with all 11 accent colors for categorical labeling and visual variety.
        </p>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          <Tag variant="tertiary" color="blue">Blue</Tag>
          <Tag variant="tertiary" color="spark">Spark</Tag>
          <Tag variant="tertiary" color="green">Green</Tag>
          <Tag variant="tertiary" color="red">Red</Tag>
          <Tag variant="tertiary" color="purple">Purple</Tag>
          <Tag variant="tertiary" color="gray">Gray</Tag>
          <Tag variant="tertiary" color="cyan">Cyan</Tag>
          <Tag variant="tertiary" color="orange">Orange</Tag>
          <Tag variant="tertiary" color="pink">Pink</Tag>
          <Tag variant="tertiary" color="yellow">Yellow</Tag>
          <Tag variant="tertiary" color="teal">Teal</Tag>
        </div>
      </section>

      {/* With Leading Icons */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '8px',
        }}>
          Tags with Leading Icons
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--ld-semantic-color-text-subtle)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          marginBottom: '24px',
        }}>
          Optional 14px icons can precede the label to provide additional visual context.
        </p>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          <Tag variant="primary" color="positive" leading={<Icons.Check style={{ width: 14, height: 14 }} />}>
            Verified
          </Tag>
          <Tag variant="primary" color="brand" leading={<Icons.Star style={{ width: 14, height: 14 }} />}>
            Featured
          </Tag>
          <Tag variant="primary" color="warning" leading={<Icons.Warning style={{ width: 14, height: 14 }} />}>
            Pending
          </Tag>
          <Tag variant="primary" color="negative" leading={<Icons.X style={{ width: 14, height: 14 }} />}>
            Rejected
          </Tag>
          <Tag variant="tertiary" color="info" leading={<Icons.InfoCircle style={{ width: 14, height: 14 }} />}>
            Information
          </Tag>
        </div>
      </section>

      {/* Usage Example: Item Labels */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '8px',
        }}>
          Practical Usage: Product Labels
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--ld-semantic-color-text-subtle)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          marginBottom: '24px',
        }}>
          Tags help categorize and label items with attributes. Use 4px spacing between multiple tags.
        </p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '16px' 
        }}>
          {[
            { name: 'Premium Headphones', tags: [
              { variant: 'primary' as const, color: 'brand' as const, text: 'New' },
              { variant: 'tertiary' as const, color: 'positive' as const, text: 'In Stock' }
            ]},
            { name: 'Smart Watch', tags: [
              { variant: 'primary' as const, color: 'negative' as const, text: 'Sale' },
              { variant: 'secondary' as const, color: 'warning' as const, text: 'Limited' }
            ]},
            { name: 'Wireless Keyboard', tags: [
              { variant: 'tertiary' as const, color: 'blue' as const, text: 'Electronics' },
              { variant: 'tertiary' as const, color: 'purple' as const, text: 'Trending' }
            ]},
          ].map((item, i) => (
            <div 
              key={i}
              style={{
                padding: '16px',
                border: '1px solid var(--ld-semantic-color-border-moderate)',
                borderRadius: '8px',
                backgroundColor: 'var(--ld-semantic-color-fill-surface-primary)',
              }}
            >
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--ld-semantic-color-text-primary)',
                marginBottom: '12px',
              }}>
                {item.name}
              </div>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {item.tags.map((tag, j) => (
                  <Tag key={j} variant={tag.variant} color={tag.color}>
                    {tag.text}
                  </Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All 17 Colors Grid */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '8px',
        }}>
          All 17 Colors (Primary Variant)
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--ld-semantic-color-text-subtle)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          marginBottom: '24px',
        }}>
          Complete color palette: 6 semantic colors + 11 accent colors = 17 total options.
        </p>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          <Tag variant="primary" color="brand">Brand</Tag>
          <Tag variant="primary" color="positive">Positive</Tag>
          <Tag variant="primary" color="negative">Negative</Tag>
          <Tag variant="primary" color="warning">Warning</Tag>
          <Tag variant="primary" color="info">Info</Tag>
          <Tag variant="primary" color="edited">Edited</Tag>
          <Tag variant="primary" color="blue">Blue</Tag>
          <Tag variant="primary" color="spark">Spark</Tag>
          <Tag variant="primary" color="green">Green</Tag>
          <Tag variant="primary" color="red">Red</Tag>
          <Tag variant="primary" color="purple">Purple</Tag>
          <Tag variant="primary" color="gray">Gray</Tag>
          <Tag variant="primary" color="cyan">Cyan</Tag>
          <Tag variant="primary" color="orange">Orange</Tag>
          <Tag variant="primary" color="pink">Pink</Tag>
          <Tag variant="primary" color="yellow">Yellow</Tag>
          <Tag variant="primary" color="teal">Teal</Tag>
        </div>
      </section>

      {/* Design Tokens Info */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '8px',
        }}>
          Design Tokens
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--ld-semantic-color-text-subtle)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          marginBottom: '24px',
        }}>
          All Tag styles use Living Design 3.5 semantic tokens exclusively. Typography: 12px Everyday Sans UI (caption font).
        </p>
        <div style={{
          padding: '16px',
          backgroundColor: 'var(--ld-semantic-color-fill-surface-secondary)',
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '12px',
          color: 'var(--ld-semantic-color-text-secondary)',
        }}>
          <div>Font: var(--ld-semantic-font-caption-family)</div>
          <div>Size: var(--ld-semantic-font-caption-size) → 12px</div>
          <div>Weight: var(--ld-semantic-font-caption-weight-default) → 400</div>
          <div>Line height: var(--ld-semantic-font-caption-lineheight) → 16px</div>
          <div style={{ marginTop: '8px' }}>Icon size: var(--ld-semantic-scale-icon-small) → 16px</div>
        </div>
      </section>
    </div>
  );
}
