import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { RadioGroup, Radio } from '@/components/ui/RadioGroup';
import { CheckCircleFill } from '@/components/icons/CheckCircleFill';
import { Check } from '@/components/icons/Check';
import { Refresh } from '@/components/icons/Refresh';
import { Brackets } from '@/components/icons/Brackets';
import { Flash } from '@/components/icons/Flash';
import { BulletList } from '@/components/icons/BulletList';

/* ── Types ── */

type Task = 'new-page' | 'new-component' | 'adding-to-existing' | 'debugging';
type UIType = 'data-table' | 'chart' | 'form' | 'dashboard' | 'detail-panel' | 'other';
type Tool = 'fusion' | 'vscode' | 'cursor' | 'other';
type Experience = 'first-time' | 'familiar' | 'advanced';

interface Answers {
  task?: Task;
  uiType?: UIType;
  tool?: Tool;
  experience?: Experience;
}

/* ── Result data ── */

interface ResultData {
  component: string;
  importStatement: string;
  libraryRoute: string;
  prompt: string;
}

function generateResult(answers: Answers): ResultData {
  const { task, uiType, tool, experience } = answers;

  // Pick recommended component based on UI type
  let component = 'Button';
  let importStatement = "import { Button } from '@/components/ui/Button';";
  let libraryRoute = '/component-library/buttons';

  if (uiType === 'data-table') {
    component = 'DataTable';
    importStatement = "import { DataTable, DataTableHead, DataTableBody } from '@/components/ui/DataTable';\nimport { DataTableRow } from '@/components/ui/DataTableRow';\nimport { DataTableHeader } from '@/components/ui/DataTableHeader';\nimport { DataTableCell } from '@/components/ui/DataTableCellText';";
    libraryRoute = '/component-library/table';
  } else if (uiType === 'chart') {
    component = 'ChartContainer';
    importStatement = "import { ChartContainer } from '@/components/ui/Chart';";
    libraryRoute = '/component-library/chart';
  } else if (uiType === 'form') {
    component = 'TextField + Select';
    importStatement = "import { TextField } from '@/components/ui/TextField';\nimport { Select, SelectItem } from '@/components/ui/Select';\nimport { Button } from '@/components/ui/Button';";
    libraryRoute = '/component-library/text-fields';
  } else if (uiType === 'dashboard') {
    component = 'Card + Metric';
    importStatement = "import { Card, CardContent, CardHeader } from '@/components/ui/Card';\nimport { Metric } from '@/components/ui/Metric';";
    libraryRoute = '/component-library/cards';
  } else if (uiType === 'detail-panel') {
    component = 'Panel';
    importStatement = "import { Panel } from '@/components/ui/Panel';";
    libraryRoute = '/component-library/panels';
  } else if (task === 'new-page') {
    component = 'PageHeader';
    importStatement = "import { PageHeader } from '@/components/ui/PageHeader';";
    libraryRoute = '/component-library';
  }

  // Build prompt
  const parts: string[] = [];

  if (task === 'new-page') {
    parts.push("I'm building a new page in this project using the Living Design 3.5 Portable Kit.");
  } else if (task === 'new-component') {
    parts.push("I need to create a new reusable component following the LD 3.5 component creation checklist.");
  } else if (task === 'adding-to-existing') {
    parts.push("I'm adding new UI to an existing page in this project.");
  } else if (task === 'debugging') {
    parts.push("I'm debugging an issue in this project.");
  } else {
    parts.push("I'm working on a task in the Living Design 3.5 Portable Kit project.");
  }

  if (uiType === 'data-table') {
    parts.push("I need a data table with sortable columns, resizable headers, row selection checkboxes, and a cell-wrap toggle. Use DataTable, DataTableHead, DataTableBody, DataTableRow, DataTableHeader, and DataTableCell components.");
  } else if (uiType === 'chart') {
    parts.push("I need a chart visualization. Use ChartContainer from '@/components/ui/Chart' with Recharts. Use the ld-semantic-color-chart-categorical-{1-8} tokens for series colors — never hard-code hex values.");
  } else if (uiType === 'form') {
    parts.push("I need a form with TextField (size='small'), Select (size='small'), and a Button (size='medium'). Use react-hook-form for validation. Never use raw <input>, <select>, or <textarea> elements.");
  } else if (uiType === 'dashboard') {
    parts.push("I need a dashboard layout with metric cards using the Card and Metric components. Follow the standard page shell: MastHead + AppSidebar + scrollable main.");
  } else if (uiType === 'detail-panel') {
    parts.push("I need a resizable detail panel (min 420px, max 800px) that opens from a row click. Use the Panel component and persist the user's preferred width to localStorage.");
  }

  if (tool === 'fusion') {
    parts.push("I'm using Builder.io Fusion. Show me changes step by step.");
  } else if (tool === 'cursor') {
    parts.push("I'm using Cursor. Reference the guidelines/ folder and design-system-docs/AGENTS.md for all component and token rules.");
  } else if (tool === 'vscode') {
    parts.push("I'm using VS Code. Generate clean, production-ready code with proper TypeScript types.");
  }

  if (experience === 'first-time') {
    parts.push("This is my first time working with this codebase — explain what each piece does before implementing it.");
  } else if (experience === 'advanced') {
    parts.push("I'm experienced with this codebase — generate complete, production-ready implementations without step-by-step explanations.");
  }

  parts.push("Always use semantic tokens (var(--ld-semantic-color-*)) — never hard-code hex values. All icons must come from '@/components/icons'.");

  return { component, importStatement, libraryRoute, prompt: parts.join(' ') };
}

