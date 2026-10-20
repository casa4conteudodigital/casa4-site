import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';

export function Brand({ locale, large = false }: { locale: Locale; large?: boolean }) {
  return (
    <Link href={`/${locale}/`} className={`brand ${large ? 'brand-large' : ''}`} aria-label="Casa4 — Home">
      <span className="brand-symbol" aria-hidden="true"><Image src="/images/casa4-logo.png" alt="" width={500} height={500} /></span>
      <span className="brand-text">casa<span>4</span><small>CONTEÚDO DIGITAL</small></span>
    </Link>
  );
}
