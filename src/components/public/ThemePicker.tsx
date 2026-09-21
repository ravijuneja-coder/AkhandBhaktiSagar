'use client';

import { useEffect, useRef, useState } from 'react';
import { themes } from '@/lib/themes';
import { useSiteTheme } from '@/lib/theme-context';
import { useLanguage } from '@/lib/i18n';

export default function ThemePicker() {
  const [open, setOpen] = useState(false);
  const { themeId, setThemeId } = useSiteTheme();
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={lang === 'hi' ? 'थीम चुनें' : 'Choose theme'}
        aria-expanded={open}
        className="p-2 rounded-full transition-colors hover:bg-white/10"
        style={{ color: 'var(--header-gold)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
          <path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.4A5.1 5.1 0 0 0 22 10.5C22 5.8 17.5 2 12 2Z" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-72 rounded-xl shadow-2xl z-50 p-3"
          style={{ background: '#FFFBF5', border: '1px solid rgba(212,175,55,0.35)' }}
        >
          <div
            className="text-xs font-semibold mb-2 px-1"
            style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--maroon)' }}
          >
            {lang === 'hi' ? '🎨 थीम चुनें' : '🎨 Choose a Theme'}
          </div>
          <div className="grid grid-cols-1 gap-1.5 max-h-80 overflow-y-auto">
            {themes.map((theme) => {
              const active = theme.id === themeId;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    setThemeId(theme.id);
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 px-2.5 py-2 rounded-lg text-left transition-colors"
                  style={{
                    background: active ? 'rgba(212,175,55,0.15)' : 'transparent',
                    border: active ? '1px solid rgba(212,175,55,0.5)' : '1px solid transparent',
                  }}
                >
                  <span className="flex shrink-0" style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)' }}>
                    <span style={{ width: 10, height: 22, background: theme.main }} />
                    <span style={{ width: 10, height: 22, background: theme.secondary }} />
                    <span style={{ width: 10, height: 22, background: theme.accent }} />
                    <span style={{ width: 10, height: 22, background: theme.background }} />
                  </span>
                  <span
                    className="text-sm flex-1"
                    style={{ fontFamily: 'var(--font-devanagari)', color: '#3A2410' }}
                  >
                    {lang === 'hi' ? theme.nameHi : theme.nameEn}
                  </span>
                  {active && (
                    <span style={{ color: 'var(--gold)', fontWeight: 700 }}>✓</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
