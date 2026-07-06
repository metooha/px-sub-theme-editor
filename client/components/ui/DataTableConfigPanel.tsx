import React from 'react';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import styles from './DataTableConfigPanel.module.css';

/* ─── Column config type ─── */
export interface ColumnConfig {
  id: string;
  label: string;
  visible: boolean;
  /** Frozen/pinned to the left */
  pinned: boolean;
  /** If true, the column cannot be hidden (e.g. "Campaign") */
  alwaysVisible?: boolean;
  /** If true, the column is always pinned and cannot be changed (e.g. "Actions") */
  alwaysPinned?: boolean;
}

/* ─── SVGs from Figma ─── */
const DragHandleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M10.5 6C10.5 6.82843 9.82843 7.5 9 7.5C8.17157 7.5 7.5 6.82843 7.5 6C7.5 5.17157 8.17157 4.5 9 4.5C9.82843 4.5 10.5 5.17157 10.5 6Z" fill="currentColor"/>
    <path d="M10.5 12C10.5 12.8284 9.82843 13.5 9 13.5C8.17157 13.5 7.5 12.8284 7.5 12C7.5 11.1716 8.17157 10.5 9 10.5C9.82843 10.5 10.5 11.1716 10.5 12Z" fill="currentColor"/>
    <path d="M10.5 18C10.5 18.8284 9.82843 19.5 9 19.5C8.17157 19.5 7.5 18.8284 7.5 18C7.5 17.1716 8.17157 16.5 9 16.5C9.82843 16.5 10.5 17.1716 10.5 18Z" fill="currentColor"/>
    <path d="M16.5 6C16.5 6.82843 15.8284 7.5 15 7.5C14.1716 7.5 13.5 6.82843 13.5 6C13.5 5.17157 14.1716 4.5 15 4.5C15.8284 4.5 16.5 5.17157 16.5 6Z" fill="currentColor"/>
    <path d="M16.5 12C16.5 12.8284 15.8284 13.5 15 13.5C14.1716 13.5 13.5 12.8284 13.5 12C13.5 11.1716 14.1716 10.5 15 10.5C15.8284 10.5 16.5 11.1716 16.5 12Z" fill="currentColor"/>
    <path d="M16.5 18C16.5 18.8284 15.8284 19.5 15 19.5C14.1716 19.5 13.5 18.8284 13.5 18C13.5 17.1716 14.1716 16.5 15 16.5C15.8284 16.5 16.5 17.1716 16.5 18Z" fill="currentColor"/>
  </svg>
);

const PinFillIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M8.96944 1.14571C8.77516 0.95143 8.46017 0.95143 8.26588 1.14571L8.14589 1.26571C7.95161 1.45999 7.95161 1.77498 8.14589 1.96926L8.61745 2.44073L5.28887 5.76983L2.28898 6.29907L1.20585 7.38219L4.49984 10.6762L1.14571 14.0307C0.95143 14.225 0.95143 14.54 1.14571 14.7343L1.26571 14.8543C1.45999 15.0486 1.77498 15.0486 1.96926 14.8543L5.32368 11.5L8.61747 14.7938L9.70165 13.7096L10.2318 10.7095L13.559 7.38229L14.0307 7.85411C14.225 8.04839 14.54 8.04839 14.7343 7.85411L14.8543 7.73412C15.0486 7.53983 15.0486 7.22484 14.8543 7.03056L8.96944 1.14571Z" fill="currentColor"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M11.7803 13.0787L18 19.2983L19.0607 18.2377L12.841 12.018L19.0607 5.79833L18 4.73767L11.7803 10.9573L5.56066 4.73767L4.5 5.79833L10.7197 12.018L4.5 18.2377L5.56066 19.2983L11.7803 13.0787Z" fill="currentColor"/>
  </svg>
);

/* ─── Props ─── */
export interface DataTableConfigPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  columns: ColumnConfig[];
  onApply: (columns: ColumnConfig[]) => void;
}

