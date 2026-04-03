// ─── Era config ──────────────────────────────────────────────────────────────
export const ERAS = {
  dotcom: {
    id: 'dotcom',
    label: 'Dotcom Era',
    range: '1995 – 2005',
    color: '#f59e0b',
    colorDim: 'rgba(245,158,11,0.15)',
    border: 'border-amber-500/30',
    textClass: 'text-amber-400',
    bgClass: 'bg-amber-500/10',
    glow: 'glow-amber',
  },
  modern: {
    id: 'modern',
    label: 'Modern Era',
    range: '2015 – 2026',
    color: '#10b981',
    colorDim: 'rgba(16,185,129,0.15)',
    border: 'border-emerald-500/30',
    textClass: 'text-emerald-400',
    bgClass: 'bg-emerald-500/10',
    glow: 'glow-green',
  },
}

// ─── Sector config ────────────────────────────────────────────────────────────
export const SECTORS = {
  Tecnologia: {
    label: 'Technology',
    icon: '⬡',
    color: '#38bdf8',
    dotcomTickers: ['MSFT', 'CSCO', 'INTC', 'IBM', 'ORCL'],
    modernTickers: ['MSFT', 'AAPL', 'NVDA', 'ADBE', 'AVGO'],
  },
  Financial: {
    label: 'Financial',
    icon: '◈',
    color: '#a78bfa',
    dotcomTickers: ['JPM', 'BAC', 'C', 'WFC', 'AIG'],
    modernTickers: ['JPM', 'BAC', 'WFC', 'V', 'MA'],
  },
  Healthcare: {
    label: 'Healthcare',
    icon: '✦',
    color: '#f472b6',
    dotcomTickers: ['JNJ', 'PFE', 'MRK', 'ABT', 'LLY'],
    modernTickers: ['JNJ', 'LLY', 'MRK', 'ABBV', 'UNH'],
  },
  Energy: {
    label: 'Energy',
    icon: '◉',
    color: '#fb923c',
    dotcomTickers: ['XOM', 'CVX', 'BP', 'SHEL', 'SLB'],
    modernTickers: ['XOM', 'CVX', 'SHEL', 'COP', 'TTE'],
  },
  Communication_Services: {
    label: 'Communication',
    icon: '◎',
    color: '#34d399',
    dotcomTickers: ['DIS', 'T', 'VZ', 'CMCSA', 'VOD'],
    modernTickers: ['GOOGL', 'META', 'DIS', 'NFLX', 'TMUS'],
  },
}

export const SECTOR_KEYS = Object.keys(SECTORS)

// ─── ETF Categories ───────────────────────────────────────────────────────────
export const ETF_CATEGORIES = {
  dotcom: ['Market_Indices', 'Sector_Tech', 'International_Global', 'Bond_Stable', 'Sector_Other'],
  modern: ['Market_Indices', 'Sector_Tech', 'International_Global', 'Bond_Stable', 'Sector_Other'],
}

// ─── Ticker colors for multi-line charts ─────────────────────────────────────
export const TICKER_COLORS = [
  '#f59e0b', '#38bdf8', '#a78bfa', '#f472b6', '#34d399',
  '#fb923c', '#818cf8', '#2dd4bf', '#e879f9', '#facc15',
]

// ─── Key historical events ────────────────────────────────────────────────────
export const EVENTS = {
  dotcom: [
    { date: '1999-12', label: 'Y2K Euphoria', color: '#f59e0b' },
    { date: '2000-03', label: 'Nasdaq Peak', color: '#ef4444' },
    { date: '2001-09', label: '9/11 Shock', color: '#6b7280' },
    { date: '2002-10', label: 'Cycle Bottom', color: '#10b981' },
  ],
  modern: [
    { date: '2020-03', label: 'COVID Crash', color: '#ef4444' },
    { date: '2021-11', label: 'Meme / SPAC Peak', color: '#f59e0b' },
    { date: '2022-10', label: 'Rate Hike Low', color: '#10b981' },
    { date: '2023-01', label: 'AI Rally', color: '#a78bfa' },
  ],
}

