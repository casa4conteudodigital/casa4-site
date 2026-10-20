import { MessageCircle, Sparkles } from 'lucide-react';
import { getDictionary, type Locale } from '@/lib/i18n';
import { whatsappUrl } from '@/lib/site';
import { Reveal } from './reveal';

export function Contact({ locale }: { locale: Locale }) {
  const d = getDictionary(locale).contact;
  return <section className="contact-section" id="contato" tabIndex={-1} aria-labelledby="contact-title"><div className="container"><Reveal className="contact-inner"><div className="contact-copy"><p className="eyebrow"><Sparkles size={16} aria-hidden="true" />{d.eyebrow}</p><h2 id="contact-title">{d.title}<br /><span>{d.accent}</span></h2><p className="contact-description">{d.text}</p></div><div className="contact-action"><a className="button button-dark" href={whatsappUrl(locale)} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} aria-hidden="true" />{d.button}</a><p>{d.availability}</p></div></Reveal></div></section>;
}
