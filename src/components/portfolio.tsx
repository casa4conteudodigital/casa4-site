import { getDictionary, type Locale } from '@/lib/i18n';
import { localizedProjects } from '@/lib/projects';
import { Contact } from './contact';
import { PortfolioGallery } from './portfolio-gallery';

export function Portfolio({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  return <main tabIndex={-1} id="main-content"><section className="portfolio-hero container" aria-labelledby="portfolio-title"><p className="eyebrow hero-enter"><span className="eyebrow-line" />{d.portfolio.eyebrow}</p><div className="portfolio-intro-grid"><h1 id="portfolio-title" className="hero-enter">{d.portfolio.title}<br /><span>{d.portfolio.accent}</span></h1><p className="hero-enter">{d.portfolio.description}</p></div></section><PortfolioGallery locale={locale} labels={d.portfolio} projects={localizedProjects(locale)} /><Contact locale={locale} /></main>;
}
