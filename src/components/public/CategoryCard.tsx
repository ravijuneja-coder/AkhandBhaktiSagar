'use client';

import Link from 'next/link';
import { contentTypeLabelsByLang, contentTypeDescriptionsByLang, contentTypeToUrl } from '@/lib/types';
import { ContentType } from '@prisma/client';
import { useLanguage } from '@/lib/i18n';

const categoryIcons: Record<string, string> = {
  bhajan: '🎵',
  aarti: '🪔',
  chalisa: '📿',
  mantra: '🔔',
  stotra: '📖',
  'bhakti-geet': '🎶',
  article: '✍️',
  festival: '🎊',
  katha: '📚',
};

// Pastel gradient + accent palette, one per category, echoing the warm
// devotional palette used elsewhere but toned down for large card surfaces.
const categoryPalettes: Record<string, { gradient: string; accent: string; text: string; iconBg: string }> = {
  bhajan:       { gradient: 'linear-gradient(135deg, #FFF3E8, #FFE4CC)', accent: '#E85D04', text: '#7A3400', iconBg: '#FFDAB3' },
  aarti:        { gradient: 'linear-gradient(135deg, #FFF0E4, #FFDDC2)', accent: '#C04400', text: '#7A2E00', iconBg: '#FFD2AD' },
  chalisa:      { gradient: 'linear-gradient(135deg, #FDF0F5, #FBDCEB)', accent: '#B8195E', text: '#8B1049', iconBg: '#F7C6DE' },
  mantra:       { gradient: 'linear-gradient(135deg, #FBEDED, #F3D4D4)', accent: '#7B1B1B', text: '#5A1212', iconBg: '#F0C4C4' },
  stotra:       { gradient: 'linear-gradient(135deg, #FDF2E8, #F8DEC2)', accent: '#8B3010', text: '#6B2409', iconBg: '#F3CFA0' },
  'bhakti-geet':{ gradient: 'linear-gradient(135deg, #FFF3E0, #FFE0B3)', accent: '#994400', text: '#6B3000', iconBg: '#FFD68F' },
  article:      { gradient: 'linear-gradient(135deg, #F2ECEC, #E2D3D3)', accent: '#5A0D0D', text: '#420909', iconBg: '#D8BEBE' },
  festival:     { gradient: 'linear-gradient(135deg, #FFF6E0, #FFE9B3)', accent: '#995500', text: '#6B3B00', iconBg: '#FFDD8F' },
  katha:        { gradient: 'linear-gradient(180deg, #EAF6F0, #D5EEE0)', accent: '#0F766E', text: '#0A4F49', iconBg: '#BEE8D8' },
};

const defaultPalette = { gradient: 'linear-gradient(135deg, #FFF3E8, #FFE4CC)', accent: '#E85D04', text: '#7A3400', iconBg: '#FFDAB3' };

interface CategoryCardProps {
  /** Either a URL slug ('bhajan') or a Prisma ContentType enum ('BHAJAN') */
  contentType: string;
  count: number;
}

export default function CategoryCard({ contentType, count }: CategoryCardProps) {
  const { lang } = useLanguage();
  // Normalize: if it's a Prisma enum value (uppercase), convert to URL slug
  const slug = contentTypeToUrl[contentType as ContentType] ?? contentType.toLowerCase().replace('_', '-');
  const label = contentTypeLabelsByLang[lang][slug] || slug;
  const description = contentTypeDescriptionsByLang[lang][slug] || '';
  const icon = categoryIcons[slug] || '🕉';
  const palette = categoryPalettes[slug] || defaultPalette;
  const href = `/${slug}`;

  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1"
      style={{ background: palette.gradient, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
    >
      {/* Decorative wave pattern, bottom-left */}
      <svg
        aria-hidden="true"
        className="absolute -bottom-2 -left-2 opacity-40 pointer-events-none"
        width="140"
        height="70"
        viewBox="0 0 140 70"
      >
        <path
          d="M0 40 Q 20 20 40 40 T 80 40 T 120 40 T 160 40 V70 H0 Z"
          fill={palette.iconBg}
        />
      </svg>

      <div className="relative flex items-start gap-4">
        {/* Icon badge */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
          style={{ background: palette.iconBg, boxShadow: `0 0 0 6px ${palette.iconBg}55` }}
          aria-hidden="true"
        >
          {icon}
        </div>

        <div className="flex-1 min-w-0 pr-10">
          <div className="flex items-center gap-2 mb-1.5">
            <h3
              className="text-xl font-bold"
              style={{ fontFamily: 'var(--font-devanagari)', color: palette.text }}
            >
              {label}
            </h3>
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: '#FFFFFF', color: palette.accent }}
            >
              {count.toLocaleString(lang === 'hi' ? 'hi-IN' : 'en-IN')}
            </span>
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ fontFamily: 'var(--font-devanagari)', color: palette.text, opacity: 0.75 }}
          >
            {description}
          </p>
        </div>

        {/* Arrow button */}
        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-transform duration-200 group-hover:translate-x-1"
          style={{ width: '40px', height: '40px', background: palette.accent, color: '#FFFFFF' }}
          aria-hidden="true"
        >
          →
        </span>
      </div>
    </Link>
  );
}
