import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/public/Breadcrumb';
import LyricsViewer from '@/components/public/LyricsViewer';
import VideoPlayer from '@/components/public/VideoPlayer';
import ShareButtons from '@/components/public/ShareButtons';
import PostCard from '@/components/public/PostCard';
import { getPostBySlug, getRelatedPosts, getPrevNextPost } from '@/lib/queries';
import { contentTypeLabels, contentTypeToUrl, urlToContentType } from '@/lib/types';
import { ContentType } from '@prisma/client';

const validContentTypeSlugs = ['bhajan', 'aarti', 'chalisa', 'mantra', 'stotra', 'article', 'festival', 'bhakti-geet', 'katha'];

interface Props {
  params: { contentType: string; slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { contentType: ctSlug, slug } = params;
  if (!urlToContentType[ctSlug]) return { title: 'Not Found' };

  const post = await getPostBySlug(ctSlug, slug);
  if (!post) return { title: 'Not Found' };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://akhandbhaktisagar.com';
  const url = `${siteUrl}/${ctSlug}/${slug}`;
  const label = contentTypeLabels[ctSlug] || ctSlug;

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.description || `${post.title} - ${label} | अखंड भक्ति सागर`,
    keywords: post.seoKeywords || undefined,
    alternates: { canonical: post.canonicalUrl || url },
    openGraph: {
      type: 'article',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.description || `${post.title} - ${label}`,
      url,
      images: (post.ogImage || post.featuredImage)
        ? [{ url: post.ogImage || post.featuredImage!, width: 1200, height: 630, alt: post.title }]
        : undefined,
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      section: label,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.description || `${post.title} - ${label}`,
      images: (post.ogImage || post.featuredImage) ? [post.ogImage || post.featuredImage!] : undefined,
    },
  };
}

export const revalidate = 3600;

