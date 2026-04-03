# 📊 Data Generation Scripts

This guide outlines how to generate the essential historical financial data required to power the **Bubble Observatory** dashboard.

## Prerequisites
Ensure you have Python 3.x installed on your system.

---

## Quick Setup

Follow these steps to generate the `modern` and `dotcom` datasets for both ETFs and Companies.

### 1. Prepare the Environment
Create and activate an isolated Python virtual environment to manage dependencies:

```bash
# Create virtual environment
python3 -m venv venv

# Activate it (Linux/macOS)
source venv/bin/activate

# Install required packages
pip install yfinance pandas
```
### Generate data
Run the following scripts from the root directory of the project to fetch and process data via the Yahoo Finance API.

#### Companies
```bash
python3 public/scripts/bubble-observatory/companies/modern.py
python3 public/scripts/bubble-observatory/companies/dotcom.py
```
#### ETF
```bash
python3 public/scripts/bubble-observatory/etf/dotcom.py
python3 public/scripts/bubble-observatory/etf/modern.py
```

> **Note:** The generated `.json` files will be automatically processed and saved  into the `public/data/bubble-observatory/` directory.

### Clean Up
```
deactivate
```