export function DataTableConfigPanel({
  isOpen,
  onClose,
  title = 'Customize Columns',
  columns,
  onApply,
}: DataTableConfigPanelProps) {
  const [localColumns, setLocalColumns] = React.useState<ColumnConfig[]>(columns);
  const [dragIndex, setDragIndex] = React.useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = React.useState<number | null>(null);

  /* Sync local state when panel opens */
  React.useEffect(() => {
    if (isOpen) setLocalColumns(columns);
  }, [isOpen, columns]);

  if (!isOpen) return null;

  const totalCount = localColumns.length;
  const visibleCount = localColumns.filter((c) => c.visible).length;

  /* ── Handlers ── */
  const handleSelectAll = () => {
    setLocalColumns((cols) =>
      cols.map((c) => ({ ...c, visible: true })),
    );
  };

  const handleClearSelected = () => {
    setLocalColumns((cols) =>
      cols.map((c) =>
        c.alwaysVisible || c.alwaysPinned ? c : { ...c, visible: false, pinned: false },
      ),
    );
  };

  const handleToggleVisible = (id: string) => {
    setLocalColumns((cols) =>
      cols.map((c) =>
        c.id === id
          ? { ...c, visible: !c.visible, pinned: !c.visible ? c.pinned : false }
          : c,
      ),
    );
  };

  const handleTogglePinned = (id: string) => {
    setLocalColumns((cols) =>
      cols.map((c) => (c.id === id ? { ...c, pinned: !c.pinned } : c)),
    );
  };

  /* ── Drag and drop ── */
  const handleDragStart = (index: number) => setDragIndex(index);

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (targetIndex: number) => {
    if (dragIndex === null || dragIndex === targetIndex) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }
    const next = [...localColumns];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(targetIndex, 0, moved);
    /* Keep alwaysVisible at front and alwaysPinned at end */
    const alwaysVis = next.filter((c) => c.alwaysVisible);
    const alwaysPin = next.filter((c) => c.alwaysPinned);
    const rest = next.filter((c) => !c.alwaysVisible && !c.alwaysPinned);
    setLocalColumns([...alwaysVis, ...rest, ...alwaysPin]);
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleApply = () => {
    onApply(localColumns);
    onClose();
  };

  const handleCancel = () => {
    setLocalColumns(columns);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleCancel} aria-modal role="dialog" aria-label={title}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleCancel}
            aria-label="Close panel"
          >
            <CloseIcon />
          </button>
        </div>

        <div className={styles.divider} />

        {/* Content */}
        <div className={styles.content}>
          {/* Select all / Clear selected */}
          <div className={styles.actionsRow}>
            <button type="button" className={styles.linkButton} onClick={handleSelectAll}>
              Select all ({totalCount})
            </button>
            <button type="button" className={styles.linkButton} onClick={handleClearSelected}>
              Clear selected ({visibleCount})
            </button>
          </div>

          {/* Column list */}
          <div className={styles.columnList}>
            {localColumns.map((col, index) => {
              const isDragging = dragIndex === index;
              const isDragOver = dragOverIndex === index && dragIndex !== index;
              const canDrag = !col.alwaysVisible && !col.alwaysPinned && col.visible;

              return (
                <div
                  key={col.id}
                  className={[
                    styles.columnRow,
                    isDragging && styles.columnRowDragging,
                    isDragOver && styles.columnRowDragOver,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  draggable={canDrag}
                  onDragStart={canDrag ? () => handleDragStart(index) : undefined}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={() => handleDrop(index)}
                  onDragEnd={handleDragEnd}
                >
                  {/* Left: checkbox + label */}
                  <div className={styles.columnRowLeft}>
                    <Checkbox
                      checked={col.visible}
                      disabled={col.alwaysVisible || col.alwaysPinned}
                      onCheckedChange={() => {
                        if (!col.alwaysVisible && !col.alwaysPinned) handleToggleVisible(col.id);
                      }}
                      aria-label={`Show ${col.label} column`}
                    />
                    <span
                      className={[
                        styles.columnLabel,
                        (col.alwaysVisible || col.alwaysPinned) && styles.columnLabelDisabled,
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {col.label}
                    </span>
                  </div>

                  {/* Right: pin + drag */}
                  <div className={styles.columnRowRight}>
                    {/* Pin button — always pinned shows filled pin (disabled), visible columns show pin on hover/when active */}
                    {col.alwaysPinned ? (
                      <span className={[styles.pinButton, styles.pinButtonActive].join(' ')} aria-label="Always pinned">
                        <PinFillIcon />
                      </span>
                    ) : col.visible ? (
                      <button
                        type="button"
                        className={[styles.pinButton, col.pinned && styles.pinButtonActive]
                          .filter(Boolean)
                          .join(' ')}
                        onClick={() => handleTogglePinned(col.id)}
                        aria-label={col.pinned ? `Unpin ${col.label}` : `Pin ${col.label} column`}
                        title={col.pinned ? `Unpin ${col.label}` : `Pin ${col.label} to left`}
                      >
                        <PinFillIcon />
                      </button>
                    ) : (
                      /* spacer so layout stays aligned */
                      <span className={styles.pinButtonSpacer} />
                    )}

                    {/* Drag handle — shown for visible non-alwaysVisible columns */}
                    <span
                      className={[styles.dragHandle, !canDrag && styles.dragHandleHidden]
                        .filter(Boolean)
                        .join(' ')}
                      aria-hidden
                    >
                      <DragHandleIcon />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.divider} />

        {/* Footer */}
        <div className={styles.footer}>
          <button type="button" className={styles.linkButton} onClick={handleCancel}>
            Cancel
          </button>
          <Button variant="secondary" size="small" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
