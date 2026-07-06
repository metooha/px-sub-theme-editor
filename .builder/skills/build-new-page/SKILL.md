---
name: build-new-page
description: When a user asks to create a new page or view, use this skill to scaffold it correctly with the standard shell, responsive layout, and LD components
---
# Skill: Build a New Page

## When to Use

- User says "create a new page", "add a page for...", "build a view for..."
- PRD feature type is "New page or view"

## Pre-Implementation Questions

Before building, ask:

1. **Route**: What URL path should this page live at? (e.g., `/campaigns`, `/reports/weekly`)
2. **Title**: What is the page heading?
3. **Layout**: Single column, two-column, or grid?
4. **Data**: Does this page fetch data from an API or use static content?

## Required Guidelines

Read before implementing:
- `guidelines/rules/RULE_ResponsiveLayout.md` — page shell, breakpoints, padding
- `.builderrules` — page layout section ("Standard Shell Required")

## Page Shell Rules

Every page MUST:
- Render content ONLY — MastHead, AppSidebar, and layout shell are provided by the app wrapper
- Fill full available width (NO `max-width` on content containers)
- Use `align-items: stretch` on flex column containers
- Use standard padding: `32px → 24px → 16px → 12px` at breakpoints `1024px / 768px / 480px`


// ✅ CORRECT — page content only
export default function MyPage() {
  return <div className={styles.page}>{/* content */}</div>;
}

// ❌ WRONG — never render shell components in page files
export default function MyPage() {
  return (
    <>
      <DesktopHeader />
      <div>Page content</div>
    </>
  );
}
```

## File Structure

```
client/pages/
  [PageName].tsx          ← Main page component (route entry)
  [PageName].module.css   ← CSS module for static styles
  [page-name]/
    SectionOne.tsx        ← Break into sub-components if complex
    SectionTwo.tsx
```

## Responsive Requirements

```css
.page {
  width: 100%;
  padding: var(--ld-primitive-scale-space-400) var(--ld-primitive-scale-space-400);
}

@media (max-width: 1024px) {
  .page { padding: var(--ld-primitive-scale-space-300); }
}

@media (max-width: 768px) {
  .page { padding: var(--ld-primitive-scale-space-200); }
  /* Stack multi-column layouts */
}

@media (max-width: 480px) {
  .page { padding: var(--ld-primitive-scale-space-150); }
}
```

## Routing

Add the route to `client/App.tsx` inside the existing route configuration. Follow the existing pattern for lazy-loaded pages.

## Component Defaults

- Buttons: `size="medium"`, appropriate variant
- Form controls: `size="small"`
- Cards: elevation shadow, not borders
- All spacing: 8px multiples via tokens
- All colors: semantic tokens only