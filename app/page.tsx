import type { Metadata } from 'next';
import { site } from '@/lib/content';
import { homeJsonLd, pageMetadata, siteTitle } from '@/lib/seo';
import { Console } from '@/components/Console';
import { Experience } from '@/components/Experience';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { NewTabMark } from '@/components/NewTabMark';
import { PhotoGrid } from '@/components/PhotoGrid';
import { Portrait } from '@/components/Portrait';
import { SiteHeader } from '@/components/SiteHeader';
import { WorkList } from '@/components/ProjectList';

export const metadata: Metadata = pageMetadata(siteTitle, site.description, '/');

export default function Home() {
  const [first, ...rest] = site.name.split(' ');
  const { email, links } = site;

  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <section className="hero" id="about">
          <div className="stripe" aria-hidden="true" />
          <Portrait src={site.portrait} alt={`Portrait of ${site.name}`} />
          <h1 className="cond">
            {first}
            <br />
            {rest.join(' ')}
          </h1>
          <p>{site.bio}</p>
        </section>

        <Console />
        <Experience />
        <WorkList />

        <PhotoGrid />

        <section className="cta" id="resume">
          <h2 className="cond">grab my resume</h2>
          <div className="cta-actions">
            <a className="btn-primary" href={links.resume} download>
              DOWNLOAD PDF <span aria-hidden="true">↓</span>
            </a>
            <a className="btn-ghost" href={`mailto:${email}`}>
              {email}
            </a>
          </div>
        </section>

        <section className="contact" id="contact">
          <h2 className="contact-title cond">Get in touch</h2>
          <div className="contact-links">
            <a className="link" href={`mailto:${email}`}>
              {email}
            </a>
            {Object.entries(links).map(([k, v]) => {
              return (
                <a
                  key={k}
                  className="link"
                  href={v}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {k} <NewTabMark />
                </a>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
