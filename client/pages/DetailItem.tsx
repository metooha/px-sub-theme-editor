import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MastHead } from '@/components/ui/MastHead';
import { AppSidebar } from '@/components/ui/AppSidebar';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import { Tag } from '@/components/ui/Tag';
import { Rating } from '@/components/ui/Rating';
import { Card } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/CardContent';
import { Divider } from '@/components/ui/Divider';
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';
import {
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  CheckCircleFill,
  Warning,
  WarningFill,
  ExclamationCircleFill,
  MoreHorizontal,
  ExternalLink,
  Clipboard,
} from '@/components/icons';
import styles from '@/styles/detailItem.module.css';
import { getSellerCenterMenuItems } from '@/features/seller-center/menuItems';

type View = 'detail-item' | 'detail-form';

export default function DetailItem() {
  const [view, setView] = useState<View>('detail-item');
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={styles.root}>
      <MastHead currentSolution="Detail Item" />

      <div className={styles.appRow}>
        <AppSidebar menuItems={getSellerCenterMenuItems(t)} />

        <main className={styles.main}>
          {view === 'detail-item' ? (
            <DetailItemView onNavigateToForm={() => setView('detail-form')} />
          ) : (
            <DetailFormView onBack={() => setView('detail-item')} />
          )}
        </main>
      </div>
    </div>
  );
}

/* ─── Detail Item View ─── */

type SectionStatus = 'complete' | 'warning' | 'error' | 'incomplete';

interface Section {
  id: string;
  title: string;
  status: SectionStatus;
  defaultOpen: boolean;
}

const sectionDefs: { id: string; status: SectionStatus; defaultOpen: boolean }[] = [
  { id: '1', status: 'complete', defaultOpen: false },
  { id: '2', status: 'complete', defaultOpen: false },
  { id: '3', status: 'warning', defaultOpen: true },
  { id: '4', status: 'error', defaultOpen: true },
  { id: '5', status: 'incomplete', defaultOpen: true },
  { id: '6', status: 'incomplete', defaultOpen: true },
];

function DetailItemView({ onNavigateToForm }: { onNavigateToForm: () => void }) {
  const { t } = useTranslation();
  const { t: tp } = useTranslation('pages');
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(sectionDefs.filter((s) => s.defaultOpen).map((s) => s.id))
  );
  const sections: Section[] = sectionDefs.map((s) => ({ ...s, title: t('shared.primarySection') }));

  const toggle = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={styles.pageInner}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderContainer}>
          <Breadcrumb>
            <BreadcrumbItem href="/">{t('nav.home')}</BreadcrumbItem>
            <BreadcrumbItem isCurrent>{tp('detailItem.detailForm')}</BreadcrumbItem>
          </Breadcrumb>
          <div className={styles.titleRow}>
            <button className={styles.backBtn} onClick={onNavigateToForm} aria-label={t('actions.back')}>
              <ArrowLeft style={{ width: 20, height: 20 }} />
            </button>
            <h1 className={styles.pageTitle}>{tp('detailItem.title')}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.contentArea}>
        <div className={styles.contentContainer}>
          {/* Primary column */}
          <div className={styles.primaryColumn}>
            {sections.map((section) => (
              <CollapsibleSection
                key={section.id}
                section={section}
                isOpen={openSections.has(section.id)}
                onToggle={() => toggle(section.id)}
              />
            ))}
          </div>

          {/* Secondary column */}
          <div className={styles.secondaryColumn}>
            <ListingPreviewCard />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Collapsible Section ─── */

function CollapsibleSection({
  section,
  isOpen,
  onToggle,
}: {
  section: Section;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={styles.sectionCard}>
      <button className={styles.sectionHeader} onClick={onToggle} aria-expanded={isOpen}>
        <span className={styles.sectionChevron}>
          {isOpen ? (
            <ChevronDown style={{ width: 20, height: 20 }} />
          ) : (
            <ChevronRight style={{ width: 20, height: 20 }} />
          )}
        </span>
        <span className={styles.sectionTitle}>{section.title}</span>
        <StatusTag status={section.status} />
      </button>

      {isOpen && (
        <div className={styles.sectionBody}>
          <ContentPlaceholder />
        </div>
      )}
    </div>
  );
}

