'use client';

import { useTranslation } from '@/lib/i18n';

type HomeKey =
  | 'categoriesHeading'
  | 'popularBhajans'
  | 'deitiesHeading'
  | 'latestHeading'
  | 'viewAll'
  | 'comingSoonHeading'
  | 'comingSoonText';

export default function SectionHeading({ tKey }: { tKey: HomeKey }) {
  const { t } = useTranslation();
  return <>{t('home', tKey)}</>;
}
