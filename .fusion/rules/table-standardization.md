# Table Standardization Rule

## Overview
All data tables across the application **MUST** use standardized table components and patterns established on the home page (Index.tsx). This ensures consistent user experience, accessibility, and maintainability.

## Reference Implementation
**Primary Reference**: `client/pages/Index.tsx` - Campaign list table (lines ~2500-2800)

This table demonstrates the canonical table implementation with all required features.

## Required Table Features

### 1. **Sticky Headers**
```tsx
<thead className="bg-[#F8F8F8] sticky top-0 z-20">
```
- Headers must stick to top when scrolling
- Background color: `#F8F8F8` (LD gray)
- Z-index: `z-20` minimum

### 2. **Sticky Columns**
**Left Sticky (Checkbox Column)**:
```tsx
<th className="p-2 text-left relative group sticky left-0 bg-[#F8F8F8] z-30 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]">
  <input type="checkbox" className="w-5 h-5 rounded border-[#909196] accent-black" />
</th>
```

**Right Sticky (Actions Column)**:
```tsx
<th className="p-2 text-left relative group sticky right-0 bg-[#F8F8F8] z-30 shadow-[-2px_0_4px_-2px_rgba(0,0,0,0.1)]">
  <div className="whitespace-nowrap">Actions</div>
</th>
```

### 3. **Resizable Columns**
All table headers (except sticky columns) must have resize handles:

```tsx
<th className="p-2 text-left font-bold text-[#2E2F32] relative group" style={{ width: '280px' }}>
  <div className="flex items-center gap-1 cursor-pointer">
    {/* Column content */}
  </div>
  {/* Resize handle */}
  <div className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#0053E2] group-hover:bg-[#0053E2]/20" />
</th>
```

**Resize Handle Specs**:
- Width: `w-1` (4px)
- Cursor: `cursor-col-resize`
- Hover color: `hover:bg-[#0053E2]` (LD blue)
- Group hover: `group-hover:bg-[#0053E2]/20` (subtle indicator)

### 4. **Row Hover States**
```tsx
<tr className="border-b border-[#E3E4E5] hover:bg-[#F0F5FF] group">
```

- Border bottom: `border-b border-[#E3E4E5]`
- Hover background: `hover:bg-[#F0F5FF]` (light blue)
- Group class for coordinated sticky cell backgrounds

**Sticky Cells in Rows**:
```tsx
<td className="p-2 sticky left-0 group-hover:bg-[#F0F5FF] z-10 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)] bg-white">
```

### 5. **Link Component for Campaign Names**
**✅ CORRECT** (using Link component with primitive token):
```tsx
<Link href="#" className="text-sm">
  {campaign.name}
</Link>
```

**❌ WRONG** (inline blue styles):
```tsx
<div className="underline hover:no-underline cursor-pointer">
  {campaign.name}
</div>
```

### 6. **Status Indicators**
Use Tag component for status:
```tsx
import { Tag } from '@/components/ui/tag';

<Tag variant={statusVariant}>{campaign.status}</Tag>
```

### 7. **Actions Menu**
Use Menu component with ellipsis trigger:
```tsx
import { Menu, MenuItem } from '@/components/ui/Menu';
import { MoreHorizontal } from 'lucide-react';

<Menu>
  <button className="p-2 hover:bg-gray-100 rounded-full">
    <MoreHorizontal className="w-4 h-4" />
  </button>
  <MenuItem>Edit</MenuItem>
  <MenuItem>Delete</MenuItem>
</Menu>
```

### 8. **Checkboxes**
```tsx
<input 
  type="checkbox" 
  className="w-5 h-5 rounded border-[#909196] accent-black"
/>
```

- Size: `w-5 h-5` (20px)
- Border: `border-[#909196]` (LD gray)
- Accent: `accent-black`

### 9. **Sort Indicators**
```tsx
<div className="flex items-center gap-1 cursor-pointer">
  <span>Campaign</span>
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" 
          d="M8 3L4 7H12L8 3ZM8 13L12 9H4L8 13Z" 
          fill="#2E2F32"/>
  </svg>
</div>
```

## Standard Table Structure

