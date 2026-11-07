import { defineCommand } from '../types';
import { accent } from '../lines';

export default defineCommand({
  name: 'whoami',
  description: 'who is this',
  run: ({ site }) => accent(`${site.name} — ${site.role}`),
});
