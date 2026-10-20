'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Plus, X, MessageCircle } from 'lucide-react';
import type { Dictionary, Locale } from '@/lib/i18n';
import type { LocalizedProject, ProjectCategory } from '@/lib/projects';
import { whatsappUrl } from '@/lib/site';

type Filter = 'all' | ProjectCategory;
export function PortfolioGallery({ locale, labels, projects }: { locale: Locale; labels: Dictionary['portfolio']; projects: LocalizedProject[] }) {
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<LocalizedProject | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const visible = filter === 'all' ? projects : projects.filter(p => p.category === filter);
  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: labels.all }, { id: 'content', label: labels.content },
    { id: 'education', label: labels.education }, { id: 'digital', label: labels.digital },
  ];

  useEffect(() => {
    const readHash = () => {
      const id = window.location.hash.slice(1);
      const project = projects.find(p => p.id === id);
      if (project) { setFilter('all'); setSelected(project); }
      else setSelected(null);
    };
    readHash();
    window.addEventListener('hashchange', readHash);
    window.addEventListener('popstate', readHash);
    return () => { window.removeEventListener('hashchange', readHash); window.removeEventListener('popstate', readHash); };
  }, [projects]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected && !dialog.open) dialog.showModal();
    else if (!selected && dialog.open) dialog.close();
  }, [selected]);

  function openProject(project: LocalizedProject) {
    setSelected(project);
    window.history.replaceState(window.history.state, '', `#${project.id}`);
  }
  function closeProject() {
    setSelected(null);
    if (projects.some(p => `#${p.id}` === window.location.hash)) {
      window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
    }
  }

  return <section className="portfolio-gallery container" aria-label={labels.eyebrow}>
    <div className="portfolio-toolbar"><div className="portfolio-filters" role="group" aria-label={labels.eyebrow}>{filters.map(item => <button key={item.id} onClick={() => setFilter(item.id)} aria-pressed={filter === item.id} aria-controls="portfolio-grid">{item.label}</button>)}</div><p className="project-count" role="status" aria-live="polite" aria-atomic="true">{String(visible.length).padStart(2, '0')} {visible.length === 1 ? labels.countSingle : labels.count}</p></div>
    <div className="portfolio-grid" id="portfolio-grid">
      {visible.map(project => <article key={project.id} id={project.id} className={`portfolio-card project-${project.theme}`}>
        <div className="portfolio-card-image"><span className="project-number" aria-hidden="true">/{project.number}</span><Image src={project.image} alt={project.content.alt} fill sizes="(max-width: 520px) 92vw, (max-width: 800px) 46vw, 45vw" /><span className="project-hover-label" aria-hidden="true">{labels.view}</span></div>
        <div className="project-caption"><div><p className="project-type">{project.content.type}</p><h2>{project.name}</h2><p className="project-summary">{project.content.summary}</p></div><span className="project-caption-plus" aria-hidden="true"><Plus size={22} /></span></div>
        <button className="card-hitarea" onClick={() => openProject(project)} aria-label={`${labels.view}: ${project.name}`} aria-haspopup="dialog" />
      </article>)}
    </div>
    {visible.length === 0 && <p className="empty-state">{labels.empty}</p>}
    <dialog ref={dialogRef} className="project-dialog" aria-labelledby="project-dialog-title" aria-describedby="project-dialog-description" onCancel={event => { event.preventDefault(); closeProject(); }} onClose={closeProject} onClick={event => {
      if (event.target !== dialogRef.current) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeProject();
    }}>
      <button className="dialog-close" aria-label={labels.close} onClick={closeProject} autoFocus><X size={22} /></button>
      {selected && <div className="dialog-layout"><div className={`dialog-image dialog-${selected.theme}`}><Image src={selected.image} alt={selected.content.alt} fill sizes="(max-width: 800px) 90vw, 450px" /></div><div className="dialog-copy"><p className="eyebrow">{selected.content.type}</p><h2 id="project-dialog-title">{selected.name}</h2><h3>{labels.about}</h3><p id="project-dialog-description">{selected.content.description}</p><h3>{labels.delivered}</h3><ul>{selected.content.deliverables.map(item => <li key={item}>{item}</li>)}</ul><a className="button button-yellow" href={whatsappUrl(locale)} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} aria-hidden="true" />{labels.contact}</a></div></div>}
    </dialog>
  </section>;
}
