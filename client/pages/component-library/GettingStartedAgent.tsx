import React, { useState, useCallback } from 'react';
import { SectionCard } from './shared/SectionCard';
import { CopyableCode } from './shared/CopyableCode';
import { ProgressChecklist } from './shared/ProgressChecklist';
import type { ChecklistItem } from './shared/ProgressChecklist';

function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* noop */ }
  }, [children]);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        fontFamily: 'var(--ld-semantic-font-family-mono)',
        fontSize: '13px',
        backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
        padding: '16px 20px',
        paddingRight: '60px',
        borderRadius: '6px',
        lineHeight: 1.8,
        whiteSpace: 'pre-wrap',
        color: 'var(--ld-semantic-color-text)',
        overflowX: 'auto',
      }}>
        {children}
      </div>
      <button
        onClick={handleCopy}
        title="Copy code"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '3px 10px',
          borderRadius: '4px',
          border: '1px solid var(--ld-semantic-color-border-moderate)',
          background: copied ? 'var(--ld-semantic-color-fill-positive-subtle)' : 'var(--ld-semantic-color-surface)',
          color: copied ? 'var(--ld-semantic-color-text-positive)' : 'var(--ld-semantic-color-text-subtle)',
          fontSize: '11px',
          cursor: 'pointer',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          transition: 'all 120ms ease',
        }}
      >
        {copied ? '✓ Copied' : '⎘ Copy'}
      </button>
    </div>
  );
}

/* ── Pre-Implementation Checklist — interactive ── */

const CHECKLIST_ITEMS = [
  { step: 'Search the component inventory', detail: 'Scan client/components/ui/ for an existing Living Design 3.5 component. Check guidelines/ for documentation.' },
  { step: 'Read the component docs', detail: 'Open the matching .md file to understand available props, variants, sizes, and states. Never guess the API.' },
  { step: 'Compose before creating', detail: 'If no single component matches, compose existing components together. Do not create a new component when composition works.' },
  { step: 'Resolve all values to tokens', detail: 'Every color, spacing, border-radius, elevation, and font must use a var(--ld-semantic-*) token. Zero hard-coded values.' },
  { step: 'Include all interactive states', detail: 'Hover, focus, active, and disabled states must use the appropriate token variants (-hovered, -pressed, -disabled).' },
  { step: 'Output accessible markup', detail: 'Semantic HTML, ARIA attributes, keyboard handlers, and focus management. WCAG 2.1 AA compliance is mandatory.' },
];

