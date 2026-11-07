import { defineCommand } from '../types';
import { dim } from '../lines';

export default defineCommand({
  name: 'projects',
  description: 'list selected work',
  aliases: ['ls', 'work'],
  run: ({ projects }) => [
    ...projects.map((p, i) => `  [${i + 1}] ${p.title.padEnd(16)}${p.tag}`),
    dim("Type 'about 1' for a summary or 'open 1' for the full page."),
  ],
});
