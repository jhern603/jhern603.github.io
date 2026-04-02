import { motion } from 'framer-motion'
import { stack, education } from '../data/content'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Stack() {
  return (
    <section id="stack" className="py-32 max-w-7xl mx-auto px-6">
      <motion.p
        className="text-xs font-medium uppercase tracking-widest text-accent mb-4"
        {...fadeUp()}
      >
        Stack
      </motion.p>
      <motion.h2
        className="text-5xl md:text-6xl font-black text-primary-light mb-4 leading-tight"
        {...fadeUp(0.1)}
      >
        What I{' '}
        <span className="gradient-text">Speak and Write</span>
      </motion.h2>
      <motion.p
        className="text-sm text-muted-light mb-16 max-w-xl"
        {...fadeUp(0.15)}
      >
        Technologies and tools I use to architect, build, and secure intelligent systems.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {stack.map((group, i) => (
          <motion.div
            key={group.category}
            className="bg-surface-light rounded-2xl p-6 border border-[#3A5170]/50"
            {...fadeUp(i * 0.07)}
          >
            <h3 className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="text-sm px-3 py-1.5 rounded-full bg-white/5 text-primary-light font-medium hover:bg-accent/10 hover:text-accent transition-colors cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Education */}
      <motion.div {...fadeUp(0.3)}>
        <p className="text-xs font-medium uppercase tracking-widest text-accent mb-8">Education</p>
        <div className="bg-surface-light rounded-2xl p-6 border border-[#3A5170]/50 flex flex-wrap gap-4 items-start justify-between">
          <div>
            <h3 className="text-base font-bold text-primary-light">
              {education.school}
            </h3>
            <p className="text-sm text-accent font-medium mt-1">{education.degree}</p>
          </div>
          <div className="text-right text-xs text-muted-light">
            <div>{education.period}</div>
            <div className="mt-0.5">{education.location}</div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
