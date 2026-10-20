import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/site';
import { Portfolio } from '@/components/portfolio';
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale)) notFound(); return pageMetadata(locale, 'portfolio'); }
export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale)) notFound(); return <Portfolio locale={locale} />; }
