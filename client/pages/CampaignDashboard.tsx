import React, { useState, useCallback, useRef, useEffect } from "react";
import { useMarty, SelectedElement } from "@/contexts/MartyContext";
import { useTranslation } from 'react-i18next';
import styles from "@/styles/responsive.module.css";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CardContent } from "@/components/ui/CardContent";
import { Divider } from "@/components/ui/Divider";
import { Tag } from "@/components/ui/Tag";
import { Alert } from "@/components/ui/Alert";
import Metric from "@/components/ui/Metric";
import { Select, SelectItem } from "@/components/ui/Select";
import DataTableExample from "@/components/examples/DataTableExample";
import { MastHead } from "@/components/ui/MastHead";
import { AppSidebar } from "@/components/ui/AppSidebar";
import MartyFloatingPanel from "@/features/marty/MartyFloatingPanel";

const HIGHLIGHT_CLASS = 'marty-selecting-hover';
const ACTIVATED_CLASS = 'marty-selecting-activated';
const SELECTED_CLASS = 'marty-selected';

function findMeaningfulContainer(el: HTMLElement): HTMLElement | null {
  const skip = ['HTML', 'BODY', 'MAIN'];
  let node: HTMLElement | null = el;
  for (let i = 0; i < 6 && node; i++) {
    if (skip.includes(node.tagName)) break;
    if (node.getAttribute('data-marty-selectable')) return node;
    if (node.getAttribute('data-marty-dock-zone')) return node;
    const tag = node.tagName.toLowerCase();
    if (['td', 'tr', 'th', 'button', 'a', 'li', 'section', 'article'].includes(tag)) return node;
    const text = (node as HTMLElement & { innerText?: string }).innerText?.trim();
    if (text && text.length >= 3) return node;
    node = node.parentElement;
  }
  return el;
}

function extractElementContext(el: HTMLElement): string | null {
  // Walk up DOM tree to find a container with useful context
  let node: HTMLElement | null = el;
  for (let i = 0; i < 6 && node; i++) {
    const martyLabel = node.getAttribute('data-marty-label');
    if (martyLabel) return martyLabel;

    const ariaLabel = node.getAttribute('aria-label');
    if (ariaLabel && ariaLabel.length > 2) return ariaLabel;

    const text = (node as HTMLElement & { innerText?: string }).innerText?.trim().replace(/\s+/g, ' ');
    if (text && text.length >= 5 && text.length <= 120) return text;
    if (text && text.length > 120) return text.slice(0, 120) + '...';

    node = node.parentElement;
  }
  const text = (el as HTMLElement & { innerText?: string }).innerText?.trim().replace(/\s+/g, ' ');
  return text ? text.slice(0, 120) : null;
}

