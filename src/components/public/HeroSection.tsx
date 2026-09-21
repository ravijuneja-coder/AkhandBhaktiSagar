'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n';
import DeitySymbol from './DeitySymbol';

// Toggle this off once Ganesh Chaturthi ends to revert to the default hero.
const GANESH_CHATURTHI_MODE = true;

export default function HeroSection() {
  const { t, lang } = useTranslation();

  const defaultStats = [
    { num: lang === 'hi' ? '५०००+' : '5000+', label: t('hero', 'statBhajan') },
    { num: lang === 'hi' ? '५००+' : '500+', label: t('hero', 'statAarti') },
    { num: lang === 'hi' ? '१००+' : '100+', label: t('hero', 'statChalisa') },
    { num: lang === 'hi' ? '१०००+' : '1000+', label: t('hero', 'statMantra') },
  ];

  const ganeshStats = [
    { num: lang === 'hi' ? '२१' : '21', label: t('ganeshChaturthi', 'heroStatModak') },
    { num: lang === 'hi' ? '११' : '11', label: t('ganeshChaturthi', 'heroStatDays') },
    { num: lang === 'hi' ? '५००+' : '500+', label: t('ganeshChaturthi', 'heroStatAarti') },
    { num: lang === 'hi' ? '४०' : '40', label: t('ganeshChaturthi', 'heroStatChalisa') },
  ];

  const isGanesh = GANESH_CHATURTHI_MODE;
  const stats = isGanesh ? ganeshStats : defaultStats;

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: isGanesh
          ? 'linear-gradient(135deg, #4A0F0F 0%, #B34700 40%, #E85D04 75%, #FF8C00 100%)'
          : 'linear-gradient(135deg, #2D0A0A 0%, #7B1B1B 35%, #E85D04 70%, #FF6B00 100%)',
        minHeight: '560px',
      }}
    >
      {/* Background photo (Ganesh Chaturthi) */}
      {isGanesh && (
        <>
          <Image
            src="/images/ganesh-hero.png"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Dark overlay for text readability */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(30,8,6,0.65) 0%, rgba(40,10,6,0.55) 45%, rgba(30,8,6,0.75) 100%)',
            }}
          />
        </>
      )}

      {/* Mandala rings */}
      <svg
        aria-hidden="true"
        className="absolute -top-24 -right-24 opacity-[0.14]"
        width="440"
        height="440"
        viewBox="0 0 440 440"
      >
        <g fill="none" stroke="#FFD700" strokeWidth="1">
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
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FFD700" strokeWidth="1" />;
        })}
      </svg>

      <svg
        aria-hidden="true"
        className="absolute -bottom-28 -left-28 opacity-[0.10]"
        width="380"
        height="380"
        viewBox="0 0 380 380"
      >
        <g fill="none" stroke="#D4AF37" strokeWidth="1.5">
          <circle cx="190" cy="190" r="180" />
          <circle cx="190" cy="190" r="130" />
        </g>
      </svg>

      {/* Lotus pattern overlay (CSS only) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, #FFD700 1px, transparent 1px),
                            radial-gradient(circle at 80% 20%, #FFD700 1px, transparent 1px),
                            radial-gradient(circle at 50% 50%, #FFD700 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Toran / garland strip for Ganesh Chaturthi */}
      {isGanesh && (
        <svg
          aria-hidden="true"
          className="absolute top-0 left-0 w-full"
          style={{ height: '38px', opacity: 0.9 }}
          viewBox="0 0 1200 38"
          preserveAspectRatio="none"
        >
          {Array.from({ length: 24 }).map((_, i) => {
            const x = i * 50 + 25;
            return (
              <g key={i}>
                <path d={`M${x - 25} 0 Q${x} 30 ${x + 25} 0`} fill="none" stroke="#2D6A2E" strokeWidth="2" opacity="0.6" />
                <circle cx={x} cy="18" r="5" fill="#FF6B00" />
                <path d={`M${x} 13 L${x - 4} 6 L${x + 4} 6 Z`} fill="#2D6A2E" />
              </g>
            );
          })}
        </svg>
      )}

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
          fill={isGanesh ? '#4A0F0F' : '#2D0A0A'}
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

      {/* Floating modaks for Ganesh Chaturthi */}
      {isGanesh && (
        <>
          <div aria-hidden="true" className="absolute right-[7%] top-[20%] hidden sm:block" style={{ opacity: 0.8 }}>
            <ModakIcon size={30} />
          </div>
          <div aria-hidden="true" className="absolute left-[10%] bottom-[28%] hidden lg:block" style={{ opacity: 0.6 }}>
            <ModakIcon size={22} />
          </div>
        </>
      )}

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        {/* Medallion */}
        <div
          className="mx-auto mb-5 flex items-center justify-center rounded-full overflow-hidden"
          style={{
            width: '76px',
            height: '76px',
            background: isGanesh
              ? 'none'
              : 'radial-gradient(circle, rgba(212,175,55,0.25) 0%, rgba(212,175,55,0.05) 70%)',
            border: '2px solid rgba(255,215,0,0.5)',
            boxShadow: '0 0 24px rgba(255,215,0,0.3)',
          }}
        >
          {isGanesh ? (
            <DeitySymbol slug="ganesh-ji" />
          ) : (
            <span style={{ fontSize: '2rem', color: '#FFD700', textShadow: '0 0 16px rgba(255,215,0,0.5)' }}>🕉</span>
          )}
        </div>

        {/* Sanskrit greeting */}
        <p
          className="text-base sm:text-lg mb-4 tracking-widest"
          style={{
            fontFamily: 'var(--font-devanagari)',
            color: '#D4AF37',
            letterSpacing: '0.25em',
          }}
        >
          {isGanesh ? t('ganeshChaturthi', 'heroKicker') : t('hero', 'kicker')}
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
          {isGanesh ? t('ganeshChaturthi', 'heroTitle') : t('hero', 'title')}
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
          {isGanesh ? t('ganeshChaturthi', 'heroSubheading') : t('hero', 'subheading')}
        </p>

        <p
          className="text-sm sm:text-base mb-10 max-w-xl mx-auto"
          style={{
            fontFamily: 'var(--font-devanagari)',
            color: 'rgba(255,220,176,0.75)',
            lineHeight: '1.8',
          }}
        >
          {isGanesh ? t('ganeshChaturthi', 'heroDescription') : t('hero', 'description')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href={isGanesh ? '/deity/ganesh-ji' : '/bhajan'}
            className="px-8 py-3 rounded-lg font-bold text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            style={{
              fontFamily: 'var(--font-devanagari)',
              background: 'linear-gradient(135deg, #FFE9A8, #D4AF37)',
              color: '#2D0A0A',
              boxShadow: '0 4px 20px rgba(212,175,55,0.4)',
            }}
          >
            {isGanesh ? t('ganeshChaturthi', 'heroCtaPrimary') : t('hero', 'ctaBhajan')}
          </Link>
          <Link
            href={isGanesh ? '/chalisa' : '/aarti'}
            className="px-8 py-3 rounded-lg font-bold text-base transition-all duration-200 hover:-translate-y-0.5"
            style={{
              fontFamily: 'var(--font-devanagari)',
              background: 'rgba(255,255,255,0.12)',
              color: '#FFFFFF',
              border: '2px solid rgba(255,255,255,0.4)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {isGanesh ? t('ganeshChaturthi', 'heroCtaSecondary') : t('hero', 'ctaToday')}
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
                style={{ fontFamily: 'var(--font-devanagari)', color: '#FFD700' }}
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

function DiyaIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 40 46" fill="none">
      {/* flame */}
      <path
        d="M20 4c-4 6-6 9-6 13a6 6 0 0 0 12 0c0-4-2-7-6-13z"
        fill="#FFD700"
        opacity="0.9"
      />
      <path
        d="M20 12c-2 3-3 5-3 7a3 3 0 0 0 6 0c0-2-1-4-3-7z"
        fill="#FF6B00"
      />
      {/* diya bowl */}
      <path
        d="M4 26c0 8 7 14 16 14s16-6 16-14"
        stroke="#D4AF37"
        strokeWidth="2.5"
        fill="none"
      />
      <ellipse cx="20" cy="26" rx="16" ry="4" fill="#D4AF37" opacity="0.85" />
    </svg>
  );
}

function ModakIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 40 44" fill="none">
      <path
        d="M20 6c-11 0-18 8-18 19s7 17 18 17 18-6 18-17S31 6 20 6z"
        fill="#FFD700"
        opacity="0.92"
      />
      <path d="M9 13q11 -10 22 0" stroke="#B34700" strokeWidth="2.5" fill="none" />
      <circle cx="20" cy="27" r="3" fill="#B34700" opacity="0.7" />
    </svg>
  );
}
