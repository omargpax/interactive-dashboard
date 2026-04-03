import yfinance as yf
import pandas as pd
import time

# 1. Definir categorías de ETFs representativos (o sus equivalentes con historial)
# NOTA: Se usa QQQ en lugar de QQQM porque QQQM nació en 2020 y no tiene datos del 2000.
sectores = {
    "Market_Indices": ["SPY", "DIA", "QQQ", "IWM", "MDY"],  # S&P500, Dow Jones, Nasdaq 100, etc.
    "Tech_Growth": ["XLK", "SMH", "IGV", "SOXX", "FDN"],    # Tecnología, Semiconductores, Software.
    "Safe_Haven_Commodities": ["GLD", "SLV", "XAU=F", "GC=F", "SI=F"], # Oro y Plata (mezcla de ETF y Futuros para historial).
    "Energy_Industrials": ["XLE", "XLI", "XLU", "IYE", "IYW"],
    "International_Global": ["EFA", "EWJ", "VGK", "EWG", "EFE"] # Mercados extranjeros (Europa, Japón, etc.)
}

fecha_inicio = "1995-01-01"
fecha_fin = "2005-12-31"
datos_totales = []

print("Iniciando descarga de datos de ETFs...")

for sector, tickers in sectores.items():
    print(f"\n--- Categoría: {sector} ---")
    
    for ticker in tickers:
        try:
            print(f"Descargando {ticker}...", end=" ", flush=True)
            # Descarga individual para evitar el TypeError masivo
            data = yf.download(ticker, start=fecha_inicio, end=fecha_fin, progress=False)
            
            if not data.empty:
                df_ticker = data.copy()
                
                # Aplanar multi-index si existe (cambio reciente en yfinance)
                if isinstance(df_ticker.columns, pd.MultiIndex):
                    df_ticker.columns = df_ticker.columns.get_level_values(0)
                
                df_ticker["Ticker"] = ticker
                df_ticker["Category"] = sector
                df_ticker.reset_index(inplace=True)
                
                datos_totales.append(df_ticker)
                print(f"OK ({len(df_ticker)} filas)")
            else:
                print("Sin datos (posiblemente el ETF no existía en esa fecha).")
            
            time.sleep(0.6) # Pausa amigable para la API
            
        except Exception as e:
            print(f"ERROR en {ticker}: {e}")
            continue

if datos_totales:
    print("\nGenerando archivos finales...")
    dataset_final = pd.concat(datos_totales, ignore_index=True)
    
    # Estandarizar nombres de columnas
    dataset_final.columns = [str(col).strip() for col in dataset_final.columns]
    
    columnas_ordenadas = ["Date", "Category", "Ticker", "Open", "High", "Low", "Close", "Volume"]
    # Filtrar solo las columnas que existan en el dataframe resultante
    columnas_finales = [c for c in columnas_ordenadas if c in dataset_final.columns]
    
    dataset_final = dataset_final[columnas_finales]
    
    dataset_final.to_csv("etf_dotcom_bubble.csv", index=False)
    dataset_final.to_json("etf_dotcom_bubble.json", orient="records", date_format="iso")
    
    print(f"¡Listo! Dataset guardado con {len(dataset_final)} registros.")
else:
    print("No se recolectaron datos. Verifica tu conexión o los tickers.")