export default function CampaignDashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState("reports");
  const { t } = useTranslation();
  const { t: tp } = useTranslation('pages');
  const { isElementSelecting, setIsElementSelecting, setIsSidePanel, setSelectedElements } = useMarty();
  const hoveredElRef = useRef<HTMLElement | null>(null);
  const selectedElsRef = useRef<Set<HTMLElement>>(new Set());

  // When selection mode turns off, remove persistent highlights from all tracked elements
  useEffect(() => {
    if (!isElementSelecting) {
      if (hoveredElRef.current) {
        hoveredElRef.current.classList.remove(HIGHLIGHT_CLASS);
        hoveredElRef.current = null;
      }
      selectedElsRef.current.forEach(el => el.classList.remove(SELECTED_CLASS));
      selectedElsRef.current.clear();
    }
  }, [isElementSelecting]);

  // ESC key cancels element selection mode
  useEffect(() => {
    if (!isElementSelecting) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsElementSelecting(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isElementSelecting, setIsElementSelecting]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isElementSelecting) return;
    const container = findMeaningfulContainer(e.target as HTMLElement);
    if (container !== hoveredElRef.current) {
      if (hoveredElRef.current) hoveredElRef.current.classList.remove(HIGHLIGHT_CLASS);
      if (container) container.classList.add(HIGHLIGHT_CLASS);
      hoveredElRef.current = container;
    }
  }, [isElementSelecting]);

  const handleMouseLeave = useCallback(() => {
    if (hoveredElRef.current) {
      hoveredElRef.current.classList.remove(HIGHLIGHT_CLASS);
      hoveredElRef.current = null;
    }
  }, []);

  const handleElementClick = useCallback((e: React.MouseEvent) => {
    if (!isElementSelecting) return;
    e.preventDefault();
    e.stopPropagation();

    // Clear hover highlight
    if (hoveredElRef.current) {
      hoveredElRef.current.classList.remove(HIGHLIGHT_CLASS);
      hoveredElRef.current = null;
    }

    const clickedEl = e.target as HTMLElement;
    const container = findMeaningfulContainer(clickedEl) || clickedEl;

    // Flash activated state briefly, then apply persistent selected highlight
    container.classList.add(ACTIVATED_CLASS);
    setTimeout(() => {
      container.classList.remove(ACTIVATED_CLASS);
      container.classList.add(SELECTED_CLASS);
      selectedElsRef.current.add(container);
    }, 350);

    const proceed = () => {
      // 1. Try data-marty-selectable (metric tile path)
      const selectableTarget = clickedEl.closest('[data-marty-selectable]') as HTMLElement | null;
      if (selectableTarget) {
        const label = selectableTarget.getAttribute('data-marty-label');
        if (label) {
          const newEl: SelectedElement = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            label,
            context: label,
            type: 'metric',
            metricName: label,
          };
          setSelectedElements(prev => [...prev, newEl]);
          setIsSidePanel(true);
          return;
        }
      }
      // 2. Generic fallback — capture context from any clicked element
      const context = extractElementContext(clickedEl);
      if (context) {
        const newEl: SelectedElement = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          label: context.length > 30 ? context.slice(0, 30) + '…' : context,
          context,
          type: 'generic',
        };
        setSelectedElements(prev => [...prev, newEl]);
        setIsSidePanel(true);
      }
    };

    // Small delay so the user sees the activated flash
    setTimeout(proceed, 150);
  }, [isElementSelecting, setIsElementSelecting, setIsSidePanel, setSelectedElements]);

  return (
    <div className={styles.root}>
      <MastHead appName="Dashboard App" currentSolution="Campaign Dashboard" />

      <div className={styles.appRow}>
        <AppSidebar
          activeMenuItem={activeMenuItem}
          onMenuItemClick={setActiveMenuItem}
        />

        <main
          className={styles.main}
          onClick={isElementSelecting ? handleElementClick : undefined}
          onMouseMove={isElementSelecting ? handleMouseMove : undefined}
          onMouseLeave={isElementSelecting ? handleMouseLeave : undefined}
          style={isElementSelecting ? { cursor: 'crosshair' } : undefined}
        >
          {isElementSelecting && (
            <style>{`
              .marty-selecting-hover {
                outline: 2px solid var(--ld-semantic-color-action-fill-primary, #0053E2) !important;
                outline-offset: 2px;
                cursor: crosshair !important;
                border-radius: 4px;
              }
              .marty-selecting-activated {
                outline: 2px solid var(--ld-semantic-color-action-fill-primary, #0053E2) !important;
                outline-offset: 2px;
                background: rgba(0, 83, 226, 0.08) !important;
                border-radius: 4px;
                transition: background 150ms ease;
              }
              .marty-selected {
                outline: 2px solid var(--ld-semantic-color-action-fill-primary, #0053E2) !important;
                outline-offset: 2px;
                background: rgba(0, 83, 226, 0.06) !important;
                border-radius: 4px;
              }
            `}</style>
          )}
          <div className={styles.pageContent}>
            <div className={styles.alertWrapper}>
              <Alert variant="info">
                {tp('campaignDashboard.alertMessage')}
              </Alert>
            </div>

            <h2 className={styles.pageTitle}>{tp('campaignDashboard.pageTitle')}</h2>

            <RecommendationsCards />

            <FilterBar />

            <MetricsRow />

            <Divider />

            {/* Section header — 8px hierarchy rule: title 24px above tabs/content, 16px below divider */}
            <SectionHeader title={tp('index.topPerformingByROAS')} />

            <div className={styles.tableCard}>
              <DataTableExample />
            </div>
          </div>
        </main>
      </div>

      <MartyFloatingPanel />
    </div>
  );
}

/* ─── Recommendations Card ─── */

function RecommendationCard({
  category,
  heading,
  body,
  cta,
}: {
  category: string;
  heading: string;
  body: string;
  cta: string;
}) {
  return (
    <Card UNSAFE_style={{ flex: "1 1 0" }}>
      <CardContent>
        <Tag color="blue" variant="tertiary" style={{ marginBottom: "12px" }}>
          {category}
        </Tag>
        <h3 className={styles.cardHeading}>{heading}</h3>
        <p className={styles.cardBody}>{body}</p>
        <Button variant="secondary" size="small">
          {cta}
        </Button>
      </CardContent>
    </Card>
  );
}

