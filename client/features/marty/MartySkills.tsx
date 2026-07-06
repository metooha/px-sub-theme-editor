import React, { useRef, useCallback } from 'react';
import { Rocket } from '@/components/icons/Rocket';
import { HelpCircle } from '@/components/icons/HelpCircle';
import { Spark } from '@/components/icons/Spark';
import { RulerArrow } from '@/components/icons/RulerArrow';
import { Grid } from '@/components/icons/Grid';
import { Magic } from '@/components/icons/Magic';
import ImageIcon from '@/components/icons/ImageIcon';
import { Search } from '@/components/icons/Search';
import { Flash } from '@/components/icons/Flash';
import { Check } from '@/components/icons/Check';
import { BoldText } from '@/components/icons/BoldText';
import { Article } from '@/components/icons/Article';
import { Clipboard } from '@/components/icons/Clipboard';
import { Calendar } from '@/components/icons/Calendar';
import { Table } from '@/components/icons/Table';
import { Tag } from '@/components/icons/Tag';
import { BarGraph } from '@/components/icons/BarGraph';
import { PanelLeft } from '@/components/icons/PanelLeft';
import { Bell } from '@/components/icons/Bell';
import { ChatBubbleSquare } from '@/components/icons/ChatBubbleSquare';
import { Gear } from '@/components/icons/Gear';
import { Sliders } from '@/components/icons/Sliders';
import { Globe } from '@/components/icons/Globe';
import { LanguageSettings } from '@/components/icons/LanguageSettings';
import { ShieldCheck } from '@/components/icons/ShieldCheck';
import { RotateCcw } from '@/components/icons/RotateCcw';
import { History } from '@/components/icons/History';
import { Pencil } from '@/components/icons/Pencil';

