# Builder.io Agent Rules
# This project uses the Living Design 3.5 (LD 3.5) design system.
# All UI must be built with LD components and semantic design tokens. No exceptions.

---

## MANDATORY PRE-TASK PROTOCOL — Ask Before You Build

Before writing a single line of code for any design or UI request, ask the relevant questions. Do not assume. Do not guess. Do not start implementing.

| Task type | Ask about |
|---|---|
| New page or layout | Breakpoints, tokens, states, data freshness |
| Carousel / scroll list | Shadow clipping, auto-advance, touch targets |
| Tabs / nav / buttons | Active state per page, navigation route + delay |
| Animation / transition | Feel (spring? ease? instant?), duration, timing |
| Data / content update | Dates relative to today? Real vs randomized names/addresses? |

Only after receiving answers should implementation begin.

---

## POST-TASK PROTOCOL — Build Validation

After completing code changes, you **MUST** run a build to verify there are no compilation or type errors.
Run the following command using the Bash tool:
`pnpm run build`

If there are any errors, you **MUST** correct them before considering the task complete.

---

## COMPONENT SIZE DEFAULTS

- **TextField / TextArea / Select** → default `size="small"` (32px). Only use `size="large"` (56px) when Figma explicitly specifies it.
- **Button / IconButton** → default `size="medium"` (40px). Use `size="small"` (32px) only for compact/inline contexts or when paired with small form controls. Use `size="large"` (48px) only for hero CTAs when Figma explicitly specifies it.
- **Context rule**: When a button is placed inline with `size="small"` form controls (Select, TextField, TextArea), the button must also be `size="small"` to maintain visual alignment.


// ✅ Correct defaults
<TextField label="Name" size="small" />        // → 32px
<Button variant="primary" size="medium">Save</Button>  // → 40px

// ✅ Correct — button matches adjacent small inputs
<Select size="small">...</Select>
<Button size="small">Export</Button>

// ❌ Wrong
<TextField size="large" />           // no Figma justification
<Button size="small">Save</Button>   // not a compact context


---

## COMPONENT REUSE POLICY

**Priority order: Reuse > Adapt > Create** (always in that order, always from `client/components/ui/`)

### Always Use Existing Components First

- `client/components/ui/` — LD 3.5 design system primitives. Always use these first.
- `client/components/` — Custom components. Use only if no LD equivalent exists.
- Check `guidelines/` folder for component documentation before creating anything new.
- Only create new components if nothing suitable exists in either location.

### Never Modify LD Components

Do NOT edit any file in `client/components/ui/`. If a variation is needed, create a wrapper component that composes the original — never fork it.

### Consolidate Duplicates Immediately

If you find multiple components that serve the same purpose, consolidate to ONE canonical component, update all references, and delete the duplicates.

---

## SPECIFIC COMPONENT RULES

### Buttons

- **ALWAYS use**: `client/components/ui/Button.tsx` (uppercase B)
- **NEVER create**: Custom button elements with inline styles or hard-coded colors
- **Default size**: `medium` — always pass `size="medium"` unless Figma says otherwise
- **Variants**: `primary`, `secondary`, `tertiary`, `destructive`
- **Width**: Use `isFullWidth` prop for full-width — never force with `width: 100%`
- **Import**: `import { Button } from '@/components/ui/Button'`
- **NEVER use `disabled` prop** — disabled buttons break keyboard/screen reader access. Change the label instead.
- `primary-alt` is exclusively for Walmart+ membership CTAs (gold fill, dark navy text)


// ✅ Correct
import { Button } from '@/components/ui/Button';
<Button variant="primary" size="medium">Save</Button>

// ❌ Wrong
<button style={{ background: '#0071DC' }}>Save</button>
<div onClick={fn} className="custom-btn">Save</div>
<Button variant="primary" disabled={!hasChanges}>Save</Button>  // use label change instead


### Button Groups

- **ALWAYS use**: `client/components/ui/ButtonGroup.tsx`
- **Never use**: Manual flex containers for buttons
- **Import**: `import { ButtonGroup } from '@/components/ui/ButtonGroup'`

