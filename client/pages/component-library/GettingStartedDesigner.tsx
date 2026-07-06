import React, { useState, useCallback } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Checkbox } from '@/components/ui/Checkbox';
import { Link } from '@/components/ui/Link';
import { Check } from '@/components/icons/Check';
import { Clipboard } from '@/components/icons/Clipboard';
import { ChevronUp } from '@/components/icons/ChevronUp';
import { ChevronDown } from '@/components/icons/ChevronDown';
import { DesignerOnboardingQuiz } from './DesignerOnboardingQuiz';

/* ── Prompt data ── */

interface Prompt {
  label: string;
  full: string;
}

const PROMPT_CATEGORIES: { category: string; value: string; prompts: Prompt[] }[] = [
  {
    category: 'Generate Pages',
    value: 'pages',
    prompts: [
      { label: 'Campaign dashboard', full: 'Create a new dashboard page with a page header titled "Campaign Overview", a row of 4 metric cards showing impressions, clicks, spend, and CTR, and a data table below with campaign data.' },
      { label: 'Settings page', full: 'Build a settings page with a sidebar navigation for General, Notifications, and Security sections. Each section should have form fields using TextField and Select components inside Cards.' },
      { label: 'Product detail page', full: 'Create a product detail page with breadcrumbs, a two-column layout (image gallery on left, product info on right), a tabbed section for Description/Reviews/Specs, and a sticky add-to-cart bar at the bottom.' },
      { label: 'Marketing landing page', full: 'Design a landing page with a hero section, a 3-column feature grid using Cards, a testimonial carousel, and a CTA section with a primary Button.' },
    ],
  },
  {
    category: 'Create Components',
    value: 'components',
    prompts: [
      { label: 'Stat card with sparkline', full: 'Create a stat card component that shows a metric label, a large number value, a percentage change badge (positive green or negative red using Tag), and a small sparkline area. Use Card, Heading, and Tag from the design system.' },
      { label: 'User profile header', full: 'Build a user profile header component with an avatar circle, user name heading, role tag, and action buttons (Edit Profile, Settings) in a ButtonGroup. Make it responsive.' },
      { label: 'Notification item', full: 'Create a notification item component with a leading icon, title, description, timestamp, and an unread indicator dot. Use ListItem patterns and semantic tokens for the styling.' },
      { label: 'File upload dropzone', full: 'Build a file upload dropzone component with a dashed border, upload icon, instructional text, and a secondary Button. Show a progress bar state and a completed state with a file name and remove IconButton.' },
    ],
  },
  {
    category: 'Theming & Styling',
    value: 'theming',
    prompts: [
      { label: "Switch to Sam's Club", full: "Switch the current theme to Sam's Club and verify all components render correctly with the new brand colors." },
      { label: 'Custom "Holiday" theme', full: 'Create a new custom theme called "Holiday" with a red primary action color, green accents, and warm neutrals. Apply it to the theme switcher so I can preview it.' },
      { label: 'Dark mode', full: 'Update the current page to use dark mode tokens. Make sure all text, backgrounds, borders, and cards adapt properly.' },
      { label: 'Token audit', full: 'Audit the current page for any hard-coded colors or font sizes and replace them with the correct LD semantic tokens.' },
    ],
  },
  {
    category: 'Edit & Refine',
    value: 'edits',
    prompts: [
      { label: 'Page header + breadcrumbs', full: 'Change the page header to include breadcrumbs, a subtitle description, and move the action buttons into a dropdown menu using the Menu component.' },
      { label: 'Data table with sorting', full: 'Replace the current plain list with an interactive data table that has sortable columns, row selection checkboxes, status tags, pagination, and a search toolbar.' },
      { label: 'Slide-in detail panel', full: 'Add a side panel that slides in from the right when a table row is clicked. It should show item details using a Card with CardHeader and CardContent, and have a close IconButton.' },
      { label: 'Responsive card grid', full: 'Make the cards on this page responsive. On desktop show 3 columns, tablet show 2 columns, and mobile show 1 column. Add proper spacing using semantic tokens.' },
      { label: 'Form validation', full: 'Add form validation to the current form. Show error states on required fields with helper text when the user clicks submit without filling them in.' },
      { label: 'Empty state for table', full: 'Add an empty state to the data table with an illustration area, a heading saying "No results found", a description, and a primary action Button to reset filters.' },
    ],
  },
  {
    category: 'Accessibility & Polish',
    value: 'a11y',
    prompts: [
      { label: 'A11y review', full: 'Review the current page for accessibility issues. Make sure all interactive elements have proper aria-labels, focus states are visible, and color contrast meets WCAG 2.1 AA.' },
      { label: 'Keyboard nav for cards', full: 'Add keyboard navigation support to the card grid so users can tab between cards and press Enter to select them.' },
      { label: 'Loading skeletons', full: "Add loading skeleton states to all the cards and the data table on this page so content doesn't flash in." },
      { label: 'Modal focus trap', full: 'Add proper focus management to the modal dialog. Focus should trap inside the modal when open and return to the trigger button when closed.' },
    ],
  },
  {
    category: 'Other / Ask Freely',
    value: 'other-ask',
    prompts: [
      { label: 'Help me figure out what to build', full: "I'm a designer working in Builder.io Fusion with the Living Design 3.5 Portable Kit. I'm not sure where to start. Ask me a few questions about what I'm trying to accomplish — what kind of page or feature, who it's for, and what data it needs to show — and then suggest the best components and approach." },
      { label: 'Review my current design', full: "Look at the current page and suggest improvements. Check for: (1) components that could be replaced with LD 3.5 equivalents, (2) spacing or color inconsistencies, (3) accessibility issues, and (4) anything that doesn't follow the design system guidelines. Give me a prioritized list of changes." },
      { label: 'Make it match our brand', full: "Review the current page for brand compliance. Verify that all colors use semantic design tokens (not hard-coded hex values), that the correct theme is active, and that typography, spacing, and component variants match the Living Design 3.5 spec. List any violations and fix them." },
    ],
  },
];

