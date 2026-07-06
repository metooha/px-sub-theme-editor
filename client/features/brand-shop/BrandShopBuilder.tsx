import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';
import { MastHead } from '@/components/ui/MastHead';
import { AppSidebar } from '@/components/ui/AppSidebar';
import type { SidebarMenuItem } from '@/components/ui/AppSidebar';
import {
  Home,
  Megaphone,
  BarGraph,
  Toolbox,
  Image,
  Upload,
} from '@/components/icons';
import { ModuleList } from './ModuleList';
import { ShopPreview } from './ShopPreview';
import { ModuleEditor } from './ModuleEditor';
import { ShelfCreationDialog } from './ShelfCreationDialog';
import { MOCK_BRAND_SHOP } from './mockData';
import type { BrandShop, ShopModule, ModuleConfig, ModuleType } from './types';
import styles from './BrandShopBuilder.module.css';

const SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  { id: 'home', label: 'Home', Icon: Home, route: '/' },
  { id: 'campaigns', label: 'Campaigns', Icon: Megaphone },
  { id: 'analytics', label: 'Analytics', Icon: BarGraph },
  { id: 'tools', label: 'Tools', Icon: Toolbox },
  { id: 'media', label: 'Media', Icon: Image },
  { id: 'uploads', label: 'Uploads', Icon: Upload },
];

/** Default configs when adding a new module */
function createDefaultModule(type: ModuleType): ShopModule {
  const id = `mod-${Date.now()}`;
  switch (type) {
    case 'hero-banner':
      return {
        id,
        type,
        label: 'Hero banner',
        config: {
          layout: 'text-left',
          imageUrl: '',
          imageAltText: '',
          itemName: '',
          itemId: '',
          textAlignment: 'left',
          backgroundColor: '#FFFFFF',
          textColor: 'black',
          headline: 'Your headline here',
          subhead: 'Your subheadline here',
          eyebrowHeadline: '',
          eyebrowEnabled: false,
        },
      };
    case 'category-hub':
      return {
        id,
        type,
        label: 'Category hub',
        config: {
          categories: [
            { id: `cat-${Date.now()}`, label: 'Category 1', imageUrl: '' },
          ],
        },
      };
    case 'skinny-banner':
      return {
        id,
        type,
        label: 'Skinny banner',
        config: { imageUrl: '', headline: 'Your headline', subtext: 'Your subtext' },
      };
    case 'item-carousel':
      return {
        id,
        type,
        label: 'Item carousel',
        config: {
          title: 'Featured products',
          subtitle: '',
          shelfId: null,
          items: [
            { id: `item-${Date.now()}`, name: 'New product', price: '$0.00', imageUrl: '', description: 'New product', deliveryDays: '2 days' },
          ],
        },
      };
  }
}

type SaveStatus = 'idle' | 'saving' | 'saved' | 'publishing' | 'published';