### TextField and TextArea

- **Default size**: `small` — always pass `size="small"` explicitly. Never leave size unset.
- Only use `size="medium"` or `size="large"` when Figma explicitly specifies it.
- **Always use** `<TextField />` — never raw `<input>`
- **Always use** `<TextArea />` — never raw `<textarea>`

### Forms (No Exceptions)

Never use raw HTML form elements in new designs:


// ✅ Always use
<Checkbox />          // never <input type="checkbox">
<Radio />             // never <input type="radio">
<TextField size="small" />   // never <input>
<Select size="small" />      // never <select>
<TextArea size="small" />    // never <textarea>


### Tags & Badges

- **For OLQ scores**: `client/components/ui/olq-tag.tsx` (OLQTag)
- **For general tags**: `client/components/ui/tag.tsx` (Tag)
- **Never use**: Custom styled spans or Badge component for tags

### Icons

- **NEVER** create inline SVG icons
- **NEVER** install or use external icon libraries (`react-icons`, `heroicons`, `lucide-react`, etc.)
- **ALWAYS** search the existing icon library first — 303+ icons available
- New custom icons go in `client/components/icons-custom/` only — never in the core `icons/` folder
- New icon specs: `20×20` viewBox, `1.5px` stroke, `strokeLinecap="square"`, `currentColor`

```tsx
// ✅ Correct
import { Search, User, Cart } from '@/components/icons';

// ❌ Wrong
import { Search } from 'lucide-react';
```

### Popovers & Overlays

- **ALWAYS use** portal-based LD components — they escape `overflow: hidden` ancestors
- **NEVER** create custom `position: absolute` dropdowns
- **NEVER** install or import from `@radix-ui/*`, `shadcn`, or any external overlay library
- Always include `<PopoverArrow>` inside `<PopoverContent>`
- Use `AlertDialog` (not `Dialog`) for confirmation flows

```tsx
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow } from '@/components/ui/Popover';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/Dialog';
import { AlertDialog } from '@/components/ui/AlertDialog';
```

### Data Tables — Always Use DataTable Component

Never use raw `<table>/<tr>/<td>` in new designs. Always start with the DataTable component system.

```tsx
import { DataTable, DataTableHead, DataTableBody } from '@/components/ui/DataTable';
import { DataTableRow } from '@/components/ui/DataTableRow';
import { DataTableHeader } from '@/components/ui/DataTableHeader';
import { DataTableCell } from '@/components/ui/DataTableCellText';

// DataTable inside a Card → no `rounded` prop (Card provides the frame)
// DataTable standalone → use `rounded` prop
```

Every net-new design that shows tabular data MUST start from DataTable. All instances must include:
- **Column sorting** — pass `onSort` + `sort` props to every `DataTableHeader` where data supports ordering
- **Resizable columns** — pass `resizable` + `onResize` to every `DataTableHeader`; manage widths in component state
- **Cell wrap toggle** — expose a user-controlled option to switch between truncation (default) and wrapping using the `wrap` prop on `DataTableCell`
- Row selection with checkboxes (unless explicitly excluded in Figma)
- Pagination or infinite scroll
- Empty state handling
- Loading/skeleton state

**Wiring the three required features:**

```tsx
// 1. Sorting (controlled — DataTableHeader provides UI, consumer manages state)
const [sortCol, setSortCol] = useState<string | null>(null);
const [sortDir, setSortDir] = useState<'ascending' | 'descending'>('ascending');
const handleSort = (col: string) => {
  if (sortCol === col) setSortDir(d => d === 'ascending' ? 'descending' : 'ascending');
  else { setSortCol(col); setSortDir('ascending'); }
};
<DataTableHeader onSort={() => handleSort('name')} sort={sortCol === 'name' ? sortDir : 'none'}>
  Name
</DataTableHeader>

// 2. Resizable columns (consumer manages widths in state)
const [colWidths, setColWidths] = useState<Record<string, number>>({ name: 200, status: 120 });
<DataTableHeader
  resizable
  width={colWidths.name}
  onResize={(w) => setColWidths(prev => ({ ...prev, name: w }))}
>Name</DataTableHeader>

// 3. Cell wrap toggle (user-controlled per table)
const [wrapCells, setWrapCells] = useState(false);
<Button size="small" variant="tertiary" onClick={() => setWrapCells(w => !w)}>
  {wrapCells ? 'Truncate' : 'Wrap text'}
</Button>
<DataTableCell wrap={wrapCells}>{value}</DataTableCell>
```

