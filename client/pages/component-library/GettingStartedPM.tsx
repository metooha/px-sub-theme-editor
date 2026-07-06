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
import { TextField } from '@/components/ui/TextField';
import { TextArea } from '@/components/ui/TextArea';
import { PMOnboardingQuiz } from './PMOnboardingQuiz';
import { Check } from '@/components/icons/Check';
import { Clipboard } from '@/components/icons/Clipboard';
import { ChevronDown } from '@/components/icons/ChevronDown';
import { ChevronUp } from '@/components/icons/ChevronUp';

/* ── Prompt data ── */

interface Prompt {
  label: string;
  full: string;
}

const PROMPT_CATEGORIES: { category: string; value: string; prompts: Prompt[] }[] = [
  {
    category: 'Dashboards',
    value: 'dashboards',
    prompts: [
      { label: 'Campaign performance dashboard', full: 'Build a campaign performance dashboard with total spend, ROAS, and conversion rate cards at the top, an impressions line chart in the middle, and a sortable campaign table below.' },
      { label: 'Weekly performance report', full: 'Create a weekly performance report page with date range selector, KPI summary cards comparing this week vs last week, a trend line chart, and a breakdown table by campaign.' },
      { label: 'Executive summary dashboard', full: 'Build an executive summary dashboard with 6 KPI cards (spend, revenue, ROAS, impressions, clicks, CTR), a revenue trend area chart, and a top 10 campaigns table.' },
    ],
  },
  {
    category: 'Data Tables',
    value: 'tables',
    prompts: [
      { label: 'Keyword performance table', full: 'Create a keyword performance table with columns: keyword, match type, impressions, clicks, CTR, spend, ROAS. Sortable, filterable by match type, with pagination.' },
      { label: 'Item-level sales grid', full: 'Build an item-level sales grid showing item name, SKU, units sold, revenue, conversion rate, and listing quality score. Include search, column sorting, and CSV export.' },
      { label: 'Campaign list with status', full: 'Create a campaign list table with name, status (active/paused/ended as tags), daily budget, spend, ROAS, and actions column. Include bulk selection and status filter.' },
    ],
  },
  {
    category: 'Charts & Visualizations',
    value: 'charts',
    prompts: [
      { label: 'Spend by channel bar chart', full: 'Create a stacked bar chart showing ad spend by channel (search, display, social) broken down by month for the last 6 months.' },
      { label: 'Impressions trend line', full: 'Build a line chart showing daily impressions over the last 30 days with a comparison line for the previous 30-day period. Include hover tooltips.' },
      { label: 'ROAS distribution pie chart', full: 'Create a pie chart showing ROAS distribution across campaign types with a legend and percentage labels.' },
    ],
  },
  {
    category: 'Metric Cards',
    value: 'metrics',
    prompts: [
      { label: '4 KPI cards with trends', full: 'Show 4 KPI cards in a row: total spend ($), total impressions, average ROAS, and conversion rate. Each with a green/red trend arrow compared to last period.' },
      { label: 'Revenue summary tiles', full: 'Build 3 metric tiles: total revenue (large number), attributed sales (with percentage of total), and ad-driven revenue (with ROAS indicator).' },
    ],
  },
  {
    category: 'Recommendations',
    value: 'recommendations',
    prompts: [
      { label: 'Optimization carousel', full: 'Build a recommendation carousel that shows optimization suggestions. Each card has a title, description, key metrics, and Apply/Dismiss buttons.' },
      { label: 'Budget adjustment cards', full: 'Create a list of budget adjustment recommendation cards. Each shows campaign name, current budget, recommended budget, expected impact, and an Apply button.' },
    ],
  },
  {
    category: 'Starting from Scratch',
    value: 'scratch',
    prompts: [
      { label: 'Run the feature quiz', full: 'I want to build a new data feature but I am not sure where to start. Run the feature quiz to help me figure out the right approach.' },
      { label: 'Help me write a PRD', full: 'I want to build a new feature but I do not have a PRD yet. Walk me through the PRD template section by section, asking questions to fill in each part.' },
      { label: 'Explore components', full: 'I am a PM exploring what is available in the design system. Show me the component library and explain which components are most useful for data-rich features.' },
    ],
  },
];

