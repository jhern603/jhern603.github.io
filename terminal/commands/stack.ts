import { defineCommand } from '../types';

export default defineCommand({
  name: 'stack',
  description: 'tools & tech',
  run: ({ site }) => site.stack.map(g => `${g.name.toLowerCase()}:\n  ${g.items.join(', ')}`),
});
