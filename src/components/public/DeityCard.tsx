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

export default function DeityCard({ deity }: DeityCardProps) {
  const postCount = deity._count?.posts ?? 0;
  const { t, lang } = useTranslation();
  const primaryName = lang === 'en' ? deity.name : (deity.nameHindi || deity.name);
  const secondaryName = lang === 'en' ? deity.nameHindi : deity.name;

  return (
    <Link
      href={`/deity/${deity.slug}`}
      className="group flex flex-col items-center text-center p-4 rounded-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
      style={{
        background: 'white',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Image */}
      <div
        className="relative w-20 h-20 rounded-full overflow-hidden mb-3 ring-2 ring-offset-2 transition-all duration-200 group-hover:ring-4"
        style={{ '--tw-ring-color': 'var(--gold)' } as React.CSSProperties}
      >
        {deity.image ? (
          <Image
            src={deity.image}
            alt={deity.nameHindi || deity.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="80px"
          />
        ) : (
          <DeitySymbol slug={deity.slug} />
        )}
      </div>

      {/* Name */}
      <h3
        className="text-base font-bold mb-0.5 leading-tight"
        style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--maroon)' }}
      >
        {primaryName}
      </h3>
      {secondaryName && secondaryName !== primaryName && (
        <p className="text-xs mb-2" style={{ color: 'var(--color-text-muted)' }}>
          {secondaryName}
        </p>
      )}

      {/* Count */}
      {postCount > 0 && (
        <span
          className="text-xs px-2.5 py-1 rounded-full font-medium"
          style={{
            background: 'rgba(255,107,0,0.1)',
            color: 'var(--deep-orange)',
            border: '1px solid rgba(255,107,0,0.2)',
            fontFamily: 'var(--font-devanagari)',
          }}
        >
          {postCount} {t('deityCard', 'compositions')}
        </span>
      )}
    </Link>
  );
}
