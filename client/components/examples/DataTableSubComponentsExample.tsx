import React from 'react';
import { DataTable, DataTableHead, DataTableBody } from '@/components/ui/DataTable';
import { DataTableRow } from '@/components/ui/DataTableRow';
import { DataTableHeader } from '@/components/ui/DataTableHeader';
import { DataTableCell } from '@/components/ui/DataTableCellText';
import { DataTableCellStatus } from '@/components/ui/DataTableCellStatus';
import { DataTableCellSelect, DataTableHeaderSelect } from '@/components/ui/DataTableCellSelect';
import { DataTableCellActions } from '@/components/ui/DataTableCellActions';
import { DataTableBulkActions } from '@/components/ui/DataTableBulkActions';
import { DataTableTitle } from '@/components/ui/DataTableTitle';
import { DataTableConfigPanel, ColumnConfig } from '@/components/ui/DataTableConfigPanel';
import { Checkbox } from '@/components/ui/Checkbox';
import { IconButton } from '@/components/ui/IconButton';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { RowActionsMenu } from './DataTableRowActionsMenu';
import { Sliders, Download } from '@/components/icons';
import styles from './DataTableSubComponentsExample.module.css';

/* ================================================================
   1. DataTableTitle Example
   ================================================================ */
function TitleExample() {
  return (
    <div className={styles.exampleCard}>
      <DataTableTitle
        subtitle="12 total results"
        actions={
          <>
            <IconButton aria-label="Settings" variant="secondary">
              <Sliders />
            </IconButton>
            <IconButton aria-label="Download" variant="secondary">
              <Download />
            </IconButton>
          </>
        }
      >
        Campaigns
      </DataTableTitle>
    </div>
  );
}

/* ================================================================
   2. DataTableHeader — All Variants (Sort × Alignment × Two-lined)
   ================================================================ */
function HeaderVariantsExample() {
  return (
    <div className={styles.exampleCard}>
      <div className={styles.variantLabel}>Left-aligned · One-line</div>
      <DataTable>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeader width={160}>Label</DataTableHeader>
            <DataTableHeader width={160} sort="ascending" onSort={() => {}}>
              Label
            </DataTableHeader>
            <DataTableHeader width={160} sort="descending" onSort={() => {}}>
              Label
            </DataTableHeader>
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          <DataTableRow>
            <DataTableCell>—</DataTableCell>
            <DataTableCell>Sort ascending</DataTableCell>
            <DataTableCell>Sort descending</DataTableCell>
          </DataTableRow>
        </DataTableBody>
      </DataTable>

      <div className={styles.variantDivider} />

      <div className={styles.variantLabel}>Right-aligned · One-line</div>
      <DataTable>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeader width={160} alignment="right">Label</DataTableHeader>
            <DataTableHeader width={160} alignment="right" sort="ascending" onSort={() => {}}>
              Label
            </DataTableHeader>
            <DataTableHeader width={160} alignment="right" sort="descending" onSort={() => {}}>
              Label
            </DataTableHeader>
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          <DataTableRow>
            <DataTableCell variant="numeric">—</DataTableCell>
            <DataTableCell variant="numeric">Sort ascending</DataTableCell>
            <DataTableCell variant="numeric">Sort descending</DataTableCell>
          </DataTableRow>
        </DataTableBody>
      </DataTable>

      <div className={styles.variantDivider} />

      <div className={styles.variantLabel}>Interactive Sort (click to cycle)</div>
      <DataTable>
        <DataTableHead>
          <DataTableRow>
            <HeaderSortDemo alignment="left" label="Left sort" />
            <HeaderSortDemo alignment="right" label="Right sort" />
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          <DataTableRow>
            <DataTableCell>Click header to sort</DataTableCell>
            <DataTableCell variant="numeric">Click header to sort</DataTableCell>
          </DataTableRow>
        </DataTableBody>
      </DataTable>
    </div>
  );
}

