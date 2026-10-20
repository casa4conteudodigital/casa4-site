import localFont from 'next/font/local';
import Script from 'next/script';
import { getDictionary, htmlLanguages, type Locale } from '@/lib/i18n';
import { getAccessibilityLabels } from '@/lib/accessibility-i18n';
import { preferenceBootstrap } from '@/lib/accessibility-preferences';
import { Header } from './header';
import { Footer } from './footer';
import '@/app/globals.css';

const manrope = localFont({ src: '../../public/fonts/manrope.woff2', variable: '--font-body', weight: '200 800', display: 'swap' });
const space = localFont({ src: '../../public/fonts/space-grotesk.woff2', variable: '--font-display', weight: '300 700', display: 'swap' });

export function RootDocument({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  return <html lang={htmlLanguages[locale]} className={`${manrope.variable} ${space.variable}`} suppressHydrationWarning><body><Script id="casa4-display-preferences" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: preferenceBootstrap }} /><Header locale={locale} labels={getDictionary(locale).nav} accessibilityLabels={getAccessibilityLabels(locale)} />{children}<Footer locale={locale} /></body></html>;
}
