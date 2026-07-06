---
name: build-chart
description: When a user asks to create a chart, graph, or data visualization, use this skill to build it with Recharts and LD semantic chart tokens
---
# Skill: Build a Chart or Graph

## When to Use

- User says "create a chart", "visualize data", "show a graph", "build a pie chart"
- PRD feature type is "Chart or data visualization"

## Pre-Implementation Questions

1. **Chart type**: Line, bar, area, pie/donut, or combination?
2. **Data series**: How many series? What are their labels?
3. **X-axis**: What is the x-axis? (dates, categories, labels)
4. **Data source**: API endpoint, mock data, or static?

## Required Guidelines

- `guidelines/rules/RULE_ChartsAndGraphs.md` — chart tokens, architecture, checklist

## Architecture

ALL charts use `ChartContainer` + `ChartConfig` from `@/components/ui/Chart`. Never use raw Recharts.


import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
  ChartLegend, ChartLegendContent, type ChartConfig,
} from '@/components/ui/Chart';
```

## Color Tokens

Use `--ld-semantic-color-chart-categorical-{1-8}` in sequential order:

```tsx
const chartConfig: ChartConfig = {
  series1: { label: 'Series 1', color: 'var(--ld-semantic-color-chart-categorical-1, #002e99)' },
  series2: { label: 'Series 2', color: 'var(--ld-semantic-color-chart-categorical-2, #df74b1)' },
  series3: { label: 'Series 3', color: 'var(--ld-semantic-color-chart-categorical-3, #cc851a)' },
};
```

## Required Features

Every chart MUST include:
- `<ChartTooltip content={<ChartTooltipContent />} />` for hover data
- `<ChartLegend content={<ChartLegendContent />} />` when 2+ series
- `tickLine={false} axisLine={false}` on axes for clean appearance
- `prefers-reduced-motion` handling for animations
- `aria-label` on ChartContainer wrapper

## Recharts Only

Never install chart.js, d3 (for rendering), nivo, visx, victory, highcharts, or apexcharts.

## Anti-Patterns

- NEVER hard-code hex colors on chart elements
- NEVER use legacy `--chart-*` tokens
- NEVER bypass ChartContainer with raw `<ResponsiveContainer>`
- NEVER skip tooltip or legend