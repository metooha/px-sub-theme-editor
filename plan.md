# Skills System, PRD Template & PM Onboarding Quiz — Plan

## Goal

Create a system where PMs can onboard into the project, take a guided quiz, and generate implementation-ready prompts — either from a PRD they provide or from scratch using our rules and guidelines as the foundation.

---

## Current State

### Existing Rule Locations
| Location | Format | Purpose |
|---|---|---|
| `.builderrules` | Single MD file | Root project rules (LD 3.5 design system, component rules, tokens) |
| `.builder/rules/` | Individual `.md` / `.mdc` files | Focused rules (card elevation, responsive design, icon buttons, tables, deploy, organize UI) |
| `.fusion/rules/` | Individual `.md` files | Agent rules (component composition, design guidelines mandate, table standardization) |
| `guidelines/rules/` | Individual `.md` files | Comprehensive enforcement rules (16+ files covering tokens, icons, layout, charts, themes) |
| `guidelines/components/` | Individual `.md` files | Component specs (32+ files covering every LD 3.5 component) |
| `guidelines/design-system/` | Individual `.md` files | Foundation docs (tokens, typography, color, component inventory) |

### Problem
- Rules are scattered across 4 different locations with some overlap
- No PRD-to-implementation workflow exists
- PMs have no guided entry point to understand what the system can do
- No quiz or onboarding to help non-developers formulate effective prompts

---

## Phase 1: PRD Template & Validation

### 1a. Create the PRD Template

Create a standardized PRD template at `.builder/templates/SKILL_PRD_TEMPLATE.md` that PMs fill out. The template captures:

- **Feature name** and description
- **User story** (As a _____, I want to _____, so that _____)
- **Feature type** (new page, new component, modification, data visualization, form, etc.)
- **Acceptance criteria** (numbered list of requirements)
- **Data requirements** (API endpoints, mock data shape, real-time vs static)
- **Design reference** (Figma link, screenshot, or text description)
- **Component inventory** (which LD components are likely needed)
- **Edge cases** (empty states, error states, loading states, responsive behavior)
- **Dependencies** (other features, APIs, or data sources required)

### 1b. Test the Template Against a Real PRD

Before rolling out, test the template by:
1. Taking an existing feature in the app (e.g., the Recommendations Carousel or Campaign Dashboard)
2. Retroactively writing a PRD for it using the template
3. Feeding the PRD + our rules into the agent to see if it can generate a correct implementation plan
4. Validating that the generated plan references correct LD components, tokens, and patterns
5. Iterating on the template based on gaps found

---

## Phase 2: Skills Derived from Rules & Guidelines

### What is a "Skill"?

A skill is a focused `.builder/rules/` file that teaches the agent HOW to handle a specific type of task. Each skill:
- Has a clear trigger condition (when to activate)
- References specific guidelines/rules
- Includes correct and incorrect examples
- Maps to LD components and tokens

### Skills to Create (from existing rules/guidelines)

| Skill Name | Source Guidelines | Trigger |
|---|---|---|
| `build-new-page.md` | RULE_ResponsiveLayout, page layout rules in .builderrules | "Create a new page", "Add a page for..." |
| `build-data-table.md` | DataTable guidelines, RULE_DesignTokenEnforcement | "Create a table", "Show data in a grid" |
| `build-chart.md` | RULE_ChartsAndGraphs, Chart.tsx docs | "Create a chart", "Visualize data" |
| `build-form.md` | TextField/Select/Checkbox guidelines, .builderrules form rules | "Create a form", "Add input fields" |
| `build-card-layout.md` | Card guidelines, card-elevation-rule | "Create cards", "Show items in cards" |
| `build-panel-drawer.md` | Panel guidelines, .builderrules panel rules | "Create a side panel", "Add a drawer" |
| `build-modal-dialog.md` | Modal/Dialog guidelines | "Show a confirmation", "Create a modal" |
| `build-navigation.md` | AppSidebar guidelines, Tab guidelines | "Add a nav item", "Create tabs" |
| `implement-from-figma.md` | RULE_FigmaAssetExtraction, RULE_DesignTokenEnforcement | "Implement this Figma", uploaded design file |
| `implement-from-prd.md` | PRD template + all component rules | "Here's my PRD", "Implement this feature" |

### Skill File Format

Each skill follows this structure:

```markdown
---
description: Short description of when this skill applies
globs:
alwaysApply: false
---

# Skill: [Name]

## When to Use
[Trigger conditions]

## Required Guidelines to Read First
[List of guideline files to reference]

## Component Checklist
[Which LD components apply]

## Token Checklist
[Which token categories apply]

## Implementation Steps
[Step-by-step process]

## Examples
[Correct and incorrect patterns]
```

---

## Phase 3: PM Onboarding Quiz

### Quiz Flow

