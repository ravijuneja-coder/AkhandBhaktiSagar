'use client';

import { useTranslation } from '@/lib/i18n';

export function DeityPageTitle() {
  const { t } = useTranslation();
  return <>{t('deityPage', 'heading')}</>;
}

export function DeityPageSubtitle() {
  const { t } = useTranslation();
  return <>{t('deityPage', 'subheading')}</>;
}

export function DeityPageEmptyState() {
  const { t } = useTranslation();
  return (
    <>
      <h2
        className="text-xl font-bold mb-2"
        style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--maroon)' }}
      >
        {t('deityPage', 'noneHeading')}
      </h2>
      <p style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--color-text-muted)' }}>
        {t('deityPage', 'noneText')}
      </p>
    </>
  );
}
