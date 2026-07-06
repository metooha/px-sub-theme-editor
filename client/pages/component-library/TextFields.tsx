import React from 'react';
import { TextFieldExample } from '@/components/examples/TextFieldExample';
import { PageHeader } from '@/components/ui/PageHeader';
import { useTranslation } from 'react-i18next';

const LabelExample = React.lazy(() => import('@/components/examples/LabelExample'));

export default function TextFieldsPage() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section={t('componentLibrary.components')} title={t('componentLibrary.navTextFields')} description={t('componentLibrary.textFieldsPageDesc')} />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)',
        marginBottom: '32px'
      }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <TextFieldExample />
        </React.Suspense>
      </div>

      {/* Label Usage Examples */}
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '8px'
        }}>
          {t('componentLibrary.labelsHeading')}
        </h2>
        <p style={{
          fontSize: '14px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-secondary, #74767C)',
          maxWidth: '800px'
        }}>
          {t('componentLibrary.labelsDesc')}
        </p>
      </div>
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <LabelExample />
        </React.Suspense>
      </div>
    </div>
  );
}
