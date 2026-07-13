import React, { Fragment, useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useMartyOptional, TableCommand } from '@/contexts/MartyContext';
import { DataTable, DataTableHead, DataTableBody } from '@/components/ui/DataTable';
import { DataTableRow } from '@/components/ui/DataTableRow';
import { DataTableHeader } from '@/components/ui/DataTableHeader';
import { DataTableCell } from '@/components/ui/DataTableCellText';
import { DataTableCellStatus } from '@/components/ui/DataTableCellStatus';
import { DataTableCellSelect, DataTableHeaderSelect } from '@/components/ui/DataTableCellSelect';
import { DataTableCellActions } from '@/components/ui/DataTableCellActions';
import { DataTableBulkActions } from '@/components/ui/DataTableBulkActions';
import { DataTableTitle } from '@/components/ui/DataTableTitle';
import { IconButton } from '@/components/ui/IconButton';
import { Button } from '@/components/ui/Button';
import { FilterChip } from '@/components/ui/FilterChip';
import { Tag } from '@/components/ui/Tag';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu';
import { RowActionsMenu } from './DataTableRowActionsMenu';
import { DataTableConfigPanel, ColumnConfig } from '@/components/ui/DataTableConfigPanel';
import {
  Search, X, ChevronDown, ChevronUp, ChevronRight, ChevronLeft,
  Sliders, Download,
} from '@/components/icons';

/* ================================================================
   DATA
   ================================================================ */

interface Campaign {
  id: string;
  name: string;
  type: 'campaign' | 'adgroup' | 'creative';
  status: 'Live' | 'Scheduled' | 'Paused' | 'Completed';
  recommendations: number;
  totalBudget?: string;
  targetingStrategy?: string;
  impressions?: string;
  pacing?: { value: string; trend: 'positive' | 'warning' };
  children?: Campaign[];
}

const CAMPAIGNS: Campaign[] = [
  {
    id: '10001',
    name: 'Walmart|Display|Auction|Cross Device|Brand Awareness Campaign_FY27',
    type: 'campaign',
    status: 'Live',
    recommendations: 1,
    totalBudget: '$200,553.22',
    targetingStrategy: 'Contextual targeting',
    impressions: '1,223,112',
    pacing: { value: '113%', trend: 'positive' },
    children: [
      { id: 'ag-1', name: 'Young Adults 18-24', type: 'adgroup', status: 'Live', recommendations: 0 },
      { id: 'cr-1', name: 'Banner Ad - Homepage Hero', type: 'creative', status: 'Live', recommendations: 0 },
    ],
  },
  {
    id: '10002',
    name: 'H&H_FY25_Always On_North Atlantic_Blackstone_Display_In-Market_50839',
    type: 'campaign',
    status: 'Scheduled',
    recommendations: 2,
    totalBudget: '$213,443.33',
    targetingStrategy: 'Behavioral targeting',
    impressions: '3,200,332',
    pacing: { value: '123%', trend: 'warning' },
    children: [
      { id: 'ag-2', name: 'Display Banner Group A', type: 'adgroup', status: 'Scheduled', recommendations: 0 },
      { id: 'cr-2', name: 'Video Ad - Product Showcase', type: 'creative', status: 'Scheduled', recommendations: 1 },
    ],
  },
  {
    id: '10003',
    name: 'Spring Sale 2024 Campaign',
    type: 'campaign',
    status: 'Live',
    recommendations: 0,
    totalBudget: '$150,000.00',
    targetingStrategy: 'Contextual targeting',
    impressions: '2,500,000',
    pacing: { value: '105%', trend: 'positive' },
    children: [
      { id: 'ag-3', name: 'Seasonal Shoppers 25-44', type: 'adgroup', status: 'Live', recommendations: 0 },
    ],
  },
  {
    id: '10004',
    name: 'Holiday Promotions Q4',
    type: 'campaign',
    status: 'Scheduled',
    recommendations: 3,
    totalBudget: '$300,000.00',
    targetingStrategy: 'Behavioral targeting',
    impressions: '5,000,000',
    pacing: { value: '98%', trend: 'positive' },
    children: [
      { id: 'ag-4', name: 'Gift Buyers Segment', type: 'adgroup', status: 'Scheduled', recommendations: 1 },
      { id: 'cr-4a', name: 'Holiday Hero Banner', type: 'creative', status: 'Scheduled', recommendations: 0 },
      { id: 'cr-4b', name: 'Countdown Timer Ad', type: 'creative', status: 'Scheduled', recommendations: 2 },
    ],
  },
  {
    id: '10005',
    name: 'Campaign 100',
    type: 'campaign',
    status: 'Paused',
    recommendations: 0,
    totalBudget: '$9,009.24',
    targetingStrategy: 'Run of site',
    impressions: '2,334,221',
    pacing: { value: '102%', trend: 'positive' },
    children: [],
  },
  {
    id: '10006',
    name: 'Summer Electronics Flash Sale',
    type: 'campaign',
    status: 'Live',
    recommendations: 2,
    totalBudget: '$220,000.00',
    targetingStrategy: 'Contextual targeting',
    impressions: '4,200,000',
    pacing: { value: '108%', trend: 'positive' },
    children: [
      { id: 'ag-6', name: 'Electronics Enthusiasts', type: 'adgroup', status: 'Live', recommendations: 1 },
      { id: 'cr-6', name: 'Flash Sale Carousel Ad', type: 'creative', status: 'Live', recommendations: 0 },
    ],
  },
  {
    id: '10007',
    name: 'Fashion Week Exclusive Deals',
    type: 'campaign',
    status: 'Completed',
    recommendations: 0,
    totalBudget: '$50,000.00',
    targetingStrategy: 'Run of site',
    impressions: '900,000',
    pacing: { value: '85%', trend: 'warning' },
    children: [],
  },
  {
    id: '10008',
    name: 'Back to School 2024',
    type: 'campaign',
    status: 'Live',
    recommendations: 1,
    totalBudget: '$75,500.00',
    targetingStrategy: 'Run of site',
    impressions: '1,800,000',
    pacing: { value: '110%', trend: 'positive' },
    children: [
      { id: 'ag-8', name: 'Parents & Students', type: 'adgroup', status: 'Live', recommendations: 0 },
      { id: 'cr-8', name: 'School Supplies Banner', type: 'creative', status: 'Live', recommendations: 1 },
    ],
  },
];