export interface Skill {
  id: string;
  label: string;
  prompt: string;
  icon: React.ReactNode;
  action?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

const iconStyle = { width: 14, height: 14, flexShrink: 0 };

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'campaigns',
    label: 'Campaigns',
    skills: [
      {
        id: 'create-campaign',
        label: 'Create campaign',
        prompt: 'Create campaign',
        icon: <Rocket style={iconStyle} />,
        action: 'create',
      },
      {
        id: 'optimize',
        label: 'Optimize performance',
        prompt: 'How can I optimize my campaign performance? What metrics should I focus on and what changes can improve my results?',
        icon: <Flash style={iconStyle} />,
      },
      {
        id: 'help',
        label: 'Help & FAQs',
        prompt: 'Help & FAQs',
        icon: <HelpCircle style={iconStyle} />,
        action: 'help',
      },
    ],
  },
  {
    id: 'design-tokens',
    label: 'Design Tokens',
    skills: [
      {
        id: 'find-token',
        label: 'Find a token',
        prompt: 'How do I find the right LD 3.5 semantic token for my use case? I need help choosing the correct token for: [describe what you need — color, spacing, border, typography, elevation, etc.].',
        icon: <Spark style={iconStyle} />,
      },
      {
        id: 'token-migration',
        label: 'Replace hardcoded values',
        prompt: 'I have hardcoded values (hex colors, px spacing, Tailwind classes) in my code that need to be replaced with LD 3.5 semantic tokens. Can you help me migrate them? Here is my code:\n\n[paste code here]',
        icon: <RotateCcw style={iconStyle} />,
      },
      {
        id: 'token-best-practices',
        label: 'Token best practices',
        prompt: 'What are the best practices for using LD 3.5 design tokens? I want to understand: when to use semantic vs primitive tokens, spacing hierarchy (8px base), elevation levels, and how to avoid common violations.',
        icon: <Check style={iconStyle} />,
      },
      {
        id: 'responsive-layout',
        label: 'Responsive layout',
        prompt: 'Help me implement responsive layout using LD standards. I need guidance on breakpoints (1024px tablet, 768px mobile, 480px small), padding reductions, grid column changes, form stacking, and table behavior for smaller screens.',
        icon: <RulerArrow style={iconStyle} />,
      },
    ],
  },
  {
    id: 'components',
    label: 'Components',
    skills: [
      {
        id: 'find-component',
        label: 'Find existing component',
        prompt: 'Before I create a new component, help me check if one already exists in the LD 3.5 library or the project. I need a component that: [describe what you need]. Check client/components/ui/ and the Component Inventory.',
        icon: <Magic style={iconStyle} />,
      },
      {
        id: 'check-compliance',
        label: 'Check component compliance',
        prompt: 'Can you review my component and check it follows Living Design 3.5 rules? Specifically check: (1) uses LD semantic tokens only, (2) no hardcoded colors/sizes, (3) uses existing LD components, (4) standalone with no external library deps, (5) has correct icon usage. Here is my code:\n\n[paste component here]',
        icon: <Check style={iconStyle} />,
      },
      {
        id: 'create-component',
        label: 'Create new component',
        prompt: 'I need to create a new LD 3.5 component. Walk me through the mandatory 10-step process: Figma reference, token-only styling, Component Library integration (dedicated page, route, Overview, Property Tester), migration plan, example file, and guideline doc. The component I need is: [describe it].',
        icon: <Pencil style={iconStyle} />,
      },
      {
        id: 'figma-export',
        label: 'Figma to code',
        prompt: 'I have a Figma design I need to implement. Help me: (1) identify which LD 3.5 components to use, (2) map Figma styles to semantic tokens, (3) export and organize any required image/SVG assets, (4) structure the component correctly. Here is what the design shows: [describe or paste Figma details].',
        icon: <ImageIcon size={14} />,
      },
    ],
  },
  {
    id: 'icons',
    label: 'Icons',
    skills: [
      {
        id: 'find-icon',
        label: 'Find an icon',
        prompt: 'I need to find an icon from the 303-icon library. Help me find the right one for: [describe what you need]. Search the icons in client/components/icons/ by name and suggest the best match. Also tell me the correct import path.',
        icon: <Grid style={iconStyle} />,
      },
      {
        id: 'icon-usage',
        label: 'Icon usage rules',
        prompt: 'What are the rules for using icons in this project? Cover: correct import paths, sizing via CSS (currentColor), when to use icons from the library vs. icons-custom/, and the spec for new custom icons (20×20 viewBox, 1.5px stroke, square linecap, currentColor).',
        icon: <Search style={iconStyle} />,
      },
      {
        id: 'create-icon',
        label: 'Create a custom icon',
        prompt: 'I need to create a new custom icon that does not exist in the 303-icon library. What are the exact specs and steps? Cover: SVG spec (20×20 viewBox, 1.5px stroke, square linecap, currentColor fill), where to place the file (icons-custom/), and how to export it.',
        icon: <Spark style={iconStyle} />,
      },
    ],
  },
  {
    id: 'typography',
    label: 'Typography',
    skills: [
      {
        id: 'typography-components',
        label: 'Use typography components',
        prompt: 'How do I use the LD 3.5 typography system correctly? I need guidance on when to use Display, Heading, Body, and Caption components instead of raw HTML elements, and how to configure them via props instead of hardcoding font sizes.',
        icon: <BoldText style={iconStyle} />,
      },
      {
        id: 'typography-tokens',
        label: 'Typography tokens',
        prompt: 'What typography tokens are available in LD 3.5? Explain the token naming structure, when to use them directly in CSS modules vs. via typography components, and show me the correct vs. incorrect patterns for font-family, font-size, and font-weight.',
        icon: <Article style={iconStyle} />,
      },
    ],
  },
  {
    id: 'forms',
    label: 'Forms',
    skills: [
      {
        id: 'form-components',
        label: 'Form component guide',
        prompt: 'Which LD 3.5 component should I use for my form field? Help me choose between: TextField (single-line), TextArea (multi-line), Select (dropdown), Checkbox, Switch (immediate toggle), Radio/RadioGroup, or DatePicker. My field needs to: [describe it].',
        icon: <Clipboard style={iconStyle} />,
      },
      {
        id: 'form-group',
        label: 'Form group & validation',
        prompt: 'How do I correctly group related form controls using LD 3.5 FormGroup? Cover: fieldset/legend semantics, error message placement, label guidelines, and accessibility with aria-describedby and aria-invalid.',
        icon: <Check style={iconStyle} />,
      },
      {
        id: 'date-picker',
        label: 'Date picker usage',
        prompt: 'How do I implement the LD 3.5 date picker? I need guidance on: single date vs. date range selection, the DatePicker vs. DateField vs. DatePickerCalendar vs. DateRangePicker components, props for restricting selectable dates, and accessibility requirements.',
        icon: <Calendar style={iconStyle} />,
      },
    ],
  },
  {
    id: 'data-display',
    label: 'Data Display',
    skills: [
      {
        id: 'data-table',
        label: 'DataTable patterns',
        prompt: 'Help me implement a DataTable using the LD 3.5 DataTable component system. I need guidance on: the full component hierarchy (DataTable, DataTableHeader, DataTableBody, DataTableCell), sticky headers/columns, resizable columns, row selection, bulk actions, and the config panel.',
        icon: <Table style={iconStyle} />,
      },
      {
        id: 'tags-badges',
        label: 'Tags & badges',
        prompt: 'When should I use Tag vs. OLQTag vs. Badge vs. Chip vs. FilterChip? Explain the differences, the 17 color variants of Tag, and give me the correct import paths and usage examples for each.',
        icon: <Tag style={iconStyle} />,
      },
      {
        id: 'skeleton-loading',
        label: 'Loading states',
        prompt: 'How do I implement loading states correctly in LD 3.5? Cover: Skeleton and SkeletonText components for placeholder loading, the isMagic shimmer for AI content, Spinner usage (neutral vs white, small vs large), and when to use each pattern.',
        icon: <BarGraph style={iconStyle} />,
      },
    ],
  },
  {
    id: 'overlays',
    label: 'Overlays & Navigation',
    skills: [
      {
        id: 'modal-vs-panel',
        label: 'Modal vs Panel vs Popover',
        prompt: 'When should I use Modal vs Panel vs Popover vs Callout vs Nudge vs Banner? Explain the use case for each, sizing options, dismissal patterns (Escape/scrim/close button), focus management requirements, and the rule that panels must be resizable (min 420px, max 800px).',
        icon: <PanelLeft style={iconStyle} />,
      },
      {
        id: 'notifications',
        label: 'Notifications & alerts',
        prompt: 'Which notification component should I use? Help me choose between Banner (system-generated, full-width), Callout (coaching/onboarding anchored to element), Nudge (non-critical supportive guidance), and ContentMessage (critical blocking states like errors/empty states). My situation: [describe it].',
        icon: <Bell style={iconStyle} />,
      },
      {
        id: 'tabs-breadcrumb',
        label: 'Tabs & breadcrumb',
        prompt: 'How do I implement LD 3.5 Tabs and Breadcrumb components? For Tabs: controlled vs uncontrolled, trailing badges, small-screen mode, and keyboard nav. For Breadcrumb: when to use (2–5 hierarchy levels), mobile wrapping, and aria-current accessibility.',
        icon: <ChatBubbleSquare style={iconStyle} />,
      },
    ],
  },
  {
    id: 'theming',
    label: 'Theming',
    skills: [
      {
        id: 'theme-architecture',
        label: 'Theme architecture',
        prompt: 'Explain the LD 3.5 theme switching architecture: how the CSS cascade inheritance model works, how ThemeProvider context is used, what the override-only theme files contain, the full theme tree (LD Base → personas), and how to load themes correctly.',
        icon: <Sliders style={iconStyle} />,
      },
      {
        id: 'add-theme',
        label: 'Add a new theme',
        prompt: 'Walk me through the mandatory checklist for adding a new theme in this project: creating the minimal override CSS file (only the changed tokens), registering it in theme-registry.ts, updating THEME_INHERITANCE.md, and testing in the Component Library.',
        icon: <Gear style={iconStyle} />,
      },
    ],
  },
  {
    id: 'i18n',
    label: 'Accessibility & i18n',
    skills: [
      {
        id: 'add-translations',
        label: 'Add translation strings',
        prompt: 'How do I add translatable strings using react-i18next in this project? Cover: which namespace to use (common, pages, marty), key naming conventions, how to use useTranslation hook, interpolation patterns, pluralization, and how to add the string in all three languages (English, Spanish, French).',
        icon: <Globe style={iconStyle} />,
      },
      {
        id: 'design-system-terms',
        label: 'What stays in English',
        prompt: 'Which terms in this project must always stay in English (not translated)? Explain the DesignSystemTerminology standard: which component names, variant names, size names, state names, and token names must remain in English vs. which user-facing strings get translated into Spanish and French.',
        icon: <LanguageSettings style={iconStyle} />,
      },
      {
        id: 'aria-patterns',
        label: 'ARIA & accessibility',
        prompt: 'What ARIA patterns do I need to follow for interactive components in this project? Cover: aria-label for icon buttons, aria-describedby for form errors, aria-invalid for invalid fields, aria-current for breadcrumbs and navigation, role attributes for custom components, and focus management for modals and panels.',
        icon: <ShieldCheck style={iconStyle} />,
      },
    ],
  },
  {
    id: 'migration',
    label: 'Migration',
    skills: [
      {
        id: 'migrate-button',
        label: 'Migrate buttons',
        prompt: 'Help me migrate old button implementations to the LD 3.5 Button component. Show me the variant/size/prop mapping table from Shadcn to LD 3.5, the correct import path (uppercase Button.tsx), and how to handle edge cases like icon buttons, link buttons, and destructive actions.',
        icon: <RotateCcw style={iconStyle} />,
      },
      {
        id: 'migrate-radix',
        label: 'Remove Radix UI deps',
        prompt: 'Help me remove a @radix-ui dependency from a component. I need standalone native HTML/React implementations following WAI-ARIA patterns. The component I want to migrate away from Radix is: [name the component]. Show me the native implementation approach.',
        icon: <History style={iconStyle} />,
      },
      {
        id: 'migration-assessment',
        label: 'Migration status',
        prompt: 'What is the current state of the Living Design 3.5 migration in this project? Show me: which areas are complete, which are in progress, what the phased migration plan is, and what I should prioritize next. Focus on typography, component replacements, and token adoption.',
        icon: <BarGraph style={iconStyle} />,
      },
    ],
  },
];

