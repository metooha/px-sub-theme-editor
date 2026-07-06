---
name: build-filter-controls
description: When a user asks to create filters, segmentation controls, or data slicing UI, use this skill to build them with LD Select, DatePicker, and FilterChip components
---
# Skill: Build Filter & Segmentation Controls

## When to Use

- User says "add filters", "date range picker", "filter by status", "segment the data"
- Quiz answer: "Filter & segmentation controls"

## Pre-Implementation Questions

1. **Filter fields**: What dimensions can be filtered? (status, date range, category, advertiser)
2. **Filter types**: Dropdown (single select), multi-select, date range, search/autocomplete?
3. **Placement**: Above a table, in a toolbar, in a side panel?
4. **Behavior**: Instant filter (on change) or apply button?

## Component Mapping

| Filter type | Component |
|---|---|
| Single dropdown | `Select` from `@/components/ui/Select` — size small |
| Multi-select | `Select` with multi-select pattern or `FilterChip` from `@/components/ui/FilterChip` |
| Date range | DateRangePicker per `guidelines/DateRangePicker.md` |
| Single date | DateField per `guidelines/components/DateField.md` |
| Search | `TextField` from `@/components/ui/TextField` — size small, with search icon |
| Clear all | `Button` variant tertiary, size small |

## Layout Pattern


<div style={{
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--ld-primitive-scale-space-100)',
  alignItems: 'flex-end',
}}>
  <Select size="small" label="Status">...</Select>
  <Select size="small" label="Campaign Type">...</Select>
  <Button size="small" variant="tertiary">Clear all</Button>
</div>
```

## Component Defaults

- ALL filter controls: `size="small"` (32px)
- Buttons inline with filters: `size="small"` to match
- Labels: use the component's built-in label prop

## Anti-Patterns

- NEVER use raw `<select>` or `<input>` for filters
- NEVER use `size="medium"` or `size="large"` for filter controls unless Figma specifies
- NEVER hard-code filter options — derive from data or props