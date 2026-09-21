'use client';

import { useEffect, useState } from 'react';

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

export default function DigitalClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(formatTime(new Date()));
    const interval = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <span
      className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tabular-nums"
      style={{
        background: 'rgba(255,255,255,0.08)',
        color: '#FFDDB0',
        border: '1px solid rgba(212,175,55,0.3)',
        fontVariantNumeric: 'tabular-nums',
      }}
      aria-label={`Current time ${time}`}
    >
      🕐 {time}
    </span>
  );
}
