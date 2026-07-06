import React from 'react';
import NavigationMenuExample from '@/components/examples/NavigationMenuExample';
import { PageHeader } from '@/components/ui/PageHeader';
import { useTranslation } from 'react-i18next';

export default function NavigationMenuPage() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section={t('componentLibrary.sharedSection')} title={t('componentLibrary.navNavigationMenu')} description={t('componentLibrary.descNavigationMenu')} />
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <NavigationMenuExample />
        </React.Suspense>
      </div>
    </div>
  );
}
