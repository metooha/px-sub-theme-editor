# PRD Template — [Feature Name]

> **Instructions for PMs**: Fill out each section below. The more detail you provide, the better the implementation will be. If you're unsure about a section, write "TBD" and the agent will ask follow-up questions.

---

## 1. Overview

**Feature Name**: [e.g., Campaign Recommendations Carousel]

**One-liner**: [One sentence describing what this feature does]

**Data Feature Type** (check one):
- [ ] Performance dashboard (KPIs, trends, summary metrics)
- [ ] Data table / report (sortable, filterable tabular data)
- [ ] Chart / data visualization (line, bar, area, pie, scatter)
- [ ] Metric cards / KPI tiles (highlighted numbers with trend indicators)
- [ ] Recommendation / action list (actionable cards or rows)
- [ ] Filter & segmentation controls (dropdowns, date pickers, toggles)
- [ ] Detail / drill-down view (expanded view from row or card click)
- [ ] Form / data entry (create or edit data entities)

**Data Description**:
- **Key metrics/fields**: [e.g., impressions, clicks, ROAS, spend, conversion rate]
- **Data volume**: [e.g., 50 campaigns, 500 keywords, 10k items]
- **Time dimension**: [e.g., daily, weekly, date range, none]
- **Comparisons**: [e.g., current vs previous period, plan vs actual, by channel]

---

## 2. User Story

> As a **[role]**, I want to **[action]**, so that **[outcome]**.

Example: As an **advertiser**, I want to **see actionable recommendations in a carousel**, so that **I can quickly review and apply optimizations to my campaigns**.

---

## 3. Acceptance Criteria

List the specific conditions that must be true for this feature to be considered complete. Be as specific as possible.

1. [ ] [Criterion 1 — e.g., "Carousel displays up to 6 recommendation cards"]
2. [ ] [Criterion 2 — e.g., "Adjacent cards are partially visible (peekaboo effect)"]
3. [ ] [Criterion 3 — e.g., "User can swipe/drag to navigate between cards"]
4. [ ] [Criterion 4]
5. [ ] [Criterion 5]

---

## 4. Design Reference

**Figma Link**: [Paste Figma URL here, or write "No design — use defaults"]

**Design Notes** (if no Figma):
- Layout description: [e.g., "Horizontal carousel with 20px peek on each side"]
- Color/style notes: [e.g., "Cards use elevation shadows, not borders"]
- Responsive behavior: [e.g., "Single column on mobile, carousel on desktop"]

---

## 5. Data Requirements

**Data Source**: [API endpoint, mock data, static content, or real-time]

**Data Shape** (describe or paste example JSON):
```json
{
  "example": "paste your data shape here"
}
```

**Data Freshness**: [Real-time, polling interval, on-demand, static]

**Empty State**: [What to show when there's no data]

---

## 6. Interactions & States

Describe what happens when the user interacts with the feature.

| Interaction | Expected Behavior |
|---|---|
| [e.g., Click "Apply" button] | [e.g., Applies recommendation and shows success toast] |
| [e.g., Swipe left on carousel] | [e.g., Slides to next card with smooth animation] |
| [e.g., Click "Dismiss"] | [e.g., Removes card from carousel, shows next card] |

### States to Handle
- [ ] **Loading** — [What to show while data loads]
- [ ] **Empty** — [What to show when no items exist]
- [ ] **Error** — [What to show if data fetch fails]
- [ ] **Single item** — [Behavior when only one item exists]
- [ ] **Many items** — [Behavior with 10+ items — pagination? scroll?]

---

## 7. Rendering Context

**Where does this feature live in the app?**
- [ ] Standalone page (has its own route)
- [ ] Inside a panel or drawer
- [ ] Inside a modal/dialog
- [ ] Embedded within an existing page section
- [ ] Inside the Marty AI assistant
- [ ] Other: ___________

**Parent route or component**: [e.g., `/campaigns` page, MartyFloatingPanel, etc.]

---

## 8. Accessibility Requirements

- **Keyboard navigation**: [e.g., "Arrow keys to navigate carousel cards", or "Tab through form fields"]
- **Screen reader**: [e.g., "Each card announced with title and type", or "Form errors read aloud"]
- **ARIA labels**: [Any specific labels needed — or write "Agent decides"]
- **Focus management**: [e.g., "Focus moves to first card on open", or "Focus returns to trigger on close"]

---

## 9. Animation & Motion

- **Transitions**: [e.g., "Smooth slide between cards, 300ms ease"]
- **Entry animation**: [e.g., "Cards fade in on load", or "None"]
- **Reduced motion**: All animations must honor `prefers-reduced-motion: reduce` (this is automatic per project rules)

---

## 10. Mobile & Touch Behavior

- **Touch gestures**: [e.g., "Swipe left/right to navigate", "Drag to scroll", or "None"]
- **Responsive layout**: [e.g., "Stack vertically on mobile", "Same layout but smaller cards"]
- **Minimum touch target**: All interactive elements must be at least 44x44px (automatic per project rules)

---

## 11. Edge Cases

List any edge cases or special scenarios:

1. [e.g., "What if the campaign name is very long? Truncate with ellipsis?"]
2. [e.g., "What if the user has no recommendations? Show empty state message."]
3. [e.g., "What if the API is slow? Show skeleton loading cards."]

---

## 12. Dependencies

- [ ] **APIs**: [List any API endpoints this feature depends on]
- [ ] **Other features**: [Does this depend on another feature being built first?]
- [ ] **Data sources**: [External data, user input, computed values]
- [ ] **Permissions**: [Any role-based access requirements?]

---

## 13. Out of Scope

What this feature explicitly does NOT include (to avoid scope creep):

1. [e.g., "Does not include editing recommendations inline"]
2. [e.g., "Does not include recommendation analytics/tracking"]

---

## 14. Success Metrics (Optional)

How will you measure if this feature is successful?

- [e.g., "80% of users interact with at least one recommendation card"]
- [e.g., "Average time to apply a recommendation < 10 seconds"]

---

## For Agent Use (Do Not Fill)

_The agent will populate these sections after analyzing the PRD:_

### Mapped LD Components
_[Agent fills: which Living Design components match this PRD]_

### Required Design Tokens
_[Agent fills: which token categories are needed]_

### Applicable Skills/Rules
_[Agent fills: which .builder/rules and guidelines apply]_

### Implementation Plan
_[Agent fills: step-by-step implementation plan]_

### Files to Create/Modify
_[Agent fills: specific file paths]_
