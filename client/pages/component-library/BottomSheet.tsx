import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/ui/PageHeader';

const BottomSheetExample = React.lazy(() => import('../../components/examples/BottomSheetExample'));

export default function BottomSheetPage() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section={t('componentLibrary.sharedSection')} title={t('componentLibrary.navBottomSheet')} description={t('componentLibrary.descBottomSheet')} />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <BottomSheetExample />
        </React.Suspense>
      </div>
    </div>
  );
}
