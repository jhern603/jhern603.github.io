'use client';

import Link from 'next/link';
import { pad, projects } from '@/lib/content';
export function WorkList() {

  return (
    <section className="work" id="work">
      <div className="sec-head">
        <h2 className="cond">Selected work</h2>
      </div>
      {projects.map((p) => {
        return (
          <Link key={p.slug} className={'work-row'} href={`/work/${p.slug}`}>
            <span className="work-no cond">{p.no}</span>
            <div style={{ minWidth: 0 }}>
              <div className="label">
                {p.tag.toUpperCase()} · {p.year}
              </div>
              <h3 className="work-title cond">{p.title}</h3>
            </div>
            <div className="work-desc">{p.summary}</div>
            <span className="work-mark">VIEW →</span>
            <span className="work-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        );
      })}
    </section>
  );
}
