---
name: build-data-table
description: When a user asks to create a data table, list, or grid of data, use this skill to build it with the DataTable component system including sorting, resizing, and wrap toggle
---
# Skill: Build a Data Table

## When to Use

- User says "create a table", "show data in a grid", "build a list view"
- PRD feature type is "Data table or list view"

## Pre-Implementation Questions

1. **Columns**: What columns should the table show? (names, types, widths)
2. **Data source**: API endpoint, mock data, or static?
3. **Row actions**: Any buttons or links per row? (edit, delete, view details)
4. **Selection**: Do rows need checkboxes for bulk actions?

## Required Guidelines

- `guidelines/DataTable.md` — DataTable component hierarchy
- `.builderrules` — DataTable section (mandatory features)

## Mandatory Features (Every Table)

Per project rules, ALL data tables MUST include these three features. Missing any is a bug.

### 1. Column Sorting


const [sortCol, setSortCol] = useState<string | null>(null);
const [sortDir, setSortDir] = useState<'ascending' | 'descending'>('ascending');

<DataTableHeader
  onSort={() => handleSort('columnName')}
  sort={sortCol === 'columnName' ? sortDir : 'none'}
>
  Column Name
</DataTableHeader>
```

### 2. Resizable Columns

```tsx
const [colWidths, setColWidths] = useState<Record<string, number>>({ name: 200, status: 120 });

<DataTableHeader
  resizable
  width={colWidths.name}
  onResize={(w) => setColWidths(prev => ({ ...prev, name: w }))}
>
  Name
</DataTableHeader>
```

### 3. Cell Wrap Toggle

```tsx
const [wrapCells, setWrapCells] = useState(false);

<Button size="small" variant="tertiary" onClick={() => setWrapCells(w => !w)}>
  {wrapCells ? 'Truncate' : 'Wrap text'}
</Button>
<DataTableCell wrap={wrapCells}>{value}</DataTableCell>
```

## Required Imports

```tsx
import { DataTable, DataTableHead, DataTableBody } from '@/components/ui/DataTable';
import { DataTableRow } from '@/components/ui/DataTableRow';
import { DataTableHeader } from '@/components/ui/DataTableHeader';
import { DataTableCell } from '@/components/ui/DataTableCellText';
```

## Additional Requirements

- Row selection with checkboxes (unless explicitly excluded)
- Pagination or infinite scroll
- Empty state handling
- Loading/skeleton state
- DataTable inside a Card → no `rounded` prop
- DataTable standalone → use `rounded` prop

## Anti-Patterns

- NEVER use raw `<table>/<tr>/<td>` elements
- NEVER skip sorting, resizing, or wrap toggle
- NEVER hard-code column widths without making them resizable