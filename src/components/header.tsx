'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, X, Globe2, MessageCircle } from 'lucide-react';
import { locales, localeNames, htmlLanguages, type Locale, type Dictionary } from '@/lib/i18n';
import { whatsappUrl } from '@/lib/site';
import { Brand } from './brand';
import { AccessibilityControls } from './accessibility';
import type { AccessibilityLabels } from '@/lib/accessibility-i18n';

export function Header({ locale, labels, accessibilityLabels }: { locale: Locale; labels: Dictionary['nav']; accessibilityLabels: AccessibilityLabels }) {
  const d = { nav: labels };
  const pathname = usePathname();
  const portfolio = pathname.includes('/portfolio');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const focusNavigation = useCallback(() => {
    if (window.matchMedia('(max-width: 800px)').matches) { setMenuOpen(true); return; }
    navigationRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const update = () => document.documentElement.style.setProperty('--site-header-height', `${header.getBoundingClientRect().height}px`);
    update();
    if (!('ResizeObserver' in window)) return;
    const observer = new ResizeObserver(update);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    menuPanel.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const close = () => { setMenuOpen(false); menuButton.current?.focus(); };
    const keydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') {
        const elements = [menuButton.current, ...Array.from(menuPanel.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])].filter(Boolean) as HTMLElement[];
        const first = elements[0]; const last = elements[elements.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    const resize = () => { if (window.innerWidth > 800) close(); };
    window.addEventListener('keydown', keydown);
    window.addEventListener('resize', resize);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', keydown); window.removeEventListener('resize', resize); };
  }, [menuOpen]);

  function saveLocale(nextLocale: Locale) {
    try { localStorage.setItem('casa4-language', nextLocale); } catch { /* Navegação funciona mesmo com armazenamento indisponível. */ }
    setMenuOpen(false);
  }

  return (
    <>
      <a className="skip-link" href="#main-content">{d.nav.skip}</a>
      <header ref={headerRef} className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container header-inner">
          <Brand locale={locale} />
          <nav ref={navigationRef} id="site-navigation" className="desktop-nav" aria-label={d.nav.navigation} tabIndex={-1}>
            <Link href={`/${locale}/`} aria-current={!portfolio ? 'page' : undefined}>{d.nav.home}</Link>
            <Link href={`/${locale}/portfolio/`} aria-current={portfolio ? 'page' : undefined}>{d.nav.portfolio}</Link>
          </nav>
          <div className="header-actions">
            <nav className="language-switch" aria-label={d.nav.language}>
              <Globe2 size={16} aria-hidden="true" />
              {locales.map(l => <Link key={l} href={`/${l}/${portfolio ? 'portfolio/' : ''}`} hrefLang={htmlLanguages[l]} lang={htmlLanguages[l]} aria-label={`${d.nav.language}: ${localeNames[l]}`} aria-current={l === locale ? 'true' : undefined} onClick={() => saveLocale(l)}>{l.toUpperCase()}</Link>)}
            </nav>
            <AccessibilityControls locale={locale} labels={accessibilityLabels} onOpen={closeMenu} onNavigation={focusNavigation} />
            <a className="header-contact" href={whatsappUrl(locale)} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} aria-hidden="true" />{d.nav.talk}</a>
            <button ref={menuButton} className="menu-toggle" onClick={() => setMenuOpen(o => !o)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? d.nav.closeMenu : d.nav.menu}>{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
          </div>
        </div>
      </header>
      <div className="mobile-menu-backdrop" hidden={!menuOpen} onClick={() => { setMenuOpen(false); menuButton.current?.focus(); }} />
      <nav ref={menuPanel} id="mobile-menu" className="mobile-menu" hidden={!menuOpen} aria-label={d.nav.navigation}>
        <Link href={`/${locale}/`} onClick={() => setMenuOpen(false)} aria-current={!portfolio ? 'page' : undefined}><span>01</span>{d.nav.home}</Link>
        <Link href={`/${locale}/portfolio/`} onClick={() => setMenuOpen(false)} aria-current={portfolio ? 'page' : undefined}><span>02</span>{d.nav.portfolio}</Link>
        <a href={whatsappUrl(locale)} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}><MessageCircle size={20} />{d.nav.talk}</a>
      </nav>
    </>
  );
}
