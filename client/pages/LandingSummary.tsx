import React from 'react';
import { useTranslation } from 'react-i18next';
import { MastHead } from '@/components/ui/MastHead';
import { AppSidebar } from '@/components/ui/AppSidebar';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import { getSellerCenterMenuItems } from '@/features/seller-center/menuItems';
import { PrimaryCard } from './landing-summary/PrimaryCard';
import { SecondaryListCard } from './landing-summary/SecondaryListCard';
import { SecondaryAccordionCard } from './landing-summary/SecondaryAccordionCard';
import styles from '@/styles/landingSummary.module.css';

export default function LandingSummary() {
  const { t } = useTranslation();
  return (
    <div className={styles.root}>
      <MastHead currentSolution="Landing Summary" />

      <div className={styles.appRow}>
        <AppSidebar menuItems={getSellerCenterMenuItems(t)} />

        <main className={styles.main}>
          <div className={styles.pageInner}>
            {/* Page header */}
            <div className={styles.pageHeader}>
              <div className={styles.pageHeaderContainer}>
                <h1 className={styles.pageTitle}>{t('templates.landingSummary')}</h1>
                <div className={styles.titleActions}>
                  <LinkButton size="medium">{t('shared.buttonLabel')}</LinkButton>
                  <LinkButton size="medium">{t('shared.buttonLabel')}</LinkButton>
                  <Button variant="secondary" size="medium">{t('shared.buttonLabel')}</Button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className={styles.contentArea}>
              <div className={styles.contentContainer}>
                {/* Primary column */}
                <div className={styles.primaryColumn}>
                  <PrimaryCard />
                </div>

                {/* Secondary column */}
                <div className={styles.secondaryColumn}>
                  <SecondaryListCard />
                  <SecondaryAccordionCard />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
