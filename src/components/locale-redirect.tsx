'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isLocale } from '@/lib/i18n';

export function LocaleRedirect({ page = 'home' }: { page?: 'home' | 'portfolio' }) {
  const router = useRouter();
  useEffect(() => {
    let locale = 'pt';
    try { const saved = localStorage.getItem('casa4-language'); if (saved && isLocale(saved)) locale = saved; } catch { /* Português é o idioma padrão. */ }
    router.replace(`/${locale}/${page === 'portfolio' ? 'portfolio/' : ''}${window.location.hash}`);
  }, [router, page]);
  return null;
}
