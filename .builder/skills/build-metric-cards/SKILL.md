---
name: build-metric-cards
description: When a user asks to create KPI tiles, metric cards, or summary stat displays, use this skill to build them with LD Card components and semantic tokens
---
# Skill: Build Metric Cards / KPI Tiles

## When to Use

- User says "show KPIs", "metric cards", "summary stats", "performance tiles"
- Quiz answer: "Metric cards / KPI tiles"

## Pre-Implementation Questions

1. **Metrics**: What KPIs to show? (name, value format: currency/percentage/number, label)
2. **Trend indicators**: Show change vs previous period? (arrow up/down, green/red, percentage delta)
3. **Grid layout**: How many cards per row? (typically 3-4 on desktop, stacks on mobile)
4. **Click behavior**: Are cards clickable? (drill-down to detail view?)

## Component Mapping

| Element | Component / Token |
|---|---|
| Card container | `Card` from `@/components/ui/Card` — elevation, not borders |
| Metric value | `--ld-semantic-font-body-large-*` or heading tokens, weight bold |
| Metric label | `--ld-semantic-font-caption-*`, color `--ld-semantic-color-text-subtle` |
| Positive trend | `--ld-semantic-color-text-positive` (green) |
| Negative trend | `--ld-semantic-color-text-negative` (red) |
| Trend icons | Use existing icons from `@/components/icons` (ArrowUp, ArrowDown, TrendUp) |

## Layout Pattern


<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
  gap: 'var(--ld-primitive-scale-space-200)',
}}>
  {metrics.map(m => <MetricCard key={m.id} {...m} />)}
</div>
```

Cards must stack at 768px breakpoint.

## Anti-Patterns

- NEVER use borders on metric cards — use elevation
- NEVER hard-code green/red colors — use semantic positive/negative tokens
- NEVER skip responsive grid — cards must wrap on narrow screens