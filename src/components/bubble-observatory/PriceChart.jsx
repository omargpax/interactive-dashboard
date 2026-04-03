import React, { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts'
import { ChartTooltip } from './ui'
import { TICKER_COLORS, EVENTS } from '../../utils/constants'

export default function PriceChart({ series, tickers, era, height = 340 }) {
  const [hidden, setHidden] = useState(new Set())
  const events = EVENTS[era] || []
  const xTicks = series.filter((_, i) => i % 12 === 0).map(d => d.date)

  const toggle = (t) =>
    setHidden(prev => { const n = new Set(prev); n.has(t) ? n.delete(t) : n.add(t); return n })

  return (
    <div className="chart-in">
      {/* Ticker toggles */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tickers.map((t, i) => {
          const color = TICKER_COLORS[i % TICKER_COLORS.length]
          const off = hidden.has(t)
          return (
            <button
              key={t}
              onClick={() => toggle(t)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-[11px] border transition-all ${
                off ? 'border-[#1c2631] text-[#4b5563] opacity-40' : 'border-[#1c2631] text-[#c9d1d9] hover:border-white/20'
              }`}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: off ? '#333' : color }} />
              {t}
            </button>
          )
        })}
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={series} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <XAxis
            dataKey="date"
            ticks={xTicks}
            tickFormatter={v => v?.slice(0, 7)}
            tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}
            axisLine={{ stroke: '#1c2631' }} tickLine={false}
          />
          <YAxis
            tickFormatter={v => v.toFixed(0)}
            tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}
            axisLine={false} tickLine={false} width={42}
          />
          <Tooltip content={<ChartTooltip />} />
          <ReferenceLine y={100} stroke="#1c2631" strokeDasharray="4 4" />
          {events.map(ev => (
            <ReferenceLine key={ev.date} x={ev.date} stroke={ev.color}
              strokeDasharray="3 3" strokeOpacity={0.6}
              label={{ value: ev.label, position: 'insideTopLeft', fill: ev.color,
                       fontSize: 9, fontFamily: 'JetBrains Mono, monospace', opacity: 0.8 }}
            />
          ))}
          {tickers.map((t, i) => (
            <Line key={t} type="monotone" dataKey={t}
              stroke={TICKER_COLORS[i % TICKER_COLORS.length]}
              strokeWidth={hidden.has(t) ? 0 : 2}
              dot={false} activeDot={{ r: 4, strokeWidth: 0 }} connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <p className="font-mono text-[10px] text-[#4b5563] text-center mt-2">
        Normalized to 100 at period start · Dashed verticals = key market events
      </p>
    </div>
  )
}
