import React from 'react';
import { PrimarySection, SecondarySection, TertiarySection } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export default function SectionExample() {
  return (
    <div className="section-example" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ld-primitive-scale-space-400)' }}>
      {/* Primary Section */}
      <PrimarySection
        title="Primary Section"
        description="Top-level page section with prominent heading, generous padding, and strong elevation."
        actions={<Button variant="primary" size="medium">Action</Button>}
      >
        <p style={{
          margin: 0,
          fontSize: 'var(--ld-semantic-font-body-medium-size)',
          lineHeight: 'var(--ld-semantic-font-body-medium-lineheight)',
          color: 'var(--ld-semantic-color-text-subtle)',
        }}>
          This is the main content area of a primary section. Use primary sections for top-level groupings on a page.
        </p>
      </PrimarySection>

      {/* Secondary Section */}
      <SecondarySection
        title="Secondary Section"
        description="Sub-section with medium heading, moderate padding, and subtle elevation."
        divider
      >
        <p style={{
          margin: 0,
          fontSize: 'var(--ld-semantic-font-body-medium-size)',
          lineHeight: 'var(--ld-semantic-font-body-medium-lineheight)',
          color: 'var(--ld-semantic-color-text-subtle)',
        }}>
          Secondary sections work well for sub-sections within a larger page area.
        </p>
      </SecondarySection>

      {/* Tertiary Section */}
      <TertiarySection
        title="Tertiary Section"
        description="Compact nested grouping with flat styling and subtle border."
      >
        <p style={{
          margin: 0,
          fontSize: 'var(--ld-semantic-font-body-small-size)',
          lineHeight: 'var(--ld-semantic-font-body-small-lineheight)',
          color: 'var(--ld-semantic-color-text-subtle)',
        }}>
          Tertiary sections are ideal for nested groupings within secondary sections.
        </p>
      </TertiarySection>

      {/* Collapsible Primary */}
      <PrimarySection
        title="Collapsible Primary Section"
        description="This section can be collapsed by clicking the title."
        collapsible
        defaultOpen={false}
      >
        <p style={{
          margin: 0,
          fontSize: 'var(--ld-semantic-font-body-medium-size)',
          lineHeight: 'var(--ld-semantic-font-body-medium-lineheight)',
          color: 'var(--ld-semantic-color-text-subtle)',
        }}>
          Hidden by default. Click the title to reveal this content.
        </p>
      </PrimarySection>

      {/* Nested Sections */}
      <PrimarySection title="Nested Sections" divider>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ld-primitive-scale-space-200)' }}>
          <SecondarySection title="Sub-section A">
            <TertiarySection title="Detail Group 1">
              <p style={{
                margin: 0,
                fontSize: 'var(--ld-semantic-font-body-small-size)',
                color: 'var(--ld-semantic-color-text-subtle)',
              }}>
                Deeply nested content demonstrating section hierarchy.
              </p>
            </TertiarySection>
          </SecondarySection>
          <SecondarySection title="Sub-section B" collapsible>
            <p style={{
              margin: 0,
              fontSize: 'var(--ld-semantic-font-body-medium-size)',
              color: 'var(--ld-semantic-color-text-subtle)',
            }}>
              Another sub-section that is collapsible.
            </p>
          </SecondarySection>
        </div>
      </PrimarySection>
    </div>
  );
}