function StatusTag({ status }: { status: SectionStatus }) {
  const { t } = useTranslation('pages');
  if (status === 'complete') {
    return (
      <Tag variant="tertiary" color="positive" leading={<CheckCircleFill style={{ width: 16, height: 16 }} />}>
        {t('detailItem.complete')}
      </Tag>
    );
  }
  if (status === 'warning') {
    return (
      <Tag variant="tertiary" color="warning" leading={<WarningFill style={{ width: 16, height: 16 }} />}>
        {t('detailItem.warning')}
      </Tag>
    );
  }
  if (status === 'error') {
    return (
      <Tag variant="tertiary" color="negative" leading={<ExclamationCircleFill style={{ width: 16, height: 16 }} />}>
        {t('detailItem.error')}
      </Tag>
    );
  }
  return (
    <Tag variant="tertiary" color="gray" leading={<CheckCircle style={{ width: 16, height: 16 }} />}>
      {t('detailItem.incomplete')}
    </Tag>
  );
}

function ContentPlaceholder() {
  const { t } = useTranslation('pages');
  return (
    <div className={styles.contentPlaceholder}>
      <span className={styles.contentPlaceholderLabel}>{t('detailItem.content')}</span>
    </div>
  );
}

/* ─── Listing Preview Card ─── */