/* ── Prompt chip with copy — uses LD Button + IconButton ── */

function PromptChip({ prompt }: { prompt: Prompt }) {
  const [copied, setCopied] = useState(false);
  const [showFull, setShowFull] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(prompt.full);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback
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
          borderRadius: 'var(--ld-semantic-border-radius-medium)',
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

/* ── PRD Template — uses LD TextField, TextArea, Button ── */

const PRD_FIELDS = [
  { id: 'name',       label: 'Feature name',   hint: 'e.g. Campaign Performance Dashboard' },
  { id: 'story',      label: 'User story',      hint: 'As a ___, I want to ___, so that ___' },
  { id: 'show',       label: 'What to display', hint: 'e.g. Table of campaigns, KPI cards for spend and ROAS' },
  { id: 'fields',     label: 'Data fields',     hint: 'e.g. Campaign name, daily budget, ROAS, status' },
  { id: 'actions',    label: 'Actions',         hint: 'e.g. Sort, filter by status, export CSV, click to drill down' },
  { id: 'filters',    label: 'Filters',         hint: 'e.g. Date range, campaign type, status (active/paused)' },
  { id: 'volume',     label: 'Data volume',     hint: 'e.g. Up to 500 rows, paginated 20 per page' },
  { id: 'empty',      label: 'Empty state',     hint: 'e.g. "No campaigns found" with a Create Campaign button' },
  { id: 'outofscope', label: 'Out of scope',    hint: 'e.g. No export, no editing inline' },
];

function PRDTemplate() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  const handleChange = useCallback((id: string, val: string) => {
    setValues(prev => ({ ...prev, [id]: val }));
  }, []);

  const buildText = () => {
    const lines = PRD_FIELDS.map(f => `${f.label}: ${values[f.id] || ''}`).join('\n');
    return notes.trim() ? `${lines}\n\nAdditional Notes:\n${notes}` : lines;
  };

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(buildText());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* noop */ }
  }, [values, notes]);

  const filled = Object.values(values).filter(Boolean).length + (notes.trim() ? 1 : 0);
  const total = PRD_FIELDS.length + 1; // +1 for notes field

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {PRD_FIELDS.map(field => (
        <TextField
          key={field.id}
          size="small"
          label={field.label}
          placeholder={field.hint}
          value={values[field.id] || ''}
          onChange={e => handleChange(field.id, e.target.value)}
        />
      ))}

      {/* Additional notes */}
      <TextArea
        size="small"
        label="Additional Notes"
        placeholder="Any additional context, edge cases, constraints, or requirements not captured above..."
        value={notes}
        onChange={e => setNotes(e.target.value)}
      />

      {/* Progress + copy */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginTop: '4px',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
          <span style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)', whiteSpace: 'nowrap' }}>
            {filled}/{total} fields filled
          </span>
          <div style={{ flex: 1, height: '5px', backgroundColor: 'var(--ld-semantic-color-fill-subtle)', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${(filled / total) * 100}%`,
              backgroundColor: filled === total ? 'var(--ld-semantic-color-text-positive)' : 'var(--ld-semantic-color-action-fill-primary)',
              borderRadius: '9999px',
              transition: 'width 250ms ease',
            }} />
          </div>
        </div>
        <Button
          variant={copied ? 'secondary' : 'primary'}
          size="small"
          onClick={handleCopy}
          leading={copied ? <Check width={14} height={14} /> : <Clipboard width={14} height={14} />}
        >
          {copied ? 'Copied!' : 'Copy PRD as prompt'}
        </Button>
      </div>
    </div>
  );
}

/* ── Helpers ── */

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: 'var(--ld-semantic-color-surface)',
      padding: 'var(--ld-semantic-spacing-400)',
      borderRadius: 'var(--ld-semantic-border-radius-large)',
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
      borderRadius: 'var(--ld-semantic-border-radius-large)',
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

/* ── Before You Prompt checklist — uses LD Checkbox ── */

const BEFORE_PROMPT_STEPS = [
  { label: "Know what data you're showing", detail: 'Metrics, list of items, chart trend, or summary stats?' },
  { label: 'Know the user action', detail: 'Filter, drill down, export, apply a recommendation, or just read?' },
  { label: 'Have an empty state in mind', detail: 'What should show when there\'s no data? A message + CTA?' },
  { label: 'Have a PRD or create one', detail: 'Use the PRD template below to write one — the more fields you complete, the better the output.' },
];

function BeforeYouPromptChecklist() {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const doneCount = checked.size;
  const total = BEFORE_PROMPT_STEPS.length;

  return (
    <div style={{
      backgroundColor: 'var(--ld-semantic-color-surface)',
      padding: 'var(--ld-semantic-spacing-300) var(--ld-semantic-spacing-400)',
      borderRadius: 'var(--ld-semantic-border-radius-large)',
      boxShadow: 'var(--ld-semantic-elevation-100)',
    }}>
      {/* Header with progress bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ld-semantic-color-text)', margin: 0 }}>
          Before You Prompt
        </h3>
        <span style={{ fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)' }}>
          {doneCount} / {total} ready
        </span>
        {doneCount === total && (
          <span style={{
            fontSize: '12px',
            fontWeight: 700,
            color: 'var(--ld-semantic-color-text-positive)',
            backgroundColor: 'var(--ld-semantic-color-fill-positive-subtle)',
            padding: '2px 10px',
            borderRadius: 'var(--ld-semantic-border-radius-pill)',
            border: '1px solid var(--ld-semantic-color-border-positive)',
          }}>
            Ready to go!
          </span>
        )}
        <div style={{ flex: 1, height: '5px', backgroundColor: 'var(--ld-semantic-color-fill-subtle)', borderRadius: 'var(--ld-semantic-border-radius-pill)', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${(doneCount / total) * 100}%`,
            backgroundColor: doneCount === total ? 'var(--ld-semantic-color-text-positive)' : 'var(--ld-semantic-color-action-fill-primary)',
            borderRadius: 'var(--ld-semantic-border-radius-pill)',
            transition: 'width 250ms ease',
          }} />
        </div>
      </div>

      <p style={{ fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '16px', lineHeight: 1.5 }}>
        Check these off before you write your first prompt. The agent produces much better output when you have clear answers to all four.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {BEFORE_PROMPT_STEPS.map((step, i) => {
          const done = checked.has(i);
          return (
            <div
              key={i}
              style={{
                padding: '14px 16px',
                backgroundColor: done ? 'var(--ld-semantic-color-fill-positive-subtle)' : 'var(--ld-semantic-color-fill-subtle)',
                borderRadius: '8px',
                border: `1px solid ${done ? 'var(--ld-semantic-color-border-positive)' : 'transparent'}`,
                transition: 'all 150ms ease',
              }}
            >
              <Checkbox
                checked={done}
                onCheckedChange={() => toggle(i)}
                label={step.label}
                id={`before-prompt-${i}`}
              />
              {!done && (
                <div style={{
                  fontSize: '13px',
                  color: 'var(--ld-semantic-color-text-subtle)',
                  marginTop: '4px',
                  lineHeight: 1.5,
                  paddingLeft: '28px',
                }}>
                  {step.detail}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Main ── */

export function GettingStartedPM() {
  const [quizHasPRD, setQuizHasPRD] = useState<string | undefined>(undefined);

  // Show PRD template when user says they don't have a PRD or only have rough notes
  const showPRDTemplate = quizHasPRD === 'no' || quizHasPRD === 'rough';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '24px' }}>

      {/* Intro */}
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
        padding: '24px 32px',
        borderRadius: '8px',
        borderLeft: '5px solid var(--ld-semantic-color-border-brand)',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ld-semantic-color-text)', marginBottom: '8px' }}>
          For Product Managers
        </h3>
        <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--ld-semantic-color-text-subtle)', margin: 0 }}>
          This guide helps you create data-rich features without writing code. Describe what you
          want to build &mdash; dashboards, tables, charts, metric cards, or recommendation lists &mdash;
          and the AI agent handles the implementation using the Living Design 3.5 component library.
          Start with the quiz below to generate a tailored prompt, or browse the example prompts to
          jump straight in.
        </p>
      </div>

      {/* Interactive onboarding quiz */}
      <PMOnboardingQuiz onComplete={setQuizHasPRD} />

      {/* PRD Template — shown conditionally when hasPRD is 'no' or 'rough' */}
      {showPRDTemplate && (
        <SectionCard title="PRD Template — Fill This In Before You Prompt">
          <p style={{ fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '20px', lineHeight: 1.5 }}>
            {quizHasPRD === 'rough'
              ? "Share what you have by filling in the fields below. The agent will structure your rough notes into a proper PRD — just copy the output and paste it into the chat."
              : "Fill in as many fields as you can below. The agent will use this to generate a precise implementation. The more fields you complete, the better the output."
            }
          </p>
          <PRDTemplate />
        </SectionCard>
      )}

      {/* Before you prompt checklist */}
      <BeforeYouPromptChecklist />

      {/* How It Works */}
      <SectionCard title="How It Works">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { step: '1', title: 'You describe the feature', desc: 'Use the quiz, a PRD, or plain language to tell the agent what you want built.' },
            { step: '2', title: 'The agent analyzes requirements', desc: 'It maps your requirements to LD 3.5 components, identifies the right layout patterns, and flags any conflicts with design rules.' },
            { step: '3', title: 'The agent builds the feature', desc: 'It generates production-ready code using approved components, semantic tokens, and accessibility standards.' },
            { step: '4', title: 'You review and iterate', desc: 'Changes appear in the live preview automatically. Describe what to change and the agent updates it.' },
          ].map((item) => (
            <div key={item.step} style={{
              display: 'flex',
              gap: '16px',
              padding: '16px 20px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '8px',
              alignItems: 'flex-start',
            }}>
              <span style={{
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
                flexShrink: 0,
              }}>
                {item.step}
              </span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px', color: 'var(--ld-semantic-color-text)' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Data Feature Patterns */}
      <SectionCard title="Data Feature Patterns">
        <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '20px' }}>
          These are the most common data-rich patterns available. Reference them by name when describing what you want.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          {[
            { label: 'Performance Dashboard', desc: 'Metric cards at top, chart in middle, data table below. Best for campaign overviews and summary reports.' },
            { label: 'Data Table with Filters', desc: 'Filterable, sortable table with column resizing, row selection, and export. Best for keyword and item reports.' },
            { label: 'KPI Card Grid', desc: 'Responsive grid of metric cards with trend indicators. Best for executive summaries and at-a-glance metrics.' },
            { label: 'Recommendation Cards', desc: 'Horizontal carousel or list of actionable cards with Apply/Dismiss actions. Best for optimization suggestions.' },
            { label: 'Chart + Summary', desc: 'Chart with legend, time controls, and summary statistics. Best for trend analysis and comparisons.' },
            { label: 'Detail Panel', desc: 'Resizable side panel that opens from a table row or card click. Best for drill-down views.' },
          ].map((item) => (
            <div key={item.label} style={{ padding: '16px', backgroundColor: 'var(--ld-semantic-color-fill-subtle)', borderRadius: '6px' }}>
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

      {/* All Prompts — collapsible */}
      <CollapsibleSection title="All Quick-Start Prompts">
        <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '20px' }}>
          Browse and copy any prompt directly. Click a chip to copy, use the arrow to preview the full prompt.
        </p>
        <Accordion type="multiple" defaultValue={['dashboards']}>
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

      {/* Tips for Better Results */}
      <CollapsibleSection title="Tips for Better Results">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { title: 'Be specific about data fields', bad: '"Show campaign metrics"', good: '"Show a table with columns: campaign name (text), daily budget (currency), ROAS (decimal to 2 places), status (active/paused as a tag)"' },
            { title: 'Describe the data volume', bad: '"Show the campaigns"', good: '"Show up to 500 campaigns with pagination (20 per page), sortable by any column"' },
            { title: 'Specify comparisons', bad: '"Show trends"', good: '"Line chart with two series: current period impressions vs previous period, x-axis is weekly"' },
            { title: 'Reference existing features', bad: '"Make it look like that other table"', good: '"Use the same table layout as the Campaign Dashboard page"' },
            { title: 'State what is out of scope', bad: '(leaving it open-ended)', good: '"This page does NOT need export functionality or date filtering — just a static summary"' },
          ].map((tip, i) => (
            <div key={i} style={{ padding: '16px 20px', backgroundColor: 'var(--ld-semantic-color-fill-subtle)', borderRadius: '6px' }}>
              <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
                {tip.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px', lineHeight: 1.5 }}>
                <div style={{ color: 'var(--ld-semantic-color-text-negative)' }}>Instead of: {tip.bad}</div>
                <div style={{ color: 'var(--ld-semantic-color-text-positive)' }}>Say: {tip.good}</div>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* What the Agent Knows */}
      <CollapsibleSection title="What the Agent Knows">
        <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '16px' }}>
          You do not need to know any of this — the agent applies it automatically. But here is what is available:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {[
            { label: '50+ LD 3.5 Components', desc: 'Button, Card, DataTable, Select, TextField, and more' },
            { label: '303+ Icons', desc: 'Full icon library — no external icon packages needed' },
            { label: '624+ Design Tokens', desc: 'Colors, spacing, typography, and elevation' },
            { label: '8 Chart Color Tokens', desc: 'Consistent colors for data visualization series' },
            { label: 'Recharts Library', desc: 'Line, bar, area, pie, scatter charts and more' },
            { label: '16+ Enforcement Rules', desc: 'No hard-coded colors, responsive layouts, accessibility' },
          ].map((item) => (
            <div key={item.label} style={{ padding: '16px', backgroundColor: 'var(--ld-semantic-color-fill-subtle)', borderRadius: '6px' }}>
              <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px', color: 'var(--ld-semantic-color-text)' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--ld-semantic-color-text-subtle)' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* FAQ */}
      <CollapsibleSection title="Frequently Asked Questions">
        <Accordion type="multiple">
          {[
            { q: 'Do I need to know React or TypeScript?', a: 'No. Describe what you want in plain language. The agent handles all code.' },
            { q: 'Can I iterate on the design after it is built?', a: 'Yes. Just describe what you want changed: "Add a ROAS column to the table", "Change the chart to a bar chart", "Make the cards show percentage change".' },
            { q: "What if I disagree with the agent's approach?", a: 'Tell it. The agent follows your direction. If your request conflicts with a design rule, the agent will explain why and suggest alternatives.' },
            { q: 'How do I see my changes?', a: 'Changes appear in the live preview automatically. You can also open the preview in a full-screen view.' },
            { q: 'How do I share my work?', a: 'Push your changes using the button in the top right corner, or share the preview link with your team.' },
            { q: 'What is a PRD and do I need one?', a: 'A PRD (Product Requirements Document) describes what you want built in detail. It helps the agent build exactly what you need. If you do not have one, the agent will help you create one step by step.' },
          ].map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>
                <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  {item.a}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CollapsibleSection>
    </div>
  );
}
