import React from 'react';
import ContextMenuExample from '@/components/examples/ContextMenuExample';
import { PageHeader } from '@/components/ui/PageHeader';
import { useTranslation } from 'react-i18next';

export default function ContextMenuPage() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section={t('componentLibrary.sharedSection')} title={t('componentLibrary.navContextMenu')} description={t('componentLibrary.descContextMenu')} />
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <ContextMenuExample />
        </React.Suspense>
      </div>
    </div>
  );
}
