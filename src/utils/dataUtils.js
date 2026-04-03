export function groupByKey(records, key = 'Ticker') {
  return records.reduce((acc, row) => {
    if (!acc[row[key]]) acc[row[key]] = []
    acc[row[key]].push(row)
    return acc
  }, {})
}

export function toMonthly(records) {
  const byMonth = {}
  records.forEach((r) => {
    const d = new Date(r.Date)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    byMonth[key] = r
  })
  return Object.entries(byMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, r]) => ({ ...r, month }))
}

export function normalizeToBase(records, base = 100) {
  if (!records.length) return []
  const first = records[0].Close
  return records.map((r) => ({ ...r, normalized: (r.Close / first) * base }))
}

export function buildMultiSeries(groupedMonthly) {
  const allDates = new Set()
  const maps = {}
  Object.entries(groupedMonthly).forEach(([key, monthly]) => {
    const norm = normalizeToBase(monthly)
    maps[key] = {}
    norm.forEach((r) => {
      allDates.add(r.month)
      maps[key][r.month] = r.normalized
    })
  })
  return Array.from(allDates).sort().map((date) => {
    const pt = { date }
    Object.keys(maps).forEach((k) => { pt[k] = maps[k][date] ?? null })
    return pt
  })
}

export function buildMonthsNormalized(monthlyRecords) {
  const norm = normalizeToBase(monthlyRecords)
  return norm.map((r, i) => ({ monthIdx: i, value: r.normalized, date: r.month }))
}

export function totalReturn(records) {
  if (records.length < 2) return 0
  return ((records[records.length - 1].Close - records[0].Close) / records[0].Close) * 100
}

export function maxDrawdown(records) {
  let peak = -Infinity, maxDD = 0
  for (const r of records) {
    if (r.Close > peak) peak = r.Close
    const dd = (r.Close - peak) / peak
    if (dd < maxDD) maxDD = dd
  }
  return maxDD * 100
}

export function annualizedVol(records) {
  if (records.length < 2) return 0
  const rets = []
  for (let i = 1; i < records.length; i++)
    rets.push(Math.log(records[i].Close / records[i - 1].Close))
  const mean = rets.reduce((a, b) => a + b, 0) / rets.length
  const variance = rets.reduce((s, r) => s + (r - mean) ** 2, 0) / rets.length
  return Math.sqrt(variance * 252) * 100
}

export function computeDrawdownSeries(monthlyRecords) {
  let peak = -Infinity
  return monthlyRecords.map((r) => {
    if (r.Close > peak) peak = r.Close
    const dd = peak > 0 ? ((r.Close - peak) / peak) * 100 : 0
    return { date: r.month, drawdown: parseFloat(dd.toFixed(2)) }
  })
}

export function getTickerStats(ticker, daily, monthly) {
  let peakRec = daily[0]
  daily.forEach((r) => { if (r.Close > peakRec.Close) peakRec = r })
  const afterPeak = daily.filter((r) => new Date(r.Date) >= new Date(peakRec.Date))
  let troughRec = afterPeak[0] || daily[daily.length - 1]
  afterPeak.forEach((r) => { if (r.Close < troughRec.Close) troughRec = r })

  return {
    ticker,
    totalReturn: totalReturn(daily),
    maxDrawdown: maxDrawdown(daily),
    volatility: annualizedVol(daily),
    startPrice: daily[0]?.Close,
    endPrice: daily[daily.length - 1]?.Close,
    peakPrice: peakRec?.Close,
    peakDate: peakRec?.Date,
    troughPrice: troughRec?.Close,
    troughDate: troughRec?.Date,
    peakToTrough: peakRec && troughRec
      ? ((troughRec.Close - peakRec.Close) / peakRec.Close) * 100 : null,
    dataPoints: daily.length,
  }
}

export function fmtPct(v, d = 1) {
  if (v == null || isNaN(v)) return '—'
  return `${v >= 0 ? '+' : ''}${v.toFixed(d)}%`
}
export function fmtPrice(v) {
  if (v == null) return '—'
  return `$${v.toFixed(2)}`
}
export function fmtDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
