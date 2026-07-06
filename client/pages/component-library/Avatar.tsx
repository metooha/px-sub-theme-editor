import React from 'react';
import AvatarExample from '@/components/examples/AvatarExample';
import { PageHeader } from '@/components/ui/PageHeader';
import { useTranslation } from 'react-i18next';

export default function AvatarPage() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section={t('componentLibrary.sharedSection')} title={t('componentLibrary.navAvatar')} description={t('componentLibrary.descAvatar')} />
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <AvatarExample />
        </React.Suspense>
      </div>
    </div>
  );
}
