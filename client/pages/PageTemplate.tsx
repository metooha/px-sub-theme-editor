import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import gridStyles from "@/styles/responsive.module.css";
import styles from "@/styles/pageTemplate.module.css";
import { MastHead } from "@/components/ui/MastHead";
import { AppSidebar } from "@/components/ui/AppSidebar";
import type { SidebarMenuItem } from "@/components/ui/AppSidebar";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";
import { Card } from "@/components/ui/Card";
import { CardContent } from "@/components/ui/CardContent";
import Metric from "@/components/ui/Metric";
import {
  PrimarySection as LDPrimarySection,
  SecondarySection as LDSecondarySection,
  TertiarySection as LDTertiarySection,
} from "@/components/ui/Section";
import MartyFloatingPanel from "@/features/marty/MartyFloatingPanel";
import {
  Home,
  Megaphone,
  BarGraph,
  Toolbox,
  Image,
  Upload,
  Placeholder,
} from "@/components/icons";

function getPageTemplateMenuItems(t: (key: string) => string): SidebarMenuItem[] {
  return [
    { id: "home", label: t('nav.home'), Icon: Home, route: "/" },
    {
      id: "notifications",
      label: t('nav.notifications'),
      Icon: Megaphone,
      submenuItems: [
        { id: "notif-sub1", label: t('nav.subPage') },
        { id: "notif-sub2", label: t('nav.subPage') },
        { id: "notif-sub3", label: t('nav.subPage') },
      ],
    },
    { id: "charts", label: t('nav.charts'), Icon: BarGraph },
    { id: "tools", label: t('nav.tools'), Icon: Toolbox },
    { id: "media", label: t('nav.media'), Icon: Image },
    { id: "uploads", label: t('nav.uploads'), Icon: Upload },
  ];
}

export default function PageTemplate() {
  const [activeMenuItem, setActiveMenuItem] = useState("home");
  const { t } = useTranslation();

  return (
    <div className={styles.root}>
      <MastHead currentSolution="Page Template" />

      <div className={styles.appRow}>
        <AppSidebar
          menuItems={getPageTemplateMenuItems(t)}
          activeMenuItem={activeMenuItem}
          onMenuItemClick={setActiveMenuItem}
        />

        <main className={styles.main}>
          <div className={styles.pageContent}>
            {/* Alert banner */}
            <div className={styles.alertWrapper}>
              <Alert variant="success" action={<a href="#">{t('shared.actionButton')}</a>}>
                {t('shared.alertMessage')}
              </Alert>
            </div>

            {/* Page title */}
            <h1 className={styles.pageTitle}>{t('nav.home')}</h1>

            {/* Todo / action card */}
            <Card UNSAFE_style={{ marginBottom: "16px" }}>
              <CardContent>
                <div className={styles.actionRow}>
                  <div className={styles.spotIcon}>
                    <Placeholder style={{ width: 24, height: 24, color: "var(--ld-semantic-color-text-onfill-brand-subtle, #002E99)" }} />
                  </div>
                  <div className={styles.actionTextGroup}>
                    <p className={styles.actionTitle}>{t('shared.title')}</p>
                    <p className={styles.actionDescription}>
                      {t('shared.description')}
                    </p>
                  </div>
                  <Button variant="secondary" size="small">{t('shared.buttonLabel')}</Button>
                </div>
              </CardContent>
            </Card>

            {/* Metrics row */}
            <MetricsRow />

            {/* Section showcase */}
            <SectionShowcase />

            {/* Hero + secondary cards row */}
            <HeroSection />

            {/* Primary section */}
            <PrimarySection />
          </div>

          <MartyFloatingPanel />
        </main>
      </div>
    </div>
  );
}

