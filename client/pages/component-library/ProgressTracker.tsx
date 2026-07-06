import React from 'react';
import { ProgressTrackerExample } from '@/components/examples/ProgressTrackerExample';
import { PageHeader } from '@/components/ui/PageHeader';
import { useTranslation } from 'react-i18next';

export default function ProgressTrackerPage() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section={t('componentLibrary.components')} title={t('componentLibrary.navProgressTracker')} description={t('componentLibrary.descProgressTracker')} />

      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <ProgressTrackerExample />
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
              <li>{t('componentLibrary.trackerWhenToUse1')}</li>
              <li>{t('componentLibrary.trackerWhenToUse2')}</li>
              <li>{t('componentLibrary.trackerWhenToUse3')}</li>
              <li>{t('componentLibrary.trackerWhenToUse4')}</li>
              <li>{t('componentLibrary.trackerWhenToUse5')}</li>
              <li>{t('componentLibrary.trackerWhenToUse6')}</li>
              <li>{t('componentLibrary.trackerWhenToUse7')}</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{t('componentLibrary.whenNotToUse')}</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li>{t('componentLibrary.trackerWhenNotToUse1')}</li>
              <li>{t('componentLibrary.trackerWhenNotToUse2')}</li>
              <li>{t('componentLibrary.trackerWhenNotToUse3')}</li>
              <li>{t('componentLibrary.trackerWhenNotToUse4')}</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{t('componentLibrary.statusVariants')}</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li><strong>Info:</strong> {t('componentLibrary.trackerStatusInfo')}</li>
              <li><strong>Success:</strong> {t('componentLibrary.trackerStatusSuccess')}</li>
              <li><strong>Warning:</strong> {t('componentLibrary.trackerStatusWarning')}</li>
              <li><strong>Error:</strong> {t('componentLibrary.trackerStatusError')}</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{t('componentLibrary.stepStates')}</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li><strong>Completed:</strong> {t('componentLibrary.trackerStepCompleted')}</li>
              <li><strong>Active:</strong> {t('componentLibrary.trackerStepActive')}</li>
              <li><strong>Future:</strong> {t('componentLibrary.trackerStepFuture')}</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{t('componentLibrary.bestPractices')}</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li>{t('componentLibrary.trackerBest1')}</li>
              <li>{t('componentLibrary.trackerBest2')}</li>
              <li>{t('componentLibrary.trackerBest3')}</li>
              <li>{t('componentLibrary.trackerBest4')}</li>
              <li>{t('componentLibrary.trackerBest5')}</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{t('componentLibrary.accessibility')}</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li>{t('componentLibrary.trackerA11y1')}</li>
              <li>{t('componentLibrary.trackerA11y2')}</li>
              <li>{t('componentLibrary.trackerA11y3')}</li>
              <li>{t('componentLibrary.trackerA11y4')}</li>
              <li>{t('componentLibrary.trackerA11y5')}</li>
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
                    <td style={{ padding: '12px 8px' }}><code>steps</code></td>
                    <td style={{ padding: '12px 8px' }}>string[]</td>
                    <td style={{ padding: '12px 8px' }}>required</td>
                    <td style={{ padding: '12px 8px' }}>{t('componentLibrary.trackerStepsDesc')}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F1F1F2)' }}>
                    <td style={{ padding: '12px 8px' }}><code>activeStep</code></td>
                    <td style={{ padding: '12px 8px' }}>number</td>
                    <td style={{ padding: '12px 8px' }}>required</td>
                    <td style={{ padding: '12px 8px' }}>{t('componentLibrary.trackerActiveStepDesc')}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F1F1F2)' }}>
                    <td style={{ padding: '12px 8px' }}><code>status</code></td>
                    <td style={{ padding: '12px 8px' }}>"info" | "warning" | "success" | "error"</td>
                    <td style={{ padding: '12px 8px' }}>"info"</td>
                    <td style={{ padding: '12px 8px' }}>{t('componentLibrary.trackerStatusDesc')}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 8px' }}><code>className</code></td>
                    <td style={{ padding: '12px 8px' }}>string</td>
                    <td style={{ padding: '12px 8px' }}>-</td>
                    <td style={{ padding: '12px 8px' }}>{t('componentLibrary.trackerClassNameDesc')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{t('componentLibrary.designTokens')}</h3>
            <p style={{ marginBottom: '12px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              {t('componentLibrary.trackerTokensDesc')}
            </p>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li><strong>Progress colors:</strong> <code>--ld-semantic-color-progress-fill-*</code> (info, warning, positive, negative)</li>
              <li><strong>Typography:</strong> <code>--ld-semantic-font-caption-family</code>, <code>--ld-semantic-font-caption-size</code></li>
              <li><strong>Text colors:</strong> <code>--ld-semantic-color-text</code>, <code>--ld-semantic-color-text-subtlest</code></li>
              <li><strong>Spacing:</strong> <code>--ld-primitive-scale-space-25</code>, <code>--ld-primitive-scale-space-50</code></li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{t('componentLibrary.relatedComponents')}</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li><strong>ProgressIndicator:</strong> {t('componentLibrary.trackerRelatedProgress')}</li>
              <li><strong>ButtonGroup:</strong> {t('componentLibrary.trackerRelatedButtonGroup')}</li>
              <li><strong>Tag:</strong> {t('componentLibrary.trackerRelatedTag')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
