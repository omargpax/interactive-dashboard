import React from 'react'

// ─── Panel ─────────────────────────────────────────────────────────────────
export function Panel({ title, subtitle, children, className = '', accent }) {
  const dot = accent === 'amber' ? 'bg-amber-400' : accent === 'green' ? 'bg-emerald-400' : 'bg-[#1c2631]'
  return (
    <div className={`bg-[#0d1117] border border-[#1c2631] rounded-lg overflow-hidden ${className}`}>
      {title && (
        <div className="border-b border-[#1c2631] px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${dot}`} />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6b7280]">{title}</span>
          </div>
          {subtitle && <span className="font-mono text-[10px] text-[#4b5563]">{subtitle}</span>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  )
}

// ─── StatCard ──────────────────────────────────────────────────────────────
export function StatCard({ label, value, sub, accent = 'neutral', trend, size = 'md' }) {
  const map = {
    amber:   { val: 'text-amber-400 glow-amber',   border: 'border-amber-500/20',   bg: 'bg-amber-500/5' },
    green:   { val: 'text-emerald-400 glow-green', border: 'border-emerald-500/20', bg: 'bg-emerald-500/5' },
    red:     { val: 'text-red-400 glow-red',       border: 'border-red-500/20',     bg: 'bg-red-500/5' },
    blue:    { val: 'text-sky-400',                border: 'border-sky-500/20',     bg: 'bg-sky-500/5' },
    purple:  { val: 'text-violet-400',             border: 'border-violet-500/20',  bg: 'bg-violet-500/5' },
    neutral: { val: 'text-[#c9d1d9]',              border: 'border-[#1c2631]',      bg: 'bg-transparent' },
  }
  const c = map[accent] || map.neutral
  const valSize = size === 'lg' ? 'text-3xl' : 'text-2xl'
  return (
    <div className={`relative border rounded-lg p-4 overflow-hidden ${c.border} ${c.bg} hover:bg-[#111820] transition-colors`}>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6b7280] mb-2">{label}</p>
      <div className="flex items-baseline gap-1.5">
        <span className={`font-mono font-semibold ${valSize} ${c.val}`}>{value}</span>
        {trend === 'up'   && <span className="text-emerald-400 text-xs">▲</span>}
        {trend === 'down' && <span className="text-red-400 text-xs">▼</span>}
      </div>
      {sub && <p className="font-mono text-[11px] text-[#6b7280] mt-1 truncate">{sub}</p>}
    </div>
  )
}

// ─── ChartTooltip ──────────────────────────────────────────────────────────
export function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#0d1117] border border-[#1c2631] rounded-lg p-3 shadow-xl min-w-[160px]">
      <p className="font-mono text-[10px] text-[#6b7280] mb-2 pb-1 border-b border-[#1c2631]">{label}</p>
      {payload.map((e, i) => (
        <div key={i} className="flex justify-between items-center gap-4 py-0.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: e.color }} />
            <span className="font-mono text-[11px] text-[#6b7280]">{e.dataKey || e.name}</span>
          </div>
          <span className="font-mono text-[11px] text-white">
            {typeof e.value === 'number' ? e.value.toFixed(1) : e.value}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── SectionLabel ─────────────────────────────────────────────────────────
export function SectionLabel({ text, colorClass = 'text-[#6b7280]' }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="h-px flex-1 bg-[#1c2631]" />
      <span className={`font-mono text-[10px] uppercase tracking-[0.25em] ${colorClass}`}>{text}</span>
      <div className="h-px flex-1 bg-[#1c2631]" />
    </div>
  )
}

// ─── InsightBox ────────────────────────────────────────────────────────────
export function InsightBox({ icon = '◆', text, accent = 'amber' }) {
  const border = accent === 'amber' ? 'border-amber-500/20 bg-amber-500/5' : 'border-emerald-500/20 bg-emerald-500/5'
  const ic = accent === 'amber' ? 'text-amber-400' : 'text-emerald-400'
  return (
    <div className={`border rounded-lg p-4 flex gap-3 ${border}`}>
      <span className={`${ic} text-sm flex-shrink-0 mt-0.5`}>{icon}</span>
      <p className="font-body text-sm text-[#9ca3af] leading-relaxed">{text}</p>
    </div>
  )
}

// ─── EmptyState ────────────────────────────────────────────────────────────
export function EmptyState({ message = 'No data available', sub }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 rounded-full border border-[#1c2631] flex items-center justify-center mb-3">
        <span className="font-mono text-[#6b7280] text-xl">∅</span>
      </div>
      <p className="font-mono text-[#6b7280] text-sm">{message}</p>
      {sub && <p className="font-mono text-[10px] text-[#4b5563] mt-1">{sub}</p>}
    </div>
  )
}