function PreImplementationChecklist() {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const reset = () => setChecked(new Set());
  const doneCount = checked.size;
  const total = CHECKLIST_ITEMS.length;

  return (
    <SectionCard title="Pre-Implementation Checklist">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <span style={{ fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)', fontFamily: 'var(--ld-semantic-font-family-sans)' }}>
          {doneCount} / {total} checked
        </span>
        {doneCount === total && (
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ld-semantic-color-text-positive)', backgroundColor: 'var(--ld-semantic-color-fill-positive-subtle)', padding: '2px 10px', borderRadius: '9999px', border: '1px solid var(--ld-semantic-color-border-positive)' }}>
            Ready to code!
          </span>
        )}
        <div style={{ flex: 1, height: '5px', backgroundColor: 'var(--ld-semantic-color-fill-subtle)', borderRadius: '9999px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(doneCount / total) * 100}%`, backgroundColor: doneCount === total ? 'var(--ld-semantic-color-text-positive)' : 'var(--ld-semantic-color-action-fill-primary)', borderRadius: '9999px', transition: 'width 250ms ease' }} />
        </div>
        {doneCount > 0 && (
          <button onClick={reset} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)', fontFamily: 'var(--ld-semantic-font-family-sans)', padding: '2px 6px' }}>
            Reset
          </button>
        )}
      </div>
      <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '16px' }}>
        Before writing any JSX, the agent must complete every step. Click each item to check it off.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {CHECKLIST_ITEMS.map((item, i) => {
          const done = checked.has(i);
          return (
            <div
              key={i}
              onClick={() => toggle(i)}
              style={{
                display: 'flex',
                gap: '16px',
                padding: '16px 20px',
                backgroundColor: done ? 'var(--ld-semantic-color-fill-positive-subtle)' : 'var(--ld-semantic-color-fill-subtle)',
                borderRadius: '8px',
                border: `1px solid ${done ? 'var(--ld-semantic-color-border-positive)' : 'transparent'}`,
                cursor: 'pointer',
                transition: 'all 150ms ease',
              }}
            >
              <div style={{
                minWidth: '32px',
                height: '32px',
                backgroundColor: done ? 'var(--ld-semantic-color-text-positive)' : 'var(--ld-semantic-color-fill-brand-subtle)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: done ? '16px' : '14px',
                color: done ? 'var(--ld-semantic-color-surface)' : 'var(--ld-semantic-color-text-brand-bold)',
                flexShrink: 0,
                transition: 'all 150ms ease',
              }}>
                {done ? '✓' : i + 1}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px', color: 'var(--ld-semantic-color-text)', textDecoration: done ? 'line-through' : 'none', opacity: done ? 0.6 : 1, transition: 'all 150ms ease' }}>
                  {item.step}
                </div>
                {!done && (
                  <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                    {item.detail}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

/* ── Collapsible prohibition item ── */

function ProhibitionItem({ rule, why }: { rule: string; why: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      backgroundColor: 'var(--ld-semantic-color-fill-negative-subtle)',
      borderRadius: '6px',
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex',
          gap: '12px',
          padding: '12px 16px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          width: '100%',
          textAlign: 'left',
          alignItems: 'center',
        }}
      >
        <span style={{ color: 'var(--ld-semantic-color-text-negative)', fontWeight: 700, flexShrink: 0, fontSize: '14px' }}>✕</span>
        <span style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--ld-semantic-color-text-subtle)', flex: 1 }}>{rule}</span>
        <span style={{ fontSize: '11px', color: 'var(--ld-semantic-color-text-subtle)', flexShrink: 0, opacity: 0.6, marginLeft: '8px' }}>
          {open ? '▲ hide why' : '▼ why'}
        </span>
      </button>
      {open && (
        <div style={{
          padding: '8px 16px 14px 42px',
          fontSize: '13px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          borderTop: '1px solid var(--ld-semantic-color-fill-negative-subtle)',
          fontStyle: 'italic',
        }}>
          {why}
        </div>
      )}
    </div>
  );
}

export function GettingStartedAgent() {
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
          For AI Agents (Builder.io Fusion)
        </h3>
        <p style={{
          fontSize: '15px',
          lineHeight: 1.7,
          color: 'var(--ld-semantic-color-text-subtle)',
          margin: 0,
        }}>
          Rules for AI agents working with the Living Design 3.5 Portable Kit. Follow these to produce
          output that is indistinguishable from hand-crafted, library-compliant code.
        </p>
      </div>

      {/* First-Run Setup: Template Pages */}
      <SectionCard title="First-Run Setup: Template Pages">
        <div style={{
          padding: '20px',
          backgroundColor: 'var(--ld-semantic-color-fill-warning-subtle)',
          borderRadius: '8px',
          borderLeft: '4px solid var(--ld-semantic-color-border-warning)',
          marginBottom: '16px',
        }}>
          <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
            Required: Ask before installing
          </div>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 16px' }}>
            When a user drags and drops the zip file of this template into a project, or sets up the package
            for the first time, the agent <strong>must immediately ask:</strong>
          </p>
          <div style={{
            padding: '16px 20px',
            backgroundColor: 'var(--ld-semantic-color-surface)',
            borderRadius: '8px',
            border: '2px solid var(--ld-semantic-color-border-brand)',
            marginBottom: '12px',
          }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ld-semantic-color-text)', marginBottom: '12px' }}>
              &ldquo;Are you using this for Partner Experiences?&rdquo;
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
                fontSize: '14px',
                lineHeight: 1.6,
              }}>
                <span style={{
                  fontWeight: 700,
                  color: 'var(--ld-semantic-color-text-positive)',
                  flexShrink: 0,
                }}>Yes</span>
                <span style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>
                  Keep the template application pages. They serve as reference implementations
                  for Partner Experiences workflows (Landing Summary, Catalog, Detail Item, etc.).
                </span>
              </div>
              <div style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
                fontSize: '14px',
                lineHeight: 1.6,
              }}>
                <span style={{
                  fontWeight: 700,
                  color: 'var(--ld-semantic-color-text-negative)',
                  flexShrink: 0,
                }}>No</span>
                <span style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>
                  Delete the template pages. Only keep the Component Library (components, tokens,
                  icons, themes, and documentation).
                </span>
              </div>
            </div>
          </div>
          <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: 0 }}>
            This question must be asked <strong>before</strong> any other setup steps. Do not skip it.
            Do not assume the answer. The agent must wait for the user&rsquo;s response before proceeding.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
              Template pages to remove (if user declines)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { file: 'client/pages/Index.tsx', route: '/' },
                { file: 'client/pages/Catalog.tsx', route: '/catalog' },
                { file: 'client/pages/PageTemplate.tsx', route: '/page-template' },
                { file: 'client/pages/LandingConnection.tsx', route: '/landing-connection' },
                { file: 'client/pages/LandingSummary.tsx', route: '/landing-summary' },
                { file: 'client/pages/DetailItem.tsx', route: '/detail-item' },
                { file: 'client/pages/landing-summary/', route: '(supporting components)' },
              ].map((item) => (
                <div key={item.file} style={{
                  display: 'grid',
                  gridTemplateColumns: '340px 1fr',
                  gap: '12px',
                  padding: '8px 14px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px',
                  fontSize: '13px',
                  alignItems: 'center',
                }}>
                  <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', color: 'var(--ld-semantic-color-text)' }}>
                    {item.file}
                  </code>
                  <span style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>{item.route}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
              After deleting template pages, the agent must also
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'Remove the corresponding route entries from client/App.tsx',
                'Remove any lazy imports for the deleted pages in App.tsx',
                'Update the home route (/) to point to /component-library or the user\'s preferred landing page',
                'Delete the client/pages/landing-summary/ folder and all its supporting components',
                'Keep the NotFound page (client/pages/NotFound.tsx) — it is still needed for 404 handling',
                'Keep all Component Library pages under client/pages/component-library/ — these are part of the design system',
                'Verify the dev server still runs without errors after deletion',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-brand-bold)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Pre-Implementation Checklist — interactive */}
      <PreImplementationChecklist />

      {/* Key File Locations */}
      <SectionCard title="Key File Locations">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { path: 'client/components/ui/', desc: 'All LD 3.5 components (Button.tsx, TextField.tsx, Tag.tsx, etc.)' },
            { path: 'client/components/ui/*.module.css', desc: 'Component CSS modules using semantic tokens' },
            { path: 'client/components/icons/', desc: 'Icon library (303 icons, 20x20 viewBox, currentColor)' },
            { path: 'client/components/icons-custom/', desc: 'Custom project-specific icons' },
            { path: 'client/styles/semantic.css', desc: 'All semantic tokens (648 lines)' },
            { path: 'client/styles/primitive.css', desc: 'Primitive tokens (364 lines)' },
            { path: 'client/styles/themes/', desc: 'Brand theme overrides (walmart, sams-club, etc.)' },
            { path: 'client/locales/en/common.json', desc: 'English translation strings' },
            { path: 'client/locales/es/common.json', desc: 'Spanish translation strings' },
            { path: 'client/locales/fr/common.json', desc: 'French translation strings' },
            { path: 'guidelines/', desc: 'Design system rules and component documentation' },
            { path: 'guidelines/rules/', desc: 'Enforcement rules (tokens, icons, components, layout)' },
            { path: 'client/App.tsx', desc: 'Route registration for all pages' },
          ].map((item) => (
            <div key={item.path} style={{
              display: 'grid',
              gridTemplateColumns: '320px 1fr',
              gap: '16px',
              padding: '10px 16px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '6px',
              fontSize: '14px',
              alignItems: 'center',
            }}>
              <code style={{
                fontFamily: 'var(--ld-semantic-font-family-mono)',
                fontSize: '13px',
                color: 'var(--ld-semantic-color-text)',
              }}>
                {item.path}
              </code>
              <span style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>{item.desc}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Import Conventions */}
      <SectionCard title="Import Conventions">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '14px', color: 'var(--ld-semantic-color-text)' }}>
              Living Design 3.5 Components (Uppercase filenames)
            </div>
            <CodeBlock>{`import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { TextField } from '@/components/ui/TextField';
import { Tag } from '@/components/ui/tag';
import { PageHeader } from '@/components/ui/PageHeader';`}</CodeBlock>
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '14px', color: 'var(--ld-semantic-color-text)' }}>
              Shadcn/Radix Components (Lowercase filenames)
            </div>
            <CodeBlock>{`import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Select, SelectTrigger, SelectContent } from '@/components/ui/select';`}</CodeBlock>
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '14px', color: 'var(--ld-semantic-color-text)' }}>
              Icons
            </div>
            <CodeBlock>{`import { Check, ChevronDown, Search } from '@/components/icons';
// Custom icons go in icons-custom/, never in icons/`}</CodeBlock>
          </div>
        </div>
      </SectionCard>

      {/* Strict Prohibitions — collapsible */}
      <SectionCard title="What Agents Must Never Do">
        <p style={{ fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '12px', lineHeight: 1.5 }}>
          Each rule is visible at a glance. Click &ldquo;why&rdquo; to expand the reason.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <ProhibitionItem rule="Hard-code hex colors, pixel values, or font families" why="Hard-coded values break theme switching. When users switch from Walmart to Sam's Club or any custom theme, only semantic tokens update automatically. Hard-coded values stay wrong." />
          <ProhibitionItem rule="Create custom buttons, inputs, or form controls when a library component exists" why="LD 3.5 components already include keyboard navigation, focus states, ARIA roles, and token-based styling. Recreating them means reimplementing all of that — badly." />
          <ProhibitionItem rule="Use inline SVGs or external icon libraries (react-icons, heroicons, lucide)" why="The project has 303+ icons in client/components/icons/. External icons bloat the bundle and won't follow the project's stroke style (20x20 viewBox, 1.5px, square linecap, currentColor)." />
          <ProhibitionItem rule="Use emojis in UI — use icons from the icon library instead" why="Emojis render differently across OSes and screen readers announce them inconsistently. Icons are themeable, scalable, and accessible." />
          <ProhibitionItem rule="Override component styles with className or inline style on LD components" why="LD components encapsulate their own styling. Overrides bypass the token system and break across themes. Wrap the component instead." />
          <ProhibitionItem rule="Use placeholder images from external services (unsplash, picsum, placeholder.com)" why="External image URLs break in offline environments, introduce GDPR risk, and create broken experiences when those services change. Use real assets or a local placeholder." />
          <ProhibitionItem rule="Skip interactive states (hover, focus, active, disabled) on interactive elements" why="WCAG 2.1 AA requires visible focus indicators. Missing states make keyboard-only and screen reader users unable to operate the UI." />
          <ProhibitionItem rule="Create new components without the full creation process (TSX + CSS module + example + guideline doc + route)" why="Incomplete components can't be tested in the Component Sandbox, aren't documented for future agents, and aren't registered in the Overview. They become invisible technical debt." />
          <ProhibitionItem rule="Write user-facing strings directly — all strings must use i18n translation keys" why="Direct strings can't be translated. The project supports EN, ES, and FR. Hardcoded strings silently break the other locales." />
          <ProhibitionItem rule="Invent new breakpoints — use standard 1024px, 768px, 480px only" why="Custom breakpoints fragment the responsive system. Every page uses the same three breakpoints so layouts stay consistent across the app." />
        </div>
      </SectionCard>

      {/* Token Usage */}
      <SectionCard title="Token Usage Pattern">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{
              fontWeight: 700,
              marginBottom: '8px',
              fontSize: '14px',
              color: 'var(--ld-semantic-color-text-positive)',
            }}>
              Correct — Semantic tokens with fallbacks
            </div>
            <CodeBlock>{`background: var(--ld-semantic-color-action-fill-primary, #0071DC);
color: var(--ld-semantic-color-text, #2E2F32);
border: 1px solid var(--ld-semantic-color-border-strong, #74767C);
box-shadow: var(--ld-semantic-elevation-100);
font-family: var(--ld-semantic-font-family-sans);`}</CodeBlock>
          </div>
          <div>
            <div style={{
              fontWeight: 700,
              marginBottom: '8px',
              fontSize: '14px',
              color: 'var(--ld-semantic-color-text-negative)',
            }}>
              Wrong — Hard-coded values
            </div>
            <CodeBlock>{`background: #0071DC;
color: #2E2F32;
border: 1px solid #74767C;
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
font-family: Arial, sans-serif;`}</CodeBlock>
          </div>
        </div>
      </SectionCard>

      {/* New Component Checklist */}
      <SectionCard title="New Component Creation Checklist">
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '16px',
        }}>
          Only create a new component when no existing component or composition can solve the need.
          If creation is justified, complete every step:
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '10px',
        }}>
          {[
            'Confirm no existing component fits (search + document why)',
            'Create component: client/components/ui/ComponentName.tsx',
            'Create CSS module: client/components/ui/ComponentName.module.css',
            'Use only semantic tokens in all styles',
            'Include all variants, sizes, and states from spec',
            'Create example: client/components/examples/ComponentNameExample.tsx',
            'Create guideline: guidelines/components/ComponentName.md',
            'Add page: client/pages/component-library/ComponentName.tsx',
            'Register route in App.tsx and add to Overview',
            'Register in Component Sandbox for interactive testing',
            'Add translation keys for all 3 locales (en, es, fr)',
            'Update GuidelinesDocIndex.tsx with the new doc entry',
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: '10px',
              padding: '10px 14px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '6px',
              fontSize: '13px',
              lineHeight: 1.5,
              color: 'var(--ld-semantic-color-text-subtle)',
              alignItems: 'flex-start',
            }}>
              <span style={{
                minWidth: '18px',
                height: '18px',
                border: '2px solid var(--ld-semantic-color-border-strong)',
                borderRadius: '4px',
                flexShrink: 0,
                marginTop: '1px',
              }} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Figma-to-Code Workflow */}
      <SectionCard title="Figma-to-Code Workflow">
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '16px',
        }}>
          When processing Figma imports via the Builder.io plugin, post-process through these validation gates:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {[
            { label: 'Check .figmaignore', detail: 'Before importing, verify the .figmaignore file exists in the project root. This file excludes binary fonts, images, build output, lockfiles, and server code that cause parsing errors in Figma Make. If the file is missing, create it.' },
            { label: 'Component Mapping', detail: 'Replace raw HTML elements with library components. A Figma "button" must become <Button variant="..." size="...">.' },
            { label: 'Token Resolution', detail: 'Map all Figma color, spacing, and typography values to the nearest semantic token. Flag any that don\'t have an exact match.' },
            { label: 'Icon Substitution', detail: 'Replace inline SVGs with matching icons from client/components/icons/. Create new ones in icons-custom/ if needed.' },
            { label: 'State Completeness', detail: 'Figma frames often show only default state. Add hover, focus, active, and disabled states using token variants.' },
            { label: 'Accessibility Audit', detail: 'Add ARIA labels, roles, and keyboard handlers that Figma designs don\'t encode.' },
          ].map((gate, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: '16px',
              padding: '16px 20px',
              borderLeft: '3px solid var(--ld-semantic-color-border-brand)',
              marginLeft: '16px',
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px', color: 'var(--ld-semantic-color-text)' }}>
                  {gate.label}
                </div>
                <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  {gate.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Existing Project Integration */}
      <SectionCard title="Existing Project Integration">
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '16px',
        }}>
          When the kit is added to a project that already has UI components, icons, or styles,
          the agent must audit the existing codebase and create a migration plan. This is not optional.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Step 1: Component Audit */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--ld-semantic-color-border-brand)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
              Step 1: Component Audit — Find & Replace
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 12px' }}>
              Scan the entire project for UI components that have an equivalent in the Component Library.
              Replace them directly — do not keep both versions.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'Search for custom buttons, inputs, selects, modals, tags, cards, and alerts',
                'Check for third-party UI libraries (MUI, Chakra, Ant Design, etc.) that overlap with LD 3.5 components',
                'Map each existing component to its LD 3.5 equivalent (e.g., custom <PrimaryButton> → <Button variant="primary">)',
                'Replace all usages across the project — update imports, props, and any wrapper logic',
                'Delete the old component files after all references are updated',
                'Run the dev server to verify nothing is broken after each replacement',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-brand-bold)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Token & Style Migration */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--ld-semantic-color-border-warning)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
              Step 2: Token & Style Migration Plan
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 12px' }}>
              For components that are unique to the project (no LD 3.5 equivalent), create a migration plan
              to update them to use the library&rsquo;s tokens, text styles, icons, and theming.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'Identify all components that don\'t have a direct LD 3.5 match',
                'Replace hard-coded colors with var(--ld-semantic-color-*) tokens',
                'Replace hard-coded font families, sizes, and weights with var(--ld-semantic-font-*) tokens',
                'Replace hard-coded spacing and border-radius with var(--ld-semantic-spacing-*) and var(--ld-primitive-scale-borderradius-*) tokens',
                'Replace hard-coded elevation/shadows with var(--ld-semantic-elevation-*) tokens',
                'Ensure all components respond to theme switching (Walmart, Sam\'s Club, dark mode)',
                'Add CSS modules (.module.css) if the component uses global CSS or inline styles',
                'Install any missing dependencies that the token system or theme switching requires',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-warning)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Icon Deduplication */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--ld-semantic-color-border-accent-purple)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
              Step 3: Icon Deduplication Plan
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 12px' }}>
              Duplicate icons waste bundle size and cause visual inconsistency. The agent must merge all icons
              into the project&rsquo;s icon library.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'Scan for inline SVGs, imported SVG files, and third-party icon libraries (react-icons, heroicons, lucide, etc.)',
                'For each icon found, check if an equivalent exists in client/components/icons/',
                'If a match exists: replace the usage with the library icon import and delete the duplicate',
                'If no match exists: move the SVG into client/components/icons-custom/ following the project\'s icon format (20x20 viewBox, currentColor fill)',
                'Remove any third-party icon library dependencies from package.json after all icons are migrated',
                'Update the icon index file so all new custom icons are importable from @/components/icons-custom',
                'Verify icon sizes and colors render correctly via semantic tokens (not hard-coded fills)',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-accent-purple)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Migration Plan Output */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--ld-semantic-color-border-info)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
              Migration Plan Output
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 12px' }}>
              After completing the audit, the agent must produce a migration plan that includes:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'A list of all components that will be replaced with their LD 3.5 equivalents',
                'A list of unique components that need token migration (with the specific tokens to apply)',
                'A list of duplicate icons with their replacement mappings',
                'Any dependencies to install or remove',
                'An execution order that avoids breaking the app (replace one component at a time, verify, continue)',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-info)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Package Version Upgrade */}
      <SectionCard title="Package Version Upgrade">
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '16px',
        }}>
          When a project already has an older version of the Living Design 3.5 Portable Kit,
          the agent must not overwrite blindly. It must review what exists, compare against
          the latest version, and produce a merge plan.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Phase 1: Inventory */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--ld-semantic-color-border-brand)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
              Phase 1: Inventory What Exists
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 12px' }}>
              Before touching any files, catalog the current state of the installed package.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'List all components in client/components/ui/ and record which ones exist',
                'List all icons in client/components/icons/ and client/components/icons-custom/',
                'Record the current token files: semantic.css, primitive.css, and any theme overrides in client/styles/themes/',
                'Check for local modifications — components or tokens the team has customized beyond the kit defaults',
                'Note any components the project added that are not part of the kit (project-specific components)',
                'Record the current guidelines/ and rules/ files and their contents',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-brand-bold)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Phase 2: Diff */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--ld-semantic-color-border-warning)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
              Phase 2: Compare Against Latest Version
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 12px' }}>
              Diff the existing package files against the latest version to identify what changed.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'Identify new components added in the latest version that the project does not have yet',
                'Identify components that were updated — new props, variants, bug fixes, or accessibility improvements',
                'Identify new or updated design tokens (new colors, spacing values, elevation levels)',
                'Identify new or updated icons in the icon library',
                'Identify changes to theme files that affect theming behavior',
                'Identify updated guidelines or rules files',
                'Flag any breaking changes — renamed props, removed components, changed token names',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-warning)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Phase 3: Handle Conflicts */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--ld-semantic-color-border-negative)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
              Phase 3: Handle Local Modifications & Conflicts
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 12px' }}>
              If the team has customized any kit files, those changes must be preserved or reconciled.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'If a component was locally modified AND updated in the new version — flag it as a conflict',
                'For conflicts: apply the new version first, then re-apply the local customizations on top',
                'If local customizations conflict with new behavior, document both versions and ask for a decision',
                'Never silently overwrite a file that has local changes — always flag and resolve explicitly',
                'Project-specific components (not part of the kit) should not be touched during the upgrade',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-negative)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Phase 4: Execute Merge */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--ld-semantic-color-border-positive)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
              Phase 4: Execute the Merge
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 12px' }}>
              Apply updates in a safe order, verifying after each step.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'Update token files first (semantic.css, primitive.css) — these have no dependencies',
                'Update theme files next — verify theme switching still works',
                'Update existing components one at a time — verify the dev server after each',
                'Add new components that did not exist before — register routes and update the overview page',
                'Update the icon library — add new icons, update changed icons, keep custom icons untouched',
                'Update guidelines/ and rules/ files to match the latest documentation',
                'Run a full build to catch any TypeScript or import errors',
                'Verify all pages render correctly with the updated components',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-positive)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upgrade Plan Output */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--ld-semantic-color-border-info)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
              Upgrade Plan Output
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 12px' }}>
              Before executing, the agent must present the upgrade plan for review:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'Summary: number of components to update, add, or skip',
                'List of updated components with a brief description of what changed',
                'List of new components being added',
                'List of token changes (new tokens, renamed tokens, removed tokens)',
                'List of conflicts requiring manual decision',
                'Dependencies to install or update',
                'Execution order with verification checkpoints',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-info)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Environment Compatibility */}
      <SectionCard title="Environment Compatibility">
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '16px',
        }}>
          When integrating the kit into a target project, the agent must check for and resolve
          these common compatibility issues.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* CSS Framework Conflicts */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--ld-semantic-color-border-negative)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
              CSS Framework Conflicts
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 12px' }}>
              If the target project uses Tailwind, Bootstrap, MUI, or another CSS framework, styles can clash
              with the kit&rsquo;s semantic tokens and component CSS modules.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'Check for global CSS resets that override the kit\'s base styles (e.g., Tailwind\'s preflight)',
                'If Tailwind is present, add the kit\'s component folders to Tailwind\'s content config so classes are not purged',
                'Ensure Tailwind\'s @layer base does not reset font-family, line-height, or color on elements the kit styles',
                'If Bootstrap is present, check for conflicting .btn, .card, .modal class names — the kit uses CSS modules to avoid this, but global Bootstrap styles can still leak in',
                'Test all kit components visually after integration — look for unexpected padding, margins, or font changes',
                'If conflicts exist, scope the kit\'s CSS using a wrapper class or adjust the framework\'s config to exclude kit files',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-negative)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Package Manager */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--ld-semantic-color-border-brand)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
              Package Manager Adaptation
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 12px' }}>
              The kit ships with pnpm, but the target project may use npm or yarn. The agent must adapt.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'Detect the target project\'s package manager: check for package-lock.json (npm), yarn.lock (yarn), or pnpm-lock.yaml (pnpm)',
                'If the target uses npm: run npm install instead of pnpm install, and remove pnpm-lock.yaml',
                'If the target uses yarn: run yarn install instead, and remove pnpm-lock.yaml',
                'Update any scripts in package.json that reference pnpm (e.g., pnpm run dev → npm run dev)',
                'If the target project has no lockfile, ask the user which package manager they prefer',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-brand-bold)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* React Version */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--ld-semantic-color-border-warning)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
              React Version Compatibility
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 12px' }}>
              The kit is built on React 18. Check the target project&rsquo;s React version and handle mismatches.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'Check the target project\'s React version in package.json (react and react-dom)',
                'React 18: fully compatible — no changes needed',
                'React 19: test all components — some APIs may have deprecation warnings. Update createRoot, useId, or Suspense usage if needed',
                'React 17 or earlier: the kit uses React 18 features (useId, Suspense boundaries). Upgrade the target project to React 18+ before integrating',
                'If the target uses Next.js, Remix, or Gatsby, verify that the kit\'s client-side components work with the framework\'s rendering model (SSR/SSG). Add "use client" directives if needed for Next.js App Router',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-warning)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Version Tracking */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--ld-semantic-color-border-info)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
              Version Tracking
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 12px' }}>
              The kit includes versioning files so teams know which version they have.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'The VERSION file in the project root contains the current kit version (e.g., 1.0.0)',
                'The CHANGELOG.md file documents what changed in each version',
                'When upgrading, compare the VERSION file in the existing project against the new zip to determine what changed',
                'After a successful upgrade, update the VERSION file to match the new version',
                'Never delete the VERSION or CHANGELOG.md files during integration',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-info)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Custom Brand Theme Creation */}
      <SectionCard title="Custom Brand Theme Creation">
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '16px',
        }}>
          The kit ships with Walmart and Sam&rsquo;s Club themes. To create a new brand theme,
          the agent must follow this process.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { step: 'Copy an existing theme file', detail: 'Duplicate client/styles/themes/walmart.css (or sams-club.css) and rename it to the new brand name (e.g., custom-brand.css).' },
            { step: 'Update token overrides', detail: 'Replace the color values with the new brand\'s colors. At minimum, update: action-fill-primary (brand blue/primary), text-brand, border-brand, fill-brand-subtle, and surface colors.' },
            { step: 'Update typography if needed', detail: 'If the brand uses a different font, update --ld-semantic-font-family-sans and add the font files to public/fonts/. Update public/fonts/fonts.css with the new @font-face declaration.' },
            { step: 'Register the theme', detail: 'Add the new theme to the theme switcher so it can be selected at runtime. Update the theme list in the ThemeSwitcher component.' },
            { step: 'Test all components', detail: 'Switch to the new theme and visually verify every component renders correctly. Pay special attention to contrast ratios (WCAG 2.1 AA) on buttons, text, and links.' },
            { step: 'Test dark mode (if applicable)', detail: 'If the brand needs dark mode, create a dark variant of the theme file with appropriate dark background and inverted text tokens.' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: '16px',
              padding: '16px 20px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '8px',
            }}>
              <div style={{
                minWidth: '32px',
                height: '32px',
                backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '14px',
                color: 'var(--ld-semantic-color-text-brand-bold)',
              }}>
                {i + 1}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px', color: 'var(--ld-semantic-color-text)' }}>
                  {item.step}
                </div>
                <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  {item.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Contributing Components Back */}
      <SectionCard title="Contributing Components Back">
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '16px',
        }}>
          If a team builds a reusable component that could benefit other projects using the kit,
          follow this process to contribute it back.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { step: 'Confirm it\'s generic', detail: 'The component must not contain project-specific logic, data, or API calls. It should work in any project that uses the kit.' },
            { step: 'Follow the component creation checklist', detail: 'The component must have: a TSX file, a CSS module using only semantic tokens, an example file, a guideline doc, a Component Library page, and sandbox registration.' },
            { step: 'Use only kit dependencies', detail: 'The component must not introduce new npm dependencies. It should only use React, existing kit components, semantic tokens, and the icon library.' },
            { step: 'Include all states and variants', detail: 'Default, hover, focus, active, disabled, loading, error, and empty states must all be implemented.' },
            { step: 'Add i18n strings', detail: 'All user-facing text must use translation keys with entries in all 3 locales (en, es, fr).' },
            { step: 'Update the VERSION and CHANGELOG', detail: 'Bump the patch version in the VERSION file and add an entry to CHANGELOG.md describing the new component.' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: '16px',
              padding: '16px 20px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '8px',
            }}>
              <div style={{
                minWidth: '32px',
                height: '32px',
                backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '14px',
                color: 'var(--ld-semantic-color-text-brand-bold)',
              }}>
                {i + 1}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px', color: 'var(--ld-semantic-color-text)' }}>
                  {item.step}
                </div>
                <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  {item.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Enforcement Rules Reference */}
      <SectionCard title="Enforcement Rules Reference">
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '16px',
        }}>
          Agents must read and follow these rule files. They are located in <code style={{
            fontFamily: 'var(--ld-semantic-font-family-mono)',
            fontSize: '13px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            padding: '2px 6px',
            borderRadius: '4px',
          }}>guidelines/rules/</code>:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { file: 'RULE_DesignSystemEnforcement.md', desc: 'Tokens, icons, and component usage' },
            { file: 'RULE_DesignTokenEnforcement.md', desc: 'Semantic tokens are mandatory' },
            { file: 'RULE_TokenUsageEnforcement.md', desc: 'No hardcoded values allowed' },
            { file: 'RULE_CreateNewComponent.md', desc: 'Full component creation process' },
            { file: 'RULE_ComponentPropertyTester.md', desc: 'All components must be in sandbox' },
            { file: 'RULE_IconUsage.md', desc: 'Icon library rules and deduplication' },
            { file: 'RULE_NoEmojisUseIcons.md', desc: 'No emojis or random images' },
            { file: 'RULE_ResponsiveLayout.md', desc: 'Page structure and breakpoints' },
            { file: 'RULE_GuidelinesPageSync.md', desc: 'Keep Guidelines page in sync with docs' },
            { file: 'RULE_DevServerHealthCheck.md', desc: 'Verify dev server after changes' },
          ].map((rule) => (
            <div key={rule.file} style={{
              display: 'grid',
              gridTemplateColumns: '320px 1fr',
              gap: '16px',
              padding: '10px 16px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '6px',
              fontSize: '14px',
              alignItems: 'center',
            }}>
              <code style={{
                fontFamily: 'var(--ld-semantic-font-family-mono)',
                fontSize: '12px',
                color: 'var(--ld-semantic-color-text)',
              }}>
                {rule.file}
              </code>
              <span style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>{rule.desc}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
