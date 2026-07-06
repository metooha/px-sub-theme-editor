# Getting Started for PMs

> **Welcome!** This guide helps Product Managers create data-rich features in the Walmart Connect design system project. You don't need to write code — the AI agent handles implementation. Your job is to clearly describe **what** you want built.

---

## How It Works

1. **You describe** the feature you want (using a PRD or the guided quiz below)
2. **The agent analyzes** your requirements against our design system rules
3. **The agent builds** the feature using approved LD 3.5 components and design tokens
4. **You review** the result in the live preview and provide feedback

---

## Quick Start: The Feature Quiz

Copy and paste this prompt into the chat to start the guided quiz:

```
I'm a PM and I want to create a new feature. Please run the feature quiz to help me get started.
```

The agent will walk you through these questions:

### Question 1 — What type of data feature are you building?

> "What type of data feature are you building?"

| Option | Description | Examples |
|---|---|---|
| **A. Performance dashboard** | A page that surfaces KPIs, trends, and summary metrics | Campaign overview, ad spend tracker, weekly performance report |
| **B. Data table / report** | Tabular data with sorting, filtering, and export | Keyword performance table, item-level sales grid, campaign list |
| **C. Chart / data visualization** | Visual representation of trends, comparisons, or distributions | Impressions over time (line), spend by channel (pie), ROAS trend (area) |
| **D. Metric cards / KPI tiles** | Highlighted numbers with labels and trend indicators | Total spend card, ROAS summary, conversion rate tile |
| **E. Recommendation / action list** | Cards or rows that suggest actions the user can take | Budget optimization cards, keyword suggestions, bid adjustments |
| **F. Filter & segmentation controls** | Dropdowns, date pickers, and toggles that slice data | Date range picker, campaign type filter, advertiser selector |
| **G. Detail / drill-down view** | Expanded view when clicking into a row or card | Campaign detail panel, item performance breakdown, keyword analysis |
| **H. Form / data entry** | Inputs for creating or editing data entities | Campaign builder, budget editor, bid adjustment form |

### Question 2 — What data are you working with?

> "Describe your data briefly."

The agent will ask:
- **What metrics or fields?** (e.g., impressions, clicks, ROAS, spend, conversion rate)
- **How many rows/items?** (e.g., 5 campaigns, 500 keywords, 10k items)
- **Time dimension?** (e.g., daily, weekly, date range, no time component)
- **Comparisons?** (e.g., current vs previous period, plan vs actual, by channel)

### Question 3 — Do you have a PRD?

> "Do you have a PRD (Product Requirements Document) for this feature?"

| Option | What happens next |
|---|---|
| **Yes, I have a PRD** | Drop the PRD file into the project or paste it. The agent parses it, maps it to LD components, and generates an implementation plan. |
| **No, help me write one** | The agent walks you through our PRD template section by section, asking questions to fill in each part. |
| **I have rough notes** | Share what you have. The agent structures it into a proper PRD and asks follow-up questions to fill gaps. |

### Question 4 — Design reference?

> "Do you have a Figma design or visual reference?"

| Option | What happens next |
|---|---|
| **Yes, Figma link** | Paste the Figma URL. The agent extracts the design and maps it to LD components. |
| **Yes, screenshot** | Upload the image. The agent interprets the visual and maps it to components. |
| **No, use defaults** | The agent uses standard LD 3.5 patterns and asks clarifying questions about layout. |

---

## Working With a PRD

### If You Have a PRD

