import { useTranslation } from 'react-i18next';

export function CatalogHero() {
  const { t } = useTranslation('pages');
  return (
    <div
      style={{
        width: '100%',
        borderRadius: '8px 8px 0 0',
        overflow: 'hidden',
      }}
    >
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/e5e32f36e1001c392780efb4a4144f31df2bcde9?width=2464"
        alt={t('catalog.heroAlt')}
        style={{
          display: 'block',
          width: '100%',
          height: 320,
          objectFit: 'cover',
        }}
      />
    </div>
  );
}
