import type { Metadata } from 'next';
import { site, type NumberedProject } from '@/lib/content';

export const siteUrl = `https://${site.domain}`;
export const siteTitle = `${site.name} — ${site.role}`;

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;
const ogImage = { url: '/og.jpg', width: 1200, height: 630, alt: siteTitle };

/** Canonical URL and social cards. Next replaces openGraph wholesale per page, so each page builds the full set here. */
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    alternates: { canonical: path },
    openGraph: { type: 'website', locale: 'en_US', siteName: site.name, title, description, url: path, images: [ogImage] },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage.url] },
  };
}

export function homeJsonLd() {
  const employer = site.experience.find(job => /current/i.test(job.dates));
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': websiteId, url: siteUrl, name: site.name, publisher: { '@id': personId } },
      {
        '@type': 'Person',
        '@id': personId,
        name: site.name,
        url: siteUrl,
        image: `${siteUrl}${site.portrait}`,
        jobTitle: employer?.role ?? site.role,
        description: site.description,
        ...(employer && { worksFor: { '@type': 'Organization', name: employer.company } }),
        sameAs: [site.links.linkedin, site.links.blog, site.links.photos],
        knowsAbout: site.stack.flatMap(group => group.items),
      },
    ],
  };
}

export function projectJsonLd(p: NumberedProject) {
  const url = `${siteUrl}/work/${p.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${url}#project`,
        name: p.title,
        headline: p.title,
        description: p.summary,
        url,
        dateCreated: p.year,
        keywords: p.stack.join(', '),
        author: { '@type': 'Person', '@id': personId, name: site.name, url: siteUrl },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: site.name, item: siteUrl },
          { '@type': 'ListItem', position: 2, name: p.title, item: url },
        ],
      },
    ],
  };
}
