# Data Directory

## Required structure

```
data/
  etf/
    dotcom.json     ← ETF data 1995-2005 (Category field)
    modern.json     ← ETF data 2015-2026 (Category field)
  companies/
    dotcom.json     ← Company stocks 1995-2005 (Sector field)
    modern.json     ← Company stocks 2015-2026 (Sector field)
```

## Companies JSON format
```json
[
  {
    "Date": "2015-01-02T00:00:00.000",
    "Sector": "Tecnologia",
    "Ticker": "AAPL",
    "Open": 24.67,
    "High": 24.68,
    "Low": 23.77,
    "Close": 24.21,
    "Volume": 212818400
  }
]
```

## ETF JSON format
```json
[
  {
    "Date": "1995-01-03T00:00:00.000",
    "Category": "Market_Indices",
    "Ticker": "SPY",
    "Open": 26.46,
    "High": 26.54,
    "Low": 26.45,
    "Close": 26.51,
    "Volume": 324300
  }
]
```
