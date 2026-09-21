'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import DeitySymbol from './DeitySymbol';

export default function GaneshChaturthiBanner() {
  const { t } = useTranslation();

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(120deg, var(--header-bg-1) 0%, var(--deep-orange) 55%, var(--saffron) 100%)' }}
    >
      {/* Decorative dots */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(circle at 15% 30%, var(--header-gold) 1.5px, transparent 1.5px),
                            radial-gradient(circle at 85% 70%, var(--header-gold) 1.5px, transparent 1.5px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        {/* Ganesh symbol medallion */}
        <div
          className="flex-shrink-0 rounded-full overflow-hidden"
          style={{
            width: '64px',
            height: '64px',
            border: '2px solid rgba(255,215,0,0.5)',
            boxShadow: '0 0 20px rgba(255,215,0,0.25)',
          }}
        >
          <DeitySymbol slug="ganesh-ji" />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <span
            className="inline-block mb-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider"
            style={{
              fontFamily: 'var(--font-devanagari)',
              background: 'rgba(255,215,0,0.18)',
              color: 'var(--header-gold)',
              border: '1px solid rgba(255,215,0,0.35)',
            }}
          >
            {t('ganeshChaturthi', 'badge')}
          </span>
          <h2
            className="text-lg sm:text-xl font-bold leading-snug"
            style={{ fontFamily: 'var(--font-devanagari)', color: '#FFFFFF', textShadow: '0 1px 8px rgba(0,0,0,0.25)' }}
          >
            🙏 {t('ganeshChaturthi', 'heading')}
          </h2>
          <p
            className="text-sm mt-1 max-w-xl"
            style={{ fontFamily: 'var(--font-devanagari)', color: 'rgba(255,235,205,0.9)' }}
          >
            {t('ganeshChaturthi', 'subtext')}
          </p>
        </div>

        <Link
          href="/deity/ganesh-ji"
          className="flex-shrink-0 px-5 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
          style={{
            fontFamily: 'var(--font-devanagari)',
            background: 'linear-gradient(135deg, var(--header-text), var(--header-gold))',
            color: 'var(--header-darker)',
            boxShadow: '0 4px 16px rgba(212,175,55,0.4)',
          }}
        >
          {t('ganeshChaturthi', 'cta')}
        </Link>
      </div>
    </section>
  );
}
