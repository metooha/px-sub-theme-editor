import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { RadioGroup, Radio } from '@/components/ui/RadioGroup';
import { Flash } from '@/components/icons/Flash';
import { BulletList } from '@/components/icons/BulletList';
import { Map } from '@/components/icons/Map';
import { CheckCircleFill } from '@/components/icons/CheckCircleFill';
import { Check } from '@/components/icons/Check';
import { Refresh } from '@/components/icons/Refresh';

/* ── Types ── */

type FeatureType = 'new-page' | 'figma-code' | 'explore' | 'customize' | 'other';
type StartingPoint = 'new' | 'existing' | 'figma' | 'other';
type Goal = 'build' | 'setup' | 'explore' | 'figma-to-code' | 'other';
type Environment = 'fusion' | 'cursor' | 'figma-make' | 'developer';
type Experience = 'new' | 'familiar' | 'advanced' | 'other';

interface Answers {
  featureType?: FeatureType;
  startingPoint?: StartingPoint;
  goal?: Goal;
  environment?: Environment;
  experience?: Experience;
}

type ReadingPathItem = { title: string; path: string; reason: string };

/* ── Reading path generator ── */

function generateReadingPath(answers: Answers): ReadingPathItem[] {
  const path: ReadingPathItem[] = [];

  if (answers.experience !== 'advanced') {
    path.push({
      title: 'Themes & Tokens',
      path: '/component-library/themes',
      reason: 'Understand how brand colors, spacing, and typography work before building anything.',
    });
  }

  // Feature-type-based paths
  if (answers.featureType === 'figma-code') {
    path.push({
      title: 'Icons',
      path: '/component-library/icons',
      reason: 'Find the right icon to replace Figma vectors with design system equivalents.',
    });
    path.push({
      title: 'Buttons',
      path: '/component-library/buttons',
      reason: 'The most-used component — understand variants before converting Figma designs.',
    });
  }

  if (answers.featureType === 'new-page') {
    path.push({
      title: 'Cards',
      path: '/component-library/cards',
      reason: 'Cards are the primary layout container for content blocks.',
    });
    path.push({
      title: 'Buttons',
      path: '/component-library/buttons',
      reason: 'The most-used component — understand variants before building pages.',
    });
  }

  if (answers.featureType === 'explore') {
    path.push({
      title: 'Component Library Overview',
      path: '/component-library',
      reason: 'See everything available in the library at a glance.',
    });
    path.push({
      title: 'Component Sandbox',
      path: '/component-library/component-tester',
      reason: 'Interactively test every component with live controls.',
    });
  }

  if (answers.featureType === 'customize') {
    path.push({
      title: 'Guidelines',
      path: '/component-library/guidelines',
      reason: 'Design rules and component documentation for extending the system correctly.',
    });
  }

  if (answers.featureType === 'other' || !answers.featureType) {
    path.push({
      title: 'Component Library Overview',
      path: '/component-library',
      reason: 'Start here to get a sense of everything available.',
    });
    path.push({
      title: 'Getting Started',
      path: '/component-library/getting-started',
      reason: 'Covers how Builder.io Fusion and the AI agent work together.',
    });
  }

  // Goal-based additions
  if (answers.goal === 'build' || answers.goal === 'figma-to-code') {
    path.push({
      title: 'DataTable',
      path: '/component-library/table',
      reason: 'Essential for any page with lists, catalogs, or reports.',
    });
  }

  if (answers.goal === 'explore') {
    path.push({
      title: 'Component Sandbox',
      path: '/component-library/component-tester',
      reason: 'Interactively test every component with live controls.',
    });
  }

  if (answers.environment === 'fusion') {
    path.push({
      title: 'Getting Started — Overview',
      path: '/component-library/getting-started',
      reason: 'Covers how Builder.io Fusion and the AI agent work together.',
    });
  }

  if (answers.experience === 'new') {
    path.push({
      title: 'Guidelines',
      path: '/component-library/guidelines',
      reason: 'Design rules and best practices — important reading for new users.',
    });
  }

  if (answers.experience === 'advanced') {
    path.push({
      title: 'Component Sandbox',
      path: '/component-library/component-tester',
      reason: 'Jump straight to testing components interactively.',
    });
  }

  // Deduplicate
  const seen = new Set<string>();
  return path.filter((item) => {
    if (seen.has(item.path)) return false;
    seen.add(item.path);
    return true;
  });
}

