import { motion } from 'framer-motion'
import { experience } from '../data/content'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Experience() {
  return (
    <section id="experience" className="py-32 max-w-7xl mx-auto px-6">
      <motion.p
        className="text-xs font-medium uppercase tracking-widest text-accent mb-4"
        {...fadeUp()}
      >
        Experience
      </motion.p>
      <motion.h2
        className="text-5xl md:text-6xl font-black text-primary-light mb-16 leading-tight"
        {...fadeUp(0.1)}
      >
        Where I've <span className="gradient-text">Worked</span>
      </motion.h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-[#3A5170]/50 ml-[7px] hidden md:block" />

        <div className="space-y-12">
          {experience.map((job, i) => (
            <motion.div
              key={i}
              className="md:pl-12 relative"
              {...fadeUp(i * 0.08)}
            >
              {/* Timeline dot */}
              <div className="hidden md:flex absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-accent items-center justify-center" style={{ backgroundColor: '#243448' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              </div>

              <div className="bg-surface-light rounded-2xl p-6 border border-[#3A5170]/50 hover:border-accent/50 transition-colors duration-300">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-primary-light">
                        {job.company}
                      </h3>
                    </div>
                    <p className="text-sm text-accent font-medium mt-0.5">{job.role}</p>
                  </div>
                  <div className="text-right text-xs text-muted-light">
                    <div>{job.period}</div>
                    {job.location && <div className="mt-0.5">{job.location}</div>}
                  </div>
                </div>

                <ul className="space-y-2">
                  {job.bullets.map((bullet, j) => (
                    <li key={j} className="flex gap-3 text-sm text-muted-light leading-relaxed">
                      <span className="text-accent mt-1 shrink-0">—</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
