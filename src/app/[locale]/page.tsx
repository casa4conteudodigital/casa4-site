import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/site';
import { Home } from '@/components/home';
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale)) notFound(); return pageMetadata(locale, 'home'); }
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale)) notFound(); return <Home locale={locale} />; }
