'use client';

import { useLanguage, useTranslation } from '@/lib/i18n';
import { contentTypeLabelsByLang, contentTypeDescriptionsByLang } from '@/lib/types';

interface CategoryPageTitleProps {
  slug: string;
}

export function CategoryPageTitle({ slug }: CategoryPageTitleProps) {
  const { lang, t } = useTranslation();
  const label = contentTypeLabelsByLang[lang][slug] || slug;
  return <>{lang === 'hi' ? `${label} संग्रह` : `${label} ${t('categoryPage', 'collectionSuffix')}`}</>;
}

export function CategoryPageDescription({ slug }: CategoryPageTitleProps) {
  const { lang } = useLanguage();
  return <>{contentTypeDescriptionsByLang[lang][slug] || ''}</>;
}

export function CategoryPageCountBadge({ slug, total }: CategoryPageTitleProps & { total: number }) {
  const { lang, t } = useTranslation();
  const label = contentTypeLabelsByLang[lang][slug] || slug;
  return (
    <>
      {t('categoryPage', 'total')} {total.toLocaleString(lang === 'hi' ? 'hi-IN' : 'en-IN')} {label}
    </>
  );
}

export function CategoryPageEmptyState({ slug }: CategoryPageTitleProps) {
  const { lang, t } = useTranslation();
  const label = contentTypeLabelsByLang[lang][slug] || slug;

  return (
    <>
      <h2
        className="text-xl font-bold mb-2"
        style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--maroon)' }}
      >
        {lang === 'hi'
          ? `${t('categoryPage', 'noneHeadingPrefix')} ${label} ${t('categoryPage', 'noneHeadingSuffix')}`
          : `${t('categoryPage', 'noneHeadingPrefix')} ${label} ${t('categoryPage', 'noneHeadingSuffix')}`}
      </h2>
      <p style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--color-text-muted)' }}>
        {label} {t('categoryPage', 'noneTextSuffix')}
      </p>
    </>
  );
}
