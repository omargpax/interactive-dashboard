import React, { useMemo, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import { TICKER_COLORS } from '../utils/constants'

function fmtVol(v) {
  if (v >= 1e9) return `${(v/1e9).toFixed(1)}B`
  if (v >= 1e6) return `${(v/1e6).toFixed(1)}M`
  if (v >= 1e3) return `${(v/1e3).toFixed(0)}K`
  return `${v}`
}

export default function VolumeChart({ monthlyGrouped, tickers, era }) {
  const [active, setActive] = useState(tickers[0])
  const eraColor = era === 'dotcom' ? '#f59e0b' : '#10b981'

  const data = useMemo(() => {
    if (!active || !monthlyGrouped?.[active]) return []
    return monthlyGrouped[active].map(r => ({ date: r.month, volume: r.Volume }))
  }, [active, monthlyGrouped])

  const maxVol = data.length ? Math.max(...data.map(d => d.volume)) : 1
  const xTicks = data.filter((_, i) => i % 12 === 0).map(d => d.date)

  return (
    <div className="chart-in">
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tickers.map((t, i) => (
          <button key={t} onClick={() => setActive(t)}
            className={`px-2.5 py-1 rounded font-mono text-[11px] border transition-all ${
              t === active
                ? era === 'dotcom'
                  ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                  : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                : 'border-[#1c2631] text-[#6b7280] hover:text-white'
            }`}
          >{t}</button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 5, right: 16, bottom: 0, left: 0 }}>
          <XAxis dataKey="date" ticks={xTicks} tickFormatter={v => v?.slice(0,7)}
            tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}
            axisLine={{ stroke: '#1c2631' }} tickLine={false}
          />
          <YAxis tickFormatter={fmtVol}
            tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}
            axisLine={false} tickLine={false} width={46}
          />
          <Tooltip content={({ active: a, payload, label }) => {
            if (!a || !payload?.length) return null
            return (
              <div className="bg-[#0d1117] border border-[#1c2631] rounded p-2 font-mono text-xs">
                <p className="text-[#6b7280] mb-1">{label}</p>
                <p style={{ color: eraColor }}>{fmtVol(payload[0]?.value)} shares</p>
              </div>
            )
          }} />
          <Bar dataKey="volume" radius={[2,2,0,0]}>
            {data.map((d, i) => (
              <Cell key={i} fill={eraColor} fillOpacity={0.25 + (d.volume / maxVol) * 0.6} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="font-mono text-[10px] text-[#4b5563] text-center mt-2">
        Monthly trading volume — {active}
      </p>
    </div>
  )
}
