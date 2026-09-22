import Link from 'next/link';
import HeroSection from '@/components/public/HeroSection';
import PostCard from '@/components/public/PostCard';
import CategoryCard from '@/components/public/CategoryCard';
import DeityCard from '@/components/public/DeityCard';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import SectionHeading from '@/components/public/SectionHeading';
import {
  getFeaturedPosts,
  getLatestPosts,
  getAllCategories,
  getAllDeities,
} from '@/lib/queries';

export const revalidate = 3600; // ISR: revalidate every hour

export default async function HomePage() {
  const [featured, latest, categories, deities] = await Promise.all([
    getFeaturedPosts(6),
    getLatestPosts(8),
    getAllCategories(),
    getAllDeities(),
  ]);

  const topDeities = deities.slice(0, 8);
  const nonEmptyCategories = categories.filter((c) => c.count > 0);

  const bhajanAartiCount =
    (categories.find((c) => c.contentType === 'BHAJAN')?.count ?? 0) +
    (categories.find((c) => c.contentType === 'AARTI')?.count ?? 0);
  const kathaCount = categories.find((c) => c.contentType === 'KATHA')?.count ?? 0;
  const deityCount = deities.length;

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <HeroSection
          bhajanAartiCount={bhajanAartiCount}
          kathaCount={kathaCount}
          deityCount={deityCount}
        />

        {/* Categories */}
        {nonEmptyCategories.length > 0 && (
          <section
            className="relative overflow-hidden py-14 px-4 sm:px-6 lg:px-8"
            style={{ background: 'linear-gradient(180deg, #EEF7F3, #E6F3ED)' }}
          >
            <div className="relative max-w-7xl mx-auto">
              <div className="mb-8">
                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline-block w-1.5 h-8 rounded-full" style={{ background: 'linear-gradient(180deg, #0F766E, #D4AF37)' }} aria-hidden="true" />
                  <h2
                    className="text-3xl sm:text-4xl font-bold"
                    style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--maroon)', lineHeight: 1.4, paddingTop: '0.15em' }}
                  >
                    <SectionHeading tKey="categoriesHeading" />
                  </h2>
                </div>
                <p
                  className="mt-2 text-sm sm:text-base"
                  style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}
                >
                  <SectionHeading tKey="categoriesSubheading" />
                </p>
              </div>

              <div className="flex gap-5 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
                {nonEmptyCategories.map((cat) =>
                  nonEmptyCategories.length <= 3 ? (
                    <div key={cat.contentType} className="shrink-0" style={{ flex: '1 1 0%', minWidth: '280px' }}>
                      <CategoryCard contentType={cat.contentType} count={cat.count} />
                    </div>
                  ) : (
                    <div key={cat.contentType} className="shrink-0" style={{ width: '340px' }}>
                      <CategoryCard contentType={cat.contentType} count={cat.count} />
                    </div>
                  )
                )}
              </div>

              {/* Footer divider + note */}
              <div className="flex items-center justify-center gap-3 mt-10" aria-hidden="true">
                <span style={{ width: '60px', height: '1px', background: 'var(--gold)', opacity: 0.5 }} />
                <span style={{ color: 'var(--gold)' }}>🪷</span>
                <span style={{ width: '60px', height: '1px', background: 'var(--gold)', opacity: 0.5 }} />
              </div>
              <p
                className="text-center text-sm mt-3"
                style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--color-text-secondary)' }}
              >
                <SectionHeading tKey="categoriesFooterNote" />
              </p>
            </div>
          </section>
        )}

        {/* Om divider */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="om-divider my-2">ॐ</div>
        </div>

        {/* Featured Posts */}
        {featured.length > 0 && (
          <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-6">
              <h2 className="section-title text-xl sm:text-2xl"><SectionHeading tKey="popularBhajans" /></h2>
              <Link
                href="/bhajan"
                className="text-sm font-medium transition-colors hover:text-orange-600"
                style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--deep-orange)' }}
              >
                <SectionHeading tKey="viewAll" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Deities */}
        {topDeities.length > 0 && (
          <section
            className="relative overflow-hidden py-14 px-4 sm:px-6 lg:px-8"
            style={{ background: 'linear-gradient(180deg, #FFF8EA, #FDF3E0)' }}
          >
            {/* Hanging bells, left and right */}
            <div className="hidden md:block absolute left-6 top-0 text-4xl opacity-70" aria-hidden="true">🔔</div>
            <div className="hidden md:block absolute right-6 top-0 text-4xl opacity-70" aria-hidden="true">🔔</div>

            <div className="relative max-w-7xl mx-auto">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block w-1.5 h-8 rounded-full" style={{ background: 'var(--gradient-hero)' }} aria-hidden="true" />
                    <h2
                      className="text-3xl sm:text-4xl font-bold"
                      style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--maroon)' }}
                    >
                      <SectionHeading tKey="deitiesHeading" />
                    </h2>
                  </div>
                  <p
                    className="mt-1.5 text-sm"
                    style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--gold)' }}
                  >
                    <SectionHeading tKey="deitiesSubheading" />
                  </p>
                </div>

                <p
                  className="text-sm hidden lg:block"
                  style={{ fontFamily: 'var(--font-devanagari)', color: '#3F7D4A' }}
                >
                  <SectionHeading tKey="deitiesTagline" />
                </p>

                <Link
                  href="/deity"
                  className="shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  style={{ fontFamily: 'var(--font-devanagari)', background: 'var(--gradient-hero)', boxShadow: 'var(--shadow-card-hover)' }}
                >
                  <SectionHeading tKey="viewAll" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mt-8">
                {topDeities.map((deity) => (
                  <DeityCard key={deity.id} deity={deity} />
                ))}
              </div>

              {/* Footer divider + note */}
              <div className="flex items-center justify-center gap-3 mt-10" aria-hidden="true">
                <span style={{ width: '60px', height: '1px', background: 'var(--gold)', opacity: 0.5 }} />
                <span style={{ color: 'var(--gold)' }}>🪷</span>
                <span style={{ width: '60px', height: '1px', background: 'var(--gold)', opacity: 0.5 }} />
              </div>
              <p
                className="text-center text-sm mt-3"
                style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--gold)' }}
              >
                <SectionHeading tKey="deitiesFooterNote" />
              </p>
            </div>
          </section>
        )}

        {/* Latest Posts */}
        {latest.length > 0 && (
          <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-6">
              <h2 className="section-title text-xl sm:text-2xl"><SectionHeading tKey="latestHeading" /></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {latest.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Empty state when no posts */}
        {featured.length === 0 && latest.length === 0 && (
          <section className="py-20 px-4 text-center">
            <div className="text-5xl mb-4">🕉</div>
            <h2
              className="text-2xl font-bold mb-3"
              style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--maroon)' }}
            >
              <SectionHeading tKey="comingSoonHeading" />
            </h2>
            <p style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--color-text-muted)' }}>
              <SectionHeading tKey="comingSoonText" />
            </p>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
