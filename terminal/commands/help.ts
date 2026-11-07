import { defineCommand } from '../types';
import { dim } from '../lines';

// Built from the registry, so new commands show up here automatically.
export default defineCommand({
  name: 'help',
  description: 'list commands',
  aliases: ['?'],
  run: ({ commands }) => {
    const visible = commands.filter(c => !c.hidden);
    const width = Math.max(...visible.map(c => (c.usage ?? c.name).length)) + 2;
    return [dim('Available commands:'), ...visible.map(c => '  ' + (c.usage ?? c.name).padEnd(width) + c.description + (c.aliases?.length ? ` (aliases: ${c.aliases.join(', ')})` : ''))];
  },
});
