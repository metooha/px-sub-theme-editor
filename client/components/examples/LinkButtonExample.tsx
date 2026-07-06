import * as React from 'react';
import { LinkButton } from '@/components/ui/LinkButton';
import { ChevronRight, Home, ExternalLink, ArrowLeft } from '@/components/icons';

/**
 * LinkButtonExample – Demonstrates LD 3.5 LinkButton component usage.
 *
 * Reference: guidelines/design-system/LinkButton.md
 * Colors: default, subtle, white
 * Sizes: small, medium, large
 */
export function LinkButtonExample() {
  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '900px' }}>
      {/* ── Color Variants ── */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Color Variants
        </h2>
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'center' }}>
          <LinkButton color="default" href="/default">
            Default
          </LinkButton>
          <LinkButton color="subtle" href="/subtle">
            Subtle
          </LinkButton>
          <div
            style={{
              backgroundColor: '#2e2f32',
            padding: '12px 20px',
            borderRadius: 'var(--ld-primitive-scale-borderradius-100, 8px)',
            }}
          >
            <LinkButton color="white" href="/white">
              White
            </LinkButton>
          </div>
        </div>
      </section>

      {/* ── Size Variants ── */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Size Variants
        </h2>
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'baseline' }}>
          <LinkButton size="small" href="/small">
            Small (14px)
          </LinkButton>
          <LinkButton size="medium" href="/medium">
            Medium (16px)
          </LinkButton>
          <LinkButton size="large" href="/large">
            Large (18px)
          </LinkButton>
        </div>
      </section>

      {/* ── With Icons ── */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          With Icons
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
          <LinkButton
            href="/home"
            size="medium"
            leading={<Home />}
          >
            Leading icon
          </LinkButton>
          <LinkButton
            href="/next"
            size="medium"
            trailing={<ChevronRight />}
          >
            Trailing icon
          </LinkButton>
          <LinkButton
            href="/nav"
            size="medium"
            leading={<ArrowLeft />}
            trailing={<ChevronRight />}
          >
            Both icons
          </LinkButton>
        </div>
      </section>

      {/* ── Sizes × Icons ── */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Size + Icon Combinations
        </h2>
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'baseline' }}>
          <LinkButton size="small" href="#" leading={<Home />} trailing={<ChevronRight />}>
            Small
          </LinkButton>
          <LinkButton size="medium" href="#" leading={<Home />} trailing={<ChevronRight />}>
            Medium
          </LinkButton>
          <LinkButton size="large" href="#" leading={<Home />} trailing={<ChevronRight />}>
            Large
          </LinkButton>
        </div>
      </section>

      {/* ── Button Variant (no href) ── */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Button Variant (no href)
        </h2>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
          <LinkButton onClick={() => alert('Clicked!')}>
            Click me
          </LinkButton>
          <LinkButton type="submit">
            Submit
          </LinkButton>
          <LinkButton type="reset">
            Reset
          </LinkButton>
        </div>
      </section>

      {/* ── Disabled State ── */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Disabled State
        </h2>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
          <LinkButton disabled>
            Disabled button
          </LinkButton>
          <LinkButton disabled leading={<Home />} trailing={<ChevronRight />}>
            Disabled with icons
          </LinkButton>
        </div>
      </section>

      {/* ── Full Width ── */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Full Width
        </h2>
        <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <LinkButton isFullWidth href="/full" size="medium">
            Full Width Link
          </LinkButton>
          <LinkButton
            isFullWidth
            href="/full-icons"
            size="medium"
            leading={<Home />}
            trailing={<ChevronRight />}
          >
            Full Width with Icons
          </LinkButton>
        </div>
      </section>

      {/* ── External Links ── */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          External Link
        </h2>
        <LinkButton
          href="https://www.walmart.com"
          target="_blank"
          rel="noopener noreferrer"
          trailing={<ExternalLink />}
          size="medium"
        >
          Open in new tab
        </LinkButton>
      </section>

      {/* ── White on Dark Background ── */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          White on Dark Background
        </h2>
        <div
          style={{
            backgroundColor: '#2e2f32',
            padding: '24px',
            borderRadius: 'var(--ld-primitive-scale-borderradius-100, 8px)',
            display: 'flex',
            gap: '32px',
            flexWrap: 'wrap',
            alignItems: 'baseline',
          }}
        >
          <LinkButton color="white" size="small" href="#">
            Small
          </LinkButton>
          <LinkButton color="white" size="medium" href="#">
            Medium
          </LinkButton>
          <LinkButton color="white" size="large" href="#" trailing={<ChevronRight />}>
            Large with icon
          </LinkButton>
        </div>
      </section>
    </div>
  );
}
