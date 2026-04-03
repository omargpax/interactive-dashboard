import React from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, Layout, Activity, Layers } from 'lucide-react'
import Footer from '../components/Footer'

// ─── Dashboard registry — add new projects here ──────────────────────────────
const DASHBOARDS = [
  {
    id: 'bubble-observatory',
    path: '/bubble-observatory',
    title: 'Bubble Observatory',
    description: 'Stock performance during the Dotcom era (1995–2005) vs the Modern era (2015–2026). Drawdowns, volatility, sector breakdowns & comparative analysis.',
    icon: TrendingUp,
    tags: ['ETFs', 'Stocks', 'Sectors', 'History'],
    status: 'live',      // 'live' | 'wip' | 'soon'
    accent: '#f59e0b',
    accentDim: 'rgba(245,158,11,0.08)',
    accentBorder: 'rgba(245,158,11,0.2)',
  },
  // ── Placeholders — replace with real projects as you build them ──
  { id: 'ph1', path: '#', title: '', description: '', icon: Layout, tags: [], status: 'soon', accent: '#1c2631', accentDim: 'rgba(28,38,49,0.3)', accentBorder: 'rgba(28,38,49,0.5)' },
  { id: 'ph2', path: '#', title: '', description: '', icon: Layout, tags: [], status: 'soon', accent: '#1c2631', accentDim: 'rgba(28,38,49,0.3)', accentBorder: 'rgba(28,38,49,0.5)' },
  { id: 'ph3', path: '#', title: '', description: '', icon: Layout, tags: [], status: 'soon', accent: '#1c2631', accentDim: 'rgba(28,38,49,0.3)', accentBorder: 'rgba(28,38,49,0.5)' },
  { id: 'ph4', path: '#', title: '', description: '', icon: Layout, tags: [], status: 'soon', accent: '#1c2631', accentDim: 'rgba(28,38,49,0.3)', accentBorder: 'rgba(28,38,49,0.5)' },
  { id: 'ph5', path: '#', title: '', description: '', icon: Layout, tags: [], status: 'soon', accent: '#1c2631', accentDim: 'rgba(28,38,49,0.3)', accentBorder: 'rgba(28,38,49,0.5)' },
  { id: 'ph6', path: '#', title: '', description: '', icon: Layout, tags: [], status: 'soon', accent: '#1c2631', accentDim: 'rgba(28,38,49,0.3)', accentBorder: 'rgba(28,38,49,0.5)' },
  { id: 'ph7', path: '#', title: '', description: '', icon: Layout, tags: [], status: 'soon', accent: '#1c2631', accentDim: 'rgba(28,38,49,0.3)', accentBorder: 'rgba(28,38,49,0.5)' },
]

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  if (status === 'live') return (
    <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-emerald-400">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      Live
    </span>
  )
  if (status === 'wip') return (
    <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-amber-400/70">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
      In Progress
    </span>
  )
  return (
    <span className="font-mono text-[9px] uppercase tracking-wider text-[#4b5563]">
      Coming Soon
    </span>
  )
}