const STATUS_TAG_COLORS: Record<string, 'positive' | 'negative' | 'warning' | 'info'> = {
  Live: 'positive',
  Scheduled: 'info',
  Paused: 'warning',
  Completed: 'info',
};

const STATUS_KEYS: Record<string, string> = {
  Live: 'dataTable.statusLive',
  Scheduled: 'dataTable.statusScheduled',
  Paused: 'dataTable.statusPaused',
  Completed: 'dataTable.statusCompleted',
};

const CAMPAIGN_NAME_KEYS: Record<string, string> = {
  '10001': 'dataTable.campaign_10001',
  '10002': 'dataTable.campaign_10002',
  '10003': 'dataTable.campaign_10003',
  '10004': 'dataTable.campaign_10004',
  '10005': 'dataTable.campaign_10005',
  '10006': 'dataTable.campaign_10006',
  '10007': 'dataTable.campaign_10007',
  '10008': 'dataTable.campaign_10008',
  'ag-1': 'dataTable.child_ag1',
  'cr-1': 'dataTable.child_cr1',
  'ag-2': 'dataTable.child_ag2',
  'cr-2': 'dataTable.child_cr2',
  'ag-3': 'dataTable.child_ag3',
  'ag-4': 'dataTable.child_ag4',
  'cr-4a': 'dataTable.child_cr4a',
  'cr-4b': 'dataTable.child_cr4b',
  'ag-6': 'dataTable.child_ag6',
  'cr-6': 'dataTable.child_cr6',
  'ag-8': 'dataTable.child_ag8',
  'cr-8': 'dataTable.child_cr8',
};

const TARGETING_KEYS: Record<string, string> = {
  'Contextual targeting': 'dataTable.targetContextual',
  'Behavioral targeting': 'dataTable.targetBehavioral',
  'Run of site': 'dataTable.targetRunOfSite',
};

type SortField = 'name' | 'status' | 'totalBudget' | 'impressions' | 'pacing';
type SortDir = 'ascending' | 'descending' | 'none';

const RESULTS_PER_PAGE = 5;

/* ================================================================
   INITIAL COLUMN CONFIG
   Campaign is always visible (alwaysVisible).
   Actions is always pinned right (alwaysPinned).
   All other columns are togglable and pinable.
   ================================================================ */

const INITIAL_COLUMN_CONFIGS: ColumnConfig[] = [
  { id: 'campaign',          label: 'Campaign',           visible: true,  pinned: false, alwaysVisible: true },
  { id: 'status',            label: 'Status',             visible: true,  pinned: false },
  { id: 'recommendations',   label: 'Recommendations',    visible: true,  pinned: false },
  { id: 'totalBudget',       label: 'Total Budget',       visible: true,  pinned: false },
  { id: 'targetingStrategy', label: 'Targeting Strategy', visible: true,  pinned: false },
  { id: 'impressions',       label: 'Impressions',        visible: true,  pinned: false },
  { id: 'pacing',            label: 'Pacing',             visible: false, pinned: false },
  { id: 'actions',           label: 'Actions',            visible: true,  pinned: true,  alwaysPinned: true },
];

/* ================================================================
   MAIN EXAMPLE
   ================================================================ */

interface UndoSnapshot {
  statusFilters: Set<string>;
  columnConfigs: ColumnConfig[];
  searchQuery: string;
  sortField: SortField | null;
  sortDir: SortDir;
  previewedBudgets: Record<string, string> | null;
}

