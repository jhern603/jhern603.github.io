import { site } from '@/lib/content';

export function Footer({ trail }: { trail?: string }) {
  return (
    <footer className={`bottombar${trail ? ' d-foot' : ''}`}>
      <span className="help">{trail}</span>
      <span>© {new Date().getFullYear()} {site.domain.toUpperCase()}</span>
    </footer>
  );
}
