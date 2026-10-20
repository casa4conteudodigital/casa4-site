import type { Metadata } from 'next';
import { getDictionary, htmlLanguages, locales, type Locale } from './i18n';

// Contato confirmado no site atual da Casa4. Altere aqui para atualizar todo o site.
export const site = {
  name: 'Casa4 Conteúdo Digital',
  origin: 'https://www.casa4conteudodigital.com.br',
  whatsappNumber: '551128877172',
  phoneDisplay: '+55 (11) 2887-7172',
};
export const whatsappMessages: Record<Locale, string> = {
  pt: 'Olá, Casa4! Gostaria de conversar sobre um projeto.',
  en: 'Hello, Casa4! I would like to discuss a project.',
  es: '¡Hola, Casa4! Me gustaría hablar sobre un proyecto.',
};
export function whatsappUrl(locale: Locale) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(whatsappMessages[locale])}`;
}
export function pageMetadata(locale: Locale, page: 'home' | 'portfolio'): Metadata {
  const d = getDictionary(locale);
  const suffix = page === 'portfolio' ? '/portfolio/' : '/';
  const title = page === 'home' ? d.meta.homeTitle : d.meta.portfolioTitle;
  const description = page === 'home' ? d.meta.homeDescription : d.meta.portfolioDescription;
  return {
    title, description, metadataBase: new URL(site.origin),
    alternates: {
      canonical: `/${locale}${suffix}`,
      languages: Object.fromEntries([
        ...locales.map(l => [htmlLanguages[l], `${site.origin}/${l}${suffix}`]),
        ['x-default', `${site.origin}/pt${suffix}`],
      ]),
    },
    openGraph: { title, description, url: `/${locale}${suffix}`, siteName: site.name, locale: htmlLanguages[locale].replace('-', '_'), type: 'website' },
    twitter: { card: 'summary', title, description },
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/images/casa4-logo.png', type: 'image/png' },
      ],
      shortcut: '/favicon.svg',
    },
  };
}
