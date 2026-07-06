import { Button } from '@/components/ui/Button';
import { Link } from '@/components/ui/Link';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import type { ShopModule, HeroBannerConfig, CategoryHubConfig, SkinnyBannerConfig, ItemCarouselConfig } from './types';
import styles from './ShopPreview.module.css';

const FALLBACK_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23999"%3ENo image%3C/text%3E%3C/svg%3E';

interface ShopPreviewProps {
  modules: ShopModule[];
  selectedModuleId: string | null;
  onSelectModule: (id: string) => void;
}

export function ShopPreview({ modules, selectedModuleId, onSelectModule }: ShopPreviewProps) {
  return (
    <div className={styles.previewContainer}>
      <div className={styles.previewCanvas}>
        {modules.map((mod) => {
          const isSelected = mod.id === selectedModuleId;
          return (
            <div
              key={mod.id}
              className={`${styles.moduleWrapper} ${isSelected ? styles.moduleWrapperSelected : ''}`}
              onClick={() => onSelectModule(mod.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectModule(mod.id);
                }
              }}
              aria-pressed={isSelected}
            >
              {isSelected && (
                <span className={styles.moduleTag}>{mod.label}</span>
              )}
              <ModulePreview module={mod} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ModulePreview({ module: mod }: { module: ShopModule }) {
  switch (mod.type) {
    case 'hero-banner':
      return <HeroBannerPreview config={mod.config as HeroBannerConfig} />;
    case 'category-hub':
      return <CategoryHubPreview config={mod.config as CategoryHubConfig} />;
    case 'skinny-banner':
      return <SkinnyBannerPreview config={mod.config as SkinnyBannerConfig} />;
    case 'item-carousel':
      return <ItemCarouselPreview config={mod.config as ItemCarouselConfig} />;
    default:
      return <div className={styles.placeholder}>Unknown module</div>;
  }
}

function HeroBannerPreview({ config }: { config: HeroBannerConfig }) {
  const isTextLeft = config.layout === 'text-left';
  return (
    <div className={styles.heroBanner}>
      <div
        className={styles.heroContent}
        style={{ flexDirection: isTextLeft ? 'row' : 'row-reverse' }}
      >
        <div className={styles.heroText}>
          {config.eyebrowEnabled && config.eyebrowHeadline && (
            <span className={styles.heroEyebrow}>{config.eyebrowHeadline}</span>
          )}
          <h2 className={styles.heroHeadline}>{config.headline}</h2>
          <p className={styles.heroSubhead}>{config.subhead}</p>
          <div className={styles.heroCtaWrap}>
            <Button variant="secondary" size="small">Shop now</Button>
          </div>
        </div>
        <div className={styles.heroImageWrap}>
          <img
            src={config.imageUrl || FALLBACK_IMAGE}
            alt={config.imageAltText}
            className={styles.heroImage}
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE; }}
          />
        </div>
      </div>
    </div>
  );
}

function CategoryHubPreview({ config }: { config: CategoryHubConfig }) {
  return (
    <div className={styles.categoryHub}>
      <h3 className={styles.sectionTitle}>Discover our products</h3>
      <div className={styles.categoryGrid}>
        {config.categories.map((cat) => (
          <div key={cat.id} className={styles.categoryItem}>
            <div className={styles.categoryImageWrap}>
              <img
                src={cat.imageUrl || FALLBACK_IMAGE}
                alt={cat.label}
                className={styles.categoryImage}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE; }}
              />
            </div>
            <span className={styles.categoryLabel}>{cat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkinnyBannerPreview({ config }: { config: SkinnyBannerConfig }) {
  return (
    <div className={styles.skinnyBanner}>
      <img
        src={config.imageUrl || FALLBACK_IMAGE}
        alt=""
        className={styles.skinnyImage}
        onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE; }}
      />
      <div className={styles.skinnyOverlay}>
        <h3 className={styles.skinnyHeadline}>{config.headline}</h3>
        <p className={styles.skinnySubtext}>{config.subtext}</p>
      </div>
    </div>
  );
}

function ItemCarouselPreview({ config }: { config: ItemCarouselConfig }) {
  return (
    <div className={styles.itemCarousel}>
      <div className={styles.carouselHeader}>
        <div>
          <h3 className={styles.sectionTitle}>{config.title}</h3>
          <p className={styles.carouselSubtitle}>{config.subtitle}</p>
        </div>
        <Link href="#">View all</Link>
      </div>
      <div className={styles.carouselTrack}>
        {config.items.slice(0, 6).map((item) => (
          <div key={item.id} className={styles.productCard}>
            <div className={styles.productImageWrap}>
              <img
                src={item.imageUrl || FALLBACK_IMAGE}
                alt={item.name}
                className={styles.productImage}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE; }}
              />
            </div>
            <div className={styles.addButtonWrap}>
              <QuantityStepper variant="tertiary" size="small" showAddLabel={false} />
            </div>
            <span className={styles.productPrice}>{item.price}</span>
            <span className={styles.productName}>{item.description}</span>
            <span className={styles.productDelivery}>{item.deliveryDays}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
