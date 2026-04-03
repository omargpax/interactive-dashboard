import React, { useState } from 'react'
import { fmtPct, fmtPrice, fmtDate } from '../utils/dataUtils'

const COLS = [
  { key: 'ticker',      label: 'TICKER',    align: 'left',  fmt: v => v },
  { key: 'sector',      label: 'SECTOR',    align: 'left',  fmt: v => v?.replace('_', ' ') },
  { key: 'totalReturn', label: 'TOTAL RTN', align: 'right', fmt: v => fmtPct(v) },
  { key: 'maxDrawdown', label: 'MAX DD',    align: 'right', fmt: v => fmtPct(v) },
  { key: 'volatility',  label: 'VOL (ANN)', align: 'right', fmt: v => fmtPct(v) },
  { key: 'startPrice',  label: 'START',     align: 'right', fmt: v => fmtPrice(v) },
  { key: 'endPrice',    label: 'END',       align: 'right', fmt: v => fmtPrice(v) },
  { key: 'peakPrice',   label: 'PEAK',      align: 'right', fmt: v => fmtPrice(v) },
  { key: 'peakToTrough',label: 'PK→TR',    align: 'right', fmt: v => v != null ? fmtPct(v) : '—' },
]

function cellAccent(key, val) {
  if (typeof val !== 'number') return 'text-[#c9d1d9]'
  if (key === 'totalReturn')  return val >= 0 ? 'text-emerald-400' : 'text-red-400'
  if (key === 'maxDrawdown')  return 'text-red-400'
  if (key === 'peakToTrough') return val >= 0 ? 'text-emerald-400' : 'text-red-400'
  return 'text-[#c9d1d9]'
}

export default function StatsTable({ stats, tickers }) {
  const [sortKey, setSortKey] = useState('totalReturn')
  const [dir, setDir]         = useState(-1)

  const rows = tickers.map(t => stats[t]).filter(Boolean)
  const sorted = [...rows].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey]
    if (av == null) return 1; if (bv == null) return -1
    return dir * (typeof av === 'string' ? av.localeCompare(bv) : av - bv)
  })

  const handleSort = k => {
    if (k === sortKey) setDir(d => -d)
    else { setSortKey(k); setDir(-1) }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse min-w-[780px]">
        <thead>
          <tr className="border-b border-[#1c2631]">
            {COLS.map(col => (
              <th key={col.key} onClick={() => handleSort(col.key)}
                className={`font-mono text-[10px] uppercase tracking-[0.15em] py-3 px-3 text-[#6b7280] cursor-pointer hover:text-amber-400 transition-colors ${col.align === 'right' ? 'text-right' : 'text-left'}`}
              >
                {col.label}
                {sortKey === col.key && <span className="ml-1 text-amber-400">{dir === -1 ? '↓' : '↑'}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={row.ticker} className="border-b border-[#1c2631]/40 hover:bg-[#111820] transition-colors">
              {COLS.map(col => {
                const raw = row[col.key]
                return (
                  <td key={col.key}
                    className={`font-mono text-xs py-3 px-3 ${col.align === 'right' ? 'text-right' : 'text-left'} ${
                      col.key === 'ticker' ? 'text-amber-400 font-semibold tracking-wider' :
                      col.key === 'sector' ? 'text-[#6b7280] text-[10px]' :
                      cellAccent(col.key, raw)
                    }`}
                  >
                    {col.fmt(raw) ?? '—'}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="font-mono text-[10px] text-[#4b5563] mt-3 px-2">
        Click column headers to sort · Vol = Annualized volatility · PK→TR = Peak-to-trough decline
      </p>
    </div>
  )
}