Create a `.builder/templates/PM_GETTING_STARTED.md` guide that walks PMs through a quiz. The quiz is a structured prompt that the PM pastes into the chat, and the agent responds interactively.

#### Quiz Steps:

**Step 1 — Feature Type**
> "What kind of feature do you want to create?"
- A. New page or view
- B. New component or widget
- C. Data table or list view
- D. Chart or data visualization
- E. Form or input flow
- F. Modify an existing feature
- G. Other (describe it)

**Step 2 — PRD Availability**
> "Do you have a PRD (Product Requirements Document) for this feature?"
- A. Yes, I have a PRD ready to share
- B. No, I need help writing one
- C. I have rough notes / partial requirements

**Step 3a (if PRD exists) — PRD Intake**
> "Drop your PRD into the project or paste it here. I'll analyze it against our design system rules and generate an implementation plan."

The agent then:
1. Parses the PRD
2. Maps requirements to existing LD components
3. Identifies which tokens are needed
4. Flags any requirements that conflict with rules
5. Generates a step-by-step implementation plan with component/token references
6. Asks clarifying questions about ambiguous requirements

**Step 3b (if no PRD) — Guided PRD Builder**
> "Let's build your requirements together. I'll ask you a series of questions based on our PRD template."

The agent walks through:
1. User story
2. Acceptance criteria
3. Data requirements
4. Design reference (Figma link or description)
5. Edge cases
6. Then generates a filled PRD from the answers

**Step 3c (if partial notes) — PRD Enhancement**
> "Share what you have, and I'll structure it into a proper PRD using our template, then ask follow-up questions to fill gaps."

**Step 4 — Implementation Plan**
Regardless of path, the final output is:
- A structured implementation plan
- Component inventory (which LD components to use)
- Token inventory (which design tokens apply)
- File structure (which files to create/modify)
- A prompt the PM can hand to a developer or paste into the agent to start building

---

## Phase 4: Integration into .builderrules

### Updates to .builderrules

Add a new section to the root `.builderrules` file:

```markdown
## PM ONBOARDING & PRD WORKFLOW

When a user identifies as a PM or asks about getting started:
1. Direct them to `.builder/templates/PM_GETTING_STARTED.md`
2. Run the onboarding quiz flow
3. Use the PRD template to structure requirements
4. Generate implementation plans that reference our design system rules

When a user provides a PRD:
1. Parse against the PRD template structure
2. Map requirements to LD 3.5 components
3. Identify applicable skills and rules
4. Generate implementation plan with component/token references
```

### New Files to Create

| File | Purpose |
|---|---|
| `.builder/templates/SKILL_PRD_TEMPLATE.md` | PRD template for PMs to fill out |
| `.builder/templates/PM_GETTING_STARTED.md` | Onboarding guide with quiz flow |
| `.builder/rules/implement-from-prd.mdc` | Skill for processing PRDs into implementation plans |
| `.builder/rules/build-new-page.mdc` | Skill for building new pages |
| `.builder/rules/build-data-table.mdc` | Skill for building data tables |
| `.builder/rules/build-chart.mdc` | Skill for building charts/graphs |
| `.builder/rules/build-form.mdc` | Skill for building forms |
| `.builder/rules/build-card-layout.mdc` | Skill for building card layouts |
| `.builder/rules/build-panel-drawer.mdc` | Skill for building panels/drawers |
| `.builder/rules/build-modal-dialog.mdc` | Skill for building modals/dialogs |
| `.builder/rules/implement-from-figma.mdc` | Skill for implementing Figma designs |

---

## Phase 5: Testing & Iteration

### Test Scenarios

1. **Retroactive PRD Test** — Write a PRD for an existing feature (e.g., Campaign Dashboard), feed it through the system, compare generated plan to actual implementation
2. **New Feature PRD Test** — Write a PRD for a hypothetical new feature, validate the generated plan follows all rules
3. **PM Quiz Test** — Simulate a PM going through the quiz with no PRD, verify the guided builder produces a usable PRD
4. **Figma-to-Implementation Test** — Use a Figma design file with the implement-from-figma skill, verify correct component/token mapping

### Success Criteria

- Agent correctly identifies which LD components to use from a PRD
- Agent never suggests hard-coded values, external libraries, or non-LD components
- Generated implementation plans reference specific guideline files
- PM quiz produces structured, actionable PRDs
- Skills activate correctly based on task type

---

## Execution Order

1. **Create PRD Template** — `.builder/templates/SKILL_PRD_TEMPLATE.md`
2. **Test PRD Template** — Retroactive test against existing feature
3. **Create PM Getting Started Guide** — `.builder/templates/PM_GETTING_STARTED.md` with quiz
4. **Create core skills** — Start with `implement-from-prd.mdc` and `build-new-page.mdc`
5. **Update `.builderrules`** — Add PM workflow section
6. **Create remaining skills** — One at a time, testing each
7. **End-to-end test** — Full PM quiz → PRD → implementation plan flow
