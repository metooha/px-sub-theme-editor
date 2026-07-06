import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Tabs, TabList, Tab, TabPanel } from '@/components/ui/Tab';
import { GettingStartedDesigner } from './GettingStartedDesigner';
import { GettingStartedAgent } from './GettingStartedAgent';
import { GettingStartedPM } from './GettingStartedPM';
import { DeveloperOnboardingQuiz } from './DeveloperOnboardingQuiz';

/* ── Component Index Data ── */

interface ComponentEntry {
  name: string;
  file: string;
  importPath: string;
  namedExports: string;
  libraryRoute: string;
  category: string;
}

const COMPONENT_INDEX: ComponentEntry[] = [
  // Layout & Shell
  { category: 'Layout', name: 'MastHead', file: 'client/components/ui/MastHead.tsx', importPath: "@/components/ui/MastHead", namedExports: 'MastHead', libraryRoute: '/component-library' },
  { category: 'Layout', name: 'AppSidebar', file: 'client/components/ui/AppSidebar.tsx', importPath: "@/components/ui/AppSidebar", namedExports: 'AppSidebar', libraryRoute: '/component-library' },
  { category: 'Layout', name: 'PageHeader', file: 'client/components/ui/PageHeader.tsx', importPath: "@/components/ui/PageHeader", namedExports: 'PageHeader', libraryRoute: '/component-library' },
  // Actions
  { category: 'Actions', name: 'Button', file: 'client/components/ui/Button.tsx', importPath: "@/components/ui/Button", namedExports: 'Button', libraryRoute: '/component-library/buttons' },
  { category: 'Actions', name: 'IconButton', file: 'client/components/ui/IconButton.tsx', importPath: "@/components/ui/IconButton", namedExports: 'IconButton', libraryRoute: '/component-library/icon-buttons' },
  { category: 'Actions', name: 'LinkButton', file: 'client/components/ui/LinkButton.tsx', importPath: "@/components/ui/LinkButton", namedExports: 'LinkButton', libraryRoute: '/component-library/link-buttons' },
  { category: 'Actions', name: 'ButtonGroup', file: 'client/components/ui/ButtonGroup.tsx', importPath: "@/components/ui/ButtonGroup", namedExports: 'ButtonGroup', libraryRoute: '/component-library/buttons' },
  // Forms
  { category: 'Forms', name: 'TextField', file: 'client/components/ui/TextField.tsx', importPath: "@/components/ui/TextField", namedExports: 'TextField', libraryRoute: '/component-library/text-fields' },
  { category: 'Forms', name: 'TextArea', file: 'client/components/ui/TextArea.tsx', importPath: "@/components/ui/TextArea", namedExports: 'TextArea', libraryRoute: '/component-library/textarea' },
  { category: 'Forms', name: 'Select', file: 'client/components/ui/Select.tsx', importPath: "@/components/ui/Select", namedExports: 'Select, SelectItem', libraryRoute: '/component-library/select' },
  { category: 'Forms', name: 'Checkbox', file: 'client/components/ui/Checkbox.tsx', importPath: "@/components/ui/Checkbox", namedExports: 'Checkbox', libraryRoute: '/component-library/checkboxes' },
  { category: 'Forms', name: 'Radio / RadioGroup', file: 'client/components/ui/RadioGroup.tsx', importPath: "@/components/ui/RadioGroup", namedExports: 'Radio, RadioGroup', libraryRoute: '/component-library/radio-buttons' },
  { category: 'Forms', name: 'Switch', file: 'client/components/ui/Switch.tsx', importPath: "@/components/ui/Switch", namedExports: 'Switch', libraryRoute: '/component-library/switches' },
  { category: 'Forms', name: 'DateField', file: 'client/components/ui/DateField.tsx', importPath: "@/components/ui/DateField", namedExports: 'DateField', libraryRoute: '/component-library/date-fields' },
  // Data Display
  { category: 'Data', name: 'DataTable', file: 'client/components/ui/DataTable.tsx', importPath: "@/components/ui/DataTable", namedExports: 'DataTable, DataTableHead, DataTableBody', libraryRoute: '/component-library/table' },
  { category: 'Data', name: 'DataTableRow', file: 'client/components/ui/DataTableRow.tsx', importPath: "@/components/ui/DataTableRow", namedExports: 'DataTableRow', libraryRoute: '/component-library/table' },
  { category: 'Data', name: 'DataTableHeader', file: 'client/components/ui/DataTableHeader.tsx', importPath: "@/components/ui/DataTableHeader", namedExports: 'DataTableHeader', libraryRoute: '/component-library/table' },
  { category: 'Data', name: 'Chart', file: 'client/components/ui/Chart.tsx', importPath: "@/components/ui/Chart", namedExports: 'ChartContainer, ChartConfig', libraryRoute: '/component-library/chart' },
  { category: 'Data', name: 'Metric', file: 'client/components/ui/Metric.tsx', importPath: "@/components/ui/Metric", namedExports: 'Metric', libraryRoute: '/component-library/metrics' },
  { category: 'Data', name: 'Pagination', file: 'client/components/ui/Pagination.tsx', importPath: "@/components/ui/Pagination", namedExports: 'Pagination', libraryRoute: '/component-library/pagination' },
  // Containers
  { category: 'Containers', name: 'Card', file: 'client/components/ui/Card.tsx', importPath: "@/components/ui/Card", namedExports: 'Card, CardContent, CardHeader', libraryRoute: '/component-library/cards' },
  { category: 'Containers', name: 'Accordion', file: 'client/components/ui/Accordion.tsx', importPath: "@/components/ui/Accordion", namedExports: 'Accordion, AccordionItem, AccordionTrigger, AccordionContent', libraryRoute: '/component-library/accordion' },
  { category: 'Containers', name: 'Tabs', file: 'client/components/ui/Tab.tsx', importPath: "@/components/ui/Tab", namedExports: 'Tabs, TabList, Tab, TabPanel', libraryRoute: '/component-library/tabs' },
  { category: 'Containers', name: 'Carousel', file: 'client/components/ui/Carousel.tsx', importPath: "@/components/ui/Carousel", namedExports: 'Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext', libraryRoute: '/component-library/carousel' },
  { category: 'Containers', name: 'Panel', file: 'client/components/ui/Panel.tsx', importPath: "@/components/ui/Panel", namedExports: 'Panel', libraryRoute: '/component-library/panels' },
  { category: 'Containers', name: 'Section', file: 'client/components/ui/Section.tsx', importPath: "@/components/ui/Section", namedExports: 'PrimarySection, SecondarySection, TertiarySection', libraryRoute: '/component-library/sections' },
  // Overlays
  { category: 'Overlays', name: 'Modal', file: 'client/components/ui/Modal.tsx', importPath: "@/components/ui/Modal", namedExports: 'Modal', libraryRoute: '/component-library/modals' },
  { category: 'Overlays', name: 'Dialog', file: 'client/components/ui/Dialog.tsx', importPath: "@/components/ui/Dialog", namedExports: 'Dialog, DialogTrigger, DialogContent', libraryRoute: '/component-library/dialog' },
  { category: 'Overlays', name: 'AlertDialog', file: 'client/components/ui/AlertDialog.tsx', importPath: "@/components/ui/AlertDialog", namedExports: 'AlertDialog', libraryRoute: '/component-library/alert-dialog' },
  { category: 'Overlays', name: 'Popover', file: 'client/components/ui/Popover.tsx', importPath: "@/components/ui/Popover", namedExports: 'Popover, PopoverTrigger, PopoverContent, PopoverArrow', libraryRoute: '/component-library/popover' },
  { category: 'Overlays', name: 'Snackbar', file: 'client/components/ui/Snackbar.tsx', importPath: "@/components/ui/Snackbar", namedExports: 'Snackbar', libraryRoute: '/component-library/snackbars' },
  // Feedback
  { category: 'Feedback', name: 'Alert', file: 'client/components/ui/Alert.tsx', importPath: "@/components/ui/Alert", namedExports: 'Alert', libraryRoute: '/component-library/alerts' },
  { category: 'Feedback', name: 'Tag', file: 'client/components/ui/Tag.tsx', importPath: "@/components/ui/Tag", namedExports: 'Tag', libraryRoute: '/component-library/tags' },
  { category: 'Feedback', name: 'Badge', file: 'client/components/ui/Badge.tsx', importPath: "@/components/ui/Badge", namedExports: 'Badge', libraryRoute: '/component-library/badges' },
  { category: 'Feedback', name: 'Spinner', file: 'client/components/ui/Spinner.tsx', importPath: "@/components/ui/Spinner", namedExports: 'Spinner', libraryRoute: '/component-library/spinners' },
  { category: 'Feedback', name: 'Skeleton', file: 'client/components/ui/Skeleton.tsx', importPath: "@/components/ui/Skeleton", namedExports: 'Skeleton', libraryRoute: '/component-library/skeleton' },
  { category: 'Feedback', name: 'Divider', file: 'client/components/ui/Divider.tsx', importPath: "@/components/ui/Divider", namedExports: 'Divider', libraryRoute: '/component-library/dividers' },
  // Icons
  { category: 'Icons', name: 'Icon Library', file: 'client/components/icons/', importPath: "@/components/icons", namedExports: 'Search, Home, Settings, ... (303+ icons)', libraryRoute: '/component-library/icons' },
];

