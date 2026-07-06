import React from 'react';

interface DocEntry {
  name: string;
  path: string;
  purpose: string;
}

interface DocSection {
  title: string;
  description: string;
  docs: DocEntry[];
}

const docSections: DocSection[] = [
  {
    title: 'Component Guidelines',
    description: 'Specifications for each Living Design 3.5 component including purpose, variants, tokens, and usage rules.',
    docs: [
      { name: 'Badge', path: 'guidelines/components/Badge.md', purpose: 'Count indicators and status labels' },
      { name: 'Banner', path: 'guidelines/components/Banner.md', purpose: 'Page-level messages for broad user groups' },
      { name: 'Bottom Sheet', path: 'guidelines/components/Bottom-Sheet.md', purpose: 'Modal surface sliding up from viewport bottom' },
      { name: 'Breadcrumb', path: 'guidelines/components/Breadcrumb.md', purpose: 'Secondary navigation showing page hierarchy' },
      { name: 'Button', path: 'guidelines/components/Button.md', purpose: 'Action triggers with primary, secondary, tertiary, destructive variants' },
      { name: 'Callout', path: 'guidelines/components/Callout.md', purpose: 'Coaching/onboarding guidance anchored to UI elements' },
      { name: 'Card', path: 'guidelines/components/Card.md', purpose: 'Elevated surfaces for grouping content and actions' },
      { name: 'Checkbox', path: 'guidelines/components/Checkbox.md', purpose: 'Multi-select form controls with indeterminate state' },
      { name: 'Chip', path: 'guidelines/components/Chip.md', purpose: 'Selectable compact labels with 4px rounded corners' },
      { name: 'Content Message', path: 'guidelines/components/Content-Message.md', purpose: 'Critical states: empty, error, no permission, loading' },
      { name: 'DateField', path: 'guidelines/components/DateField.md', purpose: 'Text input for manual date entry (mm/dd/yyyy)' },
      { name: 'Divider', path: 'guidelines/components/Divider.md', purpose: 'Visual separator using LD separator token' },
      { name: 'FilterChip', path: 'guidelines/components/FilterChip.md', purpose: 'Pill-shaped buttons for filtering interfaces' },
      { name: 'Form Group', path: 'guidelines/components/Form-Group.md', purpose: 'Groups related form controls under a single label' },
      { name: 'IconButton', path: 'guidelines/components/IconButton.md', purpose: 'Square icon-only buttons' },
      { name: 'Link', path: 'guidelines/components/Link.md', purpose: 'Navigational elements to pages or anchors' },
      { name: 'Link Button', path: 'guidelines/components/Link-Button.md', purpose: 'Button behavior with link-like underlined appearance' },
      { name: 'List', path: 'guidelines/components/List.md', purpose: 'Continuous vertical groups of related information' },
      { name: 'Magic Box', path: 'guidelines/components/Magic-Box.md', purpose: 'Highlights content updated by AI/agents' },
      { name: 'Menu', path: 'guidelines/components/Menu.md', purpose: 'Action list overlay for space-constrained contexts' },
      { name: 'Metric', path: 'guidelines/components/Metric.md', purpose: 'Emphasizes a single critical data point value' },
      { name: 'Modal', path: 'guidelines/components/Modal.md', purpose: 'Focused interactions requiring user attention' },
      { name: 'Nudge', path: 'guidelines/components/Nudge.md', purpose: 'Non-critical supportive information with optional actions' },
      { name: 'Panel', path: 'guidelines/components/Panel.md', purpose: 'Resizable side panels for additional content' },
      { name: 'Popover', path: 'guidelines/components/Popover.md', purpose: 'Overlay anchored to a trigger element' },
      { name: 'Progress Tracker', path: 'guidelines/components/ProgressTracker.md', purpose: 'Visual progress through a set of steps' },
      { name: 'Section', path: 'guidelines/components/Section.md', purpose: 'Hierarchical content grouping with primary, secondary, tertiary levels' },
      { name: 'Select', path: 'guidelines/components/Select.md', purpose: 'Choose one value from a dropdown list' },
      { name: 'Spinner', path: 'guidelines/components/Spinner.md', purpose: 'Loading indicators for ongoing processes' },
      { name: 'Switch', path: 'guidelines/components/Switch.md', purpose: 'On/off toggle controls' },
      { name: 'Tag', path: 'guidelines/components/Tag.md', purpose: 'Labels for status, category, or attribute of an item' },
      { name: 'TextArea', path: 'guidelines/components/TextArea.md', purpose: 'Multi-line text input for free-form content' },
      { name: 'TextField', path: 'guidelines/components/TextField.md', purpose: 'Single-line input for names, emails, etc.' },
    ],
  },
  {
    title: 'Design System Foundations',
    description: 'Core design system documentation covering tokens, colors, typography, and component architecture.',
    docs: [
      { name: 'Design Tokens', path: 'guidelines/design-system/DesignTokens.md', purpose: 'Complete design token reference (colors, spacing, elevation)' },
      { name: 'Design Tokens Overview', path: 'guidelines/design-system/design-tokens-overview.md', purpose: 'Token system architecture and usage patterns' },
      { name: 'Token Usage', path: 'guidelines/design-system/tokens.md', purpose: 'How typography components use CSS variables' },
      { name: 'Color System', path: 'guidelines/design-system/Color.md', purpose: 'Color token rules and semantic color usage' },
      { name: 'Typography', path: 'guidelines/design-system/typography.md', purpose: 'Font families, sizes, and weight tokens' },
      { name: 'CSS Variables Source', path: 'guidelines/design-system/css-variables-source.md', purpose: 'Source of truth for all CSS custom properties' },
      { name: 'Component Inventory', path: 'guidelines/design-system/Component-Inventory.md', purpose: 'Single source of truth for all LD components' },
      { name: 'Component Reference', path: 'guidelines/design-system/LivingDesign-Component-Reference.md', purpose: 'Quick reference for building UI with LD components' },
      { name: 'Components Overview', path: 'guidelines/design-system/overview-components.md', purpose: 'Rules for using Living Design components' },
      { name: 'Component Visibility', path: 'guidelines/design-system/component-visibility.md', purpose: 'Private vs public component guidelines' },
      { name: 'React Guidelines', path: 'guidelines/design-system/Guidelines-react.md', purpose: 'React-specific component development guidelines' },
      { name: 'General Guidelines', path: 'guidelines/design-system/Guidelines.md', purpose: 'Living Design general development guidelines' },
    ],
  },
  {
    title: 'Enforcement Rules',
    description: 'Mandatory rules that must be followed by all developers and AI agents when writing code.',
    docs: [
      { name: 'Rules Index', path: '.builder/rules/RULES_INDEX.mdc', purpose: 'Quick reference for all mandatory rules' },
      { name: 'Design System Enforcement', path: '.builder/rules/RULE_DesignSystemEnforcement.mdc', purpose: 'All code must follow LD 3.5 principles' },
      { name: 'Design Token Enforcement', path: '.builder/rules/RULE_DesignTokenEnforcement.mdc', purpose: 'All styling must use semantic tokens exclusively' },
      { name: 'Token Usage Enforcement', path: '.builder/rules/RULE_TokenUsageEnforcement.mdc', purpose: 'Hardcoded values are strictly prohibited' },
      { name: 'Create New Component', path: '.builder/rules/RULE_CreateNewComponent.mdc', purpose: 'Complete process for adding new LD components' },
      { name: 'Component Sandbox', path: '.builder/rules/RULE_ComponentPropertyTester.mdc', purpose: 'All components must be testable in sandbox' },
      { name: 'Icon Usage', path: '.builder/rules/RULE_IconUsage.mdc', purpose: 'Search existing icons first, never create duplicates' },
      { name: 'No Emojis, Use Icons', path: '.builder/rules/RULE_NoEmojisUseIcons.mdc', purpose: 'Use icon library instead of emojis or random images' },
      { name: 'Responsive Layout', path: '.builder/rules/RULE_ResponsiveLayout.mdc', purpose: 'Page shell structure and responsive requirements' },
      { name: 'LinkButton & Spot Icon', path: '.builder/rules/RULE_LinkButtonAndSpotIcon.mdc', purpose: 'Enforce LinkButton component and Spot Icon patterns' },
      { name: 'Figma Asset Extraction', path: '.builder/rules/RULE_FigmaAssetExtraction.mdc', purpose: 'Only use explicitly exportable Figma assets' },
      { name: 'Dev Server Health Check', path: '.builder/rules/RULE_DevServerHealthCheck.mdc', purpose: 'Verify dev server after any code changes' },
      { name: 'Theme Switcher', path: '.builder/rules/RULE_ThemeSwitcher.mdc', purpose: 'Theme management architecture and requirements' },
      { name: 'Theme Addition', path: '.builder/rules/RULE_ThemeAddition.mdc', purpose: 'Process for adding new brand themes' },
      { name: 'Markdown Organization', path: '.builder/rules/RULE_MarkdownOrganization.mdc', purpose: 'Markdown file directory structure rules' },
      { name: 'Charts & Graphs', path: '.builder/rules/RULE_ChartsAndGraphs.mdc', purpose: 'Chart colors must use LD semantic chart categorical tokens' },
      { name: 'Brand Shop Builder', path: '.builder/rules/RULE_BrandShopBuilder.mdc', purpose: 'Brand Shop Builder 3-panel page builder specification' },
      { name: 'Standalone Components', path: '.builder/rules/RULE_StandaloneComponents.mdc', purpose: 'All components must be standalone, no external UI libs' },
      { name: 'Radix Migration Plan', path: '.builder/rules/PLAN_RadixMigration.mdc', purpose: 'Migration plan to remove all @radix-ui dependencies' },
      { name: 'Project Agent Rules', path: '.builder/rules/PROJECT_AGENT_RULES.mdc', purpose: 'Agent protocol for pre-task questions and PM workflows' },
      { name: 'Guidelines Page Sync', path: '.builder/rules/RULE_GuidelinesPageSync.mdc', purpose: 'Keep Component Library Guidelines index synced' },
    ],
  },
  {
    title: 'Cross-Cutting Guidelines',
    description: 'Guidelines that apply across all components and pages.',
    docs: [
      { name: 'Internationalization (i18n)', path: 'guidelines/Internationalization.md', purpose: 'All user-facing strings must be translatable (en, es, fr)' },
      { name: 'Design System Terminology', path: 'guidelines/DesignSystemTerminology.md', purpose: 'Official translations for LD 3.5 terms' },
      { name: 'Token Migration Guide', path: 'guidelines/TOKEN_MIGRATION_GUIDE.md', purpose: 'Converting hard-coded values to semantic tokens' },
      { name: 'Token Usage Best Practices', path: 'guidelines/TOKEN_USAGE_BEST_PRACTICES.md', purpose: 'Best practices for using LD semantic tokens' },
      { name: 'Component Library Integration', path: 'guidelines/COMPONENT_LIBRARY_INTEGRATION.md', purpose: 'Quick reference for component creation requirements' },
      { name: 'LLM Integration Instructions', path: 'guidelines/LLM_INTEGRATION_INSTRUCTIONS.md', purpose: 'Step-by-step instructions for AI to integrate LD 3.5' },
      { name: 'App Sidebar', path: 'guidelines/AppSidebar.md', purpose: 'Shared sidebar navigation rules' },
      { name: 'Card Guidelines', path: 'guidelines/Card.md', purpose: 'Card elevation rules (shadows, not borders)' },
      { name: 'DataTable', path: 'guidelines/DataTable.md', purpose: 'Data table component hierarchy and usage' },
      { name: 'DatePicker Calendar', path: 'guidelines/DatePickerCalendar.md', purpose: 'Calendar date selection component' },
      { name: 'Date Range Picker', path: 'guidelines/DateRangePicker.md', purpose: 'Start/end date range selection' },
      { name: 'List', path: 'guidelines/List.md', purpose: 'Presentational list component guidelines' },
      { name: 'Menu', path: 'guidelines/Menu.md', purpose: 'Menu overlay with LD semantic tokens' },
      { name: 'Rating', path: 'guidelines/Rating.md', purpose: 'Star ratings with half-star support' },
      { name: 'Skeleton', path: 'guidelines/Skeleton.md', purpose: 'Loading placeholder shapes' },
      { name: 'Tab', path: 'guidelines/Tab.md', purpose: 'Tab navigation for page-level content switching' },
      { name: 'Tag', path: 'guidelines/Tag.md', purpose: 'Tag attribute and status labeling' },
      { name: 'TextArea', path: 'guidelines/TextArea.md', purpose: 'Multi-line text input guidelines' },
    ],
  },
  {
    title: 'Migrations & Implementation History',
    description: 'Completed migration plans and implementation summaries for reference.',
    docs: [
      { name: 'Button Standardization', path: 'guidelines/migrations/BUTTON-STANDARDIZATION-SUMMARY.md', purpose: 'Standardized all buttons to LD 3.5' },
      { name: 'IconButton Migration', path: 'guidelines/migrations/ICONBUTTON_MIGRATION_PLAN.md', purpose: 'Replace custom icon buttons with LD IconButton' },
      { name: 'Living Design Migration', path: 'guidelines/migrations/LIVING-DESIGN-MIGRATION-ASSESSMENT.md', purpose: 'Comprehensive shadcn-to-LD migration plan' },
      { name: 'Table Standardization', path: 'guidelines/migrations/PLAN_TABLE_STANDARDIZATION.md', purpose: 'Table component standardization plan' },
      { name: 'Theme Switcher Plan', path: 'guidelines/migrations/THEME_SWITCHER_PLAN.md', purpose: 'Dynamic theme switching implementation' },
      { name: 'UI Component Replacement', path: 'guidelines/migrations/UI-COMPONENT-REPLACEMENT-PLAN.md', purpose: 'Full shadcn-to-LD component replacement plan' },
      { name: 'Attribution Dropdown', path: 'guidelines/implementations/ATTRIBUTION-DROPDOWN-SUMMARY.md', purpose: 'Attribution interval dropdown implementation' },
      { name: 'Component Consolidation', path: 'guidelines/implementations/COMPONENT-CONSOLIDATION-SUMMARY.md', purpose: 'Button consolidation to LD component' },
      { name: 'Tag Implementation', path: 'guidelines/implementations/LD-TAG-IMPLEMENTATION-SUMMARY.md', purpose: 'LD 3.5 Tag component implementation' },
    ],
  },
];

