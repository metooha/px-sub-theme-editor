import React from 'react';
import MenubarExample from '@/components/examples/MenubarExample';
import { PageHeader } from '@/components/ui/PageHeader';
import { useTranslation } from 'react-i18next';

export default function MenubarPage() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section={t('componentLibrary.sharedSection')} title={t('componentLibrary.navMenubar')} description={t('componentLibrary.descMenubar')} />
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <MenubarExample />
        </React.Suspense>
      </div>
    </div>
  );
}
