import type { Metadata, Viewport } from 'next';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import { site } from '@/lib/content';
import { siteTitle, siteUrl } from '@/lib/seo';
import { TerminalProvider } from '@/terminal/TerminalProvider';
import './globals.css';

const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: `%s — ${site.name}` },
  description: site.description,
};

export const viewport: Viewport = { themeColor: '#243448' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${mono.variable}`} data-scroll-behavior="smooth">
      <body>
        <TerminalProvider>{children}</TerminalProvider>
      </body>
    </html>
  );
}
