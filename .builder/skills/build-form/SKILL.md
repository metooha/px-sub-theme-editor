---
name: build-form
description: When a user asks to create a form, input flow, or data entry UI, use this skill to build it with LD form components at correct default sizes
---
# Skill: Build a Form

## When to Use

- User says "create a form", "add input fields", "build a settings editor"
- PRD feature type is "Form or input flow"

## Pre-Implementation Questions

1. **Fields**: What fields are needed? (name, type, required/optional, validation)
2. **Layout**: Single column or multi-column? Inline labels or stacked?
3. **Submission**: What happens on submit? (API call, local state update, navigation)
4. **Validation**: Any field-level validation? (required, min/max, format)

## Required Guidelines

- `.builderrules` — Forms section ("No Exceptions")
- Component guidelines for TextField, Select, Checkbox, TextArea

## Component Defaults

ALL form controls default to `size="small"` (32px height):


<TextField label="Name" size="small" />
<TextArea label="Description" size="small" />
<Select label="Category" size="small">
  <SelectItem value="a">Option A</SelectItem>
</Select>
<Checkbox>Accept terms</Checkbox>
```

Only use `size="medium"` or `size="large"` when Figma explicitly specifies it.

## Never Use Raw HTML

```tsx
// ❌ NEVER
<input type="text" />
<textarea />
<select><option>...</option></select>
<input type="checkbox" />

// ✅ ALWAYS
<TextField />
<TextArea />
<Select><SelectItem /></Select>
<Checkbox />
```

## Button Sizing in Forms

When a button sits inline with `size="small"` form controls, the button must also be `size="small"`:

```tsx
<Select size="small">...</Select>
<Button size="small">Export</Button>  // matches adjacent small controls
```

Standalone form submit buttons use `size="medium"`:

```tsx
<Button variant="primary" size="medium">Save</Button>
```

## Form Layout

```tsx
<form style={{
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--ld-primitive-scale-space-200)',
}}>
  <TextField label="Campaign Name" size="small" required />
  <TextField label="Daily Budget" size="small" type="number" />
  <Select label="Status" size="small">
    <SelectItem value="active">Active</SelectItem>
    <SelectItem value="paused">Paused</SelectItem>
  </Select>
  <ButtonGroup>
    <Button variant="secondary" size="medium">Cancel</Button>
    <Button variant="primary" size="medium">Save</Button>
  </ButtonGroup>
</form>
```

## Responsive

Form rows with multiple fields side-by-side must stack vertically at 768px breakpoint.

## Anti-Patterns

- NEVER use `disabled` prop on buttons — change the label instead
- NEVER use raw `<input>`, `<select>`, `<textarea>` elements
- NEVER hard-code form field heights or padding