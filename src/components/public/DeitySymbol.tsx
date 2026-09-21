interface DeitySymbolProps {
  slug?: string | null;
  className?: string;
}

const gradients: Record<string, [string, string]> = {
  'hanuman-ji': ['#B34700', '#FF6B00'],
  'shiva-ji': ['#1B3A5C', '#4A90A4'],
  'shri-krishna': ['#1E3A6E', '#3B6FC4'],
  'shri-ram': ['#7B1B1B', '#D97706'],
  'mata-rani': ['#7B1B1B', '#E8114B'],
  'ganesh-ji': ['#7B1B1B', '#E85D04'],
  'sai-baba': ['#4A3220', '#B87333'],
  'radha-rani': ['#7B1B1B', '#DB2777'],
  'vishnu-ji': ['#1E3A6E', '#4F7CD4'],
  'durga-maa': ['#7B1B1B', '#DC2626'],
};

const defaultGradient: [string, string] = ['#7B1B1B', '#E85D04'];

export default function DeitySymbol({ slug, className }: DeitySymbolProps) {
  const [from, to] = (slug && gradients[slug]) || defaultGradient;
  const gradId = `dg-${slug || 'default'}`;

  return (
    <svg
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill={`url(#${gradId})`} />
      {/* subtle radial glow */}
      <circle cx="100" cy="90" r="85" fill="rgba(255,215,0,0.08)" />
      <g fill="none" stroke="#FFD700" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
        {renderMotif(slug)}
      </g>
    </svg>
  );
}

function renderMotif(slug?: string | null) {
  switch (slug) {
    case 'hanuman-ji':
      // Gada (mace)
      return (
        <>
          <circle cx="100" cy="65" r="26" fill="#FFD700" stroke="none" />
          <circle cx="100" cy="65" r="26" fill="none" stroke="#B34700" strokeWidth="2" />
          <line x1="100" y1="91" x2="100" y2="150" strokeWidth="7" />
          <path d="M78 150 h44" strokeWidth="7" />
        </>
      );
    case 'shiva-ji':
      // Trishul (trident) with crescent moon and Om-like center
      return (
        <>
          <line x1="100" y1="45" x2="100" y2="155" strokeWidth="6" />
          <path d="M100 45 L78 20" strokeWidth="5" />
          <path d="M100 45 L122 20" strokeWidth="5" />
          <path d="M100 45 L100 15" strokeWidth="5" />
          <path d="M70 150 h60" strokeWidth="6" />
          <path d="M60 65 a20 20 0 1 0 30 -25" strokeWidth="4" fill="none" />
        </>
      );
    case 'shri-krishna':
      // Flute (bansuri) with a peacock feather
      return (
        <>
          <line x1="55" y1="130" x2="150" y2="75" strokeWidth="8" />
          <circle cx="75" cy="119" r="2.5" fill="#FFD700" stroke="none" />
          <circle cx="90" cy="110" r="2.5" fill="#FFD700" stroke="none" />
          <circle cx="105" cy="102" r="2.5" fill="#FFD700" stroke="none" />
          <circle cx="120" cy="93" r="2.5" fill="#FFD700" stroke="none" />
          <path d="M130 55 q10 20 -5 35 q15 -5 20 -25 q-10 -15 -15 -10z" strokeWidth="3" />
        </>
      );
    case 'shri-ram':
      // Bow and arrow (dhanush-baan)
      return (
        <>
          <path d="M75 40 Q55 100 75 160" strokeWidth="5" />
          <line x1="75" y1="40" x2="75" y2="160" strokeWidth="1.5" opacity="0.7" />
          <line x1="75" y1="100" x2="150" y2="100" strokeWidth="5" />
          <path d="M150 100 l-16 -8 M150 100 l-16 8" strokeWidth="5" />
        </>
      );
    case 'mata-rani':
    case 'durga-maa':
      // Trishul + Kalash (divine mother symbolism)
      return (
        <>
          <path d="M80 150 q20 -12 40 0 l-4 -55 h-32 z" strokeWidth="4" />
          <path d="M76 95 h48" strokeWidth="4" />
          <path d="M100 95 v-45" strokeWidth="4" />
          <path d="M100 50 l-16 -18" strokeWidth="4" />
          <path d="M100 50 l16 -18" strokeWidth="4" />
        </>
      );
    case 'ganesh-ji':
      // Modak (sweet) with two dots (mouse/vahan hint) — simplified laddu shape
      return (
        <>
          <path d="M100 55 c-22 0 -36 16 -36 38 c0 24 18 42 36 42 c18 0 36 -18 36 -42 c0 -22 -14 -38 -36 -38z" strokeWidth="4" />
          <path d="M84 60 q16 -18 32 0" strokeWidth="4" />
          <circle cx="100" cy="98" r="3" fill="#FFD700" stroke="none" />
        </>
      );
    case 'sai-baba':
      // Dhuni flame (sacred fire) symbolism
      return (
        <>
          <path d="M100 40 c-14 22 -22 34 -22 52 a22 22 0 0 0 44 0 c0 -18 -8 -30 -22 -52z" strokeWidth="4" />
          <path d="M100 70 c-8 12 -12 18 -12 28 a12 12 0 0 0 24 0 c0 -10 -4 -16 -12 -28z" strokeWidth="3" />
          <line x1="60" y1="155" x2="140" y2="155" strokeWidth="5" />
        </>
      );
    case 'radha-rani':
      // Lotus flower
      return (
        <>
          <path d="M100 145 v-45" strokeWidth="4" />
          <path d="M100 100 c-25 -10 -35 -35 -20 -55 c15 20 15 40 20 55z" strokeWidth="3.5" />
          <path d="M100 100 c25 -10 35 -35 20 -55 c-15 20 -15 40 -20 55z" strokeWidth="3.5" />
          <path d="M100 100 c-15 -25 -5 -50 0 -60 c5 10 15 35 0 60z" strokeWidth="3.5" />
        </>
      );
    case 'vishnu-ji':
      // Sudarshan Chakra (discus)
      return (
        <>
          <circle cx="100" cy="95" r="38" strokeWidth="4" />
          <circle cx="100" cy="95" r="8" fill="#FFD700" stroke="none" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 100 + 38 * Math.cos(rad);
            const y1 = 95 + 38 * Math.sin(rad);
            const x2 = 100 + 48 * Math.cos(rad);
            const y2 = 95 + 48 * Math.sin(rad);
            return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="3" />;
          })}
        </>
      );
    default:
      // Om symbol fallback (generic devotional)
      return (
        <>
          <circle cx="100" cy="95" r="45" strokeWidth="3" opacity="0.6" />
          <text
            x="100"
            y="115"
            textAnchor="middle"
            fontSize="70"
            fill="#FFD700"
            stroke="none"
            fontFamily="var(--font-devanagari), serif"
          >
            🕉
          </text>
        </>
      );
  }
}
