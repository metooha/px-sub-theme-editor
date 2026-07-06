import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { RadioGroup, Radio } from '@/components/ui/RadioGroup';
import { TextField } from '@/components/ui/TextField';
import { Flash } from '@/components/icons/Flash';
import { BulletList } from '@/components/icons/BulletList';
import { Map } from '@/components/icons/Map';
import { CheckCircleFill } from '@/components/icons/CheckCircleFill';
import { Check } from '@/components/icons/Check';
import { Refresh } from '@/components/icons/Refresh';

/* ── Types ── */

type FeatureType = 'dashboard' | 'table' | 'chart' | 'metrics' | 'recommendations' | 'filters' | 'detail' | 'form';
type DataVolume = 'small' | 'medium' | 'large' | 'unknown';
type HasPRD = 'yes' | 'no' | 'rough';
type DesignRef = 'figma' | 'screenshot' | 'none';
type Experience = 'new' | 'familiar' | 'advanced';

interface Answers {
  featureType?: FeatureType;
  dataVolume?: DataVolume;
  hasPRD?: HasPRD;
  designRef?: DesignRef;
  experience?: Experience;
  otherText?: Record<string, string>;
}

type ReadingPathItem = { title: string; path: string; reason: string };

/* ── Reading path generator ── */

function generateReadingPath(answers: Answers): ReadingPathItem[] {
  const path: ReadingPathItem[] = [];

  if (answers.experience !== 'advanced') {
    path.push({
      title: 'Themes & Tokens',
      path: '/component-library/themes-tokens',
      reason: 'Understand how brand colors and design tokens work before reviewing builds.',
    });
  }

  if (answers.featureType === 'dashboard') {
    path.push({
      title: 'Card',
      path: '/component-library/card',
      reason: 'Dashboards use metric cards extensively — see what layouts are available.',
    });
    path.push({
      title: 'DataTable',
      path: '/component-library/data-table',
      reason: 'Most dashboards include a data table below the summary metrics.',
    });
  }

  if (answers.featureType === 'table') {
    path.push({
      title: 'DataTable',
      path: '/component-library/data-table',
      reason: 'The DataTable component handles sorting, filtering, pagination, and column resizing.',
    });
  }

  if (answers.featureType === 'chart') {
    path.push({
      title: 'Overview',
      path: '/component-library',
      reason: 'Browse available chart patterns and visualization components.',
    });
  }

  if (answers.featureType === 'metrics') {
    path.push({
      title: 'Card',
      path: '/component-library/card',
      reason: 'KPI tiles are built with the Card component and semantic tokens.',
    });
  }

  if (answers.featureType === 'recommendations') {
    path.push({
      title: 'Card',
      path: '/component-library/card',
      reason: 'Recommendation cards use Card with action buttons and metadata.',
    });
    path.push({
      title: 'Button',
      path: '/component-library/button',
      reason: 'Apply/Dismiss actions use Button variants — understand what is available.',
    });
  }

  if (answers.featureType === 'filters') {
    path.push({
      title: 'Select',
      path: '/component-library/select',
      reason: 'Filter controls are built with Select, DatePicker, and Chip components.',
    });
  }

  if (answers.featureType === 'detail') {
    path.push({
      title: 'DataTable',
      path: '/component-library/data-table',
      reason: 'Detail views often expand from table rows — see the drill-down patterns.',
    });
  }

  if (answers.featureType === 'form') {
    path.push({
      title: 'Button',
      path: '/component-library/button',
      reason: 'Forms need submit/cancel actions — understand button hierarchy.',
    });
  }

  if (answers.hasPRD === 'no' || answers.hasPRD === 'rough') {
    path.push({
      title: 'Guidelines',
      path: '/component-library/guidelines',
      reason: 'Review design rules before writing requirements — helps create better PRDs.',
    });
  }

  if (answers.experience === 'new') {
    path.push({
      title: 'Component Sandbox',
      path: '/component-library/sandbox',
      reason: 'Explore components interactively to understand what is available.',
    });
  }

  if (answers.experience === 'advanced') {
    path.push({
      title: 'Component Sandbox',
      path: '/component-library/sandbox',
      reason: 'Jump straight to testing components and reviewing variants.',
    });
  }

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

  parts.push(
    "I'm a Product Manager working on a data-rich feature using the Living Design 3.5 design system."
  );

  if (answers.featureType === 'dashboard') {
    parts.push(
      'I want to build a performance dashboard with KPI metric cards at the top, a primary chart in the middle, and a sortable data table below. Use the standard dashboard layout pattern.'
    );
  } else if (answers.featureType === 'table') {
    parts.push(
      'I want to build a data table / report view with sortable columns, filtering controls, row selection, pagination, and export capability. Use the DataTable component with all required features (sorting, resizing, wrap toggle).'
    );
  } else if (answers.featureType === 'chart') {
    parts.push(
      'I want to build a chart / data visualization. Use the Recharts library with LD semantic chart color tokens. Include time controls and a legend.'
    );
  } else if (answers.featureType === 'metrics') {
    parts.push(
      'I want to build a set of KPI metric cards showing key numbers with labels and trend indicators (up/down arrows with green/red coloring). Use a responsive card grid layout.'
    );
  } else if (answers.featureType === 'recommendations') {
    parts.push(
      'I want to build a recommendation / action list with cards that suggest optimizations. Each card should have a title, description, key metrics, and Apply/Dismiss action buttons. Support a horizontal carousel layout.'
    );
  } else if (answers.featureType === 'filters') {
    parts.push(
      'I want to build filter and segmentation controls — dropdowns, date pickers, and toggles that slice data. Use Select, DatePicker, and FilterChip components from the design system.'
    );
  } else if (answers.featureType === 'detail') {
    parts.push(
      'I want to build a detail / drill-down view that opens as a resizable side panel when clicking a table row or card. Include summary metrics, detail rows, and action buttons.'
    );
  } else if (answers.featureType === 'form') {
    parts.push(
      'I want to build a form / data entry UI for creating or editing data entities. Use TextField, Select, TextArea, and other LD form components with proper validation and error states.'
    );
  } else if (answers.featureType === 'other' as FeatureType) {
    const customFeature = answers.otherText?.featureType;
    parts.push(
      customFeature
        ? `I want to build a custom feature: ${customFeature}. Please help me determine the best components and patterns to use.`
        : 'Please help me figure out what type of data feature to build. Ask me about my data, users, and goals.'
    );
  } else {
    parts.push(
      'Please help me figure out what type of data feature to build. Ask me about my data, users, and goals.'
    );
  }

  if (answers.dataVolume === 'small') {
    parts.push(
      'The data volume is small (under 50 items). No pagination needed — show all data at once with sorting.'
    );
  } else if (answers.dataVolume === 'medium') {
    parts.push(
      'The data volume is moderate (50-500 items). Include pagination (20-50 items per page) with sorting and basic filtering.'
    );
  } else if (answers.dataVolume === 'large') {
    parts.push(
      'The data volume is large (500+ items). Include pagination, server-side-style sorting, search/filter controls, and loading states for performance.'
    );
  } else if (answers.dataVolume === 'unknown') {
    parts.push(
      'I am not sure about the data volume yet. Please design for flexibility — include pagination and filtering that can handle varying amounts of data.'
    );
  } else if (answers.dataVolume === 'other' as DataVolume) {
    const customVolume = answers.otherText?.dataVolume;
    if (customVolume) {
      parts.push(`Regarding data volume: ${customVolume}`);
    }
  }

  if (answers.hasPRD === 'yes') {
    parts.push(
      'I have a PRD ready. I will paste it next — please analyze it, map requirements to LD components, and generate an implementation plan before writing any code.'
    );
  } else if (answers.hasPRD === 'rough') {
    parts.push(
      'I have rough notes about what I want. Help me structure them into a proper PRD using the project PRD template, then implement based on the finalized requirements.'
    );
  } else if (answers.hasPRD === 'no') {
    parts.push(
      'I do not have a PRD yet. Walk me through the PRD template section by section, asking questions to fill in each part. After we complete the PRD, implement the feature.'
    );
  } else if (answers.hasPRD === 'other' as HasPRD) {
    const customPRD = answers.otherText?.hasPRD;
    if (customPRD) {
      parts.push(`Regarding requirements: ${customPRD}`);
    }
  }

  if (answers.designRef === 'figma') {
    parts.push(
      'I have a Figma design. I will share the link — please extract the design and map all elements to LD 3.5 components and semantic tokens.'
    );
  } else if (answers.designRef === 'screenshot') {
    parts.push(
      'I have a screenshot of the design I want. I will upload it — please interpret the visual and map it to LD components.'
    );
  } else if (answers.designRef === 'none') {
    parts.push(
      'I do not have a design reference. Use standard LD 3.5 patterns and best practices for the layout. Ask me clarifying questions about the layout if needed.'
    );
  } else if (answers.designRef === 'other' as DesignRef) {
    const customDesign = answers.otherText?.designRef;
    if (customDesign) {
      parts.push(`Regarding design reference: ${customDesign}`);
    }
  }

  if (answers.experience === 'new') {
    parts.push(
      'I am new to working with AI agents for development. Please explain each step in plain language, show me what each component does, and check in with me after each major change before moving on.'
    );
  } else if (answers.experience === 'familiar') {
    parts.push(
      'I have some experience with design tools and data products. Move at a normal pace — just let me know when you are about to make a significant decision.'
    );
  } else if (answers.experience === 'advanced') {
    parts.push(
      'I am experienced with data products and design systems. Move efficiently, skip basic explanations, and generate complete implementations.'
    );
  } else if (answers.experience === 'other' as Experience) {
    const customExp = answers.otherText?.experience;
    if (customExp) {
      parts.push(`Regarding my experience: ${customExp}`);
    }
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
    title: 'What type of data feature are you building?',
    whyItMatters:
      'This determines which components, layout patterns, and data handling strategies the agent will use. Each feature type maps to a specific set of LD 3.5 components.',
    options: [
      { value: 'dashboard', label: 'Performance dashboard', description: 'KPIs, trends, and summary metrics — e.g., campaign overview, ad spend tracker' },
      { value: 'table', label: 'Data table / report', description: 'Tabular data with sorting, filtering, and export — e.g., keyword performance, item sales grid' },
      { value: 'chart', label: 'Chart / data visualization', description: 'Trends, comparisons, or distributions — e.g., impressions over time, spend by channel' },
      { value: 'metrics', label: 'Metric cards / KPI tiles', description: 'Highlighted numbers with labels and trend indicators — e.g., total spend, ROAS summary' },
    ],
  },
  {
    id: 'featureType',
    title: 'What type of data feature are you building? (continued)',
    whyItMatters:
      'More feature types — if your feature was not listed on the previous screen, select one below.',
    options: [
      { value: 'recommendations', label: 'Recommendation / action list', description: 'Cards suggesting actions — e.g., budget optimization, keyword suggestions' },
      { value: 'filters', label: 'Filter & segmentation controls', description: 'Dropdowns, date pickers, toggles that slice data — e.g., date range, campaign type filter' },
      { value: 'detail', label: 'Detail / drill-down view', description: 'Expanded view from a row or card — e.g., campaign detail panel, item breakdown' },
      { value: 'form', label: 'Form / data entry', description: 'Inputs for creating or editing entities — e.g., campaign builder, budget editor' },
    ],
  },
  {
    id: 'dataVolume',
    title: 'How much data will this feature display?',
    whyItMatters:
      'Data volume determines whether the agent adds pagination, virtual scrolling, search controls, and loading states. Small datasets can show everything at once; large ones need progressive loading.',
    options: [
      { value: 'small', label: 'Small (under 50 items)', description: 'A handful of campaigns, 5-10 KPIs, a short list' },
      { value: 'medium', label: 'Medium (50-500 items)', description: 'A full campaign list, keyword report, item catalog page' },
      { value: 'large', label: 'Large (500+ items)', description: 'Full keyword tables, item-level data, large exports' },
      { value: 'unknown', label: 'Not sure yet', description: 'Design for flexibility — the agent will add scalable patterns' },
    ],
  },
  {
    id: 'hasPRD',
    title: 'Do you have a PRD or requirements document?',
    whyItMatters:
      'A PRD gives the agent precise requirements to map to components. Without one, the agent will walk you through creating one section by section before building.',
    options: [
      { value: 'yes', label: 'Yes, I have a PRD', description: 'Paste or drop your PRD and the agent will analyze and implement it' },
      { value: 'rough', label: 'I have rough notes', description: 'Share what you have — the agent structures it into a proper PRD' },
      { value: 'no', label: 'No, help me write one', description: 'The agent walks you through the PRD template step by step' },
    ],
  },
  {
    id: 'designRef',
    title: 'Do you have a design reference?',
    whyItMatters:
      'A Figma design or screenshot helps the agent match the exact layout you want. Without one, the agent uses standard LD 3.5 patterns and asks clarifying questions.',
    options: [
      { value: 'figma', label: 'Yes, Figma link', description: 'Paste the Figma URL — the agent extracts and maps to LD components' },
      { value: 'screenshot', label: 'Yes, screenshot', description: 'Upload an image — the agent interprets the visual and maps to components' },
      { value: 'none', label: 'No, use defaults', description: 'The agent uses standard LD 3.5 patterns and best practices' },
    ],
  },
  {
    id: 'experience',
    title: 'How would you describe your experience level?',
    whyItMatters:
      'This calibrates how much guidance the AI includes — more explanation for new users, efficient direct output for advanced ones.',
    options: [
      { value: 'new', label: 'New to AI-assisted development', description: 'First time using an AI agent to build features' },
      { value: 'familiar', label: 'Familiar with data products', description: 'Comfortable with dashboards and data tools, newer to AI agents' },
      { value: 'advanced', label: 'Experienced / advanced', description: 'Comfortable with data products, design systems, and AI tools' },
    ],
  },
];