function HeaderSortDemo({
  alignment,
  label,
}: {
  alignment: 'left' | 'right';
  label: string;
}) {
  const [sort, setSort] = React.useState<'none' | 'ascending' | 'descending'>('none');
  const toggle = () =>
    setSort((s) => (s === 'none' ? 'ascending' : s === 'ascending' ? 'descending' : 'none'));
  return (
    <DataTableHeader width={200} alignment={alignment} sort={sort} onSort={toggle}>
      {label}
    </DataTableHeader>
  );
}

/* ================================================================
   3. DataTableHeaderSelect — Checkbox State Grid
   ================================================================ */
function HeaderSelectVariantsExample() {
  return (
    <div className={styles.exampleCard}>
      <div className={styles.checkboxGrid}>
        {/* Column labels */}
        <div className={styles.checkboxGridLabel}>State</div>
        <div className={styles.checkboxGridLabel}>Unchecked</div>
        <div className={styles.checkboxGridLabel}>Checked</div>
        <div className={styles.checkboxGridLabel}>Indeterminate</div>

        {/* Enabled row */}
        <div className={styles.checkboxGridState}>Enabled</div>
        <CheckboxCell checked={false} indeterminate={false} />
        <CheckboxCell checked={true} indeterminate={false} />
        <CheckboxCell checked={false} indeterminate={true} />

        {/* Disabled row */}
        <div className={styles.checkboxGridState}>Disabled</div>
        <CheckboxCell checked={false} indeterminate={false} disabled />
        <CheckboxCell checked={true} indeterminate={false} disabled />
        <CheckboxCell checked={false} indeterminate={true} disabled />
      </div>

      <div className={styles.variantDivider} />
      <div className={styles.variantLabel}>Interactive (select all / indeterminate / clear)</div>

      <DataTable>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeaderSelectDemo />
            <DataTableHeader width={200}>Campaign</DataTableHeader>
            <DataTableHeader width={140} alignment="right">Budget</DataTableHeader>
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          {['Alpha', 'Beta', 'Gamma'].map((name, i) => (
            <DataTableRow key={name}>
              <DataTableCellSelect
                a11yLabelledBy={`hs-name-${i}`}
                checked={false}
                onChange={() => {}}
              />
              <DataTableCell id={`hs-name-${i}`}>{name}</DataTableCell>
              <DataTableCell variant="numeric">${(i + 1) * 10_000}</DataTableCell>
            </DataTableRow>
          ))}
        </DataTableBody>
      </DataTable>
    </div>
  );
}

function CheckboxCell({
  checked,
  indeterminate,
  disabled = false,
}: {
  checked: boolean;
  indeterminate: boolean;
  disabled?: boolean;
}) {
  return (
    <div className={styles.checkboxCell}>
      <Checkbox
        checked={indeterminate ? 'indeterminate' : checked}
        disabled={disabled}
        onCheckedChange={() => {}}
      />
    </div>
  );
}

function DataTableHeaderSelectDemo() {
  const [selected, setSelected] = React.useState<Set<number>>(new Set());
  const total = 3;
  const allSelected = selected.size === total;
  const someSelected = selected.size > 0 && !allSelected;
  return (
    <DataTableHeaderSelect
      checked={allSelected}
      indeterminate={someSelected}
      onChange={() => {
        if (allSelected || someSelected) setSelected(new Set());
        else setSelected(new Set([0, 1, 2]));
      }}
    />
  );
}

/* ================================================================
   4. Action Content — Bulk action button variants (1–5 actions)
   ================================================================ */