interface MartySkillsProps {
  onSkillClick: (skill: Skill) => void;
  categoryFilter?: string[];
  compact?: boolean;
}

export function MartySkills({ onSkillClick, categoryFilter, compact }: MartySkillsProps) {
  const categories = categoryFilter
    ? SKILL_CATEGORIES.filter((c) => categoryFilter.includes(c.id))
    : SKILL_CATEGORIES;

  // Flatten all skills from filtered categories for compact carousel
  const allSkills = compact
    ? categories.flatMap((c) => c.skills)
    : [];

  // Drag-to-scroll state
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDragging: false, startX: 0, scrollLeft: 0, didDrag: false });

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    dragState.current = {
      isDragging: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      didDrag: false,
    };
    el.setPointerCapture(e.pointerId);
    el.style.cursor = 'grabbing';
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.isDragging) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 3) dragState.current.didDrag = true;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = dragState.current.scrollLeft - dx;
    }
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragState.current.isDragging = false;
    if (scrollRef.current) {
      scrollRef.current.releasePointerCapture(e.pointerId);
      scrollRef.current.style.cursor = 'grab';
    }
  }, []);

  const handleSkillClickGuard = useCallback((skill: Skill) => {
    // Prevent click from firing after a drag
    if (dragState.current.didDrag) {
      dragState.current.didDrag = false;
      return;
    }
    onSkillClick(skill);
  }, [onSkillClick]);

  // Compact: single flat carousel strip, no category headers, drag to scroll
  if (compact) {
    return (
      <div
        ref={scrollRef}
        className="scrollbar-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '2px',
          cursor: 'grab',
          userSelect: 'none',
          touchAction: 'pan-y',
        }}
      >
        {allSkills.map((skill) => (
          <button
            key={skill.id}
            onClick={() => handleSkillClickGuard(skill)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '5px 10px',
              borderRadius: '999px',
              border: '1px solid var(--ld-semantic-color-border-subtle)',
              background: 'var(--ld-semantic-color-surface)',
              color: 'var(--ld-semantic-color-text)',
              fontSize: '12px',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              fontWeight: 500,
              cursor: 'inherit',
              transition: 'background 0.15s, border-color 0.15s',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              if (!dragState.current.isDragging) {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--ld-semantic-color-fill-subtle)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--ld-semantic-color-border-strong)';
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--ld-semantic-color-surface)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--ld-semantic-color-border-subtle)';
            }}
          >
            {skill.icon}
            {skill.label}
          </button>
        ))}
      </div>
    );
  }

  // Non-compact: grouped with category headers
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      {categories.map((category) => (
        <div key={category.id} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--ld-semantic-color-text-subtle)',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
          }}>
            {category.label}
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {category.skills.map((skill) => (
              <button
                key={skill.id}
                onClick={() => onSkillClick(skill)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '5px 10px',
                  borderRadius: '999px',
                  border: '1px solid var(--ld-semantic-color-border-subtle)',
                  background: 'var(--ld-semantic-color-surface)',
                  color: 'var(--ld-semantic-color-text)',
                  fontSize: '12px',
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'background 0.15s, border-color 0.15s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--ld-semantic-color-fill-subtle)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--ld-semantic-color-border-strong)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--ld-semantic-color-surface)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--ld-semantic-color-border-subtle)';
                }}
              >
                {skill.icon}
                {skill.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
