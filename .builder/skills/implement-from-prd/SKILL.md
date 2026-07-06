---
name: implement-from-prd
description: When a user provides a PRD or asks to implement a feature from requirements, use this skill to parse, analyze, and generate an implementation plan
---
# Skill: Implement from PRD

## When to Use

- User says "here's my PRD", "implement this feature", "analyze my requirements"
- User drops a markdown file that follows the PRD template structure
- User pastes structured requirements with acceptance criteria

## Step 1: Parse the PRD

Read the PRD and extract:

1. **Data feature type** — performance dashboard, data table/report, chart/visualization, metric cards/KPI tiles, recommendation/action list, filter/segmentation controls, detail/drill-down view, form/data entry
2. **Data description** — what metrics/fields, volume (row count), time dimension, comparisons
3. **User story** — who, what, why
4. **Acceptance criteria** — numbered list of requirements
5. **Data shape** — interfaces, props, field types (currency, percentage, date, enum)
6. **Rendering context** — where it lives (page, panel, modal, embedded)
7. **Interactions** — sort, filter, drill-down, apply, export, dismiss
8. **Edge cases** — empty data, large datasets, slow APIs, missing fields, long text

If any critical section is missing, ask the user before proceeding. Critical sections: data feature type, data description, acceptance criteria, data shape.

## Step 2: Map to LD Components

For each UI element in the PRD, identify the correct Living Design component:

| PRD mentions | Use this LD component |
|---|---|
| Button, action, CTA | `Button` from `@/components/ui/Button` — variant primary/secondary/tertiary |
| Icon button, close, settings | `IconButton` from `@/components/ui/IconButton` — default variant ghost |
| Table, grid, list of data | `DataTable` system from `@/components/ui/DataTable` |
| Card, tile, content block | `Card` from `@/components/ui/Card` — elevation, not borders |
| Form field, input, text entry | `TextField` from `@/components/ui/TextField` — size small |
| Dropdown, select, picker | `Select` from `@/components/ui/Select` — size small |
| Checkbox, toggle, multi-select | `Checkbox` from `@/components/ui/Checkbox` |
| Modal, dialog, confirmation | `Dialog` or `AlertDialog` from `@/components/ui/Dialog` |
| Panel, drawer, sidebar | Resizable panel pattern per `guidelines/components/Panel.md` |
| Tabs, sections | `Tabs` from `@/components/ui/Tab` |
| Chart, graph, visualization | `ChartContainer` + Recharts per `guidelines/rules/RULE_ChartsAndGraphs.md` |
| Tag, badge, status label | `Tag` from `@/components/ui/tag` |
| Link, navigation text | `Link` from `@/components/ui/Link` — never raw `<a>` |
| Divider, separator | `Divider` from `@/components/ui/Divider` |
| Tooltip, popover | `Popover` from `@/components/ui/Popover` — always with `PopoverArrow` |

## Step 3: Identify Required Tokens

Based on the PRD, determine which token categories are needed:

- **Colors**: `--ld-semantic-color-text`, `--ld-semantic-color-surface`, `--ld-semantic-color-separator`
- **Action colors**: `--ld-semantic-color-action-fill-primary`, `--ld-semantic-color-action-border-secondary`
- **Status colors**: `--ld-semantic-color-text-positive`, `--ld-semantic-color-text-negative`
- **Chart colors**: `--ld-semantic-color-chart-categorical-{1-8}` (only for charts)
- **Spacing**: `--ld-primitive-scale-space-{50-600}`
- **Typography**: `--ld-semantic-font-body-*`, `--ld-semantic-font-caption-*`
- **Elevation**: `--ld-semantic-elevation-{100-300}`

## Step 4: Check Applicable Rules

Read these guideline files based on feature type:

| Feature type | Read these guidelines |
|---|---|
| Any feature | `guidelines/rules/RULE_DesignTokenEnforcement.md`, `.builderrules` |
| New page | `guidelines/rules/RULE_ResponsiveLayout.md` |
| Data table | `guidelines/DataTable.md` |
| Chart | `guidelines/rules/RULE_ChartsAndGraphs.md` |
| Form | Component guidelines for TextField, Select, Checkbox, TextArea |
| Card layout | `guidelines/Card.md`, `.builder/rules/card-elevation-rule.md` |
| Panel/drawer | `guidelines/components/Panel.md` |
| Modal/dialog | `guidelines/components/Modal.md` |
| Icons needed | `guidelines/rules/RULE_IconUsage.md` |

## Step 5: Generate Implementation Plan

Output a structured plan with:

1. **Component inventory** — which LD components to use, with import paths
2. **File structure** — which files to create/modify
3. **Data interfaces** — TypeScript interfaces derived from the data shape
4. **Implementation steps** — ordered list of what to build
5. **Token inventory** — which design tokens apply
6. **Rules to follow** — which enforcement rules are active
7. **Open questions** — anything unclear from the PRD

## Step 6: Confirm With User

Before writing code, present the plan and ask:
- "Does this plan match your expectations?"
- "Any changes to the component choices?"
- "Should I proceed with implementation?"

## Step 7: Implement

Follow the plan. After each major step:
- Check dev server for errors
- Verify no hard-coded colors, spacing, or typography
- Verify all components come from `@/components/ui/`
- Verify responsive behavior at 1024px, 768px, 480px breakpoints
- Run the pre-completion checklist from `.builderrules`

## Anti-Patterns

- NEVER start coding before parsing the PRD and mapping to components
- NEVER use components not in the LD system without asking first
- NEVER skip the confirmation step — always present the plan before building
- NEVER hard-code values that have semantic tokens
- NEVER install external UI libraries