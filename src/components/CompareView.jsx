import React, { useMemo, useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine, ResponsiveContainer,
} from 'recharts'
import { buildMonthsNormalized, fmtPct } from '../utils/dataUtils'
import { COMPARE_NARRATIVES, ERAS, SECTORS, SECTOR_KEYS } from '../utils/constants'
import { Panel, StatCard, InsightBox, SectionLabel } from './ui'

// ─── Narrative card ─────────────────────────────────────────────────────────
function NarrativeCard({ narrative, dotcomTicker, modernTicker }) {
  if (!narrative) return null
  return (
    <div className="space-y-3">
      <h3 className="font-display text-xl tracking-widest text-white">{narrative.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-[#0d1117] border border-amber-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400/70">
              Dotcom Era · {dotcomTicker}
            </span>
          </div>
          <p className="font-body text-sm text-[#9ca3af] leading-relaxed">{narrative.dotcom}</p>
        </div>
        <div className="bg-[#0d1117] border border-emerald-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400/70">
              Modern Era · {modernTicker}
            </span>
          </div>
          <p className="font-body text-sm text-[#9ca3af] leading-relaxed">{narrative.modern}</p>
        </div>
      </div>
      <InsightBox
        icon="◆"
        text={narrative.insight}
        accent="amber"
      />
    </div>
  )
}

// ─── Stat comparison row ─────────────────────────────────────────────────────
function StatCompare({ label, dotcomVal, modernVal, fmt = v => fmtPct(v) }) {
  return (
    <div className="bg-[#0d1117] border border-[#1c2631] rounded-lg p-3">
      <p className="font-mono text-[10px] uppercase tracking-widest text-[#6b7280] mb-2">{label}</p>
      <div className="flex items-center justify-between">
        <div className="text-center flex-1">
          <p className="font-mono text-lg text-amber-400">{fmt(dotcomVal)}</p>
          <p className="font-mono text-[9px] text-amber-400/50 mt-0.5">DOTCOM</p>
        </div>
        <div className="font-mono text-[#1c2631] text-sm">╱</div>
        <div className="text-center flex-1">
          <p className="font-mono text-lg text-emerald-400">{fmt(modernVal)}</p>
          <p className="font-mono text-[9px] text-emerald-400/50 mt-0.5">MODERN</p>
        </div>
      </div>
    </div>
  )
}

// ─── Main CompareView ─────────────────────────────────────────────────────────
export default function CompareView({ dotcom, modern, dataType }) {
  // For companies: sector selector. For ETF: ticker selector
  const [sector, setSector] = useState('all')

  // Determine tickers to compare
  const dtTickers = dotcom?.tickers ?? []
  const mdTickers = modern?.tickers ?? []

  // Filter by sector if companies mode
  const filteredDt = sector === 'all' ? dtTickers
    : dtTickers.filter(t => dotcom?.stats?.[t]?.sector === sector)
  const filteredMd = sector === 'all' ? mdTickers
    : mdTickers.filter(t => modern?.stats?.[t]?.sector === sector)

  const [dotcomTicker, setDotcomTicker] = useState(null)
  const [modernTicker, setModernTicker] = useState(null)

  const dt = dotcomTicker || filteredDt[0]
  const mt = modernTicker || filteredMd[0]

  const dtStats = dt ? dotcom?.stats?.[dt] : null
  const mtStats = mt ? modern?.stats?.[mt] : null

  // Overlay chart — months from start
  const combined = useMemo(() => {
    const ds = dt && dotcom?.monthlyGrouped?.[dt]
      ? buildMonthsNormalized(dotcom.monthlyGrouped[dt]) : []
    const ms = mt && modern?.monthlyGrouped?.[mt]
      ? buildMonthsNormalized(modern.monthlyGrouped[mt]) : []
    const maxLen = Math.max(ds.length, ms.length)
    return Array.from({ length: maxLen }, (_, i) => ({
      month: i,
      [`${dt} (Dotcom)`]: ds[i]?.value ?? null,
      [`${mt} (Modern)`]: ms[i]?.value ?? null,
    }))
  }, [dt, mt, dotcom, modern])

  // Pick narrative
  const narrativeKey = sector === 'all' ? 'overview' : sector
  const narrative = COMPARE_NARRATIVES[narrativeKey]

  const availableSectors = dataType === 'companies'
    ? [...new Set([...dtTickers.map(t => dotcom?.stats?.[t]?.sector), ...mdTickers.map(t => modern?.stats?.[t]?.sector)])]
    : null

  return (
    <div className="space-y-6 chart-in">

      {/* Sector / filter row */}
      {dataType === 'companies' && (
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-2">
            Filter by sector
          </p>
          <div className="flex flex-wrap gap-1.5">
            {[{ key: 'all', label: 'All Sectors', icon: '◈' },
              ...SECTOR_KEYS.map(k => ({ key: k, label: SECTORS[k].label, icon: SECTORS[k].icon }))
            ].map(({ key, label, icon }) => (
              <button key={key} onClick={() => { setSector(key); setDotcomTicker(null); setModernTicker(null) }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-[11px] border transition-all ${
                  sector === key
                    ? 'border-violet-500/40 bg-violet-500/10 text-violet-300'
                    : 'border-[#1c2631] text-[#6b7280] hover:text-white'
                }`}
              >
                <span>{icon}</span>{label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Narrative */}
      <NarrativeCard narrative={narrative} dotcomTicker={dt} modernTicker={mt} />

      <SectionLabel text="Select tickers to compare" />

      {/* Ticker selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-amber-400/60 mb-2">
            Dotcom Era ticker
          </p>
          <div className="flex flex-wrap gap-1.5">
            {filteredDt.map(t => (
              <button key={t} onClick={() => setDotcomTicker(t)}
                className={`px-2.5 py-1 rounded font-mono text-[11px] border transition-all ${
                  t === dt ? 'border-amber-500/40 bg-amber-500/10 text-amber-400' : 'border-[#1c2631] text-[#6b7280] hover:text-white'
                }`}
              >{t}</button>
            ))}
          </div>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-emerald-400/60 mb-2">
            Modern Era ticker
          </p>
          <div className="flex flex-wrap gap-1.5">
            {filteredMd.map(t => (
              <button key={t} onClick={() => setModernTicker(t)}
                className={`px-2.5 py-1 rounded font-mono text-[11px] border transition-all ${
                  t === mt ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' : 'border-[#1c2631] text-[#6b7280] hover:text-white'
                }`}
              >{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Key stats side-by-side */}
      {dtStats && mtStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCompare label="Total Return" dotcomVal={dtStats.totalReturn} modernVal={mtStats.totalReturn} />
          <StatCompare label="Max Drawdown" dotcomVal={dtStats.maxDrawdown} modernVal={mtStats.maxDrawdown} />
          <StatCompare label="Volatility"   dotcomVal={dtStats.volatility}  modernVal={mtStats.volatility} />
          <StatCompare label="Peak→Trough"  dotcomVal={dtStats.peakToTrough} modernVal={mtStats.peakToTrough}
            fmt={v => v != null ? fmtPct(v) : '—'} />
        </div>
      )}

      {/* Overlay line chart */}
      <Panel title={`${dt} (Dotcom) vs ${mt} (Modern) — Normalized by months elapsed`} accent="amber">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={combined} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
            <XAxis dataKey="month" tickFormatter={v => `M${v}`} interval={11}
              tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}
              axisLine={{ stroke: '#1c2631' }} tickLine={false}
            />
            <YAxis tickFormatter={v => v.toFixed(0)}
              tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}
              axisLine={false} tickLine={false} width={42}
            />
            <Tooltip content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null
              return (
                <div className="bg-[#0d1117] border border-[#1c2631] rounded p-3 font-mono text-xs min-w-[180px]">
                  <p className="text-[#6b7280] mb-2">Month {label}</p>
                  {payload.map((p, i) => (
                    <div key={i} className="flex justify-between gap-3">
                      <span style={{ color: p.color }}>{p.dataKey}</span>
                      <span className="text-white">{p.value?.toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              )
            }} />
            <ReferenceLine y={100} stroke="#1c2631" strokeDasharray="4 4" />
            <Line type="monotone" dataKey={`${dt} (Dotcom)`} stroke="#f59e0b"
              strokeWidth={2} dot={false} activeDot={{ r: 4 }} connectNulls />
            <Line type="monotone" dataKey={`${mt} (Modern)`} stroke="#10b981"
              strokeWidth={2} dot={false} activeDot={{ r: 4 }} connectNulls />
          </LineChart>
        </ResponsiveContainer>
        <p className="font-mono text-[10px] text-[#4b5563] text-center mt-2">
          Both normalized to 100 · X-axis = months from period start · Amber = Dotcom · Green = Modern
        </p>
      </Panel>
    </div>
  )
}
