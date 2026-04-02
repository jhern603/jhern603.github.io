import { motion } from 'framer-motion'
import GithubIcon from './GithubIcon'
import LinkedinIcon from './LinkedinIcon'
import MailIcon from './MailIcon'
import { hero, contact } from '../data/content'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <div>
            <motion.h1
              className="text-[clamp(2.5rem,16vw,5.5rem)] lg:text-[clamp(2.5rem,6.5vw,7rem)] font-black leading-[0.9] tracking-tight select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                className="block text-primary-light dark:text-primary-dark"
                {...fadeUp(0.1)}
              >
                {hero.firstName}
              </motion.span>
              <motion.span
                className="block gradient-text"
                {...fadeUp(0.2)}
              >
                {hero.lastName}
              </motion.span>
            </motion.h1>

            <motion.p
              className="mt-6 text-sm leading-relaxed text-muted-light max-w-md"
              {...fadeUp(0.35)}
            >
              {hero.tagline}
            </motion.p>

            {/* Social buttons */}
            <motion.div className="flex gap-3 mt-8" {...fadeUp(0.45)}>
              {[
                { icon: GithubIcon, href: contact.github, label: 'GitHub' },
                { icon: LinkedinIcon, href: contact.linkedin, label: 'LinkedIn' },
                { icon: MailIcon, href: `mailto:${contact.email}`, label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#3A5170] text-sm font-medium text-muted-light hover:border-accent hover:text-accent transition-all duration-200"
                >
                  <Icon size={15} />
                  <span className="text-xs tracking-wide">{label}</span>
                </a>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div className="flex gap-10 mt-12" {...fadeUp(0.55)}>
              {hero.stats.map(({ value, label }) => (
                <div key={label}>
                  <div className="text-3xl font-black text-primary-light">
                    {value}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-muted-light mt-1">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Code block */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#3A5170]/50" style={{ backgroundColor: '#162230' }}>
              {/* Terminal header */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#3A5170]/50" style={{ backgroundColor: '#1C2D3E' }}>
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-gray-400 font-mono">engineer.py</span>
              </div>

              {/* Code */}
              <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto">
                <code>
                  {hero.codeSnippet.split('\n').map((line, i) => (
                    <div key={i} className="flex">
                      <span className="w-7 shrink-0 text-gray-600 select-none text-right mr-4 text-xs leading-[1.625rem]">
                        {i + 1}
                      </span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: line
                            .replace(/&/g, '&amp;')
                            .replace(/</g, '&lt;')
                            .replace(/>/g, '&gt;')
                            .replace(/(class|def|return|self)/g, '<span class="text-purple-400">$1</span>')
                            .replace(/('.*?')/g, '<span class="text-green-400">$1</span>')
                            .replace(/(#.*$)/gm, '<span class="text-gray-500">$1</span>')
                            .replace(/(AISecurityEngineer|__init__|build|secure|automate)/g, '<span class="text-yellow-300">$1</span>')
                            .replace(/(\[|\]|,)/g, '<span class="text-gray-400">$1</span>'),
                        }}
                        className="text-gray-300"
                      />
                    </div>
                  ))}
                </code>
              </pre>

              {/* Badge overlay */}
              <div className="absolute bottom-5 right-5">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-xs font-medium text-white border border-white/10">
                  <span className="gradient-text">⬡</span>
                  AI Security Engineer
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
