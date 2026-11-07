import type { Command } from '../types';

import help from './help';
import whoami from './whoami';
import about from './about';
import projects from './projects';
import open from './open';
import stack from './stack';
import contact from './contact';
import clear from './clear';
import sudo from './sudo';

/**
 * Every command the terminal knows. To add one:
 *   1. Create a file in this folder that default-exports defineCommand({ ... })
 *   2. Import it above and add it to this list.
 * `help` lists commands in this order.
 */
export const commands: readonly Command[] = [help, whoami, about, projects, open, stack, contact, clear, sudo];
