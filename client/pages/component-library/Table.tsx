import React from 'react';
import DataTableExample from '@/components/examples/DataTableExample';
import DataTableSubComponentsExample from '@/components/examples/DataTableSubComponentsExample';
import { PageHeader } from '@/components/ui/PageHeader';
import { useTranslation } from 'react-i18next';

export default function TablePage() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader
        section={t('componentLibrary.sharedSection')}
        title={t('componentLibrary.navTable')}
        description={t('componentLibrary.descTable')}
      />

      {/* Full interactive example */}
      <h2 style={{
        margin: '0 0 16px 0',
        fontFamily: 'var(--ld-semantic-font-heading-small-family)',
        fontSize: '24px',
        fontWeight: 700,
        color: 'var(--ld-semantic-color-text, #2E2F32)',
      }}>
        Full Example
      </h2>
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)',
        overflow: 'hidden',
        border: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
        marginBottom: '48px',
      }}>
        <React.Suspense fallback={<div style={{ padding: '32px' }}>{t('componentLibrary.loading')}</div>}>
          <DataTableExample />
        </React.Suspense>
      </div>

      {/* Sub-component showcase */}
      <h2 style={{
        margin: '0 0 16px 0',
        fontFamily: 'var(--ld-semantic-font-heading-small-family)',
        fontSize: '24px',
        fontWeight: 700,
        color: 'var(--ld-semantic-color-text, #2E2F32)',
      }}>
        Sub-Components
      </h2>
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)',
      }}>
        <React.Suspense fallback={<div style={{ padding: '32px' }}>{t('componentLibrary.loading')}</div>}>
          <DataTableSubComponentsExample />
        </React.Suspense>
      </div>
    </div>
  );
}
