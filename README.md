# Interactive Dashboard - Bubble Observatory 📊

[![SkillIcons](https://skillicons.dev/icons?i=react,vite,tailwind,python,html,css)](https://skillicons.dev)

Plataforma analítica interactiva diseñada para realizar un estudio financiero comparativo y profundo entre dos épocas críticas del mercado: la **Burbuja Dotcom** y la **Era Moderna**. 

El proyecto integra un **pipeline de datos (ETL) automatizado en Python** para la extracción de métricas avanzadas y una interfaz de usuario interactiva y minimalista construida en **React**, **Vite** y **Tailwind CSS**.

---

## ⚙️ Arquitectura del Sistema y Pipeline de Datos (ETL)

La aplicación implementa una arquitectura desacoplada eficiente. En lugar de sobrecargar el cliente con peticiones en tiempo real a APIs financieras, el sistema se alimenta de una base de datos estática optimizada:
[yfinance API] ──(Python ETL Script)──> [JSON Datasets] ──> [React Frontend UI]

1. **Extracción (Python):** El script automatizado realiza descargas secuenciales controladas desde la API de **Yahoo Finance (`yfinance`)**, mitigando bloqueos de tráfico mediante pausas dinámicas.
2. **Transformación & Limpieza (Pandas):** * Aplana estructuras complejas (MultiIndex) devueltas por la API.
   * Filtra, limpia y estandariza los esquemas de datos a columnas planas (`Date`, `Sector`, `Ticker`, `Open`, `High`, `Low`, `Close`, `Volume`).
3. **Carga e Ingesta:** Utiliza la librería nativa `pathlib` para enrutar de forma dinámica los archivos resultantes sin importar el sistema operativo, exportándolos en formato JSON structured (`orient="records"`, fechas en formato `ISO`) dentro del ecosistema público del frontend.

---

## 📈 Matriz de Cobertura de Activos (Sectores y Tickers)

El observatorio financiero abarca **25 Large-Caps** de alta relevancia distribuidas equitativamente en 5 sectores estratégicos del mercado. El set de datos de la era Dotcom comprende un análisis temporal estricto de 11 años: desde el **01-01-1995 hasta el 31-12-2005**.

| Sector | Tickers Analizados (Era Dotcom) | Propósito del Análisis |
| :--- | :--- | :--- |
| **Tecnología** | `MSFT`, `CSCO`, `INTC`, `IBM`, `ORCL` | Monitorear el epicentro de la burbuja tecnológica y su posterior colapso. |
| **Salud (Healthcare)** | `JNJ`, `PFE`, `MRK`, `LLY`, `ABT` | Evaluar el comportamiento de activos defensivos durante mercados bajistas. |
| **Financiero** | `C`, `JPM`, `BAC`, `AIG`, `WFC` | Analizar la liquidez y la volatilidad del sector bancario de la época. |
| **Servicios de Comunicación** | `T`, `VZ`, `DIS`, `CMCSA`, `VOD` | Observar la transición de las telecomunicaciones a la era digital. |
| **Energía** | `XOM`, `CVX`, `BP`, `SHEL`, `SLB` | Estudiar la correlación de las materias primas frente al desplome de las acciones de crecimiento. |

---

## 🚀 Inicio Rápido (Quick Start)

### 1. Despliegue del Tablero Interactivo (Frontend)
Instala las dependencias y levanta el servidor local de desarrollo:
```bash
# Instalar módulos tolerando herencias de dependencias complejas
npm install --legacy-peer-deps

# Iniciar servidor local (por defecto en http://localhost:5173)
npm run dev
```
### 2. Ejecución del Pipeline de Datos (Python)
Si deseas regenerar o actualizar las fuentes de datos JSON que alimentan el observatorio:

```bash
# 1. Crear y activar entorno virtual aislado
python3 -m venv venv
source venv/bin/activate  # En Windows: .\venv\Scripts\activate

# 2. Instalar el set de librerías analíticas
pip install yfinance pandas

# 3. Procesar datos de Compañías
python3 public/scripts/bubble-observatory/companies/dotcom.py
python3 public/scripts/bubble-observatory/companies/modern.py

# 4. Procesar datos de ETFs
python3 public/scripts/bubble-observatory/etf/dotcom.py
python3 public/scripts/bubble-observatory/etf/modern.py
```
# 📊 Características del "Bubble Observatory"

> 💡 **Nota:** Para ver los detalles internos del flujo de extracción, consulta el [README complementario de scripts](https://github.com/omargpax/interactive-dashboard/blob/main/public/scripts/README.md).

### A. Modo Dashboard Individual por Era
Explora el comportamiento macro de una era específica a través de 6 pestañas funcionales:

* **Overview:** Tarjetas con KPIs críticos de rendimiento (retorno promedio, máxima caída o *drawdown*, volatilidad diaria, mejores y peores jornadas) junto a un gráfico de precios base.
* **Price:** Gráfico multilínea interactivo con normalización de precios y selectores (*toggles*) dinámicos para aislar o contrastar empresas específicas.
* **Drawdown:** Gráficas de área rodante que exponen la profundidad de las pérdidas de pico a valle y el tiempo que le tomó al mercado recuperarse.
* **Volatility:** Comparativa visual mediante barras horizontales cruzando la volatilidad estándar frente al impacto de pérdidas severas.
* **Volume:** Histogramas mensuales para analizar la liquidez y el volumen de transacciones en momentos de pánico o euforia financiera.
* **Full Stats:** Matriz de datos maestra, tabular y completamente ordenable para auditorías cuantitativas.

### B. Modo Comparativo Avanzado (Compare Mode ⇄)
* **Superposición Temporal Sincronizada:** Permite seleccionar dos activos de cualquier era y cruzar sus líneas de rendimiento ajustadas y normalizadas por "meses transcurridos" desde el inicio del ciclo.
* **Métricas Enfrentadas (Side-by-Side):** Comparación directa mediante tarjetas estadísticas de retorno neto, volatilidad acumulada y picos máximos de caída.
* **Narrativa Contextual:** Espacio de análisis escrito incorporado por sector que contrasta la tesis fundamental de la burbuja Dotcom frente a las métricas del mercado moderno.