1. Open or create your PRD using our template: `.builder/templates/SKILL_PRD_TEMPLATE.md`
2. Fill out as many sections as you can (it's OK to leave some as "TBD")
3. Drop the file into the project or paste the content into the chat
4. Tell the agent: **"Here's my PRD, please analyze it and create an implementation plan"**

The agent will:
- Parse your PRD against our design system rules
- Identify which LD components match your requirements
- Flag any requirements that conflict with our design rules
- Generate a step-by-step implementation plan
- Ask clarifying questions about anything unclear

### If You Don't Have a PRD

Tell the agent: **"I want to build [describe feature]. Help me write a PRD."**

The agent will ask you questions based on our template:

1. **What does it do?** (one-liner description)
2. **Who is it for?** (user story: As a ___, I want ___, so that ___)
3. **What data fields/metrics?** (columns, KPIs, dimensions)
4. **How is data structured?** (flat list, grouped, hierarchical, time-series)
5. **What are the requirements?** (acceptance criteria — numbered list)
6. **Where does it live?** (standalone page, inside a panel, in a modal, etc.)
7. **What interactions?** (sort, filter, drill-down, apply, export)
8. **What edge cases?** (empty data, errors, large datasets, long text)

After answering, the agent generates a complete PRD you can review before implementation begins.

---

## Data Feature Patterns

These are the most common data-rich patterns available in the design system. Reference them by name when describing what you want.

### Performance Dashboard Pattern
A page with metric cards at the top, a primary chart in the middle, and a data table below.
- **Components**: Metric cards, ChartContainer, DataTable
- **Skill**: `build-new-page` + `build-chart` + `build-data-table`

### Data Table with Filters Pattern
A filterable, sortable table with column resizing, row selection, and export.
- **Components**: DataTable, Select (filters), Button (actions), Tag (status)
- **Skill**: `build-data-table`

### KPI Card Grid Pattern
A responsive grid of metric cards showing key numbers with trend indicators.
- **Components**: Card, Tag (trend), custom metric layout
- **Skill**: `build-new-page`

### Recommendation Cards Pattern
Horizontal carousel or vertical list of actionable cards with apply/dismiss actions.
- **Components**: Card, Button, Divider, custom carousel
- **Skill**: `implement-from-prd`

### Chart + Summary Pattern
A chart with a legend, time controls, and summary statistics alongside.
- **Components**: ChartContainer, Select (time range), metric labels
- **Skill**: `build-chart`

### Detail Panel Pattern
A resizable side panel that opens when clicking a table row or card.
- **Components**: Resizable panel, DataTable (detail rows), Button, Tag
- **Skill**: `build-new-page`

---

## PRD Template Quick Reference

Our PRD template has 14 sections. Here are the most important ones for data features:

| Section | Why It Matters |
|---|---|
| **Feature Type** | Tells the agent which data pattern and components to use |
| **Acceptance Criteria** | Defines "done" — the agent checks each criterion |
| **Data Shape** | The most critical section — tells the agent what fields, types, and relationships exist |
| **Interactions & States** | Sort, filter, drill-down, export — maps every action to behavior |
| **Edge Cases** | Empty data, large datasets, slow APIs, missing fields |

---

## Tips for Better Results

### Be Specific About Data Fields
Instead of: "Show campaign metrics"
Say: "Show a table with columns: campaign name (text), daily budget (currency), ROAS (decimal to 2 places), status (active/paused as a tag), impressions (number with commas)"

### Describe the Data Volume
Instead of: "Show the campaigns"
Say: "Show up to 500 campaigns with pagination (20 per page), sortable by any column"

### Specify Comparisons
Instead of: "Show trends"
Say: "Line chart with two series: current period impressions vs previous period impressions, x-axis is weekly"

### Reference Existing Features
Instead of: "Make it look like that other table"
Say: "Use the same table layout as the Campaign Dashboard page at `/campaigns`"

### State What's Out of Scope
Listing what you DON'T want is just as important as what you do. It prevents the agent from over-building.

---

## What the Agent Knows

The agent has access to all of our design system rules, including:

- **32+ LD 3.5 components** (Button, Card, DataTable, Select, TextField, etc.)
- **303+ icons** in the icon library
- **624+ design tokens** (colors, spacing, typography, elevation)
- **8 chart color tokens** for data visualization series
- **16+ enforcement rules** (no hard-coded colors, no external libraries, responsive layouts, etc.)
- **Recharts** charting library (line, bar, area, pie, scatter, and more)

You don't need to know any of this — the agent applies it automatically. But if you want to see what's available, ask: **"Show me the component library"** or visit `/component-library` in the preview.

---

## Example Prompts

### Dashboard
> "Build a campaign performance dashboard with total spend, ROAS, and conversion rate cards at the top, an impressions line chart in the middle, and a sortable campaign table below."

### Data table
> "Create a keyword performance table with columns: keyword, match type, impressions, clicks, CTR, spend, ROAS. Sortable, filterable by match type, with pagination."

### Chart
> "Create a stacked bar chart showing ad spend by channel (search, display, social) broken down by month for the last 6 months."

### Metric cards
> "Show 4 KPI cards in a row: total spend ($), total impressions, average ROAS, and conversion rate. Each with a green/red trend arrow compared to last period."

### Recommendations
> "Build a recommendation carousel that shows optimization suggestions. Each card has a title, description, key metrics, and Apply/Dismiss buttons."

### Starting from scratch
> "I want to build a new data feature but I'm not sure where to start. Run the feature quiz."

---

## FAQ

**Q: Do I need to know React or TypeScript?**
No. Describe what you want in plain language. The agent handles all code.

**Q: Can I iterate on the design after it's built?**
Yes. Just describe what you want changed: "Add a ROAS column to the table", "Change the chart to a bar chart", "Make the cards show percentage change".

**Q: What if I disagree with the agent's approach?**
Tell it. The agent follows your direction. If your request conflicts with a design rule, the agent will explain why and suggest alternatives.

**Q: How do I see my changes?**
Changes appear in the live preview automatically. You can also [Open Preview](#open-preview) for a full-screen view.

**Q: How do I share my work?**
Push your changes using the button in the top right, or [Open Preview](#open-preview) to share the preview link.
