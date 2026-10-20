'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    // Conteúdo fica visível sem JavaScript. Só anima o que ainda está abaixo da tela.
    if (element.getBoundingClientRect().top < window.innerHeight) return;
    element.classList.add('reveal-pending');
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) { element.classList.remove('reveal-pending'); element.classList.add('reveal-visible'); observer.unobserve(element); }
    }, { threshold: 0.08 });
    observer.observe(element);
    return () => { observer.disconnect(); element.classList.remove('reveal-pending'); };
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>{children}</div>;
}