/* 
 * The first two questions both target featureType — we merge them into one step
 * by combining the options when rendering. This gives the user all 8 feature types
 * in a single question without overwhelming a single option list.
 * Actually, let's just combine them into one question with all 8 options.
 */
const MERGED_QUESTIONS: Question[] = [
  {
    id: 'featureType',
    title: 'What type of data feature are you building?',
    whyItMatters:
      'This determines which components, layout patterns, and data handling strategies the agent will use. Each feature type maps to a specific set of LD 3.5 components.',
    options: [
      { value: 'dashboard', label: 'Performance dashboard', description: 'KPIs, trends, and summary metrics — e.g., campaign overview, ad spend tracker' },
      { value: 'table', label: 'Data table / report', description: 'Tabular data with sorting, filtering, and export — e.g., keyword performance grid' },
      { value: 'chart', label: 'Chart / data visualization', description: 'Trends, comparisons, or distributions — e.g., impressions over time' },
      { value: 'metrics', label: 'Metric cards / KPI tiles', description: 'Highlighted numbers with trend indicators — e.g., total spend, ROAS' },
      { value: 'recommendations', label: 'Recommendation / action list', description: 'Cards suggesting actions — e.g., budget optimization, bid adjustments' },
      { value: 'filters', label: 'Filter & segmentation controls', description: 'Dropdowns, date pickers, toggles — e.g., date range, campaign type' },
      { value: 'detail', label: 'Detail / drill-down view', description: 'Expanded view from a row or card — e.g., campaign detail panel' },
      { value: 'form', label: 'Form / data entry', description: 'Inputs for creating or editing — e.g., campaign builder, budget editor' },
      { value: 'other', label: 'Other', description: 'Describe your feature type in your own words' },
    ],
  },
  {
    id: 'dataVolume',
    title: 'How much data will this feature display?',
    whyItMatters:
      'Data volume determines whether the agent adds pagination, virtual scrolling, search controls, and loading states.',
    options: [
      { value: 'small', label: 'Small (under 50 items)', description: 'A handful of campaigns, 5-10 KPIs, a short list' },
      { value: 'medium', label: 'Medium (50-500 items)', description: 'A full campaign list, keyword report, item catalog page' },
      { value: 'large', label: 'Large (500+ items)', description: 'Full keyword tables, item-level data, large exports' },
      { value: 'unknown', label: 'Not sure yet', description: 'Design for flexibility — the agent will add scalable patterns' },
      { value: 'other', label: 'Other', description: 'Describe your data volume or structure in your own words' },
    ],
  },
  {
    id: 'hasPRD',
    title: 'Do you have a PRD or requirements document?',
    whyItMatters:
      'A PRD gives the agent precise requirements to map to components. Without one, the agent walks you through creating one before building.',
    options: [
      { value: 'yes', label: 'Yes, I have a PRD', description: 'Paste or drop your PRD and the agent will analyze and implement it' },
      { value: 'rough', label: 'I have rough notes', description: 'Share what you have — the agent structures it into a proper PRD' },
      { value: 'no', label: 'No, help me write one', description: 'The agent walks you through the PRD template step by step' },
      { value: 'other', label: 'Other', description: 'Describe your requirements situation in your own words' },
    ],
  },
  {
    id: 'designRef',
    title: 'Do you have a design reference?',
    whyItMatters:
      'A Figma design or screenshot helps the agent match the exact layout. Without one, the agent uses standard LD 3.5 patterns.',
    options: [
      { value: 'figma', label: 'Yes, Figma link', description: 'Paste the Figma URL — the agent extracts and maps to LD components' },
      { value: 'screenshot', label: 'Yes, screenshot', description: 'Upload an image — the agent interprets the visual' },
      { value: 'none', label: 'No, use defaults', description: 'The agent uses standard LD 3.5 patterns and best practices' },
      { value: 'other', label: 'Other', description: 'Describe your design reference situation in your own words' },
    ],
  },
  {
    id: 'experience',
    title: 'How would you describe your experience level?',
    whyItMatters:
      'This calibrates how much guidance the AI includes — more explanation for new users, efficient output for advanced ones.',
    options: [
      { value: 'new', label: 'New to AI-assisted development', description: 'First time using an AI agent to build features' },
      { value: 'familiar', label: 'Familiar with data products', description: 'Comfortable with dashboards and data tools, newer to AI agents' },
      { value: 'advanced', label: 'Experienced / advanced', description: 'Comfortable with data products, design systems, and AI tools' },
      { value: 'other', label: 'Other', description: 'Describe your experience level in your own words' },
    ],
  },
];