/* ── Prompt chip with copy ── */

function PromptChip({ prompt }: { prompt: Prompt }) {
  const [copied, setCopied] = useState(false);
  const [showFull, setShowFull] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(prompt.full);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback: select text for manual copy
    }
  }, [prompt.full]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <Button
          variant={copied ? 'secondary' : 'tertiary'}
          size="small"
          onClick={handleCopy}
          leading={
            copied
              ? <Check width={14} height={14} />
              : <Clipboard width={14} height={14} />
          }
        >
          {copied ? 'Copied!' : prompt.label}
        </Button>
        <IconButton
          variant="ghost"
          size="small"
          aria-label={showFull ? 'Hide full prompt' : 'Show full prompt'}
          onClick={() => setShowFull(!showFull)}
        >
          {showFull
            ? <ChevronUp width={14} height={14} />
            : <ChevronDown width={14} height={14} />
          }
        </IconButton>
      </div>
      {showFull && (
        <div style={{
          marginTop: '6px',
          marginLeft: '8px',
          padding: '10px 14px',
          backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
          borderRadius: '6px',
          borderLeft: '3px solid var(--ld-semantic-color-border-brand)',
          fontSize: '13px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          fontStyle: 'italic',
        }}>
          &ldquo;{prompt.full}&rdquo;
        </div>
      )}
    </div>
  );
}

