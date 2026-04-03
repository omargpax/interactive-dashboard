import yfinance as yf
import pandas as pd
import time

# 1. Definir los líderes actuales de cada sector (GICS Sector Leaders)
sectores = {
    "Tecnologia": ["AAPL", "MSFT", "NVDA", "AVGO", "ADBE"],       # Apple, Microsoft, Nvidia, Broadcom, Adobe
    "Healthcare": ["LLY", "UNH", "JNJ", "MRK", "ABBV"],         # Eli Lilly, UnitedHealth, J&J, Merck, AbbVie
    "Financial": ["JPM", "V", "MA", "BAC", "WFC"],             # JPMorgan, Visa, Mastercard, BofA, Wells Fargo
    "Communication_Services": ["GOOGL", "META", "NFLX", "DIS", "TMUS"], # Google, Meta, Netflix, Disney, T-Mobile
    "Energy": ["XOM", "CVX", "COP", "SHEL", "TTE"]             # Exxon, Chevron, ConocoPhillips, Shell, Total
}

# 2. Rango de fechas para la era actual
fecha_inicio = "2015-01-01"
fecha_fin = "2026-03-31"
datos_totales = []

print(f"Iniciando descarga de datos de la era actual ({fecha_inicio} a {fecha_fin})...")

for sector, tickers in sectores.items():
    print(f"\n--- Sector: {sector} ---")
    
    for ticker in tickers:
        try:
            print(f"Descargando {ticker}...", end=" ", flush=True)
            # Descarga de datos históricos
            data = yf.download(ticker, start=fecha_inicio, end=fecha_fin, progress=False)
            
            if not data.empty:
                df_ticker = data.copy()
                
                # Manejo de MultiIndex (yfinance suele devolverlo así en versiones nuevas)
                if isinstance(df_ticker.columns, pd.MultiIndex):
                    df_ticker.columns = df_ticker.columns.get_level_values(0)
                
                df_ticker["Ticker"] = ticker
                df_ticker["Sector"] = sector
                df_ticker.reset_index(inplace=True)
                
                # Limpiar nombres de columnas (quitar espacios en blanco)
                df_ticker.columns = [str(col).strip() for col in df_ticker.columns]

                datos_totales.append(df_ticker)
                print(f"OK ({len(df_ticker)} registros)")
            else:
                print("Sin datos encontrados.")
            
            time.sleep(0.5) # Pausa de cortesía para la API
            
        except Exception as e:
            print(f"ERROR en {ticker}: {e}")
            continue

if datos_totales:
    print("\nProcesando dataset final...")
    dataset_final = pd.concat(datos_totales, ignore_index=True)
    
    # Asegurar orden y presencia de columnas clave
    columnas_deseadas = ["Date", "Sector", "Ticker", "Open", "High", "Low", "Close", "Volume"]
    columnas_existentes = [c for c in columnas_deseadas if c in dataset_final.columns]
    dataset_final = dataset_final[columnas_existentes]
    
    # Exportar resultados
    archivo_csv = "empresas_era_actual_2020_2025.csv"
    archivo_json = "empresas_era_actual_2020_2025.json"
    
    dataset_final.to_csv(archivo_csv, index=False)
    dataset_final.to_json(archivo_json, orient="records", date_format="iso")
    
    print(f"¡Éxito! Archivos generados correctamente:")
    print(f"- {archivo_csv}")
    print(f"- {archivo_json}")
else:
    print("No se pudo recolectar información.")