/* ── Prompt generator ── */

function generatePrompt(answers: Answers): string {
  const parts: string[] = [];

  if (answers.featureType === 'figma-code') {
    parts.push(
      "I have Figma designs I want to convert to code using the Living Design 3.5 components. Please help me map each Figma element to the correct LD 3.5 component, replace any hard-coded colors with semantic tokens, and add proper accessibility attributes — these are built into the components automatically."
    );
  } else if (answers.featureType === 'new-page') {
    parts.push(
      "I'm designing a new page and want to use LD 3.5 components from the Living Design 3.5 Portable Kit. Please use the standard page shell (MastHead + AppSidebar + main content), LD 3.5 semantic tokens for all colors and spacing, and pre-built components like Card, Button, DataTable, and TextField."
    );
  } else if (answers.featureType === 'explore') {
    parts.push(
      "I'm exploring what's available in the Living Design 3.5 component library. Please point me to the Component Sandbox and give me a quick tour of the most useful components — Buttons, Cards, DataTable, Forms, and Icons."
    );
  } else if (answers.featureType === 'customize') {
    parts.push(
      "I want to customize or extend existing LD 3.5 components for a specific design need. Please help me create a wrapper component that composes the original LD component without modifying the source file, using semantic tokens for all styling."
    );
  } else {
    parts.push(
      "Help me figure out the best way to get started with the Living Design 3.5 Portable Kit. Ask me a few questions about what I'm trying to accomplish — what kind of page or feature, who it's for, and what data it needs to show — and then suggest the best approach."
    );
  }

  if (answers.startingPoint === 'new') {
    parts.push(
      "This is a brand-new project. I'm already working inside Builder.io Fusion so the environment is set up. Please help me create the first page or feature without any initial project setup steps."
    );
  } else if (answers.startingPoint === 'existing') {
    parts.push(
      "I have an existing project I want to migrate to this design system. Please scan the current codebase for: any existing UI components (buttons, forms, cards) that should be replaced with kit equivalents, hard-coded colors that should be replaced with semantic tokens, and any icon packages that should be replaced with the kit's icon library."
    );
  } else if (answers.startingPoint === 'figma') {
    parts.push(
      "I have Figma designs ready to convert into code. Please: (1) Help me map each Figma component to the correct kit component. (2) Replace any hard-coded colors with semantic tokens. (3) Add proper accessibility attributes since these are built into the components."
    );
  } else if (answers.startingPoint === 'other') {
    parts.push(
      "Please help me get started — ask me what I want to build first before making any changes."
    );
  }

  if (answers.goal === 'build') {
    parts.push(
      "My primary goal is to build new pages. After setup, create a sample dashboard page with a PageHeader, a row of metric cards, and a DataTable — so I can see how the components work together."
    );
  } else if (answers.goal === 'setup') {
    parts.push(
      "My primary goal right now is just to get the project configured correctly — correct theme, working dev server, and clean component imports. I'll build pages after that."
    );
  } else if (answers.goal === 'explore') {
    parts.push(
      "My primary goal is to explore what's available in the component library before I decide what to build. Please point me to the Component Sandbox and the component list."
    );
  } else if (answers.goal === 'figma-to-code') {
    parts.push(
      "My primary goal is to convert my Figma designs into production-ready code using the design system components. Prioritize accurate mapping of Figma layers to kit components."
    );
  } else if (answers.goal === 'other') {
    parts.push(
      "My goal isn't covered by the standard options — please ask me what I'm trying to accomplish and help me figure out the best next step."
    );
  }

  if (answers.environment === 'fusion') {
    parts.push(
      "I'm using Builder.io Fusion as my environment. Walk me through each step and explain what you're doing as you go."
    );
  } else if (answers.environment === 'cursor') {
    parts.push(
      "I'm using Cursor as my AI code editor. Reference the guidelines/ folder and design-system-docs/AGENTS.md file in the project for component rules."
    );
  } else if (answers.environment === 'figma-make') {
    parts.push(
      "I'm using Figma Make to generate code from designs. Map Figma component names to the kit equivalents and replace any generated inline styles with semantic tokens."
    );
  } else if (answers.environment === 'developer') {
    parts.push(
      "I'm working with a developer. Generate clean, production-ready code that they can review and integrate — include component imports, proper TypeScript types, and no inline styles (use CSS modules or semantic tokens)."
    );
  }

  if (answers.experience === 'new') {
    parts.push(
      "I'm new to vibe coding and design systems. Please explain each step in plain language, tell me what each component does before using it, and check in with me after each major change before moving on."
    );
  } else if (answers.experience === 'familiar') {
    parts.push(
      "I have some experience with design tools and AI-assisted development. You can move at a normal pace — just let me know when you're about to make a significant change."
    );
  } else if (answers.experience === 'advanced') {
    parts.push(
      "I'm experienced with vibe coding and design systems. Move efficiently, skip basic explanations, and generate complete implementations rather than step-by-step guidance."
    );
  } else if (answers.experience === 'other') {
    parts.push(
      "Just exploring for now — no particular goal yet. Show me what's possible with the design system and suggest a good starting point."
    );
  }

  return parts.join(' ');
}

