import React from 'react';
import { PopoverExample } from '@/components/examples/PopoverExample';
import { PageHeader } from '@/components/ui/PageHeader';
import { useTranslation } from 'react-i18next';

export default function PopoverPage() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section={t('componentLibrary.components')} title={t('componentLibrary.navPopover')} description={t('componentLibrary.descPopover')} />

      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <PopoverExample />
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
              <li>{t('componentLibrary.popoverWhenToUse1')}</li>
              <li>{t('componentLibrary.popoverWhenToUse2')}</li>
              <li>{t('componentLibrary.popoverWhenToUse3')}</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{t('componentLibrary.whenNotToUse')}</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li>{t('componentLibrary.popoverWhenNotToUse1')}</li>
              <li>{t('componentLibrary.popoverWhenNotToUse2')}</li>
              <li>{t('componentLibrary.popoverWhenNotToUse3')}</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{t('componentLibrary.accessibility')}</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              <li>{t('componentLibrary.popoverA11y1')}</li>
              <li>{t('componentLibrary.popoverA11y2')}</li>
              <li>{t('componentLibrary.popoverA11y3')}</li>
              <li>{t('componentLibrary.popoverA11y4')}</li>
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
                    <td style={{ padding: '12px 8px' }}><code>align</code></td>
                    <td style={{ padding: '12px 8px' }}>"start" | "center" | "end"</td>
                    <td style={{ padding: '12px 8px' }}>"center"</td>
                    <td style={{ padding: '12px 8px' }}>{t('componentLibrary.popoverAlignDesc')}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F1F1F2)' }}>
                    <td style={{ padding: '12px 8px' }}><code>sideOffset</code></td>
                    <td style={{ padding: '12px 8px' }}>number</td>
                    <td style={{ padding: '12px 8px' }}>8</td>
                    <td style={{ padding: '12px 8px' }}>{t('componentLibrary.popoverOffsetDesc')}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F1F1F2)' }}>
                    <td style={{ padding: '12px 8px' }}><code>showArrow</code></td>
                    <td style={{ padding: '12px 8px' }}>boolean</td>
                    <td style={{ padding: '12px 8px' }}>false</td>
                    <td style={{ padding: '12px 8px' }}>{t('componentLibrary.popoverArrowDesc')}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 8px' }}><code>open</code></td>
                    <td style={{ padding: '12px 8px' }}>boolean</td>
                    <td style={{ padding: '12px 8px' }}>-</td>
                    <td style={{ padding: '12px 8px' }}>{t('componentLibrary.popoverOpenDesc')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