A DataTable missing any of these is a bug, not a design choice. If Figma omits them, implement anyway.

### Checkboxes

- **Always use** `<Checkbox />` from `@/components/ui/Checkbox` — never `<input type="checkbox">`
- `size="large"` for confirmation dialogs and prominent single-checkbox flows
- Default (small) size for data tables, filters, and multi-select lists

### Links (No Exceptions — Critical)

- **Always use** `<Link>` from `@/components/ui/Link` — never raw `<a>` tags
- **NEVER** hardcode blue (`#0071DC` or any hex) as a link color
- All link colors MUST come from LD link tokens:
  - `var(--ld-semantic-color-link)` — default
  - `var(--ld-semantic-color-link-subtle)` — subtle/secondary
  - `var(--ld-semantic-color-link-inverse)` — on dark backgrounds
  - `var(--ld-semantic-color-link-visited)` — visited state

### Tabs

- Always use `<Tabs>`, `<TabList>`, `<Tab>`, `<TabPanel>` from `@/components/ui/Tab`
- Never create custom tab implementations

### Panels & Drawers

ALL panels MUST be resizable:
- Min width: `420px`, Max width: `800px`
- Resize handle on left edge with visual indicator
- `localStorage` persistence of user's preferred width
- Responsive behavior for small screens
- Reference: `client/components/RecommendationsPanel.tsx`

### Side Navigation

- Always use `AppSidebar` from `@/components/ui/AppSidebar`
- Pass different `menuItems` to configure links — never recreate the sidebar structure

### Rating

- Always use `<Rating value={n} size="small|medium" />` — never manually render star SVGs
- Never hardcode `#FFC220` — use `var(--ld-semantic-color-rating-fill)`

---

## COMPONENT IMPORT PATHS

```tsx
// ✅ CORRECT — always from local repo
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Tag } from '@/components/ui/tag';
import { OLQTag } from '@/components/ui/olq-tag';
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow } from '@/components/ui/Popover';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/Dialog';
import { Select, SelectItem } from '@/components/ui/Select';

// ❌ WRONG — never from external packages
import { Popover } from '@radix-ui/react-popover';
import { Dialog } from '@radix-ui/react-dialog';
import { Button } from 'shadcn/ui';
```

---

## DESIGN TOKENS — ZERO HARD-CODED VALUES

Never use hex colors, pixel spacing, or font values directly. Always use semantic tokens.

```css
/* ❌ Wrong */
.el { background: #0071DC; padding: 16px; font-size: 14px; border-radius: 8px; }

/* ✅ Correct */
.el {
  background: var(--ld-semantic-color-action-fill-primary);
  padding: var(--ld-primitive-scale-space-200);
  font-size: var(--ld-semantic-font-body-small-size);
  border-radius: var(--ld-primitive-scale-borderradius-100);
}
```

- Use `--ld-semantic-color-*` tokens for ALL colors — never `--ld-primitive-color-*` in components
- Use `--ld-primitive-scale-space-*` for spacing
- Use `--ld-semantic-font-*` for typography
- For separators/dividers: `border: 1px solid var(--ld-semantic-color-separator, #e3e4e5)` — never `border-subtle`

### Key Tokens

