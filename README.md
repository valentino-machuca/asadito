# asadito 🔥

Aplicación móvil para reuniones sociales entre amigos. Reúne herramientas para dividir gastos, anotar partidas de truco, gestionar listas de compras y compartir playlists.

Construida con **Ionic + React + TypeScript + Capacitor**.

---

## Índice

- [Features](#features)
- [Stack tecnológico](#stack-tecnológico)
- [Instalación y desarrollo](#instalación-y-desarrollo)
- [Arquitectura del proyecto](#arquitectura-del-proyecto)
- [Herramientas incluidas](#herramientas-incluidas)
- [Lógica de cálculo de cuentas](#lógica-de-cálculo-de-cuentas)
- [Tests](#tests)

---

## Features

| Herramienta | Descripción |
|---|---|
| **Divisor de compras** | Calcula quién le debe plata a quién, separando comida y bebida |
| **Anotador de truco** | Marcador para partidas de truco con visualización de fósforos |
| **Lista de compras** | Listas de supermercado persistentes con ítems y estados |
| **Playlists** | Reproductores de Spotify embebidos para el asado |

---

## Stack tecnológico

| Categoría | Tecnología | Versión |
|---|---|---|
| Framework UI | Ionic React | 8.x |
| Frontend | React | 18.3 |
| Lenguaje | TypeScript | 5.4 |
| Build tool | Vite | 5.4 |
| Mobile | Capacitor | 7.5 |
| Storage | @ionic/storage (IndexedDB) | 4.0 |
| Estilos | SCSS Modules | — |
| Tests unitarios | Vitest | 2.x |
| Tests E2E | Cypress | 13.x |

---

## Instalación y desarrollo

**Requisitos:** Node.js 18+, npm 9+

```bash
# Clonar e instalar dependencias
npm install

# Servidor de desarrollo web
npm run dev
# → http://localhost:5173

# Tests unitarios (modo watch)
npm run test.unit

# Tests unitarios (una sola vez)
npm run test.unit -- --run

# Lint
npm run lint

# Build para producción
npm run build
```

### Compilar para móvil (Capacitor)

```bash
npm run build
npx cap sync
npx cap open android   # o ios
```

---

## Arquitectura del proyecto

```
src/
├── App.tsx                        # Root: routing con IonTabs
├── main.tsx                       # Entry point React 18
│
├── pages/                         # Una carpeta por ruta
│   ├── Home/                      # Landing con accesos a herramientas
│   ├── Calculator/                # Divisor de compras
│   ├── Anotador/                  # Marcador de truco
│   ├── Compras/                   # Lista de compras
│   └── Playlists/                 # Playlists de Spotify
│
├── components/                    # Componentes reutilizables
│   ├── CardPerson/                # Card de persona en calculadora
│   ├── FormModal/                 # Modal para agregar persona
│   ├── ModalResultados/           # Modal con resultado del cálculo
│   ├── Transaction/               # Tarjeta de transacción (A → $X → B)
│   ├── Fosforos/                  # Visualización de puntos (fósforos)
│   ├── Header/                    # Header reutilizable
│   ├── SplashScreen/              # Pantalla de carga inicial
│   └── TasksModal/                # Modal de ítems de lista de compras
│
├── hooks/
│   ├── useStorage.ts              # Wrapper sobre @ionic/storage
│   └── useNetwork.ts              # Estado de conectividad
│
├── helpers/
│   ├── cuentas.ts                 # Algoritmo de división de gastos
│   ├── trucoPoints.ts             # Manejo de puntos del truco
│   └── formatearImporte.ts        # Formateo de moneda (ARS)
│
├── types/
│   └── persona.tsx                # Tipos: Persona, Transaccion, SaldosResult
│
└── tests/
    └── helpers/
        └── cuentas.test.ts        # Tests unitarios del calculador
```

### Patrones utilizados

- **Navegación por tabs**: `IonTabs` + `IonTabBar` (rutas `/home`, `/cuentas`, `/anotador`, `/compras`, `/playlists`)
- **Estado local**: `useState` por página, sin Redux ni Context global
- **Persistencia**: `useStorage` wrappea `@ionic/storage` (IndexedDB en web, SQLite en nativo)
- **CSS**: SCSS Modules por componente — sin colisiones de estilos
- **Tipos**: Tipos exportados centralizados en `types/persona.tsx`, importados donde se necesitan

---

## Herramientas incluidas

### 1. Divisor de compras (`/cuentas`)

Calcula las transacciones mínimas para saldar cuentas entre un grupo, separando comida y bebida.

**Flujo de uso:**
1. Agregar participantes con nombre y montos gastados
2. Indicar si cada uno comió, bebió, o ambos
3. Presionar **Calcular** → se muestran las transferencias necesarias

**Casos soportados:**

| Perfil | Come | Toma | Comportamiento |
|---|---|---|---|
| Consumidor completo | ✅ | ✅ | Paga su cuota de comida + bebida |
| Conductor designado | ✅ | ❌ | Solo paga su cuota de comida |
| Llegó tarde | ❌ | ✅ | Solo paga su cuota de bebida |
| Acompañante | ❌ | ❌ | No se le cobra nada |

---

### 2. Anotador de truco (`/anotador`)

Marcador para dos equipos en partidas de truco argentino.

- Los puntos se visualizan como **fósforos** (grupos de 5)
- El partido termina al llegar a **30 puntos**
- Botones `+` y `-` por equipo
- Alert de confirmación para reiniciar partida
- Toast al ganar

---

### 3. Lista de compras (`/compras`)

Gestor de listas de supermercado con persistencia local.

- Crear múltiples listas con nombre y fecha
- Agregar/eliminar ítems individuales por lista
- Marcar ítems como completados
- Swipe para eliminar con confirmación
- Los datos se guardan en IndexedDB (persisten entre sesiones)

---

### 4. Playlists (`/playlists`)

Muestra reproductores de Spotify embebidos para ambientar el asado.

- Detecta conectividad mediante `useNetwork`
- Muestra mensaje offline si no hay internet
- 3 playlists hardcodeadas por defecto

---

## Lógica de cálculo de cuentas

El algoritmo en `src/helpers/cuentas.ts` funciona en dos pasos independientes:

### Paso 1: Filtrar participantes

```
personascomen = personas.filter(come === true)
personastoman = personas.filter(toma === true)
```

### Paso 2: Calcular por categoría (greedy)

Para cada pool (comida / bebida):

1. Calcula el **promedio** de gasto entre los participantes del pool
2. Determina la **diferencia** de cada uno vs. el promedio:
   - Diferencia negativa → deudor (gastó menos de lo que le corresponde)
   - Diferencia positiva → acreedor (gastó más de lo que le corresponde)
3. Empareja deudores con acreedores minimizando la cantidad de transacciones

**Protección contra división por cero**: si ningún participante está en un pool, la función retorna un array vacío para esa categoría sin lanzar errores.

### Ejemplo

| Persona | Come | Toma | Gasto comida | Gasto bebida |
|---|---|---|---|---|
| Ana | ✅ | ✅ | $0 | $1.000 |
| Bob | ✅ | ✅ | $900 | $0 |
| Carlos (conductor) | ✅ | ❌ | $0 | — |

**Pool comida** → promedio $300 → Ana debe $300 a Bob, Carlos debe $300 a Bob
**Pool bebida** → promedio $500 → Bob debe $500 a Ana
**Carlos** no aparece en el pool de bebida ✔️

---

## Tests

Los tests unitarios cubren `calcularSaldos` en `src/tests/helpers/cuentas.test.ts`:

```bash
npm run test.unit -- --run
```

| Suite | Descripción |
|---|---|
| División básica | 2 personas, split simple |
| Consumidor completo | Cobro por comida Y bebida |
| Conductor designado | Solo cobro por comida |
| El que llegó tarde | Solo cobro por bebida |
| Acompañante | Sin cobro en ningún pool |
| Protección de errores | Array vacío, pool sin participantes, sin crash |
| Escenario mixto | 3 personas con roles distintos y transacciones cruzadas |

---

## Variables de entorno / configuración

No se requieren variables de entorno para desarrollo web. Para builds nativos con Capacitor, configurar `capacitor.config.ts` según la plataforma destino.

---

## Autor

**Valentino Machuca** — [LinkedIn](https://www.linkedin.com/in/valentino-machuca/) · valentinomachuca.dev@gmail.com
Si te resulta útil, podés [invitar un café](https://cafecito.app/valentino_dev) ☕