export default async function PostPage({ params }: Props) {
  const { contentType: ctSlug, slug } = params;
  if (!urlToContentType[ctSlug]) notFound();

  const post = await getPostBySlug(ctSlug, slug);
  if (!post) notFound();

  const [related, { prev, next }] = await Promise.all([
    getRelatedPosts(ctSlug, post.deity?.id, slug, 4),
    getPrevNextPost(ctSlug, post.publishedAt || post.createdAt, slug),
  ]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://akhandbhaktisagar.com';
  const postUrl = `${siteUrl}/${ctSlug}/${slug}`;
  const label = contentTypeLabels[ctSlug] || ctSlug;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.featuredImage,
    author: { '@type': 'Person', name: post.author.name },
    publisher: { '@type': 'Organization', name: 'अखंड भक्ति सागर', url: siteUrl },
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    url: postUrl,
    articleSection: label,
    inLanguage: 'hi',
  };

  const formattedDate = (post.publishedAt || post.createdAt).toLocaleDateString('hi-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  // Map prev/next contentType enum to URL slug
  const prevUrl = prev
    ? `/${contentTypeToUrl[prev.contentType as ContentType] ?? prev.contentType.toLowerCase()}/${prev.slug}`
    : null;
  const nextUrl = next
    ? `/${contentTypeToUrl[next.contentType as ContentType] ?? next.contentType.toLowerCase()}/${next.slug}`
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ background: 'var(--color-bg-primary)', minHeight: '80vh' }}>
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb
            items={[
              { label, href: `/${ctSlug}` },
              { label: post.title },
            ]}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="lg:grid lg:grid-cols-3 lg:gap-10">
            {/* Main content */}
            <article className="lg:col-span-2">
              {/* Featured image */}
              {post.featuredImage && (
                <div
                  className="relative rounded-2xl overflow-hidden mb-8"
                  style={{ aspectRatio: '16/9', padding: '5px', background: 'linear-gradient(135deg, var(--gold), var(--saffron), var(--gold))' }}
                >
                  <div className="relative w-full h-full rounded-[14px] overflow-hidden">
                    <Image
                      src={post.featuredImage}
                      alt={post.imageAlt || post.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 66vw"
                    />
                    {/* Corner ornaments */}
                    <span aria-hidden="true" className="absolute top-2 left-2 text-lg opacity-90" style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.5))' }}>🪷</span>
                    <span aria-hidden="true" className="absolute top-2 right-2 text-lg opacity-90" style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.5))' }}>🪷</span>
                  </div>
                </div>
              )}

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge-category" style={{ fontFamily: 'var(--font-devanagari)' }}>
                  {label}
                </span>
                {post.deity && (
                  <Link href={`/deity/${post.deity.slug}`} className="badge-deity" style={{ fontFamily: 'var(--font-devanagari)' }}>
                    {post.deity.nameHindi || post.deity.name}
                  </Link>
                )}
              </div>

              {/* Title */}
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 leading-tight"
                style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--maroon)', textWrap: 'balance' }}
              >
                {post.title}
              </h1>

              {/* Gold divider */}
              <div className="flex items-center gap-3 mb-4" aria-hidden="true">
                <span style={{ width: '36px', height: '2px', background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
                <span style={{ color: 'var(--gold)', fontSize: '0.9rem' }}>🕉</span>
                <span style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(212,175,55,0.4), transparent)' }} />
              </div>

              {/* Meta */}
              <div
                className="flex flex-wrap items-center gap-3 text-sm mb-6 pb-6"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                  style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-devanagari)', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)' }}
                >
                  ✍️ {post.author.name}
                </span>
                <time
                  dateTime={post.publishedAt?.toISOString()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                  style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-devanagari)', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)' }}
                >
                  📅 {formattedDate}
                </time>
              </div>

              {/* Description */}
              {post.description && (
                <div
                  className="relative text-base leading-relaxed mb-6 p-5 pl-7 rounded-xl overflow-hidden"
                  style={{
                    fontFamily: 'var(--font-devanagari)',
                    color: 'var(--color-text-secondary)',
                    background: 'linear-gradient(135deg, rgba(255,107,0,0.05), rgba(212,175,55,0.06))',
                    border: '1px solid rgba(255,107,0,0.12)',
                    lineHeight: '1.9',
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 bottom-0"
                    style={{ width: '4px', background: 'linear-gradient(180deg, var(--gold), var(--saffron))' }}
                  />
                  <span aria-hidden="true" className="absolute -top-1 right-3 text-4xl opacity-[0.12]" style={{ fontFamily: 'Georgia, serif', color: 'var(--maroon)' }}>❝</span>
                  {post.description}
                </div>
              )}

              {/* Lyrics */}
              {post.lyrics && (
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4" aria-hidden="true">
                    <span style={{ width: '28px', height: '1px', background: 'var(--gold)', opacity: 0.5 }} />
                    <span style={{ color: 'var(--gold)' }}>🎵</span>
                    <h2
                      className="text-xl font-bold"
                      style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--maroon)' }}
                    >
                      गीत / बोल
                    </h2>
                    <span style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(212,175,55,0.4), transparent)' }} />
                  </div>
                  <LyricsViewer lyrics={post.lyrics} title={post.title} />
                </div>
              )}

              {/* Video */}
              {(post.videoUrl || post.embedCode) && post.videoType !== 'NONE' && (
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4" aria-hidden="true">
                    <span style={{ width: '28px', height: '1px', background: 'var(--gold)', opacity: 0.5 }} />
                    <span style={{ color: 'var(--gold)' }}>▶</span>
                    <h2
                      className="text-xl font-bold"
                      style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--maroon)' }}
                    >
                      वीडियो
                    </h2>
                    <span style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(212,175,55,0.4), transparent)' }} />
                  </div>
                  <VideoPlayer
                    videoType={post.videoType}
                    videoUrl={post.videoUrl}
                    embedCode={post.embedCode}
                    title={post.title}
                  />
                </div>
              )}

              {/* Content body */}
              {post.content && (
                <div
                  className="mb-8"
                  style={{
                    fontFamily: 'var(--font-devanagari)',
                    color: 'var(--color-text-primary)',
                    fontSize: '1.05rem',
                    lineHeight: '2',
                  }}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              )}

              {/* Share */}
              <div
                className="relative mb-8 p-5 rounded-xl overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(255,107,0,0.05), rgba(212,175,55,0.07))', border: '1px solid rgba(212,175,55,0.2)' }}
              >
                <span aria-hidden="true" className="absolute -right-4 -top-4 text-6xl opacity-[0.06]">🪷</span>
                <ShareButtons title={post.title} url={postUrl} />
              </div>

              {/* Prev / Next */}
              {(prev || next) && (
                <nav
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
                  aria-label="पिछला और अगला"
                >
                  {prev && prevUrl && (
                    <Link
                      href={prevUrl}
                      className="p-4 rounded-xl transition-all hover:shadow-md hover:-translate-y-0.5"
                      style={{ background: 'white', border: '1px solid var(--color-border)', borderLeft: '3px solid var(--gold)' }}
                    >
                      <span className="text-xs block mb-1" style={{ color: 'var(--gold)', fontFamily: 'var(--font-devanagari)' }}>← पिछला</span>
                      <span className="text-sm font-medium line-clamp-2" style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--maroon)' }}>
                        {prev.title}
                      </span>
                    </Link>
                  )}
                  {next && nextUrl && (
                    <Link
                      href={nextUrl}
                      className="p-4 rounded-xl text-right transition-all hover:shadow-md hover:-translate-y-0.5"
                      style={{ background: 'white', border: '1px solid var(--color-border)', borderRight: '3px solid var(--gold)' }}
                    >
                      <span className="text-xs block mb-1" style={{ color: 'var(--gold)', fontFamily: 'var(--font-devanagari)' }}>अगला →</span>
                      <span className="text-sm font-medium line-clamp-2" style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--maroon)' }}>
                        {next.title}
                      </span>
                    </Link>
                  )}
                </nav>
              )}
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 mt-10 lg:mt-0">
              <div className="sticky top-24 space-y-6">
                {/* Deity info */}
                {post.deity && (
                  <div
                    className="relative p-5 rounded-xl text-center overflow-hidden"
                    style={{ background: 'linear-gradient(180deg, #FFFBF2, #FFFFFF)', border: '1px solid rgba(212,175,55,0.25)', boxShadow: 'var(--shadow-card)' }}
                  >
                    {/* Faint mandala ring behind medallion */}
                    <svg aria-hidden="true" className="absolute left-1/2 top-4 -translate-x-1/2 opacity-[0.12]" width="130" height="130" viewBox="0 0 130 130">
                      <circle cx="65" cy="65" r="62" fill="none" stroke="var(--gold)" strokeWidth="1" />
                      <circle cx="65" cy="65" r="50" fill="none" stroke="var(--gold)" strokeWidth="1" strokeDasharray="3 5" />
                    </svg>

                    {post.deity.image && (
                      <div
                        className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-3"
                        style={{ border: '2px solid var(--header-gold)', boxShadow: '0 0 0 4px rgba(212,175,55,0.15), 0 4px 14px rgba(212,175,55,0.3)' }}
                      >
                        <Image src={post.deity.image} alt={post.deity.nameHindi || post.deity.name} fill className="object-cover" sizes="80px" />
                      </div>
                    )}
                    {!post.deity.image && <div className="relative text-3xl mb-2">🕉</div>}
                    <h3
                      className="relative text-lg font-bold mb-1"
                      style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--maroon)' }}
                    >
                      {post.deity.nameHindi || post.deity.name}
                    </h3>
                    <div className="relative flex items-center justify-center gap-2 mb-3" aria-hidden="true">
                      <span style={{ width: '20px', height: '1px', background: 'var(--gold)', opacity: 0.5 }} />
                      <span style={{ color: 'var(--gold)', fontSize: '0.7rem' }}>🪷</span>
                      <span style={{ width: '20px', height: '1px', background: 'var(--gold)', opacity: 0.5 }} />
                    </div>
                    <Link
                      href={`/deity/${post.deity.slug}`}
                      className="relative text-xs font-medium px-4 py-1.5 rounded-full inline-block transition-transform hover:-translate-y-0.5"
                      style={{ fontFamily: 'var(--font-devanagari)', background: 'linear-gradient(135deg, var(--saffron), var(--gold))', color: 'white', boxShadow: '0 3px 10px rgba(212,175,55,0.35)' }}
                    >
                      सभी भजन देखें
                    </Link>
                  </div>
                )}

                {/* Related posts */}
                {related.length > 0 && (
                  <div>
                    <h3
                      className="text-base font-bold mb-4 section-title"
                      style={{ fontFamily: 'var(--font-devanagari)' }}
                    >
                      संबंधित भजन
                    </h3>
                    <div className="space-y-3">
                      {related.map((r) => {
                        const rSlug = contentTypeToUrl[r.contentType as ContentType] ?? r.contentType.toLowerCase();
                        return (
                          <Link
                            key={r.id}
                            href={`/${rSlug}/${r.slug}`}
                            className="flex gap-3 p-3 rounded-lg transition-colors hover:bg-orange-50"
                            style={{ border: '1px solid var(--color-border)', background: 'white' }}
                          >
                            {r.featuredImage ? (
                              <div className="relative w-16 h-12 rounded-md overflow-hidden flex-shrink-0">
                                <Image src={r.featuredImage} alt={r.title} fill className="object-cover" sizes="64px" />
                              </div>
                            ) : (
                              <div className="w-16 h-12 rounded-md flex-shrink-0 flex items-center justify-center text-2xl" style={{ background: 'linear-gradient(135deg, var(--saffron), var(--header-bg-1))' }} aria-hidden="true">🕉</div>
                            )}
                            <span
                              className="text-sm font-medium leading-snug line-clamp-2 hover:text-orange-600 transition-colors"
                              style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--color-text-primary)' }}
                            >
                              {r.title}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
