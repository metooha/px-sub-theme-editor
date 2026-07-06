/* ── Brand Shop & Shelf Types ─────────────────────────────────── */

export type ShelfStatus = 'draft' | 'pending' | 'live' | 'rejected';

export type ModuleType =
  | 'hero-banner'
  | 'category-hub'
  | 'skinny-banner'
  | 'item-carousel';

export type TextAlignment = 'left' | 'center' | 'right';
export type TextColor = 'black' | 'white' | 'custom';
export type HeroLayout = 'text-left' | 'text-right';

export interface ShelfPage {
  id: string;
  name: string;
  title: string;
  status: ShelfStatus;
  skus: string[];
  brandShopId: string | null;
  createdAt: string;
  updatedAt: string;
  rejectionReason?: string;
  activatedUrl?: string;
}

export interface HeroBannerConfig {
  layout: HeroLayout;
  imageUrl: string;
  imageAltText: string;
  itemName: string;
  itemId: string;
  textAlignment: TextAlignment;
  backgroundColor: string;
  textColor: TextColor;
  customTextColor?: string;
  headline: string;
  subhead: string;
  eyebrowHeadline: string;
  eyebrowEnabled: boolean;
}

export interface CategoryHubConfig {
  categories: Array<{
    id: string;
    label: string;
    imageUrl: string;
  }>;
}

export interface SkinnyBannerConfig {
  imageUrl: string;
  headline: string;
  subtext: string;
}

export interface ItemCarouselConfig {
  title: string;
  subtitle: string;
  shelfId: string | null;
  items: Array<{
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    description: string;
    deliveryDays: string;
  }>;
}

export type ModuleConfig =
  | HeroBannerConfig
  | CategoryHubConfig
  | SkinnyBannerConfig
  | ItemCarouselConfig;

export interface ShopModule {
  id: string;
  type: ModuleType;
  label: string;
  config: ModuleConfig;
  shelfId?: string;
}

export interface BrandShop {
  id: string;
  name: string;
  brandName: string;
  templateName: string;
  status: ShelfStatus;
  modules: ShopModule[];
  shelves: ShelfPage[];
  createdAt: string;
  updatedAt: string;
}

/** Labels shown in the UI for each module type */
export const MODULE_TYPE_LABELS: Record<ModuleType, string> = {
  'hero-banner': 'Hero banner',
  'category-hub': 'Category hub',
  'skinny-banner': 'Skinny banner',
  'item-carousel': 'Item carousel',
};
