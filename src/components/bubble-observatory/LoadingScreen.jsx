import React, { useState, useEffect } from 'react'

const STEPS = [
  'Connecting to market data...',
  'Parsing price history...',
  'Computing returns & drawdowns...',
  'Building chart series...',
  'Ready.',
]

export function LoadingScreen({ dataType }) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep(s => Math.min(s + 1, STEPS.length - 1)), 450)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-20">
      <div className="w-full max-w-sm px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-400/60 text-center mb-6">
          Loading {dataType === 'etf' ? 'ETF data' : 'company data'}
        </p>
        <div className="bg-[#0d1117] border border-[#1c2631] rounded-lg p-5 space-y-2">
          {STEPS.slice(0, step + 1).map((msg, i) => (
            <div key={i} className="flex items-center gap-2" style={{ opacity: i < step ? 0.4 : 1 }}>
              <span className={`font-mono text-xs ${i < step ? 'text-emerald-500' : 'text-amber-400'}`}>
                {i < step ? '✓' : '›'}
              </span>
              <span className="font-mono text-xs text-[#c9d1d9]">
                {msg}
                {i === step && i < STEPS.length - 1 && <span className="cursor-blink" />}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 h-0.5 bg-[#1c2631] rounded overflow-hidden">
          <div
            className="h-full transition-all duration-500 ease-out bg-amber-400"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export function ErrorPanel({ errors }) {
  return (
    <div className="max-w-lg px-6 mx-auto mt-16">
      <div className="bg-[#0d1117] border border-red-500/25 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-8 h-8 text-sm text-red-400 rounded-full bg-red-500/15">!</div>
          <h2 className="font-mono text-sm tracking-widest text-red-400 uppercase">Data Load Error</h2>
        </div>
        <div className="mb-5 space-y-2 font-mono text-sm">
          {Object.entries(errors).map(([era, msg]) => (
            <div key={era} className="p-3 border rounded bg-red-500/5 border-red-500/15">
              <p className="text-red-400/70 text-[10px] uppercase tracking-wider mb-1">{era}</p>
              <p className="text-[#c9d1d9] text-xs">{msg}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-[#1c2631] pt-4 text-[#6b7280] text-xs space-y-1">
          <p>Expected file locations:</p>
          <p className="text-amber-400/70">public/data/bubble-observatory/etf/dotcom.json</p>
          <p className="text-amber-400/70">public/data/bubble-observatory/etf/modern.json</p>
          <p className="text-emerald-400/70">public/data/bubble-observatory/companies/dotcom.json</p>
          <p className="text-emerald-400/70">public/data/bubble-observatory/companies/modern.json</p>
        </div>
      </div>
    </div>
  )
}
