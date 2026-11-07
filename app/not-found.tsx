import Link from 'next/link';
import { site } from '@/lib/content';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <header className="topbar is-detail">
        <Link className="brand" href="/">{site.name.toUpperCase()}</Link>
        <Link className="link back" href="/#work">← ALL WORK</Link>
        <span>404</span>
      </header>
      <main>
        <section className="d-hero">
          <div className="stripe" aria-hidden="true" />
          <h1 className="cond">Not found</h1>
          <p>No such file or directory. Head back and type &apos;projects&apos; in the terminal.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
