import Image from 'next/image';
import Link from 'next/link';
import { Plus, MessageCircle } from 'lucide-react';
import { getDictionary, type Locale } from '@/lib/i18n';
import { projects } from '@/lib/projects';
import { whatsappUrl } from '@/lib/site';
import { Contact } from './contact';
import { Reveal } from './reveal';

export function Home({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const featured = [projects[1], projects[3]];
  return <main id="main-content" tabIndex={-1}>
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow hero-enter"><span className="eyebrow-line" />{d.hero.eyebrow}</p>
        <h1 id="hero-title" className="hero-enter">{d.hero.line1}<br /><span>{d.hero.line2}</span></h1>
        <p className="hero-description hero-enter">{d.hero.description}</p>
        <div className="hero-buttons hero-enter"><Link className="button button-yellow" href={`/${locale}/portfolio/`}>{d.hero.cta}</Link><a className="text-link" href={whatsappUrl(locale)} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} aria-hidden="true" />{d.hero.secondary}</a></div>
        <a className="hero-scroll" href="#servicos"><span className="scroll-track" aria-hidden="true"><span /></span>{d.hero.scroll}</a>
      </div>
      <div className="hero-visual hero-enter">
        <div className="hero-photo"><Image src="/images/casa4-studio.jpg" alt={d.hero.photoAlt} fill sizes="(max-width: 800px) 92vw, 45vw" preload /><div className="photo-shade" /><span className="photo-index">EST. CASA4</span><div className="photo-caption"><span className="tiny-plus" aria-hidden="true">+</span><p>{d.hero.photoLabel}</p></div></div>
        <div className="brand-seal" aria-hidden="true"><svg viewBox="0 0 160 160" className="seal-type"><defs><path id="seal-circle" d="M80,80 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" /></defs><text><textPath href="#seal-circle" textLength="354">CASA4 · {d.hero.sealTop} · {d.hero.sealBottom} · </textPath></text></svg><span className="seal-center"><b>CASA4</b></span></div>
        <span className="hero-corner" aria-hidden="true"><Plus size={26} /></span>
      </div>
    </section>
    <div className="ticker" aria-label={d.ticker.join(', ')}><div className="ticker-track" aria-hidden="true">{[0, 1].map(n => <div className="ticker-group" key={n}>{d.ticker.map(item => <span key={item}>{item}<span className="ticker-star">✳</span></span>)}</div>)}</div></div>
    <section className="services-section section container" id="servicos" aria-labelledby="services-title"><Reveal className="section-intro"><p className="eyebrow">{d.services.eyebrow}</p><div className="intro-grid"><h2 id="services-title">{d.services.title}<br /><span className="text-muted">{d.services.accent}</span></h2><p>{d.services.intro}</p></div></Reveal><div className="service-list">{d.services.items.map((item, index) => <Reveal key={item.title} delay={index * 60}><details className="service-item" name="casa4-services" open={index === 0}><summary><span className="service-number">0{index + 1}</span><h3>{item.title}</h3><span className="service-plus" aria-hidden="true"><Plus size={25} /></span></summary><div className="service-details"><p>{item.description}</p><div className="tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></details></Reveal>)}</div></section>
    <section className="featured-section section" aria-labelledby="featured-title"><div className="container"><Reveal className="section-intro"><p className="eyebrow">{d.featured.eyebrow}</p><div className="section-heading-row"><h2 id="featured-title">{d.featured.title}<br /><span className="text-muted">{d.featured.accent}</span></h2><Link className="underlined-link" href={`/${locale}/portfolio/`}>{d.featured.all}</Link></div></Reveal><div className="featured-grid">{featured.map((project, i) => <Reveal key={project.id} delay={i * 120}><Link className={`featured-card project-${project.theme}`} href={`/${locale}/portfolio/#${project.id}`} aria-label={`${d.featured.view}: ${project.name}`}><div className="featured-image"><span className="project-number">/{project.number}</span><Image src={project.image} alt={project.translations[locale].alt} fill sizes="(max-width: 800px) 92vw, 45vw" className={`project-image-${project.theme}`} /><span className="project-hover-label">{d.featured.view}</span></div><div className="project-caption"><div><p className="project-type">{project.translations[locale].type}</p><h3>{project.name}</h3></div><span className="project-caption-plus" aria-hidden="true"><Plus size={22} /></span></div></Link></Reveal>)}</div></div></section>
    <section className="team-section section container" aria-labelledby="team-title"><Reveal className="team-layout"><div className="team-photos"><figure className="team-profile"><div className="team-photo team-photo-one"><Image src="/images/casa4-team-01.jpg" alt={d.team.alt1} fill sizes="(max-width: 520px) 90vw, (max-width: 800px) 45vw, 23vw" /></div><figcaption><h3>Vinicius Puttini <span>— {d.team.creativeRole}</span></h3><p>{d.team.creativeDescription}</p></figcaption></figure><figure className="team-profile"><div className="team-photo team-photo-two team-photo-logo"><Image src="/images/ultra-logic-logo.png" alt={d.team.alt2} fill sizes="(max-width: 520px) 90vw, (max-width: 800px) 45vw, 23vw" /></div><figcaption><h3>Ultra Logic <span>— {d.team.itRole}</span></h3><p>{d.team.itDescription}</p></figcaption></figure></div><div className="team-copy"><p className="eyebrow">{d.team.eyebrow}</p><h2 id="team-title">{d.team.title}<br /><span className="text-blue">{d.team.accent}</span></h2><p>{d.team.description}</p><div className="team-note"><span aria-hidden="true">✳</span>{d.team.note}</div></div></Reveal></section>
    <Contact locale={locale} />
  </main>;
}
