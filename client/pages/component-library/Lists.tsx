import React from 'react';
import { ListExample } from '@/components/examples/ListExample';
import { PageHeader } from '@/components/ui/PageHeader';
import { useTranslation } from 'react-i18next';

export default function ListsPage() {
  const { t } = useTranslation();
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section={t('componentLibrary.components')} title={t('componentLibrary.navLists')} description={t('componentLibrary.descLists')} />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <ListExample />
        </React.Suspense>
      </div>
    </div>
  );
}
