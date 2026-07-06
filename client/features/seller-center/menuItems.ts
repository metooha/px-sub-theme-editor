import type { SidebarMenuItem } from '@/components/ui/AppSidebar';
import {
  Home,
  ListBox,
  Tag as TagIcon,
  Cart,
  BoxSpark,
  CreditCard,
  Speedometer,
  BarGraph,
  Rocket,
  TargetArrow,
  Services,
} from '@/components/icons';

/**
 * Shared Seller Center sidebar menu items used across
 * LandingSummary, LandingConnection, Catalog, and DetailItem pages.
 *
 * @param t - i18n translation function
 * @param options.withCatalogSubmenu - include sub-page items under Catalog (used by Catalog page)
 */
export function getSellerCenterMenuItems(
  t: (key: string) => string,
  options: { withCatalogSubmenu?: boolean } = {},
): SidebarMenuItem[] {
  return [
    { id: 'home', label: t('nav.home'), Icon: Home, route: '/' },
    {
      id: 'catalog',
      label: t('nav.catalog'),
      Icon: ListBox,
      route: '/catalog',
      ...(options.withCatalogSubmenu
        ? {
            submenuItems: [
              { id: 'catalog-sub1', label: t('nav.subPage'), route: '/catalog' },
              { id: 'catalog-sub2', label: t('nav.subPage') },
              { id: 'catalog-sub3', label: t('nav.subPage') },
            ],
          }
        : {}),
    },
    { id: 'pricing', label: t('nav.pricing'), Icon: TagIcon },
    { id: 'orders', label: t('nav.orders'), Icon: Cart },
    { id: 'wfs', label: t('nav.wfs'), Icon: BoxSpark },
    { id: 'payments', label: t('nav.payments'), Icon: CreditCard },
    { id: 'performance', label: t('nav.performance'), Icon: Speedometer },
    { id: 'analytics', label: t('nav.analytics'), Icon: BarGraph },
    { id: 'growth', label: t('nav.growth'), Icon: Rocket },
    { id: 'advertising', label: t('nav.advertising'), Icon: TargetArrow },
    { id: 'apps', label: t('nav.apps'), Icon: Services },
  ];
}