| Token | Usage |
|---|---|
| `--ld-semantic-color-action-fill-primary` | Primary button background (Walmart blue) |
| `--ld-semantic-color-action-fill-primary-hovered` | Primary button hover |
| `--ld-semantic-color-action-fill-primary-pressed` | Primary button active |
| `--ld-semantic-color-action-fill-secondary` | Secondary button background |
| `--ld-semantic-color-action-border-secondary` | Secondary button border |
| `--ld-semantic-color-action-fill-destructive` | Destructive action (red) |
| `--ld-semantic-color-action-focus-outline` | Focus ring |
| `--ld-semantic-color-text` | Body text |
| `--ld-semantic-color-text-subtle` | Secondary text |
| `--ld-semantic-color-text-subtlest` | Tertiary/helper text |
| `--ld-semantic-color-text-brand` | Brand text |
| `--ld-semantic-color-text-negative` | Error text |
| `--ld-semantic-color-text-positive` | Success text |
| `--ld-semantic-color-surface` | Card / panel surface |
| `--ld-semantic-color-separator` | Dividers and section separators |
| `--ld-semantic-color-link` | Default link color (never hardcode blue) |
| `--ld-semantic-color-link-subtle` | Subtle link color |
| `--ld-semantic-color-link-inverse` | Link on dark backgrounds |
| `--ld-semantic-color-rating-fill` | Star rating fill |
| `--ld-semantic-font-family-sans` | Everyday Sans UI |

---

## INLINE STYLES VS CSS MODULES

Use CSS modules for everything static. Only use inline styles for values that change per render.

```tsx
// ❌ Wrong — belongs in CSS module
<div style={{ padding: '16px', fontFamily: 'Everyday Sans UI', borderRadius: '8px' }}>

// ✅ Correct — only for dynamic values
<div style={{ width: panelWidth + 'px' }}>
<div style={{ top: tooltipY + 'px' }}>
<div style={{ width: progress + '%' }}>
```

Never inline: background colors, padding, gap, font-family, font-size, border-radius, or any token-based value.

---

## PAGE LAYOUT — STANDARD SHELL REQUIRED

Every page must use the layout shell. Never render nav/header/footer directly in page files — the layout wrapper provides them automatically.

- Never add `max-width` constraints on page content containers
- Use `align-items: stretch` (not `center`) on flex column containers
- Standard padding: `32px → 24px → 16px → 12px` at breakpoints `1024px / 768px / 480px`
- Multi-column grids must stack at `768px`
- All spacing uses 8px multiples

```tsx
// ❌ Wrong — shell components already provided by layout
export default function MyPage() {
  return (
    <>
      <DesktopHeader />
      <BottomNav />
      <div>Page content</div>
    </>
  );
}

// ✅ Correct — page content only
export default function MyPage() {
  return <div className={styles.page}>{/* content */}</div>;
}
```

---

## ANIMATIONS

Every animation MUST include a `@media (prefers-reduced-motion: reduce)` override. No exceptions.

Standard durations: `150ms` (micro), `250ms` (standard), `400ms` (complex), `2500ms` (insertion glow).

Never create a custom spinner — use the existing `Spinner` component.

---

## EXTERNAL LIBRARY POLICY (HARD RULE)

Never install or import from:
- `shadcn/ui`, `@radix-ui/*`, `@headlessui/*`
- `@mui/*`, `antd`, `chakra-ui`
- `react-icons`, `heroicons`, `lucide-react`
- Any other third-party component or icon library

All UI components must come from `client/components/ui/`. All icons from `client/components/icons/`. If a needed component doesn't exist, build it using LD 3.5 design tokens.

---

## THEME COMPLIANCE — PRE-COMPLETION REQUIREMENT

Every new component and page MUST pass before considered done:

1. Zero hardcoded hex colors in component/page CSS
2. Zero `--ld-primitive-color-*` references in component CSS
3. Zero hardcoded `font-size`, `padding`, `border-radius` values
4. Zero hardcoded link colors (blue or any hex) — use link tokens
5. Switch to Bodega (green) theme → brand colors must be green, not blue
6. Switch to Walmart Legacy theme → verify correct rendering

---

## PRE-TASK CHECKLIST

Before completing any task, verify:

