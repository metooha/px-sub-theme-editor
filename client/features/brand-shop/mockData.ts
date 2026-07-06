import type { BrandShop, HeroBannerConfig, CategoryHubConfig, SkinnyBannerConfig, ItemCarouselConfig } from './types';

const HERO_CONFIG: HeroBannerConfig = {
  layout: 'text-left',
  imageUrl: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  imageAltText: 'A lip balm tube on a light tan background',
  itemName: 'in2 Skincare Exfoliating lip scrub',
  itemId: '0010001',
  textAlignment: 'left',
  backgroundColor: '#FFFFFF',
  textColor: 'black',
  headline: 'Glowing skin in minutes',
  subhead: 'Experience the power of pure skin.',
  eyebrowHeadline: 'Transform your skin today',
  eyebrowEnabled: true,
};

const CATEGORY_CONFIG: CategoryHubConfig = {
  categories: [
    { id: 'cat-1', label: 'Subtle', imageUrl: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
    { id: 'cat-2', label: 'Palette', imageUrl: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
    { id: 'cat-3', label: 'Fresh', imageUrl: 'https://images.pexels.com/photos/3685523/pexels-photo-3685523.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
    { id: 'cat-4', label: 'Care', imageUrl: 'https://images.pexels.com/photos/3737585/pexels-photo-3737585.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
    { id: 'cat-5', label: 'Glow', imageUrl: 'https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
  ],
};

const SKINNY_CONFIG: SkinnyBannerConfig = {
  imageUrl: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800&h=200&fit=crop',
  headline: 'Silky & smooth',
  subtext: 'Moisturize your hands with care.',
};

const CAROUSEL_CONFIG: ItemCarouselConfig = {
  title: 'See our product',
  subtitle: 'Unlock your natural glow.',
  shelfId: null,
  items: Array.from({ length: 7 }, (_, i) => ({
    id: `item-${i + 1}`,
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    price: '$10.00',
    imageUrl: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    deliveryDays: '2 days',
  })),
};

export const MOCK_BRAND_SHOP: BrandShop = {
  id: 'shop-1',
  name: 'Summer promo 2025',
  brandName: 'Daisyland Su',
  templateName: 'Spotlight',
  status: 'draft',
  modules: [
    { id: 'mod-1', type: 'hero-banner', label: 'Hero banner', config: HERO_CONFIG },
    { id: 'mod-2', type: 'category-hub', label: 'Category hub', config: CATEGORY_CONFIG },
    { id: 'mod-3', type: 'skinny-banner', label: 'Skinny banner', config: SKINNY_CONFIG },
    { id: 'mod-4', type: 'item-carousel', label: 'Item carousel', config: CAROUSEL_CONFIG },
  ],
  shelves: [
    {
      id: 'shelf-1',
      name: 'Summer Collection Shelf',
      title: 'Summer Essentials',
      status: 'live',
      skus: ['SKU001', 'SKU002', 'SKU003'],
      brandShopId: 'shop-1',
      createdAt: '2025-01-15T00:00:00Z',
      updatedAt: '2025-02-01T00:00:00Z',
      activatedUrl: '/shelf/summer-essentials',
    },
    {
      id: 'shelf-2',
      name: 'New Arrivals Shelf',
      title: 'New Arrivals',
      status: 'draft',
      skus: ['SKU004', 'SKU005'],
      brandShopId: 'shop-1',
      createdAt: '2025-02-10T00:00:00Z',
      updatedAt: '2025-02-10T00:00:00Z',
    },
  ],
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-02-15T00:00:00Z',
};
