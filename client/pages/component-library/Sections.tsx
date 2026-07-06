import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { useTranslation } from 'react-i18next';

const SectionExample = React.lazy(() => import('@/components/examples/SectionExample'));

export default function SectionsPage() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '48px' }}>
      <PageHeader
        section={t('componentLibrary.sharedSection')}
        title={t('componentLibrary.navSections')}
        description={t('componentLibrary.descSections')}
      />

      <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
        <SectionExample />
      </React.Suspense>
    </div>
  );
}
