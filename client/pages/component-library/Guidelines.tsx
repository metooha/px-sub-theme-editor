import React from 'react';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Tabs, TabList, Tab, TabPanel } from '@/components/ui/Tab';
import * as Icons from '@/components/icons';
import { PageHeader } from '@/components/ui/PageHeader';
import { useTranslation } from 'react-i18next';
import { GuidelinesDocIndex } from './GuidelinesDocIndex';

export default function GuidelinesPage() {
  const { t } = useTranslation();
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <PageHeader section={t('componentLibrary.gettingStarted')} title={t('componentLibrary.guidelinesTitle')} description={t('componentLibrary.guidelinesDesc')} />

      <Tabs defaultValue="overview">
        <TabList>
          <Tab value="overview">{t('componentLibrary.tabOverview')}</Tab>
          <Tab value="principles">{t('componentLibrary.tabDesignPrinciples')}</Tab>
          <Tab value="components">{t('componentLibrary.tabComponentUsage')}</Tab>
          <Tab value="accessibility">{t('componentLibrary.tabAccessibility')}</Tab>
          <Tab value="code">{t('componentLibrary.tabCodeStandards')}</Tab>
          <Tab value="tokens">{t('componentLibrary.tabTokenUsage')}</Tab>
          <Tab value="agent">{t('componentLibrary.tabAgentRules')}</Tab>
          <Tab value="docs">{t('componentLibrary.tabDocIndex')}</Tab>
        </TabList>

        {/* Overview Tab */}
        <TabPanel value="overview">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '24px' }}>
            <div style={{
              backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
              padding: '32px',
              borderRadius: '8px',
              borderLeft: '5px solid var(--ld-semantic-color-border-brand)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--ld-semantic-color-text)',
                marginBottom: '12px'
              }}>
                Living Design 3.5 Portable Kit
              </h3>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.7',
                color: 'var(--ld-semantic-color-text-subtle)',
                marginBottom: '16px'
              }}>
                Every Builder.io project benefits from a shared foundation. Without a portable component library, teams
                build their own buttons, forms, and layouts from scratch -- resulting in visual inconsistencies, duplicated
                effort, accessibility gaps, and a fragmented user experience across products.
              </p>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.7',
                color: 'var(--ld-semantic-color-text-subtle)',
                marginBottom: '0'
              }}>
                The Living Design 3.5 Portable Kit is a self-contained component library designed to travel with any
                Builder.io project. It bakes in WCAG 2.1 AA accessibility, uses semantic design tokens for theming and
                dark mode, and provides a consistent visual language that propagates automatically -- no per-component
                rework required. Drop it into any project, and every surface draws from the same library: you ship faster,
                stay consistent, and deliver a polished, professional product.
              </p>
            </div>

            <div style={{
              backgroundColor: 'var(--ld-semantic-color-surface)',
              padding: '32px',
              borderRadius: '8px',
              boxShadow: 'var(--ld-semantic-elevation-100)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--ld-semantic-color-text)',
                marginBottom: '20px'
              }}>
                Rules for Generating New Designs & Importing from Figma
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[{
                  num: 1,
                  title: 'Always Search the Library First',
                  desc: <>Before creating any new UI, check <code style={{ backgroundColor: 'var(--ld-semantic-color-fill-subtle)', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>client/components/ui/</code> for existing Living Design 3.5 components. Follow the principle: <strong>Reuse &gt; Adapt &gt; Create</strong>. Only build something new when no existing component or composition of components can solve the need.</>
                }, {
                  num: 2,
                  title: 'Use Semantic Tokens -- Never Hard-Code Colors or Spacing',
                  desc: <>Every color, spacing value, elevation, and font must reference a Living Design semantic token (e.g. <code style={{ backgroundColor: 'var(--ld-semantic-color-fill-subtle)', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>var(--ld-semantic-color-action-fill-primary)</code>). Hard-coded hex values like <code style={{ backgroundColor: 'var(--ld-semantic-color-fill-subtle)', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>#0071DC</code> bypass theming capabilities and will break when themes or brands change.</>
                }, {
                  num: 3,
                  title: 'Importing Figma Designs with the Builder.io Plugin',
                  desc: <>When pulling designs from Figma, use the <strong>Builder.io Figma plugin</strong> to convert frames into code. The plugin maps Figma components to our library -- but always verify the output: confirm that imported buttons resolve to <code style={{ backgroundColor: 'var(--ld-semantic-color-fill-subtle)', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>&lt;Button&gt;</code> from our library (not raw HTML), that colors map to semantic tokens (not hex), and that spacing uses LD token values. Treat the plugin output as a starting point, not a finished product.</>
                }, {
                  num: 4,
                  title: 'Trust the Foundations & Theming Layer',
                  desc: 'Our components ship with built-in accessibility (focus rings, ARIA attributes, keyboard navigation), responsive behavior, and theme support. Do not override these with custom CSS or inline styles. If a component variant doesn\'t exist for your use case, propose adding it to the library rather than creating a one-off workaround. This keeps the system extensible and maintainable.'
                }, {
                  num: 5,
                  title: 'AI-Generated Code Must Follow the Same Rules',
                  desc: 'Whether code is written by hand, generated by AI, or imported from Figma via Builder.io -- the same standards apply. AI agents are configured with rules that enforce library usage, token-based styling, and component reuse. Review all generated output to confirm it references our canonical components, uses semantic tokens, and follows the import conventions documented in the Code Standards tab.'
                }].map((rule) => (
                  <div key={rule.num} style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '20px',
                    backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                    borderRadius: '8px'
                  }}>
                    <div style={{
                      minWidth: '36px',
                      height: '36px',
                      backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      fontSize: '16px',
                      color: 'var(--ld-semantic-color-text-brand-bold)'
                    }}>{rule.num}</div>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '6px', color: 'var(--ld-semantic-color-text)' }}>
                        {rule.title}
                      </div>
                      <div style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--ld-semantic-color-text-subtle)' }}>
                        {rule.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabPanel>

        {/* Design Principles Tab */}
        <TabPanel value="principles">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '24px' }}>
            <div style={{
              backgroundColor: 'var(--ld-semantic-color-surface)',
              padding: '32px',
              borderRadius: '8px',
              boxShadow: 'var(--ld-semantic-elevation-100)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--ld-semantic-color-text)',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icons.Check style={{ width: 20, height: 20, color: 'var(--ld-semantic-color-text-brand-bold)' }} />
                </div>
                Accessibility First
              </h3>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: 'var(--ld-semantic-color-text-subtle)',
                marginBottom: '20px'
              }}>
                All components must meet WCAG 2.1 AA standards for accessibility compliance.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px'
              }}>
                <div style={{
                  padding: '16px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px'
                }}>
                  <div style={{ fontWeight: '700', marginBottom: '8px', fontSize: '14px' }}>
                    Color Contrast
                  </div>
                  <div style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--ld-semantic-color-text-subtle)' }}>
                    Minimum 4.5:1 ratio for text, 3:1 for UI components
                  </div>
                </div>
                <div style={{
                  padding: '16px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px'
                }}>
                  <div style={{ fontWeight: '700', marginBottom: '8px', fontSize: '14px' }}>
                    Keyboard Navigation
                  </div>
                  <div style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--ld-semantic-color-text-subtle)' }}>
                    All interactive elements accessible via Tab, Enter, Space, Arrows
                  </div>
                </div>
                <div style={{
                  padding: '16px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px'
                }}>
                  <div style={{ fontWeight: '700', marginBottom: '8px', fontSize: '14px' }}>
                    Screen Readers
                  </div>
                  <div style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--ld-semantic-color-text-subtle)' }}>
                    Proper ARIA labels, roles, and semantic HTML structure
                  </div>
                </div>
                <div style={{
                  padding: '16px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px'
                }}>
                  <div style={{ fontWeight: '700', marginBottom: '8px', fontSize: '14px' }}>
                    Focus Indicators
                  </div>
                  <div style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--ld-semantic-color-text-subtle)' }}>
                    2px visible outline using focus ring tokens
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--ld-semantic-color-surface)',
              padding: '32px',
              borderRadius: '8px',
              boxShadow: 'var(--ld-semantic-elevation-100)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--ld-semantic-color-text)',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icons.Grid style={{ width: 20, height: 20, color: 'var(--ld-semantic-color-text-brand-bold)' }} />
                </div>
                Consistency & Reusability
              </h3>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: 'var(--ld-semantic-color-text-subtle)',
                marginBottom: '20px'
              }}>
                Always use existing components from the library. Check the component library before building anything new.
              </p>
              <div style={{
                padding: '16px',
                backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)',
                borderRadius: '6px',
                borderLeft: '4px solid var(--ld-semantic-color-border-info)'
              }}>
                <div style={{ fontWeight: '700', marginBottom: '8px', fontSize: '14px' }}>
                  Rule: Reuse &gt; Adapt &gt; Create
                </div>
                <div style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--ld-semantic-color-text-subtle)' }}>
                  1. First, search for an existing component that matches your need<br />
                  2. If close match, adapt existing component with props<br />
                  3. Only create new components when truly unique functionality is needed
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--ld-semantic-color-surface)',
              padding: '32px',
              borderRadius: '8px',
              boxShadow: 'var(--ld-semantic-elevation-100)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--ld-semantic-color-text)',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icons.Gear style={{ width: 20, height: 20, color: 'var(--ld-semantic-color-text-brand-bold)' }} />
                </div>
                Responsive Design
              </h3>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: 'var(--ld-semantic-color-text-subtle)'
              }}>
                Components should work across all device sizes. Use responsive tokens and breakpoints,
                not hard-coded pixel values.
              </p>
            </div>
          </div>
        </TabPanel>

        {/* Component Usage Tab */}
        <TabPanel value="components">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '24px' }}>
            <div style={{
              backgroundColor: 'var(--ld-semantic-color-surface)',
              padding: '32px',
              borderRadius: '8px',
              boxShadow: 'var(--ld-semantic-elevation-100)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--ld-semantic-color-text)',
                marginBottom: '24px'
              }}>
                Button Hierarchy
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: '16px',
                  alignItems: 'center',
                  padding: '16px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px'
                }}>
                  <Button variant="primary" size="medium">Primary</Button>
                  <div style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)' }}>
                    <strong>Main action</strong> - Only one per section/page. Most important action user should take.
                  </div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: '16px',
                  alignItems: 'center',
                  padding: '16px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px'
                }}>
                  <Button variant="secondary" size="medium">Secondary</Button>
                  <div style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)' }}>
                    <strong>Supporting actions</strong> - Can have multiple. Use for cancel, back, or alternative actions.
                  </div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: '16px',
                  alignItems: 'center',
                  padding: '16px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px'
                }}>
                  <Button variant="tertiary" size="medium">Tertiary</Button>
                  <div style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)' }}>
                    <strong>Low priority</strong> - Subtle actions, less emphasis. Use sparingly.
                  </div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: '16px',
                  alignItems: 'center',
                  padding: '16px',
                  backgroundColor: 'var(--ld-semantic-color-fill-negative-subtle)',
                  borderRadius: '6px'
                }}>
                  <Button variant="destructive" size="medium">Delete</Button>
                  <div style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)' }}>
                    <strong>Destructive actions</strong> - Delete, remove, cancel operations. Always confirm first.
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--ld-semantic-color-surface)',
              padding: '32px',
              borderRadius: '8px',
              boxShadow: 'var(--ld-semantic-elevation-100)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--ld-semantic-color-text)',
                marginBottom: '24px'
              }}>
                When to Use Each Component
              </h3>
              <div style={{
                display: 'grid',
                gap: '12px',
                fontSize: '14px'
              }}>
                {[
                  { name: 'Alerts', usage: 'Page-level or section-level messages for info, success, warning, error states' },
                  { name: 'Badges', usage: 'Count indicators, status labels, notification dots on buttons or icons' },
                  { name: 'Breadcrumbs', usage: 'Navigation trail showing current page hierarchy (2-5 levels)' },
                  { name: 'Callouts', usage: 'Contextual coaching tips, onboarding guidance, or feature highlights' },
                  { name: 'Cards', usage: 'Grouping related content with headers, actions, and content areas' },
                  { name: 'Chips', usage: 'Selectable categories or filters (single or multi-select)' },
                  { name: 'Content Messages', usage: 'Full-page states: empty, error, no permission, loading' },
                  { name: 'Date Fields', usage: 'Text input for dates with mm/dd/yyyy validation' },
                  { name: 'Modals', usage: 'Focused interactions requiring user attention or confirmation' },
                  { name: 'Nudges', usage: 'Non-critical supportive information with optional actions' },
                  { name: 'Text Fields', usage: 'Single-line text input for names, emails, search, etc.' },
                  { name: 'Text Area', usage: 'Multi-line text input for descriptions, comments, notes' },
                ].map((item) => (
                  <div
                    key={item.name}
                    style={{
                      padding: '16px',
                      backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                      borderRadius: '6px',
                      display: 'grid',
                      gridTemplateColumns: '180px 1fr',
                      gap: '16px',
                      alignItems: 'center'
                    }}
                  >
                    <strong style={{ color: 'var(--ld-semantic-color-text)' }}>{item.name}</strong>
                    <span style={{ color: 'var(--ld-semantic-color-text-subtle)', lineHeight: '1.6' }}>
                      {item.usage}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabPanel>

        {/* Accessibility Tab */}
        <TabPanel value="accessibility">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '24px' }}>
            <div style={{
              backgroundColor: 'var(--ld-semantic-color-surface)',
              padding: '32px',
              borderRadius: '8px',
              boxShadow: 'var(--ld-semantic-elevation-100)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--ld-semantic-color-text)',
                marginBottom: '24px'
              }}>
                WCAG 2.1 AA Requirements
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{
                  padding: '20px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px',
                  borderLeft: '4px solid var(--ld-semantic-color-border-brand)'
                }}>
                  <div style={{ fontWeight: '700', marginBottom: '12px', fontSize: '16px' }}>
                    1. Color Contrast
                  </div>
                  <ul style={{
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: 'var(--ld-semantic-color-text-subtle)',
                    paddingLeft: '20px'
                  }}>
                    <li>Text: 4.5:1 contrast ratio minimum</li>
                    <li>Large text (18px+): 3:1 contrast ratio minimum</li>
                    <li>UI components: 3:1 contrast ratio</li>
                    <li>Interactive elements: Must be distinguishable from non-interactive</li>
                  </ul>
                </div>

                <div style={{
                  padding: '20px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px',
                  borderLeft: '4px solid var(--ld-semantic-color-border-brand)'
                }}>
                  <div style={{ fontWeight: '700', marginBottom: '12px', fontSize: '16px' }}>
                    2. Keyboard Navigation
                  </div>
                  <ul style={{
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: 'var(--ld-semantic-color-text-subtle)',
                    paddingLeft: '20px'
                  }}>
                    <li>Tab: Move forward through interactive elements</li>
                    <li>Shift+Tab: Move backward</li>
                    <li>Enter/Space: Activate buttons, checkboxes, links</li>
                    <li>Arrow keys: Navigate within grouped elements (tabs, radio groups, menus)</li>
                    <li>Escape: Close modals, dropdowns, popovers</li>
                  </ul>
                </div>

                <div style={{
                  padding: '20px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px',
                  borderLeft: '4px solid var(--ld-semantic-color-border-brand)'
                }}>
                  <div style={{ fontWeight: '700', marginBottom: '12px', fontSize: '16px' }}>
                    3. ARIA Attributes
                  </div>
                  <ul style={{
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: 'var(--ld-semantic-color-text-subtle)',
                    paddingLeft: '20px'
                  }}>
                    <li>Use semantic HTML first (button, nav, header, main, etc.)</li>
                    <li>Add ARIA labels for context: aria-label, aria-labelledby</li>
                    <li>Indicate states: aria-disabled, aria-selected, aria-expanded</li>
                    <li>Associate related content: aria-describedby, aria-controls</li>
                    <li>Use appropriate roles: role="dialog", role="navigation", etc.</li>
                  </ul>
                </div>

                <div style={{
                  padding: '20px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px',
                  borderLeft: '4px solid var(--ld-semantic-color-border-brand)'
                }}>
                  <div style={{ fontWeight: '700', marginBottom: '12px', fontSize: '16px' }}>
                    4. Focus Management
                  </div>
                  <ul style={{
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: 'var(--ld-semantic-color-text-subtle)',
                    paddingLeft: '20px'
                  }}>
                    <li>Always show visible focus indicators (never outline: none without replacement)</li>
                    <li>Use LD 3.5 focus ring tokens for consistency</li>
                    <li>Trap focus within modals and dialogs</li>
                    <li>Return focus to trigger element when closing overlays</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        {/* Code Standards Tab */}
        <TabPanel value="code">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '24px' }}>
            <div style={{
              backgroundColor: 'var(--ld-semantic-color-surface)',
              padding: '32px',
              borderRadius: '8px',
              boxShadow: 'var(--ld-semantic-elevation-100)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--ld-semantic-color-text)',
                marginBottom: '24px'
              }}>
                Import Conventions
              </h3>
              <div style={{
                backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                padding: '20px',
                borderRadius: '6px',
                fontFamily: 'var(--ld-semantic-font-family-mono)',
                fontSize: '13px',
                lineHeight: '1.8',
                marginBottom: '16px'
              }}>
                <div style={{ color: 'var(--ld-semantic-color-text-positive)', marginBottom: '4px' }}>
                  // ✅ CORRECT - Import from uppercase path
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text)' }}>
                  import &#123; Button &#125; from '@/components/ui/Button';
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text)' }}>
                  import &#123; TextField &#125; from '@/components/ui/TextField';
                </div>
                <br />
                <div style={{ color: 'var(--ld-semantic-color-text-negative)', marginBottom: '4px' }}>
                  // ❌ WRONG - Deprecated lowercase imports
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text-subtlest)', textDecoration: 'line-through' }}>
                  import &#123; Button &#125; from '@/components/ui/button';
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text-subtlest)', textDecoration: 'line-through' }}>
                  import &#123; Input &#125; from '@/components/ui/input';
                </div>
              </div>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: 'var(--ld-semantic-color-text-subtle)',
                padding: '16px',
                backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)',
                borderRadius: '6px',
                borderLeft: '4px solid var(--ld-semantic-color-border-info)'
              }}>
                <strong>Note:</strong> Living Design 3.5 components use uppercase filenames (Button.tsx, TextField.tsx).
                Shadcn/radix components use lowercase (popover.tsx, dialog.tsx).
              </p>
            </div>

            <div style={{
              backgroundColor: 'var(--ld-semantic-color-surface)',
              padding: '32px',
              borderRadius: '8px',
              boxShadow: 'var(--ld-semantic-elevation-100)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--ld-semantic-color-text)',
                marginBottom: '24px'
              }}>
                Component Props Best Practices
              </h3>
              <div style={{
                backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                padding: '20px',
                borderRadius: '6px',
                fontFamily: 'var(--ld-semantic-font-family-mono)',
                fontSize: '13px',
                lineHeight: '1.8',
                marginBottom: '16px'
              }}>
                <div style={{ color: 'var(--ld-semantic-color-text-positive)', marginBottom: '4px' }}>
                  // ✅ CORRECT - Use semantic props
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text)' }}>
                  &lt;Button variant="primary" size="medium"&gt;
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text)' }}>
                  &nbsp;&nbsp;Click me
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text)' }}>
                  &lt;/Button&gt;
                </div>
                <br />
                <div style={{ color: 'var(--ld-semantic-color-text)' }}>
                  &lt;TextField
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text)' }}>
                  &nbsp;&nbsp;label="Email"
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text)' }}>
                  &nbsp;&nbsp;error=&#123;emailError&#125;
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text)' }}>
                  &nbsp;&nbsp;helperText="We'll never share your email"
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text)' }}>
                  /&gt;
                </div>
                <br />
                <div style={{ color: 'var(--ld-semantic-color-text-negative)', marginBottom: '4px' }}>
                  // ❌ WRONG - Don't override with inline styles
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text-subtlest)', textDecoration: 'line-through' }}>
                  &lt;Button style=&#123;&#123; backgroundColor: '#0071DC' &#125;&#125;&gt;
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text-subtlest)', textDecoration: 'line-through' }}>
                  &nbsp;&nbsp;Click me
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text-subtlest)', textDecoration: 'line-through' }}>
                  &lt;/Button&gt;
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--ld-semantic-color-surface)',
              padding: '32px',
              borderRadius: '8px',
              boxShadow: 'var(--ld-semantic-elevation-100)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--ld-semantic-color-text)',
                marginBottom: '24px'
              }}>
                Layout Patterns
              </h3>
              <div style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--ld-semantic-color-text-subtle)' }}>
                <div style={{ marginBottom: '16px' }}>
                  <strong style={{ color: 'var(--ld-semantic-color-text)' }}>Forms</strong><br />
                  Use 16px gap between form fields per LD 3.5 spec. Stack fields vertically with consistent spacing.
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <strong style={{ color: 'var(--ld-semantic-color-text)' }}>Button Groups</strong><br />
                  Always use ButtonGroup component for multiple buttons. Ensures proper spacing and alignment.
                </div>
                <div>
                  <strong style={{ color: 'var(--ld-semantic-color-text)' }}>Cards</strong><br />
                  Use elevation (box-shadow), not borders. Default to elevation-100 for standard cards.
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        {/* Token Usage Tab */}
        <TabPanel value="tokens">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '24px' }}>
            <div style={{
              backgroundColor: 'var(--ld-semantic-color-surface)',
              padding: '32px',
              borderRadius: '8px',
              boxShadow: 'var(--ld-semantic-elevation-100)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--ld-semantic-color-text)',
                marginBottom: '24px'
              }}>
                Design Token Hierarchy
              </h3>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: 'var(--ld-semantic-color-text-subtle)',
                marginBottom: '24px'
              }}>
                Living Design 3.5 uses a two-tier token system: <strong>Primitive</strong> tokens (base values) 
                and <strong>Semantic</strong> tokens (context-specific values).
              </p>

              <div style={{ display: 'grid', gap: '16px' }}>
                <div style={{
                  padding: '20px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px'
                }}>
                  <div style={{ fontWeight: '700', marginBottom: '12px', fontSize: '16px', color: 'var(--ld-semantic-color-text-brand)' }}>
                    Semantic Tokens (USE THESE)
                  </div>
                  <div style={{
                    fontFamily: 'var(--ld-semantic-font-family-mono)',
                    fontSize: '13px',
                    lineHeight: '1.8',
                    color: 'var(--ld-semantic-color-text-subtle)'
                  }}>
                    --ld-semantic-color-text<br />
                    --ld-semantic-color-action-fill-primary<br />
                    --ld-semantic-spacing-200<br />
                    --ld-semantic-border-radius-medium
                  </div>
                  <p style={{
                    fontSize: '14px',
                    marginTop: '12px',
                    color: 'var(--ld-semantic-color-text-subtle)',
                    lineHeight: '1.6'
                  }}>
                    Context-aware tokens that adapt to themes. Always prefer these.
                  </p>
                </div>

                <div style={{
                  padding: '20px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px',
                  opacity: 0.7
                }}>
                  <div style={{ fontWeight: '700', marginBottom: '12px', fontSize: '16px', color: 'var(--ld-semantic-color-text-subtlest)' }}>
                    Primitive Tokens (Avoid)
                  </div>
                  <div style={{
                    fontFamily: 'var(--ld-semantic-font-family-mono)',
                    fontSize: '13px',
                    lineHeight: '1.8',
                    color: 'var(--ld-semantic-color-text-subtlest)'
                  }}>
                    --ld-primitive-color-blue-100<br />
                    --ld-primitive-scale-space-200<br />
                    --ld-primitive-font-size-100
                  </div>
                  <p style={{
                    fontSize: '14px',
                    marginTop: '12px',
                    color: 'var(--ld-semantic-color-text-subtlest)',
                    lineHeight: '1.6'
                  }}>
                    Base values without context. Only use when semantic tokens don't exist.
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--ld-semantic-color-surface)',
              padding: '32px',
              borderRadius: '8px',
              boxShadow: 'var(--ld-semantic-elevation-100)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--ld-semantic-color-text)',
                marginBottom: '24px'
              }}>
                Common Token Categories
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '16px',
                fontSize: '14px'
              }}>
                <div style={{
                  padding: '16px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px'
                }}>
                  <div style={{ fontWeight: '700', marginBottom: '8px' }}>Colors</div>
                  <div style={{
                    fontFamily: 'var(--ld-semantic-font-family-mono)',
                    fontSize: '12px',
                    lineHeight: '1.6',
                    color: 'var(--ld-semantic-color-text-subtle)'
                  }}>
                    --ld-semantic-color-text<br />
                    --ld-semantic-color-fill-*<br />
                    --ld-semantic-color-border-*<br />
                    --ld-semantic-color-action-*
                  </div>
                </div>
                <div style={{
                  padding: '16px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px'
                }}>
                  <div style={{ fontWeight: '700', marginBottom: '8px' }}>Spacing</div>
                  <div style={{
                    fontFamily: 'var(--ld-semantic-font-family-mono)',
                    fontSize: '12px',
                    lineHeight: '1.6',
                    color: 'var(--ld-semantic-color-text-subtle)'
                  }}>
                    --ld-semantic-spacing-100<br />
                    --ld-semantic-spacing-200<br />
                    --ld-semantic-spacing-300<br />
                    --ld-primitive-scale-space-*
                  </div>
                </div>
                <div style={{
                  padding: '16px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px'
                }}>
                  <div style={{ fontWeight: '700', marginBottom: '8px' }}>Typography</div>
                  <div style={{
                    fontFamily: 'var(--ld-semantic-font-family-mono)',
                    fontSize: '12px',
                    lineHeight: '1.6',
                    color: 'var(--ld-semantic-color-text-subtle)'
                  }}>
                    --ld-semantic-font-family-sans<br />
                    --ld-semantic-font-body-*-size<br />
                    --ld-semantic-font-heading-*
                  </div>
                </div>
                <div style={{
                  padding: '16px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px'
                }}>
                  <div style={{ fontWeight: '700', marginBottom: '8px' }}>Elevation</div>
                  <div style={{
                    fontFamily: 'var(--ld-semantic-font-family-mono)',
                    fontSize: '12px',
                    lineHeight: '1.6',
                    color: 'var(--ld-semantic-color-text-subtle)'
                  }}>
                    --ld-semantic-elevation-100<br />
                    --ld-semantic-elevation-200<br />
                    --ld-semantic-elevation-300
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--ld-semantic-color-surface)',
              padding: '32px',
              borderRadius: '8px',
              boxShadow: 'var(--ld-semantic-elevation-100)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--ld-semantic-color-text)',
                marginBottom: '24px'
              }}>
                TypeScript Usage
              </h3>
              <ul style={{
                fontSize: '14px',
                lineHeight: '1.8',
                color: 'var(--ld-semantic-color-text-subtle)',
                paddingLeft: '24px'
              }}>
                <li>Always export TypeScript types for component props</li>
                <li>Use React.forwardRef for components that need ref access</li>
                <li>Provide prop type unions for variants (e.g., size: 'small' | 'medium' | 'large')</li>
                <li>Document props with JSDoc comments</li>
                <li>Use discriminated unions for complex state management</li>
              </ul>
            </div>
          </div>
        </TabPanel>
        {/* Agent Rules Tab */}
        <TabPanel value="agent">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '24px' }}>

            {/* Intro callout */}
            <div style={{
              backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
              padding: '24px 32px',
              borderRadius: '8px',
              borderLeft: '5px solid var(--ld-semantic-color-border-brand)'
            }}>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.7',
                color: 'var(--ld-semantic-color-text-subtle)',
                margin: 0
              }}>
                AI agents (Builder.io Fusion, Copilot, or any code-generation tool) operate under the same design-system
                contract as human developers. The rules below define how an agent must search, compose, and output UI
                so that every generated surface is indistinguishable from hand-crafted, library-compliant code.
              </p>
            </div>

            {/* Section 1 – How an Agent Builds UI */}
            <div style={{
              backgroundColor: 'var(--ld-semantic-color-surface)',
              padding: '32px',
              borderRadius: '8px',
              boxShadow: 'var(--ld-semantic-elevation-100)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--ld-semantic-color-text)',
                marginBottom: '24px'
              }}>
                How an Agent Builds UI
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: 'var(--ld-semantic-color-text-subtle)',
                marginBottom: '20px'
              }}>
                Before writing a single line of JSX, the agent follows a strict pre-implementation checklist:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[{
                  step: 1,
                  title: 'Search the component inventory',
                  detail: 'Scan client/components/ui/ for an existing Living Design 3.5 component that matches the need. Check design-system-docs/ and guidelines/ for documentation and usage examples.'
                }, {
                  step: 2,
                  title: 'Read the component docs',
                  detail: 'Open the matching .mdx or .md file to understand available props, variants, sizes, and states. Never guess -- always reference the documented API.'
                }, {
                  step: 3,
                  title: 'Compose before creating',
                  detail: 'If no single component matches, compose existing components together. A card with actions is a <div> with elevation tokens + <Button> -- not a new custom component.'
                }, {
                  step: 4,
                  title: 'Resolve all visual values to tokens',
                  detail: 'Every color, spacing value, border-radius, elevation, and font reference must use a var(--ld-semantic-*) token. Zero hard-coded hex, px, or rem values allowed.'
                }, {
                  step: 5,
                  title: 'Include all interactive states',
                  detail: 'Generated components must include hover, focus, active, and disabled states using the appropriate token variants (e.g. -hovered, -pressed, -disabled).'
                }, {
                  step: 6,
                  title: 'Output accessible markup',
                  detail: 'Use semantic HTML elements, proper ARIA attributes, keyboard handlers, and focus management. WCAG 2.1 AA compliance is non-negotiable.'
                }].map((item) => (
                  <div key={item.step} style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '16px 20px',
                    backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                    borderRadius: '8px'
                  }}>
                    <div style={{
                      minWidth: '32px',
                      height: '32px',
                      backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      fontSize: '14px',
                      color: 'var(--ld-semantic-color-text-brand-bold)'
                    }}>{item.step}</div>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '14px', marginBottom: '4px', color: 'var(--ld-semantic-color-text)' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--ld-semantic-color-text-subtle)' }}>
                        {item.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2 – UX Flow Generation */}
            <div style={{
              backgroundColor: 'var(--ld-semantic-color-surface)',
              padding: '32px',
              borderRadius: '8px',
              boxShadow: 'var(--ld-semantic-elevation-100)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--ld-semantic-color-text)',
                marginBottom: '24px'
              }}>
                Building UX Flows
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: 'var(--ld-semantic-color-text-subtle)',
                marginBottom: '20px'
              }}>
                When an agent generates multi-step flows (wizards, forms, dashboards), it must follow these patterns:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                {[{
                  title: 'Page Layout',
                  items: ['Use existing layout primitives (AppLayout, sidebar, main content area)', 'Panels and drawers must be resizable (min 420px, max 800px)', 'Persist user width preferences in localStorage', 'Responsive behavior required for all screen sizes']
                }, {
                  title: 'Navigation & Routing',
                  items: ['Use existing routing structure and sidebar navigation', 'Add new routes to App.tsx following the established pattern', 'Breadcrumbs for hierarchy deeper than 2 levels', 'Maintain consistent back/forward navigation']
                }, {
                  title: 'Data & State',
                  items: ['Break complex pages into smaller focused components', 'Keep state as close to where it\'s used as possible', 'Use loading, empty, and error states via ContentMessage', 'Never leave a flow without a clear action or exit path']
                }, {
                  title: 'Feedback & Confirmation',
                  items: ['Destructive actions require confirmation via AlertDialog', 'Use Alerts for page-level success, warning, and error states', 'Progress indicators for multi-step flows', 'Use MagicBox to indicate AI-generated content while loading']
                }].map((card) => (
                  <div key={card.title} style={{
                    padding: '20px',
                    backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                    borderRadius: '8px'
                  }}>
                    <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                      {card.title}
                    </div>
                    <ul style={{
                      fontSize: '14px',
                      lineHeight: '1.8',
                      color: 'var(--ld-semantic-color-text-subtle)',
                      paddingLeft: '20px',
                      margin: 0
                    }}>
                      {card.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3 – Strict Prohibitions */}
            <div style={{
              backgroundColor: 'var(--ld-semantic-color-surface)',
              padding: '32px',
              borderRadius: '8px',
              boxShadow: 'var(--ld-semantic-elevation-100)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--ld-semantic-color-text)',
                marginBottom: '24px'
              }}>
                What an Agent Must Never Do
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Hard-code hex colors, arbitrary pixel values, or font families -- always use semantic tokens',
                  'Create custom buttons, inputs, or form controls when a Living Design component exists',
                  'Use inline SVGs or external icon libraries (react-icons, heroicons) -- use the project icon library in client/components/icons/',
                  'Use emojis in UI code -- use icons from the icon library instead',
                  'Override built-in component styles with className or inline style overrides',
                  'Use placeholder images from external services (unsplash, picsum, placeholder.com)',
                  'Skip interactive states (hover, focus, active, disabled) on interactive elements',
                  'Create new components without the full registration process (TSX, CSS module, example, guideline doc, route, overview entry)',
                ].map((rule, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '14px 20px',
                    backgroundColor: 'var(--ld-semantic-color-fill-negative-subtle)',
                    borderRadius: '6px',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: 'var(--ld-semantic-color-text-subtle)',
                    alignItems: 'flex-start'
                  }}>
                    <span style={{ color: 'var(--ld-semantic-color-text-negative)', fontWeight: '700', flexShrink: 0 }}>x</span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4 – Component Creation Checklist */}
            <div style={{
              backgroundColor: 'var(--ld-semantic-color-surface)',
              padding: '32px',
              borderRadius: '8px',
              boxShadow: 'var(--ld-semantic-elevation-100)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--ld-semantic-color-text)',
                marginBottom: '12px'
              }}>
                New Component Checklist (When Creation Is Justified)
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: 'var(--ld-semantic-color-text-subtle)',
                marginBottom: '20px'
              }}>
                If no existing component or composition can solve the need, agents must follow every step below. Skipping any step is a violation.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '12px'
              }}>
                {[
                  'Confirm no existing component fits (search + document why)',
                  'Create component file: client/components/ui/ComponentName.tsx',
                  'Create CSS module: client/components/ui/ComponentName.module.css',
                  'Use only semantic tokens in all styles',
                  'Include all variants, sizes, and states from the design spec',
                  'Create example: client/components/examples/ComponentNameExample.tsx',
                  'Create guideline doc: guidelines/components/ComponentName.md',
                  'Add dedicated page in client/pages/component-library/',
                  'Register route in App.tsx and add to component library overview',
                  'Register in Component Sandbox (property tester) for interactive testing',
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    gap: '10px',
                    padding: '12px 16px',
                    backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                    borderRadius: '6px',
                    fontSize: '13px',
                    lineHeight: '1.5',
                    color: 'var(--ld-semantic-color-text-subtle)',
                    alignItems: 'flex-start'
                  }}>
                    <span style={{
                      minWidth: '20px',
                      height: '20px',
                      border: '2px solid var(--ld-semantic-color-border-strong)',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '1px'
                    }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5 – Design System Compliance */}
            <div style={{
              backgroundColor: 'var(--ld-semantic-color-surface)',
              padding: '32px',
              borderRadius: '8px',
              boxShadow: 'var(--ld-semantic-elevation-100)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--ld-semantic-color-text)',
                marginBottom: '24px'
              }}>
                Design System Compliance Rules
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: 'var(--ld-semantic-color-text-subtle)',
                marginBottom: '20px'
              }}>
                These rules govern how agents handle layout, tokens, styling, and component usage when generating or modifying pages.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                {[{
                  title: 'Layout Rules',
                  items: [
                    'Pages must fill the full available width -- never constrain with max-width on content containers',
                    'Use align-items: stretch (not center) on flex column parents so children expand',
                    'Content containers must use flex: 1 to fill available height',
                    'Padding uses LD spacing tokens: var(--ld-semantic-spacing-*) or var(--ld-primitive-scale-space-*)',
                  ]
                }, {
                  title: 'Token Rules',
                  items: [
                    'Every color must use a semantic token with a hex fallback: var(--ld-semantic-color-text, #2E2F32)',
                    'Never hard-code hex colors (#0071DC) -- always resolve to the nearest semantic token',
                    'Elevation uses box-shadow tokens: var(--ld-semantic-elevation-100)',
                    'Typography uses font tokens: var(--ld-semantic-font-heading-large-family)',
                  ]
                }, {
                  title: 'Styling Rules',
                  items: [
                    'Use CSS Modules (.module.css) for all layout and component styles',
                    'No inline styles for colors, spacing, or layout -- only for truly dynamic values',
                    'No Tailwind utility classes for colors or spacing -- use token-based CSS Modules',
                    'Responsive breakpoints at 1024px, 768px, 480px with progressive enhancement',
                  ]
                }, {
                  title: 'Component Rules',
                  items: [
                    'Always import Button from uppercase path: @/components/ui/Button',
                    'Use ButtonGroup for multiple buttons -- never manual flex containers',
                    'Use Tag for labels and badges -- never custom styled spans',
                    'Use existing LD components before creating new ones: Reuse > Adapt > Create',
                  ]
                }].map((card) => (
                  <div key={card.title} style={{
                    padding: '20px',
                    backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                    borderRadius: '8px'
                  }}>
                    <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                      {card.title}
                    </div>
                    <ul style={{
                      fontSize: '14px',
                      lineHeight: '1.8',
                      color: 'var(--ld-semantic-color-text-subtle)',
                      paddingLeft: '20px',
                      margin: 0
                    }}>
                      {card.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 6 – Figma-to-Code Agent Workflow */}
            <div style={{
              backgroundColor: 'var(--ld-semantic-color-surface)',
              padding: '32px',
              borderRadius: '8px',
              boxShadow: 'var(--ld-semantic-elevation-100)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--ld-semantic-color-text)',
                marginBottom: '24px'
              }}>
                Figma-to-Code Agent Workflow
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: 'var(--ld-semantic-color-text-subtle)',
                marginBottom: '20px'
              }}>
                When an agent processes Figma imports (via Builder.io plugin), it must post-process the output through these validation gates:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {[{
                  label: 'Component Mapping',
                  detail: 'Replace raw HTML elements with library components. A Figma "button" must become <Button variant="..." size="..."> -- never a styled <div> or <button>.'
                }, {
                  label: 'Token Resolution',
                  detail: 'Map all Figma color, spacing, and typography values to the nearest semantic token. If an exact match doesn\'t exist, use the closest semantic token and flag for review.'
                }, {
                  label: 'Icon Substitution',
                  detail: 'Replace any inline SVGs or Figma icon exports with the matching icon from client/components/icons/. If no match exists, create one in client/components/icons-custom/ following the 20x20 viewBox spec.'
                }, {
                  label: 'State Completeness',
                  detail: 'Figma frames often show only the default state. The agent must add hover, focus, active, and disabled states using the corresponding token variants.'
                }, {
                  label: 'Accessibility Audit',
                  detail: 'Add ARIA labels, roles, and keyboard handlers that Figma designs don\'t encode. Ensure focus order matches visual order.'
                }].map((gate, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '16px 20px',
                    borderLeft: '3px solid var(--ld-semantic-color-border-brand)',
                    marginLeft: '16px'
                  }}>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '14px', marginBottom: '4px', color: 'var(--ld-semantic-color-text)' }}>
                        {gate.label}
                      </div>
                      <div style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--ld-semantic-color-text-subtle)' }}>
                        {gate.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </TabPanel>
        {/* Documentation Index Tab */}
        <TabPanel value="docs">
          <GuidelinesDocIndex />
        </TabPanel>
      </Tabs>
    </div>
  );
}
