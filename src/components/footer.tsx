import Link from 'next/link';
import { getDictionary, type Locale } from '@/lib/i18n';
import { site, whatsappUrl } from '@/lib/site';
import { Brand } from './brand';

export function Footer({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  return <footer className="site-footer"><div className="container"><div className="footer-top"><div><Brand locale={locale} large /><p className="footer-description">{d.footer.description}</p></div><nav aria-label={d.footer.navigation}><p className="footer-label">{d.footer.navigation}</p><Link href={`/${locale}/`}>{d.nav.home}</Link><Link href={`/${locale}/portfolio/`}>{d.nav.portfolio}</Link></nav><div className="footer-contact"><p className="footer-label">{d.footer.contact}</p><a href={whatsappUrl(locale)} target="_blank" rel="noopener noreferrer">WhatsApp</a><a href={`tel:+${site.whatsappNumber}`}>{site.phoneDisplay}</a></div></div><div className="footer-bottom"><p>© {new Date().getFullYear()} Casa4. {d.footer.rights}</p><p>{d.footer.made}</p></div></div></footer>;
}
