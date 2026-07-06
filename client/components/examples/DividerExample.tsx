import { Divider } from '@/components/ui/Divider';

export function DividerExample() {
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Horizontal (default) */}
      <ExampleSection
        title="Horizontal (default)"
        description="A full-width 1 px line using the LD 3.5 separator token. No margin by default — consumers control spacing via wrapper."
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
          <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text)' }}>Section A</span>
          <Divider />
          <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text)' }}>Section B</span>
        </div>
      </ExampleSection>

      {/* Vertical */}
      <ExampleSection
        title="Vertical"
        description="A 1 px vertical line that stretches to the height of its flex parent."
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '48px' }}>
          <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text)' }}>Left</span>
          <Divider orientation="vertical" />
          <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text)' }}>Right</span>
        </div>
      </ExampleSection>

      {/* With title */}
      <ExampleSection
        title="With Title"
        description="A titled divider renders two horizontal rules flanking a centered label."
      >
        <div style={{ width: '100%' }}>
          <Divider title="Or continue with" />
        </div>
      </ExampleSection>

      {/* Spacing via UNSAFE_className */}
      <ExampleSection
        title="Custom Spacing"
        description="Use UNSAFE_className to add spacing when needed (e.g. my-4, mx-6)."
      >
        <div style={{ width: '100%', padding: '0 24px' }}>
          <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text)', display: 'block', marginBottom: '4px' }}>
            Content above
          </span>
          <Divider UNSAFE_className="my-4" />
          <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text)', display: 'block', marginTop: '4px' }}>
            Content below
          </span>
        </div>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 700,
          color: 'var(--ld-semantic-color-text)',
          margin: 0,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--ld-semantic-color-text-subtle)',
          margin: '4px 0 0',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
        }}>
          {description}
        </p>
      </div>
      <div style={{
        padding: '24px',
        borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
        border: '1px solid var(--ld-semantic-color-border-subtlest, #E8E9EB)',
        backgroundColor: 'var(--ld-semantic-color-surface, #fff)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {children}
      </div>
    </div>
  );
}
