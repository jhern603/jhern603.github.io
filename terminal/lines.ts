import type { CommandContext, Line } from './types';

/** Colored output lines. Plain strings print in the default color. */
export const accent = (text: string): Line => ({ text, tone: 'accent' });
export const dim = (text: string): Line => ({ text, tone: 'dim' });
export const error = (text: string): Line => ({ text, tone: 'error' });

/**
 * Resolves a project from the first argument, by number (`2`) or slug (`leak-watch`).
 * Returns the project, or a usage line to print when it doesn't match.
 */
export function projectFromArgs(ctx: CommandContext, verb: string) {
  const arg = ctx.args[0] ?? '';
  const n = Number.parseInt(arg, 10);
  const project = /^\d+$/.test(arg) ? ctx.projects[n - 1] : ctx.projects.find(p => p.slug === arg.toLowerCase());
  return project
    ? { project, index: ctx.projects.indexOf(project) + 1 }
    : { usage: dim(`usage: ${verb} <1-${ctx.projects.length}>`) };
}
