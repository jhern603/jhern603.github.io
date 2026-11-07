'use client';

import { useEffect, useRef, useState } from 'react';
import { useTerminal } from '@/terminal/TerminalProvider';
import { Dots } from './Dots';

export function Terminal() {
  const { lines, run, recall, inputRef } = useTerminal();
  const outRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('');
  const [shortcut, setShortcut] = useState('CTRL+K');

  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) setShortcut('⌘K');
  }, []);

  useEffect(() => {
    const out = outRef.current;
    if (out) out.scrollTop = out.scrollHeight;
  }, [lines]);

  // Arriving from another page via ⌘K (/#terminal) focuses the input.
  useEffect(() => {
    if (location.hash === '#terminal') inputRef.current?.focus({ preventScroll: true });
  }, [inputRef]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(value);
      setValue('');
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      setValue(recall(e.key === 'ArrowUp' ? -1 : 1));
    }
  };

  const focusInput = () => {
    if (!String(getSelection())) inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <div className="term">
      <div className="term-bar">
        <Dots />
        <span>jose@sys — zsh</span>
        <span className="kbd">{shortcut}</span>
      </div>
      <div className="term-out" ref={outRef} role="log" aria-live="polite" onClick={focusInput}>
        {lines.map((l, i) => (
          <div key={i} className={`tone-${l.tone ?? 'default'}`}>{l.text}</div>
        ))}
      </div>
      <label className="term-in">
        <span className="prompt">
          <span className="long">jose@sys:~$</span>
          <span className="short">~$</span>
        </span>
        <input
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          type="text"
          placeholder="type a command…"
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          aria-label="Terminal command"
        />
      </label>
    </div>
  );
}
