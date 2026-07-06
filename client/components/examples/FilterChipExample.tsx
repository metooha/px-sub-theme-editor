import * as React from 'react';
import { FilterChip } from '@/components/ui/FilterChip';
import { Filter, Check, X, Star, Sliders, ChevronDown } from '@/components/icons';

export function FilterChipExample() {
  // Multi-select filter demo
  const [filters, setFilters] = React.useState<Record<string, boolean>>({
    all: true,
    open: false,
    closed: false,
    assigned: false,
  });

  const toggleFilter = (key: string) => {
    if (key === 'all') {
      setFilters({ all: true, open: false, closed: false, assigned: false });
    } else {
      setFilters(prev => {
        const next = { ...prev, [key]: !prev[key], all: false };
        // If nothing selected, reset to "all"
        if (!next.open && !next.closed && !next.assigned) {
          next.all = true;
        }
        return next;
      });
    }
  };

  // Multi-select dropdown state
  const [multiSelectOpen, setMultiSelectOpen] = React.useState(false);
  const [multiSelectSelected, setMultiSelectSelected] = React.useState(false);

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Basic States */}
      <ExampleSection
        title="Filter Chip States (Toggle)"
        description="Filter chips are pill-shaped toggles (32px height) designed specifically for filtering interfaces."
      >
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <StateDemo label="Unselected">
            <FilterChip>Filter</FilterChip>
          </StateDemo>
          <StateDemo label="Selected">
            <FilterChip selected>Filter</FilterChip>
          </StateDemo>
          <StateDemo label="Disabled">
            <FilterChip disabled>Filter</FilterChip>
          </StateDemo>
          <StateDemo label="Selected + Disabled">
            <FilterChip selected disabled>Filter</FilterChip>
          </StateDemo>
        </div>
      </ExampleSection>

      {/* Multi-Select Variant */}
      <ExampleSection
        title="Multi-Select Variant"
        description="Filter chips that open dropdown menus. Shows ChevronDown when closed, ChevronUp when open."
      >
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Closed state - unselected */}
          <StateDemo label="Closed">
            <FilterChip isMultiSelect isOpen={false} iconLeading={<Filter />} showCount count={2}>
              Text label
            </FilterChip>
          </StateDemo>

          {/* Open state - unselected */}
          <StateDemo label="Open">
            <FilterChip isMultiSelect isOpen={true} iconLeading={<Filter />} showCount count={2}>
              Text label
            </FilterChip>
          </StateDemo>

          {/* Closed state - selected */}
          <StateDemo label="Closed + Selected">
            <FilterChip isMultiSelect isOpen={false} selected iconLeading={<Filter />} showCount count={2}>
              Text label
            </FilterChip>
          </StateDemo>

          {/* Open state - selected */}
          <StateDemo label="Open + Selected">
            <FilterChip isMultiSelect isOpen={true} selected iconLeading={<Filter />} showCount count={2}>
              Text label
            </FilterChip>
          </StateDemo>

          {/* Interactive example */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <FilterChip
              isMultiSelect
              isOpen={multiSelectOpen}
              selected={multiSelectSelected}
              onClick={() => setMultiSelectOpen(!multiSelectOpen)}
              onSelectedChange={setMultiSelectSelected}
              iconLeading={<Filter />}
              showCount
              count={3}
            >
              Interactive
            </FilterChip>
            <span style={{
              fontSize: '12px',
              color: 'var(--ld-semantic-color-text-subtle)',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
            }}>
              Click to toggle
            </span>
          </div>
        </div>
      </ExampleSection>

      {/* With Icons */}
      <ExampleSection
        title="With Icons"
        description="Filter chips support leading and trailing icons."
      >
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <FilterChip iconLeading={<Filter />} selected>
            Filtered
          </FilterChip>
          <FilterChip iconLeading={<Star />}>
            Favorites
          </FilterChip>
          <FilterChip iconTrailing={<X />} selected>
            Remove
          </FilterChip>
          <FilterChip iconLeading={<Check />} iconTrailing={<X />} selected>
            Both Icons
          </FilterChip>
        </div>
      </ExampleSection>

      {/* All Filters Variant */}
      <ExampleSection
        title="All Filters Variant"
        description="Special variant with Sliders icon, optional label, and optional count. Perfect for 'All Filters' buttons."
      >
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Icon + Label + Count */}
          <FilterChip isAllFilters selected showCount count={2}>
            All Filters
          </FilterChip>

          {/* Icon + Label (no count) */}
          <FilterChip isAllFilters selected>
            All Filters
          </FilterChip>

          {/* Icon + Count (no label) */}
          <FilterChip isAllFilters selected showLabel={false} showCount count={3} />

          {/* Icon only (no label, no count) */}
          <FilterChip isAllFilters selected showLabel={false} />

          {/* Unselected states */}
          <FilterChip isAllFilters showCount count={2}>
            All Filters
          </FilterChip>

          <FilterChip isAllFilters showLabel={false} showCount count={5} />
        </div>
      </ExampleSection>

      {/* With Count (Figma Anatomy) */}
      <ExampleSection
        title="With Count"
        description="Filter chips can display counts to show number of selected items or active filters."
      >
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Multi variant with count */}
          <FilterChip iconLeading={<Filter />} iconTrailing={<ChevronDown />} selected>
            Text label (2)
          </FilterChip>

          {/* Toggle variant with count */}
          <FilterChip iconLeading={<Filter />} selected>
            Text label
          </FilterChip>

          {/* Standard variant with Sliders icon and count (not using isAllFilters) */}
          <FilterChip iconLeading={<Sliders />} selected>
            Filters (2)
          </FilterChip>
        </div>
      </ExampleSection>

      {/* Filter Group Pattern */}
      <ExampleSection
        title="Filter Group Pattern"
        description="Common pattern for filtering lists. 'All' (icon-only) is mutually exclusive with other filters."
      >
        <div
          role="group"
          aria-label="Status filters"
          style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}
        >
          <FilterChip
            isAllFilters
            showLabel={false}
            selected={filters.all}
            onSelectedChange={() => toggleFilter('all')}
          />
          <FilterChip
            selected={filters.open}
            onSelectedChange={() => toggleFilter('open')}
          >
            Open
          </FilterChip>
          <FilterChip
            selected={filters.closed}
            onSelectedChange={() => toggleFilter('closed')}
          >
            Closed
          </FilterChip>
          <FilterChip
            selected={filters.assigned}
            onSelectedChange={() => toggleFilter('assigned')}
          >
            Assigned to me
          </FilterChip>
        </div>
      </ExampleSection>

      {/* Filter Group with Multi-Select */}
      <ExampleSection
        title="Filter Group with Multi-Select"
        description="Filter group pattern with multi-select dropdown. Count is hidden by default (set showCount={true} to display active filter count)."
      >
        <div
          role="group"
          aria-label="Advanced status filters"
          style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}
        >
          <FilterChip
            isAllFilters
            showLabel={false}
            selected={filters.all}
            onSelectedChange={() => toggleFilter('all')}
          />
          <FilterChip
            isMultiSelect
            isOpen={multiSelectOpen}
            selected={filters.open || filters.closed}
            onClick={() => setMultiSelectOpen(!multiSelectOpen)}
            iconLeading={<Filter />}
            /* Count hidden by default for multi-select (showCount defaults to false) */
          >
            Status
          </FilterChip>
          <FilterChip
            selected={filters.assigned}
            onSelectedChange={() => toggleFilter('assigned')}
          >
            Assigned to me
          </FilterChip>
        </div>
      </ExampleSection>

      {/* Usage Code */}
      <ExampleSection
        title="Usage"
        description="Import and use the FilterChip (Toggle) component for filtering interfaces. Single size (32px) and single variant."
      >
        <pre style={{
          fontFamily: 'var(--ld-semantic-font-family-mono)',
          fontSize: '13px',
          color: 'var(--ld-semantic-color-text)',
          lineHeight: '1.6',
          overflowX: 'auto',
          padding: '16px',
          backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
          borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
          margin: 0,
        }}>
{`import { FilterChip } from '@/components/ui/FilterChip';

// Basic filter chip (Toggle variant, 32px height)
<FilterChip selected={isActive} onSelectedChange={setIsActive}>
  Filter
</FilterChip>

// With icon
<FilterChip iconLeading={<FilterIcon />} selected>
  Filtered
</FilterChip>

// Multi-Select variant (dropdown trigger)
// Shows ChevronDown when closed, ChevronUp when open
// Count is hidden by default - use showCount to display it
<FilterChip
  isMultiSelect
  isOpen={menuOpen}
  selected={hasFilters}
  iconLeading={<FilterIcon />}
  showCount
  count={2}
  onClick={() => setMenuOpen(!menuOpen)}
>
  Text label
</FilterChip>

// All Filters variant - Icon + Label + Count
<FilterChip isAllFilters selected showCount count={3}>
  All Filters
</FilterChip>

// All Filters - Icon + Count only (no label)
<FilterChip isAllFilters selected showLabel={false} showCount count={5} />

// All Filters - Icon only (no label or count, 28x28)
<FilterChip isAllFilters selected showLabel={false} />

// Disabled
<FilterChip disabled>Unavailable</FilterChip>`}
        </pre>
      </ExampleSection>
    </div>
  );
}

/* ─── Helper sub-components ─── */

function ExampleSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 style={{
        fontSize: '16px',
        fontWeight: 700,
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        color: 'var(--ld-semantic-color-text)',
        marginBottom: '4px',
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '14px',
        color: 'var(--ld-semantic-color-text-subtle)',
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        marginBottom: '16px',
        lineHeight: '1.5',
      }}>
        {description}
      </p>
      {children}
    </div>
  );
}

function StateDemo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
    }}>
      {children}
      <span style={{
        fontSize: '12px',
        color: 'var(--ld-semantic-color-text-subtle)',
        fontFamily: 'var(--ld-semantic-font-family-sans)',
      }}>
        {label}
      </span>
    </div>
  );
}

function VariantLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: 'block',
      fontSize: '13px',
      fontWeight: 600,
      fontFamily: 'var(--ld-semantic-font-family-sans)',
      color: 'var(--ld-semantic-color-text-subtle)',
      marginBottom: '12px',
      textTransform: 'uppercase',
      letterSpacing: '0.4px',
    }}>
      {children}
    </span>
  );
}