function ActionContentExample() {
  const MORE_ICON = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 6.99976C8.55228 6.99976 9 7.44747 9 7.99976C9 8.55204 8.55228 8.99976 8 8.99976C7.44772 8.99976 7 8.55204 7 7.99976C7 7.44747 7.44772 6.99976 8 6.99976ZM3.5 6.99976C4.05228 6.99976 4.5 7.44747 4.5 7.99976C4.5 8.55204 4.05228 8.99976 3.5 8.99976C2.94772 8.99976 2.5 8.55204 2.5 7.99976C2.5 7.44747 2.94772 6.99976 3.5 6.99976ZM12.5 6.99976C13.0523 6.99976 13.5 7.44747 13.5 7.99976C13.5 8.55204 13.0523 8.99976 12.5 8.99976C11.9477 8.99976 11.5 8.55204 11.5 7.99976C11.5 7.44747 11.9477 6.99976 12.5 6.99976Z" fill="currentColor"/>
    </svg>
  );

  const rows = [1, 2, 3, 4, 5] as const;

  return (
    <div className={styles.exampleCard}>
      <div className={styles.actionContentList}>
        {rows.map((count) => (
          <div key={count} className={styles.actionContentRow}>
            {/* Secondary buttons (all but last) */}
            {Array.from({ length: count - 1 }, (_, i) => (
              <Button key={i} variant="secondary" size="small">
                Button label
              </Button>
            ))}
            {/* Last button is always primary */}
            <Button variant="primary" size="small">
              Button label
            </Button>
            {/* Overflow "..." */}
            <IconButton aria-label="More actions" variant="ghost" size="small">
              {MORE_ICON}
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   5. Cell Variants Example
   ================================================================ */
function CellVariantsExample() {
  return (
    <div className={styles.exampleCard}>
      <DataTable>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeader width={200}>Alphanumeric</DataTableHeader>
            <DataTableHeader width={140} alignment="right">Numeric</DataTableHeader>
            <DataTableHeader width={140}>Status</DataTableHeader>
            <DataTableHeader width={100} alignment="right">Actions</DataTableHeader>
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          <DataTableRow>
            <DataTableCell>Product Name</DataTableCell>
            <DataTableCell variant="numeric">$42,500.00</DataTableCell>
            <DataTableCellStatus>
              <Tag variant="tertiary" color="positive">Live</Tag>
            </DataTableCellStatus>
            <DataTableCellActions>
              <RowActionsMenu name="Product" />
            </DataTableCellActions>
          </DataTableRow>
          <DataTableRow>
            <DataTableCell>Another Item</DataTableCell>
            <DataTableCell variant="numeric">$12,000.00</DataTableCell>
            <DataTableCellStatus>
              <Tag variant="tertiary" color="warning">Paused</Tag>
            </DataTableCellStatus>
            <DataTableCellActions>
              <RowActionsMenu name="Item" />
            </DataTableCellActions>
          </DataTableRow>
        </DataTableBody>
      </DataTable>
    </div>
  );
}

/* ================================================================
   6. Selection & Bulk Actions Example
   ================================================================ */
const SELECTION_DATA = [
  { id: '1', name: 'Campaign Alpha', budget: '$50,000' },
  { id: '2', name: 'Campaign Beta', budget: '$35,000' },
  { id: '3', name: 'Campaign Gamma', budget: '$80,000' },
];

function SelectionExample() {
  const [selected, setSelected] = React.useState<Set<string>>(new Set(['1']));

  const allIds = SELECTION_DATA.map((d) => d.id);
  const allSelected = allIds.every((id) => selected.has(id));
  const someSelected = allIds.some((id) => selected.has(id)) && !allSelected;

  const toggleAll = () => {
    if (allSelected || someSelected) setSelected(new Set());
    else setSelected(new Set(allIds));
  };

  const toggleRow = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className={styles.exampleCard}>
      {selected.size > 0 && (
        <DataTableBulkActions
          count={selected.size}
          onSelectAll={() => setSelected(new Set(allIds))}
          onClearSelected={() => setSelected(new Set())}
          actionContent={
            <Button variant="secondary" size="small">Archive Selected</Button>
          }
        />
      )}
      <DataTable>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeaderSelect
              checked={allSelected}
              indeterminate={someSelected}
              onChange={toggleAll}
            />
            <DataTableHeader width={250}>Campaign</DataTableHeader>
            <DataTableHeader width={150} alignment="right">Budget</DataTableHeader>
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          {SELECTION_DATA.map((d) => (
            <DataTableRow key={d.id} selected={selected.has(d.id)}>
              <DataTableCellSelect
                a11yLabelledBy={`sel-${d.id}`}
                checked={selected.has(d.id)}
                onChange={() => toggleRow(d.id)}
              />
              <DataTableCell id={`sel-${d.id}`}>{d.name}</DataTableCell>
              <DataTableCell variant="numeric">{d.budget}</DataTableCell>
            </DataTableRow>
          ))}
        </DataTableBody>
      </DataTable>
    </div>
  );
}

/* ================================================================
   7. Frozen Columns Example
   ================================================================ */
function FrozenColumnsExample() {
  return (
    <div className={styles.exampleCard}>
      <div style={{ maxWidth: '600px', overflow: 'auto' }}>
        <DataTable>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeader width={180} frozen="left">Name (Frozen)</DataTableHeader>
              <DataTableHeader width={150}>Category</DataTableHeader>
              <DataTableHeader width={150}>Region</DataTableHeader>
              <DataTableHeader width={150} alignment="right">Revenue</DataTableHeader>
              <DataTableHeader width={150} alignment="right">Cost</DataTableHeader>
              <DataTableHeader width={80} alignment="right" frozen="right">Actions</DataTableHeader>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {[
              { name: 'Spring Campaign', category: 'Display', region: 'North America', revenue: '$120,000', cost: '$45,000' },
              { name: 'Summer Promo', category: 'Video', region: 'Europe', revenue: '$85,000', cost: '$32,000' },
            ].map((row, i) => (
              <DataTableRow key={i}>
                <DataTableCell frozen="left">{row.name}</DataTableCell>
                <DataTableCell>{row.category}</DataTableCell>
                <DataTableCell>{row.region}</DataTableCell>
                <DataTableCell variant="numeric">{row.revenue}</DataTableCell>
                <DataTableCell variant="numeric">{row.cost}</DataTableCell>
                <DataTableCellActions frozen="right">
                  <RowActionsMenu name={row.name} />
                </DataTableCellActions>
              </DataTableRow>
            ))}
          </DataTableBody>
        </DataTable>
      </div>
    </div>
  );
}

/* ================================================================
   8. Config Panel Example
   ================================================================ */
const PANEL_COLUMNS: ColumnConfig[] = [
  { id: 'name', label: 'Item name', visible: true, pinned: false, alwaysVisible: true },
  { id: 'sku', label: 'SKU', visible: true, pinned: false },
  { id: 'price', label: 'Price', visible: true, pinned: false },
  { id: 'shipping', label: 'Shipping', visible: true, pinned: false },
  { id: 'inventory', label: 'Inventory', visible: true, pinned: false },
  { id: 'fulfillment', label: 'Fulfillment', visible: true, pinned: false },
  { id: 'status', label: 'Status', visible: true, pinned: false },
  { id: 'lastModified', label: 'Last modified', visible: false, pinned: false },
  { id: 'lifecycle', label: 'Lifecycle', visible: false, pinned: false },
  { id: 'repricerStrategy', label: 'Repricer strategy', visible: false, pinned: false },
  { id: 'actions', label: 'Actions', visible: true, pinned: true, alwaysPinned: true },
];

function ConfigPanelExample() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [columns, setColumns] = React.useState<ColumnConfig[]>(PANEL_COLUMNS);

  const visibleCols = columns.filter((c) => c.visible && c.id !== 'actions');
  const showActions = columns.find((c) => c.id === 'actions')?.visible ?? true;

  return (
    <div className={styles.exampleCard}>
      <DataTableConfigPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Customize Columns"
        columns={columns}
        onApply={(updated) => setColumns(updated)}
      />
      <div className={styles.configPanelRow}>
        <Button variant="secondary" size="small" onClick={() => setIsOpen(true)}>
          Open Column Config Panel
        </Button>
        <span className={styles.configSummary}>
          {visibleCols.length} of {columns.length - 1} columns visible
          {showActions ? ' + Actions pinned right' : ''}
        </span>
      </div>

      <DataTable>
        <DataTableHead>
          <DataTableRow>
            {visibleCols.map((col) => (
              <DataTableHeader key={col.id} width={140} frozen={col.pinned ? 'left' : undefined}>
                {col.label}
              </DataTableHeader>
            ))}
            {showActions && (
              <DataTableHeader width={80} alignment="right" frozen="right">Actions</DataTableHeader>
            )}
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          <DataTableRow>
            {visibleCols.map((col) => (
              <DataTableCell key={col.id}>Sample data</DataTableCell>
            ))}
            {showActions && (
              <DataTableCellActions frozen="right">
                <RowActionsMenu name="Sample" />
              </DataTableCellActions>
            )}
          </DataTableRow>
        </DataTableBody>
      </DataTable>
    </div>
  );
}

/* ================================================================
   9. Table Options (Rounded, Elevated, Text Style)
   ================================================================ */
function TableOptionsExample() {
  return (
    <div className={styles.optionsGrid}>
      <div>
        <h4 className={styles.optionLabel}>Rounded + Elevated</h4>
        <DataTable rounded elevated>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeader width={200}>Name</DataTableHeader>
              <DataTableHeader width={120} alignment="right">Value</DataTableHeader>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            <DataTableRow>
              <DataTableCell>Item A</DataTableCell>
              <DataTableCell variant="numeric">$100</DataTableCell>
            </DataTableRow>
          </DataTableBody>
        </DataTable>
      </div>
      <div>
        <h4 className={styles.optionLabel}>Body Medium Text Style</h4>
        <DataTable textStyle="body-medium">
          <DataTableHead>
            <DataTableRow>
              <DataTableHeader width={200}>Name</DataTableHeader>
              <DataTableHeader width={120} alignment="right">Value</DataTableHeader>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            <DataTableRow>
              <DataTableCell>Item B</DataTableCell>
              <DataTableCell variant="numeric">$250</DataTableCell>
            </DataTableRow>
          </DataTableBody>
        </DataTable>
      </div>
    </div>
  );
}

/* ================================================================
   SECTION WRAPPER
   ================================================================ */
interface SectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function Section({ title, description, children }: SectionProps) {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <p className={styles.sectionDescription}>{description}</p>
      {children}
    </div>
  );
}

/* ================================================================
   MAIN EXPORT
   ================================================================ */
export default function DataTableSubComponentsExample() {
  return (
    <div className={styles.root}>
      <Section
        title="DataTableTitle"
        description="Header bar above the table with title, subtitle, and action buttons slot."
      >
        <TitleExample />
      </Section>

      <Section
        title="DataTableHeader Variants"
        description="Column headers with left/right alignment and ascending/descending sort states. Click a sortable header to cycle through states."
      >
        <HeaderVariantsExample />
      </Section>

      <Section
        title="DataTableHeaderSelect Variants"
        description="Select-all checkbox for the table header row. Supports unchecked, checked, and indeterminate states. Use DataTableCellSelect for individual row checkboxes."
      >
        <HeaderSelectVariantsExample />
      </Section>

      <Section
        title="Action Content"
        description="Bulk action toolbar button patterns — 1 to 5 actions with the last always primary and an overflow icon button at the end."
      >
        <ActionContentExample />
      </Section>

      <Section
        title="Cell Variants"
        description="Different cell types: alphanumeric, numeric, status (Tag), and actions (row menu)."
      >
        <CellVariantsExample />
      </Section>

      <Section
        title="Selection & Bulk Actions"
        description="Row selection with header checkbox (select all / indeterminate) and bulk action toolbar. Select a row to see the toolbar appear."
      >
        <SelectionExample />
      </Section>

      <Section
        title="Frozen Columns"
        description="Columns sticky to left or right edge. Scroll the table horizontally to see frozen columns stay in place."
      >
        <FrozenColumnsExample />
      </Section>

      <Section
        title="Configure Panel"
        description="Right-side overlay panel for column visibility, pinning, and drag-to-reorder."
      >
        <ConfigPanelExample />
      </Section>

      <Section
        title="Table Options"
        description="Optional rounded corners, elevation, and body-medium text style variants on the DataTable container."
      >
        <TableOptionsExample />
      </Section>
    </div>
  );
}
