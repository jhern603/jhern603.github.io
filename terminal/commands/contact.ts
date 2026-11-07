import { defineCommand } from '../types';

const display = (href: string, fallback: string) => (href && href !== '#' ? href.replace(/^https?:\/\/(www\.)?/, '') : fallback);

export default defineCommand({
  name: 'contact',
  description: 'ways to reach me',
  run: ({ site }) => [
    'email     ' + site.email,
    ...Object.entries(site.links).map(([k, v]) =>
      k === 'resume'
        ? k.padEnd(10) + display(`${site.domain}${v}`, '(coming soon)')
        : k.padEnd(10) + display(v, '(coming soon)'),
    ),
  ],
});
