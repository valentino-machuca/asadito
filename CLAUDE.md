# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # Start Vite dev server (http://localhost:5173)
npm run build        # TypeScript check + Vite production build
npm run preview      # Preview production build

# Testing
npm run test.unit    # Run Vitest unit tests
npm run test.e2e     # Run Cypress end-to-end tests (requires dev server running)

# Linting
npm run lint         # Run ESLint
```

To run a single unit test file: `npx vitest run src/tests/helpers/cuentas.test.ts`

## Architecture

**Stack:** Ionic 8 + React 18 + TypeScript + Vite, with Capacitor for native mobile (iOS/Android).

**Routing:** Tab-based navigation via `IonTabs` in `App.tsx`. Four main tabs:
- `/home` → Home
- `/cuentas` → Calculator (shared expense splitting)
- `/anotador` → Anotador (truco card game scorer)
- `/compras` → Compras (shopping list)

**State & Persistence:** No global state manager. Component-level state via `useState`. Persistent data uses `@ionic/storage` wrapped in `src/hooks/useStorage.ts` (database name: `asaditodb`).

**Key helpers in `src/helpers/`:**
- `cuentas.ts` — `calcularSaldos()`: core expense-splitting algorithm. Takes an array of `Persona` objects (each with food/drink expenses and whether they eat/drink), returns an array of transactions needed to settle the group.
- `formatearImporte.ts` — formats numbers as ARS (Argentine peso) currency.
- `trucoPoints.ts` — truco card game scoring logic.

**Data types** defined in `src/types/persona.tsx`:
- `Persona`: `{ nombre, gasto_comida, gasto_bebida, come, toma }`
- `ComprasItem`: `{ id, name, completed, date, tasks[] }`

**Styling:** SCSS modules per component (`.module.scss` alongside each component file). Global theme variables in `src/theme/variables.css`. App uses dark color scheme.

**Testing:**
- Unit tests: Vitest + Testing Library, configured in `vite.config.ts` with jsdom environment.
- E2E tests: Cypress, base URL `http://localhost:5173`.
- Test setup/mocks: `src/setupTests.ts`.
