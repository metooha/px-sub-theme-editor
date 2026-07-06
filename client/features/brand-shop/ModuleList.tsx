import { useState } from 'react';
import { useResizablePanel } from '@/hooks/useResizablePanel';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Select, SelectItem } from '@/components/ui/Select';
import { ExternalLink, Drag, ArrowUp, ArrowDown, PanelLeft, ChevronRight } from '@/components/icons';
import type { ShopModule, ModuleType } from './types';
import styles from './ModuleList.module.css';

const PANEL_DEFAULT = 200;
const PANEL_MIN = 160;
const PANEL_MAX = 400;

interface ModuleListProps {
  modules: ShopModule[];
  selectedModuleId: string | null;
  templateName: string;
  onSelectModule: (id: string) => void;
  onReorder: (modules: ShopModule[]) => void;
  onAddModule: (type: ModuleType) => void;
}

export function ModuleList({
  modules,
  selectedModuleId,
  templateName,
  onSelectModule,
  onReorder,
  onAddModule,
}: ModuleListProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const { width: panelWidth, resizeHandleProps } = useResizablePanel({
    storageKey: 'brand-shop-module-list-width',
    defaultWidth: PANEL_DEFAULT,
    minWidth: PANEL_MIN,
    maxWidth: PANEL_MAX,
    handleEdge: 'right',
  });

  const moveModule = (index: number, direction: 'up' | 'down') => {
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= modules.length) return;
    const next = [...modules];
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
    onReorder(next);
  };

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const next = [...modules];
    const [draggedItem] = next.splice(draggedIndex, 1);
    next.splice(dropIndex, 0, draggedItem);

    onReorder(next);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleAddSection = (value: string) => {
    if (value === 'add') return;
    onAddModule(value as ModuleType);
  };

  if (collapsed) {
    return (
      <aside className={`${styles.panel} ${styles.panelCollapsed}`}>
        <div className={styles.collapsedContent}>
          <IconButton
            variant="ghost"
            size="small"
            aria-label="Expand panel"
            onClick={() => setCollapsed(false)}
          >
            <ChevronRight style={{ width: 16, height: 16 }} />
          </IconButton>
          <div className={styles.collapsedModules}>
            {modules.map((mod) => {
              const isSelected = mod.id === selectedModuleId;
              return (
                <IconButton
                  key={mod.id}
                  variant="ghost"
                  size="small"
                  aria-label={mod.label}
                  onClick={() => { onSelectModule(mod.id); setCollapsed(false); }}
                  UNSAFE_className={isSelected ? styles.collapsedItemSelected : ''}
                >
                  <PanelLeft style={{ width: 16, height: 16 }} />
                </IconButton>
              );
            })}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={styles.panel}
      style={{ width: panelWidth, minWidth: PANEL_MIN }}
    >
      <div className={styles.header}>
        <div className={styles.headerTopRow}>
          <div className={styles.templateRow}>
            <span className={styles.templateLabel}>Template:</span>
            <span className={styles.templateName}>{templateName}</span>
          </div>
          <IconButton
            variant="ghost"
            size="small"
            aria-label="Collapse panel"
            onClick={() => setCollapsed(true)}
          >
            <PanelLeft style={{ width: 16, height: 16 }} />
          </IconButton>
        </div>
        <Select size="small" label="" value="add" onValueChange={handleAddSection}>
          <SelectItem value="add">Add section</SelectItem>
          <SelectItem value="hero-banner">Hero banner</SelectItem>
          <SelectItem value="category-hub">Category hub</SelectItem>
          <SelectItem value="skinny-banner">Skinny banner</SelectItem>
          <SelectItem value="item-carousel">Item carousel</SelectItem>
        </Select>
      </div>

      <ul className={styles.moduleListUl}>
        {modules.map((mod, index) => {
          const isSelected = mod.id === selectedModuleId;
          return (
            <li
              key={mod.id}
              className={`${styles.moduleItem} ${draggedIndex === index ? styles.moduleItemDragging : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
            >
              <Button
                variant="tertiary"
                size="small"
                UNSAFE_className={`${styles.moduleButton} ${isSelected ? styles.moduleButtonSelected : ''}`}
                onClick={() => onSelectModule(mod.id)}
                leading={<Drag style={{ width: 16, height: 16, cursor: 'grab' }} />}
              >
                <span className={styles.moduleLabel}>{mod.label}</span>
              </Button>
              <div className={styles.moduleActions}>
                <IconButton
                  variant="ghost"
                  size="small"
                  aria-label={`Move ${mod.label} up`}
                  onClick={() => moveModule(index, 'up')}
                >
                  <ArrowUp style={{ width: 14, height: 14 }} />
                </IconButton>
                <IconButton
                  variant="ghost"
                  size="small"
                  aria-label={`Move ${mod.label} down`}
                  onClick={() => moveModule(index, 'down')}
                >
                  <ArrowDown style={{ width: 14, height: 14 }} />
                </IconButton>
                <IconButton
                  variant="ghost"
                  size="small"
                  aria-label={`Edit ${mod.label}`}
                  onClick={() => onSelectModule(mod.id)}
                >
                  <ExternalLink style={{ width: 16, height: 16 }} />
                </IconButton>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Right-edge resize handle */}
      <div
        className={styles.resizeHandle}
        {...resizeHandleProps}
        aria-label="Resize module list panel"
      >
        <div className={styles.resizeIndicator} />
      </div>
    </aside>
  );
}
