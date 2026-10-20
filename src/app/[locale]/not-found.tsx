'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getDictionary, isLocale } from '@/lib/i18n';
export default function NotFound() {
  const params = useParams<{ locale?: string }>();
  const locale = params.locale && isLocale(params.locale) ? params.locale : 'pt';
  const d = getDictionary(locale).notFound;
  return <main tabIndex={-1} id="main-content" className="not-found container"><h1>{d.title}</h1><p>{d.text}</p><Link className="button button-yellow" href={`/${locale}/`}>{d.button}</Link></main>;
}
