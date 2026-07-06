# PRD Template — Campaign Recommendations Carousel

> **Test PRD**: This is a retroactive PRD written against an existing feature to validate the template structure.

---

## 1. Overview

**Feature Name**: Campaign Recommendations Carousel

**One-liner**: A horizontally scrollable carousel inside the Marty AI assistant that surfaces actionable campaign optimization recommendations as individual cards.

**Feature Type**:
- [x] New component or widget
- [ ] New page or view
- [ ] Data table or list view
- [ ] Chart or data visualization
- [ ] Form or input flow
- [ ] Navigation change
- [ ] Modification to existing feature

---

## 2. User Story

As an **advertiser using Marty**, I want to **browse campaign recommendations in a swipeable carousel**, so that **I can quickly review and apply optimizations without leaving the chat interface**.

---

## 3. Acceptance Criteria

1. [x] Carousel displays up to 6 recommendation cards
2. [x] Two card types supported: "alert" (red icon, urgent) and "rec" (pink icon, suggestion)
3. [x] Each card shows: title, description text, metadata key-value pairs, and action buttons
4. [x] Adjacent cards are partially visible on left/right (20px peek on each side)
5. [x] Clicking an off-center card navigates to it
6. [x] Non-active cards appear at reduced opacity (0.55) and slight scale (0.97)
7. [x] Smooth CSS transition when sliding between cards (300ms ease)
8. [x] Pagination dots below the carousel indicate current position
9. [x] Active dot is wider (16px pill) vs inactive dots (8px circle)
10. [x] Previous/Next navigation buttons flanking the pagination dots
11. [x] "Apply" button on each card uses LD Button primary variant, size small
12. [x] "Request report" and "See details" link-style actions on each card
13. [x] Cards use elevation shadow, not borders (except divider between content and actions)
14. [x] Carousel is responsive — card width adapts to container via ResizeObserver

---

## 4. Design Reference

**Figma Link**: [Provided via figma-design.html in session]

**Design Notes**:
- Cards are 322px wide in Figma at fixed panel width, but implementation uses dynamic width (container - 40px peek)
- Card height: 337px in Figma, 320px in implementation
- Card border-radius: 12px
- Card shadow: `0 -1px 2px 0 rgba(0,0,0,0.10), 0 1px 2px 1px rgba(0,0,0,0.15)`
- Alert icon: red circle with exclamation, pink background (#F8D2D3)
- Rec icon: lightning bolt, pink background (#F5D5E9)
- Metadata values in bold, labels in caption size
- Accent metadata uses green text token for positive values

---

## 5. Data Requirements

**Data Source**: Static mock data (hardcoded CARDS array)

**Data Shape**:
```json
{
  "id": "daily-budget",
  "type": "alert",
  "title": "Update daily budget",
  "subcopy": "Campaign has run out of daily budget...",
  "meta": [
    { "label": "Daily budget", "value": "$200" },
    { "label": "Cap-out time", "value": "2:00 pm" }
  ]
}
```

**Data Freshness**: Static (mock data for prototype)

**Empty State**: Not specified — assumes at least one card always exists

---

## 6. Interactions & States

| Interaction | Expected Behavior |
|---|---|
| Click off-center card | Slides carousel to center that card |
| Click prev/next buttons | Moves index by 1 in respective direction |
| Click pagination dot | Jumps to that card index |
| Click "Apply" button | Applies recommendation (handler TBD) |
| Click "Request report" | Opens report flow (handler TBD) |
| Click "See details" | Shows detail view (handler TBD) |

### States to Handle
- [x] **Loading** — Not handled (static data)
- [ ] **Empty** — Not handled
- [ ] **Error** — Not handled
- [x] **Single item** — Works but no carousel navigation needed
- [x] **Many items** — Pagination dots scale, prev/next buttons work

---

## 7. Edge Cases

1. Long campaign names — Subcopy truncated to 3 lines with `-webkit-line-clamp`
2. Cards with varying metadata count — Flex wrap handles 1-3 metadata items
3. Container resize — ResizeObserver recalculates card width dynamically
4. Shadow clipping — Viewport has padding (4px top, 6px bottom) to prevent shadow clipping

---

## 8. Dependencies

- [x] **APIs**: None (static mock data)
- [x] **Other features**: Must render inside MartyFloatingPanel chat view
- [x] **Data sources**: Hardcoded CARDS array
- [ ] **Permissions**: None

---

## 9. Out of Scope

1. Editing recommendations inline
2. API integration for real recommendation data
3. Drag-to-scroll gesture on the carousel (only click navigation)
4. Keyboard navigation (arrow keys)

---

## 10. Success Metrics

- Users can visually distinguish alert vs recommendation cards
- Carousel navigation feels smooth and responsive
- Adjacent card peek creates visual curiosity to explore more cards

---

## Template Validation Notes

### What the template captured well:
- Feature type identification — correctly identified as "new component"
- Data shape — the JSON structure maps directly to the TypeScript interface
- Acceptance criteria — comprehensive enough to validate the implementation
- Interactions table — clearly maps each user action to behavior
- Edge cases — caught the shadow clipping issue

### What the template missed / could improve:
- **Animation preferences** — Template should ask about `prefers-reduced-motion` handling
- **Touch/drag support** — Template should ask about mobile gesture support
- **Accessibility** — Template should have a dedicated section for ARIA labels, keyboard nav, screen reader behavior
- **Component nesting context** — Template should ask "Where does this component render?" (inside a panel, a page, a modal?)
- **Card action handlers** — Template should ask what each action button does specifically

### Recommended template additions:
1. Add "Rendering Context" field (where does this live in the app?)
2. Add "Accessibility Requirements" section
3. Add "Animation & Motion" section (duration, easing, reduced-motion)
4. Add "Mobile/Touch Behavior" section
