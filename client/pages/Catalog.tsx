import { useTranslation } from 'react-i18next';
import styles from '@/styles/responsive.module.css';
import { MastHead } from '@/components/ui/MastHead';
import { AppSidebar } from '@/components/ui/AppSidebar';
import { CatalogHero } from '@/features/catalog/CatalogHero';
import { CatalogTodoList } from '@/features/catalog/CatalogTodoList';
import { getSellerCenterMenuItems } from '@/features/seller-center/menuItems';


export default function Catalog() {
  const { t } = useTranslation();
  return (
    <div className={styles.root}>
      <MastHead />

      <div className={styles.appRow}>
        <AppSidebar menuItems={getSellerCenterMenuItems(t, { withCatalogSubmenu: true })} />

        <main className={styles.main}>
          {/* Branded background bar */}
          <div className={styles.catalogBrandBar} />

          {/* Centered page content */}
          <div className={styles.catalogPageInner}>
            {/* Page header — overlaps the branded bar */}
            <div className={styles.catalogHeader}>
              <h1 className={styles.pageTitle}>{t('nav.catalog')}</h1>
            </div>

            {/* Page content — fills available width */}
            <div className={styles.catalogContent}>
              <div className={styles.catalogCard}>
                <CatalogHero />
                <CatalogTodoList />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
