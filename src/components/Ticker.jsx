import { ticker } from '../data/content'

export default function Ticker() {
  const items = [...ticker, ...ticker] // duplicate for seamless loop

  return (
    <div className="relative overflow-hidden border-y border-[#3A5170]/30 py-4" style={{ backgroundColor: 'rgba(28, 45, 62, 0.5)' }}>
      <div className="ticker-track">
        {items.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-light whitespace-nowrap px-6">
              {item}
            </span>
            <span className="text-accent text-xs">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
