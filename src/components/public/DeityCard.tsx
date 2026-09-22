'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n';
import DeitySymbol from './DeitySymbol';

interface Deity {
  id: string;
  name: string;
  nameHindi: string | null;
  slug: string;
  image?: string | null;
  _count?: { posts: number };
}

interface DeityCardProps {
  deity: Deity;
}

// Warm gradient badges for the deity name pill, cycling per card so the
// row reads as varied and lively rather than one repeated color.
const badgeGradients = [
  'linear-gradient(135deg, #7B1B1B, #4A0F0F)',
  'linear-gradient(135deg, #B8860B, #7B5A00)',
  'linear-gradient(135deg, #8B1E3F, #5A1029)',
  'linear-gradient(135deg, #9A3412, #6B230A)',
  'linear-gradient(135deg, #7B1B1B, #B8860B)',
  'linear-gradient(135deg, #6B2C91, #431A5C)',
  'linear-gradient(135deg, #8B1E3F, #B8860B)',
  'linear-gradient(135deg, #9A3412, #7B1B1B)',
];

function hashIndex(slug: string, length: number) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  return hash % length;
}

export default function DeityCard({ deity }: DeityCardProps) {
  const postCount = deity._count?.posts ?? 0;
  const { t, lang } = useTranslation();
  const primaryName = lang === 'en' ? deity.name : (deity.nameHindi || deity.name);
  const secondaryName = lang === 'en' ? deity.nameHindi : deity.name;
  const badge = badgeGradients[hashIndex(deity.slug, badgeGradients.length)];

  return (
    <Link
      href={`/deity/${deity.slug}`}
      className="group flex flex-col text-center rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1.5"
      style={{
        background: 'var(--color-surface-card)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Portrait image */}
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        {deity.image ? (
          <Image
            src={deity.image}
            alt={deity.nameHindi || deity.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 12vw, 45vw"
          />
        ) : (
          <DeitySymbol slug={deity.slug} />
        )}
        <div
          className="absolute inset-x-0 bottom-0 h-10"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.15))' }}
        />
      </div>

      {/* Name badge, overlapping the image */}
      <div className="relative flex justify-center" style={{ marginTop: '-18px' }}>
        <span
          className="inline-block px-4 py-1.5 rounded-full text-sm font-bold shadow-md"
          style={{ fontFamily: 'var(--font-devanagari)', color: '#FFF3D6', background: badge }}
        >
          {primaryName}
        </span>
      </div>

      <div className="px-3 pt-1.5 pb-4 flex flex-col items-center">
        {secondaryName && secondaryName !== primaryName && (
          <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
            {secondaryName}
          </p>
        )}

        {/* Count */}
        {postCount > 0 && (
          <span
            className="mt-2 text-xs px-3 py-1 rounded-full font-medium inline-flex items-center gap-1"
            style={{
              background: 'rgba(212,175,55,0.12)',
              color: '#8B6A00',
              border: '1px solid rgba(212,175,55,0.3)',
              fontFamily: 'var(--font-devanagari)',
            }}
          >
            📜 {postCount} {t('deityCard', 'compositions')}
          </span>
        )}
      </div>
    </Link>
  );
}