const TOTAL_STEPS = MERGED_QUESTIONS.length;

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
    dashboard: 'Dashboard', table: 'Data Table', chart: 'Chart',
    metrics: 'KPI Cards', recommendations: 'Recommendations',
    filters: 'Filters', detail: 'Detail View', form: 'Form',
  };
  const dvLabels: Record<string, string> = { small: 'Small data', medium: 'Medium data', large: 'Large data', unknown: 'Variable data' };
  const prdLabels: Record<string, string> = { yes: 'Has PRD', rough: 'Rough notes', no: 'No PRD' };
  const expLabels: Record<string, string> = { new: 'New user', familiar: 'Familiar', advanced: 'Advanced' };

  if (answers.featureType) summaryParts.push(ftLabels[answers.featureType] || (answers.otherText?.featureType ? `Other: ${answers.otherText.featureType}` : 'Other'));
  if (answers.dataVolume) summaryParts.push(dvLabels[answers.dataVolume] || (answers.otherText?.dataVolume ? `Other: ${answers.otherText.dataVolume}` : 'Other'));
  if (answers.hasPRD) summaryParts.push(prdLabels[answers.hasPRD] || (answers.otherText?.hasPRD ? `Other: ${answers.otherText.hasPRD}` : 'Other'));
  if (answers.experience) summaryParts.push(expLabels[answers.experience] || (answers.otherText?.experience ? `Other: ${answers.otherText.experience}` : 'Other'));

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
            Your personalized PM prompt is ready
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

      {/* Reading path */}
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
                  <div style={{
                    fontWeight: 700,
                    fontSize: '14px',
                    color: 'var(--ld-semantic-color-text-brand-bold)',
                    marginBottom: '3px',
                    fontFamily: 'var(--ld-semantic-font-family-sans)',
                  }}>
                    {item.title}
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
    desc: 'Tailored to your data feature needs',
  },
  {
    icon: <Map width={20} height={20} style={{ color: 'var(--ld-semantic-color-text-brand-bold)' }} />,
    title: 'Reading path',
    desc: 'Know which components to review first',
  },
] as const;