/* ── Helpers ── */

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: 'var(--ld-semantic-color-surface)',
      padding: '32px',
      borderRadius: '8px',
      boxShadow: 'var(--ld-semantic-elevation-100)',
    }}>
      <h3 style={{
        fontSize: '20px',
        fontWeight: 700,
        color: 'var(--ld-semantic-color-text)',
        marginBottom: '20px',
      }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function CollapsibleSection({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <div style={{
      backgroundColor: 'var(--ld-semantic-color-surface)',
      borderRadius: '8px',
      boxShadow: 'var(--ld-semantic-elevation-100)',
      overflow: 'hidden',
    }}>
      <Accordion type="single" collapsible defaultValue={defaultOpen ? 'section' : ''}>
        <AccordionItem value="section" style={{ borderBottom: 'none' }}>
          <AccordionTrigger style={{
            padding: '24px 32px',
            fontSize: '20px',
            fontWeight: 700,
          }}>
            {title}
          </AccordionTrigger>
          <AccordionContent>
            <div style={{ padding: '0 32px 32px' }}>
              {children}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

/* ── Figma & Builder.io Resources card ── */

function FigmaResourcesCard() {
  const resources = [
    {
      label: 'Builder.io Figma Plugin',
      desc: 'Import Figma designs directly — the AI maps every layer to the correct LD 3.5 component automatically.',
      href: 'https://www.builder.io/c/docs/fusion-projects-from-prompts',
      external: true,
    },
    {
      label: 'Builder Academy',
      desc: 'Blog, tutorials, and guides for getting the most out of Builder.io Fusion and the design system.',
      href: 'https://www.builder.io/blog',
      external: true,
    },
    {
      label: 'Builder.io Onboarding Deck',
      desc: 'Slide deck walking through the Builder.io design onboarding process end to end.',
      href: 'https://www.figma.com/slides/m3I20llj9eUJFCfBmnJFSi/Builder.io-Design-Onboarding?t=fwNITCRXdFqHFV03-0',
      external: true,
    },
    {
      label: 'Setup Fusion (Slides)',
      desc: 'Step-by-step slides for setting up Builder.io Fusion for your project.',
      href: 'https://www.figma.com/slides/qZtLPYOsWk3uhWGC24iGRx/Builder-Demo?node-id=1-138&t=3tRXzin1F4EKDGR6-0',
      external: true,
    },
    {
      label: 'Builder.io Setup Video',
      desc: 'Watch the setup walkthrough video to get Fusion running in minutes.',
      href: 'https://vimeo.com/1169786326',
      external: true,
    },
    {
      label: 'Figma Lunch & Learns',
      desc: 'Sign up for upcoming Builder.io + Figma learning sessions and workshops with the team.',
      href: 'https://airtable.com/appEGZA2KCbx3A6IP/shr35BhsPf4bNULE1',
      external: true,
    },
    {
      label: 'Component Library Overview',
      desc: 'Browse all 50+ available components, icons, tokens, and guidelines in one place.',
      href: '/component-library',
      external: false,
    },
  ];

  return (
    <div style={{
      backgroundColor: 'var(--ld-semantic-color-surface)',
      padding: '28px 32px',
      borderRadius: '8px',
      boxShadow: 'var(--ld-semantic-elevation-100)',
      borderTop: '4px solid var(--ld-semantic-color-border-brand)',
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: 700,
        color: 'var(--ld-semantic-color-text)',
        marginBottom: '6px',
      }}>
        Start with Figma? Here&rsquo;s how it works.
      </h3>
      <p style={{
        fontSize: '14px',
        lineHeight: 1.6,
        color: 'var(--ld-semantic-color-text-subtle)',
        margin: '0 0 20px 0',
      }}>
        Use the Builder.io Figma plugin to import your designs — the AI agent maps every layer to the correct LD 3.5 component automatically. No manual mapping required.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '12px',
      }}>
        {resources.map((r) => (
          <div
            key={r.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--ld-semantic-spacing-50)',
              padding: 'var(--ld-semantic-spacing-200)',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: 'var(--ld-semantic-border-radius-medium)',
              border: '1px solid var(--ld-semantic-color-separator)',
            }}
          >
            <Link
              href={r.href}
              target={r.external ? '_blank' : undefined}
              rel={r.external ? 'noopener noreferrer' : undefined}
              internal={!r.external}
              style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)' }}
            >
              {r.label}{r.external ? ' ↗' : ''}
            </Link>
            <span style={{
              fontSize: '13px',
              lineHeight: 1.5,
              color: 'var(--ld-semantic-color-text-subtle)',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
            }}>
              {r.desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── First 3 steps checklist ── */

const FIRST_STEPS = [
  { label: 'Browse the Component Library to see what\'s available', href: '/component-library' },
  { label: 'Try the Component Sandbox to test a component live', href: '/component-library/component-tester' },
  { label: 'Copy a prompt from the quiz below and paste it into Fusion', href: null },
];

function FirstStepsChecklist() {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const doneCount = checked.size;
  const total = FIRST_STEPS.length;

  return (
    <div style={{
      backgroundColor: 'var(--ld-semantic-color-surface)',
      padding: '24px 32px',
      borderRadius: '8px',
      boxShadow: 'var(--ld-semantic-elevation-100)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ld-semantic-color-text)', margin: 0 }}>Your First 3 Steps</h3>
        <span style={{ fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)' }}>{doneCount} / {total} done</span>
        {doneCount === total && (
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ld-semantic-color-text-positive)', backgroundColor: 'var(--ld-semantic-color-fill-positive-subtle)', padding: '2px 10px', borderRadius: '9999px', border: '1px solid var(--ld-semantic-color-border-positive)' }}>
            Great start!
          </span>
        )}
        <div style={{ flex: 1, height: '5px', backgroundColor: 'var(--ld-semantic-color-fill-subtle)', borderRadius: '9999px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(doneCount / total) * 100}%`, backgroundColor: doneCount === total ? 'var(--ld-semantic-color-text-positive)' : 'var(--ld-semantic-color-action-fill-primary)', borderRadius: '9999px', transition: 'width 250ms ease' }} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {FIRST_STEPS.map((step, i) => {
          const done = checked.has(i);
          return (
            <div
              key={i}
              style={{
                padding: '10px 14px',
                backgroundColor: done ? 'var(--ld-semantic-color-fill-positive-subtle)' : 'var(--ld-semantic-color-fill-subtle)',
                borderRadius: '8px',
                border: `1px solid ${done ? 'var(--ld-semantic-color-border-positive)' : 'transparent'}`,
                transition: 'all 150ms ease',
              }}
            >
              <Checkbox
                checked={done}
                onCheckedChange={() => toggle(i)}
                id={`first-step-${i}`}
                label={
                  step.href ? (
                    <Link
                      href={step.href}
                      internal
                      style={{
                        textDecoration: done ? 'line-through' : undefined,
                        opacity: done ? 0.6 : 1,
                        transition: 'all 150ms ease',
                        fontFamily: 'var(--ld-semantic-font-family-sans)',
                        fontSize: '14px',
                      }}
                    >
                      {step.label}
                    </Link>
                  ) : (
                    <span style={{
                      textDecoration: done ? 'line-through' : 'none',
                      opacity: done ? 0.6 : 1,
                      transition: 'all 150ms ease',
                      fontSize: '14px',
                    }}>
                      {step.label}
                    </span>
                  )
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Main ── */

export function GettingStartedDesigner() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '24px' }}>

      {/* Intro */}
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
        padding: '24px 32px',
        borderRadius: '8px',
        borderLeft: '5px solid var(--ld-semantic-color-border-brand)',
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 700,
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '8px',
        }}>
          For Designers
        </h3>
        <p style={{
          fontSize: '15px',
          lineHeight: 1.7,
          color: 'var(--ld-semantic-color-text-subtle)',
          margin: 0,
        }}>
          Drop the Living Design 3.5 Portable Kit into any project and get 50+ accessible components,
          600+ design tokens, and multi-theme support &mdash; no coding experience required.
        </p>
      </div>

      {/* Figma & Builder.io Resources — moved to top */}
      <FigmaResourcesCard />

      {/* First 3 steps checklist */}
      <FirstStepsChecklist />

      {/* Interactive onboarding quiz */}
      <DesignerOnboardingQuiz />

      {/* What You Get — live preview strip removed */}
      <SectionCard title="What You Get">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '12px',
        }}>
          {[
            { label: '50+ Components', desc: 'Buttons, forms, cards, modals, tabs, and more — all pre-built and accessible' },
            { label: '600+ Design Tokens', desc: 'Colors, spacing, typography, and elevation — no hard-coded values needed' },
            { label: 'Multi-Theme Support', desc: "Switch between brand themes (Walmart, Sam's Club, etc.) with one click" },
            { label: '3 Languages', desc: 'English, Spanish, and French translations built in for every UI string' },
            { label: 'WCAG 2.1 AA', desc: 'Focus rings, keyboard navigation, ARIA labels, and contrast ratios baked in' },
            { label: 'Component Sandbox', desc: 'Test any component interactively with live property controls' },
          ].map((item) => (
            <div key={item.label} style={{
              padding: '16px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '6px',
            }}>
              <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px', color: 'var(--ld-semantic-color-text)' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--ld-semantic-color-text-subtle)' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Quick-Start Prompts — refined, no setup prompts, all collapsed by default */}
      <CollapsibleSection title="Quick-Start Prompts">
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '20px',
        }}>
          Copy any prompt directly into the Fusion chat to get started. Click a chip to copy.
        </p>
        <Accordion type="multiple" defaultValue={[]}>
          {PROMPT_CATEGORIES.map(({ category, value, prompts }) => (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger>{category}</AccordionTrigger>
              <AccordionContent>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', flexDirection: 'column' }}>
                  {prompts.map((prompt) => (
                    <PromptChip key={prompt.label} prompt={prompt} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CollapsibleSection>

      {/* Key Concepts — collapsible */}
      <CollapsibleSection title="Key Concepts">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { title: 'Design Tokens', desc: 'Instead of picking colors manually, the kit uses design tokens — named values like "primary action color" or "subtle text". When you switch themes, all colors update automatically. You never need to manually change hex values.' },
            { title: 'Component Variants', desc: 'Components come with built-in variants (e.g., primary/secondary/tertiary buttons, info/success/error alerts). Instead of styling from scratch, you pick the variant that matches your intent and the component handles the colors, spacing, and interactions.' },
            { title: 'Figma to Code', desc: 'Use the Builder.io Figma plugin to import designs. The AI agent will automatically map Figma elements to the correct library components, replace colors with tokens, and add accessibility features. Always review the output to confirm the right components were used.' },
            { title: 'Accessibility is Automatic', desc: 'Every component ships with keyboard navigation, focus indicators, screen reader support, and proper color contrast. You do not need to add these manually — they are built into the components themselves.' },
          ].map((item) => (
            <div key={item.title} style={{
              padding: '20px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '6px',
              borderLeft: '4px solid var(--ld-semantic-color-border-brand)',
            }}>
              <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '15px', color: 'var(--ld-semantic-color-text)' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Tips — collapsible */}
      <CollapsibleSection title="Tips for Designers">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            "Browse the Component Library (/component-library) to see what's available before asking for custom UI",
            'Use the Component Sandbox to test different variants, sizes, and states interactively',
            'Check the Themes & Tokens page to see how colors and spacing work across brands',
            'When describing UI to the AI agent, reference component names (e.g., "use a Card with a primary Button")',
            "If something doesn't look right, check if the correct variant is being used before asking for custom styling",
            'All text should support translation — avoid baking text into images or SVGs',
          ].map((tip, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: '12px',
              padding: '12px 16px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '6px',
              fontSize: '14px',
              lineHeight: 1.5,
              color: 'var(--ld-semantic-color-text-subtle)',
              alignItems: 'flex-start',
            }}>
              <span style={{
                color: 'var(--ld-semantic-color-text-positive)',
                fontWeight: 700,
                flexShrink: 0,
                marginTop: '1px',
              }}>&#10003;</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Using Outside Builder.io — moved to bottom; Figma Make item first */}
      <CollapsibleSection title="Using Outside Builder.io & Fusion">
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '20px',
        }}>
          This kit is fully portable. You can download the code and use it in any environment
          that supports React. Here are the most common external workflows:
        </p>
        <Accordion type="multiple">
          <AccordionItem value="figma">
            <AccordionTrigger>Figma Make (Figma-to-Code)</AccordionTrigger>
            <AccordionContent>
              <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '12px' }}>
                Export designs from Figma and use this kit as the target component library.
              </div>
              <NumberedList items={[
                'Download the project and open it in your code editor of choice',
                'In Figma, use the Make plugin or export your designs as code',
                'Map Figma component names to the kit components (e.g., "[LD 3.5] Button" \u2192 Button.tsx)',
                'Replace any hard-coded colors with semantic tokens (var(--ld-semantic-color-*))',
                'Replace raw HTML elements with kit components (<Button>, <TextField>)',
                'Verify all interactive states are handled — the kit components include these automatically',
              ]} />
              <div style={{ marginTop: '16px' }}>
                <Link
                  href="https://www.builder.io/m/figma-to-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '14px', fontFamily: 'var(--ld-semantic-font-family-sans)' }}
                >
                  Learn more about the Builder.io Figma plugin ↗
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="cursor">
            <AccordionTrigger>Cursor (AI Code Editor)</AccordionTrigger>
            <AccordionContent>
              <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '12px' }}>
                Download the project and open it in Cursor. The AI will read the component library and generate code that uses the design system correctly.
              </div>
              <NumberedList items={[
                'Download the project as a zip and extract it to a local folder',
                'Open the folder in Cursor',
                'Run pnpm install in the terminal to install dependencies',
                'Run pnpm dev to start the dev server and preview in your browser',
                "Point Cursor's AI at the guidelines/ folder — add it to your .cursorrules or project context",
                'Copy the contents of design-system-docs/AGENTS.md into your .cursorrules file',
                'When prompting, reference component names (e.g., "use a Button with variant primary")',
              ]} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="editor">
            <AccordionTrigger>Any Code Editor (VS Code, WebStorm, etc.)</AccordionTrigger>
            <AccordionContent>
              <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                The kit is a standard React + Vite project. Download it, run{' '}
                <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', fontSize: '13px', backgroundColor: 'var(--ld-semantic-color-surface)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--ld-semantic-color-border-moderate)' }}>pnpm install</code>{' '}
                and{' '}
                <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', fontSize: '13px', backgroundColor: 'var(--ld-semantic-color-surface)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--ld-semantic-color-border-moderate)' }}>pnpm dev</code>,{' '}
                and start building. All components, tokens, icons, and translations work identically regardless of your editor.
                Reference the <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', fontSize: '13px', backgroundColor: 'var(--ld-semantic-color-surface)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--ld-semantic-color-border-moderate)' }}>guidelines/</code> folder for documentation.
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CollapsibleSection>

      {/* Key Files — collapsible (moved to bottom) */}
      <CollapsibleSection title="Key Files to Know (For Any Tool)">
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '16px',
        }}>
          Regardless of which tool you use, these are the important locations in the project:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { path: 'client/components/ui/', desc: 'All 50+ pre-built components (Button, TextField, Card, Modal, etc.)' },
            { path: 'client/styles/themes/', desc: 'Theme files — switch brands by swapping the active theme CSS' },
            { path: 'client/components/icons/', desc: '300+ icons ready to import and use' },
            { path: 'guidelines/', desc: 'Design system rules, component docs, and enforcement rules' },
            { path: 'design-system-docs/AGENTS.md', desc: 'AI agent reference — paste into .cursorrules or AI system prompts' },
            { path: 'client/locales/', desc: 'Translation files for English, Spanish, and French' },
            { path: 'public/fonts/', desc: 'Brand fonts (Everyday Sans) — must be included for correct rendering' },
          ].map((item) => (
            <div key={item.path} style={{
              display: 'grid',
              gridTemplateColumns: '280px 1fr',
              gap: '16px',
              padding: '10px 16px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '6px',
              fontSize: '14px',
              alignItems: 'center',
            }}>
              <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', fontSize: '13px', color: 'var(--ld-semantic-color-text)' }}>
                {item.path}
              </code>
              <span style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>{item.desc}</span>
            </div>
          ))}
        </div>
      </CollapsibleSection>
    </div>
  );
}

/* ── Small helper for numbered step lists ── */

function NumberedList({ items }: { items: string[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((step, i) => (
        <div key={i} style={{
          display: 'flex',
          gap: '10px',
          fontSize: '13px',
          lineHeight: 1.5,
          color: 'var(--ld-semantic-color-text-subtle)',
          alignItems: 'flex-start',
        }}>
          <span style={{
            minWidth: '22px',
            height: '22px',
            backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '11px',
            color: 'var(--ld-semantic-color-text-brand-bold)',
            flexShrink: 0,
            marginTop: '1px',
          }}>
            {i + 1}
          </span>
          <span>{step}</span>
        </div>
      ))}
    </div>
  );
}