function RecommendationsCards() {
  const { t } = useTranslation('pages');
  return (
    <div className={styles.threeColGrid}>
      <RecommendationCard
        category={t('campaignDashboard.rec1Category')}
        heading={t('campaignDashboard.rec1Heading')}
        body={t('campaignDashboard.rec1Body')}
        cta={t('campaignDashboard.rec1Cta')}
      />
      <RecommendationCard
        category={t('campaignDashboard.rec2Category')}
        heading={t('campaignDashboard.rec2Heading')}
        body={t('campaignDashboard.rec2Body')}
        cta={t('campaignDashboard.rec2Cta')}
      />
      <RecommendationCard
        category={t('campaignDashboard.rec3Category')}
        heading={t('campaignDashboard.rec3Heading')}
        body={t('campaignDashboard.rec3Body')}
        cta={t('campaignDashboard.rec3Cta')}
      />
    </div>
  );
}

/* ─── Filter Bar ─── */

const DATE_RANGES = [
  { value: 'range-1', start: new Date(2025, 0, 1), end: new Date(2025, 0, 31) },
  { value: 'range-2', start: new Date(2025, 1, 1), end: new Date(2025, 1, 28) },
  { value: 'range-3', start: new Date(2025, 2, 1), end: new Date(2025, 2, 31) },
  { value: 'range-4', start: new Date(2025, 3, 1), end: new Date(2025, 3, 30) },
];

function formatDateRange(start: Date, end: Date, lng: string) {
  const fmt = new Intl.DateTimeFormat(lng, { month: 'short', day: 'numeric', year: 'numeric' });
  return `${fmt.format(start)} - ${fmt.format(end)}`;
}

function FilterBar() {
  const [daysWindow, setDaysWindow] = useState("14");
  const [dateRange, setDateRange] = useState("range-1");
  const { t, i18n } = useTranslation('pages');

  return (
    <div className={styles.filterBar}>
      <div className={styles.selectField}>
        <Select
          label={t('index.daysWindow')}
          value={daysWindow}
          onValueChange={setDaysWindow}
          size="large"
        >
          <SelectItem value="7">{t('index.days_7')}</SelectItem>
          <SelectItem value="14">{t('index.days_14')}</SelectItem>
          <SelectItem value="28">{t('index.days_28')}</SelectItem>
          <SelectItem value="30">{t('index.days_30')}</SelectItem>
        </Select>
      </div>
      <div className={styles.selectFieldWide}>
        <Select
          label={t('index.dateRange')}
          value={dateRange}
          onValueChange={setDateRange}
          size="large"
        >
          {DATE_RANGES.map((r) => (
            <SelectItem key={r.value} value={r.value}>
              {formatDateRange(r.start, r.end, i18n.resolvedLanguage || 'en')}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}

/* ─── Section Header ─── */
/* 8px HIERARCHY RULE: Use multiples of 8px for spacing between content sections.
   - 24px (3×8) between section title and content below
   - 16px (2×8) between divider and section title
   - 32px (4×8) between major page sections */

function SectionHeader({ title }: { title: string }) {
  return (
    <div className={styles.sectionHeader}>
      <h3 className={styles.sectionTitle}>{title}</h3>
    </div>
  );
}

/* ─── Metrics Row ─── */

function MetricsRow() {
  const { t } = useTranslation('pages');

  return (
    <Card UNSAFE_style={{ marginBottom: "24px" }}>
      <CardContent>
        <div className={styles.metricsGrid7}>
          <Metric title={t('index.impressions')} value="21,891,371" variant="positiveUp" textLabel="6%" />
          <Metric title={t('index.eCPM')} value="$5.52" variant="negativeDown" textLabel="1%" />
          <Metric title={t('index.spend')} value="$120,869" variant="neutral" textLabel="0%" />
          <Metric title={t('index.totalROAS')} value="$3.13" variant="positiveUp" textLabel="1%" />
          <Metric title={t('index.totalAttributedSales')} value="$377,588" variant="positiveUp" textLabel="3%" />
          <Metric title={t('index.totalAttributedOrders')} value="30,666" variant="positiveUp" textLabel="4%" />
          <Metric title={t('index.totalAttributedUnits')} value="21,891,371" variant="positiveUp" textLabel="2%" />
        </div>
      </CardContent>
    </Card>
  );
}
