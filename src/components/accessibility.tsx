'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Accessibility as AccessibilityIcon, X, Moon, Sun, Monitor, Minus, Plus, RotateCcw } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import type { AccessibilityLabels } from '@/lib/accessibility-i18n';
import {
  DEFAULT_PREFERENCES, PREFERENCES_KEY, SHORTCUTS, TEXT_SIZES,
  applyPreferences, nextTextSize, readPreferences, shortcutAction, writePreferences,
  type AccessibilityPreferences, type FontChoice, type ShortcutAction, type ThemeChoice,
} from '@/lib/accessibility-preferences';

function localPreferencesStorage(): Storage | null {
  try { return window.localStorage; } catch { return null; }
}

export function AccessibilityControls({ locale, labels, onOpen, onNavigation }: {
  locale: Locale;
  labels: AccessibilityLabels;
  onOpen: () => void;
  onNavigation: () => void;
}) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [settings, setSettings] = useState<AccessibilityPreferences>(DEFAULT_PREFERENCES);
  const [loaded, setLoaded] = useState(false);
  const [stored, setStored] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSettings(readPreferences(localPreferencesStorage()));
    setLoaded(true);
    const synchronize = (event: StorageEvent) => {
      if (event.key === PREFERENCES_KEY || event.key === null) setSettings(readPreferences(localPreferencesStorage()));
    };
    window.addEventListener('storage', synchronize);
    return () => window.removeEventListener('storage', synchronize);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => applyPreferences(settings, document.documentElement, media.matches);
    update();
    setStored(writePreferences(localPreferencesStorage(), settings));
    if (settings.theme !== 'system') return;
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [loaded, settings]);

  const openPanel = useCallback(() => {
    onOpen();
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    setOpen(true);
  }, [onOpen]);

  const closePanel = useCallback(() => {
    dialogRef.current?.close();
    setOpen(false);
  }, []);

  const performAction = useCallback((action: ShortcutAction) => {
    if (action === 'panel') { openPanel(); return; }
    if (action === 'theme') {
      const current = document.documentElement.dataset.theme;
      setSettings(previous => ({ ...previous, theme: current === 'dark' ? 'light' : 'dark' }));
      return;
    }
    closePanel();
    if (action === 'portfolio') { router.push(`/${locale}/portfolio/`); return; }
    requestAnimationFrame(() => {
      if (action === 'navigation') { onNavigation(); return; }
      const target = document.getElementById(action === 'contact' ? 'contato' : 'main-content');
      target?.focus({ preventScroll: true });
      target?.scrollIntoView({ block: 'start' });
    });
  }, [closePanel, locale, onNavigation, openPanel, router]);

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      const target = event.target;
      const editing = target instanceof Element && Boolean(target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"]'));
      const action = shortcutAction(event, settings.shortcuts, editing);
      if (!action) return;
      // Não retira o foco de outro diálogo, como os detalhes de um projeto.
      const activeDialog = document.querySelector('dialog[open]');
      if (activeDialog && activeDialog !== dialogRef.current) return;
      event.preventDefault();
      performAction(action);
    };
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, [performAction, settings.shortcuts]);

  const themes: { id: ThemeChoice; Icon: typeof Moon }[] = [
    { id: 'dark', Icon: Moon }, { id: 'light', Icon: Sun }, { id: 'system', Icon: Monitor },
  ];

  return <>
    <button type="button" className="accessibility-trigger" onClick={openPanel}
      aria-label={labels.open} title={`${labels.open}${settings.shortcuts ? ' · Alt + Shift + A' : ''}`}
      aria-controls="accessibility-panel" aria-haspopup="dialog" aria-expanded={open}
      aria-keyshortcuts={settings.shortcuts ? 'Alt+Shift+A' : undefined}>
      <AccessibilityIcon size={21} aria-hidden="true" />
    </button>
    <dialog ref={dialogRef} id="accessibility-panel" className="accessibility-panel"
      aria-labelledby="accessibility-title" aria-describedby="accessibility-introduction"
      onClose={() => setOpen(false)} onCancel={() => setOpen(false)}
      onClick={event => {
        if (event.target !== dialogRef.current) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closePanel();
      }}>
      <button type="button" className="accessibility-close" onClick={closePanel} aria-label={labels.close} autoFocus><X size={22} aria-hidden="true" /></button>
      <div className="accessibility-heading"><AccessibilityIcon size={23} aria-hidden="true" /><h2 id="accessibility-title">{labels.title}</h2></div>
      <p id="accessibility-introduction" className="accessibility-introduction">{labels.introduction}</p>

      <fieldset className="accessibility-fieldset"><legend>{labels.theme}</legend><div className="theme-options">{themes.map(({ id, Icon }) => <label key={id} className="theme-option"><input type="radio" name="casa4-theme" value={id} checked={settings.theme === id} onChange={() => setSettings(previous => ({ ...previous, theme: id }))} /><Icon size={18} aria-hidden="true" /><span>{labels.themes[id]}</span></label>)}</div></fieldset>

      <div className="accessibility-field"><p id="font-size-label" className="accessibility-label">{labels.fontSize}</p><div className="font-stepper" role="group" aria-labelledby="font-size-label"><button type="button" aria-label={labels.decrease} disabled={settings.textSize === TEXT_SIZES[0]} onClick={() => setSettings(previous => ({ ...previous, textSize: nextTextSize(previous.textSize, -1) }))}><Minus size={20} aria-hidden="true" /><span aria-hidden="true">A</span></button><output aria-live="polite" aria-atomic="true">{settings.textSize}%</output><button type="button" aria-label={labels.increase} disabled={settings.textSize === TEXT_SIZES[TEXT_SIZES.length - 1]} onClick={() => setSettings(previous => ({ ...previous, textSize: nextTextSize(previous.textSize, 1) }))}><span aria-hidden="true">A</span><Plus size={20} aria-hidden="true" /></button></div></div>

      <div className="accessibility-field"><label htmlFor="casa4-font-family" className="accessibility-label">{labels.fontFamily}</label><select id="casa4-font-family" value={settings.fontFamily} onChange={event => setSettings(previous => ({ ...previous, fontFamily: event.target.value as FontChoice }))}>{(Object.keys(labels.fonts) as FontChoice[]).map(font => <option key={font} value={font}>{labels.fonts[font]}</option>)}</select></div>

      <div className="accessibility-toggles"><label><input type="checkbox" checked={settings.reducedMotion} onChange={event => { const reducedMotion = event.target.checked; setSettings(previous => ({ ...previous, reducedMotion })); }} /><span>{labels.motion}</span></label><label><input type="checkbox" checked={settings.shortcuts} onChange={event => { const shortcuts = event.target.checked; setSettings(previous => ({ ...previous, shortcuts })); }} /><span>{labels.keyboard}</span></label></div>

      <section className="accessibility-shortcuts" aria-labelledby="accessibility-shortcuts-title"><h3 id="accessibility-shortcuts-title">{labels.shortcutsTitle}</h3><p>{labels.shortcutsHelp}</p><div className="shortcut-list">{SHORTCUTS.map(({ key, action }) => <button type="button" key={key} onClick={() => performAction(action)} aria-keyshortcuts={settings.shortcuts ? `Alt+Shift+${key}` : undefined}><span>{labels.commands[action]}</span><kbd>Alt + Shift + {key}</kbd></button>)}</div></section>
      <div className="accessibility-bottom"><button type="button" className="accessibility-reset" onClick={() => setSettings({ ...DEFAULT_PREFERENCES })}><RotateCcw size={16} aria-hidden="true" />{labels.reset}</button><p>{stored ? labels.saved : labels.sessionOnly}</p></div>
    </dialog>
  </>;
}
