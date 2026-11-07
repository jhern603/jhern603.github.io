import { site } from '@/lib/content';

const base = site.links.photos.replace(/\/$/, '');

/** Home page teaser: a few shots, each deep-linking to that photo on the photography site. */
export function PhotoGrid() {
  const host = base.replace(/^https?:\/\//, '');

  return (
    <section className="photos" id="photos">
      <div className="sec-head">
        <h2 className="cond">Behind the lens</h2>
        <a className="label link" href={base} target="_blank" rel="noopener noreferrer">
          {host.toUpperCase()} ↗
        </a>
      </div>
      <div className="photo-grid">
        {site.photos.map(p => (
          <a key={p.id} className="photo" href={`${base}/#photo/${p.id}`} target="_blank" rel="noopener noreferrer">
            <img className="photo-img" src={`${base}/img/thumb/${p.id}.jpg`} alt={p.title} loading="lazy" decoding="async" />
            <span className="photo-title" aria-hidden="true">{p.title}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