const CATEGORIES = ['All', ...Array.from(new Set(COMPONENT_INDEX.map(c => c.category)))];

function ComponentIndexTable() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [copiedRow, setCopiedRow] = useState<string | null>(null);

  const filtered = COMPONENT_INDEX.filter(c => {
    const matchCat = filter === 'All' || c.category === filter;
    const matchSearch = !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.importPath.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const copyImport = async (entry: ComponentEntry) => {
    const text = `import { ${entry.namedExports} } from '${entry.importPath}';`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedRow(entry.name);
      setTimeout(() => setCopiedRow(null), 1500);
    } catch { /* noop */ }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Controls */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search component or import..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: '1 1 200px',
            padding: '7px 12px',
            borderRadius: '6px',
            border: '1px solid var(--ld-semantic-color-separator)',
            background: 'var(--ld-semantic-color-fill-subtle)',
            fontSize: '13px',
            color: 'var(--ld-semantic-color-text)',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            outline: 'none',
          }}
        />
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '5px 12px',
                borderRadius: '9999px',
                border: '1px solid var(--ld-semantic-color-separator)',
                background: filter === cat ? 'var(--ld-semantic-color-fill-brand-subtle)' : 'var(--ld-semantic-color-fill-subtle)',
                color: filter === cat ? 'var(--ld-semantic-color-text-brand-bold)' : 'var(--ld-semantic-color-text-subtle)',
                fontSize: '12px',
                fontWeight: filter === cat ? 700 : 400,
                cursor: 'pointer',
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                transition: 'all 120ms ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '140px 1fr 160px 100px',
        gap: '0',
        padding: '8px 12px',
        background: 'var(--ld-semantic-color-fill-subtle)',
        borderRadius: '6px 6px 0 0',
        borderBottom: '1px solid var(--ld-semantic-color-separator)',
      }}>
        {['Component', 'Import', 'Workspace file', ''].map((h, i) => (
          <span key={i} style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ld-semantic-color-text-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</span>
        ))}
      </div>

      {/* Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid var(--ld-semantic-color-separator)', borderRadius: '0 0 6px 6px', overflow: 'hidden' }}>
        {filtered.length === 0 && (
          <div style={{ padding: '16px 12px', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)' }}>No components match.</div>
        )}
        {filtered.map((entry, i) => (
          <div
            key={entry.name}
            style={{
              display: 'grid',
              gridTemplateColumns: '140px 1fr 160px 100px',
              gap: '0',
              padding: '10px 12px',
              background: i % 2 === 0 ? 'var(--ld-semantic-color-surface)' : 'var(--ld-semantic-color-fill-subtle)',
              alignItems: 'center',
              borderTop: i === 0 ? 'none' : '1px solid var(--ld-semantic-color-separator)',
            }}
          >
            {/* Name */}
            <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--ld-semantic-color-text)' }}>{entry.name}</span>

            {/* Import path */}
            <code style={{
              fontFamily: 'var(--ld-semantic-font-family-mono)',
              fontSize: '12px',
              color: 'var(--ld-semantic-color-text-brand-bold)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {`import { ${entry.namedExports} } from '${entry.importPath}'`}
            </code>

            {/* File path */}
            <code style={{
              fontFamily: 'var(--ld-semantic-font-family-mono)',
              fontSize: '11px',
              color: 'var(--ld-semantic-color-text-subtle)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {entry.file}
            </code>

            {/* Copy button */}
            <button
              onClick={() => copyImport(entry)}
              style={{
                padding: '4px 10px',
                borderRadius: '4px',
                border: '1px solid var(--ld-semantic-color-separator)',
                background: copiedRow === entry.name ? 'var(--ld-semantic-color-fill-positive-subtle)' : 'var(--ld-semantic-color-surface)',
                color: copiedRow === entry.name ? 'var(--ld-semantic-color-text-positive)' : 'var(--ld-semantic-color-text-subtle)',
                fontSize: '11px',
                cursor: 'pointer',
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                transition: 'all 120ms ease',
                justifySelf: 'end',
              }}
            >
              {copiedRow === entry.name ? '✓ Copied' : '⎘ Copy import'}
            </button>
          </div>
        ))}
      </div>
      <p style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)', margin: 0 }}>
        {filtered.length} of {COMPONENT_INDEX.length} components shown. The <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)' }}>@/</code> alias resolves to <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)' }}>client/</code> via <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)' }}>vite.config.ts</code>.
      </p>
    </div>
  );
}

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