/* ── Quiz questions config ── */

interface Option {
  value: string;
  label: string;
  description: string;
}

interface Question {
  id: keyof Answers;
  title: string;
  whyItMatters: string;
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    id: 'featureType',
    title: 'What are you working on?',
    whyItMatters:
      'This shapes the recommended components, prompts, and reading path we generate for you.',
    options: [
      { value: 'new-page', label: 'Designing a new page or feature', description: 'Landing pages, dashboards, flows — starting from scratch or Figma' },
      { value: 'figma-code', label: 'Converting Figma designs to code', description: 'I have designs ready and want to turn them into working components' },
      { value: 'explore', label: 'Exploring the component library', description: 'Browsing what is available before committing to a direction' },
      { value: 'customize', label: 'Customizing or extending components', description: 'Adapting existing components for a specific design need' },
      { value: 'other', label: 'Something else', description: 'My situation is different — help me figure out where to start' },
    ],
  },
  {
    id: 'startingPoint',
    title: 'Where are you starting from?',
    whyItMatters:
      'New projects need initial setup. Existing projects need migration guidance. Figma-ready projects need component mapping. Each path is different.',
    options: [
      { value: 'new', label: 'Brand new project', description: 'Nothing exists yet — start from scratch' },
      { value: 'existing', label: 'Existing project', description: 'I have code I want to migrate to this design system' },
      { value: 'figma', label: 'Figma designs ready', description: 'I have finished Figma designs to convert to code' },
      { value: 'other', label: 'Other', description: 'My situation is different — describe it below' },
    ],
  },
  {
    id: 'goal',
    title: "What's your primary goal right now?",
    whyItMatters:
      'This focuses the AI on the right workflow — building, configuring, exploring, or converting — so the generated prompt is immediately actionable.',
    options: [
      { value: 'build', label: 'Build new UI', description: 'Create layouts, components, and features' },
      { value: 'setup', label: 'Set up the design system', description: 'Configure theme, tokens, and project structure first' },
      { value: 'explore', label: 'Explore components', description: "Browse what's available before deciding what to build" },
      { value: 'figma-to-code', label: 'Convert Figma to code', description: 'Turn my Figma designs into production-ready components' },
      { value: 'other', label: 'Other', description: "Something else — the AI will help me figure out next steps" },
    ],
  },
  {
    id: 'environment',
    title: 'Which tool are you working in?',
    whyItMatters:
      'Different tools need different prompt formats and instructions. Builder.io Fusion, Cursor, Figma Make, and working with a developer each have distinct workflows.',
    options: [
      { value: 'fusion', label: 'Builder.io Fusion', description: "The cloud environment you're in right now" },
      { value: 'cursor', label: 'Cursor (AI code editor)', description: 'AI-assisted coding in a local editor' },
      { value: 'figma-make', label: 'Figma Make', description: 'Generating code directly from Figma' },
      { value: 'developer', label: 'Working with a developer', description: 'Handing off to an engineer for implementation' },
    ],
  },
  {
    id: 'experience',
    title: 'How would you describe your experience level?',
    whyItMatters:
      'This calibrates how much guidance the AI includes — more explanation for new users, direct efficient output for advanced ones.',
    options: [
      { value: 'new', label: 'New to vibe coding', description: 'First time using AI to build a design system project' },
      { value: 'familiar', label: 'Familiar with design tools', description: 'Comfortable with Figma and design workflows, newer to code' },
      { value: 'advanced', label: 'Experienced / advanced', description: 'Comfortable with code, design systems, and AI-assisted development' },
      { value: 'other', label: 'Just exploring', description: 'No particular goal yet — show me what is possible' },
    ],
  },
];

