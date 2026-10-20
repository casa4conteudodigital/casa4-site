import { Portfolio } from '@/components/portfolio';
import { LocaleRedirect } from '@/components/locale-redirect';
import { pageMetadata } from '@/lib/site';
export const metadata = pageMetadata('pt', 'portfolio');
export default function EntryPortfolioPage() { return <><LocaleRedirect page="portfolio" /><Portfolio locale="pt" /></>; }
