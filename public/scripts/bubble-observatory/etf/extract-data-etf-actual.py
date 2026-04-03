import yfinance as yf
import pandas as pd
import time

# 1. Definir los ETFs más grandes y relevantes del periodo actual
sectores = {
    "Broad_Market": ["SPY", "VOO", "VTI", "IVV", "QQQ"],        # Los pilares del S&P 500 y mercado total.
    "Tech_Innovation": ["QQQM", "SMH", "XLK", "VGT", "ARKK"],   # El boom de semiconductores, software e innovación.
    "Value_Dividends": ["SCHD", "VTV", "VIG", "VYM", "XLF"],    # Estrategias defensivas y financieras.
    "International": ["VXUS", "VEA", "VWO", "IEMG", "EFA"],     # Mercados desarrollados y emergentes fuera de EE.UU.
    "Alternative_Assets": ["IBIT", "BITO", "GLD", "SLV", "USO"] # Cripto (Spot/Futures), Oro, Plata y Petróleo.
}

# 2. Rango de fechas: Desde el inicio de la década hasta el cierre de 2025
fecha_inicio = "2015-01-01"
fecha_fin = "2026-03-31"
datos_totales = []

print(f"Iniciando descarga de datos (Periodo {fecha_inicio} a {fecha_fin})...")

for sector, tickers in sectores.items():
    print(f"\n--- Categoría: {sector} ---")
    
    for ticker in tickers:
        try:
            print(f"Descargando {ticker}...", end=" ", flush=True)
            # Descarga individual
            data = yf.download(ticker, start=fecha_inicio, end=fecha_fin, progress=False)
            
            if not data.empty:
                df_ticker = data.copy()
                
                # Manejo de MultiIndex en versiones recientes de yfinance
                if isinstance(df_ticker.columns, pd.MultiIndex):
                    df_ticker.columns = df_ticker.columns.get_level_values(0)
                
                df_ticker["Ticker"] = ticker
                df_ticker["Category"] = sector
                df_ticker.reset_index(inplace=True)
                
                datos_totales.append(df_ticker)
                # Informamos cuántos días de trading se recuperaron
                print(f"OK ({len(df_ticker)} registros)")
            else:
                print("Sin datos (el activo podría ser más reciente que la fecha de inicio).")
            
            time.sleep(0.5) # Pausa para evitar rate-limiting
            
        except Exception as e:
            print(f"ERROR en {ticker}: {e}")
            continue

if datos_totales:
    print("\nConsolidando información...")
    dataset_final = pd.concat(datos_totales, ignore_index=True)
    
    # Limpieza básica de columnas
    dataset_final.columns = [str(col).strip() for col in dataset_final.columns]
    
    columnas_ordenadas = ["Date", "Category", "Ticker", "Open", "High", "Low", "Close", "Volume"]
    columnas_finales = [c for c in columnas_ordenadas if c in dataset_final.columns]
    
    dataset_final = dataset_final[columnas_finales]
    
    # Exportación
    nombre_csv = "etf_modern_era_2020_2025.csv"
    nombre_json = "etf_modern_era_2020_2025.json"
    
    dataset_final.to_csv(nombre_csv, index=False)
    dataset_final.to_json(nombre_json, orient="records", date_format="iso")
    
    print(f"\n¡Éxito! Dataset generado:")
    print(f"- CSV: {nombre_csv}")
    print(f"- JSON: {nombre_json}")
    print(f"- Total de filas: {len(dataset_final)}")
else:
    print("No se recolectaron datos. Revisa la conexión o los tickers.")
