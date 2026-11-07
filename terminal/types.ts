import type { Line, LineInput, NumberedProject, Site } from '@/lib/content';

export type { Line, LineInput };

/** What a command may return: one line, several lines, or nothing. Strings are plain lines. */
export type CommandOutput = LineInput | LineInput[] | void;

export type CommandContext = {
  /** Words after the command name: `open 2` → ['2']. */
  args: string[];
  /** Everything after the command name, unsplit: `echo  hi there` → ' hi there'. */
  rest: string;
  site: Site;
  projects: NumberedProject[];
  /** Every registered command, in registry order (used by `help`). */
  commands: readonly Command[];
  /** Go to a page in the site, e.g. navigate('/work/leak-watch'). */
  navigate: (href: string) => void;
  /** Wipe the terminal screen. */
  clear: () => void;
};

export type Command = {
  /** What the visitor types. Lowercase, no spaces. */
  name: string;
  /** One-line description shown by `help`. */
  description: string;
  /** How it is used, shown by `help` in place of the name, e.g. 'open <n>'. */
  usage?: string;
  /** Other names that run the same command. */
  aliases?: string[];
  /** Leave out of `help` (easter eggs). */
  hidden?: boolean;
  /** Runs the command. May be async, e.g. to fetch something. Throwing prints the error. */
  run: (ctx: CommandContext) => CommandOutput | Promise<CommandOutput>;
};

/** Identity helper so command files get type checking and autocomplete. */
export const defineCommand = (command: Command): Command => command;
