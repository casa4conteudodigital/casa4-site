import { Home } from '@/components/home';
import { LocaleRedirect } from '@/components/locale-redirect';
import { pageMetadata } from '@/lib/site';
export const metadata = pageMetadata('pt', 'home');
export default function EntryPage() { return <><LocaleRedirect /><Home locale="pt" /></>; }
