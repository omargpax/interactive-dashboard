# Interactive Dashboard

Aesthetic dashboard interactive

## Quick Start

```bash
npm install --legacy-peer-deps
npm run dev   # → http://localhost:5173
```

## Data Setup

Place read the readme file to generate the essential data

[README.md](https://github.com/omargpax/interactive-dashboard/tree/main/public/scripts/README.md)


## Features
### Bubble-observatory 
| Mode | What you see |
|---|---|
| **ETF Funds** | 5 benchmark ETFs per era |
| **Companies** | 25 large-caps across 5 sectors: Tech, Financial, Healthcare, Energy, Communication |

| View | Description |
|---|---|
| **Dotcom / Modern** | Full era dashboard with 6 tabs |
| **Compare ⇌** | Side-by-side overlay + written narrative analysis per sector |

#### Dashboard Tabs
- **Overview** — KPI cards (avg return, drawdown, vol, best/worst) + price chart
- **Price** — Normalized multi-line chart, toggleable tickers, key event markers
- **Drawdown** — Rolling peak-to-trough area chart per ticker
- **Volatility** — Horizontal bar charts for vol & max drawdown
- **Volume** — Monthly trading volume bars
- **Full Stats** — Sortable table with all metrics

#### Compare Mode
- Narrative analysis for each sector (dotcom context vs modern context + key insight)
- Select any two tickers and overlay them normalized by months elapsed
- Side-by-side stat cards: Return, Drawdown, Volatility, Peak→Trough
