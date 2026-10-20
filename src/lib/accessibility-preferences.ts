export const PREFERENCES_KEY = 'casa4-accessibility-v1';
export const TEXT_SIZES = [100, 110, 125, 150, 175, 200] as const;
export type TextSize = (typeof TEXT_SIZES)[number];
export type ThemeChoice = 'dark' | 'light' | 'system';
export type FontChoice = 'original' | 'arial' | 'verdana';
export type AccessibilityPreferences = {
  theme: ThemeChoice;
  textSize: TextSize;
  fontFamily: FontChoice;
  reducedMotion: boolean;
  shortcuts: boolean;
};
export const DEFAULT_PREFERENCES: AccessibilityPreferences = {
  theme: 'dark', textSize: 100, fontFamily: 'original', reducedMotion: false, shortcuts: true,
};

type PreferenceStorage = Pick<Storage, 'getItem' | 'setItem'>;

export function sanitizePreferences(value: unknown): AccessibilityPreferences {
  const data = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  return {
    theme: typeof data.theme === 'string' && ['dark', 'light', 'system'].includes(data.theme) ? data.theme as ThemeChoice : 'dark',
    textSize: TEXT_SIZES.includes(data.textSize as TextSize) ? data.textSize as TextSize : 100,
    fontFamily: typeof data.fontFamily === 'string' && ['original', 'arial', 'verdana'].includes(data.fontFamily) ? data.fontFamily as FontChoice : 'original',
    reducedMotion: data.reducedMotion === true,
    shortcuts: data.shortcuts !== false,
  };
}

export function readPreferences(storage: PreferenceStorage | null): AccessibilityPreferences {
  try { return sanitizePreferences(JSON.parse(storage?.getItem(PREFERENCES_KEY) ?? 'null')); }
  catch { return { ...DEFAULT_PREFERENCES }; }
}

export function writePreferences(storage: PreferenceStorage | null, settings: AccessibilityPreferences): boolean {
  try {
    if (!storage) return false;
    storage.setItem(PREFERENCES_KEY, JSON.stringify(sanitizePreferences(settings)));
    return true;
  } catch { return false; }
}

export function applyPreferences(settings: AccessibilityPreferences, root: HTMLElement, systemDark: boolean) {
  const safe = sanitizePreferences(settings);
  root.dataset.theme = safe.theme === 'system' ? (systemDark ? 'dark' : 'light') : safe.theme;
  root.dataset.fontFamily = safe.fontFamily;
  root.dataset.textSize = String(safe.textSize);
  root.dataset.motion = safe.reducedMotion ? 'reduce' : 'system';
  // Percentual preserva o tamanho padrão configurado pela pessoa no navegador.
  root.style.fontSize = `${safe.textSize}%`;
}

export function nextTextSize(current: TextSize, direction: -1 | 1): TextSize {
  const index = TEXT_SIZES.indexOf(current);
  return TEXT_SIZES[Math.max(0, Math.min(TEXT_SIZES.length - 1, index + direction))];
}

export type ShortcutAction = 'panel' | 'main' | 'navigation' | 'portfolio' | 'contact' | 'theme';
export const SHORTCUTS: { key: string; action: ShortcutAction }[] = [
  { key: 'A', action: 'panel' }, { key: 'M', action: 'main' },
  { key: 'N', action: 'navigation' }, { key: 'P', action: 'portfolio' },
  { key: 'C', action: 'contact' }, { key: 'T', action: 'theme' },
];

type ShortcutEvent = Pick<KeyboardEvent, 'code' | 'key' | 'altKey' | 'shiftKey' | 'ctrlKey' | 'metaKey' | 'isComposing' | 'defaultPrevented'>;
export function shortcutAction(event: ShortcutEvent, enabled: boolean, editing: boolean): ShortcutAction | undefined {
  if (!enabled || editing || event.defaultPrevented || event.isComposing || !event.altKey || !event.shiftKey || event.ctrlKey || event.metaKey) return;
  const key = event.code.startsWith('Key') ? event.code.slice(3) : event.key.toUpperCase();
  return SHORTCUTS.find(shortcut => shortcut.key === key)?.action;
}

// Executado antes da hidratação para reaplicar as escolhas sem piscar o tema.
// Valores aceitos coincidem com sanitizePreferences; nenhuma informação é enviada.
export const preferenceBootstrap = `(()=>{try{var p=JSON.parse(localStorage.getItem('${PREFERENCES_KEY}')||'null')||{},r=document.documentElement,t=['dark','light','system'].includes(p.theme)?p.theme:'dark',s=${JSON.stringify(TEXT_SIZES)}.includes(p.textSize)?p.textSize:100;r.dataset.theme=t==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t;r.dataset.fontFamily=['original','arial','verdana'].includes(p.fontFamily)?p.fontFamily:'original';r.dataset.textSize=String(s);r.dataset.motion=p.reducedMotion===true?'reduce':'system';r.style.fontSize=s+'%'}catch{}})();`;
