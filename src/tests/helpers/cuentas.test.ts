import { calcularSaldos } from '../../helpers/cuentas';
import type { Persona, SaldosResult } from '../../types/persona';

// ---------------------------------------------------------------------------
// Helpers de construcción para mantener los tests concisos
// ---------------------------------------------------------------------------

function persona(
    nombre: string,
    gasto_comida: number,
    gasto_bebida: number,
    come: boolean,
    toma: boolean
): Persona {
    return { nombre, gasto_comida: String(gasto_comida), gasto_bebida: String(gasto_bebida), come, toma };
}

// ---------------------------------------------------------------------------
// Suite principal
// ---------------------------------------------------------------------------

describe('calcularSaldos — calculadora de cuentas grupales', () => {

    // -----------------------------------------------------------------------
    // CASO BASE: división simple entre dos personas
    // -----------------------------------------------------------------------

    describe('división básica entre 2 personas', () => {
        test('quien gastó menos le paga la diferencia al que gastó más', () => {
            const personas: Persona[] = [
                persona('Ana', 500, 0, true, false),
                persona('Bob', 1500, 0, true, false),
            ];

            const result: SaldosResult = calcularSaldos(personas);

            // Promedio comida: (500 + 1500) / 2 = 1000
            // Ana pagó 500 → debe 500; Bob pagó 1500 → le deben 500
            expect(result.transacciones_comida).toEqual([
                { deudor: 'Ana', acreedor: 'Bob', monto: 500 },
            ]);
            expect(result.transacciones_bebida).toEqual([]);
        });
    });

    // -----------------------------------------------------------------------
    // CASO 1: El consumidor completo (come Y toma)
    // -----------------------------------------------------------------------

    describe('El consumidor completo — come: true, toma: true', () => {
        test('se le cobra su cuota de comida Y su cuota de bebida', () => {
            const personas: Persona[] = [
                // Ana pagó toda la comida, Bob pagó toda la bebida
                persona('Ana', 900, 0, true, true),
                persona('Bob', 0, 600, true, true),
                persona('Carlos', 0, 0, true, true),
            ];

            const result: SaldosResult = calcularSaldos(personas);

            // Promedio comida: 900 / 3 = 300 → Bob debe 300 a Ana, Carlos debe 300 a Ana
            expect(result.transacciones_comida).toEqual([
                { deudor: 'Bob', acreedor: 'Ana', monto: 300 },
                { deudor: 'Carlos', acreedor: 'Ana', monto: 300 },
            ]);

            // Promedio bebida: 600 / 3 = 200 → Ana debe 200 a Bob, Carlos debe 200 a Bob
            expect(result.transacciones_bebida).toEqual([
                { deudor: 'Ana', acreedor: 'Bob', monto: 200 },
                { deudor: 'Carlos', acreedor: 'Bob', monto: 200 },
            ]);
        });
    });

    // -----------------------------------------------------------------------
    // CASO 2: El conductor designado (solo come, no toma)
    // -----------------------------------------------------------------------

    describe('El conductor designado — come: true, toma: false', () => {
        test('se incluye en el pool de comida pero queda fuera del pool de bebida', () => {
            const personas: Persona[] = [
                persona('Ana', 0, 1000, true, true),   // pagó bebida
                persona('Bob', 900, 0, true, true),     // pagó comida
                persona('Carlos', 0, 0, true, false),  // conductor: solo come
            ];

            const result: SaldosResult = calcularSaldos(personas);

            // Pool comida: [Ana=0, Bob=900, Carlos=0] → promedio 300
            // Ana debe 300 a Bob, Carlos debe 300 a Bob
            expect(result.transacciones_comida).toContainEqual({ deudor: 'Ana', acreedor: 'Bob', monto: 300 });
            expect(result.transacciones_comida).toContainEqual({ deudor: 'Carlos', acreedor: 'Bob', monto: 300 });

            // Pool bebida: [Ana=1000, Bob=0] → Carlos NO está
            // promedio 500 → Bob debe 500 a Ana
            expect(result.transacciones_bebida).toEqual([
                { deudor: 'Bob', acreedor: 'Ana', monto: 500 },
            ]);
            // Carlos no aparece en ninguna transacción de bebida
            const nombresEnBebida = result.transacciones_bebida.flatMap(t => [t.deudor, t.acreedor]);
            expect(nombresEnBebida).not.toContain('Carlos');
        });
    });

    // -----------------------------------------------------------------------
    // CASO 3: El que llegó tarde (solo toma, no come)
    // -----------------------------------------------------------------------

    describe('El que llegó tarde — come: false, toma: true', () => {
        test('solo se le cobra su parte de bebida, no participa en el pool de comida', () => {
            const personas: Persona[] = [
                persona('Ana', 0, 600, true, true),    // pagó bebida
                persona('Bob', 1200, 0, true, true),   // pagó comida
                persona('Diego', 0, 0, false, true),   // llegó tarde: solo toma
            ];

            const result: SaldosResult = calcularSaldos(personas);

            // Pool comida: [Ana=0, Bob=1200] → Diego NO está
            // promedio 600 → Ana debe 600 a Bob
            expect(result.transacciones_comida).toEqual([
                { deudor: 'Ana', acreedor: 'Bob', monto: 600 },
            ]);
            // Diego no aparece en ninguna transacción de comida
            const nombresEnComida = result.transacciones_comida.flatMap(t => [t.deudor, t.acreedor]);
            expect(nombresEnComida).not.toContain('Diego');

            // Pool bebida: [Ana=600, Bob=0, Diego=0] → promedio 200
            // Bob debe 200 a Ana, Diego debe 200 a Ana
            expect(result.transacciones_bebida).toContainEqual({ deudor: 'Bob', acreedor: 'Ana', monto: 200 });
            expect(result.transacciones_bebida).toContainEqual({ deudor: 'Diego', acreedor: 'Ana', monto: 200 });
        });
    });

    // -----------------------------------------------------------------------
    // CASO 4: El acompañante (no come ni toma)
    // -----------------------------------------------------------------------

    describe('El acompañante — come: false, toma: false', () => {
        test('no se le cobra ni comida ni bebida', () => {
            const personas: Persona[] = [
                persona('Ana', 600, 0, true, true),   // pagó comida
                persona('Bob', 0, 600, true, true),   // pagó bebida
                persona('Eve', 0, 0, false, false),   // acompañante
            ];

            const result: SaldosResult = calcularSaldos(personas);

            // Eve no debe aparecer en ninguna transacción
            const todosLosNombres = [
                ...result.transacciones_comida.flatMap(t => [t.deudor, t.acreedor]),
                ...result.transacciones_bebida.flatMap(t => [t.deudor, t.acreedor]),
            ];
            expect(todosLosNombres).not.toContain('Eve');

            // El resto sí se cobra entre ellos
            expect(result.transacciones_comida).toEqual([
                { deudor: 'Bob', acreedor: 'Ana', monto: 300 },
            ]);
            expect(result.transacciones_bebida).toEqual([
                { deudor: 'Ana', acreedor: 'Bob', monto: 300 },
            ]);
        });
    });

    // -----------------------------------------------------------------------
    // CASO 5: Protección contra errores (borde — división por cero)
    // -----------------------------------------------------------------------

    describe('Protección contra división por cero', () => {
        test('array vacío retorna transacciones vacías sin lanzar error', () => {
            const result: SaldosResult = calcularSaldos([]);
            expect(result.transacciones_comida).toEqual([]);
            expect(result.transacciones_bebida).toEqual([]);
        });

        test('si nadie come (come: false en todos), el pool de comida retorna vacío', () => {
            // Nadie marcó come=true, pero hay gastos registrados de bebida
            const personas: Persona[] = [
                persona('Ana', 0, 500, false, true),
                persona('Bob', 0, 300, false, true),
            ];

            const result: SaldosResult = calcularSaldos(personas);

            // El pool de comida debe estar vacío — sin crash ni NaN
            expect(result.transacciones_comida).toEqual([]);
            // El pool de bebida sí se calcula normalmente
            expect(result.transacciones_bebida).not.toEqual([]);
        });

        test('si nadie toma (toma: false en todos), el pool de bebida retorna vacío', () => {
            const personas: Persona[] = [
                persona('Ana', 600, 0, true, false),
                persona('Bob', 200, 0, true, false),
            ];

            const result: SaldosResult = calcularSaldos(personas);

            expect(result.transacciones_bebida).toEqual([]);
            expect(result.transacciones_comida).not.toEqual([]);
        });

        test('todos son acompañantes (ningún pool activo) retorna todo vacío', () => {
            const personas: Persona[] = [
                persona('Ana', 0, 0, false, false),
                persona('Bob', 0, 0, false, false),
            ];

            const result: SaldosResult = calcularSaldos(personas);

            expect(result.transacciones_comida).toEqual([]);
            expect(result.transacciones_bebida).toEqual([]);
        });
    });

    // -----------------------------------------------------------------------
    // CASO COMPLEJO: escenario mixto con 3 personas
    // -----------------------------------------------------------------------

    describe('Escenario mixto — comida y bebida con distintos roles', () => {
        test('calcula correctamente transacciones cruzadas entre comida y bebida', () => {
            const personas: Persona[] = [
                persona('test1', 1500, 0, true, false),  // solo come, pagó comida
                persona('test2', 1500, 0, true, true),   // come y toma, pagó comida
                persona('test3', 0, 1500, true, true),   // come y toma, pagó bebida
            ];

            const result: SaldosResult = calcularSaldos(personas);

            // Pool comida: [test1=1500, test2=1500, test3=0] → promedio 1000
            // test3 debe 1000: 500 a test1, 500 a test2
            expect(result.transacciones_comida).toEqual([
                { deudor: 'test3', acreedor: 'test1', monto: 500 },
                { deudor: 'test3', acreedor: 'test2', monto: 500 },
            ]);

            // Pool bebida: [test2=0, test3=1500] → promedio 750
            // test2 debe 750 a test3
            expect(result.transacciones_bebida).toEqual([
                { deudor: 'test2', acreedor: 'test3', monto: 750 },
            ]);
        });
    });
});
