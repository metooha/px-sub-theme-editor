import React from 'react';
import { TabExample } from '@/components/examples/TabExample';
import { PageHeader } from '@/components/ui/PageHeader';
import { useTranslation } from 'react-i18next';

/**
 * Tab Navigation Component Library Page
 * 
 * Displays the LD 3.5 Tab Navigation component with comprehensive examples
 * showing all variants, states, and usage patterns.
 */
export default function TabsPage() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Page Header */}
      <PageHeader section={t('componentLibrary.components')} title={t('componentLibrary.navTabNavigation')} description={t('componentLibrary.descTabNavigation')} />
      
      {/* Documentation Link */}
      <div style={{
        marginBottom: '32px',
        padding: '16px',
        backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)',
        borderRadius: 'var(--ld-semantic-border-radius-medium)',
        borderLeft: '4px solid var(--ld-semantic-color-border-info)',
      }}>
        <p style={{
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          fontSize: 'var(--ld-semantic-font-body-small-size)',
          lineHeight: 'var(--ld-semantic-font-body-small-lineheight)',
          color: 'var(--ld-semantic-color-text)',
          margin: 0,
        }}>
          <strong>{t('componentLibrary.ldDocumentation')}</strong>{' '}
          <a 
            href="https://digitaltoolkit.livingdesign.walmart.com/components/tab-navigation/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--ld-semantic-color-text-brand)',
              textDecoration: 'underline',
            }}
          >
            {t('componentLibrary.navTabNavigation')}
          </a>
        </p>
      </div>

      {/* Examples Card */}
      <div style={{
        background: 'var(--ld-semantic-color-surface)',
        borderRadius: 'var(--ld-semantic-border-radius-large)',
        boxShadow: 'var(--ld-semantic-elevation-100)',
        padding: '32px',
      }}>
        <React.Suspense fallback={
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            color: 'var(--ld-semantic-color-text-subtle)',
          }}>
            {t('componentLibrary.loadingExamples')}
          </div>
        }>
          <TabExample />
        </React.Suspense>
      </div>

      {/* Usage Guidelines */}
      <div style={{ marginTop: '48px' }}>
        <h2 style={{
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          fontSize: 'var(--ld-semantic-font-heading-medium-size-b-l, 24px)',
          fontWeight: 'var(--ld-semantic-font-heading-medium-weight-default, 700)',
          lineHeight: 'var(--ld-semantic-font-heading-medium-line-height-b-l, 36px)',
          marginBottom: '16px',
          color: 'var(--ld-semantic-color-text)',
        }}>
          {t('componentLibrary.usageGuidelines')}
        </h2>
        
        <div style={{
          display: 'grid',
          gap: '24px',
        }}>
          <div>
            <h3 style={{
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              fontSize: 'var(--ld-semantic-font-heading-small-size-b-l, 20px)',
              fontWeight: 'var(--ld-semantic-font-heading-small-weight-default, 700)',
              marginBottom: '8px',
              color: 'var(--ld-semantic-color-text)',
            }}>
              {t('componentLibrary.whenToUse')}
            </h3>
            <ul style={{
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              fontSize: 'var(--ld-semantic-font-body-medium-size)',
              lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
              color: 'var(--ld-semantic-color-text)',
              paddingLeft: '24px',
            }}>
              <li>{t('componentLibrary.tabsWhenToUse1')}</li>
              <li>{t('componentLibrary.tabsWhenToUse2')}</li>
              <li>{t('componentLibrary.tabsWhenToUse3')}</li>
              <li>{t('componentLibrary.tabsWhenToUse4')}</li>
            </ul>
          </div>

          <div>
            <h3 style={{
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              fontSize: 'var(--ld-semantic-font-heading-small-size-b-l, 20px)',
              fontWeight: 'var(--ld-semantic-font-heading-small-weight-default, 700)',
              marginBottom: '8px',
              color: 'var(--ld-semantic-color-text)',
            }}>
              {t('componentLibrary.bestPractices')}
            </h3>
            <ul style={{
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              fontSize: 'var(--ld-semantic-font-body-medium-size)',
              lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
              color: 'var(--ld-semantic-color-text)',
              paddingLeft: '24px',
            }}>
              <li>{t('componentLibrary.tabsBest1')}</li>
              <li>{t('componentLibrary.tabsBest2')}</li>
              <li>{t('componentLibrary.tabsBest3')}</li>
              <li>{t('componentLibrary.tabsBest4')}</li>
              <li>{t('componentLibrary.tabsBest5')}</li>
              <li>{t('componentLibrary.tabsBest6')}</li>
            </ul>
          </div>

          <div>
            <h3 style={{
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              fontSize: 'var(--ld-semantic-font-heading-small-size-b-l, 20px)',
              fontWeight: 'var(--ld-semantic-font-heading-small-weight-default, 700)',
              marginBottom: '8px',
              color: 'var(--ld-semantic-color-text)',
            }}>
              {t('componentLibrary.accessibility')}
            </h3>
            <ul style={{
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              fontSize: 'var(--ld-semantic-font-body-medium-size)',
              lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
              color: 'var(--ld-semantic-color-text)',
              paddingLeft: '24px',
            }}>
              <li>{t('componentLibrary.tabsA11y1')}</li>
              <li>{t('componentLibrary.tabsA11y2')}</li>
              <li>{t('componentLibrary.tabsA11y3')}</li>
              <li>{t('componentLibrary.tabsA11y4')}</li>
              <li>{t('componentLibrary.tabsA11y5')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
