import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject, pad, projects, site } from '@/lib/content';
import { pageMetadata, projectJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { NewTabMark } from '@/components/NewTabMark';
import { Footer } from '@/components/Footer';
import { SectionViewer } from '@/components/SectionViewer';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    ...pageMetadata(`${p.title} — ${site.name}`, p.summary, `/work/${p.slug}`),
  };
}

export default async function ProjectPage({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];

  return (
    <>
      <JsonLd data={projectJsonLd(p)} />
      <header className="topbar is-detail">
        <Link className="brand" href="/">
          {site.name.toUpperCase()}
        </Link>
        <Link className="link back" href="/#work">
          <span aria-hidden="true">←</span> ALL WORK
        </Link>
        <span>
          <span className="hide-m">PROJECT </span>
          {p.no} / {pad(projects.length)}
        </span>
      </header>
      <main id="main" tabIndex={-1}>
        <section className="d-hero">
          <div className="stripe" aria-hidden="true" />
          <div className="d-ghost cond" aria-hidden="true">
            {p.no.replace('0','')}
          </div>
          <h1 className="cond">{p.title}</h1>
          <p>{p.summary}</p>
        </section>

        <div className="meta">
          <div>
            <div className="label">ROLE</div>
            <div className="meta-v">{p.role}</div>
          </div>
          <div>
            <div className="label">SHIPPED</div>
            <div className="meta-v">{p.shipped}</div>
          </div>
          <div>
            <div className="label">STACK</div>
            <div className="meta-v">{p.stack.join(' · ')}</div>
          </div>
          {p.links?.length ? (
            <div>
              <div className="label">LINKS</div>
              <div className="meta-v meta-links">
                {p.links.map((l) => (
                  <a
                    key={l.label}
                    className="link"
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {l.label} <NewTabMark />
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <SectionViewer key={p.slug} project={p} />

        <Link
          className="next"
          href={`/work/${next.slug}`}
          aria-label={`Next project: ${next.title}`}
        >
          <span className="next-title cond">
            {next.title}
            <span className="m-only"> →</span>
          </span>
          <span className="next-arrow cond" aria-hidden="true">
            →
          </span>
        </Link>
      </main>
      <Footer trail={`${site.domain.toUpperCase()} / WORK / ${p.slug}`} />
    </>
  );
}
