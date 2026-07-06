import { useState, useCallback, useEffect } from 'react';
import { useResizablePanel } from '@/hooks/useResizablePanel';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { IconButton } from '@/components/ui/IconButton';
import { Checkbox } from '@/components/ui/Checkbox';
import { Divider } from '@/components/ui/Divider';
import { X, Plus } from '@/components/icons';
import { ImageUploadField } from './ImageUploadField';
import { LayoutLeft, LayoutRight, AlignText } from '@/components/icons-custom';
import type {
  ShopModule,
  ModuleConfig,
  HeroBannerConfig,
  CategoryHubConfig,
  SkinnyBannerConfig,
  ItemCarouselConfig,
} from './types';
import styles from './ModuleEditor.module.css';

const PANEL_MIN_WIDTH = 320;
const PANEL_MAX_WIDTH = 640;

interface ModuleEditorProps {
  module: ShopModule | null;
  onUpdate: (id: string, config: Partial<ModuleConfig>) => void;
  onClose: () => void;
}

export function ModuleEditor({ module, onUpdate, onClose }: ModuleEditorProps) {
  const { width: panelWidth, resizeHandleProps } = useResizablePanel({
    storageKey: 'brand-shop-editor-width',
    defaultWidth: 360,
    minWidth: PANEL_MIN_WIDTH,
    maxWidth: PANEL_MAX_WIDTH,
    handleEdge: 'left',
  });

  if (!module) {
    return (
      <aside className={styles.panel} style={{ width: panelWidth, minWidth: PANEL_MIN_WIDTH }}>
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>Select a module to edit</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className={styles.panel} style={{ width: panelWidth, minWidth: PANEL_MIN_WIDTH }}>
      {/* Resize handle on left edge */}
      <div
        className={styles.resizeHandle}
        {...resizeHandleProps}
        aria-label="Resize editor panel"
      >
        <div className={styles.resizeIndicator} />
      </div>

      <div className={styles.panelInner}>
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>{module.label}</h2>
          <IconButton variant="ghost" size="small" aria-label="Close editor" onClick={onClose}>
            <X style={{ width: 16, height: 16 }} />
          </IconButton>
        </div>
        <div className={styles.scrollContent}>
          <ModuleEditorContent module={module} onUpdate={onUpdate} />
        </div>
      </div>
    </aside>
  );
}

/* ─── Editor router ─── */
function ModuleEditorContent({
  module,
  onUpdate,
}: {
  module: ShopModule;
  onUpdate: (id: string, config: Partial<ModuleConfig>) => void;
}) {
  const update = useCallback(
    (updates: Partial<ModuleConfig>) => onUpdate(module.id, updates),
    [module.id, onUpdate],
  );

  switch (module.type) {
    case 'hero-banner':
      return <HeroBannerEditor config={module.config as HeroBannerConfig} onUpdate={update} />;
    case 'category-hub':
      return <CategoryHubEditor config={module.config as CategoryHubConfig} onUpdate={update} />;
    case 'skinny-banner':
      return <SkinnyBannerEditor config={module.config as SkinnyBannerConfig} onUpdate={update} />;
    case 'item-carousel':
      return <ItemCarouselEditor config={module.config as ItemCarouselConfig} onUpdate={update} />;
    default:
      return (
        <div className={styles.placeholderEditor}>
          <p className={styles.emptyText}>Editor for {module.label} module</p>
        </div>
      );
  }
}

/* ─── Hero Banner Editor ─── */
function HeroBannerEditor({
  config,
  onUpdate,
}: {
  config: HeroBannerConfig;
  onUpdate: (updates: Partial<HeroBannerConfig>) => void;
}) {
  const [activeLayout, setActiveLayout] = useState(config.layout);
  const [activeTextColor, setActiveTextColor] = useState(config.textColor);

  // Sync local state when a different module is loaded
  useEffect(() => {
    setActiveLayout(config.layout);
    setActiveTextColor(config.textColor);
  }, [config.layout, config.textColor]);

  return (
    <div className={styles.sections}>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Layout</h3>
        <div className={styles.layoutToggle} role="radiogroup" aria-label="Layout direction">
          <Button
            variant="secondary"
            size="small"
            UNSAFE_className={`${styles.layoutOption} ${activeLayout === 'text-left' ? styles.layoutOptionActive : ''}`}
            onClick={() => { setActiveLayout('text-left'); onUpdate({ layout: 'text-left' }); }}
            aria-pressed={activeLayout === 'text-left'}
          >
            <span className={styles.layoutOptionContent}>
              <LayoutLeft />
              <span>Text on left</span>
            </span>
          </Button>
          <Button
            variant="secondary"
            size="small"
            UNSAFE_className={`${styles.layoutOption} ${activeLayout === 'text-right' ? styles.layoutOptionActive : ''}`}
            onClick={() => { setActiveLayout('text-right'); onUpdate({ layout: 'text-right' }); }}
            aria-pressed={activeLayout === 'text-right'}
          >
            <span className={styles.layoutOptionContent}>
              <LayoutRight />
              <span>Text on right</span>
            </span>
          </Button>
        </div>
      </section>

      <Divider />

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Image</h3>
        <ImageUploadField
          imageUrl={config.imageUrl}
          onImageChange={(url) => onUpdate({ imageUrl: url })}
          alt={config.imageAltText}
          label="Hero image"
        />
        <div className={styles.itemUsedRow}>
          <span className={styles.itemUsedLabel}>Item used for image</span>
          <div className={styles.itemUsedValue}>
            <span className={styles.itemName}>{config.itemName}</span>
            <span className={styles.itemId}>ID: {config.itemId}</span>
          </div>
        </div>
        <TextField
          label="Image alt text"
          size="small"
          value={config.imageAltText}
          onChange={(e) => onUpdate({ imageAltText: e.target.value })}
          helperText={`Describe the image for people with vision disabilities. (${config.imageAltText.length}/150)`}
        />
      </section>

      <Divider />

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Text card</h3>

        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>Text alignment</span>
          <div className={styles.alignmentRow} role="radiogroup" aria-label="Text alignment">
            {(['left', 'center', 'right'] as const).map((align) => (
              <IconButton
                key={align}
                variant="ghost"
                size="small"
                UNSAFE_className={`${styles.alignButton} ${config.textAlignment === align ? styles.alignButtonActive : ''}`}
                onClick={() => onUpdate({ textAlignment: align })}
                aria-label={`Align ${align}`}
                aria-pressed={config.textAlignment === align}
              >
                <AlignText alignment={align} />
              </IconButton>
            ))}
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>Background color</span>
          <div className={styles.colorInputRow}>
            <div
              className={styles.colorSwatch}
              style={{ background: config.backgroundColor }}
            />
            <TextField
              label=""
              size="small"
              value={config.backgroundColor}
              onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>Text color</span>
          <div className={styles.textColorRow} role="radiogroup" aria-label="Text color">
            {(['black', 'white', 'custom'] as const).map((color) => (
              <Button
                key={color}
                variant="secondary"
                size="small"
                UNSAFE_className={`${styles.textColorOption} ${activeTextColor === color ? styles.textColorOptionActive : ''}`}
                onClick={() => { setActiveTextColor(color); onUpdate({ textColor: color }); }}
                aria-pressed={activeTextColor === color}
              >
                <span className={styles.textColorOptionContent}>
                  <span
                    className={styles.textColorSwatch}
                    style={{
                      background: color === 'black'
                        ? 'var(--ld-semantic-color-fill-inverse, #2E2F32)'
                        : color === 'white'
                          ? 'var(--ld-semantic-color-surface, #FFFFFF)'
                          : 'linear-gradient(135deg, #f00, #0f0, #00f)',
                      border: color === 'white' ? '1px solid var(--ld-semantic-color-separator)' : 'none',
                    }}
                  >
                    Aa
                  </span>
                  <span>{color.charAt(0).toUpperCase() + color.slice(1)}</span>
                </span>
              </Button>
            ))}
          </div>
          {activeTextColor === 'custom' && (
            <div className={styles.colorInputRow} style={{ marginTop: 'var(--ld-primitive-scale-space-100, 8px)' }}>
              <div
                className={styles.colorSwatch}
                style={{ background: config.customTextColor || '#000000' }}
              />
              <TextField
                label=""
                size="small"
                value={config.customTextColor || '#000000'}
                onChange={(e) => onUpdate({ customTextColor: e.target.value })}
                placeholder="#000000"
              />
            </div>
          )}
        </div>
      </section>

      <Divider />

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Text</h3>
        <TextField
          label="Headline"
          size="small"
          value={config.headline}
          onChange={(e) => onUpdate({ headline: e.target.value })}
        />
        <TextField
          label="Subhead"
          size="small"
          value={config.subhead}
          onChange={(e) => onUpdate({ subhead: e.target.value })}
          helperText={`${config.subhead.length}/60`}
        />
        <div className={styles.eyebrowToggleRow}>
          <Checkbox
            checked={config.eyebrowEnabled}
            onCheckedChange={() => onUpdate({ eyebrowEnabled: !config.eyebrowEnabled })}
            label="Eyebrow headline (optional)"
          />
        </div>
        {config.eyebrowEnabled && (
          <TextField
            label="Eyebrow headline"
            size="small"
            value={config.eyebrowHeadline}
            onChange={(e) => onUpdate({ eyebrowHeadline: e.target.value })}
          />
        )}
      </section>
    </div>
  );
}

/* ─── Category Hub Editor ─── */
function CategoryHubEditor({
  config,
  onUpdate,
}: {
  config: CategoryHubConfig;
  onUpdate: (updates: Partial<CategoryHubConfig>) => void;
}) {
  const updateCategory = (index: number, field: 'label' | 'imageUrl', value: string) => {
    const updated = config.categories.map((cat, i) =>
      i === index ? { ...cat, [field]: value } : cat
    );
    onUpdate({ categories: updated });
  };

  const removeCategory = (index: number) => {
    onUpdate({ categories: config.categories.filter((_, i) => i !== index) });
  };

  const addCategory = () => {
    onUpdate({
      categories: [
        ...config.categories,
        { id: `cat-${Date.now()}`, label: 'New category', imageUrl: '' },
      ],
    });
  };

  return (
    <div className={styles.sections}>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Categories</h3>
        <span className={styles.fieldHint}>{config.categories.length} categories configured</span>
      </section>

      <Divider />

      {config.categories.map((cat, i) => (
        <div key={cat.id}>
          <section className={styles.section}>
            <div className={styles.categoryEditorHeader}>
              <h3 className={styles.sectionTitle}>Category {i + 1}</h3>
              {config.categories.length > 1 && (
                <IconButton
                  variant="ghost"
                  size="small"
                  aria-label={`Remove category ${i + 1}`}
                  onClick={() => removeCategory(i)}
                >
                  <X style={{ width: 14, height: 14 }} />
                </IconButton>
              )}
            </div>
            <TextField
              label="Label"
              size="small"
              value={cat.label}
              onChange={(e) => updateCategory(i, 'label', e.target.value)}
            />
            <ImageUploadField
              imageUrl={cat.imageUrl}
              onImageChange={(url) => updateCategory(i, 'imageUrl', url)}
              alt={cat.label}
              label="Category image"
            />
          </section>
          {i < config.categories.length - 1 && <Divider />}
        </div>
      ))}

      <Divider />

      <section className={styles.section}>
        <Button variant="tertiary" size="small" onClick={addCategory} leading={<Plus style={{ width: 14, height: 14 }} />}>
          Add category
        </Button>
      </section>
    </div>
  );
}

/* ─── Skinny Banner Editor ─── */
function SkinnyBannerEditor({
  config,
  onUpdate,
}: {
  config: SkinnyBannerConfig;
  onUpdate: (updates: Partial<SkinnyBannerConfig>) => void;
}) {
  return (
    <div className={styles.sections}>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Image</h3>
        <ImageUploadField
          imageUrl={config.imageUrl}
          onImageChange={(url) => onUpdate({ imageUrl: url })}
          alt="Skinny banner"
          label="Banner image"
        />
      </section>

      <Divider />

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Text</h3>
        <TextField
          label="Headline"
          size="small"
          value={config.headline}
          onChange={(e) => onUpdate({ headline: e.target.value })}
        />
        <TextField
          label="Subtext"
          size="small"
          value={config.subtext}
          onChange={(e) => onUpdate({ subtext: e.target.value })}
        />
      </section>
    </div>
  );
}

/* ─── Item Carousel Editor ─── */
function ItemCarouselEditor({
  config,
  onUpdate,
}: {
  config: ItemCarouselConfig;
  onUpdate: (updates: Partial<ItemCarouselConfig>) => void;
}) {
  const updateItem = (index: number, field: keyof ItemCarouselConfig['items'][number], value: string) => {
    const items = config.items.map((it, i) =>
      i === index ? { ...it, [field]: value } : it
    );
    onUpdate({ items });
  };

  const removeItem = (index: number) => {
    onUpdate({ items: config.items.filter((_, i) => i !== index) });
  };

  const addItem = () => {
    onUpdate({
      items: [
        ...config.items,
        {
          id: `item-${Date.now()}`,
          name: 'New product',
          price: '$0.00',
          imageUrl: '',
          description: 'New product',
          deliveryDays: '2 days',
        },
      ],
    });
  };

  return (
    <div className={styles.sections}>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Header</h3>
        <TextField
          label="Title"
          size="small"
          value={config.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
        />
        <TextField
          label="Subtitle"
          size="small"
          value={config.subtitle}
          onChange={(e) => onUpdate({ subtitle: e.target.value })}
        />
      </section>

      <Divider />

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Items</h3>
        <span className={styles.fieldHint}>{config.items.length} items in this carousel</span>
      </section>

      <Divider />

      {config.items.map((item, i) => (
        <div key={item.id}>
          <section className={styles.section}>
            <div className={styles.categoryEditorHeader}>
              <h3 className={styles.sectionTitle}>Item {i + 1}</h3>
              {config.items.length > 1 && (
                <IconButton
                  variant="ghost"
                  size="small"
                  aria-label={`Remove item ${i + 1}`}
                  onClick={() => removeItem(i)}
                >
                  <X style={{ width: 14, height: 14 }} />
                </IconButton>
              )}
            </div>
            <ImageUploadField
              imageUrl={item.imageUrl}
              onImageChange={(url) => updateItem(i, 'imageUrl', url)}
              alt={item.name}
              label="Product image"
            />
            <TextField
              label="Name"
              size="small"
              value={item.name}
              onChange={(e) => { updateItem(i, 'name', e.target.value); updateItem(i, 'description', e.target.value); }}
            />
            <TextField
              label="Price"
              size="small"
              value={item.price}
              onChange={(e) => updateItem(i, 'price', e.target.value)}
            />
            <TextField
              label="Delivery"
              size="small"
              value={item.deliveryDays}
              onChange={(e) => updateItem(i, 'deliveryDays', e.target.value)}
            />
          </section>
          {i < config.items.length - 1 && <Divider />}
        </div>
      ))}

      <Divider />

      <section className={styles.section}>
        <Button variant="tertiary" size="small" onClick={addItem} leading={<Plus style={{ width: 14, height: 14 }} />}>
          Add item
        </Button>
      </section>
    </div>
  );
}