function DepTable({ rows }: { rows: { pkg: string; purpose: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {rows.map((row) => (
        <div key={row.pkg} style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          padding: '12px 16px',
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
            {row.pkg}
          </code>
          <span style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>{row.purpose}</span>
        </div>
      ))}
    </div>
  );
}

const coreDeps = [
  { pkg: 'react, react-dom', purpose: 'UI framework' },
  { pkg: 'react-router-dom', purpose: 'Client routing' },
  { pkg: 'typescript', purpose: 'Type safety' },
  { pkg: 'vite, @vitejs/plugin-react-swc', purpose: 'Build tooling' },
];

const designDeps = [
  { pkg: 'Standalone UI primitives (no external deps)', purpose: 'Accessible headless UI components built in-house' },
  { pkg: 'class-variance-authority', purpose: 'Component variant management' },
  { pkg: 'clsx, tailwind-merge', purpose: 'Class name utilities' },
  { pkg: 'tailwindcss, postcss, autoprefixer', purpose: 'Styling framework' },
];

const featureDeps = [
  { pkg: 'i18next, react-i18next', purpose: 'Internationalization (en, es, fr)' },
  { pkg: 'recharts', purpose: 'Charts and graphs' },
  { pkg: 'lottie-react', purpose: 'Lottie animations' },
  { pkg: 'react-day-picker, date-fns', purpose: 'Calendar and date formatting' },
  { pkg: 'react-hook-form', purpose: 'Form management' },
  { pkg: 'embla-carousel-react', purpose: 'Carousel' },
  { pkg: 'vaul', purpose: 'Drawer and bottom sheet' },
  { pkg: 'express, cors', purpose: 'API server' },
];

const projectStructure = [
  { path: 'client/App.tsx', desc: 'Entry point with routing' },
  { path: 'client/components/ui/', desc: 'Living Design 3.5 components' },
  { path: 'client/pages/', desc: 'Application pages and routes' },
  { path: 'client/styles/themes/', desc: 'Theme token CSS files' },
  { path: 'client/contexts/', desc: 'React contexts (Theme, Marty)' },
  { path: 'client/locales/', desc: 'i18n translation files (en, es, fr)' },
  { path: 'client/components/icons/', desc: 'Icon library' },
  { path: 'guidelines/', desc: 'Design system rules and docs' },
  { path: 'server/', desc: 'Express API server' },
  { path: 'public/fonts/', desc: 'Brand fonts (Everyday Sans)' },
];

const setupSteps = [
  {
    title: 'Install dependencies',
    code: 'pnpm install',
    detail: 'Installs all packages including React, Radix UI primitives, Tailwind, and the Express server.',
  },
  {
    title: 'Start the dev server',
    code: 'pnpm dev',
    detail: 'Launches Vite with the Express API server as middleware. The app is available on the local dev port with hot module replacement.',
  },
  {
    title: 'Explore the component library',
    code: null,
    detail: 'Navigate to /component-library to browse all available Living Design 3.5 components, view live examples, and test properties in the Component Sandbox.',
  },
  {
    title: 'Build for production',
    code: 'pnpm build',
    detail: 'Produces a client SPA bundle (dist/spa/) and a server bundle (dist/server/). The client build is optimized with code splitting.',
  },
  {
    title: 'Start the production server',
    code: 'pnpm start',
    detail: 'Runs the built Express server which serves the SPA and handles API routes.',
  },
];

/* ── Copyable inline code block ── */

function CopyableCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* noop */ }
  }, [code]);

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      fontFamily: 'var(--ld-semantic-font-family-mono)',
      fontSize: '13px',
      backgroundColor: 'var(--ld-semantic-color-surface)',
      padding: '8px 14px',
      borderRadius: '4px',
      marginBottom: '8px',
      color: 'var(--ld-semantic-color-text)',
      border: '1px solid var(--ld-semantic-color-border-moderate)',
    }}>
      <span>$ {code}</span>
      <button
        onClick={handleCopy}
        title="Copy command"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '2px 6px',
          borderRadius: '4px',
          fontSize: '11px',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: copied ? 'var(--ld-semantic-color-text-positive)' : 'var(--ld-semantic-color-text-subtle)',
          backgroundColor: copied ? 'var(--ld-semantic-color-fill-positive-subtle)' : 'transparent',
          transition: 'all 120ms ease',
          flexShrink: 0,
        }}
      >
        {copied ? '\u2713' : '\u2398'}
      </button>
    </div>
  );
}