// ─── Comparative narratives ───────────────────────────────────────────────────
export const COMPARE_NARRATIVES = {
  overview: {
    title: 'Two Bubbles, One Pattern',
    dotcom: 'The Dotcom era (1995–2005) was driven by irrational exuberance around internet companies. The Nasdaq tripled in 5 years before losing 78% from peak — vaporizing $5 trillion. Tech dominated everything; profitability was irrelevant.',
    modern: 'The Modern era (2015–2026) saw sustained bull markets fueled by near-zero interest rates, followed by an AI-driven surge. Unlike 2000, today\'s leaders (NVDA, AAPL, MSFT) generate massive real earnings — but valuations in 2021 reached similar extremes.',
    insight: 'Both eras share a common structure: speculative excess → sharp correction → selective recovery. The key difference is that modern tech titans have real cash flows, making deep corrections painful but not necessarily extinction events.',
  },
  Tecnologia: {
    title: 'Tech: Speculation vs. Dominance',
    dotcom: 'CSCO, INTC and MSFT were the titans of the dotcom era — but most internet pure-plays had zero revenue. CISCO lost 89% from its 2000 peak. Even MSFT took 14 years to recover its highs.',
    modern: 'Today\'s tech giants are fundamentally different. NVDA\'s AI chip monopoly, MSFT\'s cloud revenue, and AAPL\'s ecosystem lock-in create durable earnings. NVDA rose +1,700% in 5 years on real demand.',
    insight: 'The dotcom correction was so severe because valuations were based on "eyeballs," not earnings. Modern tech crashes (2022: -60% for growth stocks) were sharp but shorter, as underlying cash flows provided a floor.',
  },
  Financial: {
    title: 'Banks: Crisis vs. Consolidation',
    dotcom: 'Financial stocks were relatively insulated from the dotcom crash — it wasn\'t their bubble. Banks like JPM and BAC held up better than tech. The real reckoning for financials came later in 2008.',
    modern: 'Post-2008 regulation transformed banking. JPM, BAC and the survivors emerged leaner. Fintech disruption (V, MA outperforming traditional banks) reflects a sector redefining itself around digital payments.',
    insight: 'In the dotcom era, financials were safe harbor. In the modern era, the real divide is between legacy banks (slow, regulated) and payment networks (V, MA) which behave more like tech companies.',
  },
  Healthcare: {
    title: 'Healthcare: The Steady Compounder',
    dotcom: 'Healthcare was the defensive standout of the dotcom collapse. JNJ, MRK and PFE saw modest declines while tech imploded. The biotech sub-sector, however, mirrored dotcom excess with its own mini-bubble.',
    modern: 'GLP-1 drugs transformed healthcare in the 2020s. LLY rose +700% as Ozempic/Mounjaro became blockbusters. ABBV built a post-Humira pipeline. Healthcare shifted from defensive to one of the decade\'s growth stories.',
    insight: 'Healthcare played the same defensive role in 2000 and 2022 downturns — but the modern era added a growth dimension through obesity drugs and oncology, elevating the sector\'s return profile significantly.',
  },
  Energy: {
    title: 'Energy: Commodities Rule Both Eras',
    dotcom: 'Energy was largely ignored during dotcom mania — oil was cheap ($10-20/barrel in 1998). XOM and CVX generated steady dividends while tech grabbed headlines. Post-2000, energy was one of the few sectors that gained.',
    modern: 'The 2022 energy supercycle (Ukraine war, OPEC cuts) delivered massive returns. XOM, CVX and SHEL tripled while growth stocks crashed. Energy became the ultimate inflation hedge and value play against tech froth.',
    insight: 'Energy tends to thrive when tech bubbles burst — both in 2000 and 2022, traditional energy companies delivered strong returns precisely when growth stocks collapsed. A recurring pattern of sector rotation.',
  },
  Communication_Services: {
    title: 'Comms: From Telecom to Platforms',
    dotcom: 'Telecom was at the epicenter of dotcom excess. Companies like WorldCom and Global Crossing spent billions on fiber, then went bankrupt. AT&T, VZ and DIS were the survivors — battered but alive.',
    modern: 'Communication Services was redefined. GOOGL and META replaced telecoms as the sector anchors. These ad-driven platforms reached $1T+ valuations. DIS struggled with streaming losses while NFLX pioneered the model.',
    insight: 'The sector transformation is total: from copper wires to attention economy. The modern Communication giants (GOOGL, META) face similar monopoly risks to 2000-era telecoms, but their moats are far stronger.',
  },
}
