'use client';

import { useTranslation } from '@/lib/i18n';
import Breadcrumb from '@/components/public/Breadcrumb';

export function DeityBreadcrumb({ name }: { name: string }) {
  const { t } = useTranslation();
  return <Breadcrumb items={[{ label: t('deityPage', 'heading'), href: '/deity' }, { label: name }]} />;
}

export function DeityTotalBadge({ total }: { total: number }) {
  const { t, lang } = useTranslation();
  return (
    <>
      {t('deityPage', 'total')} {total.toLocaleString(lang === 'hi' ? 'hi-IN' : 'en-IN')} {t('deityPage', 'compositions')}
    </>
  );
}

export function DeityNoPostsState({ name }: { name: string }) {
  const { t, lang } = useTranslation();
  return (
    <>
      <h2
        className="text-xl font-bold mb-2"
        style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--maroon)' }}
      >
        {t('deityPage', 'noPostsHeading')}
      </h2>
      <p style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--color-text-muted)' }}>
        {lang === 'hi' ? `${name} ${t('deityPage', 'noPostsSuffix')}` : `${name}'s ${t('deityPage', 'noPostsSuffix')}`}
      </p>
    </>
  );
}