const TOTAL_STEPS = QUESTIONS.length;

/* ── Icon sizes ── */

const ICON_SM = { width: 16, height: 16 } as const;
const ICON_LG = { width: 24, height: 24 } as const;

/* ── Sub-components ── */

function QuizProgress({
  current,
  total,
  onSkipAll,
}: {
  current: number;
  total: number;
  onSkipAll: () => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontSize: '13px',
          fontWeight: 600,
          color: 'var(--ld-semantic-color-text-subtle)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
        }}>
          Question {current} of {total}
        </span>
        <Button variant="tertiary" size="small" onClick={onSkipAll}>
          Skip quiz
        </Button>
      </div>
      {/* Progress bar */}
      <div style={{
        height: '6px',
        backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
        borderRadius: '9999px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${((current - 1) / total) * 100}%`,
          backgroundColor: 'var(--ld-semantic-color-action-fill-primary)',
          borderRadius: '9999px',
          transition: 'width 300ms ease',
        }} />
      </div>
      {/* Dot indicators */}
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
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
            }}
          />
        ))}
      </div>
    </div>
  );
}

function QuizOptionLabel({ option }: { option: Option }) {
  return (
    <div>
      <div style={{
        fontWeight: 700,
        fontSize: 'var(--ld-semantic-font-body-small-size, 14px)',
        color: 'var(--ld-semantic-color-text)',
        marginBottom: '2px',
        lineHeight: 1.3,
      }}>
        {option.label}
      </div>
      <div style={{
        fontSize: 'var(--ld-semantic-font-caption-size, 12px)',
        color: 'var(--ld-semantic-color-text-subtle)',
        lineHeight: 1.5,
        fontWeight: 400,
      }}>
        {option.description}
      </div>
    </div>
  );
}

