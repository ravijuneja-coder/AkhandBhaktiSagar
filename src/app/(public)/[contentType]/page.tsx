import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PostCard from '@/components/public/PostCard';
import Pagination from '@/components/public/Pagination';
import FestivalCalendar2026 from '@/components/public/FestivalCalendar2026';
import { getPostsByContentType } from '@/lib/queries';
import { contentTypeLabels, contentTypeDescriptions } from '@/lib/types';
import {
  CategoryPageTitle,
  CategoryPageDescription,
  CategoryPageCountBadge,
  CategoryPageEmptyState,
} from '@/components/public/CategoryPageHeading';

const validContentTypes = ['bhajan', 'aarti', 'chalisa', 'mantra', 'stotra', 'article', 'festival', 'katha', 'bhakti-geet'];

const categoryIcons: Record<string, string> = {
  bhajan: '🎵',
  aarti: '🪔',
  chalisa: '📿',
  mantra: '🔔',
  stotra: '📖',
  article: '✍️',
  festival: '🎊',
  katha: '📜',
  'bhakti-geet': '🎶',
};

interface Props {
  params: { contentType: string };
  searchParams: { page?: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { contentType } = params;
  if (!validContentTypes.includes(contentType)) return { title: 'Not Found' };

  const label = contentTypeLabels[contentType] || contentType;
  const description = contentTypeDescriptions[contentType] || '';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://akhandbhaktisagar.com';

  return {
    title: `${label} संग्रह`,
    description: `${label} - ${description}। अखंड भक्ति सागर पर ${label} का विशाल संग्रह पढ़ें।`,
    alternates: { canonical: `${siteUrl}/${contentType}` },
    openGraph: {
      title: `${label} संग्रह | अखंड भक्ति सागर`,
      description,
      url: `${siteUrl}/${contentType}`,
    },
  };
}

export const revalidate = 3600;

export default async function ContentTypePage({ params, searchParams }: Props) {
  const { contentType } = params;
  if (!validContentTypes.includes(contentType)) notFound();

  const page = Math.max(1, parseInt(searchParams.page || '1', 10));
  const { posts, total, pages } = await getPostsByContentType(contentType, page, 12);

  const icon = categoryIcons[contentType] || '🕉';

  return (
    <div style={{ background: 'var(--color-bg-primary)', minHeight: '80vh' }}>
      {/* Category header */}
      <div
        className="relative overflow-hidden py-6 sm:py-7 px-4 sm:px-6 lg:px-8"
        style={{ background: 'linear-gradient(115deg, #0A1628 0%, #0F2540 40%, #163A5C 75%, #1B4A6E 100%)' }}
      >
        {/* Ambient glow, top-right */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-16 rounded-full"
          style={{ width: '320px', height: '320px', background: 'radial-gradient(circle, rgba(255,215,120,0.10) 0%, transparent 70%)' }}
        />

        {/* Mandala ring, right */}
        <svg aria-hidden="true" className="absolute top-1/2 -translate-y-1/2 -right-16 opacity-[0.12] hidden md:block" width="220" height="220" viewBox="0 0 220 220">
          <g fill="none" stroke="var(--header-gold)" strokeWidth="1">
            <circle cx="110" cy="110" r="100" />
            <circle cx="110" cy="110" r="80" strokeDasharray="4 6" />
          </g>
        </svg>

        {/* Temple silhouette, far right */}
        <svg aria-hidden="true" className="absolute bottom-0 right-0 opacity-[0.14] hidden lg:block" width="150" height="80" viewBox="0 0 220 200" fill="none">
          <path d="M110 10 L130 40 H90 Z" fill="var(--header-gold)" />
          <rect x="98" y="38" width="24" height="18" fill="var(--header-gold)" />
          <path d="M60 70 L80 95 H40 Z" fill="var(--header-gold)" />
          <path d="M160 70 L180 95 H140 Z" fill="var(--header-gold)" />
          <rect x="70" y="90" width="80" height="30" fill="var(--header-gold)" />
          <rect x="30" y="90" width="20" height="30" fill="var(--header-gold)" />
          <rect x="170" y="90" width="20" height="30" fill="var(--header-gold)" />
          <rect x="10" y="118" width="200" height="82" fill="var(--header-gold)" />
        </svg>

        {/* Diya flourish, left */}
        <div aria-hidden="true" className="absolute left-3 sm:left-6 bottom-2 text-2xl sm:text-3xl opacity-80 hidden sm:block" style={{ filter: 'drop-shadow(0 0 12px rgba(255,180,60,0.45))' }}>
          🪔
        </div>

        {/* Lotus dot pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, var(--header-gold) 1px, transparent 1px),
                              radial-gradient(circle at 80% 20%, var(--header-gold) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        <div className="relative max-w-5xl mx-auto flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-5 text-center sm:text-left">
          {/* Icon medallion */}
          <div
            className="flex items-center justify-center rounded-full shrink-0"
            style={{
              width: '52px',
              height: '52px',
              background: 'radial-gradient(circle, rgba(255,215,120,0.22) 0%, rgba(255,215,120,0.04) 70%)',
              border: '2px solid rgba(255,215,120,0.55)',
              boxShadow: '0 0 18px rgba(255,200,80,0.3)',
            }}
          >
            <span className="text-2xl" aria-hidden="true">{icon}</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline justify-center sm:justify-start gap-x-3 gap-y-0.5">
              <h1
                className="text-xl sm:text-2xl font-bold"
                style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--header-gold)', textShadow: '0 2px 14px rgba(0,0,0,0.4)' }}
              >
                <CategoryPageTitle slug={contentType} />
              </h1>
              <span aria-hidden="true" style={{ color: 'var(--header-gold)', opacity: 0.5, fontSize: '0.85rem' }}>🕉</span>
              <p
                className="text-xs sm:text-sm"
                style={{ fontFamily: 'var(--font-devanagari)', color: 'rgba(255,255,255,0.75)' }}
              >
                <CategoryPageDescription slug={contentType} />
              </p>
            </div>
          </div>

          {total > 0 && (
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold shrink-0"
              style={{
                fontFamily: 'var(--font-devanagari)',
                background: 'rgba(255,215,120,0.08)',
                border: '1.5px solid rgba(255,215,120,0.55)',
                color: 'var(--header-gold)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              }}
            >
              <span aria-hidden="true">🎵</span>
              <CategoryPageCountBadge slug={contentType} total={total} />
            </span>
          )}
        </div>
      </div>

      {contentType === 'festival' && <FestivalCalendar2026 />}

      {/* Posts grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            <Pagination
              currentPage={page}
              totalPages={pages}
              baseUrl={`/${contentType}`}
            />
          </>
        ) : contentType !== 'festival' ? (
          <div className="py-24 text-center">
            <div className="text-5xl mb-4">{icon}</div>
            <CategoryPageEmptyState slug={contentType} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
