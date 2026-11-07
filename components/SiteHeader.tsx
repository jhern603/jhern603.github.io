'use client';

import { useEffect, useRef, useState } from 'react';
import { site } from '@/lib/content';
import { NewTabMark } from './NewTabMark';

const NAV = [
  ['about', 'ABOUT'],
  ['terminal', 'TERMINAL'],
  ['experience', 'EXPERIENCE'],
  ['work', 'WORK'],
  ['photos', 'PHOTOS'],
  ['resume', 'RESUME'],
  ['contact', 'CONTACT'],
] as const;

/** Home page top bar: section links on desktop, a MENU dropdown on mobile. */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.menu-btn')) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      button.current?.focus();
    };
    document.addEventListener('click', close);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', close);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className="topbar">
      <a className="brand" href="#about">{site.name.toUpperCase()}</a>
      <nav className={`nav${open ? ' is-open' : ''}`} id="nav" aria-label="Sections">
        {NAV.map(([id, label]) => (
          <a key={id} className="link" href={`#${id}`}>{label}</a>
        ))}
        <a className="link" href={site.links.blog} target="_blank" rel="noopener noreferrer">BLOG <NewTabMark /></a>
      </nav>
      <button ref={button} className="menu-btn" type="button" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(o => !o)}>
        MENU <span aria-hidden="true">☰</span>
      </button>
    </header>
  );
}
