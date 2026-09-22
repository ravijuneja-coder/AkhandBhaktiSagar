'use client';

import { useState } from 'react';
import { festivalCalendar2026, MAJOR_FESTIVALS } from '@/lib/festivalCalendar2026';

// Index festivalCalendar2026 entries by calendar month (0 = January) so the
// current month can be resolved regardless of list order.
function getCurrentMonthIndex(): number {
  const now = new Date();
  // Data is for 2026; before then, fall back to January so nothing looks stale.
  if (now.getFullYear() < 2026) return 0;
  if (now.getFullYear() > 2026) return festivalCalendar2026.length - 1;
  return Math.min(now.getMonth(), festivalCalendar2026.length - 1);
}

export default function FestivalCalendar2026() {
  const [activeMonth, setActiveMonth] = useState(getCurrentMonthIndex);
  const current = festivalCalendar2026[activeMonth];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div
        className="rounded-2xl overflow-hidden shadow-lg"
        style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface-card)' }}
      >
        {/* Header */}
        <div
          className="px-6 py-6 text-center"
          style={{ background: 'linear-gradient(135deg, var(--header-darker) 0%, var(--header-bg-1) 60%, var(--deep-orange) 100%)' }}
        >
          <h2
            className="text-2xl sm:text-3xl font-bold"
            style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--header-gold)' }}
          >
            🪔 2026 प्रमुख हिंदू त्योहार एवं पर्व
          </h2>
          <p className="text-sm mt-2" style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--header-text)' }}>
            माह अनुसार सम्पूर्ण व्रत-त्योहार सूची
          </p>
        </div>

        {/* Month tabs */}
        <div
          className="flex overflow-x-auto gap-2 px-4 py-4 no-scrollbar"
          style={{ background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)' }}
        >
          {festivalCalendar2026.map((m, i) => {
            const active = i === activeMonth;
            return (
              <button
                key={m.month}
                onClick={() => setActiveMonth(i)}
                className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all"
                style={{
                  fontFamily: 'var(--font-devanagari)',
                  background: active ? 'var(--gradient-hero)' : 'var(--color-surface-card)',
                  color: active ? '#FFFFFF' : 'var(--color-text-secondary)',
                  border: active ? 'none' : '1px solid var(--color-border)',
                  boxShadow: active ? '0 2px 10px rgba(0,0,0,0.15)' : 'none',
                }}
              >
                <span aria-hidden="true">{m.icon}</span>
                {m.month.replace(' 2026', '')}
              </button>
            );
          })}
        </div>

        {/* Festival list for active month */}
        <div className="px-4 sm:px-6 py-6">
          <div
            className="flex items-center gap-2 mb-4"
            style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--maroon)' }}
          >
            <span className="text-xl" aria-hidden="true">{current.icon}</span>
            <h3 className="text-lg font-bold">{current.month}</h3>
            <span
              className="ml-auto text-xs font-medium px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(212,175,55,0.15)', color: 'var(--color-text-muted)' }}
            >
              {current.festivals.length} पर्व
            </span>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {current.festivals.map((f, i) => {
              const major = MAJOR_FESTIVALS.has(f.name);
              return (
                <li
                  key={`${f.date}-${f.name}-${i}`}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 transition-transform hover:-translate-y-0.5"
                  style={{
                    background: major ? 'rgba(212,175,55,0.1)' : 'var(--color-bg-secondary)',
                    border: major ? '1px solid rgba(212,175,55,0.4)' : '1px solid var(--color-border)',
                  }}
                >
                  <span
                    className="shrink-0 flex flex-col items-center justify-center rounded-lg text-center"
                    style={{
                      width: '52px',
                      height: '52px',
                      background: major ? 'var(--gradient-hero)' : 'var(--color-surface-card)',
                      color: major ? '#FFFFFF' : 'var(--maroon)',
                      border: major ? 'none' : '1px solid var(--color-border)',
                    }}
                  >
                    <span className="text-base font-bold leading-none" style={{ fontFamily: 'var(--font-devanagari)' }}>
                      {f.date.split(' ')[0]}
                    </span>
                  </span>
                  <span style={{ fontFamily: 'var(--font-devanagari)' }}>
                    <span
                      className="block font-semibold"
                      style={{ color: major ? 'var(--maroon)' : 'var(--color-text-primary)' }}
                    >
                      {major && <span className="mr-1" aria-hidden="true">⭐</span>}
                      {f.name}
                    </span>
                    <span className="block text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {f.date}
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