export default function BrandShopBuilder() {
  const [shop, setShop] = useState<BrandShop>(MOCK_BRAND_SHOP);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(shop.modules[0]?.id ?? null);
  const [shelfDialogOpen, setShelfDialogOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('tools');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  const selectedModule = shop.modules.find((m) => m.id === selectedModuleId) ?? null;

  const handleSelectModule = useCallback((id: string) => {
    setSelectedModuleId(id);
  }, []);

  const handleReorderModules = useCallback((modules: ShopModule[]) => {
    setShop((prev) => ({ ...prev, modules }));
  }, []);

  const handleUpdateModule = useCallback((id: string, updates: Partial<ModuleConfig>) => {
    setShop((prev) => ({
      ...prev,
      modules: prev.modules.map((m) => {
        if (m.id !== id) return m;
        return { ...m, config: { ...m.config, ...updates } };
      }),
    }));
  }, []);

  const handleAddModule = useCallback((type: ModuleType) => {
    const newModule = createDefaultModule(type);
    setShop((prev) => ({ ...prev, modules: [...prev.modules, newModule] }));
    setSelectedModuleId(newModule.id);
  }, []);

  const handleCloseEditor = useCallback(() => {
    setSelectedModuleId(null);
  }, []);

  const handleSaveDraft = useCallback(() => {
    setSaveStatus('saving');
    // Simulate async save
    setTimeout(() => {
      setShop((prev) => ({ ...prev, status: 'draft', updatedAt: new Date().toISOString() }));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2500);
    }, 800);
  }, []);

  const handlePublish = useCallback(() => {
    setSaveStatus('publishing');
    // Simulate async publish
    setTimeout(() => {
      setShop((prev) => ({ ...prev, status: 'live', updatedAt: new Date().toISOString() }));
      setSaveStatus('published');
      setTimeout(() => setSaveStatus('idle'), 2500);
    }, 1000);
  }, []);

  const saveLabel = saveStatus === 'saving' ? 'Saving…'
    : saveStatus === 'saved' ? 'Saved!'
    : 'Save as draft';

  const publishLabel = saveStatus === 'publishing' ? 'Publishing…'
    : saveStatus === 'published' ? 'Published!'
    : 'Publish';

  return (
    <div className={styles.root}>
      <MastHead currentSolution="Brand Shop Builder" />

      <div className={styles.appRow}>
        <AppSidebar
          menuItems={SIDEBAR_MENU_ITEMS}
          activeMenuItem={activeMenuItem}
          onMenuItemClick={setActiveMenuItem}
        />

        <main className={styles.main}>
          <div className={styles.page}>
            {/* Top bar with breadcrumb + actions */}
            <header className={styles.topBar}>
              <Breadcrumb aria-label="Brand Shop navigation">
                <BreadcrumbItem href="#">{shop.brandName}</BreadcrumbItem>
                <BreadcrumbItem href="#">Brand Shop</BreadcrumbItem>
                <BreadcrumbItem isCurrent>{shop.name}</BreadcrumbItem>
              </Breadcrumb>
              <h1 className={styles.pageTitle}>{shop.name}</h1>
            </header>

            {/* 3-panel builder layout */}
            <div className={styles.builderLayout}>
              <ModuleList
                modules={shop.modules}
                selectedModuleId={selectedModuleId}
                templateName={shop.templateName}
                onSelectModule={handleSelectModule}
                onReorder={handleReorderModules}
                onAddModule={handleAddModule}
              />

              <ShopPreview
                modules={shop.modules}
                selectedModuleId={selectedModuleId}
                onSelectModule={handleSelectModule}
              />

              <ModuleEditor
                module={selectedModule}
                onUpdate={handleUpdateModule}
                onClose={handleCloseEditor}
              />
            </div>

            {/* Bottom action bar */}
            <footer className={styles.footer}>
              <LinkButton size="small" href="/">
                Go to Brand Shop library
              </LinkButton>
              <div className={styles.footerActions}>
                <Button variant="secondary" size="medium" onClick={() => setShelfDialogOpen(true)}>
                  Create Shelf
                </Button>
                <Button
                  variant="secondary"
                  size="medium"
                  onClick={handleSaveDraft}
                  {...(saveStatus === 'saving' ? { 'aria-disabled': true } : {})}
                >
                  {saveLabel}
                </Button>
                <Button
                  variant="primary"
                  size="medium"
                  onClick={handlePublish}
                  {...(saveStatus === 'publishing' ? { 'aria-disabled': true } : {})}
                >
                  {publishLabel}
                </Button>
              </div>
            </footer>
          </div>

          {/* Shelf creation dialog */}
          {shelfDialogOpen && (
            <ShelfCreationDialog
              brandShopId={shop.id}
              onClose={() => setShelfDialogOpen(false)}
              onCreated={(shelf) => {
                setShop((prev) => ({ ...prev, shelves: [...prev.shelves, shelf] }));
                setShelfDialogOpen(false);
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}