function ListingPreviewCard() {
  const { t } = useTranslation('pages');
  return (
    <Card>
      <CardContent>
        <div className={styles.listingPreview}>
          <p className={styles.listingPreviewLabel}>{t('detailItem.listingPreview')}</p>
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/1e88dc1099f51ce6b50137341a6af4875348b4b5?width=544"
            alt={t('detailItem.productName')}
            className={styles.listingPreviewImg}
          />
          <div className={styles.listingDetails}>
            <p className={styles.listingBrand}>{t('detailItem.brand')}</p>
            <Tag variant="tertiary" color="gray" style={{ alignSelf: 'flex-start' }}>{t('detailItem.primary')}</Tag>
            <p className={styles.listingProductName}>{t('detailItem.productName')}</p>
            <div className={styles.listingRating}>
              <Rating value={4.4} size="small" />
              <span className={styles.listingRatingText}>{t('detailItem.reviews')}</span>
            </div>
            <p className={styles.listingPrice}>$4.96</p>
            <p className={styles.listingOffers}>{t('detailItem.offers')}</p>
            <a
              href="#"
              className={styles.listingLink}
            >
              {t('detailItem.viewOnWalmart')}
              <ExternalLink style={{ width: 12, height: 12, marginLeft: 4 }} />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Detail Form View ─── */

function DetailFormView({ onBack }: { onBack: () => void }) {
  const { t } = useTranslation();
  const { t: tp } = useTranslation('pages');
  return (
    <div className={styles.pageInner}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderContainer}>
          <Breadcrumb>
            <BreadcrumbItem href="/">{t('nav.home')}</BreadcrumbItem>
            <BreadcrumbItem isCurrent>{tp('detailItem.detailForm')}</BreadcrumbItem>
          </Breadcrumb>
          <div className={styles.titleRow}>
            <div className={styles.titleLeading}>
              <button className={styles.backBtn} onClick={onBack} aria-label={t('actions.back')}>
                <ArrowLeft style={{ width: 20, height: 20 }} />
              </button>
              <h1 className={styles.pageTitle}>{tp('detailItem.detailForm')}</h1>
            </div>
            <div className={styles.titleActions}>
              <LinkButton size="medium">{t('shared.buttonLabel')}</LinkButton>
              <LinkButton size="medium">{t('shared.buttonLabel')}</LinkButton>
              <Button variant="primary" size="medium">{t('shared.buttonLabel')}</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.contentArea}>
        <div className={styles.contentContainer}>
          {/* Primary column — forms */}
          <div className={styles.primaryColumn}>
            {/* Address form card */}
            <div className={styles.formCard}>
              <div className={styles.formCardHeader}>
                <h2 className={styles.formCardTitle}>{tp('detailItem.address')}</h2>
                <Button variant="secondary" size="small">{t('shared.buttonLabel')}</Button>
              </div>
              <div className={styles.formBody}>
                <div className={styles.formRow}>
                  <FormField label={tp('detailItem.firstName')} value="Jane" />
                  <FormField label={tp('detailItem.lastName')} value="Doe" />
                </div>
                <FormField label={tp('detailItem.streetAddress1')} value="1234 Main Street" fullWidth />
                <FormField label={tp('detailItem.streetAddress2')} value="Apt 123" fullWidth />
                <div className={styles.formRow}>
                  <FormSelect label={tp('detailItem.state')} value="Arkansas" />
                  <FormField label={tp('detailItem.zipCode')} value="94066" />
                </div>
              </div>
            </div>

            {/* Credit card form card */}
            <div className={styles.formCard}>
              <div className={styles.formCardHeader}>
                <h2 className={styles.formCardTitle}>{tp('detailItem.creditCardInfo')}</h2>
                <Button variant="secondary" size="small">{t('shared.buttonLabel')}</Button>
              </div>
              <div className={styles.formBody}>
                <FormField label={tp('detailItem.cardholderName')} value="Jane Doe" fullWidth />
                <FormField label={tp('detailItem.cardNumber')} value="1234 5678 9012 3456" fullWidth />
                <div className={styles.formRow}>
                  <FormField label={tp('detailItem.expiryDate')} value="12/12" />
                  <FormField label={tp('detailItem.cvv')} value="•••" />
                </div>
              </div>
            </div>
          </div>

          {/* Secondary column */}
          <div className={styles.secondaryColumn}>
            {/* Customer details */}
            <Card>
              <CardContent>
                <div className={styles.secondaryCardHeader}>
                  <h3 className={styles.secondaryCardTitle}>{tp('detailItem.customerDetails')}</h3>
                  <button className={styles.moreBtn} aria-label={t('shared.moreOptions')}>
                    <MoreHorizontal style={{ width: 16, height: 16 }} />
                  </button>
                </div>
                <div className={styles.customerDetails}>
                  <p className={styles.customerName}>Gordon Ramsey</p>
                  <p className={styles.customerPhone}>(444) 248-4840*</p>
                  <a href="#" className={styles.customerLink}>{tp('detailItem.emailCustomer')}</a>
                </div>
                <Divider />
                <div className={styles.shippingSection}>
                  <h4 className={styles.shippingTitle}>{tp('detailItem.shippingAddress')}</h4>
                  <div className={styles.shippingRow}>
                    <p className={styles.shippingAddress}>
                      123 Pine Ave<br />Bentonville, AR 72712
                    </p>
                    <button className={styles.copyBtn} aria-label="Copy address">
                      <Clipboard style={{ width: 16, height: 16 }} />
                    </button>
                  </div>
                  <p className={styles.shippingCaption}>
                    {tp('detailItem.phoneDisclaimer')}{' '}
                    <a href="#" className={styles.shippingLink}>
                      {tp('detailItem.policyLink')}
                    </a>
                    {tp('detailItem.policyWarning')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Secondary section */}
            <Card>
              <CardContent>
                <div className={styles.secondaryCardHeader}>
                  <h3 className={styles.secondaryCardTitle}>{t('shared.secondarySection')}</h3>
                  <button className={styles.moreBtn} aria-label={t('shared.moreOptions')}>
                    <MoreHorizontal style={{ width: 16, height: 16 }} />
                  </button>
                </div>
                <div className={styles.listSection}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className={styles.listItem}>
                      <span className={styles.listItemText}>{t('shared.listItemText')}</span>
                      <span className={styles.listItemTrailing}>{t('shared.trailing')}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Form field helpers ─── */

function FormField({
  label,
  value,
  fullWidth,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? styles.formFieldFull : styles.formField}>
      <label className={styles.fieldLabel}>{label}</label>
      <input className={styles.fieldInput} defaultValue={value} />
    </div>
  );
}

function FormSelect({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.formField}>
      <label className={styles.fieldLabel}>{label}</label>
      <div className={styles.selectWrapper}>
        <select className={styles.fieldSelect} defaultValue={value}>
          <option>Arkansas</option>
          <option>California</option>
          <option>Texas</option>
          <option>New York</option>
        </select>
        <ChevronDown style={{ width: 16, height: 16, flexShrink: 0, pointerEvents: 'none' }} />
      </div>
    </div>
  );
}
