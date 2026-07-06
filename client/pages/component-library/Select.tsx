import React from 'react';
import { SelectExample } from '@/components/examples/SelectExample';
import { PageHeader } from '@/components/ui/PageHeader';
import { useTranslation } from 'react-i18next';

export default function SelectPage() {
  const { t } = useTranslation();
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <PageHeader section={t('componentLibrary.components')} title={t('componentLibrary.navSelect')} description={t('componentLibrary.descSelect')} />

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-background, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <SelectExample />
        </React.Suspense>
      </div>

      <div style={{ marginTop: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text, #2E2F32)',
          marginBottom: '16px'
        }}>
          {t('componentLibrary.usageGuidelines')}
        </h2>
        
        <div style={{ maxWidth: '800px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', marginTop: '24px' }}>
            {t('componentLibrary.whenToUse')}
          </h3>
          <ul style={{ paddingLeft: '24px', lineHeight: '1.8', color: 'var(--ld-semantic-color-text-subtle, #515357)' }}>
            <li>{t('componentLibrary.selectWhenToUse1')}</li>
            <li>{t('componentLibrary.selectWhenToUse2')}</li>
            <li>{t('componentLibrary.selectWhenToUse3')}</li>
            <li>{t('componentLibrary.selectWhenToUse4')}</li>
          </ul>

          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', marginTop: '24px' }}>
            {t('componentLibrary.whenNotToUse')}
          </h3>
          <ul style={{ paddingLeft: '24px', lineHeight: '1.8', color: 'var(--ld-semantic-color-text-subtle, #515357)' }}>
            <li>{t('componentLibrary.selectWhenNotToUse1')}</li>
            <li>{t('componentLibrary.selectWhenNotToUse2')}</li>
            <li>{t('componentLibrary.selectWhenNotToUse3')}</li>
          </ul>

          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', marginTop: '24px' }}>
            {t('componentLibrary.accessibility')}
          </h3>
          <ul style={{ paddingLeft: '24px', lineHeight: '1.8', color: 'var(--ld-semantic-color-text-subtle, #515357)' }}>
            <li>{t('componentLibrary.selectA11y1')}</li>
            <li>{t('componentLibrary.selectA11y2')}</li>
            <li>{t('componentLibrary.selectA11y3')}</li>
            <li>{t('componentLibrary.selectA11y4')}</li>
          </ul>

          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', marginTop: '24px' }}>
            {t('componentLibrary.bestPractices')}
          </h3>
          <ul style={{ paddingLeft: '24px', lineHeight: '1.8', color: 'var(--ld-semantic-color-text-subtle, #515357)' }}>
            <li>{t('componentLibrary.selectBest1')}</li>
            <li>{t('componentLibrary.selectBest2')}</li>
            <li>{t('componentLibrary.selectBest3')}</li>
            <li>{t('componentLibrary.selectBest4')}</li>
            <li>{t('componentLibrary.selectBest5')}</li>
            <li>{t('componentLibrary.selectBest6')}</li>
            <li>{t('componentLibrary.selectBest7')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
