import yfinance as yf
import pandas as pd
import time

sectores = {
    "Tecnologia": ["MSFT", "CSCO", "INTC", "IBM", "ORCL"],
    "Healthcare": ["JNJ", "PFE", "MRK", "LLY", "ABT"],
    "Financial": ["C", "JPM", "BAC", "AIG", "WFC"],
    "Communication_Services": ["T", "VZ", "DIS", "CMCSA", "VOD"],
    "Energy": ["XOM", "CVX", "BP", "SHEL", "SLB"]
}

fecha_inicio = "1995-01-01"
fecha_fin = "2005-12-31"
datos_totales = []

print("Iniciando descarga de datos...")

for sector, tickers in sectores.items():
    print(f"\n--- Sector: {sector} ---")
    
    for ticker in tickers:
        try:
            # Descargamos uno por uno para tener control total sobre los errores
            print(f"Descargando {ticker}...", end=" ", flush=True)
            data = yf.download(ticker, start=fecha_inicio, end=fecha_fin, progress=False)
            
            if not data.empty:
                df_ticker = data.copy()
                df_ticker["Ticker"] = ticker
                df_ticker["Sector"] = sector
                df_ticker.reset_index(inplace=True)
                
                # Aseguramos que las columnas sean planas (yfinance a veces devuelve multi-index)
                if isinstance(df_ticker.columns, pd.MultiIndex):
                    df_ticker.columns = df_ticker.columns.get_level_values(0)

                datos_totales.append(df_ticker)
                print("OK")
            else:
                print("Sin datos encontrados.")
            
            # Pequeña pausa para no saturar la API
            time.sleep(0.5)
            
        except Exception as e:
            print(f"ERROR en {ticker}: {e}")
            continue

if datos_totales:
    print("\nProcesando dataset final...")
    dataset_final = pd.concat(datos_totales, ignore_index=True)
    
    # Limpieza de nombres de columnas por si acaso
    dataset_final.columns = [str(col) for col in dataset_final.columns]
    
    # Seleccionamos y ordenamos
    columnas = ["Date", "Sector", "Ticker", "Open", "High", "Low", "Close", "Volume"]
    dataset_final = dataset_final[columnas]
    
    dataset_final.to_csv("burbuja_com_sectores.csv", index=False)
    dataset_final.to_json("burbuja_com_sectores.json", orient="records", date_format="iso")
    
    print(f"¡Éxito! Se recolectaron {len(dataset_final)} registros.")
else:
    print("No se pudo recolectar ninguna información.")
