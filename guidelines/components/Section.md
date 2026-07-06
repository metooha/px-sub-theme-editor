# Section

Hierarchical content grouping components for organizing page layouts with varying levels of visual emphasis.

## Components

| Component | Purpose | Elevation | Title Size |
|---|---|---|---|
| `PrimarySection` | Top-level page sections | `elevation-200` | 20px / bold |
| `SecondarySection` | Sub-sections within a page | `elevation-100` | 18px / semibold |
| `TertiarySection` | Nested groupings | flat (border) | 16px / semibold |

## Import

```tsx
import { PrimarySection, SecondarySection, TertiarySection } from '@/components/ui/Section';
```

## Props (shared across all three)

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Optional heading text |
| `description` | `string \| ReactNode` | — | Optional subtitle below heading |
| `children` | `ReactNode` | required | Section content |
| `divider` | `boolean` | `false` | Divider line between header and content |
| `actions` | `ReactNode` | — | Action buttons in header row (right-aligned) |
| `collapsible` | `boolean` | `false` | Whether section can collapse |
| `defaultOpen` | `boolean` | `true` | Initial state when collapsible |

## Usage

### Basic

```tsx
<PrimarySection title="Page Section" description="Top-level grouping">
  <p>Content here</p>
</PrimarySection>
```

### With actions

```tsx
<SecondarySection
  title="Settings"
  actions={<Button variant="secondary" size="medium">Edit</Button>}
>
  <p>Settings content</p>
</SecondarySection>
```

### Collapsible

```tsx
<TertiarySection title="Advanced Options" collapsible defaultOpen={false}>
  <p>Hidden by default</p>
</TertiarySection>
```

### Nested hierarchy

```tsx
<PrimarySection title="Dashboard" divider>
  <SecondarySection title="Metrics">
    <TertiarySection title="Revenue">
      <p>Revenue data</p>
    </TertiarySection>
  </SecondarySection>
</PrimarySection>
```

## When to use

- Grouping related content on a page with clear visual hierarchy
- Creating collapsible sections for optional/advanced content
- Organizing forms, settings, or dashboards into logical groups

## When NOT to use

- For simple card-style containers, use `Card` instead
- For full-page layout shells, use the standard page layout pattern
- For accordion-style lists of items, use `Accordion`

## Design Tokens

All styling uses LD semantic tokens exclusively. No hardcoded values.

- Spacing: `--ld-primitive-scale-space-*`
- Typography: `--ld-semantic-font-*` / `--ld-primitive-font-size-*`
- Colors: `--ld-semantic-color-text`, `--ld-semantic-color-text-subtle`, `--ld-semantic-color-surface`
- Elevation: `--ld-semantic-elevation-100`, `--ld-semantic-elevation-200`
- Borders: `--ld-semantic-color-separator`