function DocCard({ doc }: { doc: DocEntry }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '180px 1fr',
      gap: '12px',
      padding: '12px 16px',
      backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
      borderRadius: '6px',
      fontSize: '14px',
      alignItems: 'center',
    }}>
      <div style={{
        fontWeight: 600,
        color: 'var(--ld-semantic-color-text)',
        fontFamily: 'var(--ld-semantic-font-family-sans)',
      }}>
        {doc.name}
      </div>
      <div style={{ color: 'var(--ld-semantic-color-text-subtle)', lineHeight: 1.5 }}>
        {doc.purpose}
      </div>
    </div>
  );
}

export function GuidelinesDocIndex() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '24px' }}>

      {/* Summary stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '12px',
      }}>
        {[
          { label: 'Component Docs', count: docSections[0].docs.length },
          { label: 'Design System Docs', count: docSections[1].docs.length },
          { label: 'Enforcement Rules', count: docSections[2].docs.length },
          { label: 'Cross-Cutting Guides', count: docSections[3].docs.length },
          { label: 'Migrations & History', count: docSections[4].docs.length },
        ].map((stat) => (
          <div key={stat.label} style={{
            padding: '16px 20px',
            backgroundColor: 'var(--ld-semantic-color-surface)',
            borderRadius: '8px',
            boxShadow: 'var(--ld-semantic-elevation-100)',
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: '28px',
              fontWeight: 700,
              color: 'var(--ld-semantic-color-text-brand-bold)',
              marginBottom: '4px',
            }}>
              {stat.count}
            </div>
            <div style={{
              fontSize: '13px',
              color: 'var(--ld-semantic-color-text-subtle)',
              fontWeight: 500,
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Update notice */}
      <div style={{
        padding: '16px 20px',
        backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)',
        borderRadius: '6px',
        borderLeft: '4px solid var(--ld-semantic-color-border-info)',
        fontSize: '14px',
        lineHeight: 1.6,
        color: 'var(--ld-semantic-color-text-subtle)',
      }}>
        <strong style={{ color: 'var(--ld-semantic-color-text)' }}>Auto-sync rule active:</strong>{' '}
        This page must be updated whenever guideline documents in the <code style={{
          fontFamily: 'var(--ld-semantic-font-family-mono)',
          fontSize: '13px',
          backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
          padding: '2px 6px',
          borderRadius: '4px',
        }}>guidelines/</code> folder are added, removed, or renamed.
        See <code style={{
          fontFamily: 'var(--ld-semantic-font-family-mono)',
          fontSize: '13px',
          backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
          padding: '2px 6px',
          borderRadius: '4px',
        }}>.builder/rules/RULE_GuidelinesPageSync.mdc</code> for enforcement details.
      </div>

      {/* Document sections */}
      {docSections.map((section) => (
        <div key={section.title} style={{
          backgroundColor: 'var(--ld-semantic-color-surface)',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: 'var(--ld-semantic-elevation-100)',
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 700,
            color: 'var(--ld-semantic-color-text)',
            marginBottom: '8px',
          }}>
            {section.title}
            <span style={{
              marginLeft: '10px',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--ld-semantic-color-text-subtle)',
            }}>
              ({section.docs.length})
            </span>
          </h3>
          <p style={{
            fontSize: '14px',
            lineHeight: 1.6,
            color: 'var(--ld-semantic-color-text-subtle)',
            marginBottom: '16px',
          }}>
            {section.description}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {section.docs.map((doc) => (
              <DocCard key={doc.path} doc={doc} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