/* ─── Metrics Row ─── */
function MetricsRow() {
  const { t } = useTranslation();
  return (
    <Card UNSAFE_style={{ marginBottom: "24px" }}>
      <CardContent>
        <div className={gridStyles.metricsGrid4}>
          <Metric title={t('shared.label')} value={t('shared.value')} variant="neutral" textLabel="0%" />
          <Metric title={t('shared.label')} value={t('shared.value')} variant="neutral" textLabel="0%" />
          <Metric title={t('shared.label')} value={t('shared.value')} variant="neutral" textLabel="0%" />
          <Metric title={t('shared.label')} value={t('shared.value')} variant="neutral" textLabel="0%" />
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Section Showcase ─── */
function SectionShowcase() {
  const { t } = useTranslation();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ld-primitive-scale-space-300)', marginBottom: 'var(--ld-primitive-scale-space-400)' }}>
      <LDPrimarySection
        title={t('shared.primarySection')}
        description={t('shared.supportingText')}
        divider
      >
        <LDSecondarySection title={t('shared.title')}>
          <LDTertiarySection title={t('shared.label')}>
            <p style={{
              margin: 0,
              fontSize: 'var(--ld-semantic-font-body-small-size)',
              lineHeight: 'var(--ld-semantic-font-body-small-lineheight)',
              color: 'var(--ld-semantic-color-text-subtle)',
            }}>
              {t('shared.cardDescription')}
            </p>
          </LDTertiarySection>
        </LDSecondarySection>
      </LDPrimarySection>
    </div>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  const { t } = useTranslation();
  return (
    <div className={gridStyles.heroGrid}>
      {/* Hero card (dark blue promo) */}
      <div className={styles.heroCard}>
        <div className={styles.heroCircle1} />
        <div className={styles.heroCircle2} />
        <h2 className={styles.heroTitle}>{t('shared.title')}</h2>
        <p className={styles.heroSubtitle}>{t('shared.supportingText')}</p>
        <div className={styles.heroActions}>
          <LinkButton color="white">{t('shared.buttonLabel')}</LinkButton>
        </div>
      </div>

      {/* Secondary cards stack */}
      <div className={styles.secondaryStack}>
        <SecondaryCard />
        <SecondaryCard />
      </div>
    </div>
  );
}

function SecondaryCard() {
  const { t } = useTranslation();
  return (
    <Card>
      <CardContent>
        <div className={styles.secondaryCardRow}>
          <div className={styles.imagePlaceholder}>
            <Image style={{ width: 32, height: 32, color: 'var(--ld-semantic-color-border-disabled, #BABBBE)' }} />
          </div>
          <div className={styles.secondaryCardText}>
            <p className={styles.secondaryCardTitle}>{t('shared.title')}</p>
            <p className={styles.secondaryCardDescription}>
              {t('shared.cardDescription')}
            </p>
            <LinkButton>{t('shared.buttonLabel')}</LinkButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Primary Section ─── */
function PrimarySection() {
  const { t } = useTranslation();
  return (
    <div>
      <div className={styles.primarySectionHeader}>
        <h2 className={styles.primarySectionTitle}>{t('shared.primarySection')}</h2>
        <LinkButton>{t('shared.linkButton')}</LinkButton>
      </div>

      <div className={gridStyles.primaryCardsGrid}>
        {[1, 2, 3, 4].map((i) => (
          <PrimaryCard key={i} />
        ))}
      </div>
    </div>
  );
}

function PrimaryCard() {
  const { t } = useTranslation();
  return (
    <Card>
      <CardContent>
        <div className={styles.primaryCardContent}>
          <div className={styles.primaryCardImage}>
            <Image style={{ width: 48, height: 48, color: 'var(--ld-semantic-color-border-disabled, #BABBBE)' }} />
          </div>
          <p className={styles.primaryCardTitle}>{t('shared.title')}</p>
          <p className={styles.primaryCardDescription}>
            {t('shared.cardDescription')}
          </p>
          <LinkButton>{t('shared.buttonLabel')}</LinkButton>
        </div>
      </CardContent>
    </Card>
  );
}