```tsx
<div className="flex-1 overflow-auto">
  <table className="w-full border-collapse">
    {/* Header with sticky positioning */}
    <thead className="bg-[#F8F8F8] sticky top-0 z-20">
      <tr>
        {/* Sticky left: Checkbox */}
        <th className="p-2 text-left relative group sticky left-0 bg-[#F8F8F8] z-30 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]" style={{ width: '56px' }}>
          <input type="checkbox" className="w-5 h-5 rounded border-[#909196] accent-black" />
          <div className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#0053E2] group-hover:bg-[#0053E2]/20" />
        </th>
        
        {/* Resizable columns */}
        <th className="p-2 text-left font-bold text-[#2E2F32] relative group" style={{ width: '280px' }}>
          <div className="flex items-center gap-1 cursor-pointer">
            <span>Campaign</span>
            <SortIcon />
          </div>
          <div className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#0053E2] group-hover:bg-[#0053E2]/20" />
        </th>
        
        {/* More resizable columns... */}
        
        {/* Sticky right: Actions */}
        <th className="p-2 text-left font-bold text-[#2E2F32] relative group sticky right-0 bg-[#F8F8F8] z-30 shadow-[-2px_0_4px_-2px_rgba(0,0,0,0.1)]" style={{ width: '80px' }}>
          <div className="whitespace-nowrap">Actions</div>
        </th>
      </tr>
    </thead>
    
    {/* Body with hover states */}
    <tbody>
      {data.map((row) => (
        <tr key={row.id} className="border-b border-[#E3E4E5] hover:bg-[#F0F5FF] group">
          {/* Sticky left: Checkbox */}
          <td className="p-2 sticky left-0 group-hover:bg-[#F0F5FF] z-10 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)] bg-white" style={{ width: '56px' }}>
            <input type="checkbox" className="w-5 h-5 rounded border-[#909196] accent-black" />
          </td>
          
          {/* Data cells */}
          <td className="p-2" style={{ width: '280px' }}>
            <Link href={`/campaign/${row.id}`}>{row.name}</Link>
          </td>
          
          {/* More data cells... */}
          
          {/* Sticky right: Actions */}
          <td className="p-2 sticky right-0 group-hover:bg-[#F0F5FF] z-10 shadow-[-2px_0_4px_-2px_rgba(0,0,0,0.1)] bg-white" style={{ width: '80px' }}>
            <Menu>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreHorizontal className="w-4 h-4" />
              </button>
              <MenuItem>Edit</MenuItem>
            </Menu>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

## Required Components

Tables MUST use these standardized components:

### ✅ Required Imports
```tsx
import { Link } from '@/components/ui/Link';
import { Tag } from '@/components/ui/tag';
import { OLQTag } from '@/components/ui/olq-tag';
import { Menu, MenuItem } from '@/components/ui/Menu';
import { Button } from '@/components/ui/Button';
import { MoreHorizontal } from 'lucide-react';
```

### ❌ Prohibited Patterns
- **NO** hard-coded blue links (`#0071ce` or `var(--ld-semantic-color-text-brand)`)
- **NO** inline styled links
- **NO** custom badge/tag components (use Tag/OLQTag)
- **NO** non-resizable columns (except sticky columns)
- **NO** custom action menus (use Menu component)

## Color Tokens

### Backgrounds
- Table background: `bg-white`
- Header background: `bg-[#F8F8F8]` (LD gray 10)
- Row hover: `hover:bg-[#F0F5FF]` (LD blue tint)

### Borders
- Row borders: `border-[#E3E4E5]` (LD gray 30)
- Checkbox border: `border-[#909196]` (LD gray 70)

### Text
- Header text: `text-[#2E2F32]` (LD gray 160)
- Link text: Uses `var(--ld-primitive-color-gray-160)` from Link component

### Interactive Elements
- Resize handle hover: `bg-[#0053E2]` (LD blue)
- Resize handle subtle: `bg-[#0053E2]/20`
- Button hover: `hover:bg-gray-100`

## Z-Index Hierarchy

```
z-30: Sticky headers and columns (highest)
z-20: Regular sticky headers
z-10: Sticky cells in body rows
(default): Regular table cells
```

## Responsive Behavior

### Minimum Column Widths
- Checkbox: `56px` (fixed)
- Campaign name: `280px` minimum
- Actions: `80px` (fixed)
- Other columns: `120px` minimum (recommended)

### Horizontal Scroll
- Container must have `overflow-auto` or `overflow-x-auto`
- Sticky columns maintain position during scroll
- Shadows indicate scrollable content

## Accessibility

### ARIA Labels
```tsx
<button aria-label="Sort by campaign name">
  <span>Campaign</span>
  <SortIcon aria-hidden="true" />
</button>
```

### Keyboard Navigation
- All interactive elements (checkboxes, links, buttons, menus) must be keyboard accessible
- Table headers with sort should be focusable
- Row selection should work with Space key

### Screen Readers
- Use semantic `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` elements
- Include proper scope attributes on headers
- Provide meaningful aria-labels for icon buttons

## Examples of Tables to Update

Based on current codebase, these tables need standardization:

1. **AllCampaigns.tsx** - Campaign list table
2. **AllKeywords.tsx** - Keywords table
3. **DisplayAdvertisingCampaigns.tsx** - Display campaigns table
4. **ItemHealth.tsx** - Item health table
5. **OmniROAS.tsx** - ROAS table
6. **Campaign.tsx** - Campaign detail tables
7. **DisplayDashboard.tsx** - Dashboard tables
8. **SponsoredSearchDashboard.tsx** - Sponsored search tables

## Migration Checklist

When updating a table, verify:

- [ ] Uses sticky header with `sticky top-0 z-20`
- [ ] Has sticky left column (checkbox) with `sticky left-0 z-30`
- [ ] Has sticky right column (actions) with `sticky right-0 z-30`
- [ ] All non-sticky columns have resize handles
- [ ] Row hover uses `hover:bg-[#F0F5FF] group`
- [ ] Sticky cells use `group-hover:bg-[#F0F5FF]`
- [ ] Links use Link component (not inline styles)
- [ ] Status uses Tag component
- [ ] Actions use Menu component
- [ ] Checkboxes use standard styling
- [ ] Proper shadows on sticky columns
- [ ] Correct z-index hierarchy
- [ ] All LD 3.5 color tokens used

## Related Rules

- See `.fusion/rules/airtable-token-reference.md` for correct token usage
- See `.fusion/rules/design-guidelines-mandate.md` for guidelines workflow
- See `.fusion/rules/component-composition.md` for component reuse
- See `guidelines/Link.md` for Link component usage
- See `guidelines/Tag.md` for Tag component usage

---

**Remember:** When creating or modifying ANY table, always reference Index.tsx as the canonical implementation. Consistency is key to a professional, maintainable application.
