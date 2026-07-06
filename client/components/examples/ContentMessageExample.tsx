import * as React from 'react';
import { ContentMessage } from '@/components/ui/ContentMessage';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';

/** Illustration URLs from design specs */
const ILLUSTRATION_ASSOCIATE =
  'https://api.builder.io/api/v1/image/assets/TEMP/d765602fdd15c650de6c99f26bd09d93befa99d9?width=320';
const ILLUSTRATION_NETWORK =
  'https://api.builder.io/api/v1/image/assets/TEMP/1ac7052ece9dc20fd09502bad875e3ab5f703b56?width=320';
const ILLUSTRATION_SEARCH =
  'https://api.builder.io/api/v1/image/assets/TEMP/87426ce3ae8c79d99f1d834b94be056cabcc68ef?width=320';

export function ContentMessageExample() {
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* ── Error Types (Small) ── */}
      <ExampleSection
        title="Error Types (Small)"
        description="Standard error-state patterns from the design system. Each variant pairs a specific illustration with a descriptive title and next-step message."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '32px' }}>
          {/* 1 – Content not found */}
          <ContentMessage
            size="small"
            variant="neutral"
            title="[Information] isn't available right now"
            media={
              <img
                src={ILLUSTRATION_ASSOCIATE}
                alt="Content not found"
                style={{ width: 160, height: 160, objectFit: 'contain' }}
              />
            }
          >
            Refresh this page to try again.
          </ContentMessage>

          {/* 2 – No internet connection */}
          <ContentMessage
            size="small"
            variant="neutral"
            title="No internet connection"
            media={
              <img
                src={ILLUSTRATION_NETWORK}
                alt="No internet connection"
                style={{ width: 160, height: 160, objectFit: 'contain' }}
              />
            }
          >
            Make sure you&rsquo;re connected to WiFi or data and try again.
          </ContentMessage>

          {/* 3 – Page not found */}
          <ContentMessage
            size="small"
            variant="neutral"
            title="We couldn't find this page"
            media={
              <img
                src={ILLUSTRATION_SEARCH}
                alt="Page not found"
                style={{ width: 160, height: 160, objectFit: 'contain' }}
              />
            }
          >
            Try searching or go to the homepage.
          </ContentMessage>

          {/* 4 – App crashed */}
          <ContentMessage
            size="small"
            variant="neutral"
            title="Something went wrong"
            media={
              <img
                src={ILLUSTRATION_NETWORK}
                alt="App crashed"
                style={{ width: 160, height: 160, objectFit: 'contain' }}
              />
            }
          >
            Try restarting the app.
          </ContentMessage>

          {/* 5 – Technical issues */}
          <ContentMessage
            size="small"
            variant="neutral"
            title="There was a issue"
            media={
              <img
                src={ILLUSTRATION_ASSOCIATE}
                alt="Technical issue"
                style={{ width: 160, height: 160, objectFit: 'contain' }}
              />
            }
          >
            Refresh this page to try again.
          </ContentMessage>
        </div>
      </ExampleSection>

      {/* ── Error Types (Large) ── */}
      <ExampleSection
        title="Error Types (Large)"
        description="Same error patterns at the large size for full-page blocking states."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '32px' }}>
          <ContentMessage
            size="large"
            variant="neutral"
            title="[Information] isn't available right now"
            media={
              <img
                src={ILLUSTRATION_ASSOCIATE}
                alt="Content not found"
                style={{ width: 240, height: 240, objectFit: 'contain' }}
              />
            }
          >
            Refresh this page to try again.
          </ContentMessage>

          <ContentMessage
            size="large"
            variant="neutral"
            title="No internet connection"
            media={
              <img
                src={ILLUSTRATION_NETWORK}
                alt="No internet connection"
                style={{ width: 240, height: 240, objectFit: 'contain' }}
              />
            }
          >
            Make sure you&rsquo;re connected to WiFi or data and try again.
          </ContentMessage>

          <ContentMessage
            size="large"
            variant="neutral"
            title="We couldn't find this page"
            media={
              <img
                src={ILLUSTRATION_SEARCH}
                alt="Page not found"
                style={{ width: 240, height: 240, objectFit: 'contain' }}
              />
            }
          >
            Try searching or go to the homepage.
          </ContentMessage>

          <ContentMessage
            size="large"
            variant="neutral"
            title="Something went wrong"
            media={
              <img
                src={ILLUSTRATION_NETWORK}
                alt="App crashed"
                style={{ width: 240, height: 240, objectFit: 'contain' }}
              />
            }
          >
            Try restarting the app.
          </ContentMessage>

          <ContentMessage
            size="large"
            variant="neutral"
            title="There was a issue"
            media={
              <img
                src={ILLUSTRATION_ASSOCIATE}
                alt="Technical issue"
                style={{ width: 240, height: 240, objectFit: 'contain' }}
              />
            }
          >
            Refresh this page to try again.
          </ContentMessage>
        </div>
      </ExampleSection>

      {/* ── With Actions ── */}
      <ExampleSection
        title="With Actions"
        description="Content Messages can include action buttons to guide users to the next step."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '32px' }}>
          <ContentMessage
            size="small"
            variant="neutral"
            title="[Information] isn't available right now"
            media={
              <img
                src={ILLUSTRATION_ASSOCIATE}
                alt="Content not found"
                style={{ width: 160, height: 160, objectFit: 'contain' }}
              />
            }
            actions={
              <Button variant="primary" size="small" onClick={() => window.location.reload()}>
                Refresh page
              </Button>
            }
          >
            Refresh this page to try again.
          </ContentMessage>

          <ContentMessage
            size="small"
            variant="neutral"
            title="We couldn't find this page"
            media={
              <img
                src={ILLUSTRATION_SEARCH}
                alt="Page not found"
                style={{ width: 160, height: 160, objectFit: 'contain' }}
              />
            }
            actions={
              <ButtonGroup>
                <Button variant="primary" size="small">
                  Go to homepage
                </Button>
                <Button variant="secondary" size="small">
                  Search
                </Button>
              </ButtonGroup>
            }
          >
            Try searching or go to the homepage.
          </ContentMessage>

          <ContentMessage
            size="small"
            variant="neutral"
            title="Something went wrong"
            media={
              <img
                src={ILLUSTRATION_NETWORK}
                alt="App crashed"
                style={{ width: 160, height: 160, objectFit: 'contain' }}
              />
            }
            actions={
              <ButtonGroup>
                <Button variant="primary" size="small" onClick={() => window.location.reload()}>
                  Reload page
                </Button>
                <Button variant="secondary" size="small">
                  Contact support
                </Button>
              </ButtonGroup>
            }
          >
            Try restarting the app.
          </ContentMessage>
        </div>
      </ExampleSection>

      {/* ── Variant Showcase ── */}
      <ExampleSection
        title="Variants"
        description="Content Messages support error, success, info, warning, and neutral variants for color-coding severity."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          <ContentMessage
            variant="error"
            title="We can't load your orders"
            media={
              <div style={{
                width: 160,
                height: 160,
                backgroundColor: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)',
                borderRadius: '8px'
              }} />
            }
            actions={
              <ButtonGroup>
                <Button variant="primary" size="small" onClick={() => window.location.reload()}>
                  Reload page
                </Button>
                <Button variant="secondary" size="small">
                  Contact support
                </Button>
              </ButtonGroup>
            }
          >
            Check your connection, then try again. If the issue continues, contact support.
          </ContentMessage>

          <ContentMessage
            variant="success"
            title="Payment confirmed"
            media={
              <div style={{
                width: 160,
                height: 160,
                backgroundColor: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)',
                borderRadius: '8px'
              }} />
            }
            actions={
              <Button variant="primary" size="small">
                Continue shopping
              </Button>
            }
          >
            Your order has been placed and a confirmation email is on its way.
          </ContentMessage>

          <ContentMessage
            variant="info"
            title="New features available"
            media={
              <div style={{
                width: 160,
                height: 160,
                backgroundColor: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)',
                borderRadius: '8px'
              }} />
            }
            actions={
              <Button variant="secondary" size="small">
                Learn more
              </Button>
            }
          >
            We&rsquo;ve added new reporting tools to help you track campaign performance.
          </ContentMessage>

          <ContentMessage
            variant="warning"
            title="Your session is expiring"
            media={
              <div style={{
                width: 160,
                height: 160,
                backgroundColor: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)',
                borderRadius: '8px'
              }} />
            }
            actions={
              <Button variant="primary" size="small">
                Stay signed in
              </Button>
            }
          >
            You&rsquo;ll be signed out in 5 minutes due to inactivity.
          </ContentMessage>

          <ContentMessage
            variant="neutral"
            title="No campaigns yet"
          >
            Create your first campaign to start reaching customers.
          </ContentMessage>
        </div>
      </ExampleSection>

      {/* ── Size Variants ── */}
      <ExampleSection
        title="Size Variants"
        description="Small (default) for compact layouts, large for full-page blocking states."
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <VariantLabel>Small (default)</VariantLabel>
            <ContentMessage
              size="small"
              variant="error"
              title="Service unavailable"
              media={
                <div style={{
                  width: 160,
                  height: 160,
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)',
                  borderRadius: '8px'
                }} />
              }
              actions={
                <Button variant="primary" size="small">
                  Retry
                </Button>
              }
            >
              We&rsquo;re experiencing an outage. Please try again shortly.
            </ContentMessage>
          </div>
          <div>
            <VariantLabel>Large</VariantLabel>
            <ContentMessage
              size="large"
              variant="error"
              title="Service unavailable"
              media={
                <div style={{
                  width: 240,
                  height: 240,
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)',
                  borderRadius: '8px'
                }} />
              }
              actions={
                <ButtonGroup>
                  <Button variant="primary" size="medium">
                    Retry
                  </Button>
                  <Button variant="secondary" size="medium">
                    Contact support
                  </Button>
                </ButtonGroup>
              }
            >
              We&rsquo;re experiencing an outage. Please try again shortly.
            </ContentMessage>
          </div>
        </div>
      </ExampleSection>

      {/* ── Heading Levels ── */}
      <ExampleSection
        title="Heading Levels"
        description="Use headingLevel to maintain a correct heading hierarchy in nested contexts."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
          <ContentMessage variant="neutral" title="Heading h2 (default)" headingLevel="h2">
            Default heading level for full-page states.
          </ContentMessage>
          <ContentMessage variant="neutral" title="Heading h3" headingLevel="h3">
            For use inside a section with an h2 parent.
          </ContentMessage>
          <ContentMessage variant="neutral" title="Heading h4" headingLevel="h4">
            For deeply nested content areas.
          </ContentMessage>
        </div>
      </ExampleSection>

      {/* ── Usage ── */}
      <ExampleSection
        title="Usage"
        description="Import and use the ContentMessage component."
      >
        <pre
          style={{
            fontFamily: 'var(--ld-semantic-font-family-mono)',
            fontSize: '13px',
            color: 'var(--ld-semantic-color-text)',
            lineHeight: '1.6',
            overflowX: 'auto',
            padding: '16px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
            margin: 0,
          }}
        >
{`import { ContentMessage } from '@/components/ui/ContentMessage';
import { Button } from '@/components/ui/Button';

// Content not found
<ContentMessage
  size="small"
  variant="neutral"
  title="[Information] isn't available right now"
  media={<img src="..." alt="Content not found" style={{ width: 160, height: 160 }} />}
>
  Refresh this page to try again.
</ContentMessage>

// No internet connection
<ContentMessage
  size="small"
  variant="neutral"
  title="No internet connection"
  media={<img src="..." alt="No internet" style={{ width: 160, height: 160 }} />}
>
  Make sure you're connected to WiFi or data and try again.
</ContentMessage>

// Page not found (404)
<ContentMessage
  size="small"
  variant="neutral"
  title="We couldn't find this page"
  media={<img src="..." alt="Not found" style={{ width: 160, height: 160 }} />}
>
  Try searching or go to the homepage.
</ContentMessage>

// App crashed
<ContentMessage
  size="small"
  variant="neutral"
  title="Something went wrong"
  media={<img src="..." alt="Error" style={{ width: 160, height: 160 }} />}
>
  Try restarting the app.
</ContentMessage>

// Technical issues
<ContentMessage
  size="small"
  variant="neutral"
  title="There was a issue"
  media={<img src="..." alt="Issue" style={{ width: 160, height: 160 }} />}
>
  Refresh this page to try again.
</ContentMessage>

// With actions
<ContentMessage
  variant="error"
  title="Something went wrong"
  actions={
    <ButtonGroup>
      <Button variant="primary" size="small">Reload page</Button>
      <Button variant="secondary" size="small">Contact support</Button>
    </ButtonGroup>
  }
>
  Try restarting the app.
</ContentMessage>`}
        </pre>
      </ExampleSection>
    </div>
  );
}

/* ─── Helper sub-components ─── */

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
      <h3
        style={{
          fontSize: '16px',
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '4px',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--ld-semantic-color-text-subtle)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          marginBottom: '16px',
          lineHeight: '1.5',
        }}
      >
        {description}
      </p>
      {children}
    </div>
  );
}

function VariantLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: 'block',
        fontSize: '13px',
        fontWeight: 600,
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        color: 'var(--ld-semantic-color-text-subtle)',
        marginBottom: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.4px',
      }}
    >
      {children}
    </span>
  );
}
