import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, locales } from '@/lib/i18n';
import { RootDocument } from '@/components/root-document';

export const dynamicParams = false;
export function generateStaticParams() { return locales.map(locale => ({ locale })); }
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/images/casa4-logo.png', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
  },
};

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <RootDocument locale={locale}>{children}</RootDocument>;
}
