---
name: implement-from-figma
description: When a user provides a Figma design or screenshot to implement, use this skill to map the design to LD components and tokens
---
# Skill: Implement from Figma Design

## When to Use

- User says "implement this Figma", "build this design", "match this screenshot"
- A Figma design file or screenshot is provided

## Pre-Implementation Questions

1. **Breakpoints**: Is this design for desktop only, or should it be responsive?
2. **States**: Are hover, active, focus, and disabled states shown? If not, should we add them?
3. **Data**: Is the content in the design real data or placeholder? Should we use mock data?

## Required Guidelines

- `guidelines/rules/RULE_FigmaAssetExtraction.md` — asset export policy
- `guidelines/rules/RULE_DesignTokenEnforcement.md` — token mapping
- `.builderrules` — all component and token rules

## Step 1: Analyze the Design

Identify every UI element in the Figma:
- Buttons → `Button` component, determine variant from fill color
- Text inputs → `TextField` or `TextArea`, size small default
- Dropdowns → `Select`, size small default
- Cards → `Card` or custom div with elevation tokens
- Tables → `DataTable` system
- Icons → Search existing 303+ icons first, never inline SVG
- Images → Export from Figma, use descriptive filenames

## Step 2: Map Colors to Tokens

NEVER extract hex values from Figma and use them directly. Map every color to a semantic token:

| Figma color | LD token |
|---|---|
| Blue fill (buttons) | `--ld-semantic-color-action-fill-primary` |
| Dark text (#2E2F32) | `--ld-semantic-color-text` |
| Gray text (#74767C) | `--ld-semantic-color-text-subtle` |
| White surface | `--ld-semantic-color-surface` |
| Light gray bg (#F8F8F8) | `--ld-semantic-color-fill-subtle` |
| Border gray (#E3E4E5) | `--ld-semantic-color-separator` |
| Green text | `--ld-semantic-color-text-positive` |
| Red text | `--ld-semantic-color-text-negative` |

## Step 3: Map Spacing

Map pixel values from Figma to spacing tokens:

| Figma px | LD token |
|---|---|
| 4px | `--ld-primitive-scale-space-50` |
| 8px | `--ld-primitive-scale-space-100` |
| 12px | `--ld-primitive-scale-space-150` |
| 16px | `--ld-primitive-scale-space-200` |
| 24px | `--ld-primitive-scale-space-300` |
| 32px | `--ld-primitive-scale-space-400` |

## Step 4: Export Assets

- EVERY image visible in Figma must be exported and used
- NEVER replace images with gray boxes or placeholder services
- Use semantic filenames (not `image-1.png`)
- Save to `public/images/` or `public/illustrations/`

## Step 5: Build

Implement one section at a time, top to bottom. After each section:
- Verify colors use semantic tokens (no hex)
- Verify spacing uses token values
- Verify components come from `@/components/ui/`
- Check responsive behavior

## Anti-Patterns

- NEVER extract hex colors from Figma and use them as-is
- NEVER replace Figma images with gray boxes or placeholder URLs
- NEVER use inline SVG for icons — search the icon library first
- NEVER skip responsive implementation for desktop-only designs