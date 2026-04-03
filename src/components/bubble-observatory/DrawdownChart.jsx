import React, { useMemo, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { computeDrawdownSeries, fmtPct } from '../../utils/dataUtils'
import { TICKER_COLORS } from '../../utils/constants'

export default function DrawdownChart({ monthlyGrouped, tickers, era }) {
  const [active, setActive] = useState(tickers[0])
  const eraColor = era === 'dotcom' ? '#f59e0b' : '#10b981'
  const tickerIdx = tickers.indexOf(active)
  const tickerColor = TICKER_COLORS[tickerIdx >= 0 ? tickerIdx : 0]

  const ddSeries = useMemo(() => {
    if (!active || !monthlyGrouped?.[active]) return []
    return computeDrawdownSeries(monthlyGrouped[active])
  }, [active, monthlyGrouped])

  const minDD = ddSeries.length ? Math.min(...ddSeries.map(d => d.drawdown)) : 0
  const xTicks = ddSeries.filter((_, i) => i % 12 === 0).map(d => d.date)

  return (
    <div className="chart-in">
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tickers.map((t, i) => (
          <button key={t} onClick={() => setActive(t)}
            className={`px-2.5 py-1 rounded font-mono text-[11px] border transition-all ${
              t === active
                ? 'border-red-500/40 bg-red-500/10 text-red-400'
                : 'border-[#1c2631] text-[#6b7280] hover:text-white'
            }`}
          >{t}</button>
        ))}
      </div>

      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-mono text-3xl text-red-400 font-semibold" style={{ textShadow: '0 0 16px rgba(239,68,68,0.5)' }}>
          {fmtPct(minDD)}
        </span>
        <span className="font-mono text-xs text-[#6b7280]">max drawdown — {active}</span>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={ddSeries} margin={{ top: 5, right: 16, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="ddGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" ticks={xTicks} tickFormatter={v => v?.slice(0,7)}
            tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}
            axisLine={{ stroke: '#1c2631' }} tickLine={false}
          />
          <YAxis tickFormatter={v => `${v.toFixed(0)}%`}
            tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}
            axisLine={false} tickLine={false} width={46}
          />
          <Tooltip content={({ active: a, payload, label }) => {
            if (!a || !payload?.length) return null
            return (
              <div className="bg-[#0d1117] border border-[#1c2631] rounded p-2 font-mono text-xs">
                <p className="text-[#6b7280] mb-1">{label}</p>
                <p className="text-red-400">{payload[0]?.value?.toFixed(2)}%</p>
              </div>
            )
          }} />
          <ReferenceLine y={0} stroke="#1c2631" />
          <Area type="monotone" dataKey="drawdown" stroke="#ef4444" strokeWidth={1.5}
            fill="url(#ddGrad)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
      <p className="font-mono text-[10px] text-[#4b5563] text-center mt-2">
        % decline from rolling all-time high · {active} monthly prices
      </p>
    </div>
  )
}
