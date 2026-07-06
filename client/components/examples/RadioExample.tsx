import * as React from 'react';
import { Radio } from '@/components/ui/Radio';
import { RadioGroup } from '@/components/ui/RadioGroup';

export function RadioExample() {
  const [fruit, setFruit] = React.useState('apple');
  const [plan, setPlan] = React.useState('pro');

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Visual States Grid */}
      <ExampleSection
        title="Visual States"
        description="All 10 Figma states: unselected × 5 (enabled, hovered, focused, pressed, disabled) and selected × 5."
      >
        <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
          {/* Unselected column */}
          <div>
            <h4 style={columnTitleStyle}>Unselected</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <RadioGroup value="">
                <Radio value="enabled" label="Enabled" />
              </RadioGroup>
              <p style={hintStyle}>Hover, focus, and press states appear on interaction</p>
              <RadioGroup value="">
                <Radio value="disabled" label="Disabled" disabled />
              </RadioGroup>
            </div>
          </div>

          {/* Selected column */}
          <div>
            <h4 style={columnTitleStyle}>Selected</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <RadioGroup value="enabled">
                <Radio value="enabled" label="Enabled" />
              </RadioGroup>
              <p style={hintStyle}>Hover, focus, and press states appear on interaction</p>
              <RadioGroup value="disabled">
                <Radio value="disabled" label="Disabled" disabled />
              </RadioGroup>
            </div>
          </div>
        </div>
      </ExampleSection>

      {/* Interactive RadioGroup - Vertical */}
      <ExampleSection
        title="Interactive RadioGroup (Vertical)"
        description="A vertical radio group with selectable options. Use arrow keys to navigate."
      >
        <RadioGroup value={fruit} onValueChange={setFruit}>
          <Radio value="apple" label="Apple" />
          <Radio value="orange" label="Orange" />
          <Radio value="banana" label="Banana" />
          <Radio value="grape" label="Grape" />
        </RadioGroup>
        <p style={{ ...hintStyle, marginTop: '12px' }}>
          Selected: <strong>{fruit}</strong>
        </p>
      </ExampleSection>

      {/* Horizontal Layout */}
      <ExampleSection
        title="Horizontal Layout"
        description="RadioGroup with horizontal orientation using CSS flex."
      >
        <RadioGroup
          value={plan}
          onValueChange={setPlan}
          style={{ display: 'flex', flexDirection: 'row', gap: '24px', flexWrap: 'wrap' }}
        >
          <Radio value="free" label="Free" />
          <Radio value="pro" label="Pro" />
          <Radio value="enterprise" label="Enterprise" />
        </RadioGroup>
        <p style={{ ...hintStyle, marginTop: '12px' }}>
          Selected: <strong>{plan}</strong>
        </p>
      </ExampleSection>

      {/* Disabled Group */}
      <ExampleSection
        title="Disabled Group"
        description="All options disabled. One is pre-selected to show the disabled-selected state."
      >
        <RadioGroup value="option-b" disabled>
          <Radio value="option-a" label="Option A" disabled />
          <Radio value="option-b" label="Option B" disabled />
          <Radio value="option-c" label="Option C" disabled />
        </RadioGroup>
      </ExampleSection>

      {/* Without Labels */}
      <ExampleSection
        title="Without Labels"
        description="Radio buttons without visible labels (e.g. in a data table). An aria-label is required for accessibility."
      >
        <RadioGroup value="b" style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          <Radio value="a" aria-label="Option A" />
          <Radio value="b" aria-label="Option B" />
          <Radio value="c" aria-label="Option C" />
        </RadioGroup>
      </ExampleSection>

      {/* Usage Code */}
      <ExampleSection title="Usage" description="Import and use the Radio and RadioGroup components.">
        <pre style={codeStyle}>
{`import { Radio } from '@/components/ui/Radio';
import { RadioGroup } from '@/components/ui/radio-group';

// Basic vertical group
<RadioGroup value={selected} onValueChange={setSelected}>
  <Radio value="a" label="Option A" />
  <Radio value="b" label="Option B" />
  <Radio value="c" label="Option C" />
</RadioGroup>

// Horizontal layout
<RadioGroup value={val} onValueChange={setVal}
  style={{ display: 'flex', flexDirection: 'row', gap: '24px' }}
>
  <Radio value="left" label="Left" />
  <Radio value="center" label="Center" />
  <Radio value="right" label="Right" />
</RadioGroup>

// Disabled
<RadioGroup value="b" disabled>
  <Radio value="a" label="A" disabled />
  <Radio value="b" label="B" disabled />
</RadioGroup>

// Without labels
<Radio value="x" aria-label="Hidden label" />`}
        </pre>
      </ExampleSection>
    </div>
  );
}

/* ---- Shared helpers (same pattern as CheckboxExample) ---- */

const columnTitleStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 600,
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  color: 'var(--ld-semantic-color-text-subtle)',
  marginBottom: '12px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
};

const hintStyle: React.CSSProperties = {
  fontSize: '12px',
  color: 'var(--ld-semantic-color-text-subtle)',
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  margin: 0,
};

const codeStyle: React.CSSProperties = {
  fontFamily: 'var(--ld-semantic-font-family-mono)',
  fontSize: '13px',
  color: 'var(--ld-semantic-color-text)',
  lineHeight: '1.6',
  overflowX: 'auto',
  padding: '16px',
  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
  borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
  margin: 0,
};

function ExampleSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 style={{
        fontSize: '16px',
        fontWeight: 700,
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        color: 'var(--ld-semantic-color-text)',
        marginBottom: '4px',
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '14px',
        color: 'var(--ld-semantic-color-text-subtle)',
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        marginBottom: '16px',
        lineHeight: '1.5',
      }}>
        {description}
      </p>
      {children}
    </div>
  );
}
