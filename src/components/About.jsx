import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { about } from '../data/content'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

export default function About() {
  return (
    <section id="about" className="py-32 max-w-7xl mx-auto px-6">
      <motion.p
        className="text-xs font-medium uppercase tracking-widest text-accent mb-4"
        {...fadeUp}
      >
        About Me
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Photo */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-surface-light border border-[#3A5170]/50">
            <img
              src="/avatar.jpg"
              alt="Jose Hernandez"
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.classList.add(
                  'flex',
                  'items-center',
                  'justify-center',
                );
                e.target.insertAdjacentHTML(
                  'afterend',
                  '<span class="text-6xl font-black text-muted-light select-none">JH</span>',
                );
              }}
            />
          </div>
          {/* Location badge */}
          <div className="absolute -bottom-4 -right-4 bg-surface-light rounded-xl px-4 py-3 shadow-lg border border-[#3A5170]/50 flex items-center gap-2">
            <MapPin size={14} className="text-accent" />
            <span className="text-sm font-medium text-primary-light">
              {about.location}
            </span>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-primary-light leading-snug mb-6">
            Solving hard problems at the{' '}
            <span className="gradient-text">intersection</span> of AI and
            security.
          </h2>

          <p className="text-base leading-relaxed text-muted-light mb-4">
            {about.bio[0]}
            <span className="text-primary-light font-semibold">
              {about.bio[1]}
            </span>
            {about.bio[2]}
            <span className="gradient-text font-semibold">{about.bio[3]}</span>
            {about.bio[4]}
          </p>
          <p className="text-base leading-relaxed text-muted-light mb-4">
            {about.bio[5]}
          </p>
          <p className="text-base leading-relaxed text-muted-light mb-4">
            {about.bio[6]}
          </p>

          <div className="border-l-2 border-accent pl-4">
            <p className="text-sm text-muted-light italic">{about.highlight}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
