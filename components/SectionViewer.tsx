'use client';

import { useEffect, useState } from 'react';
import { pad, toLine, type NumberedProject } from '@/lib/content';
import { useTerminal } from '@/terminal/TerminalProvider';
import { Dots } from './Dots';

/** Project page body: section list (hover/click) or chips on mobile, and the terminal panel for the chosen section. */
export function SectionViewer({ project }: { project: NumberedProject }) {
  const { setLastViewed } = useTerminal();
  const [active, setActive] = useState(0);
  const sections = project.sections;
  const s = sections[active];

  useEffect(() => setLastViewed(project.slug), [project.slug, setLastViewed]);

  return (
    <section className="d-body" aria-label="Project details">
      <div className="sec-list">
        {sections.map((x, i) => (
          <button key={x.label} type="button" className={`pick${i === active ? ' is-active' : ''}`} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)}>
            <span className="caret" aria-hidden="true">▶</span>
            <span className="pick-key">{pad(i + 1)}</span>
            <span className="pick-label cond">{x.label}</span>
          </button>
        ))}
      </div>
      <div className="chips sec-chips">
        {sections.map((x, i) => (
          <button key={x.label} type="button" className={`chip${i === active ? ' is-active' : ''}`} onClick={() => setActive(i)}>
            {x.label}
          </button>
        ))}
      </div>
      <div className="d-panel">
        <div className="term">
          <div className="term-bar">
            <Dots />
            <span>
              <span className="long">~/{project.slug}/</span>
              {s.file}
            </span>
            <span>{active + 1}/{sections.length}</span>
          </div>
          <div className="d-term-out">
            <div>
              <span className="prompt">
                <span className="long">jose@sys:~$ </span>
                <span className="short">~$ </span>
              </span>
              {s.command}
            </div>
            {s.output.map(toLine).map((l, i) => (
              <div key={i} className={`ln tone-${l.tone ?? 'default'}`}>{l.text || ' '}</div>
            ))}
            <div className="cursor-line">
              <span className="prompt">jose@sys:~$ </span>
              <span className="cursor" aria-hidden="true" />
            </div>
          </div>
        </div>
        <p className="d-prose">{s.prose}</p>
      </div>
    </section>
  );
}
