import { Tag, type TagColor } from '@/components/ui/Tag';
import type { ShelfStatus } from './types';

const STATUS_CONFIG: Record<ShelfStatus, { label: string; color: TagColor }> = {
  draft: { label: 'Draft', color: 'gray' },
  pending: { label: 'Pending', color: 'warning' },
  live: { label: 'Live', color: 'positive' },
  rejected: { label: 'Rejected', color: 'negative' },
};

interface ShelfStatusTagProps {
  status: ShelfStatus;
}

export function ShelfStatusTag({ status }: ShelfStatusTagProps) {
  const { label, color } = STATUS_CONFIG[status];
  return (
    <Tag variant="secondary" color={color}>
      {label}
    </Tag>
  );
}
