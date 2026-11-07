import type { MetadataRoute } from 'next';
import { projects } from '@/lib/content';
import { siteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl }, ...projects.map(p => ({ url: `${siteUrl}/work/${p.slug}` }))];
}
