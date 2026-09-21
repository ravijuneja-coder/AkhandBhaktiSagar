'use client';

import { useLanguage } from '@/lib/i18n';
import { contentTypeLabelsByLang } from '@/lib/types';

interface CategoryLabelProps {
  slug: string;
  fallback?: string;
}

export default function CategoryLabel({ slug, fallback }: CategoryLabelProps) {
  const { lang } = useLanguage();
  return <>{contentTypeLabelsByLang[lang][slug] || fallback || slug}</>;
}
