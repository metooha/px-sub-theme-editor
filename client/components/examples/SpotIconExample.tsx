import * as React from 'react';
import { SpotIcon } from '@/components/ui/SpotIcon';
import { Article, Bell, Settings, Star, User, Cart, Calendar, Search } from '@/components/icons';

/**
 * Example component demonstrating SpotIcon usage with Living Design 3.5
 * 
 * SpotIcons are decorative elements used to add visual interest and direct
 * user attention to interface elements.
 */
export function SpotIconExample() {
  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      
      {/* Size Variants */}
      <section>
        <h2 style={{ 
          marginBottom: '16px', 
          fontSize: '20px', 
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)'
        }}>
          Sizes
        </h2>
        <p style={{ 
          marginBottom: '24px',
          fontSize: '16px',
          color: 'var(--ld-semantic-color-text)',
          fontFamily: 'var(--ld-semantic-font-family-sans)'
        }}>
          SpotIcon is available in two sizes: small (48px container, 24px icon) and large (64px container, 32px icon).
        </p>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <SpotIcon icon={<Article />} size="small" color="brand" />
            <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text)' }}>Small</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <SpotIcon icon={<Article />} size="large" color="brand" />
            <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text)' }}>Large</span>
          </div>
        </div>
      </section>

      {/* Color Variants */}
      <section>
        <h2 style={{ 
          marginBottom: '16px', 
          fontSize: '20px', 
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)'
        }}>
          Colors
        </h2>
        <p style={{
          marginBottom: '24px',
          fontSize: '16px',
          color: 'var(--ld-semantic-color-text)',
          fontFamily: 'var(--ld-semantic-font-family-sans)'
        }}>
          SpotIcon supports brand, neutral, and white color variants.
        </p>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <SpotIcon icon={<Bell />} size="small" color="brand" />
            <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text)' }}>Brand</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <SpotIcon icon={<Bell />} size="small" color="neutral" />
            <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text)' }}>Neutral</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', backgroundColor: '#2e2f32', padding: '16px', borderRadius: '8px' }}>
            <SpotIcon icon={<Bell />} size="small" color="white" />
            <span style={{ fontSize: '14px', color: '#ffffff' }}>White</span>
          </div>
        </div>
      </section>

      {/* All Combinations */}
      <section>
        <h2 style={{ 
          marginBottom: '16px', 
          fontSize: '20px', 
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)'
        }}>
          All Variants
        </h2>
        <p style={{ 
          marginBottom: '24px',
          fontSize: '16px',
          color: 'var(--ld-semantic-color-text)',
          fontFamily: 'var(--ld-semantic-font-family-sans)'
        }}>
          All combinations of size and color variants.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <SpotIcon icon={<Settings />} size="small" color="brand" />
            <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text)', textAlign: 'center' }}>
              Small / Brand
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <SpotIcon icon={<Settings />} size="small" color="neutral" />
            <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text)', textAlign: 'center' }}>
              Small / Neutral
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <SpotIcon icon={<Settings />} size="large" color="brand" />
            <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text)', textAlign: 'center' }}>
              Large / Brand
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <SpotIcon icon={<Settings />} size="large" color="neutral" />
            <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text)', textAlign: 'center' }}>
              Large / Neutral
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', backgroundColor: '#2e2f32', padding: '16px', borderRadius: '8px' }}>
            <SpotIcon icon={<Settings />} size="small" color="white" />
            <span style={{ fontSize: '14px', color: '#ffffff', textAlign: 'center' }}>
              Small / White
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', backgroundColor: '#2e2f32', padding: '16px', borderRadius: '8px' }}>
            <SpotIcon icon={<Settings />} size="large" color="white" />
            <span style={{ fontSize: '14px', color: '#ffffff', textAlign: 'center' }}>
              Large / White
            </span>
          </div>
        </div>
      </section>

      {/* Different Icons */}
      <section>
        <h2 style={{ 
          marginBottom: '16px', 
          fontSize: '20px', 
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)'
        }}>
          Different Icons
        </h2>
        <p style={{ 
          marginBottom: '24px',
          fontSize: '16px',
          color: 'var(--ld-semantic-color-text)',
          fontFamily: 'var(--ld-semantic-font-family-sans)'
        }}>
          SpotIcon can display any icon from the icon library.
        </p>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <SpotIcon icon={<Article />} size="small" color="brand" />
          <SpotIcon icon={<Bell />} size="small" color="brand" />
          <SpotIcon icon={<Settings />} size="small" color="brand" />
          <SpotIcon icon={<Star />} size="small" color="brand" />
          <SpotIcon icon={<User />} size="small" color="brand" />
          <SpotIcon icon={<Cart />} size="small" color="brand" />
          <SpotIcon icon={<Calendar />} size="small" color="brand" />
          <SpotIcon icon={<Search />} size="small" color="brand" />
        </div>
      </section>

      {/* Usage Note */}
      <section style={{ 
        padding: '16px', 
        backgroundColor: 'var(--ld-semantic-color-fill-neutral-subtle)',
        borderRadius: '8px',
        border: '1px solid var(--ld-semantic-color-border-subtle)'
      }}>
        <h3 style={{ 
          marginBottom: '8px', 
          fontSize: '16px', 
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)'
        }}>
          Usage Guidelines
        </h3>
        <ul style={{ 
          margin: 0, 
          paddingLeft: '20px',
          fontSize: '14px',
          color: 'var(--ld-semantic-color-text)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          lineHeight: '1.5'
        }}>
          <li>SpotIcons are <strong>decorative only</strong> and not interactive</li>
          <li>Use them to add visual interest and direct user attention</li>
          <li>Common use cases: navigation items, messaging, list items</li>
          <li>For interactive icons, use the Icon Button component instead</li>
        </ul>
      </section>
    </div>
  );
}