- [ ] No `@radix-ui/*` imports
- [ ] No Shadcn patterns or lowercase component files
- [ ] No hard-coded hex colors anywhere (including link colors)
- [ ] No hard-coded px spacing values
- [ ] No inline SVGs
- [ ] No external icon libraries
- [ ] No raw `<button>`, `<a>`, `<table>`, `<input>`, `<select>`, `<textarea>` elements
- [ ] No custom sidebar, tab, or dropdown implementations
- [ ] No `max-width` on page content containers
- [ ] No `disabled` prop on buttons
- [ ] All styles use `var(--ld-semantic-*)` tokens exclusively
- [ ] All link colors use `var(--ld-semantic-color-link-*)` tokens
- [ ] All icons from `@/components/icons`
- [ ] TextField/TextArea/Select defaulting to `size="small"`
- [ ] Buttons defaulting to `size="medium"`
- [ ] Responsive breakpoints implemented for any new grid or multi-column layout
- [ ] `prefers-reduced-motion` override added for any animations
- [ ] Theme compliance check passed

---

## PM ONBOARDING & PRD WORKFLOW

### When a PM or non-developer starts a session

1. Direct them to the Getting Started guide: `.builder/templates/PM_GETTING_STARTED.md`
2. Run the **Feature Quiz**:
   - **Q1**: What type of data feature? (performance dashboard / data table / chart / metric cards / recommendation list / filter controls / detail view / form)
   - **Q2**: What data are you working with? (metrics, volume, time dimension, comparisons)
   - **Q3**: Do you have a PRD? (yes / no / rough notes)
   - **Q4**: Do you have a Figma design? (link / screenshot / no)
3. Based on answers, activate the appropriate skill from `.builder/rules/`

### When a user provides a PRD

1. Parse against the PRD template structure (`.builder/templates/SKILL_PRD_TEMPLATE.md`)
2. Map requirements to LD 3.5 components using the `implement-from-prd` skill
3. Identify applicable rules and design tokens
4. Generate an implementation plan with component/token references
5. Confirm the plan with the user before writing code

### When a user has no PRD

Walk them through the PRD template section by section, asking questions to fill each part. Generate a complete PRD, then follow the PRD workflow above.

### Available Skills

| Skill | File | Trigger |
|---|---|---|
| Implement from PRD | `.builder/rules/implement-from-prd.mdc` | User provides a PRD or requirements doc |
| Build new page | `.builder/rules/build-new-page.mdc` | "Create a dashboard", "Build a page" |
| Build data table | `.builder/rules/build-data-table.mdc` | "Create a table", "Show data in a grid" |
| Build chart | `.builder/rules/build-chart.mdc` | "Create a chart", "Visualize data" |
| Build metric cards | `.builder/rules/build-metric-cards.mdc` | "Show KPIs", "Metric tiles", "Summary stats" |
| Build filter controls | `.builder/rules/build-filter-controls.mdc` | "Add filters", "Date range picker", "Segment data" |
| Build detail view | `.builder/rules/build-detail-view.mdc` | "Drill-down panel", "Detail view", "Expand row" |
| Build form | `.builder/rules/build-form.mdc` | "Create a form", "Add input fields" |
| Implement from Figma | `.builder/rules/implement-from-figma.mdc` | User provides Figma link or screenshot |

### Templates

| Template | File | Purpose |
|---|---|---|
| PRD Template | `.builder/templates/SKILL_PRD_TEMPLATE.md` | Structured feature requirements |
| PM Getting Started | `.builder/templates/PM_GETTING_STARTED.md` | Onboarding guide with quiz flow |

---

## QUICK LINKS

| Resource | Location |
|---|---|
| Component specs | `guidelines/components/` |
| Design tokens | `guidelines/design-system/DesignTokens.md` |
| Icon library | `client/components/icons/` + `/component-library#icons` |
| Full project rules | `guidelines/PROJECT_AGENT_RULES.md` |
| Responsive layout rule | `guidelines/rules/RULE_ResponsiveLayout.md` |
| Animation rule | `guidelines/rules/RULE_AnimationAndMotion.md` |
| Theme compliance | `guidelines/rules/RULE_ThemeCompliance.md` |
| PRD template | `.builder/templates/SKILL_PRD_TEMPLATE.md` |
| PM getting started | `.builder/templates/PM_GETTING_STARTED.md` |
| Charts & graphs rule | `guidelines/rules/RULE_ChartsAndGraphs.md` |
