import React from 'react';
import { ProgressIndicatorExample } from '@/components/examples/ProgressIndicatorExample';
import { PageHeader } from '@/components/ui/PageHeader';
import { useTranslation } from 'react-i18next';

export default function ProgressIndicatorPage() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section={t('componentLibrary.components')} title={t('componentLibrary.navProgressIndicator')} description={t('componentLibrary.descProgressIndicator')} />

      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <ProgressIndicatorExample />
        </React.Suspense>
      </div>

      <div style={{ marginTop: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-primary, #2E2F32)', marginBottom: '16px' }}>
          {t('componentLibrary.guidelinesHeading')}
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{t('componentLibrary.whenToUse')}</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li>{t('componentLibrary.progressWhenToUse1')}</li>
              <li>{t('componentLibrary.progressWhenToUse2')}</li>
              <li>{t('componentLibrary.progressWhenToUse3')}</li>
              <li>{t('componentLibrary.progressWhenToUse4')}</li>
              <li>{t('componentLibrary.progressWhenToUse5')}</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{t('componentLibrary.whenNotToUse')}</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li>{t('componentLibrary.progressWhenNotToUse1')}</li>
              <li>{t('componentLibrary.progressWhenNotToUse2')}</li>
              <li>{t('componentLibrary.progressWhenNotToUse3')}</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{t('componentLibrary.variants')}</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li><strong>Primary:</strong> {t('componentLibrary.progressVariantPrimary')}</li>
              <li><strong>Success:</strong> {t('componentLibrary.progressVariantSuccess')}</li>
              <li><strong>Warning:</strong> {t('componentLibrary.progressVariantWarning')}</li>
              <li><strong>Error:</strong> {t('componentLibrary.progressVariantError')}</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{t('componentLibrary.accessibility')}</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li>{t('componentLibrary.progressA11y1')}</li>
              <li>{t('componentLibrary.progressA11y2')}</li>
              <li>{t('componentLibrary.progressA11y3')}</li>
              <li>{t('componentLibrary.progressA11y4')}</li>
              <li>{t('componentLibrary.progressA11y5')}</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{t('componentLibrary.props')}</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--ld-semantic-color-border-moderate, #E6E6E8)' }}>
                    <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: '700' }}>{t('componentLibrary.propName')}</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: '700' }}>{t('componentLibrary.propType')}</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: '700' }}>{t('componentLibrary.propDefault')}</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: '700' }}>{t('componentLibrary.propDescription')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F1F1F2)' }}>
                    <td style={{ padding: '12px 8px' }}><code>value</code></td>
                    <td style={{ padding: '12px 8px' }}>number</td>
                    <td style={{ padding: '12px 8px' }}>required</td>
                    <td style={{ padding: '12px 8px' }}>{t('componentLibrary.progressValueDesc')}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F1F1F2)' }}>
                    <td style={{ padding: '12px 8px' }}><code>max</code></td>
                    <td style={{ padding: '12px 8px' }}>number</td>
                    <td style={{ padding: '12px 8px' }}>100</td>
                    <td style={{ padding: '12px 8px' }}>{t('componentLibrary.progressMaxDesc')}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F1F1F2)' }}>
                    <td style={{ padding: '12px 8px' }}><code>label</code></td>
                    <td style={{ padding: '12px 8px' }}>string</td>
                    <td style={{ padding: '12px 8px' }}>-</td>
                    <td style={{ padding: '12px 8px' }}>{t('componentLibrary.progressLabelDesc')}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F1F1F2)' }}>
                    <td style={{ padding: '12px 8px' }}><code>valueLabel</code></td>
                    <td style={{ padding: '12px 8px' }}>string</td>
                    <td style={{ padding: '12px 8px' }}>-</td>
                    <td style={{ padding: '12px 8px' }}>{t('componentLibrary.progressValueLabelDesc')}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F1F1F2)' }}>
                    <td style={{ padding: '12px 8px' }}><code>variant</code></td>
                    <td style={{ padding: '12px 8px' }}>"primary" | "success" | "warning" | "error"</td>
                    <td style={{ padding: '12px 8px' }}>"primary"</td>
                    <td style={{ padding: '12px 8px' }}>{t('componentLibrary.progressVariantDesc')}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F1F1F2)' }}>
                    <td style={{ padding: '12px 8px' }}><code>showValue</code></td>
                    <td style={{ padding: '12px 8px' }}>boolean</td>
                    <td style={{ padding: '12px 8px' }}>false</td>
                    <td style={{ padding: '12px 8px' }}>{t('componentLibrary.progressShowValueDesc')}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 8px' }}><code>className</code></td>
                    <td style={{ padding: '12px 8px' }}>string</td>
                    <td style={{ padding: '12px 8px' }}>-</td>
                    <td style={{ padding: '12px 8px' }}>{t('componentLibrary.progressClassNameDesc')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{t('componentLibrary.designTokens')}</h3>
            <p style={{ marginBottom: '12px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              {t('componentLibrary.progressTokensDesc')}
            </p>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li><strong>Colors:</strong> <code>--ld-semantic-color-action-fill-primary</code>, <code>--ld-semantic-color-feedback-fill-*</code></li>
              <li><strong>Typography:</strong> <code>--ld-semantic-font-family-sans</code>, <code>--ld-semantic-font-body-small-*</code></li>
              <li><strong>Spacing:</strong> <code>--ld-primitive-scale-space-100</code></li>
              <li><strong>Border radius:</strong> <code>--ld-primitive-scale-borderradius-50</code></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
