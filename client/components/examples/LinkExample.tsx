import { Link } from '@/components/ui/Link';

/**
 * LinkExample - Demonstrates LD 3.5 Link component usage
 *
 * Reference: guidelines/Link.md
 * Variants: Default, Subtle, White
 */
export function LinkExample() {
  return (
    <div className="p-8 space-y-8 max-w-4xl">
      <section>
        <h2 className="text-xl font-bold mb-4">Default Links (Underlined)</h2>
        <div className="space-y-4">
          <p className="text-base">
            Visit our <Link href="/account">account settings</Link> to manage your preferences.
          </p>
          <p className="text-base">
            Read the <Link href="https://walmart.com" target="_blank">Walmart documentation</Link> for more information.
          </p>
          <p className="text-base">
            Jump to the <Link href="#section">billing section</Link> below.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Standalone Links</h2>
        <div className="space-y-3">
          <div>
            <Link href="/dashboard">Go to Dashboard</Link>
          </div>
          <div>
            <Link href="/campaigns">View All Campaigns</Link>
          </div>
          <div>
            <Link href="/reports">View Reports</Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Subtle Variant</h2>
        <div className="space-y-4">
          <p className="text-base">
            For less emphasis, use <Link href="/help" variant="subtle">subtle links</Link> in secondary content.
          </p>
          <div className="space-y-2">
            <div>
              <Link href="/terms" variant="subtle">Terms of Service</Link>
            </div>
            <div>
              <Link href="/privacy" variant="subtle">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Links Without Underline (Hover to Reveal)</h2>
        <div className="space-y-4">
          <p className="text-base">
            Navigate to <Link href="/products" underline={false}>products page</Link> or{' '}
            <Link href="/services" underline={false}>services page</Link>.
          </p>
          <div className="flex gap-6">
            <Link href="/home" underline={false}>Home</Link>
            <Link href="/about" underline={false}>About</Link>
            <Link href="/contact" underline={false}>Contact</Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">White Variant (For Dark Backgrounds)</h2>
        <div
          style={{
            backgroundColor: 'var(--ld-semantic-color-surface-inverse)',
            padding: 'var(--ld-primitive-scale-space-300)',
            borderRadius: 'var(--ld-primitive-scale-border-radius-100)'
          }}
        >
          <p style={{
            color: 'var(--ld-semantic-color-text-inverse)',
            marginBottom: 'var(--ld-primitive-scale-space-200)'
          }}>
            Use white links on dark backgrounds: <Link href="/help" variant="white">Help Center</Link> or{' '}
            <Link href="/support" variant="white">Contact Support</Link>.
          </p>
          <div style={{ display: 'flex', gap: 'var(--ld-primitive-scale-space-300)' }}>
            <Link href="/terms" variant="white">Terms</Link>
            <Link href="/privacy" variant="white">Privacy</Link>
            <Link href="/accessibility" variant="white">Accessibility</Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">External Links</h2>
        <div className="space-y-3">
          <div>
            <Link 
              href="https://www.walmart.com" 
              target="_blank"
            >
              Walmart Homepage (opens in new tab)
            </Link>
          </div>
          <div>
            <Link 
              href="https://corporate.walmart.com" 
              target="_blank"
            >
              Walmart Corporate (opens in new tab)
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Link States</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Default state:</p>
            <Link href="/default">Regular link</Link>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Hover state (hover over link):</p>
            <Link href="/hover">Hover over me</Link>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Focus state (tab to focus):</p>
            <Link href="/focus">Tab to focus this link</Link>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Visited state (click then reload):</p>
            <Link href="/visited">Click me to see visited state</Link>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Disabled state:</p>
            <Link href="/disabled" aria-disabled="true">Disabled link</Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">In-Context Usage</h2>
        <div className="space-y-4">
          <p className="text-base leading-relaxed">
            The Living Design system provides a comprehensive set of components for building
            accessible and consistent user interfaces. For more details, see the{' '}
            <Link href="/guidelines">component guidelines</Link> or visit our{' '}
            <Link href="https://design.walmart.com" target="_blank">design system documentation</Link>.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Need help? Contact <Link href="mailto:support@walmart.com">support@walmart.com</Link>{' '}
            or call <Link href="tel:+1-800-925-6278">1-800-WALMART</Link>.
          </p>
        </div>
      </section>

      <section id="section">
        <h2 className="text-xl font-bold mb-4">In-Page Anchor Target</h2>
        <p className="text-base">
          This section is the target for the "Jump to billing section" link above.
        </p>
      </section>
    </div>
  );
}
