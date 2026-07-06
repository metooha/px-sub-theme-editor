import * as React from 'react';
import { FormGroup } from '@/components/ui/FormGroup';
import { Checkbox } from '@/components/ui/Checkbox';
import { Radio } from '@/components/ui/Radio';
import { RadioGroup } from '@/components/ui/RadioGroup';

export function FormGroupExample() {
  const [radioVal, setRadioVal] = React.useState('option-a');

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Three-Column Layout (matches Figma screenshot) */}
      <ExampleSection
        title="Form Group States"
        description="Three states shown side-by-side: basic, error, and helper text."
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
        }}>
          {/* Column 1: Basic */}
          <FormGroup label="Group label">
            <Checkbox label="Label" />
            <Checkbox label="Label" />
            <Checkbox label="Label" />
            <Checkbox label="Label" />
            <Checkbox label="Label" />
          </FormGroup>

          {/* Column 2: Error State */}
          <FormGroup label="Group label" error="Error text">
            <Checkbox label="Label" />
            <Checkbox label="Label" />
            <Checkbox label="Label" />
            <Checkbox label="Label" />
            <Checkbox label="Label" />
          </FormGroup>

          {/* Column 3: Helper Text */}
          <FormGroup label="Group label" helperText="Helper text">
            <Checkbox label="Label" />
            <Checkbox label="Label" />
            <Checkbox label="Label" />
            <Checkbox label="Label" />
            <Checkbox label="Label" />
          </FormGroup>
        </div>
      </ExampleSection>

      {/* Basic Checkbox Group */}
      <ExampleSection
        title="Basic Checkbox Group"
        description="Simple group of checkboxes with a label."
      >
        <FormGroup label="Select your preferences">
          <Checkbox label="Email notifications" />
          <Checkbox label="SMS notifications" />
          <Checkbox label="Push notifications" />
        </FormGroup>
      </ExampleSection>

      {/* With Helper Text */}
      <ExampleSection
        title="With Helper Text"
        description="Descriptive helper text provides additional context below the label."
      >
        <FormGroup label="Dietary restrictions" helperText="Select all that apply to your diet.">
          <Checkbox label="Vegetarian" />
          <Checkbox label="Vegan" />
          <Checkbox label="Gluten-free" />
          <Checkbox label="Dairy-free" />
        </FormGroup>
      </ExampleSection>

      {/* Error State */}
      <ExampleSection
        title="Error State"
        description="Error message with icon takes precedence over helper text."
      >
        <FormGroup
          label="Agree to terms"
          error="You must select at least one option"
          helperText="This helper text is hidden because an error is present."
        >
          <Checkbox label="I agree to the Terms of Service" />
          <Checkbox label="I agree to the Privacy Policy" />
        </FormGroup>
      </ExampleSection>

      {/* With Radio Buttons */}
      <ExampleSection
        title="With Radio Buttons"
        description="FormGroup wrapping a RadioGroup for semantic grouping."
      >
        <FormGroup label="Choose a shipping method">
          <RadioGroup value={radioVal} onValueChange={setRadioVal}>
            <Radio value="option-a" label="Standard (5-7 days)" />
            <Radio value="option-b" label="Express (2-3 days)" />
            <Radio value="option-c" label="Overnight (1 day)" />
          </RadioGroup>
        </FormGroup>
        <p style={{ ...hintStyle, marginTop: '8px' }}>
          Selected: <strong>{radioVal}</strong>
        </p>
      </ExampleSection>

      {/* Required */}
      <ExampleSection
        title="Required Field"
        description="Shows a required asterisk (*) after the label."
      >
        <FormGroup label="Contact method" required>
          <Checkbox label="Phone" />
          <Checkbox label="Email" />
          <Checkbox label="Mail" />
        </FormGroup>
      </ExampleSection>

      {/* Disabled */}
      <ExampleSection
        title="Disabled State"
        description="Entire group is disabled and dimmed."
      >
        <FormGroup label="Unavailable options" disabled>
          <Checkbox label="Option A" disabled />
          <Checkbox label="Option B" disabled />
          <Checkbox label="Option C" disabled />
        </FormGroup>
      </ExampleSection>

      {/* Usage Code */}
      <ExampleSection title="Usage" description="Import and use the FormGroup component.">
        <pre style={codeStyle}>
{`import { FormGroup } from '@/components/ui/FormGroup';
import { Checkbox } from '@/components/ui/Checkbox';
import { Radio } from '@/components/ui/Radio';
import { RadioGroup } from '@/components/ui/radio-group';

// Basic checkbox group
<FormGroup label="Select options">
  <Checkbox label="Option A" />
  <Checkbox label="Option B" />
</FormGroup>

// With helper text
<FormGroup label="Preferences" helperText="Choose all that apply">
  <Checkbox label="Email" />
  <Checkbox label="SMS" />
</FormGroup>

// Error state
<FormGroup label="Required field" error="Please select at least one">
  <Checkbox label="Accept terms" />
</FormGroup>

// With radio buttons
<FormGroup label="Choose one">
  <RadioGroup value={val} onValueChange={setVal}>
    <Radio value="a" label="Option A" />
    <Radio value="b" label="Option B" />
  </RadioGroup>
</FormGroup>

// Required + disabled
<FormGroup label="Contact" required disabled>
  <Checkbox label="Phone" disabled />
</FormGroup>`}
        </pre>
      </ExampleSection>
    </div>
  );
}

/* ---- Shared helpers (same pattern as other examples) ---- */

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
