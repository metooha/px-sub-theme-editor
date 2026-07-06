import React from 'react';
import { useTranslation } from 'react-i18next';
import { MastHead } from '@/components/ui/MastHead';
import { AppSidebar } from '@/components/ui/AppSidebar';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { Image as ImageIcon } from '@/components/icons';
import { getSellerCenterMenuItems } from '@/features/seller-center/menuItems';
import styles from '@/styles/landingConnection.module.css';

const sectionIds = ['1', '2', '3'];

export default function LandingConnection() {
  const { t } = useTranslation();
  return (
    <div className={styles.root}>
      <MastHead currentSolution="Landing Connection" />

      <div className={styles.appRow}>
        <AppSidebar menuItems={getSellerCenterMenuItems(t)} />

        <main className={styles.main}>
          <div className={styles.pageContent}>
            {/* Page header */}
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>{t('templates.landingConnection')}</h1>
              <p className={styles.pageSubtitle}>{t('shared.supportingText')}</p>
            </div>

            {/* Sections */}
            {sectionIds.map((id) => (
              <LandingSection key={id} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

/* ─── Landing Section ─── */

function LandingSection() {
  const { t } = useTranslation();
  return (
    <section className={styles.section}>
      {/* Section header */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{t('shared.primarySection')}</h2>
        <LinkButton size="medium">{t('shared.linkButton')}</LinkButton>
      </div>

      {/* 3-column card grid */}
      <div className={styles.cardGrid}>
        <LandingCard />
        <LandingCard />
        <LandingCard />
      </div>
    </section>
  );
}

/* ─── Landing Card ─── */

function LandingCard() {
  const { t } = useTranslation();
  return (
    <div className={styles.card}>
      {/* Card image area */}
      <div className={styles.cardImageArea}>
        <ImagePlaceholder />
        <Tag variant="tertiary" color="gray" leading={<ImageIcon style={{ width: 16, height: 16 }} />} className={styles.cardLabelBadge}>{t('shared.label')}</Tag>
      </div>

      {/* Card body */}
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{t('shared.title')}</h3>
        <p className={styles.cardDescription}>
          {t('shared.cardDescription')}{' '}
          <a href="#" className={styles.cardLearnMore}>{t('shared.learnMore')}</a>
        </p>
      </div>

      {/* Card footer */}
      <div className={styles.cardFooter}>
        <div className={styles.cardDivider} />
        <div className={styles.cardActions}>
          <LinkButton size="medium">{t('shared.buttonLabel')}</LinkButton>
          <Button variant="secondary" size="small">{t('shared.buttonLabel')}</Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Image Placeholder ─── */

function ImagePlaceholder() {
  return (
    <div className={styles.imagePlaceholder}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="28" height="28" rx="2" stroke="#BABBBE" strokeWidth="1.5" />
        <circle cx="11" cy="11" r="3" stroke="#BABBBE" strokeWidth="1.5" />
        <path
          d="M2 22l7-7 5 5 4-4 8 8"
          stroke="#BABBBE"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
