import * as React from 'react';
import { Checkbox } from '@/components/ui/Checkbox';

export function CheckboxExample() {
  const [singleChecked, setSingleChecked] = React.useState(false);

  // Select-all pattern
  const [items, setItems] = React.useState<Record<string, boolean>>({
    apples: false,
    oranges: true,
    bananas: false,
  });

  const checkedCount = Object.values(items).filter(Boolean).length;
  const totalCount = Object.keys(items).length;
  const allChecked = checkedCount === totalCount;
  const selectAllState: boolean | 'indeterminate' =
    checkedCount === 0 ? false : allChecked ? true : 'indeterminate';

  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    const next = checked === 'indeterminate' ? false : !!checked;
    setItems(prev =>
      Object.fromEntries(Object.keys(prev).map(k => [k, next])),
    );
  };

  const handleItemChange = (key: string, checked: boolean | 'indeterminate') => {
    setItems(prev => ({ ...prev, [key]: !!checked }));
  };

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Basic States */}
      <ExampleSection title="Basic States" description="Unchecked, checked, and indeterminate checkbox states.">
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <StateDemo label="Unchecked">
            <Checkbox aria-label="Unchecked example" />
          </StateDemo>
          <StateDemo label="Checked">
            <Checkbox checked={true} onCheckedChange={() => {}} aria-label="Checked example" />
          </StateDemo>
          <StateDemo label="Indeterminate">
            <Checkbox checked="indeterminate" onCheckedChange={() => {}} aria-label="Indeterminate example" />
          </StateDemo>
        </div>
      </ExampleSection>

      {/* Disabled States */}
      <ExampleSection title="Disabled States" description="Disabled checkboxes in each state.">
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <StateDemo label="Disabled Unchecked">
            <Checkbox disabled aria-label="Disabled unchecked" />
          </StateDemo>
          <StateDemo label="Disabled Checked">
            <Checkbox checked={true} disabled onCheckedChange={() => {}} aria-label="Disabled checked" />
          </StateDemo>
          <StateDemo label="Disabled Indeterminate">
            <Checkbox checked="indeterminate" disabled onCheckedChange={() => {}} aria-label="Disabled indeterminate" />
          </StateDemo>
        </div>
      </ExampleSection>

      {/* With Labels */}
      <ExampleSection title="With Labels" description="Checkboxes with built-in label support. Clicking the label toggles the checkbox.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Checkbox
            label="I agree to the terms and conditions"
            checked={singleChecked}
            onCheckedChange={(c) => setSingleChecked(!!c)}
          />
          <Checkbox label="Subscribe to newsletter" defaultChecked />
          <Checkbox label="Disabled option" disabled />
          <Checkbox label="Disabled checked" checked={true} disabled onCheckedChange={() => {}} />
        </div>
      </ExampleSection>

      {/* Select All Pattern */}
      <ExampleSection title="Select All Pattern" description="Parent checkbox with indeterminate state for partial child selections.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{
            paddingBottom: '8px',
            borderBottom: '1px solid var(--ld-semantic-color-separator)',
            marginBottom: '4px'
          }}>
            <Checkbox
              label="Select all fruits"
              checked={selectAllState}
              onCheckedChange={handleSelectAll}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '24px' }}>
            {Object.entries(items).map(([key, checked]) => (
              <Checkbox
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                checked={checked}
                onCheckedChange={(c) => handleItemChange(key, c)}
              />
            ))}
          </div>
        </div>
      </ExampleSection>

      {/* Standalone (no label) */}
      <ExampleSection title="Standalone Checkboxes" description="Checkboxes used without labels (e.g. in data tables). An aria-label is required for accessibility.">
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Checkbox aria-label="Select row 1" />
          <Checkbox checked={true} onCheckedChange={() => {}} aria-label="Select row 2" />
          <Checkbox checked="indeterminate" onCheckedChange={() => {}} aria-label="Partial selection" />
          <Checkbox disabled aria-label="Disabled row" />
        </div>
      </ExampleSection>

      {/* Usage Code */}
      <ExampleSection title="Usage" description="Import and use the Checkbox component.">
        <pre style={{
          fontFamily: 'var(--ld-semantic-font-family-mono)',
          fontSize: '13px',
          color: 'var(--ld-semantic-color-text)',
          lineHeight: '1.6',
          overflowX: 'auto',
          padding: '16px',
          backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
          borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
          margin: 0
        }}>
{`import { Checkbox } from '@/components/ui/Checkbox';

// With label
<Checkbox label="Accept terms" checked={checked} onCheckedChange={setChecked} />

// Standalone (table row selection)
<Checkbox aria-label="Select row" checked={selected} onCheckedChange={setSelected} />

// Indeterminate (select-all)
<Checkbox checked="indeterminate" onCheckedChange={handleSelectAll} />

// Disabled
<Checkbox label="Unavailable" disabled />`}
        </pre>
      </ExampleSection>
    </div>
  );
}

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

function StateDemo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
    }}>
      {children}
      <span style={{
        fontSize: '12px',
        color: 'var(--ld-semantic-color-text-subtle)',
        fontFamily: 'var(--ld-semantic-font-family-sans)',
      }}>
        {label}
      </span>
    </div>
  );
}
