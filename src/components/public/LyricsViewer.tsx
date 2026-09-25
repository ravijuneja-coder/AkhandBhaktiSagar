'use client';

import { useMemo, useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { useSiteTheme } from '@/lib/theme-context';

interface LyricsViewerProps {
  lyrics: string;
  title?: string;
}

export default function LyricsViewer({ lyrics, title }: LyricsViewerProps) {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const { t, lang } = useTranslation();
  const { theme } = useSiteTheme();

  const fontSizeMap = { sm: '1.05rem', md: '1.2rem', lg: '1.4rem' };
  const refrainCounts = useMemo(() => countLineOccurrences(lyrics), [lyrics]);
  const chunks = useMemo(() => chunkLines(lyrics), [lyrics]);

  const handleCopy = async () => {
    try {
      const text = title ? `${title}\n\n${lyrics}` : lyrics;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = title ? `${title}\n\n${lyrics}` : lyrics;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="${lang}">
      <head>
        <meta charset="UTF-8">
        <title>${title || t('video', 'defaultBhajanTitle')}</title>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500&display=swap" rel="stylesheet">
        <style>
          body { font-family: 'Noto Sans Devanagari', sans-serif; font-size: 14pt; line-height: 2; margin: 2cm; color: #1A0A00; }
          h1 { font-size: 18pt; color: ${theme.main}; margin-bottom: 1em; text-align: center; }
          pre { white-space: pre-wrap; font-family: inherit; font-size: inherit; }
          @media print { body { margin: 1.5cm; } }
        </style>
      </head>
      <body>
        ${title ? `<h1>${title}</h1>` : ''}
        <pre>${lyrics.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-4 py-3 gap-3 flex-wrap"
        style={{
          background: 'linear-gradient(90deg, var(--header-bg-1), var(--header-dark))',
          borderBottom: '2px solid var(--gold)',
        }}
      >
        <span
          className="text-sm font-semibold"
          style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--header-gold)' }}
        >
          {t('lyrics', 'heading')}
        </span>

        <div className="flex items-center gap-2">
          {/* Font size */}
          <div className="flex items-center gap-1" role="group" aria-label={t('lyrics', 'fontSizeGroup')}>
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFontSize(s)}
                className="w-8 h-8 rounded-md text-xs font-bold transition-all"
                style={{
                  background: fontSize === s ? 'var(--header-gold)' : 'rgba(255,255,255,0.12)',
                  color: fontSize === s ? 'var(--header-darker)' : 'var(--header-text)',
                  fontSize: s === 'sm' ? '0.7rem' : s === 'md' ? '0.85rem' : '1rem',
                }}
                aria-label={`${s === 'sm' ? t('lyrics', 'small') : s === 'md' ? t('lyrics', 'medium') : t('lyrics', 'large')} ${t('lyrics', 'letterAria')}`}
                aria-pressed={fontSize === s}
              >
                अ
              </button>
            ))}
          </div>

          {/* Copy */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all"
            style={{
              fontFamily: 'var(--font-devanagari)',
              background: copied ? '#16A34A' : 'rgba(212,175,55,0.2)',
              color: copied ? '#FFFFFF' : 'var(--header-gold)',
              border: `1px solid ${copied ? '#16A34A' : 'rgba(212,175,55,0.3)'}`,
            }}
          >
            {copied ? t('lyrics', 'copied') : t('lyrics', 'copy')}
          </button>

          {/* Print */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all"
            style={{
              fontFamily: 'var(--font-devanagari)',
              background: 'rgba(255,255,255,0.1)',
              color: 'var(--header-text)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {t('lyrics', 'print')}
          </button>
        </div>
      </div>

      {/* Lyrics content */}
      <div
        className="p-6 sm:p-8"
        style={{ background: 'linear-gradient(180deg, #FFFBF5, #FDF6EC)' }}
      >
        {chunks.map((chunk, i) => {
          const text = chunk.replace(/\n$/, '');
          if (isMarkerLine(text, refrainCounts)) {
            return (
              <div
                key={i}
                className="flex items-center gap-3"
                style={{ marginTop: i === 0 ? 0 : '32px', marginBottom: '20px' }}
              >
                <span style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5))' }} />
                <span
                  className="font-bold text-center"
                  style={{
                    fontFamily: 'var(--font-devanagari)',
                    fontSize: `calc(${fontSizeMap[fontSize]} * 1.05)`,
                    color: 'var(--gold)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {text}
                </span>
                <span style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(212,175,55,0.5), transparent)' }} />
              </div>
            );
          }
          if (isHeadingLine(text)) {
            return (
              <h3
                key={i}
                className="font-bold flex items-center gap-2"
                style={{
                  fontFamily: 'var(--font-devanagari)',
                  fontSize: `calc(${fontSizeMap[fontSize]} * 1.15)`,
                  color: 'var(--maroon)',
                  marginTop: i === 0 ? 0 : '28px',
                  marginBottom: '14px',
                  paddingBottom: '8px',
                  borderBottom: '2px solid rgba(212,175,55,0.35)',
                }}
              >
                {text}
              </h3>
            );
          }
          return (
            <pre
              key={i}
              className="whitespace-pre-wrap break-words"
              style={{
                fontFamily: 'var(--font-devanagari)',
                fontSize: fontSizeMap[fontSize],
                lineHeight: '2.2',
                color: 'var(--color-text-primary)',
                letterSpacing: '0.01em',
                marginBottom: chunk.endsWith('\n') ? 0 : '20px',
              }}
            >
              {text}
            </pre>
          );
        })}
      </div>
    </div>
  );
}

// A short single line starting with an emoji is treated as a section heading.
function isHeadingLine(text: string): boolean {
  if (text.includes('\n')) return false;
  const trimmed = text.trim();
  if (trimmed.length === 0 || trimmed.length > 60) return false;
  return /^\p{Extended_Pictographic}/u.test(trimmed);
}

// A short line wrapped in danda brackets, e.g. "॥ दोहा ॥" or "॥ चौपाई ॥",
// is treated as a section marker (a different visual style from headings).
function isBracketedMarker(text: string): boolean {
  if (text.includes('\n')) return false;
  const trimmed = text.trim();
  if (trimmed.length === 0 || trimmed.length > 40) return false;
  return /^॥.*॥$/.test(trimmed);
}

// A short standalone line ending in a danda (॥), such as a repeating aarti
// refrain like "ॐ जय शिव ओंकारा॥", is also treated as a marker — but only
// when it recurs often (3+ times) across the lyrics. A lower bar of 2 would
// also catch an ordinary couplet that happens to bookend the song (repeated
// once at the start and again at the end), which is not a refrain.
function isRefrainLine(text: string, refrainCounts: Map<string, number>): boolean {
  if (text.includes('\n')) return false;
  const trimmed = text.trim();
  if (trimmed.length === 0 || trimmed.length > 40) return false;
  if (!trimmed.endsWith('॥')) return false;
  return (refrainCounts.get(trimmed) ?? 0) >= 3;
}

function isMarkerLine(text: string, refrainCounts: Map<string, number>): boolean {
  return isBracketedMarker(text) || isRefrainLine(text, refrainCounts);
}

// Counts occurrences of each non-blank, non-heading line (trimmed) so
// isRefrainLine can spot lines that repeat across the lyrics.
function countLineOccurrences(text: string): Map<string, number> {
  const counts = new Map<string, number>();
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || isHeadingLine(line) || isBracketedMarker(line)) continue;
    counts.set(trimmed, (counts.get(trimmed) ?? 0) + 1);
  }
  return counts;
}

// Chunks lyrics into groups of `size` non-blank lines, adding a 20px gap
// after each group — unless the source already has a blank line there.
function chunkLines(text: string, size = 4): string[] {
  const refrainCounts = countLineOccurrences(text);
  const lines = text.split('\n');
  const chunks: string[] = [];
  let current: string[] = [];

  const flush = (followedByBlank: boolean) => {
    if (current.length === 0) return;
    chunks.push(current.join('\n') + (followedByBlank ? '\n' : ''));
    current = [];
  };

  for (const line of lines) {
    if (line.trim() === '') {
      flush(true);
      continue;
    }
    // Force a heading/marker line to always stand alone as its own chunk,
    // even mid-group, so it can render with its distinct style.
    const isStandalone = isHeadingLine(line) || isMarkerLine(line, refrainCounts);
    if (isStandalone && current.length > 0) {
      flush(false);
    }
    current.push(line);
    if (isStandalone || current.length === size) flush(false);
  }
  flush(false);

  return chunks;
}
