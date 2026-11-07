import { defineCommand } from '../types';
import { accent, dim, projectFromArgs } from '../lines';

export default defineCommand({
  name: 'about',
  usage: 'about [n]',
  description: 'short bio, or a project summary',
  run: ctx => {
    if (!ctx.args.length) return ctx.site.bio;
    const { project: p, index, usage } = projectFromArgs(ctx, 'about');
    if (!p) return usage;
    return [
      accent(`[${p.no}] ${p.title}  ·  ${p.tag}  ·  ${p.year}`),
      p.summary,
      dim('stack: ' + p.stack.join(', ')),
      dim(`Type 'open ${index}' for the full project page.`),
    ];
  },
});
