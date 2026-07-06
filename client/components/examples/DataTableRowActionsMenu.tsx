import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@/components/ui/IconButton';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu';
import { MoreHorizontal } from '@/components/icons';

interface RowActionsMenuProps {
  name: string;
}

/**
 * 3-dot actions button that opens a DropdownMenu for a DataTable row.
 */
export function RowActionsMenu({ name }: RowActionsMenuProps) {
  const { t } = useTranslation('pages');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton
          aria-label={t('dataTable.actionsFor', { name })}
          variant="ghost"
        >
          <MoreHorizontal />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>{t('dataTable.menuEdit', 'Edit')}</DropdownMenuItem>
        <DropdownMenuItem>{t('dataTable.menuDuplicate', 'Duplicate')}</DropdownMenuItem>
        <DropdownMenuItem>{t('dataTable.menuPause', 'Pause')}</DropdownMenuItem>
        <DropdownMenuItem>{t('dataTable.menuArchive', 'Archive')}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