export default function DataTableExample() {
  const { t } = useTranslation('pages');
  const marty = useMartyOptional();
  const tableCommand = marty?.tableCommand ?? null;
  const setTableCommand = marty?.setTableCommand ?? (() => {});

  /* ── Search ── */
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchScope, setSearchScope] = React.useState<'Campaign name' | 'ID'>('Campaign name');
  const [showScopeDropdown, setShowScopeDropdown] = React.useState(false);

  /* ── Filters ── */
  const [statusFilters, setStatusFilters] = React.useState<Set<string>>(new Set());

  /* ── Sort ── */
  const [sortField, setSortField] = React.useState<SortField | null>(null);
  const [sortDir, setSortDir] = React.useState<SortDir>('none');

  /* ── Selection ── */
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

  /* ── Expand / collapse ── */
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(new Set());

  /* ── Pagination ── */
  const [currentPage, setCurrentPage] = React.useState(1);

  /* ── Column widths (resizable) ── */
  const [columnWidths, setColumnWidths] = React.useState<Record<string, number>>({
    select: 48,
    campaign: 280,
    status: 120,
    recommendations: 160,
    totalBudget: 140,
    targetingStrategy: 170,
    impressions: 140,
    pacing: 110,
    actions: 80,
  });

  const handleColumnResize = React.useCallback((column: string) => (newWidth: number) => {
    setColumnWidths((prev) => ({ ...prev, [column]: newWidth }));
  }, []);

  /* ── Column configuration panel ── */
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);
  const [columnConfigs, setColumnConfigs] = React.useState<ColumnConfig[]>(INITIAL_COLUMN_CONFIGS);

  /* ── Marty preview / undo ── */
  const [previewedBudgets, setPreviewedBudgets] = React.useState<Record<string, string> | null>(null);
  const [previewDescription, setPreviewDescription] = React.useState<string | null>(null);
  const undoSnapshotRef = useRef<UndoSnapshot | null>(null);

  /* Derive ordered visible columns for the table (excluding actions — handled separately) */
  const orderedVisibleCols = React.useMemo(() => {
    const nonActions = columnConfigs.filter((c) => c.id !== 'actions' && c.visible);
    /* Pinned cols first, then unpinned */
    return [
      ...nonActions.filter((c) => c.pinned),
      ...nonActions.filter((c) => !c.pinned),
    ];
  }, [columnConfigs]);

  const showActionsCol = columnConfigs.find((c) => c.id === 'actions')?.visible ?? true;

  /* Count visible (non-actions) columns for colSpan on empty state */
  const totalColSpan = 1 /* select */ + orderedVisibleCols.length + (showActionsCol ? 1 : 0);

  /* ── Derived data ── */
  const filteredData = React.useMemo(() => {
    let data = CAMPAIGNS;
    if (statusFilters.size > 0) data = data.filter((c) => statusFilters.has(c.status));
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      data = data.filter((c) =>
        searchScope === 'Campaign name'
          ? c.name.toLowerCase().includes(q)
          : c.id.toLowerCase().includes(q),
      );
    }
    return data;
  }, [searchQuery, searchScope, statusFilters]);

  const sortedData = React.useMemo(() => {
    if (!sortField || sortDir === 'none') return filteredData;
    return [...filteredData].sort((a, b) => {
      const factor = sortDir === 'ascending' ? 1 : -1;
      switch (sortField) {
        case 'name':    return a.name.localeCompare(b.name) * factor;
        case 'status':  return a.status.localeCompare(b.status) * factor;
        case 'totalBudget': {
          const av = parseFloat((a.totalBudget ?? '0').replace(/[$,]/g, ''));
          const bv = parseFloat((b.totalBudget ?? '0').replace(/[$,]/g, ''));
          return (av - bv) * factor;
        }
        case 'impressions': {
          const av = parseFloat((a.impressions ?? '0').replace(/,/g, ''));
          const bv = parseFloat((b.impressions ?? '0').replace(/,/g, ''));
          return (av - bv) * factor;
        }
        case 'pacing': {
          const av = parseFloat((a.pacing?.value ?? '0').replace('%', ''));
          const bv = parseFloat((b.pacing?.value ?? '0').replace('%', ''));
          return (av - bv) * factor;
        }
        default: return 0;
      }
    });
  }, [filteredData, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / RESULTS_PER_PAGE));
  const paginatedData = sortedData.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE,
  );

  React.useEffect(() => { setCurrentPage(1); }, [searchQuery, statusFilters]);

  /* ── Marty table command handler ── */
  React.useEffect(() => {
    if (!tableCommand) return;

    // Capture undo snapshot before applying any change
    const snapshot: UndoSnapshot = {
      statusFilters: new Set(statusFilters),
      columnConfigs: columnConfigs.map(c => ({ ...c })),
      searchQuery,
      sortField,
      sortDir,
      previewedBudgets,
    };

    switch (tableCommand.type) {
      case 'FILTER_STATUS':
        undoSnapshotRef.current = snapshot;
        setStatusFilters(new Set(tableCommand.values));
        setPreviewDescription(
          tableCommand.values.length === 0
            ? null
            : `Marty filter: ${tableCommand.values.join(', ')} only`
        );
        break;

      case 'SEARCH':
        undoSnapshotRef.current = snapshot;
        setSearchQuery(tableCommand.query);
        setPreviewDescription(`Marty search: "${tableCommand.query}"`);
        break;

      case 'SET_COLUMN_VISIBILITY':
        undoSnapshotRef.current = snapshot;
        setColumnConfigs(prev =>
          prev.map(c =>
            c.id === tableCommand.columnId ? { ...c, visible: tableCommand.visible } : c
          )
        );
        setPreviewDescription(
          tableCommand.visible
            ? `Marty: showing "${tableCommand.columnId}" column`
            : `Marty: hiding "${tableCommand.columnId}" column`
        );
        break;

      case 'SORT':
        undoSnapshotRef.current = snapshot;
        setSortField(tableCommand.field as SortField);
        setSortDir(tableCommand.dir === 'asc' ? 'ascending' : 'descending');
        setPreviewDescription(`Marty sort: ${tableCommand.field} ${tableCommand.dir}`);
        break;

      case 'PREVIEW_BUDGET_ADJUSTMENT': {
        undoSnapshotRef.current = snapshot;
        const newBudgets: Record<string, string> = {};
        CAMPAIGNS.forEach(c => {
          if (!c.totalBudget) return;
          const raw = parseFloat(c.totalBudget.replace(/[$,]/g, ''));
          let adjusted: number;
          if (tableCommand.mode === 'percent') {
            adjusted = raw * (1 + tableCommand.amount / 100);
          } else {
            adjusted = raw + tableCommand.amount;
          }
          newBudgets[c.id] = '$' + adjusted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        });
        setPreviewedBudgets(newBudgets);
        const sign = tableCommand.amount >= 0 ? '+' : '';
        const label = tableCommand.mode === 'percent'
          ? `${sign}${tableCommand.amount}% budget`
          : `${sign}$${Math.abs(tableCommand.amount).toLocaleString()} budget`;
        setPreviewDescription(`Marty preview: ${label} across all campaigns`);
        break;
      }

      case 'APPLY_PREVIEWS':
        setPreviewDescription(null);
        undoSnapshotRef.current = null;
        break;

      case 'REVERT_PREVIEWS': {
        const s = undoSnapshotRef.current;
        if (s) {
          setStatusFilters(s.statusFilters);
          setColumnConfigs(s.columnConfigs);
          setSearchQuery(s.searchQuery);
          setSortField(s.sortField);
          setSortDir(s.sortDir);
          setPreviewedBudgets(s.previewedBudgets);
        }
        setPreviewDescription(null);
        undoSnapshotRef.current = null;
        break;
      }
    }

    setTableCommand(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableCommand]);

  /* ── Sort handlers ── */
  const handleSort = (field: SortField) => () => {
    if (sortField === field) {
      setSortDir((prev) => (prev === 'ascending' ? 'descending' : 'ascending'));
    } else {
      setSortField(field);
      setSortDir('ascending');
    }
  };
  const sortFor = (field: SortField): SortDir => (sortField === field ? sortDir : 'none');

  /* ── Expand / select ── */
  const toggleExpand = (id: string) => setExpandedIds((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleRow = (id: string) => setSelectedIds((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleStatusFilter = (status: string) => setStatusFilters((prev) => { const n = new Set(prev); n.has(status) ? n.delete(status) : n.add(status); return n; });

  const allPageIds = paginatedData.map((c) => c.id);
  const allSelected = allPageIds.length > 0 && allPageIds.every((id) => selectedIds.has(id));
  const someSelected = allPageIds.some((id) => selectedIds.has(id)) && !allSelected;

  const toggleAll = () => {
    if (allSelected || someSelected) {
      setSelectedIds((prev) => { const n = new Set(prev); allPageIds.forEach((id) => n.delete(id)); return n; });
    } else {
      setSelectedIds((prev) => { const n = new Set(prev); allPageIds.forEach((id) => n.add(id)); return n; });
    }
  };

  /* ================================================================
     COLUMN HEADER RENDERER
     ================================================================ */
  const renderHeader = (col: ColumnConfig) => {
    const width = columnWidths[col.id] ?? 140;
    const frozen = col.pinned ? 'left' as const : undefined;

    switch (col.id) {
      case 'campaign':
        return (
          <DataTableHeader key={col.id} onSort={handleSort('name')} sort={sortFor('name')} width={width} resizable onResize={handleColumnResize('campaign')} frozen={frozen}>
            {t('dataTable.colCampaign')}
          </DataTableHeader>
        );
      case 'status':
        return (
          <DataTableHeader key={col.id} onSort={handleSort('status')} sort={sortFor('status')} width={width} resizable onResize={handleColumnResize('status')} frozen={frozen}>
            {t('dataTable.colStatus')}
          </DataTableHeader>
        );
      case 'recommendations':
        return (
          <DataTableHeader key={col.id} width={width} resizable onResize={handleColumnResize('recommendations')} frozen={frozen}>
            {t('dataTable.colRecommendations')}
          </DataTableHeader>
        );
      case 'totalBudget':
        return (
          <DataTableHeader key={col.id} alignment="right" onSort={handleSort('totalBudget')} sort={sortFor('totalBudget')} width={width} resizable onResize={handleColumnResize('totalBudget')} frozen={frozen}>
            {t('dataTable.colTotalBudget')}
          </DataTableHeader>
        );
      case 'targetingStrategy':
        return (
          <DataTableHeader key={col.id} width={width} resizable onResize={handleColumnResize('targetingStrategy')} frozen={frozen}>
            {t('dataTable.colTargetingStrategy')}
          </DataTableHeader>
        );
      case 'impressions':
        return (
          <DataTableHeader key={col.id} alignment="right" onSort={handleSort('impressions')} sort={sortFor('impressions')} width={width} resizable onResize={handleColumnResize('impressions')} frozen={frozen}>
            {t('dataTable.colImpressions')}
          </DataTableHeader>
        );
      case 'pacing':
        return (
          <DataTableHeader key={col.id} alignment="right" onSort={handleSort('pacing')} sort={sortFor('pacing')} width={width} resizable onResize={handleColumnResize('pacing')} frozen={frozen}>
            {t('dataTable.colPacing')}
          </DataTableHeader>
        );
      default:
        return null;
    }
  };

  /* ================================================================
     COLUMN CELL RENDERER (parent row)
     ================================================================ */
  const renderCell = (col: ColumnConfig, campaign: Campaign) => {
    const frozen = col.pinned ? 'left' as const : undefined;

    switch (col.id) {
      case 'campaign':
        return (
          <DataTableCell key={col.id} id={`name-${campaign.id}`} frozen={frozen}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
              {campaign.children && campaign.children.length > 0 ? (
                <button
                  type="button"
                  onClick={() => toggleExpand(campaign.id)}
                  style={INLINE_STYLES.expandButton}
                  aria-label={expandedIds.has(campaign.id) ? t('dataTable.collapse') : t('dataTable.expand')}
                >
                  {expandedIds.has(campaign.id)
                    ? <ChevronDown style={{ width: 20, height: 20 }} />
                    : <ChevronRight style={{ width: 20, height: 20 }} />}
                </button>
              ) : (
                <span style={{ width: '24px', flexShrink: 0 }} />
              )}
              <div style={{ flex: 1 }}>
                <span style={INLINE_STYLES.campaignLink}>
                  {CAMPAIGN_NAME_KEYS[campaign.id] ? t(CAMPAIGN_NAME_KEYS[campaign.id]) : campaign.name}
                </span>
                <div style={INLINE_STYLES.campaignId}>{t('dataTable.idLabel')}: {campaign.id}</div>
              </div>
            </div>
          </DataTableCell>
        );
      case 'status':
        return (
          <DataTableCellStatus key={col.id} frozen={frozen}>
            <Tag variant="tertiary" color={STATUS_TAG_COLORS[campaign.status]}>
              {t(STATUS_KEYS[campaign.status])}
            </Tag>
          </DataTableCellStatus>
        );
      case 'recommendations':
        return (
          <DataTableCell key={col.id} frozen={frozen}>
            {campaign.recommendations > 0 ? (
              <Tag
                variant="tertiary"
                color="negative"
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                {t('dataTable.recommendation', { count: campaign.recommendations })}
              </Tag>
            ) : '-'}
          </DataTableCell>
        );
      case 'totalBudget': {
        const isPreviewBudget = previewedBudgets && previewedBudgets[campaign.id];
        return (
          <DataTableCell key={col.id} variant="numeric" frozen={frozen}>
            {isPreviewBudget ? (
              <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1px' }}>
                <span style={{ fontWeight: 700, color: 'var(--ld-semantic-color-text-info, #1A60B5)' }}>
                  {previewedBudgets![campaign.id]}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--ld-semantic-color-text-subtle, #74767C)', textDecoration: 'line-through' }}>
                  {campaign.totalBudget}
                </span>
              </span>
            ) : (campaign.totalBudget ?? '-')}
          </DataTableCell>
        );
      }
      case 'targetingStrategy':
        return (
          <DataTableCell key={col.id} frozen={frozen}>
            {campaign.targetingStrategy ? t(TARGETING_KEYS[campaign.targetingStrategy] ?? campaign.targetingStrategy) : '-'}
          </DataTableCell>
        );
      case 'impressions':
        return <DataTableCell key={col.id} variant="numeric" frozen={frozen}>{campaign.impressions ?? '-'}</DataTableCell>;
      case 'pacing':
        return (
          <DataTableCell key={col.id} variant="numeric" frozen={frozen}>
            {campaign.pacing ? (
              <span style={{
                fontWeight: 600,
                color: campaign.pacing.trend === 'positive'
                  ? 'var(--ld-semantic-color-text-positive, #2A8703)'
                  : 'var(--ld-semantic-color-text-warning, #995213)',
              }}>
                {campaign.pacing.value}
              </span>
            ) : '-'}
          </DataTableCell>
        );
      default:
        return null;
    }
  };

  /* ================================================================
     COLUMN CELL RENDERER (child row)
     ================================================================ */
  const renderChildCell = (col: ColumnConfig, child: Campaign) => {
    const frozen = col.pinned ? 'left' as const : undefined;

    switch (col.id) {
      case 'campaign':
        return (
          <DataTableCell key={col.id} frozen={frozen}>
            <div style={{ paddingLeft: '40px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontSize: '14px', fontWeight: 600, textTransform: 'uppercase' as const,
                letterSpacing: '0.5px', color: 'var(--ld-semantic-color-text-subtle, #74767C)', flexShrink: 0,
              }}>
                {child.type === 'adgroup' ? t('dataTable.adGroupLabel') : t('dataTable.creativeLabel')}
              </span>
              <span style={INLINE_STYLES.campaignLink}>
                {CAMPAIGN_NAME_KEYS[child.id] ? t(CAMPAIGN_NAME_KEYS[child.id]) : child.name}
              </span>
            </div>
          </DataTableCell>
        );
      case 'status':
        return (
          <DataTableCellStatus key={col.id} frozen={frozen}>
            <Tag variant="tertiary" color={STATUS_TAG_COLORS[child.status]}>
              {t(STATUS_KEYS[child.status])}
            </Tag>
          </DataTableCellStatus>
        );
      case 'recommendations':
        return (
          <DataTableCell key={col.id} frozen={frozen}>
            {child.recommendations > 0 ? <span style={INLINE_STYLES.recBadge}>{child.recommendations}</span> : '-'}
          </DataTableCell>
        );
      default:
        return <DataTableCell key={col.id} variant={col.id === 'totalBudget' || col.id === 'impressions' || col.id === 'pacing' ? 'numeric' : 'alphanumeric'} frozen={frozen}>-</DataTableCell>;
    }
  };

  const inlineStyles = INLINE_STYLES;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {/* ── Column Config Panel ── */}
      <DataTableConfigPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        title="Customize Columns"
        columns={columnConfigs}
        onApply={(updated) => setColumnConfigs(updated)}
      />

      {/* ── Bulk Actions Bar ── */}
      {selectedIds.size > 0 && (
        <DataTableBulkActions
          count={selectedIds.size}
          onSelectAll={() => setSelectedIds(new Set(sortedData.map((c) => c.id)))}
          onClearSelected={() => setSelectedIds(new Set())}
          actionContent={
            <Button variant="secondary" size="small">
              {t('dataTable.archiveSelected')}
            </Button>
          }
        />
      )}

      {/* ── Marty Undo Bar ── */}
      {previewDescription && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          background: 'var(--ld-semantic-color-fill-info-subtle, #EDF4FF)',
          borderBottom: '1px solid var(--ld-semantic-color-border-info, #4A90D9)',
          fontSize: '13px',
          color: 'var(--ld-semantic-color-text, #2E2F32)',
          gap: '12px',
        }}>
          <span style={{ flex: 1 }}>{previewDescription}</span>
          <button
            type="button"
            onClick={() => {
              const s = undoSnapshotRef.current;
              if (s) {
                setStatusFilters(s.statusFilters);
                setColumnConfigs(s.columnConfigs);
                setSearchQuery(s.searchQuery);
                setSortField(s.sortField);
                setSortDir(s.sortDir);
                setPreviewedBudgets(s.previewedBudgets);
              }
              setPreviewDescription(null);
              undoSnapshotRef.current = null;
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 12px',
              borderRadius: '6px',
              border: '1px solid var(--ld-semantic-color-border-info, #4A90D9)',
              background: 'white',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--ld-semantic-color-text, #2E2F32)',
              whiteSpace: 'nowrap' as const,
              flexShrink: 0,
            }}
          >
            ↩ Undo
          </button>
        </div>
      )}

      {/* ── Table Title — also a Marty drop zone ── */}
      <div data-marty-dock-zone="campaigns-table" style={{ transition: 'box-shadow 200ms ease, background 200ms ease' }}>
        <DataTableTitle
          subtitle={t('dataTable.totalResults', { count: sortedData.length })}
          actions={
            <>
              <DockedMartyButton />
              <IconButton
                aria-label={t('dataTable.tableSettings')}
                variant="secondary"
                onClick={() => setIsPanelOpen(true)}
              >
                <Sliders />
              </IconButton>
              <IconButton aria-label={t('dataTable.download')} variant="secondary">
                <Download />
              </IconButton>
            </>
          }
        >
          {t('dataTable.colCampaign', 'Campaigns')}
        </DataTableTitle>
      </div>

      {/* ── Toolbar: Search + Filters ── */}
      <div style={inlineStyles.toolbar}>
        {/* Search */}
        <div style={inlineStyles.searchBar}>
          <Search style={{ width: 16, height: 16, flexShrink: 0, color: 'var(--ld-semantic-color-text, #2E2F32)' }} />
          <span style={inlineStyles.searchLabel}>{t('dataTable.searchBy')}</span>
          <DropdownMenu open={showScopeDropdown} onOpenChange={setShowScopeDropdown}>
            <DropdownMenuTrigger asChild>
              <button type="button" style={inlineStyles.scopeButton}>
                {searchScope === 'Campaign name' ? t('dataTable.campaignName') : t('dataTable.id')}
                {showScopeDropdown ? <ChevronUp style={{ width: 16, height: 16 }} /> : <ChevronDown style={{ width: 16, height: 16 }} />}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {(['Campaign name', 'ID'] as const).map((s) => (
                <DropdownMenuItem key={s} onClick={() => { setSearchScope(s); setShowScopeDropdown(false); }}>
                  {s === 'Campaign name' ? t('dataTable.campaignName') : t('dataTable.id')}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={inlineStyles.searchInput}
            placeholder=""
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery('')} style={inlineStyles.clearButton} aria-label={t('dataTable.clearSearch')}>
              <X style={{ width: 14, height: 14 }} />
            </button>
          )}
        </div>

        {/* Filter Chips */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          {(['Live', 'Scheduled', 'Paused', 'Completed'] as const).map((s) => (
            <FilterChip key={s} selected={statusFilters.has(s)} onSelectedChange={() => toggleStatusFilter(s)}>
              {t(STATUS_KEYS[s])}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* ── Table ── */}
      <DataTable>
        <DataTableHead>
          <DataTableRow>
            {/* Select — always frozen left */}
            <DataTableHeaderSelect
              checked={allSelected}
              indeterminate={someSelected}
              onChange={toggleAll}
              frozen="left"
              UNSAFE_style={{ width: columnWidths.select }}
            />

            {/* Dynamic columns */}
            {orderedVisibleCols.map((col) => renderHeader(col))}

            {/* Actions — always frozen right */}
            {showActionsCol && (
              <DataTableHeader alignment="right" width={columnWidths.actions} frozen="right">
                {t('dataTable.colActions')}
              </DataTableHeader>
            )}
          </DataTableRow>
        </DataTableHead>

        <DataTableBody>
          {paginatedData.length === 0 && (
            <DataTableRow>
              <DataTableCell
                UNSAFE_style={{ textAlign: 'center', padding: '32px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}
                colSpan={totalColSpan}
              >
                {t('dataTable.noResults')}
              </DataTableCell>
            </DataTableRow>
          )}

          {paginatedData.map((campaign) => (
            <Fragment key={campaign.id}>
              {/* ── Parent row ── */}
              <DataTableRow selected={selectedIds.has(campaign.id)}>
                <DataTableCellSelect
                  a11yLabelledBy={`name-${campaign.id}`}
                  checked={selectedIds.has(campaign.id)}
                  onChange={() => toggleRow(campaign.id)}
                  frozen="left"
                />
                {orderedVisibleCols.map((col) => renderCell(col, campaign))}
                {showActionsCol && (
                  <DataTableCellActions frozen="right">
                    <RowActionsMenu name={campaign.name} />
                  </DataTableCellActions>
                )}
              </DataTableRow>

              {/* ── Child rows (expanded) ── */}
              {expandedIds.has(campaign.id) && campaign.children?.map((child) => (
                <DataTableRow key={child.id}>
                  {/* Frozen spacer for select column */}
                  <DataTableCell frozen="left">{'\u00A0'}</DataTableCell>
                  {orderedVisibleCols.map((col) => renderChildCell(col, child))}
                  {showActionsCol && (
                    <DataTableCellActions frozen="right">
                      <RowActionsMenu name={child.name} />
                    </DataTableCellActions>
                  )}
                </DataTableRow>
              ))}
            </Fragment>
          ))}
        </DataTableBody>
      </DataTable>

      {/* ── Pagination ── */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalResults={sortedData.length}
        resultsPerPage={RESULTS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

/* ================================================================
   PAGINATION SUBCOMPONENT
   ================================================================ */

function Pagination({
  currentPage,
  totalPages,
  totalResults,
  resultsPerPage,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  resultsPerPage: number;
  onPageChange: (page: number) => void;
}) {
  const { t } = useTranslation('pages');

  return (
    <div style={INLINE_STYLES.paginationBar}>
      <span style={INLINE_STYLES.paginationInfo}>
        {t('dataTable.resultsPerPage', { count: resultsPerPage })} &middot; {t('dataTable.totalResults', { count: totalResults })}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <IconButton aria-label={t('dataTable.firstPage')} variant="ghost" size="small" disabled={currentPage <= 1} onClick={() => onPageChange(1)}>
          <ChevronLeft style={{ width: 16, height: 16 }} />
          <ChevronLeft style={{ width: 16, height: 16, marginLeft: -10 }} />
        </IconButton>
        <IconButton aria-label={t('dataTable.previousPage')} variant="ghost" size="small" disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)}>
          <ChevronLeft style={{ width: 16, height: 16 }} />
        </IconButton>
        <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text)', padding: '0 4px' }}>{t('dataTable.page')}</span>
        <span style={INLINE_STYLES.pageIndicator}>{currentPage}</span>
        <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text)', padding: '0 4px' }}>{t('dataTable.of', { count: totalPages })}</span>
        <IconButton aria-label={t('dataTable.nextPage')} variant="ghost" size="small" disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)}>
          <ChevronRight style={{ width: 16, height: 16 }} />
        </IconButton>
        <IconButton aria-label={t('dataTable.lastPage')} variant="ghost" size="small" disabled={currentPage >= totalPages} onClick={() => onPageChange(totalPages)}>
          <ChevronRight style={{ width: 16, height: 16 }} />
          <ChevronRight style={{ width: 16, height: 16, marginLeft: -10 }} />
        </IconButton>
      </div>
    </div>
  );
}

/* ================================================================
   INLINE STYLES
   ================================================================ */

const INLINE_STYLES = {
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderBottom: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
    background: 'var(--ld-semantic-color-surface-primary, #fff)',
    flexWrap: 'wrap' as const,
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    flex: '1 1 300px',
    minWidth: '260px',
    maxWidth: '460px',
    height: '32px',
    padding: '0 12px',
    border: '1px solid var(--ld-semantic-color-border-strong, #2E2F32)',
    borderRadius: '9999px',
    background: 'var(--ld-semantic-color-surface-primary, #fff)',
    fontSize: '14px',
  },
  searchLabel: {
    fontSize: '14px',
    color: 'var(--ld-semantic-color-text-subtle, #74767C)',
    whiteSpace: 'nowrap' as const,
    flexShrink: 0,
  },
  scopeButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2px',
    fontSize: '14px',
    fontWeight: 700,
    color: 'var(--ld-semantic-color-text, #2E2F32)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '2px 4px',
    borderRadius: '4px',
    whiteSpace: 'nowrap' as const,
  },
  searchInput: {
    flex: 1,
    fontSize: '14px',
    border: 'none',
    outline: 'none',
    background: 'transparent',
    color: 'var(--ld-semantic-color-text, #2E2F32)',
    minWidth: '40px',
  },
  clearButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: 'var(--ld-semantic-color-text, #2E2F32)',
    flexShrink: 0,
  },
  expandButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    flexShrink: 0,
    marginTop: '-2px',
    color: 'var(--ld-semantic-color-text, #2E2F32)',
  },
  campaignLink: {
    color: 'var(--ld-semantic-color-text, #2E2F32)',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '14px',
  },
  campaignId: {
    fontSize: '14px',
    color: 'var(--ld-semantic-color-text-subtle, #74767C)',
    marginTop: '2px',
  },
  recBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 400,
    background: 'var(--ld-semantic-color-fill-negative-subtle, #FDE7F3)',
    color: '#8C1E64',
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
  },
  paginationBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderTop: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
    background: 'var(--ld-semantic-color-surface-primary, #fff)',
  },
  paginationInfo: {
    fontSize: '14px',
    color: 'var(--ld-semantic-color-text, #2E2F32)',
  },
  pageIndicator: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '28px',
    height: '24px',
    border: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
    borderRadius: '4px',
    fontSize: '14px',
    color: 'var(--ld-semantic-color-text, #2E2F32)',
    padding: '0 4px',
  },
} as const;