/* ── Quiz config ── */

interface Option { value: string; label: string; description: string }
interface Question { id: keyof Answers; title: string; whyItMatters: string; options: Option[] }

const QUESTIONS: Question[] = [
  {
    id: 'task',
    title: 'What are you working on?',
    whyItMatters: 'This determines the starting point — a new page needs a different scaffold than a new component or a bug fix.',
    options: [
      { value: 'new-page', label: 'New page', description: 'Building a brand-new route with page header, layout, and content' },
      { value: 'new-component', label: 'New component', description: 'Creating a reusable component for the component library' },
      { value: 'adding-to-existing', label: 'Adding to an existing page', description: 'Extending a page that already exists in the project' },
      { value: 'debugging', label: 'Debugging', description: 'Tracking down and fixing a bug or visual issue' },
    ],
  },
  {
    id: 'uiType',
    title: 'What type of UI are you building?',
    whyItMatters: 'Each UI type maps to specific LD 3.5 components. This gets you the right import and the right component to start from.',
    options: [
      { value: 'data-table', label: 'Data table', description: 'Sortable, filterable table with rows of structured data' },
      { value: 'chart', label: 'Chart or graph', description: 'Line, bar, area, pie, or other data visualization' },
      { value: 'form', label: 'Form or input flow', description: 'Fields, selects, checkboxes, and submit action' },
      { value: 'dashboard', label: 'Dashboard or KPI tiles', description: 'Metric cards, summary stats, and overview layouts' },
      { value: 'detail-panel', label: 'Detail / drill-down panel', description: 'Slide-in panel showing detail for a selected row or item' },
      { value: 'other', label: 'Something else', description: 'Custom UI not covered above' },
    ],
  },
  {
    id: 'tool',
    title: 'Which tool are you using?',
    whyItMatters: "Different tools need slightly different prompt formats. Builder.io Fusion, Cursor, and VS Code each have distinct workflows.",
    options: [
      { value: 'fusion', label: 'Builder.io Fusion', description: "The cloud AI environment you're in right now" },
      { value: 'cursor', label: 'Cursor', description: 'AI-assisted coding in a local editor' },
      { value: 'vscode', label: 'VS Code', description: 'Standard local editor without AI integration' },
      { value: 'other', label: 'Other', description: 'Another editor or environment' },
    ],
  },
  {
    id: 'experience',
    title: 'Your experience with this codebase?',
    whyItMatters: 'Calibrates how much explanation to include — detailed walkthroughs for first-timers, direct output for experienced contributors.',
    options: [
      { value: 'first-time', label: 'First time', description: "Haven't worked in this project before" },
      { value: 'familiar', label: 'Familiar', description: "Know the basics, built a few things here" },
      { value: 'advanced', label: 'Advanced', description: 'Deeply familiar with the codebase and design system' },
    ],
  },
];

