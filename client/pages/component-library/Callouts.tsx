import React from 'react';
import { CalloutExample } from '@/components/examples/CalloutExample';
import { PageHeader } from '@/components/ui/PageHeader';
import { useTranslation } from 'react-i18next';

const TooltipExample = React.lazy(() => import('@/components/examples/TooltipExample'));

export default function CalloutsPage() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section={t('componentLibrary.components')} title={t('componentLibrary.navCallouts')} description={t('componentLibrary.descCallouts')} />

      {/* Nubbin Positions & Static Examples */}
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)',
        marginBottom: '32px'
      }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <CalloutExample />
        </React.Suspense>
      </div>

      {/* Interactive Examples */}
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '8px'
        }}>
          {t('componentLibrary.interactiveExamples')}
        </h2>
        <p style={{
          fontSize: '14px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-secondary, #74767C)',
          maxWidth: '800px'
        }}>
          {t('componentLibrary.interactiveExamplesDesc')}
        </p>
      </div>
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <TooltipExample />
        </React.Suspense>
      </div>
    </div>
  );
}
