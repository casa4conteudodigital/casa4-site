import type { Locale } from './i18n';

const pt = {
  open: 'Acessibilidade', close: 'Fechar acessibilidade', title: 'Acessibilidade',
  introduction: 'Ajuste a leitura e navegue do seu jeito.',
  theme: 'Aparência', themes: { dark: 'Escuro', light: 'Claro', system: 'Automático' },
  fontSize: 'Tamanho do texto', decrease: 'Diminuir o tamanho do texto', increase: 'Aumentar o tamanho do texto',
  fontFamily: 'Tipo de fonte', fonts: { original: 'Original da Casa4', arial: 'Arial', verdana: 'Verdana' },
  motion: 'Reduzir animações', keyboard: 'Ativar atalhos de teclado',
  shortcutsTitle: 'Acesso rápido', shortcutsHelp: 'Use Alt + Shift e a tecla indicada. Escape fecha este painel.',
  commands: { panel: 'Abrir acessibilidade', main: 'Ir para o conteúdo', navigation: 'Ir para a navegação', portfolio: 'Abrir Portfólio', contact: 'Ir para o contato', theme: 'Alternar claro / escuro' },
  reset: 'Restaurar preferências', saved: 'As preferências ficam salvas neste navegador.', sessionOnly: 'Preferências aplicadas nesta visita.',
};
export type AccessibilityLabels = typeof pt;
const en: AccessibilityLabels = {
  open: 'Accessibility', close: 'Close accessibility', title: 'Accessibility',
  introduction: 'Adjust your reading experience and navigate your way.',
  theme: 'Appearance', themes: { dark: 'Dark', light: 'Light', system: 'Automatic' },
  fontSize: 'Text size', decrease: 'Decrease text size', increase: 'Increase text size',
  fontFamily: 'Font family', fonts: { original: 'Casa4 original', arial: 'Arial', verdana: 'Verdana' },
  motion: 'Reduce animations', keyboard: 'Enable keyboard shortcuts',
  shortcutsTitle: 'Quick access', shortcutsHelp: 'Press Alt + Shift and the indicated key. Escape closes this panel.',
  commands: { panel: 'Open accessibility', main: 'Skip to content', navigation: 'Go to navigation', portfolio: 'Open Portfolio', contact: 'Go to contact', theme: 'Switch light / dark' },
  reset: 'Reset preferences', saved: 'Preferences are saved in this browser.', sessionOnly: 'Preferences applied for this visit.',
};
const es: AccessibilityLabels = {
  open: 'Accesibilidad', close: 'Cerrar accesibilidad', title: 'Accesibilidad',
  introduction: 'Ajusta la lectura y navega a tu manera.',
  theme: 'Apariencia', themes: { dark: 'Oscuro', light: 'Claro', system: 'Automático' },
  fontSize: 'Tamaño del texto', decrease: 'Reducir el tamaño del texto', increase: 'Aumentar el tamaño del texto',
  fontFamily: 'Tipo de fuente', fonts: { original: 'Original de Casa4', arial: 'Arial', verdana: 'Verdana' },
  motion: 'Reducir animaciones', keyboard: 'Activar atajos de teclado',
  shortcutsTitle: 'Acceso rápido', shortcutsHelp: 'Usa Alt + Shift y la tecla indicada. Escape cierra este panel.',
  commands: { panel: 'Abrir accesibilidad', main: 'Ir al contenido', navigation: 'Ir a la navegación', portfolio: 'Abrir Portafolio', contact: 'Ir al contacto', theme: 'Alternar claro / oscuro' },
  reset: 'Restablecer preferencias', saved: 'Las preferencias se guardan en este navegador.', sessionOnly: 'Preferencias aplicadas en esta visita.',
};
const labels: Record<Locale, AccessibilityLabels> = { pt, en, es };
export function getAccessibilityLabels(locale: Locale) { return labels[locale]; }
