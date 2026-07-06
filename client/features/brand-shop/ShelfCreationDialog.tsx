import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { TextArea } from '@/components/ui/TextArea';
import { Divider } from '@/components/ui/Divider';
import { IconButton } from '@/components/ui/IconButton';
import { X } from '@/components/icons';
import { ShelfStatusTag } from './ShelfStatusTag';
import type { ShelfPage } from './types';
import styles from './ShelfCreationDialog.module.css';

interface ShelfCreationDialogProps {
  brandShopId: string;
  onClose: () => void;
  onCreated: (shelf: ShelfPage) => void;
}

export function ShelfCreationDialog({ brandShopId, onClose, onCreated }: ShelfCreationDialogProps) {
  const [shelfName, setShelfName] = useState('');
  const [shelfTitle, setShelfTitle] = useState('');
  const [skuInput, setSkuInput] = useState('');
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Close on Escape and focus first field on mount
  useEffect(() => {
    firstFieldRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSave = () => {
    const skus = skuInput
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    const newShelf: ShelfPage = {
      id: `shelf-${Date.now()}`,
      name: shelfName,
      title: shelfTitle,
      status: 'draft',
      skus,
      brandShopId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onCreated(newShelf);
  };

  const canSave = shelfName.trim().length > 0;

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Create Shelf page"
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>Create Shelf page</h2>
            <ShelfStatusTag status="draft" />
          </div>
          <IconButton variant="ghost" size="small" aria-label="Close" onClick={onClose}>
            <X style={{ width: 16, height: 16 }} />
          </IconButton>
        </div>

        <Divider />

        {/* Form body */}
        <div className={styles.body}>
          <p className={styles.description}>
            Create a Shelf page directly from the Brand Shop builder. Once saved,
            this Shelf will be attached to your Brand Shop and submitted together
            for moderation.
          </p>

          <TextField
            ref={firstFieldRef}
            label="Shelf name"
            size="small"
            value={shelfName}
            onChange={(e) => setShelfName(e.target.value)}
            placeholder="e.g. Summer Essentials"
            helperText="This name will be reviewed during moderation."
          />

          <TextField
            label="Shelf title"
            size="small"
            value={shelfTitle}
            onChange={(e) => setShelfTitle(e.target.value)}
            placeholder="e.g. Shop Summer Essentials"
            helperText="Displayed as the heading on the Shelf page."
          />

          <TextArea
            label="Add SKUs"
            size="small"
            value={skuInput}
            onChange={(e) => setSkuInput(e.target.value)}
            placeholder="Enter SKUs separated by commas or new lines"
            helperText="Paste SKU numbers to add products to this Shelf."
          />

          {skuInput.trim() && (
            <div className={styles.skuCount}>
              <span className={styles.skuCountLabel}>
                {skuInput.split(/[\n,]+/).filter((s) => s.trim()).length} SKU(s) entered
              </span>
            </div>
          )}
        </div>

        <Divider />

        {/* Footer actions */}
        <div className={styles.footer}>
          <Button variant="secondary" size="medium" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="medium"
            onClick={handleSave}
            {...(!canSave ? { 'aria-disabled': true, style: { opacity: 0.5, pointerEvents: 'none' as const } } : {})}
          >
            Save as draft
          </Button>
        </div>
      </div>
    </div>
  );
}