/* ── Main component ── */

export function PMOnboardingQuiz({ onComplete }: { onComplete?: (hasPRD: string | undefined) => void } = {}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [pendingAnswer, setPendingAnswer] = useState<string | undefined>(undefined);
  const [otherTexts, setOtherTexts] = useState<Record<string, string>>({});

  const currentQuestion = step >= 1 && step <= TOTAL_STEPS ? MERGED_QUESTIONS[step - 1] : null;
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
    let finalAnswers = answers;
    if (val) {
      const updatedOtherText = { ...(answers.otherText || {}) };
      if (val === 'other' && otherTexts[currentQuestion.id]) {
        updatedOtherText[currentQuestion.id] = otherTexts[currentQuestion.id];
      }
      finalAnswers = { ...answers, [currentQuestion.id]: val as never, otherText: updatedOtherText };
      setAnswers(finalAnswers);
    }
    setPendingAnswer(undefined);
    if (step >= TOTAL_STEPS) {
      setStep(TOTAL_STEPS + 1);
      onComplete?.(finalAnswers.hasPRD as string | undefined);
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
    onComplete?.(answers.hasPRD as string | undefined);
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setPendingAnswer(undefined);
    setOtherTexts({});
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
            {isResult ? 'Your personalized setup' : 'PM Feature Quiz'}
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
            Answer {TOTAL_STEPS} quick questions about the data feature you want to build
            and we'll generate a ready-to-paste AI prompt tailored to your needs — plus a
            personalized reading path through the component library.
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

            <div style={{ marginBottom: '20px' }}>
              <Alert variant="info">
                <strong>Why this matters: </strong>{currentQuestion.whyItMatters}
              </Alert>
            </div>

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

            {effectiveAnswer === 'other' && (
              <div style={{ marginTop: '12px', paddingLeft: '28px' }}>
                <TextField
                  size="small"
                  label="Please describe"
                  placeholder="Type your answer here..."
                  value={otherTexts[currentQuestion.id] || ''}
                  onChange={(e) => {
                    const val = (e.target as HTMLInputElement).value;
                    setOtherTexts((prev) => ({ ...prev, [currentQuestion.id]: val }));
                  }}
                />
              </div>
            )}
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
