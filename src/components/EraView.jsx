import React, { useState, useMemo } from 'react'
import { Panel, StatCard, SectionLabel, EmptyState } from './ui'
import PriceChart from './PriceChart'
import DrawdownChart from './DrawdownChart'
import VolBarChart from './VolBarChart'
import VolumeChart from './VolumeChart'
import StatsTable from './StatsTable'
import SectorNav from './SectorNav'
import { fmtPct } from '../utils/dataUtils'
import { ERAS, SECTORS } from '../utils/constants'

const TABS = [
  { id: 'overview',   label: '⬡  Overview',    desc: 'KPIs & price chart' },
  { id: 'price',      label: '◈  Price',        desc: 'Normalized lines' },
  { id: 'drawdown',   label: '▼  Drawdown',     desc: 'Rolling decline' },
  { id: 'volatility', label: '~  Volatility',   desc: 'Risk metrics' },
  { id: 'volume',     label: '◉  Volume',       desc: 'Monthly trading' },
  { id: 'table',      label: '≡  Full Stats',   desc: 'All metrics' },
]

export default function EraView({ eraData, era, dataType }) {
  const [tab, setTab]         = useState('overview')
  const [sector, setSector]   = useState('all')

  const cfg = ERAS[era]
  if (!eraData) return <EmptyState message={`No ${era} data loaded`} sub={`Place your JSON at public/data/${dataType === 'etf' ? 'etf' : 'companies'}/${era}.json`} />

  // Filter tickers by sector (companies mode)
  const allTickers = eraData.tickers
  const activeTickers = useMemo(() => {
    if (dataType !== 'companies' || sector === 'all') return allTickers
    return allTickers.filter(t => eraData.stats[t]?.sector === sector)
  }, [allTickers, sector, dataType, eraData])

  // Active series
  const activeSeries = useMemo(() => {
    if (dataType !== 'companies' || sector === 'all') return eraData.allSeries
    return eraData.sectorSeries?.[sector] ?? eraData.allSeries
  }, [eraData, sector, dataType])

  // KPIs
  const statRows = activeTickers.map(t => eraData.stats[t]).filter(Boolean)
  const avgReturn  = statRows.reduce((s, r) => s + r.totalReturn, 0) / (statRows.length || 1)
  const avgDD      = statRows.reduce((s, r) => s + r.maxDrawdown,  0) / (statRows.length || 1)
  const avgVol     = statRows.reduce((s, r) => s + r.volatility,   0) / (statRows.length || 1)
  const best       = statRows.reduce((a, b) => !a || b.totalReturn > a.totalReturn ? b : a, null)
  const worst      = statRows.reduce((a, b) => !a || b.totalReturn < a.totalReturn ? b : a, null)

  const accentColor = era === 'dotcom' ? 'amber' : 'green'

  return (
    <div className="space-y-5">
      {/* Sector nav — companies only */}
      {dataType === 'companies' && (
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-2">Filter by sector</p>
          <SectorNav activeSector={sector} onSelect={s => setSector(s)} era={era} availableSectors={eraData.sectors} />
        </div>
      )}

      {/* Tab bar */}
      <div className="flex items-center gap-0.5 border-b border-[#1c2631] overflow-x-auto pb-0">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`
              group flex items-center gap-1.5 px-4 py-2.5 font-mono text-[11px] tracking-wider whitespace-nowrap
              border-b-2 transition-all duration-200
              ${tab === t.id
                ? `border-current ${cfg.textClass}`
                : 'border-transparent text-[#6b7280] hover:text-[#c9d1d9]'}
            `}
          >
            {t.label}
            <span className={`text-[9px] hidden lg:inline transition-colors ${tab === t.id ? 'opacity-60' : 'opacity-0 group-hover:opacity-40'}`}>
              {t.desc}
            </span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div key={`${era}-${tab}-${sector}`}>

        {/* OVERVIEW */}
        {tab === 'overview' && (
          <div className="space-y-5 chart-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard label="Avg Total Return" value={fmtPct(avgReturn)}
                sub={`${activeTickers.length} ${dataType === 'etf' ? 'ETFs' : 'companies'}`}
                trend={avgReturn >= 0 ? 'up' : 'down'} accent={avgReturn >= 0 ? accentColor : 'red'} />
              <StatCard label="Avg Max Drawdown" value={fmtPct(avgDD)}
                sub="rolling peak decline" accent="red" />
              <StatCard label="Avg Volatility" value={fmtPct(avgVol)}
                sub="annualized std dev" accent="blue" />
              <StatCard label="Best Performer" value={best?.ticker ?? '—'}
                sub={fmtPct(best?.totalReturn)} trend="up" accent={accentColor} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <StatCard label="Worst Performer" value={worst?.ticker ?? '—'}
                sub={fmtPct(worst?.totalReturn)} trend="down" accent="red" />
              <StatCard label="Highest Volatility" value={statRows.reduce((a,b) => b.volatility > a.volatility ? b : a, statRows[0])?.ticker ?? '—'}
                sub={fmtPct(statRows.reduce((a,b) => b.volatility > a.volatility ? b : a, statRows[0])?.volatility)} accent="blue" />
              <StatCard label="Deepest Drawdown" value={statRows.reduce((a,b) => b.maxDrawdown < a.maxDrawdown ? b : a, statRows[0])?.ticker ?? '—'}
                sub={fmtPct(statRows.reduce((a,b) => b.maxDrawdown < a.maxDrawdown ? b : a, statRows[0])?.maxDrawdown)} accent="red" />
            </div>
            <Panel title={`Price performance — ${sector === 'all' ? 'All' : SECTORS[sector]?.label ?? sector}`} accent={accentColor}>
              {activeSeries?.length
                ? <PriceChart series={activeSeries} tickers={activeTickers} era={era} />
                : <EmptyState message="No series data" />}
            </Panel>
          </div>
        )}

        {/* PRICE CHART */}
        {tab === 'price' && (
          <Panel title="Normalized price — base 100 at period start" accent={accentColor}>
            {activeSeries?.length
              ? <PriceChart series={activeSeries} tickers={activeTickers} era={era} height={420} />
              : <EmptyState />}
          </Panel>
        )}

        {/* DRAWDOWN */}
        {tab === 'drawdown' && (
          <Panel title="Rolling drawdown — % decline from all-time high" accent="red">
            <DrawdownChart monthlyGrouped={eraData.monthlyGrouped} tickers={activeTickers} era={era} />
          </Panel>
        )}

        {/* VOLATILITY */}
        {tab === 'volatility' && (
          <Panel title="Risk metrics — volatility & drawdown comparison" accent={accentColor}>
            <VolBarChart stats={eraData.stats} tickers={activeTickers} era={era} />
          </Panel>
        )}

        {/* VOLUME */}
        {tab === 'volume' && (
          <Panel title="Monthly trading volume" accent={accentColor}>
            <VolumeChart monthlyGrouped={eraData.monthlyGrouped} tickers={activeTickers} era={era} />
          </Panel>
        )}

        {/* TABLE */}
        {tab === 'table' && (
          <Panel title="Full statistics — all metrics" accent={accentColor}>
            <StatsTable stats={eraData.stats} tickers={activeTickers} />
          </Panel>
        )}

      </div>
    </div>
  )
}
