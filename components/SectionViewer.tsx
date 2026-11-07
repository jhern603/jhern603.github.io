'use client';

import { useEffect, useState } from 'react';
import { pad, toLine, type NumberedProject } from '@/lib/content';
import { useTerminal } from '@/terminal/TerminalProvider';
import { Dots } from './Dots';

const PANEL_ID = 'section-panel';

/** Project page body: section list (hover/click) or chips on mobile, and the terminal panel for the chosen section. */
export function SectionViewer({ project }: { project: NumberedProject }) {
  const { setLastViewed } = useTerminal();
  const [active, setActive] = useState(0);
  const sections = project.sections;
  const s = sections[active];

  useEffect(() => setLastViewed(project.slug), [project.slug, setLastViewed]);

  // Tab pattern: arrows, Home and End move between sections; Tab goes on to the panel.
  const onTabKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = sections.length - 1;
    const next = i === last ? 0 : i + 1;
    const prev = i === 0 ? last : i - 1;
    const target = { ArrowDown: next, ArrowRight: next, ArrowUp: prev, ArrowLeft: prev, Home: 0, End: last }[e.key];
    if (target === undefined) return;
    e.preventDefault();
    setActive(target);
    (e.currentTarget.parentElement?.children[target] as HTMLElement | undefined)?.focus();
  };

  const tabProps = (i: number) => ({
    type: 'button' as const,
    role: 'tab',
    'aria-selected': i === active,
    'aria-controls': PANEL_ID,
    tabIndex: i === active ? 0 : -1,
    onClick: () => setActive(i),
    onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => onTabKey(e, i),
  });

  return (
    <section className="d-body" aria-label="Project details">
      <div className="sec-list" role="tablist" aria-label="Project sections" aria-orientation="vertical">
        {sections.map((x, i) => (
          <button key={x.label} {...tabProps(i)} className={`pick${i === active ? ' is-active' : ''}`} onMouseEnter={() => setActive(i)}>
            <span className="caret" aria-hidden="true">▶</span>
            <span className="pick-key">{pad(i + 1)}</span>
            <span className="pick-label cond">{x.label}</span>
          </button>
        ))}
      </div>
      <div className="chips sec-chips" role="tablist" aria-label="Project sections">
        {sections.map((x, i) => (
          <button key={x.label} {...tabProps(i)} className={`chip${i === active ? ' is-active' : ''}`}>
            {x.label}
          </button>
        ))}
      </div>
      <div className="d-panel" id={PANEL_ID} role="tabpanel" aria-label={s.label} tabIndex={0}>
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
            <div className="cursor-line" aria-hidden="true">
              <span className="prompt">jose@sys:~$ </span>
              <span className="cursor" aria-hidden="true" />
            </div>
          </div>
        </div>
        {/* Every section stays in the HTML so crawlers can read tabs that aren't open. */}
        {sections.map((x, i) => (
          <div key={x.label} hidden={i !== active}>
            <h2 className="sr-only">{x.label}</h2>
            <p className="d-prose">{x.prose}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