// ─── Dashboard card ───────────────────────────────────────────────────────────
function DashCard({ dash }) {
  const isLive = dash.status === 'live'
  const isEmpty = !dash.title
  
  const Icon = dash.icon

  const inner = (
    <div
      className={`
        relative h-full rounded-xl border overflow-hidden
        transition-all duration-300 group
        ${isLive
          ? 'hover:scale-[1.015] hover:shadow-[0_0_32px_rgba(0,0,0,0.5)] cursor-pointer'
          : 'cursor-default'}
      `}
      style={{
        background: isEmpty
          ? 'rgba(13,17,23,0.4)'
          : `linear-gradient(135deg, ${dash.accentDim} 0%, rgba(13,17,23,0.95) 60%)`,
        borderColor: dash.accentBorder,
      }}
    >
      {/* Empty state */}
      {isEmpty ? (
        <div className="h-full min-h-[160px] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border border-[#1c2631] flex items-center justify-center">
            <span className="text-[#1c2631] text-lg">+</span>
          </div>
        </div>
      ) : (
        <div className="p-5 flex flex-col gap-3 min-h-[160px]">
          {/* Top row */}
          <div className="flex items-start justify-between">
            <div
              className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-xl rounded-lg"
              style={{ background: dash.accentDim, border: `1px solid ${dash.accentBorder}`, color: isLive ? dash.accent : '#4b5563' }}
            >
              {Icon && <Icon size={20} strokeWidth={2} />}
            </div>
            <StatusBadge status={dash.status} />
          </div>

          {/* Title */}
          <div>
            <h3
              className="text-lg leading-tight tracking-widest transition-opacity font-display group-hover:opacity-90"
              style={{ color: isLive ? '#ffffff' : '#6b7280' }}
            >
              {dash.title}
            </h3>
            <p className="font-body text-xs text-[#6b7280] leading-relaxed mt-1 line-clamp-3">
              {dash.description}
            </p>
          </div>

          {/* Tags */}
          {dash.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1 mt-auto">
              {dash.tags.map(tag => (
                <span
                  key={tag}
                  className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{
                    color: isLive ? dash.accent : '#4b5563',
                    background: isLive ? dash.accentDim : 'rgba(28,38,49,0.3)',
                    border: `1px solid ${isLive ? dash.accentBorder : 'rgba(28,38,49,0.5)'}`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Hover arrow */}
          {isLive && (
            <div
              className="absolute transition-all duration-200 translate-x-1 opacity-0 bottom-4 right-4 group-hover:opacity-100 group-hover:translate-x-0"
              style={{ color: dash.accent }}
            >
              <span className="font-mono text-sm">→</span>
            </div>
          )}
        </div>
      )}
    </div>
  )

  if (isLive) return <Link to={dash.path} className="block h-full">{inner}</Link>
  return <div className="h-full">{inner}</div>
}

// ─── Hub page ─────────────────────────────────────────────────────────────────
export default function Hub() {
  const liveDashboards = DASHBOARDS.filter(d => d.status === 'live').length

  return (
    <div className="min-h-screen bg-[#080c10]">
      {/* Scanline */}
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)' }}
      />

      {/* Hub header */}
      <header className="border-b border-[#1c2631] bg-[#0d1117]">
        <div className="flex items-center justify-between max-w-screen-xl px-6 py-4 mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border border-[#10b981]/30 flex items-center justify-center bg-[#10b981]/8">
              <span className="font-mono text-[#10b981] text-xs">ID</span>
            </div>
            <div>
              <h1 className="text-xl leading-none tracking-widest text-white font-display">
                INTERACTIVE DASHBOARDS
              </h1>
              <p className="font-mono text-[9px] text-[#4b5563] tracking-[0.2em] uppercase">
                Data analysis · Educational purposes
              </p>
            </div>
          </div>
          <span className="font-mono text-[10px] text-[#4b5563] hidden md:block">
            {liveDashboards} of {DASHBOARDS.filter(d => d.title).length} available
          </span>
        </div>
      </header>

      <main className="relative z-10 max-w-screen-xl px-6 py-12 mx-auto">
        {/* Hero text */}
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-4xl tracking-widest text-white font-display md:text-5xl">
            Interactive Dashboards
          </h2>
          <p className="font-body text-[#6b7280] text-sm max-w-md mx-auto leading-relaxed">
            Data analysis and interactive reports for educational purposes
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DASHBOARDS.map(dash => (
            <DashCard key={dash.id} dash={dash} />
          ))}
        </div>

        {/* Footer hint */}
        <p className="font-mono text-[10px] text-[#4b5563] text-center mt-12 tracking-widest uppercase">
          More dashboards coming soon
        </p>
        <Footer />
      </main>
    </div>
  )
}