/* ── Checkable setup steps ── */

function CheckableSetupSteps({ steps }: { steps: { title: string; code: string | null; detail: string }[] }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const doneCount = checked.size;
  const total = steps.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
        <span style={{ fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)', fontFamily: 'var(--ld-semantic-font-family-sans)' }}>
          {doneCount} / {total} steps complete
        </span>
        {doneCount === total && (
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ld-semantic-color-text-positive)', backgroundColor: 'var(--ld-semantic-color-fill-positive-subtle)', padding: '2px 10px', borderRadius: '9999px', border: '1px solid var(--ld-semantic-color-border-positive)' }}>All done!</span>
        )}
        <div style={{ flex: 1, height: '5px', backgroundColor: 'var(--ld-semantic-color-fill-subtle)', borderRadius: '9999px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(doneCount / total) * 100}%`, backgroundColor: doneCount === total ? 'var(--ld-semantic-color-text-positive)' : 'var(--ld-semantic-color-action-fill-primary)', borderRadius: '9999px', transition: 'width 250ms ease' }} />
        </div>
      </div>
      {steps.map((step, i) => {
        const done = checked.has(i);
        return (
          <div key={i} onClick={() => toggle(i)} style={{ display: 'flex', gap: '16px', padding: '20px', backgroundColor: done ? 'var(--ld-semantic-color-fill-positive-subtle)' : 'var(--ld-semantic-color-fill-subtle)', borderRadius: '8px', border: `1px solid ${done ? 'var(--ld-semantic-color-border-positive)' : 'transparent'}`, transition: 'all 150ms ease', cursor: 'pointer' }}>
            <div style={{ minWidth: '36px', height: '36px', backgroundColor: done ? 'var(--ld-semantic-color-text-positive)' : 'var(--ld-semantic-color-fill-brand-subtle)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: done ? '18px' : '16px', color: done ? 'var(--ld-semantic-color-surface)' : 'var(--ld-semantic-color-text-brand-bold)', flexShrink: 0, transition: 'all 150ms ease' }}>
              {done ? '\u2713' : i + 1}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '6px', color: 'var(--ld-semantic-color-text)', textDecoration: done ? 'line-through' : 'none', opacity: done ? 0.6 : 1, transition: 'all 150ms ease' }}>{step.title}</div>
              {step.code && !done && <CopyableCode code={step.code} />}
              {!done && <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>{step.detail}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function GettingStartedPage() {
  const { t } = useTranslation();

  return (
    <div style={{ padding: '48px', maxWidth: '1200px', margin: '0 auto' }}>
      <PageHeader
        section={t('componentLibrary.gettingStarted')}
        title={t('componentLibrary.gettingStartedTitle')}
        description={t('componentLibrary.gettingStartedDesc')}
      />

      <Tabs defaultValue="designer">
        <TabList>
          <Tab value="designer">{t('componentLibrary.tabDesigner')}</Tab>
          <Tab value="pm">{t('componentLibrary.tabPM')}</Tab>
          <Tab value="developer">{t('componentLibrary.tabDeveloper')}</Tab>
          <Tab value="agent">{t('componentLibrary.tabAgent')}</Tab>
        </TabList>

        {/* Designer Tab */}
        <TabPanel value="designer">
          <GettingStartedDesigner />
        </TabPanel>

        {/* PM Tab */}
        <TabPanel value="pm">
          <GettingStartedPM />
        </TabPanel>

        {/* Developer Tab */}
        <TabPanel value="developer">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '24px' }}>

            {/* Intro Callout */}
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
                For Developers
              </h3>
              <p style={{
                fontSize: '15px',
                lineHeight: 1.7,
                color: 'var(--ld-semantic-color-text-subtle)',
                margin: 0,
              }}>
                Find the right component in seconds, check off your setup steps, and copy any import with one click.
              </p>
            </div>

            {/* Developer onboarding quiz */}
            <DeveloperOnboardingQuiz />

            {/* Prerequisites */}
            <SectionCard title="Prerequisites">
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {[
                  { name: 'Node.js', version: '18+', desc: 'JavaScript runtime' },
                  { name: 'pnpm', version: 'See packageManager in package.json', desc: 'Package manager' },
                ].map((p) => (
                  <div key={p.name} style={{
                    flex: '1 1 240px',
                    padding: '16px',
                    backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                    borderRadius: '6px',
                  }}>
                    <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px', color: 'var(--ld-semantic-color-text)' }}>
                      {p.name}
                    </div>
                    <div style={{
                      fontFamily: 'var(--ld-semantic-font-family-mono)',
                      fontSize: '13px',
                      color: 'var(--ld-semantic-color-text-brand-bold)',
                      marginBottom: '4px',
                    }}>
                      {p.version}
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)' }}>{p.desc}</div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Setup Steps — checkable */}
            <SectionCard title="Setup Steps">
              <CheckableSetupSteps steps={setupSteps} />
            </SectionCard>

            {/* Project Structure */}
            <SectionCard title="Project Structure">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {projectStructure.map((item) => (
                  <div key={item.path} style={{
                    display: 'grid',
                    gridTemplateColumns: '260px 1fr',
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

            {/* Dependencies */}
            <SectionCard title="Core Dependencies">
              <DepTable rows={coreDeps} />
            </SectionCard>
            <SectionCard title="Design System Primitives">
              <DepTable rows={designDeps} />
            </SectionCard>
            <SectionCard title="Feature Libraries">
              <DepTable rows={featureDeps} />
            </SectionCard>

            {/* Component Index */}
            <SectionCard title="Component Index — Workspace Mapping">
              <p style={{ fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '16px', lineHeight: 1.5 }}>
                Every LD 3.5 component lives in <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', fontSize: '12px', background: 'var(--ld-semantic-color-fill-subtle)', padding: '1px 5px', borderRadius: '4px' }}>client/components/ui/</code>.
                Use the <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', fontSize: '12px', background: 'var(--ld-semantic-color-fill-subtle)', padding: '1px 5px', borderRadius: '4px' }}>@/</code> alias for all imports — it maps to <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', fontSize: '12px', background: 'var(--ld-semantic-color-fill-subtle)', padding: '1px 5px', borderRadius: '4px' }}>client/</code>.
              </p>
              <ComponentIndexTable />
            </SectionCard>

            {/* Using in Existing Project */}
            <SectionCard title="Using in an Existing Project">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { title: 'Use existing components', detail: 'Check client/components/ui/ before creating anything new. Import with: import { Button } from \'@/components/ui/Button\'' },
                  { title: 'Add new pages', detail: 'Create route files in client/pages/ and register them in client/App.tsx under <Routes>.' },
                  { title: 'Add translations', detail: 'Add strings to client/locales/en/common.json, es/common.json, and fr/common.json.' },
                  { title: 'Add API routes', detail: 'Create handlers in server/routes/ and register them in server/index.ts.' },
                  { title: 'Follow the design system', detail: 'Always use semantic tokens (var(--ld-semantic-color-*)) for colors, spacing, and typography. Never hard-code hex values.' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '16px 20px',
                    backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                    borderRadius: '6px',
                    alignItems: 'flex-start',
                  }}>
                    <div style={{
                      minWidth: '24px',
                      height: '24px',
                      backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '12px',
                      color: 'var(--ld-semantic-color-text-brand-bold)',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}>
                      {i + 1}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px', color: 'var(--ld-semantic-color-text)' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                        {item.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Standalone Setup */}
            <SectionCard title="Standalone Setup (Outside Builder.io)">
              <p style={{
                fontSize: '14px',
                lineHeight: 1.6,
                color: 'var(--ld-semantic-color-text-subtle)',
                marginBottom: '16px',
              }}>
                This kit is a standard React + Vite project that works anywhere. Here's how to use it
                outside of Builder.io and Fusion:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  {
                    title: 'Download the project',
                    detail: 'Use the Download button in Builder.io, or clone the git repo. You\'ll get the full project with all components, tokens, icons, and translations.',
                  },
                  {
                    title: 'Open in your editor',
                    detail: 'Works with any editor: Cursor, VS Code, WebStorm, Zed, etc. Open the root folder as a project.',
                  },
                  {
                    title: 'Install & run',
                    code: 'pnpm install && pnpm dev',
                    detail: 'Standard Node.js setup. The dev server starts with hot module replacement on localhost.',
                  },
                  {
                    title: 'Configure AI context (Cursor / Copilot / Windsurf)',
                    detail: 'Copy the contents of design-system-docs/AGENTS.md and guidelines/rules/ into your AI editor\'s context file (.cursorrules, .github/copilot-instructions.md, etc.). This teaches the AI to use LD 3.5 components and tokens correctly instead of generating raw HTML.',
                  },
                  {
                    title: 'Figma Make integration',
                    detail: 'When using Figma Make to generate code, point it at this project as the target. Map Figma component names (e.g., "[LD 3.5] Button") to the kit components (client/components/ui/Button.tsx). Post-process the output to replace hard-coded colors with semantic tokens.',
                  },
                  {
                    title: 'No Builder.io dependency',
                    detail: 'The kit has zero runtime dependencies on Builder.io. All components, themes, icons, and i18n work standalone. The only Builder.io-specific feature is the Fusion AI agent integration, which is optional.',
                  },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '20px',
                    backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                    borderRadius: '8px',
                  }}>
                    <div style={{
                      minWidth: '36px',
                      height: '36px',
                      backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '16px',
                      color: 'var(--ld-semantic-color-text-brand-bold)',
                    }}>
                      {i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '6px', color: 'var(--ld-semantic-color-text)' }}>
                        {item.title}
                      </div>
                      {'code' in item && item.code && <CopyableCode code={item.code} />}
                      <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                        {item.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Deployment */}
            <SectionCard title="Deployment">
              <p style={{
                fontSize: '14px',
                lineHeight: 1.6,
                color: 'var(--ld-semantic-color-text-subtle)',
                marginBottom: '16px',
              }}>
                Pre-configured for Netlify deployment via <code style={{
                  fontFamily: 'var(--ld-semantic-font-family-mono)',
                  fontSize: '13px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}>netlify.toml</code>:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: 'Build command', value: 'npm run build:client' },
                  { label: 'Publish directory', value: 'dist/spa' },
                  { label: 'API routes', value: 'Redirected to Netlify Functions via /api/*' },
                ].map((item) => (
                  <div key={item.label} style={{
                    display: 'grid',
                    gridTemplateColumns: '180px 1fr',
                    gap: '16px',
                    padding: '10px 16px',
                    backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                    borderRadius: '6px',
                    fontSize: '14px',
                    alignItems: 'center',
                  }}>
                    <strong style={{ color: 'var(--ld-semantic-color-text)' }}>{item.label}</strong>
                    <code style={{
                      fontFamily: 'var(--ld-semantic-font-family-mono)',
                      fontSize: '13px',
                      color: 'var(--ld-semantic-color-text-subtle)',
                    }}>
                      {item.value}
                    </code>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </TabPanel>

        {/* Agent Tab */}
        <TabPanel value="agent">
          <GettingStartedAgent />
        </TabPanel>
      </Tabs>
    </div>
  );
}
