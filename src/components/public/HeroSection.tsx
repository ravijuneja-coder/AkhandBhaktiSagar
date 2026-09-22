'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n';

// Toggle this off once Ganesh Chaturthi ends to revert to the default hero.
const GANESH_CHATURTHI_MODE = true;

interface HeroSectionProps {
  bhajanAartiCount?: number;
  kathaCount?: number;
  deityCount?: number;
}

export default function HeroSection({ bhajanAartiCount = 0, kathaCount = 0, deityCount = 0 }: HeroSectionProps) {
  if (GANESH_CHATURTHI_MODE) {
    return <GaneshHero bhajanAartiCount={bhajanAartiCount} kathaCount={kathaCount} deityCount={deityCount} />;
  }
  return <DefaultHero />;
}

function DefaultHero() {
  const { t, lang } = useTranslation();

  const stats = [
    { num: lang === 'hi' ? '५०००+' : '5000+', label: t('hero', 'statBhajan') },
    { num: lang === 'hi' ? '५००+' : '500+', label: t('hero', 'statAarti') },
    { num: lang === 'hi' ? '१००+' : '100+', label: t('hero', 'statChalisa') },
    { num: lang === 'hi' ? '१०००+' : '1000+', label: t('hero', 'statMantra') },
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--header-darker) 0%, var(--header-bg-1) 35%, var(--deep-orange) 70%, var(--saffron) 100%)',
        minHeight: '560px',
      }}
    >
      {/* Mandala rings */}
      <svg
        aria-hidden="true"
        className="absolute -top-24 -right-24 opacity-[0.14]"
        width="440"
        height="440"
        viewBox="0 0 440 440"
      >
        <g fill="none" stroke="var(--header-gold)" strokeWidth="1">
          <circle cx="220" cy="220" r="210" />
          <circle cx="220" cy="220" r="175" />
          <circle cx="220" cy="220" r="140" strokeDasharray="4 6" />
        </g>
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          const rad = (angle * Math.PI) / 180;
          const x1 = 220 + 140 * Math.cos(rad);
          const y1 = 220 + 140 * Math.sin(rad);
          const x2 = 220 + 210 * Math.cos(rad);
          const y2 = 220 + 210 * Math.sin(rad);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--header-gold)" strokeWidth="1" />;
        })}
      </svg>

      <svg
        aria-hidden="true"
        className="absolute -bottom-28 -left-28 opacity-[0.10]"
        width="380"
        height="380"
        viewBox="0 0 380 380"
      >
        <g fill="none" stroke="var(--header-gold)" strokeWidth="1.5">
          <circle cx="190" cy="190" r="180" />
          <circle cx="190" cy="190" r="130" />
        </g>
      </svg>

      {/* Lotus pattern overlay (CSS only) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, var(--header-gold) 1px, transparent 1px),
                            radial-gradient(circle at 80% 20%, var(--header-gold) 1px, transparent 1px),
                            radial-gradient(circle at 50% 50%, var(--header-gold) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Temple arch silhouette at base */}
      <svg
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full"
        style={{ height: '90px', opacity: 0.5 }}
        viewBox="0 0 1200 90"
        preserveAspectRatio="none"
      >
        <path
          d="M0 90 L0 55 Q60 20 120 55 L120 90 Z
             M160 90 L160 40 Q220 5 280 40 L280 90 Z
             M320 90 L320 55 Q380 20 440 55 L440 90 Z
             M480 90 L480 25 Q600 -25 720 25 L720 90 Z
             M760 90 L760 55 Q820 20 880 55 L880 90 Z
             M920 90 L920 40 Q980 5 1040 40 L1040 90 Z
             M1080 90 L1080 55 Q1140 20 1200 55 L1200 90 Z"
          fill="var(--header-darker)"
        />
      </svg>

      {/* Floating diyas */}
      <div aria-hidden="true" className="absolute left-[8%] top-[26%] hidden sm:block" style={{ opacity: 0.85 }}>
        <DiyaIcon size={34} />
      </div>
      <div aria-hidden="true" className="absolute right-[10%] top-[42%] hidden sm:block" style={{ opacity: 0.7 }}>
        <DiyaIcon size={26} />
      </div>
      <div aria-hidden="true" className="absolute left-[14%] bottom-[16%] hidden lg:block" style={{ opacity: 0.55 }}>
        <DiyaIcon size={20} />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        {/* Medallion */}
        <div
          className="mx-auto mb-5 flex items-center justify-center rounded-full overflow-hidden"
          style={{
            width: '76px',
            height: '76px',
            background: 'radial-gradient(circle, rgba(212,175,55,0.25) 0%, rgba(212,175,55,0.05) 70%)',
            border: '2px solid rgba(255,215,0,0.5)',
            boxShadow: '0 0 24px rgba(255,215,0,0.3)',
          }}
        >
          <span style={{ fontSize: '2rem', color: 'var(--header-gold)', textShadow: '0 0 16px rgba(255,215,0,0.5)' }}>🕉</span>
        </div>

        {/* Sanskrit greeting */}
        <p
          className="text-base sm:text-lg mb-4 tracking-widest"
          style={{
            fontFamily: 'var(--font-devanagari)',
            color: 'var(--header-gold)',
            letterSpacing: '0.25em',
          }}
        >
          {t('hero', 'kicker')}
        </p>

        {/* Main heading */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
          style={{
            fontFamily: 'var(--font-devanagari)',
            color: '#FFFFFF',
            textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            textWrap: 'balance',
          }}
        >
          {t('hero', 'title')}
        </h1>

        {/* Subheading */}
        <p
          className="text-lg sm:text-xl mb-2 font-medium"
          style={{
            fontFamily: 'var(--font-devanagari)',
            color: '#FFD9A0',
            letterSpacing: '0.12em',
          }}
        >
          {t('hero', 'subheading')}
        </p>

        <p
          className="text-sm sm:text-base mb-10 max-w-xl mx-auto"
          style={{
            fontFamily: 'var(--font-devanagari)',
            color: 'rgba(255,220,176,0.75)',
            lineHeight: '1.8',
          }}
        >
          {t('hero', 'description')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/bhajan"
            className="px-8 py-3 rounded-lg font-bold text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            style={{
              fontFamily: 'var(--font-devanagari)',
              background: 'linear-gradient(135deg, var(--header-text), var(--header-gold))',
              color: 'var(--header-darker)',
              boxShadow: '0 4px 20px rgba(212,175,55,0.4)',
            }}
          >
            {t('hero', 'ctaBhajan')}
          </Link>
          <Link
            href="/aarti"
            className="px-8 py-3 rounded-lg font-bold text-base transition-all duration-200 hover:-translate-y-0.5"
            style={{
              fontFamily: 'var(--font-devanagari)',
              background: 'rgba(255,255,255,0.12)',
              color: '#FFFFFF',
              border: '2px solid rgba(255,255,255,0.4)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {t('hero', 'ctaToday')}
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center rounded-xl py-3 px-2 transition-transform duration-200 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,215,0,0.18)',
                backdropFilter: 'blur(6px)',
              }}
            >
              <div
                className="text-2xl sm:text-3xl font-bold"
                style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--header-gold)' }}
              >
                {stat.num}
              </div>
              <div
                className="text-xs sm:text-sm mt-1"
                style={{ fontFamily: 'var(--font-devanagari)', color: 'rgba(255,220,176,0.7)' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GaneshHero({ bhajanAartiCount, kathaCount, deityCount }: { bhajanAartiCount: number; kathaCount: number; deityCount: number }) {
  const { t, lang } = useTranslation();
  const fmt = (n: number) => n.toLocaleString(lang === 'hi' ? 'hi-IN' : 'en-IN');

  const stats = [
    { icon: '🙏', num: '1M+', label: t('ganeshChaturthi', 'heroStatDevotees') },
    { icon: '▶', num: fmt(bhajanAartiCount), label: t('ganeshChaturthi', 'heroStatBhajanAarti') },
    { icon: '📖', num: fmt(kathaCount), label: t('ganeshChaturthi', 'heroStatVratKatha') },
    { icon: '🪷', num: fmt(deityCount), label: t('ganeshChaturthi', 'heroStatDeities') },
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(115deg, #2B1608 0%, #4A2410 35%, #7A3D12 70%, #B5651D 100%)' }}
    >
      {/* Ambient gold glow, top-right */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-20 rounded-full pointer-events-none"
        style={{ width: '520px', height: '520px', background: 'radial-gradient(circle, rgba(255,215,120,0.18) 0%, transparent 70%)' }}
      />

      {/* Mandala rings, right */}
      <svg aria-hidden="true" className="absolute top-1/2 -translate-y-1/2 -right-24 opacity-[0.14] hidden lg:block pointer-events-none" width="420" height="420" viewBox="0 0 420 420">
        <g fill="none" stroke="var(--header-gold)" strokeWidth="1">
          <circle cx="210" cy="210" r="200" />
          <circle cx="210" cy="210" r="165" strokeDasharray="4 6" />
          <circle cx="210" cy="210" r="130" />
        </g>
      </svg>

      {/* Temple silhouette, bottom right */}
      <svg aria-hidden="true" className="absolute bottom-0 right-0 opacity-[0.16] hidden md:block pointer-events-none" width="260" height="120" viewBox="0 0 220 200" fill="none">
        <path d="M110 10 L130 40 H90 Z" fill="var(--header-gold)" />
        <rect x="98" y="38" width="24" height="18" fill="var(--header-gold)" />
        <path d="M60 70 L80 95 H40 Z" fill="var(--header-gold)" />
        <path d="M160 70 L180 95 H140 Z" fill="var(--header-gold)" />
        <rect x="70" y="90" width="80" height="30" fill="var(--header-gold)" />
        <rect x="30" y="90" width="20" height="30" fill="var(--header-gold)" />
        <rect x="170" y="90" width="20" height="30" fill="var(--header-gold)" />
        <rect x="10" y="118" width="200" height="82" fill="var(--header-gold)" />
      </svg>

      {/* Lotus dot pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, var(--header-gold) 1px, transparent 1px),
                            radial-gradient(circle at 80% 20%, var(--header-gold) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Background photo: Ganesh figure + temple scenery, left-anchored */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-[52%]" aria-hidden="true">
        <div
          className="absolute rounded-full"
          style={{
            left: '20%',
            top: '18%',
            width: '340px',
            height: '340px',
            background: 'radial-gradient(circle, rgba(255,200,90,0.35) 0%, transparent 70%)',
          }}
        />
        <Image
          src="/images/ganesh-figure-only.png"
          alt=""
          fill
          priority
          className="object-cover"
          style={{ objectPosition: '45% 25%' }}
          sizes="52vw"
        />
        {/* Fade into the right-side background so text stays readable */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, transparent 55%, #5C2A0E 98%)' }}
        />
      </div>

      {/* Diya flourish, bottom-left over photo */}
      <div aria-hidden="true" className="absolute left-4 bottom-3 text-3xl opacity-90 hidden lg:block" style={{ filter: 'drop-shadow(0 0 14px rgba(255,180,60,0.5))' }}>
        🪔
      </div>

      {/* Mobile/tablet photo: shown above the text, not as a background */}
      <div className="lg:hidden relative w-full" style={{ height: '260px' }}>
        <Image
          src="/images/ganesh-figure-only.png"
          alt={t('ganeshChaturthi', 'heroTitle')}
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center 20%' }}
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 60%, #5C2A0E 100%)' }} />
      </div>

      {/* Side kicker text over the photo */}
      <div
        className="hidden lg:block absolute left-[4%] top-[10%] text-center z-10"
        style={{ fontFamily: 'var(--font-devanagari)', color: '#FFFFFF', textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
      >
        <p className="text-base font-semibold leading-snug">{t('ganeshChaturthi', 'heroSideKicker1')}</p>
        <p className="text-base font-semibold leading-snug">{t('ganeshChaturthi', 'heroSideKicker2')}</p>
        <div className="mx-auto mt-2 w-8 h-px" style={{ background: '#FFFFFF', opacity: 0.7 }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Text content, right-aligned over the photo/background */}
        <div className="relative z-10 text-center lg:text-right lg:ml-auto lg:max-w-lg">
          {/* Top blessing line with lotus + divider */}
          <div className="flex items-center justify-center lg:justify-end gap-2 mb-2" aria-hidden="true">
            <span style={{ width: '24px', height: '1px', background: 'var(--header-gold)', opacity: 0.5 }} />
            <span style={{ fontSize: '0.85rem' }}>🪷</span>
            <span style={{ width: '24px', height: '1px', background: 'var(--header-gold)', opacity: 0.5 }} />
          </div>
          <p
            className="text-sm sm:text-base font-semibold mb-2"
            style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--header-gold)' }}
          >
            {t('ganeshChaturthi', 'heroTopBlessing')}
          </p>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-devanagari)', textWrap: 'balance', textShadow: '0 2px 20px rgba(0,0,0,0.35)' }}
          >
            <span style={{ color: '#FFFFFF' }}>{t('ganeshChaturthi', 'heroTitle').split(' ')[0]}</span>{' '}
            <span style={{ color: 'var(--header-gold)' }}>{t('ganeshChaturthi', 'heroTitle').split(' ').slice(1).join(' ')}</span>
          </h1>
          <p
            className="text-base sm:text-lg mb-5"
            style={{ fontFamily: 'var(--font-devanagari)', color: 'rgba(255,235,210,0.85)' }}
          >
            {t('ganeshChaturthi', 'heroTagline')}
          </p>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-end">
            <Link
              href="/bhajan"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm sm:text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
              style={{
                fontFamily: 'var(--font-devanagari)',
                background: 'linear-gradient(135deg, var(--header-text), var(--header-gold))',
                color: 'var(--header-darker)',
                boxShadow: '0 4px 20px rgba(212,175,55,0.4)',
              }}
            >
              🎧 {t('ganeshChaturthi', 'heroCtaPrimary')}
            </Link>
            <Link
              href="/katha"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm sm:text-base transition-all duration-200 hover:-translate-y-0.5"
              style={{
                fontFamily: 'var(--font-devanagari)',
                background: 'rgba(255,255,255,0.1)',
                color: '#FFFFFF',
                border: '2px solid rgba(255,215,120,0.6)',
                backdropFilter: 'blur(4px)',
              }}
            >
              📖 {t('ganeshChaturthi', 'heroCtaSecondary')}
            </Link>
          </div>
        </div>

        {/* Stat bar */}
        <div
          className="relative z-10 mt-8 rounded-2xl shadow-lg grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x"
          style={{ background: 'rgba(25,12,5,0.55)', border: '1px solid rgba(255,215,120,0.3)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255,215,120,0.25)' }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 px-5 py-4" style={{ borderColor: 'rgba(255,215,120,0.25)' }}>
              <span
                className="flex items-center justify-center rounded-full shrink-0"
                style={{ width: '36px', height: '36px', background: 'rgba(255,215,120,0.2)', fontSize: '1rem' }}
              >
                {stat.icon}
              </span>
              <div>
                <div className="text-base sm:text-lg font-bold" style={{ color: 'var(--header-gold)', textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
                  {stat.num}
                </div>
                <div
                  className="text-xs sm:text-sm"
                  style={{ fontFamily: 'var(--font-devanagari)', color: 'rgba(255,240,220,0.9)', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
                >
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DiyaIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 40 46" fill="none">
      {/* flame */}
      <path
        d="M20 4c-4 6-6 9-6 13a6 6 0 0 0 12 0c0-4-2-7-6-13z"
        fill="var(--header-gold)"
        opacity="0.9"
      />
      <path
        d="M20 12c-2 3-3 5-3 7a3 3 0 0 0 6 0c0-2-1-4-3-7z"
        fill="#FF6B00"
      />
      {/* diya bowl */}
      <path
        d="M4 26c0 8 7 14 16 14s16-6 16-14"
        stroke="var(--header-gold)"
        strokeWidth="2.5"
        fill="none"
      />
      <ellipse cx="20" cy="26" rx="16" ry="4" fill="var(--header-gold)" opacity="0.85" />
    </svg>
  );
}