/* ── Marty avatar button shown in DataTableTitle when docked to this section ── */
function DockedMartyButton() {
  const marty = useMartyOptional();
  const [hovered, setHovered] = useState(false);
  const [bubblePos, setBubblePos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);

  // Track button position for the portal bubble
  useEffect(() => {
    if (!hovered || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setBubblePos({
      top: rect.top + window.scrollY - 10, // 10px gap above button
      left: rect.left + window.scrollX + rect.width / 2,
    });
  }, [hovered]);

  // No-op if not inside MartyProvider or not docked to this section
  if (!marty) return null;
  const { isDocked, dockedSection, setIsSidePanel, setIsDocked, setDockedSection, setInitialPosition, setIsMinimized } = marty;

  // Show whenever docked to this section — regardless of whether side panel is open
  if (!(isDocked && dockedSection === 'campaigns-table')) return null;

  return (
    <>
      {/* Speech bubble rendered in a portal so it's never clipped */}
      {hovered && createPortal(
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: bubblePos.top,
            left: bubblePos.left,
            transform: 'translate(-50%, -100%)',
            pointerEvents: 'none',
            opacity: 1,
            whiteSpace: 'nowrap',
            zIndex: 99999,
          }}
        >
          <div style={{
            background: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
            borderRadius: '8px',
            padding: '6px 10px',
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--ld-semantic-color-text, #2e2f32)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            position: 'relative',
          }}>
            Ask me about this table
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '7px solid transparent',
              borderRight: '7px solid transparent',
              borderTop: '7px solid #ffffff',
              filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.08))',
            }} />
          </div>
        </div>,
        document.body
      )}

      {/* Icon-only button */}
      <button
        ref={btnRef}
        onClick={() => setIsSidePanel(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseDown={(e) => {
          setHovered(false);
          e.preventDefault();
          const startX = e.clientX;
          const startY = e.clientY;
          const btn = e.currentTarget;
          let moved = false;
          const onMove = (mv: MouseEvent) => {
            if (Math.hypot(mv.clientX - startX, mv.clientY - startY) > 5) {
              moved = true;
              setInitialPosition({ x: mv.clientX - 25, y: mv.clientY - 25 });
              setIsDocked(false);
              setDockedSection(null);
              // Close side panel when Marty is dragged off the table
              setIsSidePanel(false);
              setIsMinimized(false);
              window.removeEventListener('mousemove', onMove);
              window.removeEventListener('mouseup', onUp);
            }
          };
          const onUp = () => {
            if (moved) (btn as any)._dragged = true;
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
            setTimeout(() => { (btn as any)._dragged = false; }, 100);
          };
          window.addEventListener('mousemove', onMove);
          window.addEventListener('mouseup', onUp);
        }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          border: '1.5px solid transparent',
          backgroundImage: 'linear-gradient(white, white), linear-gradient(134deg, var(--ld-semantic-color-border-magic-start) 10.5%, var(--ld-semantic-color-border-magic-middle) 71.77%, var(--ld-semantic-color-border-magic-stop) 102.41%)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
          cursor: 'move',
          flexShrink: 0,
          transition: 'box-shadow 150ms ease',
          boxShadow: hovered ? '0 2px 8px rgba(0,0,0,0.12)' : 'none',
        }}
      >
        <div style={{ width: 24, height: 24, overflow: 'hidden', borderRadius: '50%' }}>
          <img
            src="/assets/sparky-wink.png"
            alt=""
            width={24}
            height={24}
            style={{ display: 'block', width: '100%', height: '100%' }}
          />
        </div>
      </button>
    </>
  );
}

