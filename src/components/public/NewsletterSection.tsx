'use client';

import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setStatus('error');
      setMessage(t('newsletter', 'invalidEmail'));
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setMessage(t('newsletter', 'success'));
        setEmail('');
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus('error');
        setMessage(data.message || t('newsletter', 'genericError'));
      }
    } catch {
      setStatus('error');
      setMessage(t('newsletter', 'networkError'));
    }
  };

  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{
        background: 'linear-gradient(135deg, var(--header-darker) 0%, var(--header-bg-1) 50%, var(--header-dark) 100%)',
      }}
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* Decorative OM */}
        <div
          className="text-4xl mb-4"
          aria-hidden="true"
          style={{ color: 'var(--header-gold)' }}
        >
          🕉
        </div>

        <h2
          className="text-2xl sm:text-3xl font-bold mb-3"
          style={{ fontFamily: 'var(--font-devanagari)', color: 'var(--header-gold)', textWrap: 'balance' }}
        >
          {t('newsletter', 'heading')}
        </h2>
        <p
          className="text-sm sm:text-base mb-8"
          style={{ fontFamily: 'var(--font-devanagari)', color: 'rgba(255,220,176,0.75)' }}
        >
          {t('newsletter', 'description')}
        </p>

        {status === 'success' ? (
          <div
            className="px-6 py-4 rounded-xl text-base font-medium"
            style={{
              fontFamily: 'var(--font-devanagari)',
              background: 'rgba(22,163,74,0.15)',
              color: '#86EFAC',
              border: '1px solid rgba(22,163,74,0.3)',
            }}
          >
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                {t('newsletter', 'emailLabel')}
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
                placeholder={t('newsletter', 'emailPlaceholder')}
                required
                className="w-full px-5 py-3.5 rounded-lg text-sm outline-none transition-all"
                style={{
                  fontFamily: 'var(--font-devanagari)',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#FFFFFF',
                  border: status === 'error' ? '2px solid #F87171' : '1px solid rgba(212,175,55,0.3)',
                  backdropFilter: 'blur(4px)',
                }}
                aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3.5 rounded-lg font-bold text-sm transition-all disabled:opacity-70 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                fontFamily: 'var(--font-devanagari)',
                background: 'var(--header-gold)',
                color: 'var(--header-darker)',
                whiteSpace: 'nowrap',
              }}
            >
              {status === 'loading' ? t('newsletter', 'subscribing') : t('newsletter', 'subscribe')}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p
            id="newsletter-error"
            className="mt-2 text-sm"
            style={{ fontFamily: 'var(--font-devanagari)', color: '#FCA5A5' }}
            role="alert"
          >
            {message}
          </p>
        )}

        <p
          className="mt-4 text-xs"
          style={{ color: 'rgba(255,220,176,0.5)', fontFamily: 'var(--font-devanagari)' }}
        >
          {t('newsletter', 'privacy')}
        </p>
      </div>
    </section>
  );
}
