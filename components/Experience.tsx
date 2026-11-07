import { pad, site } from '@/lib/content';

/** Home page experience list, driven by site.experience in content/site.json. */
export function Experience() {
  const jobs = site.experience;

  return (
    <section className="exp" id="experience">
      <div className="sec-head">
        <h2 className="cond">Where I&apos;ve worked</h2>
      </div>
      {jobs.map((job, i) => (
        <article key={`${job.company}-${job.role}`} className="exp-row">
          <div className="exp-meta label">
            <span>{job.dates.toUpperCase()}</span>
            <span>{job.location.toUpperCase()}</span>
          </div>
          <div style={{ minWidth: 0 }}>
            <div className="exp-role">{job.role.toUpperCase()}</div>
            <h3 className="exp-company cond">{job.company}</h3>
            <ul className="exp-points">
              {job.points.map((pt, j) => (
                <li key={j}>{pt}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </section>
  );
}