function QuizResult({
  answers,
  onReset,
}: {
  answers: Answers;
  onReset: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const prompt = generatePrompt(answers);
  const readingPath = generateReadingPath(answers);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }, [prompt]);

  const summaryParts: string[] = [];
  const ftLabels: Record<string, string> = {
    'new-page': 'New page',
    'figma-code': 'Figma to Code',
    'explore': 'Exploring',
    'customize': 'Customizing',
    'other': 'Other',
  };
  const spLabels: Record<string, string> = { new: 'New project', existing: 'Existing project', figma: 'Figma ready', other: 'Other' };
  const envLabels: Record<string, string> = { fusion: 'Fusion', cursor: 'Cursor', 'figma-make': 'Figma Make', developer: 'With developer' };
  const expLabels: Record<string, string> = { new: 'New user', familiar: 'Familiar', advanced: 'Advanced', other: 'Just exploring' };

  if (answers.featureType) summaryParts.push(ftLabels[answers.featureType]);
  if (answers.startingPoint) summaryParts.push(spLabels[answers.startingPoint]);
  if (answers.environment) summaryParts.push(envLabels[answers.environment]);
  if (answers.experience) summaryParts.push(expLabels[answers.experience]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
        <CheckCircleFill
          {...ICON_LG}
          style={{ color: 'var(--ld-semantic-color-text-positive)', flexShrink: 0 }}
        />
        <div>
          <div style={{
            fontWeight: 700,
            fontSize: '17px',
            color: 'var(--ld-semantic-color-text)',
            marginBottom: '4px',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
          }}>
            Your personalized setup prompt is ready
          </div>
          {summaryParts.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {summaryParts.map((tag) => (
                <span key={tag} style={{
                  display: 'inline-flex',
                  padding: '2px 10px',
                  backgroundColor: 'var(--ld-semantic-color-surface)',
                  border: '1px solid var(--ld-semantic-color-border-moderate)',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--ld-semantic-color-text-subtle)',
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Generated prompt */}
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
          <span style={{
            fontWeight: 700,
            fontSize: '14px',
            color: 'var(--ld-semantic-color-text)',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
          }}>
            Copy this prompt into your AI agent
          </span>
          <Button
            variant={copied ? 'secondary' : 'primary'}
            size="small"
            onClick={handleCopy}
            leading={copied ? <Check {...ICON_SM} /> : undefined}
          >
            {copied ? 'Copied!' : 'Copy prompt'}
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
          &ldquo;{prompt}&rdquo;
        </div>
      </div>

      {/* Reading path — items are clickable links */}
      {readingPath.length > 0 && (
        <div style={{
          backgroundColor: 'var(--ld-semantic-color-surface)',
          border: '1px solid var(--ld-semantic-color-border-moderate)',
          borderRadius: '10px',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '14px 20px',
            backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
            borderBottom: '1px solid var(--ld-semantic-color-border-brand)',
          }}>
            <div style={{
              fontWeight: 700,
              fontSize: '14px',
              color: 'var(--ld-semantic-color-text)',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
            }}>
              Your recommended reading path
            </div>
            <div style={{
              fontSize: '13px',
              color: 'var(--ld-semantic-color-text-subtle)',
              marginTop: '2px',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
            }}>
              Pages to explore in the component library, in order
            </div>
          </div>
          <div style={{ padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {readingPath.map((item, i) => (
              <div key={item.path} style={{
                display: 'flex',
                gap: '14px',
                padding: '12px 16px',
                backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                borderRadius: '8px',
                alignItems: 'flex-start',
              }}>
                <span style={{
                  minWidth: '24px',
                  height: '24px',
                  backgroundColor: 'var(--ld-semantic-color-action-fill-primary)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '11px',
                  color: 'var(--ld-semantic-color-surface)',
                  flexShrink: 0,
                  marginTop: '1px',
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                }}>
                  {i + 1}
                </span>
                <div>
                  <div style={{ marginBottom: '3px' }}>
                    <a
                      href={item.path}
                      style={{
                        fontWeight: 700,
                        fontSize: '14px',
                        color: 'var(--ld-semantic-color-link)',
                        fontFamily: 'var(--ld-semantic-font-family-sans)',
                        textDecoration: 'none',
                      }}
                    >
                      {item.title}
                    </a>
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: 'var(--ld-semantic-color-text-subtle)',
                    lineHeight: 1.5,
                    fontFamily: 'var(--ld-semantic-font-family-sans)',
                  }}>
                    {item.reason}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reset */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="secondary"
          size="small"
          onClick={onReset}
          leading={<Refresh {...ICON_SM} />}
        >
          Start over
        </Button>
      </div>
    </div>
  );
}

/* ── Intro feature cards ── */

const INTRO_FEATURES = [
  {
    icon: <Flash width={20} height={20} style={{ color: 'var(--ld-semantic-color-text-brand-bold)' }} />,
    title: '5 quick questions',
    desc: 'Takes about 60 seconds',
  },
  {
    icon: <BulletList width={20} height={20} style={{ color: 'var(--ld-semantic-color-text-brand-bold)' }} />,
    title: 'Ready-to-paste prompt',
    desc: 'Copy directly into any AI agent',
  },
  {
    icon: <Map width={20} height={20} style={{ color: 'var(--ld-semantic-color-text-brand-bold)' }} />,
    title: 'Reading path',
    desc: 'Know exactly which pages to visit first',
  },
] as const;

/* ── Main component ── */

export function DesignerOnboardingQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [pendingAnswer, setPendingAnswer] = useState<string | undefined>(undefined);

  const currentQuestion = step >= 1 && step <= TOTAL_STEPS ? QUESTIONS[step - 1] : null;
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;

  const handleStart = () => {
    setStep(1);
    setPendingAnswer(undefined);
  };

  const handleSelect = (value: string) => {
    setPendingAnswer(value);
  };

  const handleNext = () => {
    if (!currentQuestion) return;
    const val = pendingAnswer ?? currentAnswer;
    if (val) {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: val as never }));
    }
    setPendingAnswer(undefined);
    if (step >= TOTAL_STEPS) {
      setStep(TOTAL_STEPS + 1);
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    setPendingAnswer(undefined);
    setStep((s) => Math.max(0, s - 1));
  };

  const handleSkipQuestion = () => {
    setPendingAnswer(undefined);
    if (step >= TOTAL_STEPS) {
      setStep(TOTAL_STEPS + 1);
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleSkipAll = () => {
    setPendingAnswer(undefined);
    setStep(TOTAL_STEPS + 1);
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setPendingAnswer(undefined);
  };

  const effectiveAnswer = pendingAnswer ?? currentAnswer;
  const isResult = step === TOTAL_STEPS + 1;

  return (
    <div style={{
      backgroundColor: 'var(--ld-semantic-color-surface)',
      padding: '32px',
      borderRadius: '12px',
      boxShadow: 'var(--ld-semantic-elevation-100)',
    }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ marginBottom: '8px' }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 700,
            color: 'var(--ld-semantic-color-text)',
            margin: 0,
            fontFamily: 'var(--ld-semantic-font-family-sans)',
          }}>
            {isResult ? 'Your personalized setup' : 'Get a personalized starting prompt'}
          </h3>
        </div>
        {!isResult && step === 0 && (
          <p style={{
            fontSize: '14px',
            lineHeight: 1.6,
            color: 'var(--ld-semantic-color-text-subtle)',
            margin: 0,
            fontFamily: 'var(--ld-semantic-font-family-sans)',
          }}>
            Answer {TOTAL_STEPS} quick questions and we&apos;ll generate a ready-to-paste AI prompt tailored
            to your project — plus a personalized reading path through the component library. Advanced users can skip at any time.
          </p>
        )}
      </div>

      {/* Intro screen */}
      {step === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
          }}>
            {INTRO_FEATURES.map((item) => (
              <div key={item.title} style={{
                padding: '16px 20px',
                backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                borderRadius: '10px',
                border: '1px solid var(--ld-semantic-color-border-moderate)',
              }}>
                <div style={{ marginBottom: '10px' }}>{item.icon}</div>
                <div style={{
                  fontWeight: 700,
                  fontSize: '14px',
                  color: 'var(--ld-semantic-color-text)',
                  marginBottom: '4px',
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                }}>
                  {item.title}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: 'var(--ld-semantic-color-text-subtle)',
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Button variant="primary" size="medium" onClick={handleStart}>
              Start the quiz
            </Button>
            <Button variant="tertiary" size="medium" onClick={handleSkipAll}>
              Skip — generate a generic prompt
            </Button>
          </div>
        </div>
      )}

      {/* Question screens */}
      {currentQuestion && step >= 1 && step <= TOTAL_STEPS && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <QuizProgress current={step} total={TOTAL_STEPS} onSkipAll={handleSkipAll} />

          <div>
            <h4 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--ld-semantic-color-text)',
              margin: '0 0 10px 0',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
            }}>
              {currentQuestion.title}
            </h4>

            {/* Why it matters */}
            <div style={{ marginBottom: '20px' }}>
              <Alert variant="info">
                <strong>Why this matters: </strong>{currentQuestion.whyItMatters}
              </Alert>
            </div>

            {/* Options */}
            <RadioGroup
              value={effectiveAnswer as string | undefined}
              onValueChange={handleSelect}
              aria-label={currentQuestion.title}
            >
              {currentQuestion.options.map((option) => (
                <Radio
                  key={option.value}
                  value={option.value}
                  label={<QuizOptionLabel option={option} />}
                />
              ))}
            </RadioGroup>
          </div>

          {/* Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '8px',
          }}>
            <Button
              variant="secondary"
              size="small"
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </Button>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Button variant="tertiary" size="small" onClick={handleSkipQuestion}>
                Skip this question
              </Button>
              <Button
                variant="primary"
                size="small"
                onClick={handleNext}
                disabled={!effectiveAnswer && !currentAnswer}
              >
                {step === TOTAL_STEPS ? 'Generate prompt' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Result screen */}
      {isResult && (
        <QuizResult answers={answers} onReset={handleReset} />
      )}
    </div>
  );
}
