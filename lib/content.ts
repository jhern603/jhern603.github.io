import projectsData from '@/content/projects.json';
import siteData from '@/content/site.json';

export type Tone = 'default' | 'accent' | 'dim' | 'error';
export type Line = { text: string; tone?: Tone };
export type LineInput = string | Line;

export type Section = {
  label: string;
  file: string;
  command: string;
  output: LineInput[];
  prose: string;
};

export type Project = {
  slug: string;
  title: string;
  tag: string;
  year: string;
  shipped: string;
  role: string;
  summary: string;
  stack: string[];
  links?: { label: string; href: string }[];
  sections: Section[];
};

/** A project with its display number ("01", "02"…) derived from its position in projects.json. */
export type NumberedProject = Project & { no: string };

export type Job = {
  company: string;
  role: string;
  dates: string;
  location: string;
  points: string[];
};

export type Site = {
  name: string;
  role: string;
  bio: string;
  /** Search result and social preview text; bio is the on-page voice. */
  description: string;
  domain: string;
  email: string;
  links: { github: string; linkedin: string; photos: string; blog: string; resume: string };
  portrait: string;
  /** Photo ids from links.photos for the home page grid; thumbnails and deep links are built from the id. */
  photos: { id: string; title: string }[];
  stack: { name: string; items: string[] }[];
  experience: Job[];
  quickCommands: { label: string; command: string }[];
};

export const pad = (n: number) => String(n).padStart(2, '0');

export const toLine = (l: LineInput): Line => (typeof l === 'string' ? { text: l } : l);

function validate(list: Project[]): NumberedProject[] {
  const seen = new Set<string>();
  return list.map((p, i) => {
    const where = `content/projects.json → projects[${i}]${p?.title ? ` (${p.title})` : ''}`;
    for (const key of ['slug', 'title', 'tag', 'year', 'shipped', 'role', 'summary'] as const) {
      if (typeof p[key] !== 'string' || !p[key]) throw new Error(`${where}: "${key}" must be a non-empty string`);
    }
    if (!/^[a-z0-9-]+$/.test(p.slug)) throw new Error(`${where}: "slug" may only use lowercase letters, digits and dashes`);
    if (seen.has(p.slug)) throw new Error(`${where}: duplicate slug "${p.slug}"`);
    seen.add(p.slug);
    if (!Array.isArray(p.stack)) throw new Error(`${where}: "stack" must be an array of strings`);
    if (!Array.isArray(p.sections) || !p.sections.length) throw new Error(`${where}: "sections" needs at least one entry`);
    return { ...p, no: pad(i + 1) };
  });
}

export const site = siteData as Site;
export const projects: NumberedProject[] = validate((projectsData as { projects: Project[] }).projects);

export const getProject = (slug: string) => projects.find(p => p.slug === slug);
