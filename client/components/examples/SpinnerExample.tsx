import React from 'react';
import { Spinner } from '../ui/Spinner';
import { Button } from '../ui/Button';

const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  fontSize: '18px',
  fontWeight: 700,
  marginBottom: '24px',
  color: 'var(--ld-semantic-color-text-primary)',
};

const cardStyle: React.CSSProperties = {
  padding: '24px',
  backgroundColor: 'var(--ld-semantic-color-fill-secondary)',
  borderRadius: '8px',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  fontSize: '14px',
  color: 'var(--ld-semantic-color-text-secondary)',
  marginTop: '8px',
};

const sublabelStyle: React.CSSProperties = {
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  fontSize: '12px',
  color: 'var(--ld-semantic-color-text-tertiary)',
  marginTop: '4px',
};

export const SpinnerExample: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>

      {/* ── Sizes & Colors ───────────────────────────────────────── */}
      <section>
        <h3 style={sectionHeadingStyle}>Spinner</h3>
        <p style={{ ...sublabelStyle, marginBottom: '24px', fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary)' }}>
          A pulsing spark that indicates a loading state. Available in two sizes and two color variants.
        </p>

        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {/* Neutral on light */}
          <div
            style={{
              ...cardStyle,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              minWidth: '160px',
            }}
          >
            <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <Spinner color="neutral" size="large" />
                <span style={labelStyle}>Large</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <Spinner color="neutral" size="small" />
                <span style={labelStyle}>Small</span>
              </div>
            </div>
            <span style={sublabelStyle}>Neutral · Light background</span>
          </div>

          {/* White on dark */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              padding: '24px',
              backgroundColor: 'var(--ld-semantic-color-fill-primary, #0071DC)',
              borderRadius: '8px',
              minWidth: '160px',
            }}
          >
            <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <Spinner color="white" size="large" />
                <span style={{ ...labelStyle, color: 'rgba(255,255,255,0.8)' }}>Large</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <Spinner color="white" size="small" />
                <span style={{ ...labelStyle, color: 'rgba(255,255,255,0.8)' }}>Small</span>
              </div>
            </div>
            <span style={{ ...sublabelStyle, color: 'rgba(255,255,255,0.6)' }}>White · Dark background</span>
          </div>
        </div>
      </section>

      {/* ── Common Patterns ──────────────────────────────────────── */}
      <section>
        <h3 style={sectionHeadingStyle}>Common Patterns</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Inline with text */}
          <div
            style={{
              ...cardStyle,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <Spinner size="small" />
            <span style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '14px', color: 'var(--ld-semantic-color-text-primary)' }}>
              Loading your data…
            </span>
          </div>

          {/* Buttons with loading state */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button variant="primary" disabled>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Spinner color="white" size="small" />
                <span>Saving…</span>
              </div>
            </Button>
            <Button variant="secondary" disabled>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Spinner size="small" />
                <span>Processing…</span>
              </div>
            </Button>
          </div>

          {/* Full page loading state */}
          <div
            style={{
              ...cardStyle,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              minHeight: '200px',
            }}
          >
            <Spinner size="large" a11yLabel="Loading content…" />
            <span style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '16px', color: 'var(--ld-semantic-color-text-primary)' }}>
              Loading content…
            </span>
          </div>
        </div>
      </section>

      {/* ── Accessibility ────────────────────────────────────────── */}
      <section>
        <h3 style={sectionHeadingStyle}>Accessibility</h3>
        <div
          style={{
            ...cardStyle,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Spinner size="small" a11yLabel="Saving your changes…" />
            <span style={labelStyle}>aria-label: "Saving your changes…"</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Spinner size="small" a11yLabel="Uploading file…" />
            <span style={labelStyle}>aria-label: "Uploading file…"</span>
          </div>
          <p style={{ ...sublabelStyle, marginTop: '8px', fontStyle: 'italic' }}>
            All spinners include <code>role="status"</code> and a customizable <code>aria-label</code> for screen reader support.
          </p>
        </div>
      </section>
    </div>
  );
};

export default SpinnerExample;
