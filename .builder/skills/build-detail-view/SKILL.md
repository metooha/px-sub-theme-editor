---
name: build-detail-view
description: When a user asks to create a drill-down view, detail panel, or expanded item view, use this skill to build it with a resizable panel and LD components
---
# Skill: Build a Detail / Drill-Down View

## When to Use

- User says "detail view", "drill-down", "expand row", "side panel with details"
- Quiz answer: "Detail / drill-down view"

## Pre-Implementation Questions

1. **Trigger**: How does the user open this view? (click a table row, click a card, click an icon button)
2. **Content**: What data to show in the detail view? (more fields, sub-tables, charts, history)
3. **Actions**: Any actions in the detail view? (edit, approve, dismiss, export)
4. **Position**: Side panel (right), modal, or inline expansion?

## Panel Requirements (if side panel)

Per project rules, ALL panels MUST be resizable:
- Min width: `420px`, Max width: `800px`
- Resize handle on left edge with visual indicator
- `localStorage` persistence of user's preferred width
- Responsive behavior for small screens
- Reference implementation: `client/components/RecommendationsPanel.tsx`

## Required Guidelines

- `guidelines/components/Panel.md`
- `.builderrules` — Panels & Drawers section

## Component Mapping

| Element | Component |
|---|---|
| Panel container | Custom resizable div or reference RecommendationsPanel pattern |
| Close button | `IconButton` variant ghost, size medium, with X icon |
| Section headers | `--ld-semantic-font-body-large-*` weight bold |
| Detail fields | Label + value pairs using caption + body tokens |
| Sub-table | `DataTable` (with full sorting/resizing/wrap requirements) |
| Actions | `Button` primary/secondary at panel bottom |
| Dividers | `Divider` component between sections |

## Anti-Patterns

- NEVER use fixed-width panels — always resizable
- NEVER skip localStorage persistence for panel width
- NEVER put a DataTable inside a panel without sorting/resizing/wrap