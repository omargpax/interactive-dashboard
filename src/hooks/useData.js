import { useState, useEffect, useMemo } from 'react'
import { groupByKey, toMonthly, buildMultiSeries, getTickerStats } from '../utils/dataUtils'

// Processes one era's raw data (works for both ETF & Companies)
// groupField: 'Ticker' (both); categoryField: 'Category' | 'Sector'
function processEra(raw, categoryField) {
  if (!raw) return null
  const byTicker = groupByKey(raw, 'Ticker')
  const tickers = Object.keys(byTicker).sort()

  // Build sector/category mapping
  const sectorMap = {}
  tickers.forEach((t) => {
    sectorMap[t] = byTicker[t][0]?.[categoryField] ?? 'Unknown'
  })
  const sectors = [...new Set(Object.values(sectorMap))].sort()

  // Monthly grouped
  const monthlyGrouped = {}
  tickers.forEach((t) => { monthlyGrouped[t] = toMonthly(byTicker[t]) })

  // Per-ticker stats
  const stats = {}
  tickers.forEach((t) => {
    stats[t] = {
      ...getTickerStats(t, byTicker[t], monthlyGrouped[t]),
      sector: sectorMap[t],
    }
  })

  // Multi-series for each sector
  const sectorSeries = {}
  sectors.forEach((sector) => {
    const sectorTickers = tickers.filter((t) => sectorMap[t] === sector)
    const grouped = {}
    sectorTickers.forEach((t) => { grouped[t] = monthlyGrouped[t] })
    sectorSeries[sector] = buildMultiSeries(grouped)
  })

  // All-ticker series
  const allSeries = buildMultiSeries(monthlyGrouped)

  return { tickers, sectors, sectorMap, monthlyGrouped, stats, sectorSeries, allSeries }
}

export function useData(dataType) {
  // dataType: 'etf' | 'companies'
  const [raw, setRaw] = useState({ dotcom: null, modern: null })
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setLoading(true)
    setRaw({ dotcom: null, modern: null })
    setErrors({})

    const paths = dataType === 'etf'
      ? { dotcom: '/data/etf/dotcom.json', modern: '/data/etf/modern.json' }
      : { dotcom: '/data/companies/dotcom.json', modern: '/data/companies/modern.json' }

    const load = async () => {
      const errs = {}
      const results = {}
      await Promise.all(
        Object.entries(paths).map(async ([era, path]) => {
          try {
            const res = await fetch(path)
            if (!res.ok) throw new Error(`HTTP ${res.status} — ${path}`)
            results[era] = await res.json()
          } catch (e) {
            errs[era] = e.message
          }
        })
      )
      setRaw(results)
      setErrors(errs)
      setLoading(false)
    }
    load()
  }, [dataType])

  const categoryField = dataType === 'etf' ? 'Category' : 'Sector'

  const dotcom = useMemo(() => processEra(raw.dotcom, categoryField), [raw.dotcom, categoryField])
  const modern = useMemo(() => processEra(raw.modern, categoryField), [raw.modern, categoryField])

  return { dotcom, modern, loading, errors }
}