const TOTAL_STEPS = QUESTIONS.length;
const ICON_SM = { width: 16, height: 16 } as const;
const ICON_LG = { width: 24, height: 24 } as const;

/* ── Progress bar ── */

function QuizProgress({ current, total, onSkipAll }: { current: number; total: number; onSkipAll: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ld-semantic-color-text-subtle)', fontFamily: 'var(--ld-semantic-font-family-sans)' }}>
          Question {current} of {total}
        </span>
        <Button variant="tertiary" size="small" onClick={onSkipAll}>Skip quiz</Button>
      </div>
      <div style={{ height: '6px', backgroundColor: 'var(--ld-semantic-color-fill-subtle)', borderRadius: '9999px', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${((current - 1) / total) * 100}%`,
          backgroundColor: 'var(--ld-semantic-color-action-fill-primary)',
          borderRadius: '9999px',
          transition: 'width 300ms ease',
        }} />
      </div>
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            width: i === current - 1 ? '14px' : '8px',
            height: i === current - 1 ? '8px' : '6px',
            borderRadius: '9999px',
            backgroundColor: i < current - 1
              ? 'var(--ld-semantic-color-action-fill-primary)'
              : i === current - 1
                ? 'var(--ld-semantic-color-action-fill-primary)'
                : 'var(--ld-semantic-color-border-moderate)',
            opacity: i === current - 1 ? 1 : i < current - 1 ? 0.7 : 0.4,
            transition: 'all 200ms ease',
            flexShrink: 0,
          }} />
        ))}
      </div>
    </div>
  );
}

/* ── Result ── */

function QuizResult({ answers, onReset }: { answers: Answers; onReset: () => void }) {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedImport, setCopiedImport] = useState(false);
  const result = generateResult(answers);

  const handleCopyPrompt = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(result.prompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } catch { /* noop */ }
  }, [result.prompt]);

  const handleCopyImport = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(result.importStatement);
      setCopiedImport(true);
      setTimeout(() => setCopiedImport(false), 1500);
    } catch { /* noop */ }
  }, [result.importStatement]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Success header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '20px 24px',
        backgroundColor: 'var(--ld-semantic-color-fill-positive-subtle)',
        borderRadius: '10px',
        border: '1px solid var(--ld-semantic-color-border-positive)',
      }}>
        <CheckCircleFill {...ICON_LG} style={{ color: 'var(--ld-semantic-color-text-positive)', flexShrink: 0 }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: '17px', color: 'var(--ld-semantic-color-text)', marginBottom: '4px', fontFamily: 'var(--ld-semantic-font-family-sans)' }}>
            Your recommended starting point
          </div>
          <div style={{ fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)', fontFamily: 'var(--ld-semantic-font-family-sans)' }}>
            Component: <strong>{result.component}</strong>
          </div>
        </div>
      </div>

      {/* Import to copy */}
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-surface)',
        border: '1px solid var(--ld-semantic-color-border-moderate)',
        borderRadius: '10px',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
          borderBottom: '1px solid var(--ld-semantic-color-border-moderate)',
        }}>
          <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--ld-semantic-color-text)', fontFamily: 'var(--ld-semantic-font-family-sans)' }}>
            Import statement
          </span>
          <Button
            variant={copiedImport ? 'secondary' : 'primary'}
            size="small"
            onClick={handleCopyImport}
            leading={copiedImport ? <Check {...ICON_SM} /> : <Brackets {...ICON_SM} />}
          >
            {copiedImport ? 'Copied!' : 'Copy import'}
          </Button>
        </div>
        <pre style={{
          margin: 0,
          padding: '16px 20px',
          fontFamily: 'var(--ld-semantic-font-family-mono)',
          fontSize: '13px',
          lineHeight: 1.8,
          color: 'var(--ld-semantic-color-text)',
          backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
          whiteSpace: 'pre-wrap',
          overflowX: 'auto',
        }}>
          {result.importStatement}
        </pre>
      </div>

      {/* Library link */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 20px',
        backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
        borderRadius: '8px',
        border: '1px solid var(--ld-semantic-color-border-brand)',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ld-semantic-color-text)', marginBottom: '2px' }}>
            See {result.component} in the Component Library
          </div>
          <div style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)', fontFamily: 'var(--ld-semantic-font-family-mono)' }}>
            {result.libraryRoute}
          </div>
        </div>
        <Button
          variant="secondary"
          size="small"
          onClick={() => window.location.href = result.libraryRoute}
        >
          Open
        </Button>
      </div>

      {/* Prompt to paste */}
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-surface)',
        border: '1px solid var(--ld-semantic-color-border-moderate)',
        borderRadius: '10px',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
          borderBottom: '1px solid var(--ld-semantic-color-border-moderate)',
        }}>
          <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--ld-semantic-color-text)', fontFamily: 'var(--ld-semantic-font-family-sans)' }}>
            Ready-to-paste prompt
          </span>
          <Button
            variant={copiedPrompt ? 'secondary' : 'primary'}
            size="small"
            onClick={handleCopyPrompt}
            leading={copiedPrompt ? <Check {...ICON_SM} /> : undefined}
          >
            {copiedPrompt ? 'Copied!' : 'Copy prompt'}
          </Button>
        </div>
        <div style={{
          padding: '20px',
          fontSize: '14px',
          lineHeight: 1.7,
          color: 'var(--ld-semantic-color-text)',
          fontStyle: 'italic',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          whiteSpace: 'pre-wrap',
        }}>
          &ldquo;{result.prompt}&rdquo;
        </div>
      </div>

      {/* Reset */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="secondary" size="small" onClick={onReset} leading={<Refresh {...ICON_SM} />}>
          Start over
        </Button>
      </div>
    </div>
  );
}

/* ── Main component ── */

export function DeveloperOnboardingQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [pendingAnswer, setPendingAnswer] = useState<string | undefined>(undefined);

  const currentQuestion = step >= 1 && step <= TOTAL_STEPS ? QUESTIONS[step - 1] : null;
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const effectiveAnswer = pendingAnswer ?? currentAnswer;
  const isResult = step === TOTAL_STEPS + 1;

  const handleStart = () => { setStep(1); setPendingAnswer(undefined); };

  const handleSelect = (value: string) => { setPendingAnswer(value); };

  const handleNext = () => {
    if (!currentQuestion) return;
    const val = pendingAnswer ?? currentAnswer;
    if (val) setAnswers(prev => ({ ...prev, [currentQuestion.id]: val as never }));
    setPendingAnswer(undefined);
    setStep(s => s >= TOTAL_STEPS ? TOTAL_STEPS + 1 : s + 1);
  };

  const handleBack = () => { setPendingAnswer(undefined); setStep(s => Math.max(0, s - 1)); };
  const handleSkipQuestion = () => { setPendingAnswer(undefined); setStep(s => s >= TOTAL_STEPS ? TOTAL_STEPS + 1 : s + 1); };
  const handleSkipAll = () => { setPendingAnswer(undefined); setStep(TOTAL_STEPS + 1); };
  const handleReset = () => { setStep(0); setAnswers({}); setPendingAnswer(undefined); };

  const INTRO_FEATURES = [
    { icon: <Flash width={20} height={20} style={{ color: 'var(--ld-semantic-color-text-brand-bold)' }} />, title: '4 quick questions', desc: 'Takes about 30 seconds' },
    { icon: <Brackets width={20} height={20} style={{ color: 'var(--ld-semantic-color-text-brand-bold)' }} />, title: 'Exact import statement', desc: 'Copy and paste in one click' },
    { icon: <BulletList width={20} height={20} style={{ color: 'var(--ld-semantic-color-text-brand-bold)' }} />, title: 'Ready-to-paste prompt', desc: 'Tailored to your task and tool' },
  ] as const;

  return (
    <div style={{
      backgroundColor: 'var(--ld-semantic-color-surface)',
      padding: '32px',
      borderRadius: '12px',
      boxShadow: 'var(--ld-semantic-elevation-100)',
    }}>
      <div style={{ marginBottom: '28px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ld-semantic-color-text)', margin: '0 0 8px 0', fontFamily: 'var(--ld-semantic-font-family-sans)' }}>
          {isResult ? 'Your starting point' : 'Find the right component fast'}
        </h3>
        {!isResult && step === 0 && (
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: 0, fontFamily: 'var(--ld-semantic-font-family-sans)' }}>
            Answer {TOTAL_STEPS} questions to get the exact import statement, a component library link, and a ready-to-paste prompt for your task.
          </p>
        )}
      </div>

      {/* Intro */}
      {step === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            {INTRO_FEATURES.map(item => (
              <div key={item.title} style={{
                padding: '16px 20px',
                backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                borderRadius: '10px',
                border: '1px solid var(--ld-semantic-color-border-moderate)',
              }}>
                <div style={{ marginBottom: '10px' }}>{item.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--ld-semantic-color-text)', marginBottom: '4px', fontFamily: 'var(--ld-semantic-font-family-sans)' }}>{item.title}</div>
                <div style={{ fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)', fontFamily: 'var(--ld-semantic-font-family-sans)' }}>{item.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Button variant="primary" size="medium" onClick={handleStart}>Start the quiz</Button>
            <Button variant="tertiary" size="medium" onClick={handleSkipAll}>Skip — show generic result</Button>
          </div>
        </div>
      )}

      {/* Questions */}
      {currentQuestion && step >= 1 && step <= TOTAL_STEPS && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <QuizProgress current={step} total={TOTAL_STEPS} onSkipAll={handleSkipAll} />
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ld-semantic-color-text)', margin: '0 0 10px 0', fontFamily: 'var(--ld-semantic-font-family-sans)' }}>
              {currentQuestion.title}
            </h4>
            <div style={{ marginBottom: '20px' }}>
              <Alert variant="info">
                <strong>Why this matters: </strong>{currentQuestion.whyItMatters}
              </Alert>
            </div>
            <RadioGroup value={effectiveAnswer as string | undefined} onValueChange={handleSelect} aria-label={currentQuestion.title}>
              {currentQuestion.options.map(option => (
                <Radio
                  key={option.value}
                  value={option.value}
                  label={
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--ld-semantic-color-text)', marginBottom: '2px', lineHeight: 1.3 }}>{option.label}</div>
                      <div style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)', lineHeight: 1.5 }}>{option.description}</div>
                    </div>
                  }
                />
              ))}
            </RadioGroup>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
            <Button variant="secondary" size="small" onClick={handleBack} disabled={step === 1}>Back</Button>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Button variant="tertiary" size="small" onClick={handleSkipQuestion}>Skip</Button>
              <Button variant="primary" size="small" onClick={handleNext} disabled={!effectiveAnswer && !currentAnswer}>
                {step === TOTAL_STEPS ? 'Get results' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Result */}
      {isResult && <QuizResult answers={answers} onReset={handleReset} />}
    </div>
  );
}
