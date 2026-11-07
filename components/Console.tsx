'use client';

import { useState } from 'react';
import { site } from '@/lib/content';
import { useTerminal } from '@/terminal/TerminalProvider';
import { Terminal } from './Terminal';

/** Home page terminal block: quick-command list (desktop) or chips (mobile) beside the terminal. */
export function Console() {
  const { run } = useTerminal();
  const [active, setActive] = useState(0);

  return (
    <section className="console" id="terminal" aria-label="Terminal">
      <div>
        <div className="cmd-list">
          {site.quickCommands.map((q, i) => (
            <button key={q.command} type="button" className={`pick${i === active ? ' is-active' : ''}`} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => run(q.command)}>
              <span className="caret" aria-hidden="true">▶</span>
              <span className="pick-key" aria-hidden="true">{q.command}</span>
              <span className="pick-label cond">{q.label}</span>
            </button>
          ))}
        </div>
        <p className="hint">Click to run, or type in the terminal.</p>
        <div className="chips">
          {site.quickCommands.map(q => (
            <button key={q.command} type="button" className="chip" onClick={() => run(q.command)}>
              {q.command}
            </button>
          ))}
        </div>
      </div>
      <Terminal />
    </section>
  );
}
