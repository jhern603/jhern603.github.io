import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import GithubIcon from './GithubIcon'
import LinkedinIcon from './LinkedinIcon'
import MailIcon from './MailIcon'
import { contact } from '../data/content'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Contact() {
  return (
    <section id="contact" className="py-32 max-w-7xl mx-auto px-6">
      {/* Big heading */}
      <motion.div className="mb-16" {...fadeUp()}>
        <p className="text-xs font-medium uppercase tracking-widest text-accent mb-4">Contact</p>
        <h2 className="text-[clamp(3.5rem,10vw,8rem)] font-black leading-none text-primary-light tracking-tight">
          LET'S<br />
          <span className="gradient-text">TALK</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
        <motion.div {...fadeUp(0.1)}>
          <p className="text-sm text-muted-light leading-relaxed mb-8 max-w-md">
            If you're curious about agentic AI and security, or just want to talk, feel free to reach out!
          </p>

          <a
            href={`mailto:${contact.email}`}
            className="group inline-flex items-center gap-3 text-xl font-bold text-primary-light hover:text-accent transition-colors"
          >
            {contact.email}
            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>

        <motion.div className="flex flex-col gap-4" {...fadeUp(0.2)}>
          {[
            { icon: GithubIcon, label: 'GitHub', sub: 'github.com/jhern603', href: contact.github },
            { icon: LinkedinIcon, label: 'LinkedIn', sub: 'linkedin.com/in/jhern603', href: contact.linkedin },
            { icon: MailIcon, label: 'Email', sub: contact.email, href: `mailto:${contact.email}` },
          ].map(({ icon: Icon, label, sub, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-xl border border-[#3A5170]/50 bg-surface-light hover:border-accent/50 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors shrink-0">
                <Icon size={18} className="text-accent" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-primary-light">{label}</div>
                <div className="text-xs text-muted-light">{sub}</div>
              </div>
              <ArrowUpRight size={16} className="text-muted-light group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="mt-24 pt-8 border-t border-[#3A5170]/50 flex flex-wrap items-center justify-between gap-4"
        {...fadeUp(0.3)}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-lg font-semibold text-primary-light hover:text-accent transition-colors"
        >
          Jose Hernandez
        </button>
        <p className="text-xs text-muted-light">
          © 2026 Jose Hernandez · Built with React + Tailwind
        </p>
      </motion.div>
    </section>
  )
}
