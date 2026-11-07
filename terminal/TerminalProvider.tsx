'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { projects, site, toLine, type Line } from '@/lib/content';
import { commands } from './commands';
import type { CommandOutput } from './types';
import { dim, error } from './lines';

const MAX_LINES = 80;
const PROMPT = 'jose@sys:~$ ';

type TerminalState = {
  lines: Line[];
  run: (input: string) => Promise<void>;
  /** Previous command for ArrowUp (-1) / ArrowDown (+1). */
  recall: (step: -1 | 1) => string;
  /** The terminal's input registers itself here so ⌘K / Ctrl+K can focus it. */
  inputRef: React.RefObject<HTMLInputElement | null>;
  lastViewed: string | null;
  setLastViewed: (slug: string) => void;
};

const TerminalContext = createContext<TerminalState | null>(null);

export function useTerminal() {
  const ctx = useContext(TerminalContext);
  if (!ctx) throw new Error('useTerminal must be used inside <TerminalProvider>');
  return ctx;
}

const lookup = new Map(commands.flatMap(c => [c.name, ...(c.aliases ?? [])].map(n => [n, c] as const)));

const normalize = (out: CommandOutput): Line[] => (out == null ? [] : (Array.isArray(out) ? out : [out]).map(toLine));

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const history = useRef<{ list: string[]; cursor: number }>({ list: [], cursor: 0 });
  const [lines, setLines] = useState<Line[]>([dim('Last login: on ttys001'), "Welcome. Type 'help' or pick a command."].map(toLine));
  const [lastViewed, setLastViewed] = useState<string | null>(null);

  // Date is filled in after mount so server and client HTML match.
  useEffect(() => {
    setLines(ls => ls.map((l, i) => (i === 0 && l.text === 'Last login: on ttys001' ? dim(`Last login: ${new Date().toDateString().slice(0, 10)} on ttys001`) : l)));
  }, []);

  const append = useCallback((more: Line[]) => setLines(ls => [...ls, ...more].slice(-MAX_LINES)), []);

  const run = useCallback(async (raw: string) => {
    const input = raw.trim();
    const h = history.current;
    if (input) { h.list.push(input); h.cursor = h.list.length; }
    append([{ text: PROMPT + input, tone: 'accent' }]);
    if (!input) return;

    const [name, ...args] = input.split(/\s+/);
    const command = lookup.get(name.toLowerCase());
    if (!command) return append([error(`command not found: ${name}. Type 'help'.`)]);

    try {
      const out = await command.run({
        args,
        rest: input.slice(name.length).replace(/^\s/, ''),
        site,
        projects,
        commands,
        navigate: href => router.push(href),
        clear: () => setLines([]),
      });
      append(normalize(out));
    } catch (e) {
      append([error(`${name}: ${e instanceof Error ? e.message : String(e)}`)]);
    }
  }, [append, router]);

  const recall = useCallback((step: -1 | 1) => {
    const h = history.current;
    h.cursor = Math.max(0, Math.min(h.list.length, h.cursor + step));
    return h.list[h.cursor] ?? '';
  }, []);

  // ⌘K / Ctrl+K jumps to the terminal from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== 'k') return;
      e.preventDefault();
      if (pathname !== '/') { router.push('/#terminal'); return; }
      const input = inputRef.current;
      input?.closest('section')?.scrollIntoView({ block: 'center' });
      input?.focus({ preventScroll: true });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pathname, router]);

  const value = useMemo(() => ({ lines, run, recall, inputRef, lastViewed, setLastViewed }), [lines, run, recall, lastViewed]);
  return <TerminalContext.Provider value={value}>{children}</TerminalContext.Provider>;
}
