import * as React from 'react';
import styles from './DataTableHeader.module.css';
import { SortDown } from '@/components/icons/SortDown';
import { SortUp } from '@/components/icons/SortUp';
import { ArrowsUpDown } from '@/components/icons/ArrowsUpDown';

interface CommonProps {
  'aria-label'?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export type DataTableHeaderAlignment = 'left' | 'right';
export type DataTableHeaderSort = 'ascending' | 'descending' | 'none';

export type DataTableFrozen = 'left' | 'right';

export interface DataTableHeaderProps
  extends Omit<React.ComponentPropsWithoutRef<'th'>, 'align' | 'className' | 'style'>,
    CommonProps {
  /** Text alignment. @default "left" */
  alignment?: DataTableHeaderAlignment;
  /** Header text label. */
  children: string;
  /** Callback when sorting is requested. Presence enables the sort button. */
  onSort?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /** Current sort order. @default "none" */
  sort?: DataTableHeaderSort;
  /** Column width. */
  width?: number | string;
  /** Enable column resizing via drag handle. */
  resizable?: boolean;
  /** Callback fired during resize with the new width in pixels. */
  onResize?: (newWidth: number) => void;
  /** Minimum column width in pixels when resizing. @default 60 */
  minWidth?: number;
  /** Freeze (sticky) this column to the left or right edge. */
  frozen?: DataTableFrozen;
}

/**
 * Column header with optional sort button.
 */
export const DataTableHeader = React.forwardRef<HTMLTableCellElement, DataTableHeaderProps>(
  (
    {
      alignment = 'left',
      children,
      onSort,
      sort = 'none',
      width,
      resizable,
      onResize,
      minWidth = 60,
      frozen,
      UNSAFE_className,
      UNSAFE_style,
      ...props
    },
    ref,
  ) => {
    const thRef = React.useRef<HTMLTableCellElement | null>(null);

    const handleMouseDown = React.useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const startX = e.clientX;
        const startWidth = thRef.current?.getBoundingClientRect().width ?? 0;

        const handleMouseMove = (moveEvent: MouseEvent) => {
          const delta = moveEvent.clientX - startX;
          const newWidth = Math.max(minWidth, startWidth + delta);
          onResize?.(newWidth);
        };

        const handleMouseUp = () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
          document.body.style.cursor = '';
          document.body.style.userSelect = '';
        };

        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      },
      [minWidth, onResize],
    );

    const alignClass =
      alignment === 'right' ? styles.headerRight : styles.headerLeft;

    const className = [
      styles.header,
      alignClass,
      frozen && styles.frozen,
      UNSAFE_className,
    ].filter(Boolean).join(' ');

    const style: React.CSSProperties = {
      ...UNSAFE_style,
      ...(width != null ? { width } : {}),
      ...(frozen === 'left' ? { left: 0 } : {}),
      ...(frozen === 'right' ? { right: 0 } : {}),
    };

    const sortIcon =
      sort === 'ascending' ? (
        <SortUp aria-hidden />
      ) : sort === 'descending' ? (
        <SortDown aria-hidden />
      ) : (
        <ArrowsUpDown aria-hidden />
      );

    return (
      <th
        ref={(node) => {
          thRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLTableCellElement | null>).current = node;
        }}
        className={className}
        style={style}
        scope="col"
        aria-sort={onSort ? (sort === 'none' ? 'none' : sort) : undefined}
        {...props}
      >
        {onSort ? (
          <button
            type="button"
            className={styles.sortButton}
            onClick={onSort}
          >
            <span className={styles.sortLabel}>{children}</span>
            <span className={styles.sortIcon}>{sortIcon}</span>
          </button>
        ) : (
          <span className={styles.headerLabel}>{children}</span>
        )}
        {resizable && (
          <span
            role="separator"
            aria-orientation="vertical"
            className={styles.resizeHandle}
            onMouseDown={handleMouseDown}
          />
        )}
      </th>
    );
  },
);
DataTableHeader.displayName = 'DataTableHeader';
