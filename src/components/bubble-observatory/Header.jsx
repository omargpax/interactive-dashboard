import React, { useState, useEffect, useMemo } from 'react'
import { TrendingUp } from 'lucide-react'

//const TAPE_TICKERS = ['JPM','XOM','META','GOOGL','LLY','V','DIS','NFLX','IBM',
//                      'BAC','CVX','JNJ','ADBE','SPY','QQQ','MSFT','NVDA','AAPL',
//                      'CSCO','INTC','ORCL','MSFT','AMZN','TSLA','AMD']

// Generate stable fake % changes once (not on every render)
//const STABLE_CHANGES = TAPE_TICKERS.map(t => ({
//  ticker: t,
//  pct: (Math.random() * 6 - 1.5).toFixed(2), // -1.5% to +4.5%
//}))

export default function Header({ dataType, onDataTypeChange }) {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  // Triple the tape for seamless loop
  //const tape = [...STABLE_CHANGES, ...STABLE_CHANGES, ...STABLE_CHANGES]

  return (
    <header className="border-b border-[#1c2631] bg-[#0d1117] sticky top-0 z-50">
      {/* Ticker tape — decorative, not real prices */}
      {/*
      <div className="overflow-hidden border-b border-[#1c2631] bg-[#080c10] h-7 flex items-center">
        <div className="flex gap-10 animate-marquee whitespace-nowrap">
          {tape.map(({ ticker, pct }, i) => {
            const positive = parseFloat(pct) >= 0
            return (
              <span key={i} className="font-mono text-[11px] text-[#4b5563]">
                <span className="text-amber-400/80">{ticker}</span>
                <span className={`ml-1.5 ${positive ? 'text-emerald-500/70' : 'text-red-500/70'}`}>
                  {positive ? '+' : ''}{pct}%
                </span>
              </span>
            )
          })}
        </div>
      </div>
      */}

      <div className="flex items-center justify-between gap-4 px-4 py-3 mx-auto max-w-screen-2xl md:px-6">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 gap-3">
          <div className="flex items-center justify-center border rounded w-9 h-9 border-emerald-500/30" style={{ background: 'rgba(11, 245, 175, 0.08)' }}>
            <TrendingUp className="w-4 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-xl leading-none tracking-widest text-white font-display md:text-2xl">
              BUBBLE OBSERVATORY
            </h1>
            <p className="font-mono text-[9px] text-[#4b5563] tracking-[0.22em] uppercase hidden md:block">
              Dotcom 1995–2005 · Modern 2015–2026
            </p>
          </div>
        </div>

        {/* Data type selector */}
        <div className="flex items-center gap-1 bg-[#080c10] border border-[#1c2631] rounded-lg p-1">
          {[
            { id: 'etf',       label: 'ETF Funds',  icon: '⬡', desc: '5 benchmark ETFs' },
            { id: 'companies', label: 'Companies',  icon: '◈', desc: '25 large caps / 5 sectors' },
          ].map(({ id, label, icon, desc }) => (
            <button
              key={id}
              onClick={() => onDataTypeChange(id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-md font-mono text-xs tracking-wider
                transition-all duration-200
                ${dataType === id
                  ? 'text-amber-400 border border-amber-500/35'
                  : 'text-[#6b7280] hover:text-white hover:bg-[#111820]'}
              `}
              style={dataType === id ? { background: 'rgba(245,158,11,0.12)', boxShadow: '0 0 12px rgba(245,158,11,0.08)' } : {}}
            >
              <span>{icon}</span>
              <span>{label}</span>
              <span className={`text-[10px] hidden md:inline ${dataType === id ? 'text-amber-400/55' : 'text-[#4b5563]'}`}>
                {desc}
              </span>
            </button>
          ))}
        </div>

        {/* Clock */}
        <div className="flex-shrink-0 hidden text-right md:block">
          <div className="font-mono text-base tracking-widest text-amber-400">
            {time.toLocaleTimeString('en-US', { hour12: false })}
          </div>
          <div className="font-mono text-[9px] text-[#4b5563] tracking-widest">
            {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Disclaimer tooltip on hover over tape */}
      <div className="absolute top-0 left-0 w-full h-7 group">
        <div className="hidden group-hover:block absolute top-7 left-4 z-50 bg-[#0d1117] border border-[#1c2631] rounded px-3 py-1.5 font-mono text-[10px] text-[#6b7280] whitespace-nowrap pointer-events-none">
          ⚠ Ticker tape shows decorative values only — not real-time prices
        </div>
      </div>
    </header>
  )
}
