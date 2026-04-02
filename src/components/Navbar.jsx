import { useState, useEffect } from 'react'
import { nav } from '../data/content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md border-b border-[#3A5170]/50' : 'bg-transparent'
      }`}
      style={scrolled ? { backgroundColor: 'rgba(26,40,56,0.85)' } : {}}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xl font-semibold text-primary-light hover:text-accent transition-colors tracking-wider"
        >
          Jose Hernandez
        </button>

        <ul className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <li key={item}>
              <button
                onClick={() => scrollTo(item)}
                className="text-xs font-medium tracking-widest uppercase text-muted-light hover:text-primary-light transition-colors"
              >
                {item}
              </button>
            </li>
          ))}
          <li>
            <a
              href="https://blog.josehernandez.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium tracking-widest uppercase text-muted-light hover:text-accent transition-colors"
            >
              Blog
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
