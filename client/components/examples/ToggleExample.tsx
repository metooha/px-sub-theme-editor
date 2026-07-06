import React from 'react';
import { Toggle } from '@/components/ui/Toggle';

export default function ToggleExample() {
  const [isBold, setIsBold] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);
  const [isUnderline, setIsUnderline] = React.useState(false);

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
          Single Toggle
        </h3>
        <Toggle pressed={isBold} onPressedChange={setIsBold} aria-label="Toggle bold">
          <strong>B</strong>
        </Toggle>
        <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary)' }}>
          Bold: {isBold ? 'On' : 'Off'}
        </p>
      </section>

      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Text Formatting Toggles
        </h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Toggle pressed={isBold} onPressedChange={setIsBold} aria-label="Toggle bold">
            <strong>B</strong>
          </Toggle>
          <Toggle pressed={isItalic} onPressedChange={setIsItalic} aria-label="Toggle italic">
            <em>I</em>
          </Toggle>
          <Toggle pressed={isUnderline} onPressedChange={setIsUnderline} aria-label="Toggle underline">
            <u>U</u>
          </Toggle>
        </div>
        <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary)' }}>
          Active: {[isBold && 'Bold', isItalic && 'Italic', isUnderline && 'Underline'].filter(Boolean).join(', ') || 'None'}
        </p>
      </section>

      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Disabled Toggle
        </h3>
        <Toggle disabled aria-label="Disabled toggle">
          <strong>B</strong>
        </Toggle>
      </section>
    </div>
  );
}
