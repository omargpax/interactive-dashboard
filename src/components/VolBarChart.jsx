import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import { TICKER_COLORS } from '../utils/constants'

export default function VolBarChart({ stats, tickers, era }) {
  const colors = era === 'dotcom'
    ? ['#f59e0b','#f97316','#ef4444','#a78bfa','#38bdf8']
    : ['#10b981','#06b6d4','#6366f1','#f472b6','#facc15']

  const volData = tickers
    .map((t, i) => ({ ticker: t, value: parseFloat((stats[t]?.volatility ?? 0).toFixed(1)), color: colors[i % colors.length] }))
    .sort((a, b) => b.value - a.value)

  const ddData = tickers
    .map((t, i) => ({ ticker: t, value: parseFloat(Math.abs(stats[t]?.maxDrawdown ?? 0).toFixed(1)), color: colors[i % colors.length] }))
    .sort((a, b) => b.value - a.value)

  const tooltip = (unit) => ({ active, payload }) => {
    if (!active || !payload?.length) return null
    return (
      <div className="bg-[#0d1117] border border-[#1c2631] rounded p-2 font-mono text-xs">
        <p style={{ color: payload[0]?.fill }}>{payload[0]?.value?.toFixed(1)}{unit}</p>
      </div>
    )
  }

  const chart = (data, label, unit, fillOpacity = 0.8) => (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6b7280] mb-3">{label}</p>
      <ResponsiveContainer width="100%" height={150}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 48 }}>
          <XAxis type="number"
            tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}
            axisLine={{ stroke: '#1c2631' }} tickLine={false}
            tickFormatter={v => `${v}${unit}`}
          />
          <YAxis dataKey="ticker" type="category"
            tick={{ fill: '#c9d1d9', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
            axisLine={false} tickLine={false}
          />
          <Tooltip content={tooltip(unit)} />
          <Bar dataKey="value" radius={[0, 3, 3, 0]}>
            {data.map((d, i) => <Cell key={i} fill={d.color} fillOpacity={fillOpacity} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )

  return (
    <div className="chart-in grid grid-cols-1 gap-6">
      {chart(volData, 'Annualized Volatility (%)', '%')}
      {chart(ddData, 'Max Drawdown (%)', '%', 0.55)}
    </div>
  )
}
