import React from 'react';
import { TagExample } from '@/components/examples/TagExample';
import { PageHeader } from '@/components/ui/PageHeader';
import { useTranslation } from 'react-i18next';

export default function TagsPage() {
  const { t } = useTranslation();
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section={t('componentLibrary.components')} title={t('componentLibrary.navTags')} description={t('componentLibrary.descTags')} />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-surface)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <TagExample />
        </React.Suspense>
      </div>
    </div>
  );
}
