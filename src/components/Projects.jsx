import { motion } from 'framer-motion'
import { projects } from '../data/content'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Projects() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured && !p.personal)
  const personal = projects.filter((p) => p.personal)

  return (
    <section id="projects" className="py-32 max-w-7xl mx-auto px-6">
      <motion.p
        className="text-xs font-medium uppercase tracking-widest text-accent mb-4"
        {...fadeUp()}
      >
        Projects
      </motion.p>
      <motion.h2
        className="text-5xl md:text-6xl font-black text-primary-light mb-16 leading-tight"
        {...fadeUp(0.1)}
      >
        Selected <span className="gradient-text">Work</span>
      </motion.h2>

      {/* Featured — larger cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {featured.map((project, i) => (
          <motion.div
            key={project.title}
            className="group bg-surface-light rounded-2xl p-6 border border-[#3A5170]/50 hover:border-accent/50 transition-all duration-300 flex flex-col"
            {...fadeUp(i * 0.1)}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-xs font-medium uppercase tracking-widest text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                Featured
              </span>
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <span className="text-accent text-xs font-bold">0{i + 1}</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-primary-light mb-3 group-hover:text-accent transition-colors">
              {project.title}
            </h3>

            <p className="text-sm text-muted-light leading-relaxed mb-6 flex-1">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-muted-light"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Rest — smaller cards */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {rest.map((project, i) => (
            <motion.div
              key={project.title}
              className="group bg-surface-light rounded-2xl p-6 border border-[#3A5170]/50 hover:border-accent/50 transition-all duration-300 flex flex-col"
              {...fadeUp((featured.length + i) * 0.1)}
            >
              <h3 className="text-base font-bold text-primary-light mb-2 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-light leading-relaxed mb-4 flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-muted-light"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Personal / Homelab */}
      {personal.length > 0 && (
        <>
          <motion.p
            className="text-xs font-medium uppercase tracking-widest text-accent mb-4"
            {...fadeUp()}
          >
            Personal Work
          </motion.p>
          <motion.h3
            className="text-3xl md:text-4xl font-black text-primary-light mb-10 leading-tight"
            {...fadeUp(0.1)}
          >
            Experiments &amp; <span className="gradient-text">Side Projects</span>
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personal.map((project, i) => (
              <motion.div
                key={project.title}
                className="group bg-surface-light rounded-2xl p-6 border border-[#3A5170]/50 hover:border-accent/50 transition-all duration-300 flex flex-col"
                {...fadeUp(i * 0.1)}
              >
                <div className="mb-4">
                  <span className="text-xs font-medium uppercase tracking-widest text-muted-light bg-white/5 px-2.5 py-1 rounded-full">
                    Personal
                  </span>
                </div>

                <h3 className="text-base font-bold text-primary-light mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-muted-light leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-muted-light"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
