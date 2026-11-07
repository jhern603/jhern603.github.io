import { defineCommand } from '../types';
import { accent, projectFromArgs } from '../lines';

export default defineCommand({
  name: 'open',
  usage: 'open <n>',
  description: 'open the project page',
  aliases: ['cd'],
  run: ctx => {
    const { project, usage } = projectFromArgs(ctx, 'open');
    if (!project) return usage;
    // Short pause so the "opening" line is visible before the page changes.
    setTimeout(() => ctx.navigate(`/work/${project.slug}`), 350);
    return accent(`→ opening ${project.slug} …`);
  },
});
