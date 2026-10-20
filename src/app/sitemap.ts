import type { MetadataRoute } from 'next';
import { locales, htmlLanguages } from '@/lib/i18n';
import { site } from '@/lib/site';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap(locale => ['', 'portfolio/'].map(suffix => ({
    url: `${site.origin}/${locale}/${suffix}`,
    changeFrequency: 'monthly' as const,
    priority: suffix ? 0.8 : 1,
    alternates: { languages: Object.fromEntries(locales.map(l => [htmlLanguages[l], `${site.origin}/${l}/${suffix}`])) },
  })));
}
