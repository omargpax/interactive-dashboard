import React, { useState } from 'react'
import Header from './components/Header'
import EraView from './components/EraView'
import CompareView from './components/CompareView'
import { LoadingScreen, ErrorPanel } from './components/LoadingScreen'
import { useData } from './hooks/useData'
import { ERAS } from './utils/constants'

// ─── Era tab button ───────────────────────────────────────────────────────────
function EraTab({ era, active, onClick }) {
  const cfg = ERAS[era]
  return (
    <button onClick={onClick}
      className={`
        flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-xs tracking-wider
        border transition-all duration-250
        ${active
          ? `${cfg.border} ${cfg.bgClass} ${cfg.textClass} shadow-[0_0_16px_rgba(0,0,0,0.4)]`
          : 'border-transparent text-[#6b7280] hover:text-[#c9d1d9] hover:bg-[#111820]'}
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${active ? (era === 'dotcom' ? 'bg-amber-400' : 'bg-emerald-400') : 'bg-[#1c2631]'}`} />
      {cfg.label}
      <span className={`text-[10px] ${active ? 'opacity-60' : 'text-[#4b5563]'}`}>{cfg.range}</span>
    </button>
  )
}

// ─── Divider label ────────────────────────────────────────────────────────────
function DividerLabel({ text, colorClass = 'text-[#6b7280]' }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-[#1c2631]" />
      <span className={`font-mono text-[10px] uppercase tracking-[0.25em] ${colorClass}`}>{text}</span>
      <div className="h-px flex-1 bg-[#1c2631]" />
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [dataType, setDataType] = useState('companies')   // 'etf' | 'companies'
  const [view, setView]         = useState('dotcom')       // 'dotcom' | 'modern' | 'compare'

  const { dotcom, modern, loading, errors } = useData(dataType)

  const hasBothErrors = errors.dotcom && errors.modern

  return (
    <div className="min-h-screen bg-[#080c10]">
      {/* Scanline overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)' }}
      />

      <Header dataType={dataType} onDataTypeChange={t => { setDataType(t); setView('dotcom') }} />

      <main className="relative z-10 px-4 py-6 mx-auto max-w-screen-2xl md:px-6">

        {/* ── Era / View selector ─────────────────────────────────────── */}
        <div className="mb-6 space-y-3">
          <DividerLabel
            text={dataType === 'etf' ? 'ETF Benchmark Funds' : 'Large-Cap Companies by Sector'}
            colorClass={dataType === 'etf' ? 'text-amber-400/60' : 'text-emerald-400/60'}
          />

          <div className="flex flex-wrap items-center gap-2">
            <EraTab era="dotcom" active={view === 'dotcom'} onClick={() => setView('dotcom')} />
            <EraTab era="modern" active={view === 'modern'} onClick={() => setView('modern')} />

            {/* Compare button — distinct style */}
            <button onClick={() => setView('compare')}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-xs tracking-wider
                border transition-all duration-250
                ${view === 'compare'
                  ? 'border-violet-500/40 bg-violet-500/10 text-violet-300'
                  : 'border-[#1c2631] text-[#6b7280] hover:text-[#c9d1d9] hover:bg-[#111820]'}
              `}
            >
              <span>⇌</span>
              Compare Eras
              <span className={`text-[10px] ${view === 'compare' ? 'text-violet-300/60' : 'text-[#4b5563]'}`}>
                Side-by-side + analysis
              </span>
            </button>
          </div>
        </div>

        {/* ── Content ────────────────────────────────────────────────── */}
        {loading ? (
          <LoadingScreen dataType={dataType} />
        ) : hasBothErrors ? (
          <ErrorPanel errors={errors} />
        ) : (
          <div key={`${dataType}-${view}`}>

            {view === 'dotcom' && (
              <>
                <DividerLabel text="Dotcom Era · 1995–2005" colorClass="text-amber-400/70" />
                <div className="mt-4">
                  <EraView eraData={dotcom} era="dotcom" dataType={dataType} />
                </div>
              </>
            )}

            {view === 'modern' && (
              <>
                <DividerLabel text="Modern Era · 2015–2026" colorClass="text-emerald-400/70" />
                <div className="mt-4">
                  <EraView eraData={modern} era="modern" dataType={dataType} />
                </div>
              </>
            )}

            {view === 'compare' && (
              <>
                <DividerLabel text="Era Comparison · Dotcom vs Modern" colorClass="text-violet-400/70" />
                <div className="mt-4">
                  {dotcom && modern ? (
                    <CompareView dotcom={dotcom} modern={modern} dataType={dataType} />
                  ) : (
                    <div className="text-center py-16 font-mono text-sm text-[#6b7280]">
                      Both era datasets required for comparison.
                      {errors.dotcom && <p className="mt-1 text-xs text-red-400/70">Dotcom: {errors.dotcom}</p>}
                      {errors.modern && <p className="mt-1 text-xs text-red-400/70">Modern: {errors.modern}</p>}
                    </div>
                  )}
                </div>
              </>
            )}

          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1c2631] mt-16 py-5 px-6">
        <div className="flex flex-col items-center justify-between gap-2 mx-auto max-w-screen-2xl md:flex-row">
          <p className="font-mono text-[10px] text-[#4b5563] uppercase tracking-widest">
            Bubble Observatory · Research purposes only
          </p>
          <div className="font-mono text-[10px] text-[#4b5563] flex gap-4">
            <a href="https://github.com/omargpax/bubble-observatory/" className="text-emerald-400/40 hover:text-emerald-400"><span>open source</span></a>
            <span className="select-none text-white/40">·</span>
            <a href="https://github.com/omargpax/bubble-observatory/tree/main/public/data/" className="text-amber-400/40 hover:text-amber-400"> <span>data</span></a>        
          </div>
        </div>
      </footer>
    </div>
  )
}
